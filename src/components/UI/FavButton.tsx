"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "@/redux/animeSlice";
import { RootState } from "@/redux/store";
import { AnimeCardProps } from "@/interfaces/Anime";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function FavButton ({ animeInfo, size = 24 }: AnimeCardProps) {
  const dispatch = useDispatch();

  const favorites = useSelector((state: RootState) => state.anime.favorites);

  const isFavorite = favorites.some((fav: { id: number | string }) => fav.id === animeInfo.id);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(animeInfo.id));
    } else {
      dispatch(
        addToFavorites(animeInfo)
      );
    }
  };

  return (
    <button
      onClick={toggleFavorites}
      type="button"
      className="text-[#FF4B77] hover:cursor-pointer"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <HeartIcon width={size} height={size} fill={isFavorite ? "#FF4B77" : "none"} />
    </button>
  )
}