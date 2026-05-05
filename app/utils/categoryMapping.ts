export const CATEGORY_ICON_MAP: Record<string, string> = {
  "Beach & Islands": "Waves",
  "Heritage & Culture": "Landmark",
  "Adventure Sports": "Mountain",
  "Wildlife & Nature": "Leaf",
  "Honeymoon": "Heart",
  "Family Tours": "Users",
  "Relaxation & Wellness": "Wind",
  "Religious & Spiritual": "Compass",
};

export function getCategoryIcon(name: string, fallback: string = "Map"): string {
  if (!name) return fallback;
  
  // Try exact match first
  if (CATEGORY_ICON_MAP[name]) return CATEGORY_ICON_MAP[name];

  // Try partial matches (case-insensitive)
  const lowerName = name.toLowerCase();
  if (lowerName.includes("beach")) return "Waves";
  if (lowerName.includes("culture") || lowerName.includes("heritage")) return "Landmark";
  if (lowerName.includes("adventure")) return "Mountain";
  if (lowerName.includes("wildlife") || lowerName.includes("nature")) return "Leaf";
  if (lowerName.includes("honeymoon")) return "Heart";
  if (lowerName.includes("family")) return "Users";
  if (lowerName.includes("wellness") || lowerName.includes("relaxation")) return "Wind";
  if (lowerName.includes("religious") || lowerName.includes("spiritual")) return "Compass";

  return fallback;
}
