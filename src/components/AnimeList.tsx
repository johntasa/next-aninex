'use client';

import { useLazyQuery } from '@apollo/client';
import { GET_TOP_ANIMES } from '@/api/queries';
import { Anime } from '@/interfaces/Anime';
import { useSearchFilters } from '@/hooks/useSearchFilters';
import { useEffect } from 'react';
import AnimeCard from './UI/AnimeCard';
import Loader from './UI/Loader';

export default function AnimeList() {
  const { hasActiveFilters } = useSearchFilters();
  
  const [getTopAnimes, { loading, error, data }] = useLazyQuery(GET_TOP_ANIMES);

  useEffect(() => {
    if (!hasActiveFilters) {
      getTopAnimes({
        variables: {
          season: "WINTER",
          seasonYear: 2025,
        }
      });
    }
  }, [hasActiveFilters, getTopAnimes]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <Loader />;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-semibold py-4 text-xl">POPULAR THIS SEASON</h2>
        <div className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4">
          {data.season.media.map((anime: Anime) => (
            <AnimeCard
              key={anime.id}
              animeInfo={anime}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold py-4 text-xl">ALL TIME POPULAR</h2>
        <div className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4">
          {data.popular.media.map((anime: Anime) => (
            <AnimeCard
              key={anime.id}
              animeInfo={anime}
            />
          ))}
        </div>
      </section>
    </div>
  );
};