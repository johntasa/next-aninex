import { Anime } from "./Anime";

export interface ApiResponse {
  season: {
    media: Anime[];
  };
  popular: {
    media: Anime[];
  };
}