"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AnimeModal from "@/components/Modal/AnimeModal";
import NoResults from "@/components/UI/NoResultsMessage";
import AnimeList from "@/components/UI/AnimeList";

export default function FavoritesPage() {
  const favorites = useSelector((state: RootState) => state.anime.favorites);
  const isSelectedAnime = useSelector((state: RootState) => state.anime.selectedAnime);

  const renderFavoritesList = () => (
    <div className="container mx-auto px-4 mt-24">
      <AnimeList animes={favorites} />
    </div>
  );

  return (
    <main className="min-h-screen">
      {favorites.length === 0 ? (
        <div className="mt-24">
          <NoResults message="No favorites yet!" />
        </div>
      ) : (
        renderFavoritesList()
      )}
      
      {isSelectedAnime && <AnimeModal />}
    </main>
  );
}