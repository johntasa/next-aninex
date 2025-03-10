"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AnimeCard from "@/components/UI/AnimeCard";
import AnimeModal from "@/components/Modal/AnimeModal";
import NoResults from "@/components/UI/NoResultsMessage";

export default function FavoritesPage() {
  const favorites = useSelector((state: RootState) => state.anime.favorites);
  const isSelectedAnime = useSelector((state: RootState) => state.anime.selectedAnime);

  const renderFavoritesList = () => (
    <div className="container mx-auto px-4 mt-24">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {favorites.map((anime) => (
          <AnimeCard 
            key={anime.id} 
            animeInfo={anime} 
          />
        ))}
      </div>
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