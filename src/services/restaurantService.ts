import dataset from "@/data/feasto-jaipur-restaurants.json";
import { images } from "@/data/images";

export interface RawRestaurant {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  country: string | null;
  area: string | null;
  rating: number | null;
  review_count: number | null;
  price_range: string | null;
  known_for: string | null;
  cuisines: string[] | null;
  is_vegetarian: boolean | null;
  delivery_available: boolean | null;
  dining_available: boolean | null;
  nightlife: boolean | null;
  offers: string[] | null;
  address: string | null;
  phone: string | null;
  opening_hours: string | null;
  latitude: number | null;
  longitude: number | null;
  image: string | null;
  menu: unknown[] | null;
  source: string | null;
}

export interface Restaurant {
  id: string;
  name: string;
  city: string;
  area: string;
  rating: number | null;
  reviewCount: number | null;
  priceRange: string | null;
  priceForTwo: number | null;
  cuisines: string[];
  knownFor: string | null;
  isVegetarian: boolean | null;
  deliveryAvailable: boolean | null;
  diningAvailable: boolean | null;
  nightlife: boolean | null;
  offers: string[];
  offer: string | null;
  address: string | null;
  phone: string | null;
  openingHours: string | null;
  deliveryMinutes: number;
  deliveryTime: string;
  image: string;
  hasRealMenu: boolean;
  source: string | null;
}

/* ---------- helpers ---------- */

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const CUISINE_KEYWORDS: Array<[string, string[]]> = [
  ["Pizza", ["pizza", "pizze"]],
  ["Italian", ["pasta", "italian", "risotto", "lasagne", "pizza"]],
  ["Burgers", ["burger", "slider"]],
  ["Biryani", ["biryani", "biriyani"]],
  ["Mughlai", ["kebab", "tikka", "mughlai", "galouti"]],
  ["North Indian", ["north indian", "paneer", "dal", "curry", "thali", "chaat", "butter chicken", "rajasthani", "laal maas"]],
  ["South Indian", ["dosa", "idli", "vada", "south indian", "uttapam", "filter coffee"]],
  ["Chinese", ["chinese", "noodle", "momo", "dim sum", "manchurian", "hakka"]],
  ["Japanese", ["sushi", "japanese", "ramen", "sashimi"]],
  ["Asian", ["thai", "asian", "korean", "pan-asian"]],
  ["Cafe", ["coffee", "cafe", "café", "breakfast", "brunch", "sandwich", "croissant"]],
  ["Bakery", ["bakery", "bread", "croissant", "pastry", "bake"]],
  ["Desserts", ["dessert", "cake", "ice cream", "waffle", "shake", "gelato", "brownie", "churros"]],
  ["Healthy", ["salad", "healthy", "bowl", "vegan", "smoothie"]],
  ["Continental", ["continental", "steak", "grill", "european"]],
  ["Beverages", ["mocktail", "cocktail", "beer", "bar", "drinks", "chai", "tea"]],
  ["Street Food", ["kachori", "samosa", "golgappa", "pav", "street"]],
];

const IMAGE_KEYWORDS: Array<[keyof typeof images, string[]]> = [
  ["pizza", ["pizza", "italian", "pasta"]],
  ["burger", ["burger", "sandwich", "fries", "american"]],
  ["biryani", ["biryani", "kebab", "mughlai", "rice"]],
  ["sushi", ["sushi", "japanese", "asian", "thai", "chinese", "momo", "ramen"]],
  ["dosa", ["dosa", "idli", "south indian", "vada", "uttapam"]],
  ["dessert", ["dessert", "cake", "bakery", "ice cream", "waffle", "coffee", "cafe", "café", "churros", "pastry", "bake", "chocolate"]],
  ["salad", ["salad", "healthy", "vegan", "bowl", "smoothie", "breakfast"]],
];

const PRICE_FOR_TWO: Record<string, number> = { "₹": 300, "₹₹": 600, "₹₹₹": 1200, "₹₹₹₹": 2000 };

