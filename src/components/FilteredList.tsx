'use client';

import { useDispatch, useSelector } from 'react-redux';
import AnimeCard from './UI/AnimeCard';
import { Anime } from '@/interfaces/Anime';
import { RootState } from '@/redux/store';
import CrossButton from './UI/CrossButton';
import { setAnimeList, setFilters, setHasResults } from '@/redux/animeSlice';
import NoResults from './UI/NoResultsMessage';
import Pagination from './UI/PaginationButtons';

export default function FilteredList() {
  const { filteredAnimes, hasResults, filters, pageInfo } = useSelector((state: RootState) => state.anime);
  const dispatch = useDispatch();
  
  const getActiveFilters = () => {
    const activeFilters = [];
    if (filters.searchTerm) activeFilters.push(`Search: ${filters.searchTerm}`);
    if (filters.genre && filters.genre !== 'Any') activeFilters.push(`Genre: ${filters.genre}`);
    if (filters.year && filters.year !== 'Any') activeFilters.push(`Year: ${filters.year}`);
    if (filters.status && filters.status !== 'Any') activeFilters.push(`Status: ${filters.status}`);
    if (filters.season && filters.season !== 'Any') activeFilters.push(`Season: ${filters.season}`);
    
    return activeFilters.join(' | ');
  };

  const removeFilters = () => {
    dispatch(setAnimeList([]));
    dispatch(setHasResults(false));
    dispatch(
      setFilters({
        searchTerm: '',
        year: '',
        genre: '',
        status: '',
        season: '',
      })
    );
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex gap-5 mb-8 h-7">
          <h2 className="font-bold">Results for:</h2>
          <p>{getActiveFilters()}</p>
          <CrossButton exectFunct={removeFilters} calledFrom={"filters"} />
        </div>
        { hasResults
          ? (
            <>
              <div className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4">
                {filteredAnimes.map((anime: Anime) => (
                  <AnimeCard
                    key={anime.id}
                    animeInfo={anime}
                  />
                ))}
              </div>
              {pageInfo.lastPage > 1 && (
                <Pagination {...pageInfo} />
              )}
            </>
          )
          : <NoResults message={"No results for your filters"}/>
        }
      </section>
    </div>
  );
}