import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { RestaurantCard } from "@/components/RestaurantCard";
import { searchRestaurants } from "@/services/restaurantService";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => (s["q"] ? { q: String(s["q"]) } : {}),
  head: () => ({
    meta: [
      { title: "Search Restaurants & Dishes | Feasto" },
      { name: "description", content: "Search Jaipur restaurants, cuisines and dishes on Feasto and order food online." },
      { property: "og:title", content: "Search Restaurants & Dishes | Feasto" },
      { property: "og:description", content: "Find restaurants and cuisines near you on Feasto." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const results = useMemo(() => searchRestaurants(q), [q]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-xl font-bold sm:text-2xl">
          {q ? `Results for "${q}"` : "Search restaurants"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{results.length} restaurants found</p>
        {results.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">No restaurants match your search. Try a different dish, cuisine or area.</p>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((r) => (
              <RestaurantCard key={r.id} r={r} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
