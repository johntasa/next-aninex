import { SearchFilters } from "@/interfaces/Filters";
import { useDispatch, useSelector } from "react-redux";
import { setAnimeList, setError, setFilters, setLoading, setPageInfo, setCurrentPage } from "@/redux/animeSlice";
import { useQuery } from "@apollo/client";
import { GET_ANIMES } from "@/api/queries";
import { RootState } from "@/redux/store";
import { useEffect, useState, useCallback, useMemo } from "react";
import debounce from "just-debounce-it";

export function useSearchFilters() {
  const { filters, currentPage } = useSelector((state: RootState) => state.anime);
  const dispatch = useDispatch();
  const [debouncedSearch, setDebouncedSearch] = useState(filters.searchTerm);

  const debouncedSetSearch = useCallback(
    debounce((search: string) => {
      setDebouncedSearch(search);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSetSearch(filters.searchTerm);
  }, [filters.searchTerm, debouncedSetSearch]);

  const queryVariables = useMemo(() => ({
    search: debouncedSearch || undefined,
    status: filters.status && filters.status !== "Any" ? filters.status : undefined,
    season: filters.season && filters.season !== "Any" ? filters.season : undefined,
    seasonYear: filters.year && filters.year !== "Any" ? parseInt(filters.year) : undefined,
    genre_in: filters.genre && filters.genre !== "Any" ? [filters.genre] : undefined,
    page: currentPage,
  }), [debouncedSearch, filters, currentPage]);

  const hasActiveFilters = useMemo(() => {
    return filters.searchTerm !== "" || 
      (filters.status && filters.status !== "Any") ||
      (filters.season && filters.season !== "Any") ||
      (filters.year && filters.year !== "Any") ||
      (filters.genre && filters.genre !== "Any");
  }, [filters]);

  const { loading } = useQuery(GET_ANIMES, {
    variables: queryVariables,
    skip: !hasActiveFilters,
    onCompleted: (data) => {
      dispatch(setAnimeList(data.Page.media));
      dispatch(setPageInfo(data.Page.pageInfo));
    },
    onError: (error) => {
      dispatch(setError(error.message));
      dispatch(setAnimeList([]));
    }
  });

  const updateFilter = useCallback((key: keyof SearchFilters, value: string) => {
    const filterValue = value === "Any" ? "" : value;
    dispatch(setLoading(true));
    dispatch(setFilters({ ...filters, [key]: filterValue }));
    dispatch(setCurrentPage(1));
    dispatch(setAnimeList([]));
  }, [filters, dispatch]);
  
  const setPage = useCallback((page: number) => {
    dispatch(setLoading(true));
    dispatch(setCurrentPage(page));
  }, [dispatch]);

  const cleanFilters = useCallback(() => {
    window.location.reload();
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setFilters({
        searchTerm: "",
        year: "",
        genre: "",
        status: "",
        season: "",
      }));
      dispatch(setCurrentPage(1));
      dispatch(setAnimeList([]));
      dispatch(setLoading(false));
    }, 100);
  }, [dispatch]);
  
  return {
    hasActiveFilters,
    filters,
    updateFilter,
    currentPage,
    loading,
    setPage,
    cleanFilters
  };
}
