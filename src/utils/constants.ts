export const TABS = [
  { name: "Home", href: "/" },
  { name: "Favorites", href: "/favorites"}
];

export const FILTERS = {
  searchTerm: "",
  genre: "",
  year: "",
  status: "",
  season: "",
};

export const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Hentai",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller"
];

export const YEARS = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

export enum Status {
  FINISHED = "FINISHED",
  RELEASING = "RELEASING",
  NOT_YET_RELEASED = "NOT_YET_RELEASED",
  CANCELLED = "CANCELLED",
  HIATUS = "HIATUS"
}

export enum Season {
  WINTER = "WINTER",
  SPRING = "SPRING",
  SUMMER = "SUMMER",
  FALL = "FALL"
}

export const STATUSES = Object.values(Status);
export const SEASONS = Object.values(Season);