const DEMO_OFFERS = [
  "50% OFF up to ₹100",
  "20% OFF up to ₹120",
  "Flat ₹75 OFF above ₹299",
  "Buy 1 Get 1 Free",
  "Free delivery above ₹149",
];

function deriveCuisines(text: string): string[] {
  const found: string[] = [];
  for (const [cuisine, keys] of CUISINE_KEYWORDS) {
    if (keys.some((k) => text.includes(k)) && !found.includes(cuisine)) found.push(cuisine);
  }
  return found.slice(0, 3);
}

function pickImage(text: string, id: string) {
  for (const [key, keys] of IMAGE_KEYWORDS) if (keys.some((k) => text.includes(k))) return images[key];
  const pool = [images.curry, images.biryani, images.salad, images.burger];
  return pool[hash(id) % pool.length]!;
}

export function normalizeRestaurant(raw: RawRestaurant): Restaurant {
  const text = `${raw.name} ${raw.known_for ?? ""}`.toLowerCase();
  const h = hash(raw.id);
  const cuisines = raw.cuisines?.length ? raw.cuisines : deriveCuisines(text);
  const givenOffers = raw.offers ?? [];
  const offers = givenOffers.length ? givenOffers : h % 5 < 2 ? [DEMO_OFFERS[h % DEMO_OFFERS.length]!] : [];

  return {
    id: raw.id,
    name: raw.name,
    city: raw.city ?? "Jaipur",
    area: raw.area ?? "Jaipur",
    rating: typeof raw.rating === "number" ? raw.rating : null,
    reviewCount: typeof raw.review_count === "number" ? raw.review_count : null,
    priceRange: raw.price_range,
    priceForTwo: raw.price_range ? (PRICE_FOR_TWO[raw.price_range] ?? null) : null,
    cuisines: cuisines.length ? cuisines : ["Multi-cuisine"],
    knownFor: raw.known_for,
    isVegetarian: raw.is_vegetarian,
    deliveryAvailable: raw.delivery_available,
    diningAvailable: raw.dining_available,
    nightlife: raw.nightlife,
    offers,
    offer: offers[0] ?? null,
    address: raw.address,
    phone: raw.phone,
    openingHours: raw.opening_hours,
    deliveryMinutes: 20 + (h % 6) * 5,
    deliveryTime: `${20 + (h % 6) * 5}–${25 + (h % 6) * 5} min`,
    image: raw.image ?? pickImage(text, raw.id),
    hasRealMenu: Array.isArray(raw.menu) && raw.menu.length > 0,
    source: raw.source,
  };
}

const ALL: Restaurant[] = (dataset.restaurants as unknown as RawRestaurant[]).map(normalizeRestaurant);

/* ---------- service API ---------- */

export const datasetMeta = {
  name: dataset.dataset_name as string,
  city: dataset.city as string,
  count: ALL.length,
  sourceUrl: dataset.source_url as string,
  note: dataset.data_note as string,
};

export function getRestaurants() {
  return ALL;
}

export function getRestaurantById(id: string) {
  return ALL.find((r) => r.id === id);
}

export function getAreas() {
  return Array.from(new Set(ALL.map((r) => r.area))).sort();
}

export function getCuisines() {
  return Array.from(new Set(ALL.flatMap((r) => r.cuisines)))
    .filter((c) => c !== "Multi-cuisine")
    .sort();
}

