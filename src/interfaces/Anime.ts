export interface Anime {
  id: number;
  bannerImage: string;
  coverImage: {
    large: string;
  };
  title: {
    english: string;
    native: string;
  };
  description: string;
  episodes: number;
  averageScore: number;
  status: string;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  trailer: {
    id: string;
    site: string;
  };
  genres: string[];
}

export interface AnimeCardProps {
  animeInfo: Anime;
  size?: number;
}

export interface AnimeList {
  season: Anime[];
  popular: Anime[];
}