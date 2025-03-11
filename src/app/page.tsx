"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import FiltersBar from "@/components/Filters/FiltersBar";
import TopAnimes from "@/components/TopAnimes";
import FilteredAnimes from "@/components/FilteredAnimes";
import GoToFavsButton from "@/components/UI/GoToFavsButton";
import AnimeModal from "@/components/Modal/AnimeModal";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/api/queries";
import { ApolloError } from "@apollo/client";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filters } from "@/interfaces/Filters";

function HomeContent() {
  const { selectedAnime } = useSelector((state: RootState) => state.anime);
  const { error, data } = useQuery(GET_CATEGORIES);

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialFilters = {
    search: searchParams.get("search") || undefined,
    genre: searchParams.get("genre") || undefined,
    seasonYear: searchParams.get("seasonYear") || undefined,
    season: searchParams.get("season") || undefined,
    status: searchParams.get("status") || undefined,
  };
  const [filters, setFilters] = useState<Filters>(initialFilters);

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

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.genre) params.set("genre", filters.genre);
    if (filters.seasonYear) params.set("seasonYear", filters.seasonYear.toString());
    if (filters.season) params.set("season", filters.season);
    if (filters.status) params.set("status", filters.status);
    const queryString = params.toString();
    router.replace(`/?${queryString}`, undefined);
}, [filters, router]);

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      search: undefined,
      genre: undefined,
      seasonYear: undefined,
      season: undefined,
      status: undefined
    });
  }, []);

  return (
    <main>
      <FiltersBar 
        categories={data?.GenreCollection || []}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
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