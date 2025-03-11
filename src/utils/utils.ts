export function formatText (option: string) {
  if (option === "Any") return option;
  return option
    .split("_")
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};