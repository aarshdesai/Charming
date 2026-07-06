export type CharmCategory = "words" | "love" | "symbols" | "nature" | "gems";

export interface Charm {
  id: string;
  name: string;
  category: CharmCategory;
  price: number;
  emoji: string;
  description: string;
  /** Transparent cutout. When set, rendered instead of the emoji medallion. */
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

const img = (n: number) => `/charms/web/official-${String(n).padStart(2, "0")}.webp`;

// Official inventory (charm-src/official). Names read from the product photos —
// client to confirm. TODO: all prices are a flat $28 placeholder until the client
// sends the real price list.
const P = 28;

export const CHARMS: Charm[] = [
  // Words
  { id: "bridesmaid",  name: "Bridesmaid", category: "words", price: P, emoji: "✎", description: "Script word charm",  image: img(2) },
  { id: "mrs",         name: "Mrs",        category: "words", price: P, emoji: "✎", description: "Script word charm",  image: img(3) },
  { id: "lucky",       name: "Lucky",      category: "words", price: P, emoji: "✎", description: "Script word charm",  image: img(4) },
  { id: "year-2026",   name: "2026",       category: "words", price: P, emoji: "#", description: "Year charm",         image: img(5) },
  { id: "mini",        name: "Mini",       category: "words", price: P, emoji: "✎", description: "Word charm",         image: img(48) },
  { id: "cowgirl",     name: "Cowgirl",    category: "words", price: P, emoji: "✎", description: "Script word charm",  image: img(54) },
  { id: "wifey",       name: "Wifey",      category: "words", price: P, emoji: "✎", description: "Script word charm",  image: img(55) },

  // Love
  { id: "te-quiero",    name: "Te Quiero",      category: "love", price: P, emoji: "♡", description: "Spanish love disc",   image: img(7) },
  { id: "i-love-you",   name: "I Love You",     category: "love", price: P, emoji: "♡", description: "English love disc",   image: img(19) },
  { id: "je-taime",     name: "Je T'aime",      category: "love", price: P, emoji: "♡", description: "French love disc",    image: img(20) },
  { id: "ti-amo",       name: "Ti Amo",         category: "love", price: P, emoji: "♡", description: "Italian love disc",   image: img(35) },
  { id: "ich-liebe",    name: "Ich Liebe Dich", category: "love", price: P, emoji: "♡", description: "German love disc",    image: img(58) },
  { id: "love-you-more",name: "Love You More",  category: "love", price: P, emoji: "♡", description: "Engraved heart",      image: img(46) },
  { id: "noir-heart",   name: "Noir Heart",     category: "love", price: P, emoji: "♥", description: "Black pavé heart",    image: img(51) },
  { id: "ivory-heart",  name: "Ivory Heart",    category: "love", price: P, emoji: "♡", description: "White enamel heart",  image: img(59) },

  // Symbols
  { id: "bow",          name: "Bow",              category: "symbols", price: P, emoji: "⋈", description: "Wire ribbon bow",       image: img(10) },
  { id: "turq-cross",   name: "Turquoise Cross",  category: "symbols", price: P, emoji: "✚", description: "Turquoise-bead cross",  image: img(12) },
  { id: "sombrero-mini",name: "Sombrero Coin",    category: "symbols", price: P, emoji: "◉", description: "Small sombrero coin",   image: img(14) },
  { id: "pinky-promise",name: "Pinky Promise",    category: "symbols", price: P, emoji: "☝", description: "Linked pinky hands",    image: img(24) },
  { id: "gothic-cross", name: "Gothic Cross",     category: "symbols", price: P, emoji: "✟", description: "Outline gothic cross",  image: img(26) },
  { id: "cross",        name: "Cross",            category: "symbols", price: P, emoji: "✝", description: "Simple silver cross",   image: img(27) },
  { id: "evil-eye",     name: "Evil Eye",         category: "symbols", price: P, emoji: "◉", description: "Protective evil eye",   image: img(31) },
  { id: "palette",      name: "Paint Palette",    category: "symbols", price: P, emoji: "❖", description: "Artist palette, gems",  image: img(34) },
  { id: "middle-finger",name: "Middle Finger",    category: "symbols", price: P, emoji: "☝", description: "Cheeky hand",           image: img(36) },
  { id: "western-hat",  name: "Western Hat",      category: "symbols", price: P, emoji: "◉", description: "Hat button",            image: img(56) },
  { id: "horseshoe",    name: "Rainbow Horseshoe",category: "symbols", price: P, emoji: "U", description: "Multi-gem horseshoe",   image: img(61) },
  { id: "saxophone",    name: "Saxophone",        category: "symbols", price: P, emoji: "♪", description: "Tiny saxophone",        image: img(62) },
  { id: "sombrero",     name: "Sombrero",         category: "symbols", price: P, emoji: "◉", description: "Sombrero medallion",    image: img(64) },
  { id: "eleven-eleven",name: "11:11",            category: "symbols", price: P, emoji: "✦", description: "Make-a-wish disc",      image: img(66) },
  { id: "scales",       name: "Scales",           category: "symbols", price: P, emoji: "⚖", description: "Scales of justice",     image: img(68) },
  { id: "mop-clover",   name: "Pearl Clover",     category: "symbols", price: P, emoji: "✤", description: "Mother-of-pearl clover",image: img(70) },
  { id: "lucky-mama",   name: "Lucky Mama",       category: "symbols", price: P, emoji: "✦", description: "Black enamel medallion",image: img(71) },

  // Nature
  { id: "daisy",        name: "Daisy",           category: "nature", price: P, emoji: "✿", description: "Silver pavé daisy",     image: img(1) },
  { id: "horse",        name: "Horse",           category: "nature", price: P, emoji: "♞", description: "Galloping horse",       image: img(6) },
  { id: "turq-drop",    name: "Turquoise Drop",  category: "nature", price: P, emoji: "◈", description: "Turquoise teardrop",    image: img(9) },
  { id: "folk-flower",  name: "Folk Flower",     category: "nature", price: P, emoji: "✿", description: "Enamel folk bloom",     image: img(11) },
  { id: "bull-skull",   name: "Bull Skull",      category: "nature", price: P, emoji: "♉", description: "Longhorn, turquoise",   image: img(15) },
  { id: "starfish",     name: "Starfish",        category: "nature", price: P, emoji: "✺", description: "Silver starfish",       image: img(16) },
  { id: "butterfly",    name: "Butterfly",       category: "nature", price: P, emoji: "⋈", description: "Rainbow pavé butterfly",image: img(17) },
  { id: "lilac-bloom",  name: "Lilac Bloom",     category: "nature", price: P, emoji: "✿", description: "Lilac crystal flower",  image: img(22) },
  { id: "cactus",       name: "Cactus",          category: "nature", price: P, emoji: "🌵", description: "Gem-set cactus",        image: img(23) },
  { id: "turtle",       name: "Turtle",          category: "nature", price: P, emoji: "🐢", description: "Pavé sea turtle",       image: img(25) },
  { id: "mystic-bloom", name: "Mystic Bloom",    category: "nature", price: P, emoji: "✿", description: "Smoky crystal flower",  image: img(28) },
  { id: "dragon",       name: "Dragon",          category: "nature", price: P, emoji: "🐉", description: "Pavé dragon",           image: img(30) },
  { id: "koi",          name: "Koi Fish",        category: "nature", price: P, emoji: "🐟", description: "Silver koi",            image: img(33) },
  { id: "lion",         name: "Lion",            category: "nature", price: P, emoji: "♌", description: "Lion head",             image: img(37) },
  { id: "teddy",        name: "Teddy Bear",      category: "nature", price: P, emoji: "🐻", description: "Little teddy",          image: img(39) },
  { id: "strawberry",   name: "Strawberry",      category: "nature", price: P, emoji: "🍓", description: "Enamel strawberry",     image: img(41) },
  { id: "dog-bone",     name: "Dog Bone",        category: "nature", price: P, emoji: "🦴", description: "Pavé dog bone",         image: img(47) },
  { id: "pink-boot",    name: "Pink Boot",       category: "nature", price: P, emoji: "👢", description: "Pink cowboy boot",      image: img(53) },
  { id: "pink-turtle",  name: "Pink Turtle",     category: "nature", price: P, emoji: "🐢", description: "Pink enamel turtle",    image: img(57) },
  { id: "western-boot", name: "Western Boot",    category: "nature", price: P, emoji: "👢", description: "Boot with spur",        image: img(60) },
  { id: "gold-daisy",   name: "Golden Daisy",    category: "nature", price: P, emoji: "✿", description: "Gold CZ daisy",         image: img(65) },
  { id: "gold-sunflower",name:"Golden Sunflower",category: "nature", price: P, emoji: "☀", description: "Gold sunflower",        image: img(67) },
  { id: "rose-bloom",   name: "Rosé Bloom",      category: "nature", price: P, emoji: "✿", description: "Pink pearl flower",     image: img(69) },

  // Gems (birthstone crystals)
  { id: "gem-sapphire", name: "Sapphire Crystal", category: "gems", price: P, emoji: "◆", description: "Deep blue crystal",   image: img(8) },
  { id: "gem-rose",     name: "Rose Crystal",     category: "gems", price: P, emoji: "◆", description: "Rose pink crystal",   image: img(13) },
  { id: "gem-citrine",  name: "Citrine Crystal",  category: "gems", price: P, emoji: "◆", description: "Golden yellow crystal",image: img(18) },
  { id: "gem-peridot",  name: "Peridot Crystal",  category: "gems", price: P, emoji: "◆", description: "Bright green crystal", image: img(21) },
  { id: "gem-zircon",   name: "Blue Zircon Crystal",category:"gems",price: P, emoji: "◆", description: "Teal blue crystal",   image: img(29) },
  { id: "gem-emerald",  name: "Emerald Crystal",  category: "gems", price: P, emoji: "◆", description: "Deep green crystal",  image: img(40) },
  { id: "gem-amethyst", name: "Amethyst Crystal", category: "gems", price: P, emoji: "◆", description: "Purple crystal",      image: img(42) },
  { id: "gem-diamond",  name: "Diamond Crystal",  category: "gems", price: P, emoji: "◆", description: "Clear crystal",       image: img(43) },
  { id: "gem-garnet",   name: "Garnet Crystal",   category: "gems", price: P, emoji: "◆", description: "Dark red crystal",    image: img(44) },
  { id: "gem-ruby",     name: "Ruby Crystal",     category: "gems", price: P, emoji: "◆", description: "Bright red crystal",  image: img(49) },
  { id: "gem-aqua",     name: "Aquamarine Crystal",category:"gems", price: P, emoji: "◆", description: "Light blue crystal",  image: img(50) },
];

export const BASES: Base[] = [
  { id: "chain",    name: "Necklace Chain",  price: 48, maxCharms: 5, description: "16\" delicate gold-fill chain" },
  { id: "bracelet", name: "Charm Bracelet",  price: 38, maxCharms: 7, description: "7\" lobster-clasp bracelet" },
  { id: "anklet",   name: "Anklet",          price: 32, maxCharms: 4, description: "9\" adjustable anklet chain" },
];

export const CATEGORY_ORDER: CharmCategory[] = ["words", "love", "symbols", "nature", "gems"];

export const CATEGORY_LABELS: Record<CharmCategory, string> = {
  words: "Words",
  love: "Love Notes",
  symbols: "Symbols",
  nature: "Nature",
  gems: "Birthstones",
};
