import { Link, useNavigate } from "@tanstack/react-router";
import { MapPin, Search, ShoppingCart, ChevronDown, Home, ClipboardList, User, Tag, HelpCircle, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { LocationModal } from "./LocationModal";

export function Navbar() {
  const { count, open } = useCart();
  const [locOpen, setLocOpen] = useState(false);
  const [location, setLocation] = useState("Jaipur");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur transition-shadow">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
          <Link to="/" className="flex items-center gap-1.5 text-2xl font-bold tracking-tight text-primary">
            <UtensilsCrossed className="size-6" />
            Feasto
          </Link>

          <button
            onClick={() => setLocOpen(true)}
            className="ml-2 hidden items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary sm:flex"
          >
            <MapPin className="size-4 text-primary" />
            {location}
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>

          <div className="mx-auto hidden w-full max-w-md items-center gap-2 rounded-full border bg-background px-4 py-2.5 md:flex">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && navigate({ to: "/", search: { q: query } })}
              placeholder="Search restaurants, dishes & cuisines"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <nav className="ml-auto hidden items-center gap-5 text-sm font-medium text-muted-foreground lg:flex">
            <Link to="/" className="flex items-center gap-1 hover:text-primary">
              <Tag className="size-4" /> Offers
            </Link>
            <a href="#help" className="flex items-center gap-1 hover:text-primary">
              <HelpCircle className="size-4" /> Help
            </a>
            <span className="cursor-pointer hover:text-primary">Login</span>
            <span className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
              Sign Up
            </span>
          </nav>

          <button
            onClick={open}
            className="relative ml-2 flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium hover:border-primary hover:text-primary"
            aria-label="Open cart"
          >
            <ShoppingCart className="size-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
        </div>

        {/* Mobile location + search */}
        <div className="border-t px-4 py-2 md:hidden">
          <button onClick={() => setLocOpen(true)} className="mb-2 flex items-center gap-1.5 text-sm font-medium">
            <MapPin className="size-4 text-primary" />
            {location}
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2 rounded-full border bg-background px-4 py-2.5">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && navigate({ to: "/", search: { q: query } })}
              placeholder="Search restaurants, dishes..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t bg-card pb-[env(safe-area-inset-bottom)] md:hidden">
        {[
          { icon: Home, label: "Home", to: "/" },
          { icon: Search, label: "Search", to: "/" },
          { icon: ClipboardList, label: "Orders", to: "/" },
          { icon: User, label: "Profile", to: "/" },
        ].map(({ icon: Icon, label, to }) => (
          <Link
            key={label}
            to={to}
            className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-muted-foreground [&.active]:text-primary"
          >
            <Icon className="size-5" />
            {label}
          </Link>
        ))}
      </nav>

      <LocationModal open={locOpen} onClose={() => setLocOpen(false)} onSelect={setLocation} />
    </>
  );
}
