import {
  DEPARTMENTS,
  FEED_TILES,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from "../data";
import {
  Barcode,
  IconArrow,
  IconClock,
  IconHeart,
  IconInstagram,
  IconPin,
  IconWhatsApp,
  Reveal,
} from "../lib";

export function InstagramCTA() {
  return (
    <section id="contato" className="relative scroll-mt-24 overflow-hidden bg-pine-deep text-cream">
      <div className="pinstripe-gold absolute inset-0" aria-hidden="true" />
      <span
        className="text-outline-gold pointer-events-none absolute -bottom-8 left-0 select-none font-display text-[8rem] font-black leading-none sm:text-[12rem]"
        aria-hidden="true"
      >
        direct
      </span>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
                ✳ A vitrine que atualiza todo dia
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.6rem)] font-black leading-[0.95] tracking-tight">
                Chama no direct:
                <br />
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium italic text-gold transition-colors hover:text-gold-soft"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-cream/70">
                Peça pelo direct, receba fotos e medidas da peça, feche o
                pedido e acompanhe o envio — tudo pelo Instagram, do jeito
                simples que a gente sempre atendeu.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 bg-gold px-6 py-3.5 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-pine-deep shadow-[6px_6px_0_0_rgba(228,87,46,1)] transition-all hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_rgba(228,87,46,1)] active:translate-y-0 active:shadow-[4px_4px_0_0_rgba(228,87,46,1)]"
                >
                  <IconInstagram className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  Seguir a loja
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 border-b-2 border-cream/30 pb-1 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-cream/80 transition-colors hover:border-gold hover:text-gold"
                >
                  Enviar direct <IconArrow className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* feed tiles */}
          <Reveal delay={200}>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {FEED_TILES.map((tile, i) => (
                <a
                  key={i}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`group relative overflow-hidden border-2 border-cream/15 ${
                    i === 0
                      ? "col-span-2 row-span-2 aspect-square"
                      : i === FEED_TILES.length - 1
                        ? "col-span-2 aspect-[2/1]"
                        : "aspect-square"
                  }`}
                  aria-label={tile.caption}
                >
                  <img
                    src={tile.img}
                    alt={tile.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-pine-deep/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-1.5 font-mono text-sm font-bold text-cream">
                      <IconHeart className="h-4.5 w-4.5 fill-gold text-gold" />
                      {tile.likes}
                    </span>
                    <span className="px-2 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-cream/75">
                      {tile.caption}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-pine-deep text-cream">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* wordmark */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5">
              <img
                src="/logo-sapeka.jpg"
                alt="Logo Sapeka"
                className="h-14 w-14 rounded-xl border border-cream/20 object-cover shadow-md"
              />
              <div>
                <p className="font-display text-[clamp(2.5rem,5vw,3.8rem)] font-black italic leading-none tracking-tight text-cream">
                  Sapeka<span className="text-gold">.</span>
                </p>
                <span className="mt-1 block font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-gold-soft">
                  Multimarcas · Desde 1990
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              Loja multimarcas de varejo, no balcão desde 1990. Moda para a
              família inteira e casa arrumada — agora com entrega em todo o
              Brasil.
            </p>
            <div className="mt-6 flex items-center gap-5">
              <Barcode className="h-9 w-32 text-cream/50" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
                desde 1990
              </span>
            </div>
          </div>

          {/* departamentos */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-gold">
              Departamentos
            </h3>
            <ul className="mt-5 space-y-2.5">
              {DEPARTMENTS.map((d) => (
                <li key={d.id}>
                  <a
                    href="#departamentos"
                    className="group flex items-center gap-2 text-[15px] text-cream/75 transition-colors hover:text-gold"
                  >
                    <span className="h-[2px] w-3 bg-gold/40 transition-all group-hover:w-5 group-hover:bg-gold" />
                    {d.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* atendimento */}
          <div className="lg:col-span-4">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-gold">
              Atendimento
            </h3>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Olá, Loja Sapeka! Gostaria de falar com o atendimento.",
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 text-[15px] font-medium text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  <IconWhatsApp className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-400" />
                  WhatsApp: {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 text-[15px] text-cream/75 transition-colors hover:text-gold"
                >
                  <IconInstagram className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" />
                  {INSTAGRAM_HANDLE} — novidades e provador
                </a>
              </li>
              <li className="flex items-start gap-3 text-[15px] text-cream/75">
                <IconClock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" />
                Segunda a sábado · 9h às 18h
              </li>
              <li className="flex items-start gap-3 text-[15px] text-cream/75">
                <IconPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" />
                Loja física com 5 departamentos completos
              </li>
            </ul>

            <a
              href="#vitrine"
              className="mt-7 inline-flex items-center gap-2 border border-gold/50 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-gold transition-all hover:bg-gold hover:text-pine-deep"
            >
              Ver vitrine <IconArrow className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-cream/15 pt-7 sm:flex-row text-center sm:text-left">
          <p className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.12em] sm:tracking-[0.18em] text-cream/50 whitespace-nowrap">
            © {new Date().getFullYear()} Sapeka Multimarcas · Desde 1990
          </p>
          <p className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.12em] sm:tracking-[0.18em] text-cream/50 whitespace-nowrap">
            Feito no Brasil, enviado para todo o Brasil 🇧🇷
          </p>
        </div>
      </div>
    </footer>
  );
}
