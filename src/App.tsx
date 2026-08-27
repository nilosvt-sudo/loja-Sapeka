import { useCallback, useState } from "react";
import { CartDrawer, Header, Ticker, type CartItem } from "./components/Chrome";
import { Hero } from "./components/Hero";
import { Departments } from "./components/Departments";
import { Vitrine } from "./components/Vitrine";
import { Story } from "./components/Story";
import { Shipping } from "./components/Shipping";
import { Footer, InstagramCTA } from "./components/Closing";
import type { DeptId, Product } from "./data";

type Filter = DeptId | "tudo";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("tudo");

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const explore = useCallback((d: DeptId) => {
    setFilter(d);
    requestAnimationFrame(() => {
      document
        .getElementById("vitrine")
        ?.scrollIntoView({ block: "start" });
    });
  }, []);

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="grain min-h-screen bg-paper font-body text-ink antialiased">
      <Ticker />
      <Header count={totalQty} onOpenBag={() => setBagOpen(true)} />

      <main>
        <Hero onExplore={explore} />
        <Departments onExplore={explore} />
        <Vitrine filter={filter} onFilter={setFilter} onAdd={addToCart} />
        <Story />
        <Shipping />
        <InstagramCTA />
      </main>

      <Footer />

      <CartDrawer
        open={bagOpen}
        items={cart}
        onClose={() => setBagOpen(false)}
        onSetQty={setQty}
        onRemove={remove}
      />
    </div>
  );
}
