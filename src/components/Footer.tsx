import { UtensilsCrossed } from "lucide-react";

const COLS: { title: string; links: string[] }[] = [
  { title: "Company", links: ["About us", "Careers", "Blog", "Press"] },
  { title: "For Foodies", links: ["Offers", "Gift cards", "Order again", "Favorites"] },
  { title: "For Restaurants", links: ["Partner with us", "Grow your business", "Apps for you"] },
  { title: "Legal", links: ["Terms", "Privacy", "Security", "Sitemap"] },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-card pb-24 md:pb-8">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center gap-1.5 text-2xl font-bold text-primary">
          <UtensilsCrossed className="size-6" />
          Feasto
        </div>
        <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {COLS.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide">{c.title}</h3>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 border-t pt-6 text-xs text-muted-foreground">
          © 2026 Feasto Technologies Pvt. Ltd. All restaurant names, ratings and offers shown are illustrative demo content.
        </p>
      </div>
    </footer>
  );
}
