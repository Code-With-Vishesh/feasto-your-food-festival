import pizza from "@/assets/pizza.jpg";
import burger from "@/assets/burger.jpg";
import biryani from "@/assets/biryani.jpg";
import sushi from "@/assets/sushi.jpg";
import dessert from "@/assets/dessert.jpg";
import curry from "@/assets/curry.jpg";
import salad from "@/assets/salad.jpg";
import dosa from "@/assets/dosa.jpg";

export const images = { pizza, burger, biryani, sushi, dessert, curry, salad, dosa };

export const categories = [
  { name: "Pizza", image: pizza },
  { name: "Biryani", image: biryani },
  { name: "Burgers", image: burger },
  { name: "Japanese", image: sushi },
  { name: "South Indian", image: dosa },
  { name: "North Indian", image: curry },
  { name: "Healthy", image: salad },
  { name: "Desserts", image: dessert },
];

export const offers = [
  { code: "FEAST50", title: "50% OFF up to ₹100", desc: "Use code FEAST50 on orders above ₹199" },
  { code: "WELCOME20", title: "20% OFF up to ₹120", desc: "Use code WELCOME20 on your first order" },
  { code: "FREEDEL", title: "Free Delivery", desc: "Use code FREEDEL on orders above ₹149" },
];
