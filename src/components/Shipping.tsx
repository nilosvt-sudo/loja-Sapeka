import { TESTIMONIALS } from "../data";
import {
  Barcode,
  IconCard,
  IconStar,
  IconSwap,
  IconTruck,
  Reveal,
} from "../lib";

const ROUTES = [
  { mode: "SEDEX", time: "2 a 5 dias úteis", note: "capitais e grandes centros" },
  { mode: "PAC", time: "5 a 10 dias úteis", note: "demais regiões" },
  { mode: "Retirada na loja", time: "hoje mesmo", note: "é só passar no balcão" },
];

const PERKS = [
  {
    icon: IconTruck,
    title: "Envio rápido",
    text: "Correios e transportadoras para os 27 estados, com código de rastreio direto no seu direct.",
  },
  {
    icon: IconCard,
    title: "Parcele em até 6x",
    text: "Cartão em até 6x sem juros, Pix com desconto e aquele jeitinho de negociar no balcão.",
  },
  {
    icon: IconSwap,
    title: "Troca sem drama",
    text: "Não serviu? Você tem 7 dias para trocar. A gente resolve rápido, como sempre fez.",
  },
];

export function Shipping() {
  return (
    <section id="envio" className="relative scroll-mt-24 overflow-hidden py-20 lg:py-28">
      <div className="pinstripe absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          {/* copy + routes */}
          <div>
            <Reveal>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-coral">
                ✳ De Norte a Sul
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-3 font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-black leading-[0.95] tracking-tight text-pine">
                Da nossa arara
                <br />
                para <em className="font-medium italic text-coral">todo o Brasil</em> 🇧🇷
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/70">
                Você escolhe pelo Instagram, a gente separa, confere, embala
                com carinho e posta no mesmo dia. Seu pedido viaja com rastreio
                — e chega perfumado, com bilhete escrito à mão.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <ul className="mt-9 max-w-md border-t-2 border-pine">
                {ROUTES.map((r) => (
                  <li
                    key={r.mode}
                    className="group flex items-baseline justify-between gap-4 border-b border-dashed border-ink/25 py-3.5 transition-colors hover:bg-cream/70"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-display text-xl font-bold text-pine">
                        {r.mode}
                      </span>
                      <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-ink/40 sm:inline">
                        {r.note}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[11.5px] font-semibold uppercase tracking-[0.1em] text-moss">
                      {r.time}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* shipping ticket */}
          <Reveal delay={200}>
            <div className="relative -rotate-1 border-2 border-ink/80 bg-cream shadow-[14px_14px_0_0_rgba(216,18,36,0.18)] transition-transform duration-500 hover:rotate-0">
              {/* ticket header */}
              <div className="flex items-center justify-between border-b-2 border-dashed border-ink/25 px-6 py-4">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-pine">
                  Etiqueta de envio
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                  Nº 1990-2026
                </p>
              </div>

              <div className="flex flex-col sm:flex-row">
                {PERKS.map((perk, i) => (
                  <div
                    key={perk.title}
                    className={`relative flex-1 px-6 py-7 ${
                      i > 0
                        ? "border-t border-dashed border-ink/25 sm:border-l sm:border-t-0"
                        : ""
                    }`}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-pine text-gold">
                      <perk.icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-display text-xl font-bold text-pine">
                      {perk.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">
                      {perk.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* ticket footer */}
              <div className="flex items-center justify-between flex-wrap gap-4 border-t-2 border-dashed border-ink/25 px-4 sm:px-6 py-4 sm:py-5 w-full">
                <Barcode className="h-9 sm:h-10 w-32 sm:w-36 text-ink/75 shrink-0" />
                <p className="text-right font-mono text-[9.5px] sm:text-[10px] uppercase leading-relaxed tracking-[0.18em] text-ink/60 shrink-0">
                  origem: Sapeka
                  <br />
                  destino: <span className="font-bold text-coral">todo o Brasil</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* testimonials */}
      <div className="relative mx-auto mt-24 max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10 lg:mt-32">
        <div className="mb-12 text-center">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-coral">
              ✳ Cartões-postais de clientes
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-black tracking-tight text-pine">
              Quem veste Sapeka,{" "}
              <em className="font-medium italic">conta pra todo mundo</em>
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 110}>
              <figure
                className="relative h-full flex flex-col justify-between border-2 border-ink/15 bg-cream p-5 pt-7 rounded-xl shadow-[6px_8px_0_0_rgba(216,18,36,0.12)] transition-all duration-300 hover:rotate-0 hover:border-gold hover:shadow-[8px_10px_0_0_rgba(245,158,11,0.4)]"
                style={{ transform: `rotate(${t.tilt}deg)` }}
              >
                {/* tape vintage */}
                <span
                  className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-2 bg-gold/80 rounded-sm shadow-sm"
                  aria-hidden="true"
                />

                <div>
                  <div className="flex items-center justify-between gap-2">
                    {/* Estrelas */}
                    <div className="flex gap-1 text-gold">
                      {Array.from({ length: t.rating || 5 }).map((_, s) => (
                        <IconStar key={s} className="h-3.5 w-3.5 fill-gold" />
                      ))}
                    </div>
                    {t.verified && (
                      <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[#25D366] bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                        ✓ Verificado
                      </span>
                    )}
                  </div>

                  <blockquote className="mt-3.5 font-display text-[15.5px] font-medium italic leading-relaxed text-ink/90">
                    “{t.quote}”
                  </blockquote>
                </div>

                <figcaption className="mt-5 border-t border-dashed border-ink/20 pt-3.5 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover border-2 border-gold shrink-0 shadow-sm"
                  />
                  <div className="min-w-0">
                    <p className="font-mono text-[11.5px] font-bold uppercase tracking-[0.12em] text-pine truncate">
                      {t.name}
                    </p>
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink/50">
                      {t.place}
                    </p>
                    {t.bought && (
                      <p className="mt-0.5 text-[9px] font-mono text-coral font-medium truncate">
                        🏷️ {t.bought}
                      </p>
                    )}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
