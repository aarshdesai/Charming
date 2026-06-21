export type CharmCategory = "symbols" | "nature" | "initials" | "gems";

export interface Charm {
  id: string;
  name: string;
  category: CharmCategory;
  price: number;
  emoji: string;
  description: string;
  /** Transparent PNG cutout. When set, rendered instead of the emoji medallion. */
  image?: string;
}

export type BaseType = "chain" | "bracelet" | "anklet";

export interface Base {
  id: BaseType;
  name: string;
  price: number;
  maxCharms: number;
  description: string;
}

export const CHARMS: Charm[] = [
  { id: "horseshoe-01", name: "Horseshoe", category: "symbols", price: 36, emoji: "U", description: "Pavé horseshoe, gold-set", image: "/charms/horseshoe.png" },
  { id: "star-01",    name: "Star",        category: "symbols", price: 18, emoji: "✦",  description: "Four-pointed star" },
  { id: "heart-01",   name: "Heart",       category: "symbols", price: 18, emoji: "♡",  description: "Open heart" },
  { id: "moon-01",    name: "Crescent",    category: "symbols", price: 22, emoji: "☽",  description: "Crescent moon" },
  { id: "infinity-01",name: "Infinity",    category: "symbols", price: 24, emoji: "∞",  description: "Infinity loop" },
  { id: "cross-01",   name: "Cross",       category: "symbols", price: 20, emoji: "✚",  description: "Thin cross" },
  { id: "leaf-01",    name: "Leaf",        category: "nature",  price: 20, emoji: "🌿", description: "Botanical leaf" },
  { id: "flower-01",  name: "Flower",      category: "nature",  price: 22, emoji: "✿",  description: "Five-petal bloom" },
  { id: "feather-01", name: "Feather",     category: "nature",  price: 24, emoji: "⊰",  description: "Delicate feather" },
  { id: "sun-01",     name: "Sunburst",    category: "nature",  price: 20, emoji: "☀",  description: "Radiant sun" },
  { id: "butterfly-01",name:"Butterfly",   category: "nature",  price: 26, emoji: "⋈",  description: "Winged butterfly" },
  { id: "init-a",     name: "Letter A",    category: "initials",price: 28, emoji: "A",  description: "Script initial" },
  { id: "init-b",     name: "Letter B",    category: "initials",price: 28, emoji: "B",  description: "Script initial" },
  { id: "init-c",     name: "Letter C",    category: "initials",price: 28, emoji: "C",  description: "Script initial" },
  { id: "init-s",     name: "Letter S",    category: "initials",price: 28, emoji: "S",  description: "Script initial" },
  { id: "init-m",     name: "Letter M",    category: "initials",price: 28, emoji: "M",  description: "Script initial" },
  { id: "ruby-01",    name: "Ruby",        category: "gems",    price: 34, emoji: "◆",  description: "Deep red stone" },
  { id: "sapphire-01",name: "Sapphire",   category: "gems",    price: 34, emoji: "◇",  description: "Royal blue stone" },
  { id: "emerald-01", name: "Emerald",     category: "gems",    price: 34, emoji: "◈",  description: "Forest green stone" },
  { id: "pearl-01",   name: "Pearl",       category: "gems",    price: 30, emoji: "○",  description: "Lustrous pearl" },
  { id: "opal-01",    name: "Opal",        category: "gems",    price: 38, emoji: "◉",  description: "Iridescent opal" },
];

export const BASES: Base[] = [
  { id: "chain",    name: "Necklace Chain",  price: 48, maxCharms: 5, description: "16\" delicate gold-fill chain" },
  { id: "bracelet", name: "Charm Bracelet",  price: 38, maxCharms: 7, description: "7\" lobster-clasp bracelet" },
  { id: "anklet",   name: "Anklet",          price: 32, maxCharms: 4, description: "9\" adjustable anklet chain" },
];

export const CATEGORY_LABELS: Record<CharmCategory, string> = {
  symbols: "Symbols",
  nature: "Nature",
  initials: "Initials",
  gems: "Gemstones",
};
