import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/lib/cart";
import { computeBill } from "@/lib/billing";
import { offers } from "@/data/images";
import { newOrderId, saveOrder } from "@/lib/orders";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Feasto" },
      { name: "description", content: "Review your Feasto order, apply an offer and enter your delivery details." },
      { property: "og:title", content: "Checkout — Feasto" },
      { property: "og:description", content: "Review your order and enter delivery details on Feasto." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckoutPage,
});

interface Errors {
  name?: string;
  phone?: string;
  address?: string;
}

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, setQty, clear, coupon, setCoupon } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Errors>({});

  const bill = computeBill(subtotal, coupon);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Errors = {};
    const name = form.name.trim();
    const phone = form.phone.trim();
    if (name.length < 3) e.name = "Please enter your full name (at least 3 characters).";
    else if (!/^[a-zA-Z][a-zA-Z\s.'-]*$/.test(name)) e.name = "Name can only contain letters.";
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\s|-/g, "")))
      e.phone = "Enter a valid 10-digit mobile number.";
    if (form.address.trim().length < 10) e.address = "Please enter a complete delivery address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (items.length === 0 || !validate()) return;
    const id = newOrderId();
    saveOrder({
      id,
      placedAt: new Date().toISOString(),
      items,
      bill,
      coupon,
      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        notes: form.notes.trim(),
      },
      status: "Placed",
    });
    clear();
    setCoupon(null);
    navigate({ to: "/order/$id", params: { id } });
  };

  const field = "mt-1 w-full rounded-xl border bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary";

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />

      <main className="mx-auto max-w-6xl px-4 pb-24 md:pb-8">
        <h1 className="mt-8 text-2xl font-bold sm:text-3xl">Checkout</h1>

        {items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border bg-card p-10 text-center text-muted-foreground">
            <ShoppingCart className="size-12" />
            <p className="font-medium text-foreground">Your cart is empty</p>
            <Link to="/" className="mt-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Browse restaurants
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Delivery details */}
            <form onSubmit={placeOrder} noValidate className="rounded-2xl border bg-card p-5">
              <h2 className="text-lg font-semibold">Delivery details</h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Full name
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Aarav Sharma"
                    className={field}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="mt-1 text-xs font-medium text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-medium">
                    Mobile number
                  </label>
                  <input
                    id="phone"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="98XXXXXXXX"
                    className={field}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <p className="mt-1 text-xs font-medium text-destructive">{errors.phone}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="address" className="text-sm font-medium">
                  Delivery address
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  placeholder="Flat / house no, street, area, Jaipur"
                  className={field}
                  aria-invalid={!!errors.address}
                />
                {errors.address && <p className="mt-1 text-xs font-medium text-destructive">{errors.address}</p>}
              </div>

              <div className="mt-4">
                <label htmlFor="notes" className="text-sm font-medium">
                  Delivery instructions <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="notes"
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Ring the bell once"
                  className={field}
                />
              </div>

              <div className="mt-5 rounded-xl border bg-muted/40 p-3.5 text-sm">
                <p className="font-semibold">Payment</p>
                <p className="mt-1 text-muted-foreground">
                  Cash on delivery (demo). This is a prototype — no real payment is taken and no restaurant is
                  contacted.
                </p>
              </div>

              <button
                type="submit"
                className="mt-5 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Place Order · ₹{bill.total}
              </button>
            </form>

            {/* Order summary */}
            <aside className="h-fit rounded-2xl border bg-card p-5 lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Your order</h2>
                <button onClick={clear} className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-destructive">
                  <Trash2 className="size-3.5" /> Clear
                </button>
              </div>

              <ul className="mt-4 space-y-3">
                {items.map((i) => (
                  <li key={i.id} className="flex items-center gap-3">
                    <img src={i.image} alt={i.name} loading="lazy" width={48} height={48} className="size-12 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{i.name}</p>
                      <p className="text-xs text-muted-foreground">₹{i.price} each</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border px-2 py-1 text-sm">
                      <button onClick={() => setQty(i.id, i.qty - 1)} aria-label={`Decrease ${i.name}`} className="px-1 text-primary">
                        −
                      </button>
                      <span className="w-4 text-center font-semibold">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} aria-label={`Increase ${i.name}`} className="px-1 text-primary">
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl border bg-offer p-3.5">
                <p className="mb-2 text-sm font-semibold text-offer-foreground">Apply offer</p>
                <div className="flex flex-wrap gap-2">
                  {offers.map((o) => (
                    <button
                      key={o.code}
                      onClick={() => setCoupon(coupon === o.code ? null : o.code)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                        coupon === o.code
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-dashed border-offer-foreground/50 text-offer-foreground"
                      }`}
                    >
                      {o.code}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{bill.subtotal}</span>
                </div>
                {bill.discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Offer discount</span>
                    <span>−₹{bill.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery fee</span>
                  <span>{bill.delivery === 0 ? "Free" : `₹${bill.delivery}`}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes & charges</span>
                  <span>₹{bill.taxes}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-base font-semibold">
                  <span>To pay</span>
                  <span>₹{bill.total}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
