import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Anime } from "@/interfaces/Anime";

interface AnimeState {
  favorites: Anime[];
  selectedAnime: Anime | null;
}

const emptyState: AnimeState = {
  favorites: [],
  selectedAnime: null,
};

const loadState = (): AnimeState => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = localStorage.getItem("animeState");
      if (serializedState === null) {
        return emptyState;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error("Error loading state from localStorage:", err);
      return emptyState;
    }
  }
  return emptyState;
};

const saveState = (state: AnimeState) => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("animeState", serializedState);
    } catch (err) {
      console.error("Error saving state to localStorage:", err);
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
  },
});

export const { 
  addToFavorites,
  removeFromFavorites,
  setSelectedAnime,
} = animeSlice.actions;
export default animeSlice.reducer;