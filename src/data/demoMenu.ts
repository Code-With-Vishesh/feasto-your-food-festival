import { images } from "@/data/images";
import type { Restaurant } from "@/services/restaurantService";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  veg: boolean;
  desc: string;
  image: string;
  bestseller?: boolean;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

type Template = Omit<MenuItem, "id">;

const T = (name: string, price: number, veg: boolean, desc: string, image: string, bestseller = false): Template => ({
  name,
  price,
  veg,
  desc,
  image,
  bestseller,
});

const BY_CUISINE: Record<string, Template[]> = {
  Pizza: [
    T("Margherita Blast", 249, true, "Classic cheese pizza with basil and tomato sauce.", images.pizza, true),
    T("Farmhouse Feast", 399, true, "Capsicum, onion, mushroom and sweet corn.", images.pizza),
    T("Pepperoni Punch", 449, false, "Double pepperoni with mozzarella and oregano.", images.pizza, true),
    T("Garlic Breadsticks", 149, true, "Buttery garlic bread with cheesy dip.", images.pizza),
  ],
  Italian: [
    T("Alfredo Pasta", 329, true, "Creamy white sauce penne with herbs.", images.pizza, true),
    T("Arrabbiata Penne", 299, true, "Spicy tomato sauce with chilli and garlic.", images.pizza),
  ],
  Burgers: [
    T("Classic Cheeseburger", 199, false, "Juicy patty, cheddar and house sauce.", images.burger, true),
    T("Crispy Veggie Burger", 149, true, "Crunchy veg patty with chipotle mayo.", images.burger),
    T("Peri Peri Fries", 119, true, "Crispy fries dusted with peri peri spice.", images.burger),
  ],
  Biryani: [
    T("Chicken Dum Biryani", 289, false, "Slow-cooked basmati layered with saffron.", images.biryani, true),
    T("Veg Handi Biryani", 219, true, "Garden vegetables with aromatic rice and raita.", images.biryani),
    T("Mutton Biryani", 399, false, "Tender mutton in fragrant dum-style rice.", images.biryani),
  ],
  Mughlai: [
    T("Seekh Kebab", 279, false, "Char-grilled minced kebabs with mint chutney.", images.biryani, true),
    T("Paneer Tikka", 249, true, "Tandoor-smoked paneer with peppers.", images.curry),
  ],
  "North Indian": [
    T("Butter Chicken", 329, false, "Creamy tomato gravy with grilled chicken.", images.curry, true),
    T("Paneer Butter Masala", 279, true, "Soft paneer in rich makhani gravy.", images.curry),
    T("Dal Makhani", 229, true, "Slow-cooked black lentils with butter.", images.curry),
    T("Butter Naan", 49, true, "Tandoor-baked with a butter glaze.", images.curry),
  ],
  "South Indian": [
    T("Masala Dosa", 129, true, "Crisp crepe with spiced potato, sambar & chutney.", images.dosa, true),
    T("Mysore Masala Dosa", 159, true, "Fiery red chutney with potato masala.", images.dosa),
    T("Idli Vada Combo", 119, true, "Soft idlis with medu vada and sambar.", images.dosa),
  ],
  Chinese: [
    T("Hakka Noodles", 199, true, "Wok-tossed noodles with crunchy veggies.", images.sushi, true),
    T("Chilli Paneer", 249, true, "Sweet-spicy tossed paneer with peppers.", images.sushi),
    T("Veg Momos", 149, true, "Steamed dumplings with fiery chutney.", images.sushi),
  ],
  Japanese: [
    T("Salmon Nigiri Set", 549, false, "Fresh salmon over seasoned rice, 6 pcs.", images.sushi, true),
    T("California Roll", 399, false, "Crab stick, avocado and cucumber, 8 pcs.", images.sushi),
    T("Veggie Maki", 299, true, "Avocado, cucumber and pickled radish, 8 pcs.", images.sushi),
  ],
  Asian: [
    T("Thai Green Curry", 329, true, "Coconut curry with vegetables and jasmine rice.", images.curry, true),
    T("Pad Thai Noodles", 299, true, "Tamarind-tossed rice noodles with peanuts.", images.sushi),
  ],
  Cafe: [
    T("Cappuccino", 149, true, "Double shot espresso with steamed milk.", images.dessert, true),
    T("Grilled Sandwich", 189, true, "Toasted sandwich with cheese and veggies.", images.salad),
    T("Butter Croissant", 129, true, "Flaky, golden, baked fresh.", images.dessert),
  ],
  Bakery: [
    T("Sourdough Loaf", 249, true, "Naturally leavened, baked daily.", images.dessert, true),
    T("Red Velvet Pastry", 129, true, "Classic red velvet with cream cheese.", images.dessert),
  ],
  Desserts: [
    T("Choco Lava Cake", 99, true, "Molten chocolate centre cake.", images.dessert, true),
    T("Brownie Sundae", 159, true, "Warm brownie with vanilla ice cream.", images.dessert),
    T("Cheesecake Slice", 189, true, "Baked New York style cheesecake.", images.dessert),
  ],
  Healthy: [
    T("Avocado Buddha Bowl", 349, true, "Avocado, quinoa, greens and citrus dressing.", images.salad, true),
    T("Protein Paneer Bowl", 329, true, "Grilled paneer, chickpeas, roasted veggies.", images.salad),
    T("Greek Yogurt Parfait", 199, true, "Yogurt, granola and fresh berries.", images.dessert),
  ],
  Continental: [
    T("Grilled Veg Steak", 379, true, "Herbed vegetables with mash and jus.", images.salad, true),
    T("Peri Peri Grilled Chicken", 449, false, "Half chicken with smoky peri peri glaze.", images.burger),
  ],
  Beverages: [
    T("Fresh Lime Soda", 99, true, "Sweet or salted, served chilled.", images.salad),
    T("Cold Coffee", 179, true, "Blended coffee with ice cream.", images.dessert, true),
  ],
  "Street Food": [
    T("Pyaaz Kachori", 79, true, "Jaipur-style flaky kachori with tangy chutney.", images.curry, true),
    T("Samosa Chaat", 99, true, "Crushed samosa with curd, chutney and sev.", images.curry),
  ],
  "Multi-cuisine": [
    T("Chef's Special Thali", 349, true, "Assorted mains, breads, rice and dessert.", images.curry, true),
    T("Paneer Tikka Masala", 299, true, "Tandoori paneer in a spiced onion-tomato gravy.", images.curry),
    T("Veg Fried Rice", 199, true, "Wok-tossed rice with seasonal vegetables.", images.biryani),
  ],
};

