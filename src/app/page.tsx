'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import FiltersBar from '@/components/Filters/FiltersBar';
import AnimeList from '@/components/AnimeList';
import AnimeModal from '@/components/Modal/AnimeModal';
import FilteredList from '@/components/FilteredList';
import Loader from '@/components/UI/Loader';

function HomeContent() {
  const { selectedAnime, loading, error, filteredAnimes } = useSelector((state: RootState) => state.anime);
  // const { selectedAnime, loading, error, hasResults, filteredAnimes, pageInfo } = useSelector((state: RootState) => state.anime);

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }
    return filteredAnimes.length === 0 ? <AnimeList /> : <FilteredList />;
  };

  return (
    <>
      <FiltersBar />
      <div className="my-8">
        {renderContent()}
      </div>
      {selectedAnime && <AnimeModal />}
    </>
  );
}

export default function Home() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <HomeContent />
    </div>
  );
}