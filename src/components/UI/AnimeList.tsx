import { Anime } from "@/interfaces/Anime";
import AnimeCard from "./AnimeCard";

export default function AnimeList({animes}: {animes: Anime[]}) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-4">
      {animes.map((anime: Anime) => (
        <AnimeCard key={anime.id} animeInfo={anime} />
      ))}
    </div>
  );
}