const UNIVERSAL: Template[] = [
  T("Masala Chai", 59, true, "Spiced Indian tea brewed fresh.", images.dessert),
  T("Gulab Jamun (2 pcs)", 89, true, "Warm milk dumplings in sugar syrup.", images.dessert),
];

/** Clearly-labelled demo menu, generated from the restaurant's cuisines. Not real menu data. */
export function getDemoMenu(restaurant: Restaurant): MenuSection[] {
  const templates = restaurant.cuisines.flatMap((c) => BY_CUISINE[c] ?? []);
  const base = templates.length ? templates : BY_CUISINE["Multi-cuisine"]!;
  const seen = new Set<string>();
  const unique = base.filter((t) => (seen.has(t.name) ? false : (seen.add(t.name), true)));
  const withIds = (list: Template[], offset: number): MenuItem[] =>
    list.map((t, i) => ({
      ...t,
      veg: restaurant.isVegetarian === true ? true : t.veg,
      id: `${restaurant.id}-ITEM${String(offset + i + 1).padStart(3, "0")}`,
    }));

  const popular = unique.slice(0, 4);
  const more = unique.slice(4);

  const sections: MenuSection[] = [{ title: "Popular", items: withIds(popular, 0) }];
  if (more.length) sections.push({ title: "More from the kitchen", items: withIds(more, popular.length) });
  sections.push({ title: "Beverages & Desserts", items: withIds(UNIVERSAL, popular.length + more.length) });
  return sections;
}
