import { createFileRoute } from "@tanstack/react-router";
import { BadgePercent, Bike, UtensilsCrossed, Wine, SlidersHorizontal, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { RestaurantCard } from "@/components/RestaurantCard";
import { categories, offers, restaurants } from "@/data/restaurants";
import heroFood from "@/assets/hero-food.jpg";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>) => ({ q: (s.q as string) ?? "" }),
  head: () => ({
    meta: [
      { title: "Feasto — Order Food Online from Top Restaurants" },
      {
        name: "description",
        content:
          "Feasto is a modern food delivery platform. Discover top-rated restaurants near you, browse menus, grab great offers and get food delivered fast in Jaipur.",
      },
      { property: "og:title", content: "Feasto — Order Food Online from Top Restaurants" },
      {
        property: "og:description",
        content: "Discover top-rated restaurants, browse menus and get food delivered fast with Feasto.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Feasto",
          description: "Modern food delivery and restaurant discovery platform.",
        }),
      },
    ],
  }),
  component: HomePage,
});

const FILTERS = ["Rating 4.0+", "Pure Veg", "Offers", "Fast Delivery", "Under ₹400"];

function HomePage() {
  const { q } = Route.useSearch();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggle = (f: string) =>
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const filtered = useMemo(() => {
    let list = restaurants;
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (r) => r.name.toLowerCase().includes(query) || r.cuisines.some((c) => c.toLowerCase().includes(query))
      );
    }
    if (activeFilters.includes("Rating 4.0+")) list = list.filter((r) => r.rating >= 4.0);
    if (activeFilters.includes("Pure Veg")) list = list.filter((r) => r.pureVeg);
    if (activeFilters.includes("Offers")) list = list.filter((r) => r.offer);
    if (activeFilters.includes("Fast Delivery")) list = list.filter((r) => parseInt(r.time) <= 25);
    if (activeFilters.includes("Under ₹400")) list = list.filter((r) => r.priceForTwo <= 400);
    return list;
  }, [q, activeFilters]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />

      <main className="mx-auto max-w-6xl px-4">
        {/* Mode tabs */}
        <div className="mt-6 flex gap-3 overflow-x-auto scrollbar-hide">
          {[
            { icon: Bike, label: "Delivery", active: true },
            { icon: UtensilsCrossed, label: "Dining Out", active: false },
            { icon: Wine, label: "Nightlife", active: false },
          ].map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`flex shrink-0 items-center gap-2.5 rounded-2xl border px-5 py-3 text-sm font-semibold ${
                active ? "border-primary bg-accent text-primary" : "bg-card text-muted-foreground"
              }`}
            >
              <span className={`flex size-9 items-center justify-center rounded-full ${active ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <Icon className="size-4" />
              </span>
              {label}
            </button>
          ))}
        </div>

        {/* Discovery banner */}
        <section className="relative mt-6 overflow-hidden rounded-3xl">
          <img src={heroFood} alt="A spread of biryani, pizza, burgers and salads" width={1600} height={900} className="h-48 w-full object-cover sm:h-64" />
          <div className="absolute inset-0 flex flex-col justify-center bg-foreground/45 p-6 sm:p-10">
            <h1 className="max-w-md text-3xl font-bold leading-tight text-primary-foreground sm:text-5xl">
              Craving something delicious?
            </h1>
            <p className="mt-2 max-w-sm text-sm text-primary-foreground/90 sm:text-base">
              Order from 500+ top restaurants near you, delivered hot & fast.
            </p>
          </div>
        </section>

        {/* Filter bar */}
        <div className="sticky top-16 z-30 -mx-4 mt-6 flex items-center gap-2 overflow-x-auto bg-background/95 px-4 py-3 backdrop-blur scrollbar-hide">
          <button className="flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium">
            <SlidersHorizontal className="size-3.5" /> Filters
          </button>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => toggle(f)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium ${
                activeFilters.includes(f) ? "border-primary bg-primary text-primary-foreground" : "bg-card"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Categories */}
        <section className="mt-8">
          <h2 className="text-xl font-bold sm:text-2xl">What's on your mind?</h2>
          <div className="mt-4 flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((c) => (
              <button key={c.name} className="group flex w-24 shrink-0 flex-col items-center gap-2">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="size-24 rounded-full border object-cover transition-transform group-hover:scale-105"
                />
                <span className="text-sm font-medium">{c.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Offers strip */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold sm:text-2xl">Great offers for you</h2>
            <span className="flex items-center text-sm font-medium text-primary">
              See all <ChevronRight className="size-4" />
            </span>
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {offers.map((o) => (
              <div key={o.code} className="flex w-72 shrink-0 items-start gap-3 rounded-2xl border bg-offer p-4">
                <BadgePercent className="mt-0.5 size-6 shrink-0 text-offer-foreground" />
                <div>
                  <p className="font-semibold text-offer-foreground">{o.title}</p>
                  <p className="mt-0.5 text-sm text-offer-foreground/80">{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Restaurants */}
        <section className="mt-10">
          <h2 className="text-xl font-bold sm:text-2xl">
            {q ? `Results for "${q}"` : "Top-rated restaurants near you"}
          </h2>
          {filtered.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              No restaurants match your search. Try a different dish or cuisine.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((r) => (
                <RestaurantCard key={r.id} r={r} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
