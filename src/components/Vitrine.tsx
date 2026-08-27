import { useMemo, useRef, useState } from "react";
import {
  DEPT_LABEL,
  PRODUCTS,
  fmtBRL,
  installment,
  type DeptId,
  type Product,
} from "../data";
import { IconCheck, IconHanger, IconPlus, Reveal } from "../lib";

type Filter = DeptId | "tudo";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "tudo", label: "Tudo" },
  { id: "feminino", label: "Feminino" },
  { id: "masculino", label: "Masculino" },
  { id: "infantil", label: "Infantil" },
  { id: "calcados", label: "Calçados" },
  { id: "casa", label: "Casa" },
];

function tagStyle(tag?: string) {
  if (!tag) return "";
  if (tag.startsWith("-")) return "bg-coral text-cream";
  if (tag === "MAIS VENDIDO") return "bg-pine text-gold";
  return "bg-gold text-pine-deep";
}

function ProductCard({
  product,
  index,
  onAdd,
}: {
  product: Product;
  index: number;
  onAdd: (p: Product, size?: string) => void;
}) {
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0] || "Único",
  );
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleAdd = () => {
    onAdd(product, selectedSize);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article
      className="card-in group flex flex-col h-full rounded-xl border border-ink/12 bg-cream transition-all duration-300 hover:-translate-y-1.5 hover:border-pine/40 hover:shadow-[10px_12px_0_0_rgba(216,18,36,0.14)] overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sage/40">
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover transition-all duration-700 ease-out ${
            product.imgHover
              ? "group-hover:opacity-0 group-hover:scale-105"
              : "group-hover:scale-[1.07]"
          }`}
        />
        {product.imgHover && (
          <img
            src={product.imgHover}
            alt={`${product.name} - detalhe`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
          />
        )}
        {product.tag && (
          <span
            className={`absolute left-3 top-3 -rotate-2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm z-10 ${tagStyle(
              product.tag,
            )}`}
          >
            {product.tag}
          </span>
        )}
        {product.imgHover && (
          <span className="absolute left-3 bottom-3 bg-pine-deep/80 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-wider text-gold-soft backdrop-blur-sm opacity-90 group-hover:opacity-0 transition-opacity">
            + detalhe
          </span>
        )}
        <span className="absolute bottom-3 right-3 bg-pine-deep/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-gold-soft backdrop-blur-sm z-10">
          {DEPT_LABEL[product.dept]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex-1 flex flex-col">
          <h3 className="font-display text-lg font-semibold leading-snug text-pine min-h-[2.8rem] line-clamp-2">
            {product.name}
          </h3>

          <div className="mt-2 flex items-baseline gap-2.5">
            <span className="font-mono text-lg font-semibold text-ink">
              {fmtBRL(product.price)}
            </span>
            {product.oldPrice && (
              <span className="font-mono text-xs text-ink/40 line-through">
                {fmtBRL(product.oldPrice)}
              </span>
            )}
          </div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-moss">
            em até 6x de {installment(product.price)}
          </p>

          {/* Aviso de Estoque Baixo / Últimas Peças */}
          {product.stockWarning && (
            <div className="mt-2.5 flex items-center gap-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 font-mono text-[10px] font-bold text-amber-900">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>{product.stockWarning}</span>
            </div>
          )}

          {/* Seletor de Tamanhos */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-dashed border-ink/10">
              <div className="flex items-center justify-between text-[10px] font-mono text-ink/55 uppercase mb-1.5">
                <span>Tamanho:</span>
                <span className="font-bold text-pine">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((s) => {
                  const active = selectedSize === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-[28px] px-2 py-1 text-[10.5px] font-mono font-bold uppercase rounded border transition-all ${
                        active
                          ? "bg-pine text-white border-pine shadow-sm scale-105"
                          : "bg-paper/80 text-ink/70 border-ink/20 hover:border-pine/50 hover:bg-cream"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Botão Ancorado na Linha Inferior com mt-auto */}
        <button
          onClick={handleAdd}
          className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-lg font-mono text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 active:scale-[0.97] shadow-sm ${
            added
              ? "bg-gold text-pine-deep font-bold"
              : "bg-pine text-cream hover:bg-pine-deep hover:text-gold"
          }`}
        >
          {added ? (
            <>
              <IconCheck className="h-4 w-4" /> Na sacola ({selectedSize})
            </>
          ) : (
            <>
              <IconPlus className="h-4 w-4" /> Adicionar
            </>
          )}
        </button>
      </div>
    </article>
  );
}

export function Vitrine({
  filter,
  onFilter,
  onAdd,
}: {
  filter: Filter;
  onFilter: (f: Filter) => void;
  onAdd: (p: Product, size?: string) => void;
}) {
  const list = useMemo(
    () =>
      filter === "tudo"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.dept === filter),
    [filter],
  );

  return (
    <section id="vitrine" className="relative scroll-mt-24 overflow-hidden py-20 lg:py-28">
      {/* Marca d'água decorativa sutil de fundo (sem colidir com o título) */}
      <span
        className="pointer-events-none absolute -left-8 sm:-left-12 -top-4 sm:-top-8 select-none font-display text-[7.5rem] sm:text-[11rem] lg:text-[13.5rem] font-black uppercase leading-none tracking-tight opacity-[0.05] text-pine"
        aria-hidden="true"
      >
        sale
      </span>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-coral">
                ✳ Direto da arara
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-3 font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-black leading-[0.95] tracking-tight text-pine">
                Vitrine da <em className="font-medium italic text-coral">semana</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
              <IconHanger className="h-4.5 w-4.5 text-coral" />
              {list.length} {list.length === 1 ? "peça" : "peças"} em destaque
            </div>
          </Reveal>
        </div>

        {/* filters */}
        <Reveal delay={120}>
          <div className="mb-10 flex flex-wrap items-center gap-2 pr-4 sm:pr-0">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              const count =
                f.id === "tudo"
                  ? PRODUCTS.length
                  : PRODUCTS.filter((p) => p.dept === f.id).length;
              return (
                <button
                  key={f.id}
                  onClick={() => onFilter(f.id)}
                  className={`group flex items-center gap-2 border px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                    active
                      ? "-rotate-1 border-pine bg-pine text-gold shadow-[4px_4px_0_0_rgba(232,169,59,1)]"
                      : "border-ink/20 bg-cream/60 text-ink/65 hover:-translate-y-0.5 hover:border-pine hover:text-pine"
                  }`}
                >
                  {f.label}
                  <span
                    className={`text-[9px] ${active ? "text-gold-soft" : "text-ink/35"}`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* grid responsivo fluido para telas grandes */}
        <div
          key={filter}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-7"
        >
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onAdd={onAdd} />
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
            Gostou de alguma peça? Chama no direct que a gente separa, mede e
            posta pra você ✈
          </p>
        </Reveal>
      </div>
    </section>
  );
}
