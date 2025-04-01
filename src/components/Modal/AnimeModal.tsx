import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"
import { setSelectedAnime } from "@/redux/animeSlice"
import { RootState } from "@/redux/store"
import AnimeDetails from "./AnimeDetails"
import FavButton from "@/components/UI/FavButton"
import CrossButton from "@/components/UI/CrossButton"

export default function AnimeModal() {
  const dispatch = useDispatch();

  const selectedAnime = useSelector((state: RootState) => {
    const anime = state.anime.selectedAnime;
    if (!anime) {
      throw new Error("AnimeModal should not be rendered when selectedAnime is null");
    }
    return anime;
  });

  const cleanDescription = selectedAnime?.description.replace(/<[^>]*>?/gm, "") || "";
  const handleClose = () => dispatch(setSelectedAnime(null));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-2 sm:p-4 z-50">
      <div className="relative bg-white rounded-lg w-full sm:w-11/12 md:w-3/4 xl:w-3/6 max-h-[80vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="relative w-full h-50">
          <Image 
            className="object-cover"
            src={selectedAnime.bannerImage || "/Background.png"}
            fill
            alt={`${selectedAnime.title.english} Banner`}
            priority
          />
        </div>
        <CrossButton exectFunct={handleClose} calledFrom={"modal"} />
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div className="text-[#282828] font-bold">
              <h2 className="text-xl sm:text-2xl md:text-3xl mb-2">{selectedAnime.title.english}</h2>
              <h3 className="text-lg sm:text-xl md:text-2xl">{selectedAnime.title.native}</h3>
            </div>
            <FavButton animeInfo={selectedAnime} size={56} />
          </div>
          <p className="my-4 sm:my-6 text-sm md:text-base text-justify leading-relaxed line-clamp-4 max-h-36 overflow-hidden">{cleanDescription}</p>
          <AnimeDetails animeInfo={selectedAnime} />
          {selectedAnime.trailer && (
            <div className="flex justify-center mt-6 sm:mt-8">
              <iframe
                src={`https://www.youtube.com/embed/${selectedAnime.trailer.id}`}
                title={`${selectedAnime.title.english} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full sm:w-11/12 md:w-4/5 aspect-video rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}