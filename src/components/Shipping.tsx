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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
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
            <div className="relative -rotate-1 border-2 border-ink/80 bg-cream shadow-[14px_14px_0_0_rgba(15,61,46,0.18)] transition-transform duration-500 hover:rotate-0">
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
              <div className="flex items-center justify-between gap-6 border-t-2 border-dashed border-ink/25 px-6 py-5">
                <Barcode className="h-10 w-36 text-ink/75" />
                <p className="text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-ink/50">
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
      <div className="relative mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:mt-32">
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
                className="relative h-full border border-ink/15 bg-cream p-6 pt-8 shadow-[6px_8px_0_0_rgba(15,61,46,0.1)] transition-all duration-300 hover:rotate-0 hover:shadow-[6px_8px_0_0_rgba(232,169,59,0.55)]"
                style={{ transform: `rotate(${t.tilt}deg)` }}
              >
                {/* tape */}
                <span
                  className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-2 bg-gold/70"
                  aria-hidden="true"
                />
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <IconStar key={s} className="h-3.5 w-3.5" />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-[17px] font-medium italic leading-relaxed text-ink/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-dashed border-ink/20 pt-3.5">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-pine">
                    {t.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
                    {t.place}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
