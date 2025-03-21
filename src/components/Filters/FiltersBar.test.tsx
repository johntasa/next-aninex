import { render, screen, fireEvent } from '@testing-library/react';
import FiltersBar from './FiltersBar';
import { Filters } from '@/interfaces/Filters';

jest.mock('just-debounce-it', () => {
  return (fn: (...args: unknown[]) => void) => {
    return (...args: unknown[]) => fn(...args);
  };
});

describe('FiltersBar', () => {
  const mockGenres = ['Action', 'Comedy', 'Drama'];
  const mockFilters: Filters = {
    search: 'test search',
    genre: 'Action',
    seasonYear: '2023',
    status: 'FINISHED',
    season: 'WINTER'
  };
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all filter components correctly', () => {
    render(
      <FiltersBar 
        genres={mockGenres} 
        filters={mockFilters} 
        onFilterChange={mockOnFilterChange} 
      />
    );

    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeDefined();
    expect((searchInput as HTMLInputElement).value).toBe('test search');

    expect(screen.getByLabelText('Genre')).toBeDefined();
    expect(screen.getByLabelText('Year')).toBeDefined();
    expect(screen.getByLabelText('Status')).toBeDefined();
    expect(screen.getByLabelText('Season')).toBeDefined();
  });

  it('handles search input changes', async () => {
    render(
      <FiltersBar 
        genres={mockGenres} 
        filters={{}} 
        onFilterChange={mockOnFilterChange} 
      />
    );

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'new search' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      search: 'new search'
    }));
  });

  it('handles select changes', () => {
    render(
      <FiltersBar 
        genres={mockGenres} 
        filters={{}} 
        onFilterChange={mockOnFilterChange} 
      />
    );

    const genreSelect = screen.getByLabelText('Genre');
    fireEvent.change(genreSelect, { target: { id: 'genre', value: 'Comedy' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      genre: 'Comedy'
    }));
  });

  it('removes filter when "Any" is selected', () => {
    render(
      <FiltersBar 
        genres={mockGenres} 
        filters={mockFilters} 
        onFilterChange={mockOnFilterChange} 
      />
    );

    const genreSelect = screen.getByLabelText('Genre');
    fireEvent.change(genreSelect, { target: { id: 'genre', value: 'Any' } });

    const calledFilters = mockOnFilterChange.mock.calls[0][0];
    expect(calledFilters.genre).toBeUndefined();
  });

  it('updates search value when filters prop changes', () => {
    const { rerender } = render(
      <FiltersBar 
        genres={mockGenres} 
        filters={{ search: 'initial' }} 
        onFilterChange={mockOnFilterChange} 
      />
    );

    const searchInput = screen.getByPlaceholderText('Search');
    expect((searchInput as HTMLInputElement).value).toBe('initial');

    rerender(
      <FiltersBar 
        genres={mockGenres} 
        filters={{ search: 'updated' }} 
        onFilterChange={mockOnFilterChange} 
      />
    );

    expect((searchInput as HTMLInputElement).value).toBe('updated');
  });

  it('handles empty categories array', () => {
    render(
      <FiltersBar 
        genres={[]} 
        filters={{}} 
        onFilterChange={mockOnFilterChange} 
      />
    );

    expect(screen.getByLabelText('Genre')).toBeDefined();
  });
});