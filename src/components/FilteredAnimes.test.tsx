import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import FilteredAnimes from './FilteredAnimes';
import { GET_ANIMES } from '@/api/queries';
import { Filters } from '@/interfaces/Filters';

jest.mock('./UI/CrossButton', () => {
  return function MockCrossButton({ exectFunct, calledFrom }: { exectFunct: () => void, calledFrom: string }) {
    return <button data-testid="cross-button" onClick={exectFunct}>Clear {calledFrom}</button>;
  };
});

jest.mock('./UI/NoResults', () => {
  return function MockNoResults({ message }: { message: string }) {      
    return <div data-testid="no-results">{message}</div>;
  };
});

interface PageInfo {
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

interface AnimeItem {
  id: string;
  title: {
    native: string;
  };
}

jest.mock('./UI/PaginationButtons', () => {
  return function MockPagination({ pageInfo, setPage }: { pageInfo: PageInfo, setPage: (page: number) => void }) {
    return (
      <div data-testid="pagination">
        <button onClick={() => setPage(pageInfo.currentPage - 1)}>Previous</button>
        <span>Page {pageInfo.currentPage} of {pageInfo.lastPage}</span>
        <button onClick={() => setPage(pageInfo.currentPage + 1)}>Next</button>
      </div>
    );
  };
});

jest.mock('./UI/AnimeList', () => {
  return function MockAnimeList({ animes }: { animes: AnimeItem[] }) {
    return (
      <div data-testid="anime-list">
        {animes.map(anime => (
          <div key={anime.id} data-testid="anime-item">
            {anime.title.native}
          </div>
        ))}
      </div>
    );
  };
});

jest.mock('./UI/Loader', () => {
  return function MockLoader() {
    return <div data-testid="loader">Loading...</div>;
  };
});

jest.mock('@/utils/utils', () => ({
  formatText: (text: string) => `Formatted ${text}`
}));

describe('FilteredAnimes', () => {
  const mockFilters: Filters = {
    search: 'naruto',
    genre: 'Action',
    seasonYear: '2020',
    status: 'FINISHED',
    season: 'WINTER'
  };

  const mockHandleClearFilters = jest.fn();

  const mocks = [
    {
      request: {
        query: GET_ANIMES,
        variables: { page: 1, ...mockFilters }
      },
      result: {
        data: {
          Page: {
            media: [
              { id: '1', title: { native: 'Anime 1' }, episodes: 12, averageScore: 80, status: 'FINISHED', startDate: '2020-01-01', endDate: '2020-12-31', trailer: null },
              { id: '2', title: { native: 'Anime 2' }, episodes: 24, averageScore: 85, status: 'RELEASING', startDate: '2020-01-01', endDate: '2020-12-31', trailer: null }
            ],
            pageInfo: {
              currentPage: 1,
              lastPage: 3,
              hasNextPage: true,
              perPage: 10
            }
          }
        }
      }
    }
  ];

  const emptyMocks = [
    {
      request: {
        query: GET_ANIMES,
        variables: { page: 1, ...mockFilters }
      },
      result: {
        data: {
          Page: {
            media: [],
            pageInfo: {
              currentPage: 1,
              lastPage: 1,
              hasNextPage: false,
              perPage: 10
            }
          }
        }
      }
    }
  ];

  const errorMocks = [
    {
      request: {
        query: GET_ANIMES,
        variables: { page: 1, ...mockFilters }
      },
      error: new Error('An error occurred')
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FilteredAnimes filters={mockFilters} handleClearFilters={mockHandleClearFilters} />
      </MockedProvider>
    );

    expect(screen.getByTestId('loader')).toBeTruthy();
  });

  it('renders anime list when data is loaded', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FilteredAnimes filters={mockFilters} handleClearFilters={mockHandleClearFilters} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeFalsy();
    }, { timeout: 2000 });

    expect(screen.getByText('Results for:')).toBeTruthy();
    
    const filtersText = screen.getByText(/Search: naruto/);
    expect(filtersText).toBeTruthy();
    expect(filtersText.textContent).toContain('Genre: Action');
    expect(filtersText.textContent).toContain('Year: 2020');
    expect(filtersText.textContent).toContain('Status: Formatted FINISHED');
    expect(filtersText.textContent).toContain('Season: Formatted WINTER');

    expect(screen.getByTestId('anime-list')).toBeTruthy();
    const animeItems = screen.getAllByTestId('anime-item');
    expect(animeItems).toHaveLength(2);
    expect(animeItems[0].textContent).toBe('Anime 1');
    expect(animeItems[1].textContent).toBe('Anime 2');

    expect(screen.getByTestId('pagination')).toBeTruthy();
  });

  it('renders no results message when no animes are found', async () => {
    render(
      <MockedProvider mocks={emptyMocks} addTypename={false}>
        <FilteredAnimes filters={mockFilters} handleClearFilters={mockHandleClearFilters} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeFalsy();
    }, { timeout: 2000 });

    expect(screen.getByTestId('no-results')).toBeTruthy();
    expect(screen.getByText('No results for your filters')).toBeTruthy();
  });

  it('renders error message when query fails', async () => {
    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <FilteredAnimes filters={mockFilters} handleClearFilters={mockHandleClearFilters} />
      </MockedProvider>
    );

    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Error: An error occurred/i)).toBeTruthy();
    });
  });

  it('calls handleClearFilters when cross button is clicked', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FilteredAnimes filters={mockFilters} handleClearFilters={mockHandleClearFilters} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeFalsy();
    }, { timeout: 2000 });

    fireEvent.click(screen.getByTestId('cross-button'));

    expect(mockHandleClearFilters).toHaveBeenCalledTimes(1);
    expect(mockHandleClearFilters).toHaveBeenCalledWith(mockFilters);
  });

  it('changes page when pagination buttons are clicked', async () => {
    render(
      <MockedProvider mocks={[
        mocks[0],
        {
          request: {
            query: GET_ANIMES,
            variables: { page: 2, ...mockFilters }
          },
          result: {
            data: {
              Page: {
                media: [
                  { id: '3', title: { native: 'Anime 3' } },
                  { id: '4', title: { native: 'Anime 4' } }
                ],
                pageInfo: {
                  currentPage: 2,
                  lastPage: 3,
                  hasNextPage: true,
                  perPage: 10
                }
              }
            }
          }
        }
      ]} addTypename={false}>
        <FilteredAnimes filters={mockFilters} handleClearFilters={mockHandleClearFilters} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeFalsy();
    }, { timeout: 2000 });

    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeFalsy();
    }, { timeout: 2000 });

    const animeItems = screen.getAllByTestId('anime-item');
    expect(animeItems).toHaveLength(2);
    expect(animeItems[0].textContent).toBe('Anime 3');
    expect(animeItems[1].textContent).toBe('Anime 4');
  });
});