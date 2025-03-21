"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AnimeModal from "@/components/Modal/AnimeModal";
import NoResults from "@/components/UI/NoResults";
import AnimeList from "@/components/UI/AnimeList";

export default function FavoritesPage() {
  const favorites = useSelector((state: RootState) => state.anime.favorites);
  const isSelectedAnime = useSelector((state: RootState) => state.anime.selectedAnime);

  return (
    <main className="min-h-screen">
      {
        favorites.length === 0
          ? (
            <div className="mt-24">
              <NoResults message="No favorite animes yet!" />
            </div>
          )
          : (
            <div className="container mx-auto px-4 mt-24">
              <AnimeList animes={favorites} />
            </div>
          )
      }
      { isSelectedAnime && <AnimeModal /> }
    </main>
  );
}