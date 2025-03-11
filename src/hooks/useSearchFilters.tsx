import { SearchFilters } from "@/interfaces/Filters";
import { useDispatch, useSelector } from "react-redux";
import { setAnimeList, setError, setFilters, setLoading, setPageInfo, setCurrentPage } from "@/redux/animeSlice";
import { useQuery } from "@apollo/client";
import { GET_ANIMES } from "@/api/queries";
import { RootState } from "@/redux/store";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import debounce from "just-debounce-it"
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const defaultFilters: SearchFilters = {
  searchTerm: "",
  genre: "",
  year: "",
  status: "",
  season: "",
};

export function useSearchFilters() {
  const { filters, currentPage } = useSelector((state: RootState) => state.anime);
  const dispatch = useDispatch();
  const [debouncedSearch, setDebouncedSearch] = useState(filters.searchTerm);
  const isInitialMount = useRef(true);
  const isUpdatingFilter = useRef(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Update filter function to sync with URL
  const updateFilter = useCallback((key: keyof SearchFilters, value: string) => {
    isUpdatingFilter.current = true;
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== "Any") {
      params.set(key, value);
    } else {
      params.delete(key);
      value = defaultFilters[key];
    }
    
    const search = params.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
    
    dispatch(setLoading(true));
    dispatch(setFilters({ ...filters, [key]: value }));
    dispatch(setCurrentPage(1));
    dispatch(setAnimeList([]));
    
    // Reset the flag after a short delay to ensure the URL update completes
    setTimeout(() => {
      isUpdatingFilter.current = false;
    }, 100);
  }, [filters, dispatch, router, searchParams, pathname]);

  // Read initial filters from URL only on mount or when URL changes externally
  useEffect(() => {
    if (isInitialMount.current || !isUpdatingFilter.current) {
      isInitialMount.current = false;
      
      const urlFilters: SearchFilters = {
        searchTerm: searchParams.get("searchTerm") || defaultFilters.searchTerm,
        genre: searchParams.get("genre") || defaultFilters.genre,
        year: searchParams.get("year") || defaultFilters.year,
        status: searchParams.get("status") || defaultFilters.status,
        season: searchParams.get("season") || defaultFilters.season,
      };
      
      const hasUrlFilters = Object.entries(urlFilters).some(([key, value]) => 
        value !== defaultFilters[key as keyof SearchFilters]
      );
      
      if (hasUrlFilters) {
        dispatch(setFilters(urlFilters));
      }

      const page = searchParams.get("page");
      if (page) {
        const pageNum = parseInt(page);
        if (!isNaN(pageNum) && pageNum > 0) {
          dispatch(setCurrentPage(pageNum));
        }
      }
    }
  }, [dispatch, searchParams]);

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
    onCompleted: (data) => {
      dispatch(setAnimeList(data.Page.media));
      dispatch(setPageInfo(data.Page.pageInfo));
    },
    onError: (error) => {
      dispatch(setError(error.message));
      dispatch(setAnimeList([]));
    }
  });
  
  const setPage = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    const search = params.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
    
    dispatch(setLoading(true));
    dispatch(setCurrentPage(page));
  }, [dispatch, router, searchParams, pathname]);
  
  return {
    hasActiveFilters,
    filters,
    updateFilter,
    currentPage,
    loading,
    setPage,
  };
}
