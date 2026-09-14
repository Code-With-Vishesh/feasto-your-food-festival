import { offers } from "@/data/images";

export interface Bill {
  subtotal: number;
  discount: number;
  delivery: number;
  taxes: number;
  total: number;
}

export function computeBill(subtotal: number, coupon: string | null): Bill {
  const valid = coupon && offers.some((o) => o.code === coupon) ? coupon : null;
  let discount = 0;
  if (valid === "FEAST50") discount = Math.min(100, Math.round(subtotal * 0.5));
  else if (valid === "WELCOME20") discount = Math.min(120, Math.round(subtotal * 0.2));

  const afterDiscount = Math.max(0, subtotal - discount);
  const delivery = subtotal === 0 ? 0 : valid === "FREEDEL" || afterDiscount >= 149 ? 0 : 29;
  const taxes = Math.round(afterDiscount * 0.05);

  return { subtotal, discount, delivery, taxes, total: afterDiscount + delivery + taxes };
}
