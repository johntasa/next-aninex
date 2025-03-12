export function formatText (option: string) {
  if (option === "Any") return option;
  return option
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export function formatDate (date: { year: number; month: number; day: number }): string {
  if (!date.year) return "N/A"
  
  const semiFormattedDate = new Date(date.year, date.month - 1, date.day || 1)
  const formattedDate = semiFormattedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
  
  return date.day ? formattedDate : formattedDate.replace(" 1", "");
}