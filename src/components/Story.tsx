import type { CSSProperties } from "react";
import { BRANDS_ROW_A, BRANDS_ROW_B, IMG, MILESTONES, STATS } from "../data";
import { CircularStamp, Reveal, useCountUp, useInView } from "../lib";

function Stat({
  value,
  suffix,
  label,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const n = useCountUp(value, start);
  return (
    <div className="border-l-2 border-gold/70 pl-4">
      <p className="font-display text-4xl font-black leading-none text-cream sm:text-5xl">
        {n.toLocaleString("pt-BR")}
        <span className="text-gold">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55">
        {label}
      </p>
    </div>
  );
}

function BrandRow({
  items,
  reverse,
  outline,
  dur,
}: {
  items: string[];
  reverse?: boolean;
  outline?: boolean;
  dur: string;
}) {
  const Row = () => (
    <div className="flex shrink-0 items-center">
      {items.map((b, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`px-7 font-display text-4xl font-bold tracking-tight sm:text-5xl ${
              outline ? "text-outline-gold" : "text-cream/90"
            }`}
          >
            {b}
          </span>
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-gold" fill="currentColor" aria-hidden="true">
            <path d="M6 0l1.6 4.4L12 6 7.6 7.6 6 12 4.4 7.6 0 6l4.4-1.6z" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee-track py-2" style={{ "--dur": dur, ...(reverse ? { animationDirection: "reverse" } : {}) } as CSSProperties}>
      <Row />
      <Row />
    </div>
  );
}

export function Story() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <section id="historia" className="relative scroll-mt-24 overflow-hidden bg-pine text-cream">
      <div className="pinstripe-gold pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* sticky column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
                  ✳ Desde 1990 · Nossa história
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-[clamp(2.4rem,5.5vw,4rem)] font-black leading-[0.95] tracking-tight">
                  35 anos vestindo
                  <br />
                  <em className="font-medium italic text-gold-soft">
                    a cidade inteira
                  </em>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-cream/70">
                  A Sapeka nasceu pequena, com uma arara e muita coragem.
                  Cresceu departamento por departamento — e hoje veste gerações
                  da mesma família, do enxoval do bebê ao linho do avô.
                </p>
              </Reveal>

              <div ref={ref} className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
                {STATS.map((s, i) => (
                  <Reveal key={s.label} delay={i * 90}>
                    <Stat {...s} start={inView} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* timeline column */}
          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <figure className="relative mb-14 -rotate-1">
                <div className="overflow-hidden border-[6px] border-gold shadow-[16px_16px_0_0_rgba(9,37,28,0.55)]">
                  <img
                    src={IMG.historia}
                    alt="Interior da primeira loja Sapeka nos anos 1990"
                    loading="lazy"
                    className="kenburns aspect-[16/10] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-cream/50">
                  <span>arquivo da família · primeira loja</span>
                  <span className="text-gold">c. 1990</span>
                </figcaption>
                <CircularStamp dark className="absolute -right-6 -top-10 h-24 w-24 sm:-right-10 sm:h-28 sm:w-28" />
              </figure>
            </Reveal>

            <ol className="relative ml-2 border-l-2 border-dashed border-gold/40 pl-8 sm:ml-4 sm:pl-12">
              {MILESTONES.map((m, i) => (
                <li key={m.year} className="relative pb-12 last:pb-0">
                  <span
                    className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-gold bg-pine sm:-left-[57px]"
                    aria-hidden="true"
                  />
                  <Reveal delay={i * 80}>
                    <p className="font-mono text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                      {m.year}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-cream sm:text-[1.7rem]">
                      {m.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-cream/65">
                      {m.text}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* brands marquee */}
      <div className="relative border-t border-cream/15 bg-pine-deep py-8">
        <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.32em] text-cream/45">
          Multimarcas que você confia
        </p>
        <div className="overflow-hidden">
          <BrandRow items={BRANDS_ROW_A} dur="36s" />
          <BrandRow items={BRANDS_ROW_B} reverse outline dur="44s" />
        </div>
      </div>
    </section>
  );
}
