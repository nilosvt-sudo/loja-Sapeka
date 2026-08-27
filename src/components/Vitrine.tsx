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
  onAdd: (p: Product) => void;
}) {
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article
      className="card-in group flex flex-col border border-ink/12 bg-cream transition-all duration-300 hover:-translate-y-1.5 hover:border-pine/40 hover:shadow-[10px_12px_0_0_rgba(15,61,46,0.12)]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sage/40">
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        {product.tag && (
          <span
            className={`absolute left-3 top-3 -rotate-2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm ${tagStyle(
              product.tag,
            )}`}
          >
            {product.tag}
          </span>
        )}
        <span className="absolute bottom-3 right-3 bg-pine-deep/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-gold-soft backdrop-blur-sm">
          {DEPT_LABEL[product.dept]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-pine">
          {product.name}
        </h3>

        <div className="mt-2.5 flex items-baseline gap-2.5">
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

        <button
          onClick={handleAdd}
          className={`mt-4 flex items-center justify-center gap-2 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 active:scale-[0.97] ${
            added
              ? "bg-gold text-pine-deep"
              : "bg-pine text-cream hover:bg-pine-deep hover:text-gold"
          }`}
        >
          {added ? (
            <>
              <IconCheck className="h-4 w-4" /> Na sacola
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
  onAdd: (p: Product) => void;
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
      <span
        className="text-outline pointer-events-none absolute -left-4 top-8 select-none font-display text-[9rem] font-black leading-none lg:text-[13rem]"
        aria-hidden="true"
      >
        sale
      </span>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
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
          <div className="mb-10 flex flex-wrap gap-2">
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

        {/* grid */}
        <div key={filter} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
