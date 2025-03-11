"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import FiltersBar from "@/components/Filters/FiltersBar";
import TopAnimes from "@/components/TopAnimes";
import FilteredAnimes from "@/components/FilteredAnimes";
import Loader from "@/components/UI/Loader";
import GoToFavsButton from "@/components/UI/GoToFavsButton";
import URLSync from "@/components/URLSync";
import AnimeModal from "@/components/Modal/AnimeModal";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/api/queries";
import { ApolloError } from "@apollo/client";
import { Suspense } from "react";

function HomeContent() {
  const { selectedAnime, loading: animeLoading, error: animeError, filters } = useSelector((state: RootState) => state.anime);
  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CATEGORIES);

  const renderContent = () => {
    if (animeLoading || categoriesLoading) {
      return <Loader />;
    }
  
    if (animeError || categoriesError) {
      const error = animeError || categoriesError;
      const errorMessage = error instanceof ApolloError ? error.message : String(error);
      return (
        <div className="text-center py-8">
          <p className="text-red-500">{errorMessage}</p>
        </div>
      );
    }
    
    const hasActiveFilters = Object.values(filters).some(value => value && value !== "Any");
    return hasActiveFilters ? <FilteredAnimes /> : <TopAnimes />;
  };

  return (
    <main>
      <URLSync />
      <FiltersBar categories={categoriesData?.GenreCollection || []} />
      <div className="my-8">
        {renderContent()}
      </div>
      {selectedAnime && <AnimeModal />}
      <GoToFavsButton />
    </main>
  );
}

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Suspense>
        <HomeContent />
      </Suspense>
    </div>
  );
}