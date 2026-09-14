import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, ChefHat, Bike, PackageCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { getOrderById, type Order } from "@/lib/orders";

export const Route = createFileRoute("/order/$id")({
  head: () => ({
    meta: [
      { title: "Order confirmation — Feasto" },
      { name: "description", content: "Your Feasto order summary with items, totals and delivery details." },
      { property: "og:title", content: "Order confirmation — Feasto" },
      { property: "og:description", content: "Track your Feasto demo order and view the full bill summary." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrderPage,
});

const STEPS = [
  { label: "Order placed", icon: CheckCircle2 },
  { label: "Preparing", icon: ChefHat },
  { label: "Out for delivery", icon: Bike },
  { label: "Delivered", icon: PackageCheck },
];

function OrderPage() {
  const { id } = Route.useParams();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(getOrderById(id) ?? null);
  }, [id]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />

      <main className="mx-auto max-w-3xl px-4 pb-24 md:pb-8">
        {order === undefined ? (
          <p className="mt-10 text-sm text-muted-foreground">Loading your order…</p>
        ) : order === null ? (
          <div className="mt-10 rounded-2xl border bg-card p-10 text-center">
            <h1 className="text-xl font-semibold">Order not found</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              We couldn't find order {id} on this device. Orders are saved only in this browser.
            </p>
            <Link to="/" className="mt-5 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Back to home
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 rounded-2xl border bg-card p-6 text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/15 text-4xl">🎉</div>
              <h1 className="mt-3 text-2xl font-bold">Your order has been placed successfully!</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Order ID <span className="font-semibold text-foreground">{order.id}</span> · Estimated delivery in
                30–35 min
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                This is a demo order for a prototype — no payment was taken and no restaurant was contacted.
              </p>
            </div>

            {/* Tracking UI */}
            <div className="mt-6 grid grid-cols-4 gap-2 rounded-2xl border bg-card p-5">
              {STEPS.map(({ label, icon: Icon }, idx) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <span
                    className={`flex size-10 items-center justify-center rounded-full ${
                      idx === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className={`text-[11px] font-medium ${idx === 0 ? "text-foreground" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border bg-card p-5">
              <h2 className="text-lg font-semibold">Items</h2>
              <ul className="mt-3 space-y-3">
                {order.items.map((i) => (
                  <li key={i.id} className="flex items-center gap-3">
                    <img src={i.image} alt={i.name} loading="lazy" width={48} height={48} className="size-12 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{i.name}</p>
                      <p className="text-xs text-muted-foreground">{i.restaurantName}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">× {i.qty}</span>
                    <span className="w-16 text-right text-sm font-semibold">₹{i.qty * i.price}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 space-y-1.5 border-t pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{order.bill.subtotal}</span>
                </div>
                {order.bill.discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount {order.coupon ? `(${order.coupon})` : ""}</span>
                    <span>−₹{order.bill.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery fee</span>
                  <span>{order.bill.delivery === 0 ? "Free" : `₹${order.bill.delivery}`}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes & charges</span>
                  <span>₹{order.bill.taxes}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-base font-semibold">
                  <span>Total paid</span>
                  <span>₹{order.bill.total}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border bg-card p-5 text-sm">
              <h2 className="text-lg font-semibold">Delivering to</h2>
              <p className="mt-2 font-medium">{order.customer.name}</p>
              <p className="text-muted-foreground">{order.customer.phone}</p>
              <p className="text-muted-foreground">{order.customer.address}</p>
              {order.customer.notes && <p className="mt-1 text-muted-foreground">Note: {order.customer.notes}</p>}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                Continue browsing
              </Link>
              <Link to="/orders" className="rounded-xl border px-5 py-2.5 text-sm font-semibold">
                View all orders
              </Link>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
