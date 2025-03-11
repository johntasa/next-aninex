import { Anime } from "@/interfaces/Anime";
import DetailItem from "./DetailItem";

export default function AnimeDetails ({ animeInfo } : { animeInfo : Anime}) {
  const formatDate = (date: { year: number; month: number; day: number }): string => {
    if (!date.year) return "N/A"
    const semiFormattedDate = `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`
    return new Date(semiFormattedDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
      <DetailItem label="Episodes" value={animeInfo.episodes} />
      <DetailItem label="Average Score" value={`${animeInfo.averageScore}%`} />
      <DetailItem label="Status" value={animeInfo.status} />
      <DetailItem label="Start Date" value={formatDate(animeInfo.startDate)} />
      <DetailItem label="End Date" value={formatDate(animeInfo.endDate)} />
    </div>
  ) 
}