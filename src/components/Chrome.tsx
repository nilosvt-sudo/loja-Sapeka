import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PRODUCTS,
  TICKER_ITEMS,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  buildWhatsAppCartUrl,
  fmtBRL,
  type DeptId,
  type Product,
} from "../data";
import {
  CEP_ORIGEM,
  calculateShipping,
  type ShippingOption,
  type ShippingResult,
} from "../services/shippingService";
import {
  IconArrow,
  IconBag,
  IconCheck,
  IconClose,
  IconHanger,
  IconInstagram,
  IconMinus,
  IconPlus,
  IconSearch,
  IconWhatsApp,
} from "../lib";

export interface CartItem {
  product: Product;
  qty: number;
  size?: string;
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
    <aside
      aria-label="Avisos"
      className="relative z-50 overflow-hidden border-b border-pine-deep bg-pine-deep py-2 text-gold-soft"
    >
      <div className="marquee-track" style={{ "--dur": "24s" } as CSSProperties}>
        <TickerRow />
        <TickerRow />
      </div>
    </aside>
  );
}

/* ---------------- Main Header & Search ---------------- */

const NAV_DEPTS: { id: DeptId; label: string }[] = [
  { id: "feminino", label: "Feminino" },
  { id: "masculino", label: "Masculino" },
  { id: "infantil", label: "Infantil" },
  { id: "calcados", label: "Calçados" },
  { id: "casa", label: "Casa & Banho" },
];

const POPULAR_SEARCHES = [
  "Vestido",
  "Linho",
  "Tênis",
  "Camisa",
  "Infantil",
  "Toalha",
  "Midi",
  "Jeans",
];

