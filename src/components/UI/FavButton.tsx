import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "@/redux/animeSlice";
import { RootState } from "@/redux/store";
import { AnimeCardProps } from "@/interfaces/Anime";

export default function FavButton ({ animeInfo, size = 24 }: AnimeCardProps) {
  const dispatch = useDispatch();

  const favorites = useSelector((state: RootState) => state.anime.favorites);

  const isFavorite = favorites.some((fav) => fav.id === animeInfo.id);

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={isFavorite ? "#FF4B77" : "none"}
        stroke="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  )
}