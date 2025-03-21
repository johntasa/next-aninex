"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import FiltersBar from "@/components/Filters/FiltersBar";
import TopAnimes from "@/components/TopAnimes";
import FilteredAnimes from "@/components/FilteredAnimes";
import AnimeModal from "@/components/Modal/AnimeModal";
import { useQuery } from "@apollo/client";
import { GET_GENRES } from "@/api/queries";
import { ApolloError } from "@apollo/client";
import { Suspense } from "react";
import { useFilters } from "@/hooks/useFilters";

function HomeContent() {
  const { selectedAnime } = useSelector((state: RootState) => state.anime);
  const { error, data } = useQuery(GET_GENRES);
  const { filters, handleFilterChange, handleClearFilters } = useFilters();

  const renderContent = () => {
    if (error) {
      const errorMessage = error instanceof ApolloError ? error.message : String(error);
      return (
        <div className="text-center py-8">
          <p className="text-red-500">{errorMessage}</p>
        </div>
      );
    }
    const hasActiveFilters = Object.values(filters).some(value => 
      value && value !== "Any" && value !== ""
    );
    
    return hasActiveFilters ? 
      <FilteredAnimes filters={filters} handleClearFilters={handleClearFilters} /> : 
      <TopAnimes />;
  };

  return (
    <main>
      <FiltersBar 
        genres={data?.GenreCollection || []}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <div className="my-8">
        {renderContent()}
      </div>
      { selectedAnime && <AnimeModal /> }
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