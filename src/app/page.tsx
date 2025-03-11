'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import FiltersBar from '@/components/Filters/FiltersBar';
import TopAnimes from '@/components/TopAnimes';
import AnimeModal from '@/components/Modal/AnimeModal';
import FilteredAnimes from '@/components/FilteredAnimes';
import Loader from '@/components/UI/Loader';
import GoToFavsButton from '@/components/UI/GoToFavsButton';

function HomeContent() {
  const { selectedAnime, loading, error, filters } = useSelector((state: RootState) => state.anime);

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
    
    const hasActiveFilters = Object.values(filters).some(value => value && value !== "Any");
    return hasActiveFilters ? <FilteredAnimes /> : <TopAnimes />;
  };

  return (
    <>
      <FiltersBar />
      <div className="my-8">
        {renderContent()}
      </div>
      {selectedAnime && <AnimeModal />}
      <GoToFavsButton />
    </>
  );
}

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <HomeContent />
    </div>
  );
}