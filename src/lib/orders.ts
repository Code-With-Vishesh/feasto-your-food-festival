import type { CartItem } from "@/lib/cart";
import type { Bill } from "@/lib/billing";

export interface Order {
  id: string;
  placedAt: string;
  items: CartItem[];
  bill: Bill;
  coupon: string | null;
  customer: { name: string; phone: string; address: string; notes?: string };
  status: "Placed" | "Preparing" | "Out for delivery" | "Delivered";
}

const KEY = "feasto-orders";

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function getOrderById(id: string) {
  return getOrders().find((o) => o.id === id);
}

export function saveOrder(order: Order) {
  try {
    localStorage.setItem(KEY, JSON.stringify([order, ...getOrders()]));
  } catch {
    /* ignore */
  }
}

export function newOrderId() {
  return `FE${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 90 + 10)}`;
}
