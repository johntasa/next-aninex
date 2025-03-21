"use client";

import { Filters } from "@/interfaces/Filters";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export function useFilters() {
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

  return {
    filters,
    handleFilterChange,
    handleClearFilters
  };
}