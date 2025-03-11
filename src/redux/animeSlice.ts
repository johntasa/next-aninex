import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Anime } from "@/interfaces/Anime";
import { PageInfo } from "@/interfaces/PageInfo";
import { SearchFilters } from "@/interfaces/Filters";

interface AnimeState {
  favorites: Anime[];
  selectedAnime: Anime | null;
  filters: SearchFilters;
  filteredAnimes: Anime[];
  loading: boolean;
  error: string | null;
  hasResults: boolean;
  pageInfo: PageInfo;
  currentPage: number;
}

const emptyState: AnimeState = {
  favorites: [],
  selectedAnime: null,
  filters: {
    searchTerm: "",
    genre: "",
    year: "",
    status: "",
    season: ""
  },
  filteredAnimes: [],
  loading: false,
  error: null,
  hasResults: false,
  pageInfo: {
    total: 0,
    perPage: 24,
    currentPage: 1,
    lastPage: 0,
    hasNextPage: false,
    __typename: "PageInfo"
  },
  currentPage: 1,
};

const loadState = (): AnimeState => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = sessionStorage.getItem("animeState");
      if (serializedState === null) {
        return emptyState;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error("Error loading state from sessionStorage:", err);
      return emptyState;
    }
  }
  return emptyState;
};

const saveState = (state: AnimeState) => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem("animeState", serializedState);
    } catch (err) {
      console.error("Error saving state to sessionStorage:", err);
    }
  }
};

const initialState: AnimeState = loadState();

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Anime>) => {
      const anime = action.payload;
      if (!state.favorites.some((fav) => fav.id === anime.id)) {
        state.favorites.push(anime);
        saveState(state);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((fav) => fav.id !== action.payload);
      saveState(state);
    },
    setSelectedAnime: (state, action: PayloadAction<Anime | null>) => {
      state.selectedAnime = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    setAnimeList: (state, action: PayloadAction<Anime[]>) => {
      if (JSON.stringify(state.filteredAnimes) !== JSON.stringify(action.payload)) {
        state.filteredAnimes = action.payload;
        state.hasResults = action.payload.length !== 0;
        state.loading = false;
      }
    },
    setPageInfo: (state, action: PayloadAction<PageInfo>) => {
      state.pageInfo = action.payload;
      state.hasResults = action.payload.total !== 0;
    },
    setHasResults: (state, action: PayloadAction<boolean>) => {
      state.hasResults = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { 
  addToFavorites, 
  removeFromFavorites, 
  setSelectedAnime, 
  setFilters,
  setAnimeList,
  setPageInfo,
  setHasResults,
  setLoading,
  setError,
  setCurrentPage,
} = animeSlice.actions;
export default animeSlice.reducer;