import CrossButton from "./UI/CrossButton";
import NoResults from "./UI/NoResultsMessage";
import Pagination from "./UI/PaginationButtons";
import AnimeList from "./UI/AnimeList";
import Loader from "./UI/Loader";
import { formatText } from "@/utils/utils";
import { Filters } from "@/interfaces/Filters";
import { useLazyQuery } from "@apollo/client";
import { GET_ANIMES } from "@/api/queries";
import { useEffect, useState } from "react";

interface searchFilters {
  filters: Filters,
  handleClearFilters: (filters: Filters) => void,
};

export default function FilteredAnimes({ filters, handleClearFilters }: searchFilters) {
  const [page, setPage] = useState(1);
  const [GetAnimes, { loading, error, data }] = useLazyQuery(GET_ANIMES);
  
  useEffect(() => {
    GetAnimes({
      variables: {page, ...filters},
    });
  }, [filters, GetAnimes, page]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <Loader />;

  const { media: filteredAnimes, pageInfo } = data.Page;
  const hasResults = filteredAnimes.length > 0;
  
  const getActiveFilters = () => {
    const activeFilters = [];
    if (filters.search) activeFilters.push(`Search: ${filters.search}`);
    if (filters.genre && filters.genre !== "Any") activeFilters.push(`Genre: ${filters.genre}`);
    if (filters.seasonYear && filters.seasonYear !== "Any") activeFilters.push(`Year: ${filters.seasonYear}`);
    if (filters.status && filters.status !== "Any") activeFilters.push(`Status: ${formatText(filters.status)}`);
    if (filters.season && filters.season !== "Any") activeFilters.push(`Season: ${formatText(filters.season)}`);
    
    return activeFilters.join(" | ");
  };

  const removeFilters = () => {
    handleClearFilters(filters);
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex gap-5 mb-8 h-7">
          <h2 className="font-bold">Results for:</h2>
          <p>{getActiveFilters()}</p>
          <CrossButton exectFunct={removeFilters} calledFrom={"filters"} />
        </div>
        {loading ? (
          <Loader />
        ) : hasResults ? (
          <>
            <AnimeList animes={filteredAnimes} />
            {pageInfo.lastPage > 1 && <Pagination pageInfo={pageInfo} setPage={setPage} />}
          </>
        ) : (
          <NoResults message={"No results for your filters"} />
        )}
      </section>
    </div>
  );
}