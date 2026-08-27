import { DEPARTMENTS, type DeptId } from "../data";
import { IconArrow, Reveal } from "../lib";

const SPANS: Record<DeptId, string> = {
  feminino: "md:col-span-7 aspect-[4/3] md:aspect-[16/9]",
  masculino: "md:col-span-5 aspect-[4/3] md:aspect-[16/10.8]",
  infantil: "md:col-span-5 aspect-[4/3] md:aspect-[16/10.8]",
  calcados: "md:col-span-7 aspect-[4/3] md:aspect-[16/9]",
  casa: "md:col-span-12 aspect-[16/9] md:aspect-[21/7]",
};

export function Departments({ onExplore }: { onExplore: (d: DeptId) => void }) {
  return (
    <section id="departamentos" className="relative scroll-mt-24 bg-cream py-20 lg:py-28">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* header row */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-coral">
                ✳ Cinco departamentos, um só telhado
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-3 font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-black leading-[0.95] tracking-tight text-pine">
                Um passeio completo
                <br />
                <em className="font-medium italic text-ink">pela loja inteira</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="max-w-sm text-base leading-relaxed text-ink/65">
              Da arara feminina ao enxoval da casa: você entra por um
              departamento e sai com a família toda vestida — e a mesa posta.
            </p>
          </Reveal>
        </div>

        {/* mosaic */}
        <div className="grid gap-4 md:grid-cols-12 lg:gap-5">
          {DEPARTMENTS.map((d, i) => (
            <Reveal key={d.id} delay={i * 90} className={SPANS[d.id]}>
              <button
                onClick={() => onExplore(d.id)}
                className="group relative block h-full w-full overflow-hidden bg-pine text-left"
              >
                <img
                  src={d.img}
                  alt={`Departamento ${d.name}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-95 transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-100"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-pine-deep/90 via-pine-deep/25 to-transparent transition-opacity duration-500" />

                {/* corner index */}
                <span className="absolute right-4 top-4 border border-cream/50 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-cream/90 backdrop-blur-sm">
                  0{i + 1} / {d.count}
                </span>

                {/* content */}
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                  <span>
                    <span className="block font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl lg:text-[2.6rem]">
                      {d.name}
                    </span>
                    <span className="mt-1.5 block max-w-md text-sm leading-relaxed text-cream/75">
                      {d.desc}
                    </span>
                  </span>
                  <span className="mb-1 grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-gold text-gold transition-all duration-300 group-hover:rotate-[-45deg] group-hover:bg-gold group-hover:text-pine-deep">
                    <IconArrow className="h-5 w-5" />
                  </span>
                </span>

                {/* hover label */}
                <span className="absolute left-5 top-5 -translate-x-3 bg-gold px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-pine-deep opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:left-7 sm:top-7">
                  Ver peças
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
