import Image from "next/image";
import { AnimeCardProps } from "@/interfaces/Anime";
import { useDispatch } from "react-redux";
import { setSelectedAnime } from "@/redux/animeSlice";
import FavButton from "@/components/UI/FavButton";

export default function AnimeCard({ animeInfo }: AnimeCardProps) {
  const dispatch = useDispatch();
  return (
    <div className="w-full p-2">
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={animeInfo.coverImage.large}
          alt={animeInfo.title.english || "Cover image of anime"}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover rounded-lg shadow-teal-500 shadow-lg hover:blur-sm transition-all duration-300 cursor-pointer"
          onClick={() => dispatch(setSelectedAnime(animeInfo))}
        />
      </div>
      <div className="pt-3 flex justify-between items-center">
        <h3 className="text-sm md:text-base font-semibold truncate flex-1 mr-2">
          {animeInfo.title.english || animeInfo.title.native}
        </h3>
        <FavButton animeInfo={animeInfo}/>
      </div>
    </div>
  );
}