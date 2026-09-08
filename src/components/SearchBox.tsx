import { useNavigate } from "@tanstack/react-router";
import { Search, Clock, TrendingUp, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getRestaurants, searchRestaurants } from "@/services/restaurantService";

const POPULAR = ["Pizza", "Biryani", "North Indian", "South Indian", "Chinese", "Desserts", "Cafe"];
const TRENDING = ["C-Scheme", "Rooftop", "Pasta", "Kebab", "Healthy"];

function loadRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem("feasto-recent-searches") || "[]");
  } catch {
    return [];
  }
}

export function saveRecentSearch(q: string) {
  const term = q.trim();
  if (!term) return;
  try {
    const next = [term, ...loadRecent().filter((r) => r.toLowerCase() !== term.toLowerCase())].slice(0, 6);
    localStorage.setItem("feasto-recent-searches", JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function SearchBox({ placeholder = "Search restaurants, dishes & cuisines" }: { placeholder?: string }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => setRecent(loadRecent()), []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const go = (q: string) => {
    if (!q.trim()) return;
    saveRecentSearch(q);
    setRecent(loadRecent());
    setQuery(q);
    setOpen(false);
    navigate({ to: "/search", search: { q } });
  };

  const suggestions = query.trim() ? searchRestaurants(query, getRestaurants()).slice(0, 5) : [];

  return (
    <div ref={boxRef} className="relative w-full">
      <div className="flex items-center gap-2 rounded-full border bg-background px-4 py-2.5 focus-within:border-primary">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onKeyDown={(e) => e.key === "Enter" && go(query)}
          placeholder={placeholder}
          aria-label="Search restaurants, dishes and cuisines"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {query && (
          <button onClick={() => setQuery("")} aria-label="Clear search">
            <X className="size-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-[26rem] overflow-y-auto rounded-2xl border bg-card p-4 shadow-xl">
          {suggestions.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Restaurants</p>
              <ul className="mt-1.5 space-y-1">
                {suggestions.map((r) => (
                  <li key={r.id}>
                    <button
                      onClick={() => {
                        setOpen(false);
                        navigate({ to: "/restaurant/$id", params: { id: r.id } });
                      }}
                      className="flex w-full items-center gap-3 rounded-lg p-1.5 text-left hover:bg-muted"
                    >
                      <img src={r.image} alt="" className="size-10 rounded-lg object-cover" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{r.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {r.cuisines.join(" • ")} · {r.area}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recent.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recent searches</p>
                <button
                  onClick={() => {
                    localStorage.removeItem("feasto-recent-searches");
                    setRecent([]);
                  }}
                  className="text-xs font-medium text-primary"
                >
                  Clear
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {recent.map((t) => (
                  <button
                    key={t}
                    onClick={() => go(t)}
                    className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary"
                  >
                    <Clock className="size-3.5" /> {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Popular searches</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {POPULAR.map((t) => (
              <button
                key={t}
                onClick={() => go(t)}
                className="rounded-full border px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary"
              >
                {t}
              </button>
            ))}
          </div>

          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Trending in Jaipur</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {TRENDING.map((t) => (
              <button
                key={t}
                onClick={() => go(t)}
                className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-primary"
              >
                <TrendingUp className="size-3.5" /> {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
