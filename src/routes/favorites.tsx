import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useFavorites } from "@/lib/favorites";
import { getRestaurantById } from "@/services/restaurantService";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Your favourites — Feasto" },
      { name: "description", content: "The Jaipur restaurants you saved on Feasto, ready to order from again." },
      { property: "og:title", content: "Your favourites — Feasto" },
      { property: "og:description", content: "Restaurants you saved on Feasto." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { ids } = useFavorites();
  const list = ids.map((id) => getRestaurantById(id)).filter((r): r is NonNullable<typeof r> => !!r);

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />

      <main className="mx-auto max-w-6xl px-4 pb-24 md:pb-8">
        <h1 className="mt-8 text-2xl font-bold sm:text-3xl">Your favourites</h1>

        {list.length === 0 ? (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border bg-card p-10 text-center text-muted-foreground">
            <Heart className="size-12" />
            <p className="font-medium text-foreground">No favourites yet</p>
            <p className="text-sm">Tap the heart on any restaurant to save it here.</p>
            <Link to="/" className="mt-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Discover restaurants
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((r) => (
              <RestaurantCard key={r.id} r={r} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
