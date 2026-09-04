import { useCallback, useEffect, useRef, useState } from "react";
import { CartDrawer, Header, Ticker, type CartItem } from "./components/Chrome";
import { Hero } from "./components/Hero";
import { Departments } from "./components/Departments";
import { Vitrine } from "./components/Vitrine";
import { Story } from "./components/Story";
import { Shipping } from "./components/Shipping";
import { Footer, InstagramCTA } from "./components/Closing";
import { WHATSAPP_NUMBER, fmtBRL, type DeptId, type Product } from "./data";
import { IconBag, IconCheck, IconClose, IconWhatsApp } from "./lib";

type Filter = DeptId | "tudo";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("tudo");
  const [toast, setToast] = useState<{
    product: Product;
    qty: number;
    size?: string;
  } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const addToCart = useCallback((product: Product, size?: string) => {
    const itemSize = size || product.sizes?.[0] || "Único";
    setCart((prev) => {
      const found = prev.find(
        (i) => i.product.id === product.id && (i.size || "Único") === itemSize,
      );
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id && (i.size || "Único") === itemSize
            ? { ...i, qty: i.qty + 1 }
            : i,
        );
      }
      return [...prev, { product, qty: 1, size: itemSize }];
    });

    // Disparar toast de confirmação
    setToast({ product, qty: 1, size: itemSize });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 3800);
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

  const [hideWhatsApp, setHideWhatsApp] = useState(false);

  const scrollToVitrine = useCallback((targetId?: string) => {
    requestAnimationFrame(() => {
      const el = (targetId ? document.getElementById(targetId) : null) || document.getElementById("vitrine");
      if (el) {
        const headerOffset = 90;
        const elPosition = el.getBoundingClientRect().top;
        const offsetPosition = elPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  }, []);

  const explore = useCallback(
    (d: DeptId) => {
      setFilter(d);
      // Atualiza URL sem recarregar a página
      window.history.replaceState(null, "", `#vitrine-${d}`);
      scrollToVitrine(`vitrine-${d}`);
    },
    [scrollToVitrine],
  );

  // Sincronizar âncoras de departamento (#feminino, #vitrine-feminino, etc)
  useEffect(() => {
    const handleHash = () => {
      const raw = window.location.hash.replace("#", "");
      const clean = raw.replace("vitrine-", "") as DeptId;
      if (["feminino", "masculino", "infantil", "calcados", "casa"].includes(clean)) {
        setFilter(clean);
        scrollToVitrine(`vitrine-${clean}`);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [scrollToVitrine]);

  // Ocultar botão flutuante temporariamente enquanto a barra de miniaturas de departamentos estiver na tela
  useEffect(() => {
    const target = document.getElementById("barra-departamentos");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideWhatsApp(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="grain min-h-screen bg-paper font-body text-ink antialiased">
      <Ticker />
      <Header
        count={totalQty}
        onOpenBag={() => setBagOpen(true)}
        onExplore={explore}
        onAdd={addToCart}
      />

      <main>
        <Hero onExplore={explore} />
        <Departments onExplore={explore} />
        <Vitrine filter={filter} onFilter={setFilter} onAdd={addToCart} />
        <Story />
        <Shipping />
        <InstagramCTA />
      </main>

      <Footer onExplore={explore} />

      {/* Toast Alert Flutuante de Peça Adicionada */}
      {toast && (
        <div className="card-in fixed bottom-36 right-4 sm:bottom-24 sm:right-6 z-50 flex max-w-[calc(100vw-2rem)] sm:max-w-sm items-center gap-3 rounded-xl border border-pine/30 bg-cream/95 p-3 sm:p-3.5 shadow-2xl backdrop-blur-md">
          <div className="relative h-12 w-11 sm:h-14 sm:w-12 shrink-0 overflow-hidden rounded-lg border border-ink/10">
            <img
              src={toast.product.img}
              alt={toast.product.name}
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-0 inset-x-0 bg-pine/90 py-0.5 text-center font-mono text-[7.5px] sm:text-[8px] font-bold text-white">
              +1
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 font-mono text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#25D366]">
              <IconCheck className="h-3.5 w-3.5" /> Adicionado à sacola!
            </div>
            <p className="truncate font-display text-xs sm:text-sm font-semibold text-pine">
              {toast.product.name}
            </p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-ink">
                {fmtBRL(toast.product.price)}
              </span>
              {toast.size && (
                <span className="rounded bg-pine/10 px-1.5 py-0.2 font-mono text-[9px] sm:text-[9.5px] font-bold text-pine">
                  Tam: {toast.size}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 shrink-0">
            <button
              onClick={() => {
                setBagOpen(true);
                setToast(null);
              }}
              className="flex items-center gap-1 rounded bg-pine px-2.5 py-1.5 font-mono text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-white shadow transition-transform hover:scale-105"
            >
              <IconBag className="h-3.5 w-3.5" /> Ver Sacola
            </button>
            <button
              onClick={() => setToast(null)}
              className="self-end p-1 text-ink/40 transition-colors hover:text-coral"
              aria-label="Fechar aviso"
            >
              <IconClose className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Botão Flutuante do WhatsApp (Compacto no Mobile com Margem Segura) */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          "Olá, Loja Sapeka! Gostaria de tirar uma dúvida sobre as peças da loja.",
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
        className={`group fixed bottom-6 sm:bottom-8 right-4 sm:right-6 z-40 flex items-center justify-center gap-2 sm:gap-2.5 rounded-full bg-[#25D366] p-3.5 sm:px-4 sm:py-3.5 text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a] hover:shadow-[0_12px_30px_rgba(37,211,102,0.6)] active:scale-95 ${
          hideWhatsApp
            ? "opacity-0 pointer-events-none translate-y-8 scale-90"
            : "opacity-100 pointer-events-auto translate-y-0 scale-100"
        }`}
      >
        <div className="relative">
          <IconWhatsApp className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white"></span>
          </span>
        </div>
        <span className="hidden sm:inline font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap">
          WhatsApp
        </span>
      </a>

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
