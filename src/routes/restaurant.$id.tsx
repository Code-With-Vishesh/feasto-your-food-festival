import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgePercent, Clock, Star } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { restaurants, type MenuItem, type Restaurant } from "@/data/restaurants";

export const Route = createFileRoute("/restaurant/$id")({
  head: ({ params }) => {
    const r = restaurants.find((x) => x.id === params.id);
    const title = r ? `${r.name} — Order Online | Feasto` : "Restaurant | Feasto";
    const desc = r
      ? `Order ${r.cuisines.join(", ")} from ${r.name} on Feasto. Rated ${r.rating}, delivery in ${r.time}.`
      : "Order food online on Feasto.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/restaurant/${params.id}` },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: `/restaurant/${params.id}` }],
    };
  },
  component: RestaurantPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <h1 className="text-2xl font-bold">Restaurant not found</h1>
      <Link to="/" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
        Back to Feasto
      </Link>
    </div>
  ),
});

function VegBadge({ veg }: { veg: boolean }) {
  return (
    <span
      className={`inline-flex size-4 items-center justify-center rounded-sm border-2 ${veg ? "border-veg" : "border-nonveg"}`}
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span className={`size-1.5 rounded-full ${veg ? "bg-veg" : "bg-nonveg"}`} />
    </span>
  );
}

function MenuItemRow({ item, restaurant }: { item: MenuItem; restaurant: Restaurant }) {
  const { add, items, setQty, open } = useCart();
  const inCart = items.find((i) => i.id === item.id);

  return (
    <div className="flex gap-4 border-b py-5 last:border-0">
      <div className="min-w-0 flex-1">
        <VegBadge veg={item.veg} />
        <h3 className="mt-1.5 text-base font-semibold">{item.name}</h3>
        <p className="mt-0.5 text-sm font-medium">₹{item.price}</p>
        {item.bestseller && (
          <span className="mt-1 inline-block rounded bg-offer px-1.5 py-0.5 text-[11px] font-semibold text-offer-foreground">
            ★ Bestseller
          </span>
        )}
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{item.desc}</p>
      </div>
      <div className="relative shrink-0">
        <img src={item.image} alt={item.name} loading="lazy" width={800} height={600} className="size-28 rounded-xl object-cover" />
        {inCart ? (
          <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-lg border bg-card px-3 py-1.5 font-semibold text-primary shadow">
            <button onClick={() => setQty(item.id, inCart.qty - 1)} aria-label="Decrease">−</button>
            <span>{inCart.qty}</span>
            <button onClick={() => setQty(item.id, inCart.qty + 1)} aria-label="Increase">+</button>
          </div>
        ) : (
          <button
            onClick={() => {
              add({
                id: item.id,
                restaurantId: restaurant.id,
                restaurantName: restaurant.name,
                name: item.name,
                price: item.price,
                image: item.image,
              });
              open();
            }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-lg border bg-card px-6 py-1.5 text-sm font-semibold text-primary shadow hover:bg-accent"
          >
            ADD
          </button>
        )}
      </div>
    </div>
  );
}

function RestaurantPage() {
  const { id } = Route.useParams();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <h1 className="text-2xl font-bold">Restaurant not found</h1>
        <Link to="/" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Back to Feasto
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />

      <main className="mx-auto max-w-4xl px-4">
        <Link to="/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Back to restaurants
        </Link>

        {/* Hero */}
        <div className="mt-4 overflow-hidden rounded-3xl border">
          <img src={restaurant.image} alt={restaurant.name} width={800} height={600} className="h-52 w-full object-cover sm:h-72" />
        </div>

        <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{restaurant.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{restaurant.cuisines.join(", ")}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{restaurant.area}</p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border p-3.5">
            <div className="text-center">
              <span className="flex items-center gap-1 rounded-md bg-rating px-2 py-1 text-sm font-bold text-rating-foreground">
                {restaurant.rating.toFixed(1)} <Star className="size-3.5 fill-current" />
              </span>
              <p className="mt-1 text-xs text-muted-foreground">{restaurant.reviews} reviews</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Clock className="size-4 text-primary" /> {restaurant.time}
            </div>
          </div>
        </div>

        {restaurant.offer && (
          <div className="mt-4 flex items-center gap-3 rounded-xl border bg-offer p-3.5">
            <BadgePercent className="size-5 shrink-0 text-offer-foreground" />
            <p className="text-sm font-semibold text-offer-foreground">{restaurant.offer}</p>
          </div>
        )}

        {/* Menu */}
        <div className="mt-8">
          <h2 className="text-xl font-bold">Menu</h2>
          {restaurant.menu.map((section) => (
            <section key={section.title} className="mt-6">
              <h3 className="text-base font-bold uppercase tracking-wide text-muted-foreground">{section.title}</h3>
              <div className="mt-2 rounded-2xl border bg-card px-5">
                {section.items.map((mi) => (
                  <MenuItemRow key={mi.id} item={mi} restaurant={restaurant} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
