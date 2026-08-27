import type { CSSProperties } from "react";
import {
  DEPARTMENTS,
  IMG,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  MARQUEE_CATS,
  type DeptId,
} from "../data";
import {
  CircularStamp,
  IconArrow,
  IconArrowDown,
  IconInstagram,
  IconStar,
  Reveal,
} from "../lib";

function CatMarqueeRow() {
  return (
    <div className="flex shrink-0 items-center">
      {MARQUEE_CATS.map((c, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-display text-2xl font-medium italic tracking-tight text-pine-deep sm:text-3xl">
            {c}
          </span>
          <IconStar className="h-4 w-4 text-coral" />
        </span>
      ))}
    </div>
  );
}

export function Hero({ onExplore }: { onExplore: (d: DeptId) => void }) {
  return (
    <section id="topo" className="relative overflow-hidden">
      {/* layered backdrop */}
      <div className="pinstripe absolute inset-0" aria-hidden="true" />
      <div
        className="dot-grid absolute inset-y-0 left-0 w-1/3 opacity-60"
        aria-hidden="true"
      />
      <span
        className="text-outline pointer-events-none absolute -right-6 top-6 hidden select-none font-display text-[11rem] font-black leading-none tracking-tight lg:block"
        aria-hidden="true"
      >
        1990
      </span>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:pb-24 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* ------- left: wordmark & index ------- */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-moss">
                <span className="inline-block h-[7px] w-[7px] rounded-full bg-coral" />
                Multimarcas · Varejo · Desde 1990
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-5 font-display font-black leading-[0.86] tracking-tight text-pine">
                <span className="block text-[clamp(4.2rem,11vw,9.5rem)]">
                  Sapeka
                </span>
                <span className="mt-2 block text-[clamp(1.6rem,3.6vw,3rem)] font-medium italic leading-tight text-ink">
                  a loja que veste a família
                  <span className="swash"> inteira</span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
                Moda <strong className="font-semibold text-pine">feminina</strong>,{" "}
                <strong className="font-semibold text-pine">masculina</strong> e{" "}
                <strong className="font-semibold text-pine">infantil</strong>,{" "}
                calçados e cama, mesa &amp; banho — tudo na mesma loja, com o
                atendimento de balcão de sempre. E agora,{" "}
                <em className="font-display italic">
                  enviamos para todo o Brasil
                </em>
                .
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href="#vitrine"
                  className="group flex items-center gap-3 bg-pine px-6 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-gold shadow-[6px_6px_0_0_rgba(232,169,59,1)] transition-all hover:-translate-y-0.5 hover:bg-pine-deep hover:shadow-[8px_8px_0_0_rgba(232,169,59,1)] active:translate-y-0 active:shadow-[4px_4px_0_0_rgba(232,169,59,1)]"
                >
                  Ver vitrine da semana
                  <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 border-b-2 border-ink/30 pb-1 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:border-coral hover:text-coral"
                >
                  <IconInstagram className="h-4.5 w-4.5" />
                  Seguir {INSTAGRAM_HANDLE}
                </a>
              </div>
            </Reveal>

            {/* department index */}
            <Reveal delay={340}>
              <div className="mt-12 max-w-xl border-t-2 border-pine/80">
                {DEPARTMENTS.map((d, i) => (
                  <button
                    key={d.id}
                    onClick={() => onExplore(d.id)}
                    className="group flex w-full items-center justify-between border-b border-dashed border-ink/20 py-3 text-left transition-colors hover:bg-cream/70"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-coral">
                        0{i + 1}
                      </span>
                      <span className="font-display text-xl font-medium text-pine transition-transform duration-300 group-hover:translate-x-1.5 sm:text-2xl">
                        {d.name}
                      </span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="hidden font-mono text-[10px] uppercase tracking-[0.15em] text-ink/45 sm:block">
                        {d.count}
                      </span>
                      <IconArrow className="h-4.5 w-4.5 text-ink/30 transition-all group-hover:translate-x-1 group-hover:text-coral" />
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ------- right: vitrine collage ------- */}
          <div className="relative lg:col-span-5">
            <Reveal delay={200} className="relative">
              {/* main frame */}
              <div className="relative ml-6 overflow-hidden border-[6px] border-pine bg-pine shadow-[14px_14px_0_0_rgba(15,61,46,0.16)]">
                <div className="overflow-hidden">
                  <img
                    src={IMG.hero}
                    alt="Arara colorida da vitrine Sapeka"
                    className="kenburns aspect-[4/5] w-full object-cover"
                  />
                </div>
                <span className="absolute left-4 top-4 bg-gold px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-pine-deep">
                  Vitrine ao vivo
                </span>
                <span className="absolute bottom-4 right-4 rotate-2 bg-pine-deep/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-soft">
                  arara nova toda sexta
                </span>
              </div>

              {/* rotating stamp */}
              <CircularStamp className="absolute -left-10 -top-8 h-28 w-28 drop-shadow-lg sm:-left-14 sm:h-32 sm:w-32" />

              {/* floating polaroid: calçados */}
              <figure
                className="float-soft absolute -right-4 top-16 w-32 -rotate-3 border-[5px] border-cream bg-cream pb-6 shadow-xl sm:-right-8 sm:w-40"
                style={{ "--tilt": "-3deg" } as CSSProperties}
              >
                <img
                  src={IMG.calcados}
                  alt="Calçados"
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-1 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-ink/60">
                  calçados
                </figcaption>
              </figure>

              {/* floating polaroid: casa */}
              <figure
                className="float-soft absolute -bottom-8 left-2 w-36 rotate-2 border-[5px] border-cream bg-cream pb-6 shadow-xl sm:-left-8 sm:w-44"
                style={{ "--tilt": "2deg", animationDelay: "1.2s" } as CSSProperties}
              >
                <img
                  src={IMG.casa}
                  alt="Cama, mesa e banho"
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-1 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-ink/60">
                  cama, mesa &amp; banho
                </figcaption>
              </figure>

              <IconStar className="twinkle absolute -right-2 -top-4 h-7 w-7 text-gold" />
              <IconStar
                className="twinkle absolute right-10 bottom-[-2.2rem] h-5 w-5 text-coral"
                style={{ animationDelay: "0.8s" } as CSSProperties}
              />
            </Reveal>
          </div>
        </div>

        {/* scroll hint */}
        <div className="mt-14 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/45 lg:flex">
          <IconArrowDown className="h-4 w-4 animate-bounce text-coral" />
          role para conhecer os departamentos
        </div>
      </div>

      {/* category marquee band */}
      <div className="relative border-y-2 border-pine-deep bg-gold py-3.5">
        <div className="marquee-track" style={{ "--dur": "30s" } as CSSProperties}>
          <CatMarqueeRow />
          <CatMarqueeRow />
        </div>
      </div>
    </section>
  );
}


