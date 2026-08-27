import { useEffect, useState, type CSSProperties } from "react";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  TICKER_ITEMS,
  fmtBRL,
  type Product,
} from "../data";
import {
  IconArrow,
  IconBag,
  IconClose,
  IconHanger,
  IconInstagram,
  IconMinus,
  IconPlus,
} from "../lib";

export interface CartItem {
  product: Product;
  qty: number;
}

/* ---------------- Announcement ticker ---------------- */

function TickerRow() {
  return (
    <div className="flex shrink-0 items-center">
      {TICKER_ITEMS.map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-3 pr-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-gold-soft"
        >
          {item}
          <svg viewBox="0 0 8 8" className="h-2 w-2 text-gold" fill="currentColor" aria-hidden="true">
            <path d="M4 0l1.1 2.9L8 4 5.1 5.1 4 8 2.9 5.1 0 4l2.9-1.1z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="relative z-50 overflow-hidden bg-pine-deep py-2.5">
      <div className="marquee-track" style={{ "--dur": "26s" } as CSSProperties}>
        <TickerRow />
        <TickerRow />
      </div>
    </div>
  );
}

/* ---------------- Header ---------------- */

const NAV = [
  { label: "Departamentos", href: "#departamentos" },
  { label: "Vitrine", href: "#vitrine" },
  { label: "História", href: "#historia" },
  { label: "Envio", href: "#envio" },
  { label: "Contato", href: "#contato" },
];

export function Header({
  count,
  onOpenBag,
}: {
  count: number;
  onOpenBag: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-ink/15 bg-paper/90 shadow-[0_10px_30px_-18px_rgba(9,37,28,0.35)] backdrop-blur-md"
          : "border-transparent bg-paper/0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        {/* logo */}
        <a href="#topo" className="group flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-pine text-gold transition-transform duration-300 group-hover:-rotate-12">
            <IconHanger className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-2xl font-semibold italic tracking-tight text-pine">
              Sapeka
            </span>
            <span className="mt-0.5 block font-mono text-[9px] font-medium uppercase tracking-[0.3em] text-ink/60">
              Multimarcas · 1990
            </span>
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group relative font-mono text-[11.5px] font-medium uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-pine"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 border border-ink/20 px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-all hover:border-pine hover:bg-pine hover:text-gold sm:flex"
          >
            <IconInstagram className="h-4 w-4" />
            {INSTAGRAM_HANDLE}
          </a>

          {/* bag */}
          <button
            onClick={onOpenBag}
            className="relative grid h-10 w-10 place-items-center border border-pine bg-pine text-gold transition-all hover:bg-pine-deep"
            aria-label="Abrir sacola"
          >
            <IconBag className="h-5 w-5" />
            {count > 0 && (
              <span
                key={count}
                className="pop absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 font-mono text-[10px] font-semibold text-cream"
              >
                {count}
              </span>
            )}
          </button>

          {/* mobile menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-10 w-10 place-items-center border border-ink/20 text-ink lg:hidden"
            aria-label="Menu"
          >
            {menuOpen ? (
              <IconClose className="h-5 w-5" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 7h16M4 12h10M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* mobile menu panel */}
      {menuOpen && (
        <div className="border-t border-ink/10 bg-paper px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((n, i) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-dashed border-ink/15 py-3.5 font-display text-2xl font-medium text-pine"
              >
                {n.label}
                <span className="font-mono text-[10px] tracking-[0.2em] text-ink/40">
                  0{i + 1}
                </span>
              </a>
            ))}
          </nav>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex items-center justify-center gap-2 bg-pine py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-gold"
          >
            <IconInstagram className="h-4 w-4" /> Seguir {INSTAGRAM_HANDLE}
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------------- Cart drawer ---------------- */

export function CartDrawer({
  open,
  items,
  onClose,
  onSetQty,
  onRemove,
}: {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onSetQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[80] transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <button
        className="absolute inset-0 bg-pine-deep/70 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Fechar sacola"
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-dashed border-ink/20 px-6 py-5">
          <div>
            <h2 className="font-display text-2xl font-semibold italic text-pine">
              Sua sacola
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">
              {totalQty} {totalQty === 1 ? "item" : "itens"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center border border-ink/20 text-ink transition-colors hover:border-coral hover:text-coral"
            aria-label="Fechar"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-ink/25 text-ink/40">
                <IconHanger className="h-9 w-9" />
              </span>
              <p className="mt-5 font-display text-xl font-medium text-ink/70">
                Sua sacola está vazia
              </p>
              <p className="mt-1 max-w-[240px] text-sm text-ink/50">
                Explore a vitrine e escolha suas peças favoritas.
              </p>
              <a
                href="#vitrine"
                onClick={onClose}
                className="mt-6 flex items-center gap-2 bg-pine px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-pine-deep"
              >
                Ver vitrine <IconArrow className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, qty }) => (
                <li
                  key={product.id}
                  className="flex gap-4 border border-ink/10 bg-paper/60 p-3"
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-20 w-16 shrink-0 object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-display text-[15px] font-medium leading-tight text-pine">
                        {product.name}
                      </p>
                      <button
                        onClick={() => onRemove(product.id)}
                        className="text-ink/40 transition-colors hover:text-coral"
                        aria-label={`Remover ${product.name}`}
                      >
                        <IconClose className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/45">
                      {fmtBRL(product.price)} / un
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-ink/20">
                        <button
                          onClick={() => onSetQty(product.id, qty - 1)}
                          className="grid h-7 w-7 place-items-center text-ink transition-colors hover:bg-pine hover:text-gold"
                          aria-label="Diminuir quantidade"
                        >
                          <IconMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center font-mono text-xs font-semibold">
                          {qty}
                        </span>
                        <button
                          onClick={() => onSetQty(product.id, qty + 1)}
                          className="grid h-7 w-7 place-items-center text-ink transition-colors hover:bg-pine hover:text-gold"
                          aria-label="Aumentar quantidade"
                        >
                          <IconPlus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-mono text-sm font-semibold text-pine">
                        {fmtBRL(product.price * qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-dashed border-ink/20 bg-paper/70 px-6 py-5">
            <div className="flex items-end justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">
                Subtotal
              </span>
              <span className="font-display text-2xl font-semibold text-pine">
                {fmtBRL(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-right font-mono text-[10px] text-ink/45">
              ou 6x de {fmtBRL(subtotal / 6)} sem juros
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2.5 bg-coral py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-cream transition-all hover:brightness-110 active:scale-[0.99]"
            >
              <IconInstagram className="h-4.5 w-4.5" />
              Finalizar pedido pelo Instagram
            </a>
            <p className="mt-2.5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45">
              Frete calculado no direct · Enviamos para todo o Brasil
            </p>
          </footer>
        )}
      </aside>
    </div>
  );
}
