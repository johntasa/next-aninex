"use client";

import { useLazyQuery } from "@apollo/client";
import { GET_TOP_ANIMES } from "@/api/queries";
import { useEffect } from "react";
import AnimeList from "./UI/AnimeList";
import Loader from "./UI/Loader";

export default function TopAnimes() {
  const [getTopAnimes, { loading, error, data }] = useLazyQuery(GET_TOP_ANIMES);

  useEffect(() => {
    getTopAnimes({
      variables: {
        season: "WINTER",
        seasonYear: 2025,
      }
    });
  }, [getTopAnimes]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <Loader />;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-semibold py-4 text-xl">POPULAR THIS SEASON</h2>
        <AnimeList animes={data.season.media} />
      </section>

      <section>
        <h2 className="font-semibold py-4 text-xl">ALL TIME POPULAR</h2>
        <AnimeList animes={data.popular.media} />
      </section>
    </div>
  );
};