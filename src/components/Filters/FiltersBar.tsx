"use client";

import { STATUSES, YEARS, SEASONS } from "@/utils/constants";
import UISelect from "./UISelect";
import { Filters } from "@/interfaces/Filters";
import { useCallback, useState, useEffect } from "react";
import debounce from "just-debounce-it";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

interface FiltersBarProps {
  genres: string[];
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export default function FiltersBar({ genres, filters, onFilterChange }: FiltersBarProps) {
  const [searchValue, setSearchValue] = useState(filters.search || "");

  useEffect(() => {
    setSearchValue(filters.search || "");
  }, [filters.search]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const updatedFilters: Filters = {
        ...filters,
        search: value,
      };
      onFilterChange(updatedFilters);
    }, 500),
    [filters, onFilterChange]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    const updatedFilters = { ...filters } as Filters;
    
    if (value === "Any") {
      delete updatedFilters[id as keyof Filters];
    } else {
      updatedFilters[id as keyof Filters] = value;
    }

    onFilterChange(updatedFilters);
  };

  const genreOptions = Array.isArray(genres) ? [...genres] : [];

  return (
    <div className="mt-24 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-bold mb-1">
            Search
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
              className="bg-white text-sm w-full p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            />
            <MagnifyingGlassIcon className="absolute top-2 left-2 size-5 text-gray-400"/>
          </div>
        </div>
        <UISelect id="genre" label="Genre" options={genreOptions} value={filters.genre || "Any"} handleChange={handleChange} />
        <UISelect id="seasonYear" label="Year" options={YEARS} value={filters.seasonYear || "Any"} handleChange={handleChange} />
        <UISelect id="status" label="Status" options={STATUSES} value={filters.status || "Any"} handleChange={handleChange} />
        <UISelect id="season" label="Season" options={SEASONS} value={filters.season || "Any"} handleChange={handleChange} />
      </div>
    </div>
  );
}