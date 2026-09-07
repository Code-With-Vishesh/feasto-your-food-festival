import { MapPin, Navigation, Search, X } from "lucide-react";
import { useState } from "react";

const RECENT = ["Jaipur", "Malviya Nagar, Jaipur", "C Scheme, Jaipur", "Vaishali Nagar, Jaipur"];

export function LocationModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (loc: string) => void;
}) {
  const [q, setQ] = useState("");
  if (!open) return null;
  const filtered = RECENT.filter((r) => r.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/40 p-4 pt-24" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-card p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Choose your location"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Choose your location</h2>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 hover:bg-muted">
            <X className="size-5" />
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-xl border px-3.5 py-2.5">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search area"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <button className="mt-3 flex w-full items-center gap-2.5 rounded-xl border border-primary/30 bg-accent px-3.5 py-3 text-sm font-medium text-primary">
          <Navigation className="size-4" />
          Use current location
        </button>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recent locations</p>
        <ul className="mt-1 divide-y">
          {filtered.map((loc) => (
            <li key={loc}>
              <button
                onClick={() => {
                  onSelect(loc.split(",")[0]);
                  onClose();
                }}
                className="flex w-full items-center gap-2.5 py-3 text-left text-sm hover:text-primary"
              >
                <MapPin className="size-4 text-muted-foreground" />
                {loc}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
