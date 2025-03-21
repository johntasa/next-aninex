import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import TopAnimes from './TopAnimes';
import { GET_TOP_ANIMES } from '@/api/queries';

interface AnimeItem {
  id: string;
  title: {
    english: string;
    native: string;
  };
  coverImage: {
    large: string;
  };
}

const mocks = [
  {
    request: {
      query: GET_TOP_ANIMES,
      variables: {
        season: "WINTER",
        seasonYear: 2025,
      },
    },
    result: {
      data: {
        season: {
          media: [
            { id: '1', title: { romaji: 'Anime 1' }, coverImage: { large: 'image1.jpg' } },
            { id: '2', title: { romaji: 'Anime 2' }, coverImage: { large: 'image2.jpg' } },
          ],
        },
        popular: {
          media: [
            { id: '3', title: { romaji: 'Anime 3' }, coverImage: { large: 'image3.jpg' } },
            { id: '4', title: { romaji: 'Anime 4' }, coverImage: { large: 'image4.jpg' } },
          ],
        },
      },
    },
  },
];

jest.mock('./UI/AnimeList', () => {
  return function MockAnimeList({ animes }: { animes: AnimeItem[] }) {
    if (!animes) return <div data-testid="anime-list">No animes</div>;
    
    return (
      <div data-testid="anime-list">
        {animes.map(anime => (
          <div key={anime.id} data-testid="anime-item">
            {anime.title?.english || 'No title'}
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

describe('TopAnimes', () => {
  it('renders loading state initially', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TopAnimes />
      </MockedProvider>
    );

    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeTruthy();
  });
});