export function SearchModal({
  open,
  onClose,
  onExplore,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onExplore?: (d: DeptId) => void;
  onAdd?: (p: Product, size?: string) => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.dept.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        (p.tag && p.tag.toLowerCase().includes(q)),
    );
  }, [query]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-pine-deep/80 p-4 pt-16 sm:p-6 sm:pt-24 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="card-in relative w-full max-w-2xl overflow-hidden rounded-2xl border border-pine/30 bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center gap-3 border-b border-ink/15 bg-cream/60 px-5 py-4">
          <IconSearch className="h-5 w-5 text-pine shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O que você está procurando? (ex: vestido, linho, tênis, infantil...)"
            className="w-full bg-transparent font-body text-base text-ink placeholder:text-ink/40 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="grid h-7 w-7 place-items-center rounded-full text-ink/40 transition-colors hover:bg-ink/10 hover:text-ink"
            >
              <IconClose className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="grid h-7 w-7 place-items-center rounded-full text-ink/40 transition-colors hover:bg-ink/10 hover:text-ink"
            >
              <IconClose className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sugestões Populares */}
        {!query && (
          <div className="p-6">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink/50">
              Buscas Populares na Sapeka
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="rounded-full border border-ink/20 bg-cream/80 px-3.5 py-1.5 font-mono text-xs font-semibold text-ink transition-all hover:border-pine hover:bg-pine hover:text-gold"
                >
                  🔍 {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Resultados */}
        {query && (
          <div className="max-h-[60vh] overflow-y-auto p-5">
            <p className="font-mono text-xs font-semibold text-ink/60 mb-3">
              {filtered.length === 0
                ? "Nenhum produto encontrado para esse termo."
                : `Encontramos ${filtered.length} produto(s):`}
            </p>

            {filtered.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {filtered.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-3 rounded-xl border border-ink/15 bg-cream/40 p-2.5 transition-all hover:border-pine/40 hover:bg-cream"
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="h-20 w-16 shrink-0 rounded-lg object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-coral">
                          {product.dept}
                        </span>
                        <h4 className="truncate font-display text-sm font-bold text-pine">
                          {product.name}
                        </h4>
                        <p className="font-mono text-xs font-bold text-ink">
                          {fmtBRL(product.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        {onExplore && (
                          <button
                            onClick={() => {
                              onClose();
                              onExplore(product.dept);
                            }}
                            className="text-[10px] font-mono font-bold uppercase text-pine underline hover:text-coral"
                          >
                            Ver na Vitrine
                          </button>
                        )}
                        {onAdd && (
                          <button
                            onClick={() => {
                              onAdd(product, product.sizes?.[0]);
                              onClose();
                            }}
                            className="ml-auto rounded bg-pine px-2 py-1 font-mono text-[9.5px] font-bold uppercase text-white shadow hover:bg-pine-deep"
                          >
                            + Adicionar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-ink/70">
                  Tente pesquisar por outros termos como <strong>"vestido"</strong>, <strong>"camisa"</strong> ou <strong>"calçado"</strong>.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-ink/10 bg-cream/40 px-5 py-2.5 font-mono text-[10px] text-ink/50">
          <span>Pressione <strong>ESC</strong> para fechar</span>
          <span>Sapeka Multimarcas</span>
        </div>
      </div>
    </div>
  );
}

export function Header({
  count,
  onOpenBag,
  onExplore,
  onAdd,
}: {
  count: number;
  onOpenBag: () => void;
  onExplore?: (d: DeptId) => void;
  onAdd?: (p: Product, size?: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDeptClick = (d: DeptId) => {
    setMenuOpen(false);
    if (onExplore) {
      onExplore(d);
    } else {
      document.getElementById("vitrine")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onExplore={onExplore}
        onAdd={onAdd}
      />
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-ink/15 bg-paper/95 shadow-[0_10px_30px_-18px_rgba(122,8,19,0.3)] backdrop-blur-md"
            : "border-transparent bg-paper/0"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8 xl:px-10">
          {/* logo */}
          <a href="#topo" className="group flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="relative overflow-hidden rounded-lg border border-pine/20 shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
              <img
                src="/logo-sapeka.jpg"
                alt="Logo Sapeka"
                className="h-10 w-10 sm:h-11 sm:w-11 object-cover"
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="font-display text-2xl sm:text-[1.65rem] font-bold italic tracking-tight text-pine leading-none">
                Sapeka
              </span>
              <span className="mt-1 font-mono text-[8.5px] sm:text-[9.5px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.28em] text-ink/70 whitespace-nowrap leading-none">
                Multimarcas · 1990
              </span>
            </div>
          </a>

          {/* desktop nav com Departamentos funcionais */}
          <nav className="hidden items-center gap-5 lg:flex">
            {NAV_DEPTS.map((d) => (
              <button
                key={d.id}
                onClick={() => handleDeptClick(d.id)}
                className="group relative font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/75 transition-colors hover:text-pine"
              >
                {d.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <a
              href="#historia"
              className="group relative font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/75 transition-colors hover:text-pine"
            >
              História
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#envio"
              className="group relative font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/75 transition-colors hover:text-pine"
            >
              Envio
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 border border-ink/20 px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-all hover:border-pine hover:bg-pine hover:text-gold sm:flex"
            >
              <IconInstagram className="h-4 w-4" />
              {INSTAGRAM_HANDLE}
            </a>

            {/* Botão de Busca Rápida */}
            <button
              onClick={() => setSearchOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-ink/20 text-ink/75 transition-all hover:border-pine hover:bg-cream hover:text-pine active:scale-95"
              aria-label="Buscar produtos"
              title="Buscar produtos"
            >
              <IconSearch className="h-5 w-5" />
            </button>

            {/* Micro-carrinho no topo com contador de alto contraste */}
            <button
              onClick={onOpenBag}
              className="relative grid h-10 w-10 place-items-center rounded-lg border border-pine bg-pine text-gold shadow-sm transition-all hover:bg-pine-deep hover:scale-105 active:scale-95"
              aria-label="Abrir sacola"
            >
              <IconBag className="h-5 w-5" />
              {count > 0 && (
                <span
                  key={count}
                  className="pop absolute -right-2 -top-2 flex h-5.5 min-w-[22px] items-center justify-center rounded-full bg-gold px-1 font-mono text-[11px] font-black text-pine-deep shadow-md border-2 border-cream ring-1 ring-gold/50"
                >
                  {count}
                </span>
              )}
            </button>

            {/* mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-ink/20 text-ink lg:hidden"
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

        {/* mobile menu drawer com overlay */}
        {menuOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[90] flex justify-end bg-pine-deep/80 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="card-in relative flex h-full w-[85%] max-w-sm flex-col justify-between overflow-y-auto bg-paper p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                {/* Header da Gaveta */}
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/logo-sapeka.jpg"
                      alt="Logo Sapeka"
                      className="h-9 w-9 rounded-lg object-cover"
                    />
                    <div>
                      <span className="font-display text-xl font-bold italic text-pine">
                        Sapeka
                      </span>
                      <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-ink/60">
                        Desde 1990
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-ink/20 text-ink hover:bg-cream"
                    aria-label="Fechar menu"
                  >
                    <IconClose className="h-5 w-5" />
                  </button>
                </div>

                {/* Navegação dos 5 Departamentos */}
                <div className="mt-6">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-coral mb-3">
                    ✳ Departamentos da Loja
                  </p>
                  <nav className="flex flex-col gap-1">
                    {NAV_DEPTS.map((d, i) => (
                      <button
                        key={d.id}
                        onClick={() => handleDeptClick(d.id)}
                        className="flex items-center justify-between rounded-lg border-b border-dashed border-ink/15 py-3 px-1 text-left font-display text-lg font-medium text-pine hover:bg-cream/60 transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-coral">
                            0{i + 1}
                          </span>
                          {d.label}
                        </span>
                        <IconArrow className="h-4 w-4 text-ink/30" />
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Links Institucionais */}
                <div className="mt-6 border-t border-ink/10 pt-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-ink/45 mb-2">
                    Institucional
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href="#historia"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-2 text-sm font-semibold text-ink hover:text-pine"
                    >
                      Nossa História (Desde 1990)
                      <IconArrow className="h-4 w-4 text-ink/30" />
                    </a>
                    <a
                      href="#envio"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-2 text-sm font-semibold text-ink hover:text-pine"
                    >
                      Envio para Todo o Brasil &amp; Trocas
                      <IconArrow className="h-4 w-4 text-ink/30" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Atendimento & Redes no Rodapé do Drawer */}
              <div className="mt-8 border-t border-ink/10 pt-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50 mb-3">
                  Canais de Atendimento
                </p>
                <div className="flex flex-col gap-2.5">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Olá, Loja Sapeka! Gostaria de falar com o atendimento.",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-sm hover:bg-[#20bd5a]"
                  >
                    <IconWhatsApp className="h-4 w-4" />
                    WhatsApp: {WHATSAPP_DISPLAY}
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-ink/20 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink hover:bg-cream"
                  >
                    <IconInstagram className="h-4 w-4" />
                    {INSTAGRAM_HANDLE}
                  </a>
                </div>
                <p className="mt-4 text-center font-mono text-[9px] text-ink/40">
                  Segunda a Sábado · 9h às 18h
                </p>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

/* ---------------- Cart drawer com Calculadora de Frete e Tamanhos ---------------- */

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

  // Estado da Calculadora de Frete
  const [cep, setCep] = useState("");
  const [calculating, setCalculating] = useState(false);
  const [shippingResult, setShippingResult] = useState<ShippingResult | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [shippingError, setShippingError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 8) v = v.slice(0, 8);
    if (v.length > 5) v = `${v.slice(0, 5)}-${v.slice(5)}`;
    setCep(v);
    if (shippingError) setShippingError(null);
  };

  const handleCalculateShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = cep.replace(/\D/g, "");
    if (clean.length !== 8) {
      setShippingError("Por favor, digite um CEP válido com 8 dígitos.");
      return;
    }

    setCalculating(true);
    setShippingError(null);

    try {
      const result = await calculateShipping(cep, totalQty);
      setShippingResult(result);
      // Seleciona por padrão o SEDEX ou mantém seleção existente
      if (!selectedShipping) {
        setSelectedShipping(result.options[0]);
      } else {
        const found = result.options.find((o) => o.id === selectedShipping.id);
        setSelectedShipping(found || result.options[0]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao calcular frete.";
      setShippingError(msg);
      setShippingResult(null);
      setSelectedShipping(null);
    } finally {
      setCalculating(false);
    }
  };

  const shippingCost = selectedShipping?.price ?? 0;
  const orderTotal = subtotal + shippingCost;

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
            <h2 className="font-display text-2xl font-bold italic text-pine">
              Sua sacola
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">
              {totalQty} {totalQty === 1 ? "item" : "itens"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-lg border border-ink/20 text-ink transition-colors hover:border-coral hover:text-coral"
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
                className="mt-6 flex items-center gap-2 rounded-lg bg-pine px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-pine-deep"
              >
                Ver vitrine <IconArrow className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              <ul className="space-y-4">
                {items.map(({ product, qty, size }) => (
                  <li
                    key={`${product.id}-${size || "default"}`}
                    className="flex gap-4 border border-ink/10 bg-paper/60 p-3 rounded-lg"
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="h-20 w-16 shrink-0 object-cover rounded"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-display text-[15px] font-semibold leading-tight text-pine">
                            {product.name}
                          </p>
                          {size && (
                            <span className="inline-block mt-1 rounded bg-pine/10 px-2 py-0.5 font-mono text-[10px] font-bold text-pine">
                              Tam: {size}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => onRemove(product.id)}
                          className="text-ink/40 transition-colors hover:text-coral"
                          aria-label={`Remover ${product.name}`}
                        >
                          <IconClose className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/45">
                        {fmtBRL(product.price)} / un
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center border border-ink/20 rounded">
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
                        <span className="font-mono text-sm font-bold text-pine">
                          {fmtBRL(product.price * qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Calculadora de Frete Integrada (Correios SEDEX, PAC & Balcão) */}
              <div className="rounded-xl border border-ink/15 bg-paper/90 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-pine">
                    🚚 Simular Frete &amp; Prazo
                  </p>
                  <span className="font-mono text-[9px] text-ink/45" title={`Origem: ${CEP_ORIGEM}`}>
                    Origem: {CEP_ORIGEM}
                  </span>
                </div>

                <form onSubmit={handleCalculateShipping} className="mt-2.5 flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={cep}
                      onChange={handleCepChange}
                      placeholder="Ex: 01001-000"
                      maxLength={9}
                      className="w-full rounded-lg border border-ink/25 bg-cream px-3 py-2 font-mono text-xs text-ink placeholder:text-ink/35 focus:border-pine focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={calculating || cep.replace(/\D/g, "").length < 8}
                    className="shrink-0 rounded-lg bg-pine px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-gold transition-all hover:bg-pine-deep disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                  >
                    {calculating ? (
                      <>
                        <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-gold border-t-transparent" />
                        <span>Calculando...</span>
                      </>
                    ) : (
                      "Calcular"
                    )}
                  </button>
                </form>

                {/* Mensagem de Erro Amigável */}
                {shippingError && (
                  <div className="mt-2.5 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700 font-medium">
                    ⚠️ {shippingError}
                  </div>
                )}

                {/* Resultados das Cotações de Frete */}
                {shippingResult && (
                  <div className="mt-3.5 space-y-2 border-t border-dashed border-ink/15 pt-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-ink/70 mb-1">
                      <span>📍 Destino: <strong>{shippingResult.city} - {shippingResult.state}</strong></span>
                      <span className="text-[10px] text-ink/45">~{shippingResult.weightKg}kg</span>
                    </div>

                    <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                      Selecione a opção de entrega:
                    </p>

                    <div className="space-y-2">
                      {shippingResult.options.map((opt) => {
                        const isSelected = selectedShipping?.id === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedShipping(opt)}
                            className={`flex w-full items-center justify-between rounded-lg border p-2.5 text-left transition-all ${
                              isSelected
                                ? "border-pine bg-cream shadow-xs ring-2 ring-pine/25"
                                : "border-ink/15 bg-cream/50 hover:bg-cream hover:border-pine/30"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`grid h-4 w-4 place-items-center rounded-full border ${
                                  isSelected
                                    ? "border-pine bg-pine text-gold"
                                    : "border-ink/30 bg-paper"
                                }`}
                              >
                                {isSelected && (
                                  <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-display text-sm font-semibold text-pine">
                                    {opt.name}
                                  </span>
                                  {opt.badge && (
                                    <span className="rounded bg-gold/30 px-1.5 py-0.2 font-mono text-[9px] font-bold text-pine-deep">
                                      {opt.badge}
                                    </span>
                                  )}
                                </div>
                                <span className="block font-mono text-[10px] text-ink/60">
                                  Prazo: <strong>{opt.deadlineDays}</strong>
                                </span>
                              </div>
                            </div>
                            <span className="font-mono text-xs font-bold text-pine">
                              {opt.price === 0 ? "Grátis" : fmtBRL(opt.price)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-dashed border-ink/20 bg-paper/90 px-6 py-5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-ink/70">
                <span>Subtotal das peças:</span>
                <span>{fmtBRL(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-ink/70">
                <span>
                  Entrega ({selectedShipping ? selectedShipping.service : "A calcular"}):
                </span>
                <span className="font-semibold text-pine">
                  {selectedShipping
                    ? selectedShipping.price === 0
                      ? "Grátis (Balcão)"
                      : fmtBRL(selectedShipping.price)
                    : "Calcule acima"}
                </span>
              </div>
              <div className="flex items-end justify-between pt-2 border-t border-ink/10">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-pine">
                  Total do Pedido
                </span>
                <span className="font-display text-2xl font-bold text-pine">
                  {fmtBRL(orderTotal)}
                </span>
              </div>
            </div>

            <p className="mt-1 text-right font-mono text-[10px] text-ink/50">
              ou 6x de {fmtBRL(orderTotal / 6)} sem juros no cartão
            </p>

            {/* Botão Principal: WhatsApp com Pedido & Frete Formatados */}
            <a
              href={buildWhatsAppCartUrl(
                items,
                subtotal,
                selectedShipping && shippingResult
                  ? {
                      option: selectedShipping,
                      destination: shippingResult,
                    }
                  : undefined,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2.5 rounded-lg bg-[#25D366] py-3.5 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all hover:bg-[#20bd5a] hover:shadow-[0_6px_22px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
            >
              <IconWhatsApp className="h-5 w-5" />
              Finalizar pedido pelo WhatsApp
            </a>

            {/* Botão Secundário: Instagram */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 flex items-center justify-center gap-2 rounded-lg border border-ink/25 bg-transparent py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:border-coral hover:bg-coral/5 hover:text-coral"
            >
              <IconInstagram className="h-4 w-4" />
              Finalizar pelo Instagram
            </a>

            <p className="mt-3 text-center font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink/45">
              Envio seguro rastreado para os 27 estados do Brasil 🇧🇷
            </p>
          </footer>
        )}
      </aside>
    </div>
  );
}
