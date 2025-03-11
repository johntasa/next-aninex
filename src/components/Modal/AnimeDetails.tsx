import { Anime } from "@/interfaces/Anime";
import DetailItem from "./DetailItem";
import { formatText, formatDate } from "@/utils/utils";

export default function AnimeDetails ({ animeInfo } : { animeInfo : Anime}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
      <DetailItem label="Episodes" value={animeInfo.episodes || "N/A"} />
      <DetailItem label="Average Score" value={`${animeInfo.averageScore || "N/A"}%`} />
      <DetailItem label="Status" value={formatText(animeInfo.status)} />
      <DetailItem label="Start Date" value={formatDate(animeInfo.startDate)} />
      <DetailItem label="End Date" value={formatDate(animeInfo.endDate)} />
    </div>
  ) 
}