export function searchRestaurants(query: string, list: Restaurant[] = ALL) {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list
    .map((r) => {
      const name = r.name.toLowerCase();
      const cuisines = r.cuisines.join(" ").toLowerCase();
      const known = (r.knownFor ?? "").toLowerCase();
      const area = r.area.toLowerCase();
      let score = 0;
      if (name.startsWith(q)) score += 100;
      else if (name.includes(q)) score += 70;
      if (cuisines.includes(q)) score += 50;
      if (known.includes(q)) score += 30;
      if (area.includes(q)) score += 20;
      return { r, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (b.r.rating ?? 0) - (a.r.rating ?? 0))
    .map((x) => x.r);
}

export interface RestaurantFilters {
  minRating?: number;
  priceRanges?: string[];
  cuisines?: string[];
  areas?: string[];
  pureVeg?: boolean;
  offersOnly?: boolean;
  fastDelivery?: boolean;
  mode?: "delivery" | "dining" | "nightlife";
}

export function filterRestaurants(list: Restaurant[], f: RestaurantFilters) {
  return list.filter((r) => {
    if (f.minRating && (r.rating ?? 0) < f.minRating) return false;
    if (f.priceRanges?.length && (!r.priceRange || !f.priceRanges.includes(r.priceRange))) return false;
    if (f.cuisines?.length && !r.cuisines.some((c) => f.cuisines!.includes(c))) return false;
    if (f.areas?.length && !f.areas.includes(r.area)) return false;
    if (f.pureVeg && r.isVegetarian !== true) return false;
    if (f.offersOnly && r.offers.length === 0) return false;
    if (f.fastDelivery && r.deliveryMinutes > 25) return false;
    if (f.mode === "nightlife" && r.nightlife === false) return false;
    return true;
  });
}

export type SortKey = "recommended" | "rating" | "delivery" | "priceLow" | "priceHigh" | "reviews";

export function sortRestaurants(list: Restaurant[], key: SortKey, preferredArea?: string) {
  const copy = [...list];
  const price = (r: Restaurant) => r.priceForTwo ?? Number.POSITIVE_INFINITY;
  switch (key) {
    case "rating":
      return copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case "delivery":
      return copy.sort((a, b) => a.deliveryMinutes - b.deliveryMinutes);
    case "priceLow":
      return copy.sort((a, b) => price(a) - price(b));
    case "priceHigh":
      return copy.sort((a, b) => (b.priceForTwo ?? 0) - (a.priceForTwo ?? 0));
    case "reviews":
      return copy.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    default:
      return copy.sort((a, b) => {
        const areaScore = (r: Restaurant) => (preferredArea && preferredArea !== "Jaipur" && r.area === preferredArea ? 1 : 0);
        return (
          areaScore(b) - areaScore(a) ||
          (b.rating ?? 0) - (a.rating ?? 0) ||
          (b.reviewCount ?? 0) - (a.reviewCount ?? 0)
        );
      });
  }
}

export function getRestaurantsByArea(area: string) {
  return ALL.filter((r) => r.area === area);
}

export function getRestaurantsByCuisine(cuisine: string) {
  return ALL.filter((r) => r.cuisines.includes(cuisine));
}

export function getTopRatedRestaurants(limit = 8) {
  return sortRestaurants(ALL.filter((r) => (r.rating ?? 0) >= 4.4), "rating").slice(0, limit);
}

export function getRestaurantsWithOffers(limit = 8) {
  return ALL.filter((r) => r.offers.length > 0).slice(0, limit);
}

/* ---------- display fallbacks ---------- */

export const display = {
  rating: (r: Restaurant) => (r.rating != null ? r.rating.toFixed(1) : "New"),
  reviews: (r: Restaurant) =>
    r.reviewCount != null
      ? `${r.reviewCount >= 1000 ? `${(r.reviewCount / 1000).toFixed(1)}K` : r.reviewCount} reviews`
      : "No reviews yet",
  price: (r: Restaurant) => (r.priceForTwo != null ? `₹${r.priceForTwo} for two` : "Price unavailable"),
  cuisines: (r: Restaurant) => r.cuisines.join(" • "),
  address: (r: Restaurant) => r.address ?? `${r.area}, ${r.city}`,
  hours: (r: Restaurant) => r.openingHours ?? "Hours unavailable",
  delivery: (r: Restaurant) => (r.deliveryAvailable === true ? "Delivery available" : "Check availability"),
};
