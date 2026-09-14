import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { getOrders, type Order } from "@/lib/orders";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Your orders — Feasto" },
      { name: "description", content: "See your past Feasto orders with items, totals and delivery addresses." },
      { property: "og:title", content: "Your orders — Feasto" },
      { property: "og:description", content: "Your Feasto order history, saved on this device." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => setOrders(getOrders()), []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />

      <main className="mx-auto max-w-3xl px-4 pb-24 md:pb-8">
        <h1 className="mt-8 text-2xl font-bold sm:text-3xl">Your orders</h1>

        {orders.length === 0 ? (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border bg-card p-10 text-center text-muted-foreground">
            <ClipboardList className="size-12" />
            <p className="font-medium text-foreground">No orders yet</p>
            <p className="text-sm">Your placed orders will appear here.</p>
            <Link to="/" className="mt-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Start ordering
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {orders.map((o) => (
              <li key={o.id}>
                <Link
                  to="/order/$id"
                  params={{ id: o.id }}
                  className="block rounded-2xl border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">{o.items[0]?.restaurantName ?? "Feasto order"}</p>
                    <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                      {o.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {new Date(o.placedAt).toLocaleString()} · Order {o.id}
                  </p>
                  <p className="mt-2 truncate text-sm text-muted-foreground">
                    {o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}
                  </p>
                  <p className="mt-2 text-sm font-semibold">₹{o.bill.total}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
