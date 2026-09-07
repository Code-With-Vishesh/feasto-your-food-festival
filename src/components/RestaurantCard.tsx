import { Link } from "@tanstack/react-router";
import { Star, BadgePercent } from "lucide-react";
import type { Restaurant } from "@/data/restaurants";

export function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <Link
      to="/restaurant/$id"
      params={{ id: r.id }}
      className="group block overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={r.image}
          alt={r.name}
          loading="lazy"
          width={800}
          height={600}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {r.promoted && (
          <span className="absolute left-2.5 top-2.5 rounded bg-foreground/70 px-2 py-0.5 text-[11px] font-medium text-primary-foreground">
            Promoted
          </span>
        )}
        {r.offer && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-2.5 pt-6">
            <span className="flex items-center gap-1 text-sm font-semibold text-primary-foreground">
              <BadgePercent className="size-4" />
              {r.offer}
            </span>
          </div>
        )}
      </div>
      <div className="p-3.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-base font-semibold">{r.name}</h3>
          <span className="flex shrink-0 items-center gap-0.5 rounded-md bg-rating px-1.5 py-0.5 text-xs font-semibold text-rating-foreground">
            {r.rating.toFixed(1)} <Star className="size-3 fill-current" />
          </span>
        </div>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">{r.cuisines.join(", ")}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          ₹{r.priceForTwo} for two · {r.time} · {r.area}
        </p>
        {r.pureVeg && <p className="mt-1.5 text-xs font-medium text-veg">Pure Veg</p>}
      </div>
    </Link>
  );
}
