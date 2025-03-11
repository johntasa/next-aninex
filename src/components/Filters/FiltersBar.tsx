import {
  STATUSES,
  YEARS,
  SEASONS
} from "@/utils/constants";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import UISelect from "./UISelect";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { RootState } from "@/redux/store";

interface FiltersBarProps {
  categories: string[];
}

export default function FiltersBar({ categories }: FiltersBarProps) {
  const filters = useSelector((state: RootState) => state.anime.filters);
  const { updateFilter } = useSearchFilters();

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter("searchTerm", e.target.value);
  }, [updateFilter]);

  const genres = Array.isArray(categories) ? [...categories] : [];

  return (
    <div className="mt-24 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label htmlFor="searchTerm" className="block text-sm font-bold mb-1">
            Search
          </label>
          <div className="relative">
            <input
              id="searchTerm"
              type="text"
              placeholder="Search"
              value={filters.searchTerm}
              onChange={handleSearchChange}
              className="bg-white text-sm w-full p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            />
            <svg
              className="absolute top-2 left-2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                d="M10 2a8 8 0 105.293 14.707l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <UISelect id="genre" label="Genre" options={genres} value={filters.genre} />
        <UISelect id="year" label="Year" options={YEARS} value={filters.year} />
        <UISelect id="status" label="Status" options={STATUSES} value={filters.status} />
        <UISelect id="season" label="Season" options={SEASONS} value={filters.season} />
      </div>
    </div>
  );
}