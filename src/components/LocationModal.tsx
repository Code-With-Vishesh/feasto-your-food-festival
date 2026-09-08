import { MapPin, Navigation, Search, X } from "lucide-react";
import { useState } from "react";
import { JAIPUR_AREAS } from "@/lib/location";

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
  const filtered = JAIPUR_AREAS.filter((r) => r.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/40 p-4 pt-24" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-card p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Select your location"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Select your location</h2>
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
        <button
          onClick={() => {
            onSelect("Jaipur");
            onClose();
          }}
          className="mt-3 flex w-full items-center gap-2.5 rounded-xl border border-primary/30 bg-accent px-3.5 py-3 text-sm font-medium text-primary"
        >
          <Navigation className="size-4" />
          Show all of Jaipur
        </button>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Popular areas</p>
        <ul className="mt-1 max-h-72 divide-y overflow-y-auto">
          {filtered.map((loc) => (
            <li key={loc}>
              <button
                onClick={() => {
                  onSelect(loc);
                  onClose();
                }}
                className="flex w-full items-center gap-2.5 py-3 text-left text-sm hover:text-primary"
              >
                <MapPin className="size-4 text-muted-foreground" />
                {loc}
              </button>
            </li>
          ))}
          {filtered.length === 0 && <li className="py-3 text-sm text-muted-foreground">No matching area in Jaipur.</li>}
        </ul>
      </div>
    </div>
  );
}
