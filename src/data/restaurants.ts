import pizza from "@/assets/pizza.jpg";
import burger from "@/assets/burger.jpg";
import biryani from "@/assets/biryani.jpg";
import sushi from "@/assets/sushi.jpg";
import dessert from "@/assets/dessert.jpg";
import curry from "@/assets/curry.jpg";
import salad from "@/assets/salad.jpg";
import dosa from "@/assets/dosa.jpg";

export const images = { pizza, burger, biryani, sushi, dessert, curry, salad, dosa };

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

export interface Restaurant {
  id: string;
  name: string;
  cuisines: string[];
  rating: number;
  reviews: string;
  time: string;
  priceForTwo: number;
  image: string;
  offer?: string;
  area: string;
  promoted?: boolean;
  pureVeg?: boolean;
  menu: MenuSection[];
}

const item = (
  id: string,
  name: string,
  price: number,
  veg: boolean,
  desc: string,
  image: string,
  bestseller = false
): MenuItem => ({ id, name, price, veg, desc, image, bestseller });

export const restaurants: Restaurant[] = [
  {
    id: "slice-house",
    name: "Slice House Pizzeria",
    cuisines: ["Pizza", "Italian", "Fast Food"],
    rating: 4.4,
    reviews: "2.1K",
    time: "25–30 min",
    priceForTwo: 600,
    image: pizza,
    offer: "50% OFF up to ₹100",
    area: "C Scheme, Jaipur",
    menu: [
      {
        title: "Recommended",
        items: [
          item("m1", "Margherita Blast", 249, true, "Classic cheese pizza with fresh basil and San Marzano tomato sauce.", pizza, true),
          item("m2", "Farmhouse Feast", 399, true, "Loaded with capsicum, onion, mushroom and sweet corn.", pizza),
          item("m3", "Pepperoni Punch", 449, false, "Double pepperoni with mozzarella and oregano.", pizza, true),
        ],
      },
      {
        title: "Sides & Desserts",
        items: [
          item("m4", "Garlic Breadsticks", 149, true, "Buttery garlic bread with cheesy dip.", pizza),
          item("m5", "Choco Lava Cake", 99, true, "Molten chocolate centre cake.", dessert, true),
        ],
      },
    ],
  },
  {
    id: "biryani-blues",
    name: "Biryani Blues",
    cuisines: ["Biryani", "Mughlai", "North Indian"],
    rating: 4.2,
    reviews: "5.4K",
    time: "30–35 min",
    priceForTwo: 500,
    image: biryani,
    offer: "20% OFF up to ₹120",
    area: "Malviya Nagar, Jaipur",
    menu: [
      {
        title: "Biryanis",
        items: [
          item("m1", "Chicken Dum Biryani", 289, false, "Slow-cooked basmati layered with saffron and spices.", biryani, true),
          item("m2", "Veg Handi Biryani", 219, true, "Garden vegetables with aromatic rice, served with raita.", biryani),
          item("m3", "Mutton Biryani", 399, false, "Tender mutton pieces in fragrant dum-style rice.", biryani),
        ],
      },
      {
        title: "Curries",
        items: [
          item("m4", "Butter Chicken", 329, false, "Creamy tomato gravy with charcoal-grilled chicken.", curry, true),
          item("m5", "Paneer Butter Masala", 279, true, "Soft paneer in a rich makhani gravy.", curry),
        ],
      },
    ],
  },
  {
    id: "burger-barn",
    name: "Burger Barn",
    cuisines: ["Burgers", "American", "Beverages"],
    rating: 4.1,
    reviews: "3.8K",
    time: "20–25 min",
    priceForTwo: 400,
    image: burger,
    offer: "Buy 1 Get 1 Free",
    area: "Vaishali Nagar, Jaipur",
    promoted: true,
    menu: [
      {
        title: "Burgers",
        items: [
          item("m1", "Classic Cheeseburger", 199, false, "Juicy patty, cheddar, house sauce, toasted brioche.", burger, true),
          item("m2", "Crispy Veggie Burger", 149, true, "Crunchy veg patty with chipotle mayo.", burger),
          item("m3", "Double Stack Bacon", 329, false, "Two patties, smoked bacon, double cheese.", burger, true),
        ],
      },
      {
        title: "Sides",
        items: [
          item("m4", "Peri Peri Fries", 119, true, "Crispy fries dusted with peri peri spice.", burger),
          item("m5", "Brownie Sundae", 159, true, "Warm brownie with vanilla ice cream.", dessert),
        ],
      },
    ],
  },
  {
    id: "sakura-sushi",
    name: "Sakura Sushi Co.",
    cuisines: ["Sushi", "Japanese", "Asian"],
    rating: 4.6,
    reviews: "1.2K",
    time: "35–40 min",
    priceForTwo: 1200,
    image: sushi,
    area: "Civil Lines, Jaipur",
    menu: [
      {
        title: "Signature Rolls",
        items: [
          item("m1", "Salmon Nigiri Set", 549, false, "Fresh salmon over seasoned sushi rice, 6 pcs.", sushi, true),
          item("m2", "California Roll", 399, false, "Crab stick, avocado and cucumber, 8 pcs.", sushi),
          item("m3", "Veggie Maki", 299, true, "Avocado, cucumber and pickled radish, 8 pcs.", sushi),
        ],
      },
      {
        title: "Extras",
        items: [
          item("m4", "Miso Soup", 149, true, "Classic soybean broth with tofu and wakame.", sushi),
          item("m5", "Matcha Cheesecake", 249, true, "Creamy matcha-infused dessert.", dessert, true),
        ],
      },
    ],
  },
  {
    id: "dosa-district",
    name: "Dosa District",
    cuisines: ["South Indian", "Dosa", "Breakfast"],
    rating: 4.3,
    reviews: "4.7K",
    time: "20–30 min",
    priceForTwo: 300,
    image: dosa,
    offer: "Flat ₹75 OFF above ₹299",
    area: "Bapu Nagar, Jaipur",
    pureVeg: true,
    menu: [
      {
        title: "Dosas",
        items: [
          item("m1", "Masala Dosa", 129, true, "Crisp crepe with spiced potato filling, sambar & chutneys.", dosa, true),
          item("m2", "Mysore Masala Dosa", 159, true, "Fiery red chutney spread with potato masala.", dosa),
          item("m3", "Ghee Roast Dosa", 149, true, "Golden ghee-roasted, extra crisp.", dosa, true),
        ],
      },
      {
        title: "Combos",
        items: [
          item("m4", "Idli Vada Combo", 119, true, "Soft idlis with medu vada and sambar.", dosa),
          item("m5", "Filter Coffee", 69, true, "Authentic South Indian filter coffee.", dessert),
        ],
      },
    ],
  },
  {
    id: "green-bowl",
    name: "The Green Bowl",
    cuisines: ["Healthy", "Salads", "Smoothies"],
    rating: 4.5,
    reviews: "980",
    time: "15–20 min",
    priceForTwo: 700,
    image: salad,
    area: "Mansarovar, Jaipur",
    pureVeg: true,
    menu: [
      {
        title: "Bowls",
        items: [
          item("m1", "Avocado Buddha Bowl", 349, true, "Avocado, quinoa, greens and citrus dressing.", salad, true),
          item("m2", "Protein Paneer Bowl", 329, true, "Grilled paneer, chickpeas, roasted veggies.", salad),
          item("m3", "Rainbow Salad", 279, true, "Seasonal veggies with tahini drizzle.", salad),
        ],
      },
      {
        title: "Desserts",
        items: [
          item("m4", "Greek Yogurt Parfait", 199, true, "Yogurt, granola and fresh berries.", dessert),
          item("m5", "Choco Lava Cake", 99, true, "Molten chocolate centre cake.", dessert),
        ],
      },
    ],
  },
  {
    id: "curry-pot",
    name: "The Curry Pot",
    cuisines: ["North Indian", "Curries", "Tandoor"],
    rating: 4.0,
    reviews: "3.1K",
    time: "30–40 min",
    priceForTwo: 550,
    image: curry,
    offer: "30% OFF up to ₹150",
    area: "Raja Park, Jaipur",
    menu: [
      {
        title: "Mains",
        items: [
          item("m1", "Butter Chicken", 329, false, "Creamy tomato gravy with charcoal-grilled chicken.", curry, true),
          item("m2", "Paneer Butter Masala", 279, true, "Soft paneer in a rich makhani gravy.", curry, true),
          item("m3", "Dal Makhani", 229, true, "Slow-cooked black lentils with butter.", curry),
        ],
      },
      {
        title: "Breads & Rice",
        items: [
          item("m4", "Butter Naan", 49, true, "Tandoor-baked with a butter glaze.", curry),
          item("m5", "Jeera Rice", 149, true, "Basmati tossed with cumin.", biryani),
        ],
      },
    ],
  },
  {
    id: "sweet-tooth",
    name: "Sweet Tooth Studio",
    cuisines: ["Desserts", "Bakery", "Ice Cream"],
    rating: 4.7,
    reviews: "2.9K",
    time: "15–25 min",
    priceForTwo: 350,
    image: dessert,
    offer: "Flat 20% OFF",
    area: "Tonk Road, Jaipur",
    promoted: true,
    pureVeg: true,
    menu: [
      {
        title: "Bestsellers",
        items: [
          item("m1", "Choco Lava Cake", 99, true, "Molten chocolate centre cake.", dessert, true),
          item("m2", "Brownie Sundae", 159, true, "Warm brownie with vanilla ice cream.", dessert, true),
          item("m3", "Cheesecake Slice", 189, true, "Baked New York style cheesecake.", dessert),
        ],
      },
      {
        title: "Bakery",
        items: [
          item("m4", "Butter Croissant", 89, true, "Flaky, golden, baked fresh hourly.", dessert),
          item("m5", "Red Velvet Pastry", 129, true, "Classic red velvet with cream cheese.", dessert),
        ],
      },
    ],
  },
];

export const categories = [
  { name: "Pizza", image: pizza },
  { name: "Biryani", image: biryani },
  { name: "Burgers", image: burger },
  { name: "Sushi", image: sushi },
  { name: "Dosa", image: dosa },
  { name: "Curries", image: curry },
  { name: "Healthy", image: salad },
  { name: "Desserts", image: dessert },
];

export const offers = [
  { code: "FEAST50", title: "50% OFF up to ₹100", desc: "Use code FEAST50 on orders above ₹199" },
  { code: "WELCOME20", title: "20% OFF up to ₹120", desc: "Use code WELCOME20 on your first order" },
  { code: "FREEDEL", title: "Free Delivery", desc: "Use code FREEDEL on orders above ₹149" },
];
