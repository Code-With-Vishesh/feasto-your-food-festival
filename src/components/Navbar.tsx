import { Link } from "@tanstack/react-router";
import {
  MapPin,
  Search,
  ShoppingCart,
  ChevronDown,
  Home,
  ClipboardList,
  User,
  Tag,
  HelpCircle,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useLocationArea } from "@/lib/location";
import { LocationModal } from "./LocationModal";
import { SearchBox } from "./SearchBox";

export function Navbar() {
  const { count, open } = useCart();
  const { location, setLocation } = useLocationArea();
  const [locOpen, setLocOpen] = useState(false);

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

          <div className="mx-auto hidden w-full max-w-md md:block">
            <SearchBox />
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
          <SearchBox placeholder="Search restaurants, dishes..." />
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t bg-card pb-[env(safe-area-inset-bottom)] md:hidden">
        <Link
          to="/"
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-muted-foreground [&.active]:text-primary"
        >
          <Home className="size-5" />
          Home
        </Link>
        <Link
          to="/search"
          search={{ q: "" }}
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-muted-foreground [&.active]:text-primary"
        >
          <Search className="size-5" />
          Search
        </Link>
        <Link
          to="/"
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-muted-foreground"
        >
          <ClipboardList className="size-5" />
          Orders
        </Link>
        <Link
          to="/"
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-muted-foreground"
        >
          <User className="size-5" />
          Profile
        </Link>
      </nav>

      <LocationModal open={locOpen} onClose={() => setLocOpen(false)} onSelect={setLocation} />
    </>
  );
}
