import { Link } from "@tanstack/react-router";
import { Star, BadgePercent, Clock, MapPin } from "lucide-react";
import { display, type Restaurant } from "@/services/restaurantService";

export function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <Link
      to="/restaurant/$id"
      params={{ id: r.id }}
      className="group block overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
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
        {r.offer && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/75 to-transparent p-2.5 pt-6">
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
          <span
            className={`flex shrink-0 items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold ${
              r.rating != null ? "bg-rating text-rating-foreground" : "border text-muted-foreground"
            }`}
          >
            {display.rating(r)}
            {r.rating != null && <Star className="size-3 fill-current" />}
          </span>
        </div>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">{display.cuisines(r)}</p>
        {r.knownFor && (
          <p className="mt-1 truncate text-xs text-muted-foreground">
            Known for <span className="text-foreground">{r.knownFor}</span>
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" /> {r.area}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> {r.deliveryTime}
          </span>
          <span>{display.price(r)}</span>
        </div>
        {r.isVegetarian === true && <p className="mt-1.5 text-xs font-medium text-veg">Pure Veg</p>}
      </div>
    </Link>
  );
}
