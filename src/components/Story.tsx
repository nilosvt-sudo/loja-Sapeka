import type { CSSProperties } from "react";
import { BRANDS_ROW_A, BRANDS_ROW_B, IMG, MILESTONES, STATS } from "../data";
import { CircularStamp, Reveal, useCountUp, useInView } from "../lib";

function StatItem({
  value,
  suffix,
  label,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
}) {
  const count = useCountUp(value, inView, 1200);

  return (
    <div className="rounded-xl border-2 border-gold/40 bg-cream p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <p className="font-display text-3xl font-black leading-none text-pine sm:text-4xl">
        {count.toLocaleString("pt-BR")}
        <span className="text-coral">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink/75">
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
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section id="historia" className="relative scroll-mt-24 bg-pine text-cream">
      <div className="pinstripe-gold pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8 xl:px-10 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Coluna da Esquerda: Resumo Institucional, Foto de Arquivo e Badges (STICKY) */}
          <div className="flex flex-col gap-7 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-pine-deep/80 px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold shadow-sm">
                  <span>✳</span> Desde 1990 · Nossa História
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-[clamp(2.3rem,4.5vw,3.6rem)] font-black leading-[0.95] tracking-tight text-cream">
                  35 anos vestindo
                  <br />
                  <em className="font-medium italic text-gold-soft">
                    gerações da família
                  </em>
                </h2>
              </Reveal>

              <Reveal delay={140}>
                <p className="mt-4 text-base leading-relaxed text-cream/90">
                  A <strong>Sapeka</strong> nasceu em 1990 com uma arara e a missão de oferecer acolhimento e moda de qualidade. Cresceu departamento por departamento e hoje atende clientes do Brasil inteiro com o mesmo carinho de balcão de sempre.
                </p>
              </Reveal>
            </div>

            {/* Card com Foto de Arquivo da Primeira Loja */}
            <Reveal delay={180}>
              <figure className="relative -rotate-1 transition-transform duration-500 hover:rotate-0">
                <div className="relative overflow-hidden rounded-xl border-4 border-gold bg-pine-deep shadow-[12px_12px_0_0_rgba(122,8,19,0.5)]">
                  <img
                    src={IMG.historia}
                    alt="Interior da primeira loja Sapeka nos anos 1990"
                    loading="lazy"
                    className="kenburns aspect-[16/10] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pine-deep/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-cream">
                    <span className="flex items-center gap-1.5 font-bold">
                      <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                      Arquivo da Família · 1ª Loja
                    </span>
                    <span className="rounded bg-gold px-2 py-0.5 font-bold text-pine-deep shadow-sm">c. 1990</span>
                  </div>
                </div>
                <CircularStamp dark className="absolute -right-4 -top-7 h-20 w-20 drop-shadow-lg sm:-right-7 sm:h-24 sm:w-24" />
              </figure>
            </Reveal>

            {/* Badges e Números de Destaque - Alto Contraste */}
            <div ref={ref} className="grid grid-cols-2 gap-3 sm:gap-3.5">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 80}>
                  <StatItem
                    value={s.value}
                    suffix={s.suffix}
                    label={s.label}
                    inView={inView}
                  />
                </Reveal>
              ))}
            </div>

            {/* Citação institucional de fechamento */}
            <Reveal delay={260}>
              <div className="rounded-lg border-l-4 border-gold bg-pine-deep/60 px-4 py-3 text-xs italic leading-relaxed text-cream/90 font-display">
                &ldquo;Do enxoval do bebê ao linho do avô — moda para a família inteira com o mesmo carinho de balcão.&rdquo;
              </div>
            </Reveal>
          </div>

          {/* Coluna da Direita: Linha do Tempo Cronológica (Alto Contraste) */}
          <div className="lg:col-span-7 lg:pl-6">
            <Reveal delay={100}>
              <div className="mb-8 rounded-xl border border-cream/20 bg-pine-deep/70 p-5 shadow-sm">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-gold">
                  Linha do Tempo Oficial
                </p>
                <p className="mt-1 font-display text-2xl font-bold italic text-cream">
                  A trajetória da Sapeka ao longo de 35 anos
                </p>
              </div>
            </Reveal>

            <ol className="relative ml-3 border-l-2 border-dashed border-gold/60 pl-6 sm:ml-6 sm:pl-10">
              {MILESTONES.map((m, i) => (
                <li key={m.year} className="relative pb-8 last:pb-2">
                  {/* Ponto indicador com anel dourado */}
                  <span
                    className="absolute -left-[31px] top-4 h-4 w-4 rounded-full border-2 border-gold bg-cream shadow-[0_0_10px_rgba(245,158,11,0.8)] sm:-left-[47px]"
                    aria-hidden="true"
                  />
                  <Reveal delay={i * 70}>
                    <div className="rounded-xl border border-ink/10 bg-cream p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-block rounded-md bg-pine px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white shadow-sm">
                          {m.year}
                        </span>
                        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink/40">
                          Marco {i + 1} de {MILESTONES.length}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-pine-deep sm:text-2xl">
                        {m.title}
                      </h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-ink/80">
                        {m.text}
                      </p>
                    </div>
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
