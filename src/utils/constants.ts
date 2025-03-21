export const TABS = [
  { name: "Home", href: "/" },
  { name: "Favorites", href: "/favorites"}
];

export const YEARS = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - i).toString());

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

export const CURRENT_SEASON = (() => {
  const month = new Date().getMonth() + 1;
  if (month >= 1 && month <= 3) return Season.WINTER;
  if (month >= 4 && month <= 6) return Season.SPRING;
  if (month >= 7 && month <= 9) return Season.SUMMER;
  return Season.FALL;
})();

export const CURRENT_YEAR = YEARS[0];