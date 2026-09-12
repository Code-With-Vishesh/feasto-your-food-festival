import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { offers } from "@/data/images";

export function CartDrawer() {
  const { items, isOpen, close, setQty, clear, subtotal, count } = useCart();
  const [applied, setApplied] = useState<string | null>(null);
  const [placed, setPlaced] = useState(false);

  if (!isOpen) return null;

  const discount = applied === "FEAST50" ? Math.min(100, Math.round(subtotal * 0.5)) : applied ? Math.min(120, Math.round(subtotal * 0.2)) : 0;
  const delivery = subtotal - discount >= 149 || applied === "FREEDEL" ? 0 : 29;
  const total = Math.max(0, subtotal - discount) + delivery;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/40" onClick={close}>
      <div
        className="flex h-full w-full max-w-md flex-col bg-card shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold">Your Cart {count > 0 && `(${count})`}</h2>
          <button onClick={close} aria-label="Close cart" className="rounded-full p-1.5 hover:bg-muted">
            <X className="size-5" />
          </button>
        </div>

        {placed ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-success/15 text-4xl">🎉</div>
            <h3 className="text-xl font-semibold">Order placed!</h3>
            <p className="text-sm text-muted-foreground">
              Your food is being prepared. Estimated delivery in 30–35 min.
            </p>
            <button
              onClick={() => {
                setPlaced(false);
                close();
              }}
              className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Continue browsing
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center text-muted-foreground">
            <ShoppingCart className="size-12" />
            <p className="font-medium text-foreground">Your cart is empty</p>
            <p className="text-sm">Add some delicious food to get started.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <p className="mb-3 text-sm font-medium text-muted-foreground">{items[0].restaurantName}</p>
              <ul className="space-y-4">
                {items.map((i) => (
                  <li key={i.id} className="flex items-center gap-3">
                    <img src={i.image} alt={i.name} width={56} height={56} loading="lazy" className="size-14 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{i.name}</p>
                      <p className="text-sm text-muted-foreground">₹{i.price}</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border px-2 py-1">
                      <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease quantity" className="p-1 text-primary">
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-4 text-center text-sm font-semibold">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase quantity" className="p-1 text-primary">
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border bg-offer p-3.5">
                <p className="mb-2 text-sm font-semibold text-offer-foreground">Apply offer</p>
                <div className="flex flex-wrap gap-2">
                  {offers.map((o) => (
                    <button
                      key={o.code}
                      onClick={() => setApplied(applied === o.code ? null : o.code)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                        applied === o.code
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
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Offer discount</span>
                    <span>−₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery fee</span>
                  <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-base font-semibold">
                  <span>To pay</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

            <div className="border-t p-5">
              <button
                onClick={() => {
                  clear();
                  setApplied(null);
                  setPlaced(true);
                }}
                className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Place Order · ₹{total}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
