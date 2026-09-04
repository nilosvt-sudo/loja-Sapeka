import { useState } from "react";
import { DEPARTMENTS, type DeptId } from "../data";
import { IconArrow, IconCheck, Reveal } from "../lib";

const DEPT_DETAILS: Record<
  DeptId,
  {
    subcategories: string[];
    perks: string[];
    highlightTag: string;
  }
> = {
  feminino: {
    highlightTag: "Araras novas toda semana",
    subcategories: [
      "Vestidos Midi",
      "Linho & Alfaiataria",
      "Blusas Fluidas",
      "Jeans Premium",
      "Conjuntos",
      "Acessórios",
    ],
    perks: [
      "Tecidos nobres, linho puro e caimento fluido impecável",
      "Grade de tamanhos do P ao GG (numerações 36 ao 44)",
    ],
  },
  masculino: {
    highlightTag: "Elegância casual e corte sob medida",
    subcategories: [
      "Camisas de Linho",
      "Polos Piquet",
      "Bermudas Casual",
      "Calças Sarja & Jeans",
      "T-shirts Básicas",
      "Malharia",
    ],
    perks: [
      "Tecidos nobres de toque macio e caimento impecável",
      "Grade completa do P ao XG com modelagem tradicional e slim",
    ],
  },
  infantil: {
    highlightTag: "Conforto e liberdade para brincar",
    subcategories: [
      "Conjuntinhos",
      "Vestidinhos",
      "Camisetas Kids",
      "Bermudas & Shorts",
      "Calçados Infantis",
      "Moda Bebê",
    ],
    perks: [
      "Algodão antialérgico macio e costuras confortáveis",
      "Tamanhos do 02 ao 16 anos com estampas divertidas",
    ],
  },
  calcados: {
    highlightTag: "As marcas que o Brasil calça",
    subcategories: [
      "Tênis Urban Comfort",
      "Sandálias & Rasteiras",
      "Sapatênis",
      "Chinelos & Slides",
      "Sapatos Sociais",
      "Linha Kids",
    ],
    perks: [
      "Palmilhas anatômicas ultra confortáveis para o dia a dia",
      "Numerações femininas, masculinas e infantis (24 ao 44)",
    ],
  },
  casa: {
    highlightTag: "Cheirinho de casa nova e aconchego",
    subcategories: [
      "Jogos de Toalhas 5 pçs",
      "Enxovais & Lençóis",
      "Mesa Posta & Trilhos",
      "Roupões Felpudos",
      "Mantas & Cobertores",
      "Almofadas",
    ],
    perks: [
      "Fios 100% algodão com toque aveludado e alta absorção",
      "Linha completa para camas Casal, Queen, King e banho",
    ],
  },
};

export function Departments({ onExplore }: { onExplore: (d: DeptId) => void }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const current = DEPARTMENTS[activeIdx];
  const details = DEPT_DETAILS[current.id];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % DEPARTMENTS.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + DEPARTMENTS.length) % DEPARTMENTS.length);
  };

  return (
    <section id="departamentos" className="relative scroll-mt-24 overflow-hidden w-full max-w-full bg-cream py-20 lg:py-28">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* header row */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-12">
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
              Da arara feminina ao enxoval da casa: navegue pelas 5 seções ou clique diretamente na categoria que procura.
            </p>
          </Reveal>
        </div>

        {/* Slider de Destaque em 2 Colunas (Lookbook Editorial) */}
        <div className="relative w-full max-w-full overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_20px_45px_-15px_rgba(0,0,0,0.1)] ring-1 ring-black/5">
          <div className="grid lg:grid-cols-12 items-stretch min-h-[510px]">
            {/* Coluna Esquerda: Texto, Subcategorias, Diferenciais & Ações */}
            <div className="lg:col-span-6 pt-7 sm:pt-10 lg:pt-12 p-5 sm:p-9 lg:p-10 flex flex-col justify-center gap-4 sm:gap-6 bg-paper w-full max-w-full overflow-hidden">
              {/* Header & Badges com Alto Contraste */}
              <div className="flex items-center justify-between flex-wrap gap-3 w-full">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="rounded-lg bg-pine px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-gold shadow-sm">
                    0{activeIdx + 1} / 05 · {current.name.toUpperCase()}
                  </span>
                  <span className="rounded-lg border border-ink/15 bg-cream px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono text-[10.5px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-ink/80">
                    {current.count}
                  </span>
                </div>

                {/* Controles de Navegação Anterior / Próximo */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Departamento anterior"
                    className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-ink/20 bg-cream text-ink transition-all hover:border-pine hover:bg-pine hover:text-gold active:scale-95 shadow-sm"
                  >
                    <IconArrow className="h-4 w-4 rotate-180" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Próximo departamento"
                    className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-ink/20 bg-cream text-ink transition-all hover:border-pine hover:bg-pine hover:text-gold active:scale-95 shadow-sm"
                  >
                    <IconArrow className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Título & Descrição */}
              <div>
                <span className="font-mono text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.2em] text-coral">
                  ✦ {details.highlightTag}
                </span>
                <h3 className="mt-1 font-display text-2xl sm:text-4xl lg:text-[2.5rem] font-black tracking-tight text-pine leading-tight">
                  {current.name}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-sm sm:text-base leading-relaxed text-ink/75">
                  {current.desc}
                </p>
              </div>

              {/* Subcategorias em Chips com Flex-Wrap e Tags Compactas */}
              <div className="w-full">
                <p className="font-mono text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50 mb-2">
                  Principais peças nesta arara:
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full">
                  {details.subcategories.map((sub, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-ink/15 bg-cream px-2.5 py-1 font-mono text-[9.5px] sm:text-[10.5px] font-semibold text-ink/80 shadow-2xs transition-colors hover:border-pine hover:bg-pine hover:text-gold"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Diferenciais com Ícones */}
              <div className="space-y-1.5 rounded-xl border border-dashed border-ink/15 bg-cream/50 p-2.5 sm:p-3">
                {details.perks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] sm:text-xs text-ink/80 font-medium">
                    <IconCheck className="h-3.5 w-3.5 text-pine mt-0.5 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Ação de Explorar Departamento (Largura Total no Mobile) */}
              <div className="pt-1 w-full">
                <button
                  onClick={() => onExplore(current.id)}
                  className="flex items-center justify-center gap-2 sm:gap-3 w-full rounded-xl bg-pine px-4 py-3.5 sm:px-7 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-gold shadow-md transition-all hover:scale-[1.01] hover:bg-pine-deep active:scale-95 text-center"
                >
                  <span>Explorar Arara de {current.name}</span>
                  <IconArrow className="h-4 w-4 shrink-0" />
                </button>
              </div>
            </div>

            {/* Coluna Direita: Foto Vertical de Corpo Inteiro (Sem Cortes no Rosto) */}
            <div className="lg:col-span-6 relative bg-cream/40 overflow-hidden min-h-[340px] sm:min-h-[480px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-ink/10 flex items-center justify-center">
              <img
                key={current.id}
                src={current.img}
                alt={`Modelo - Departamento ${current.name}`}
                loading="lazy"
                className="card-in h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              
              <span className="absolute bottom-4 right-4 rounded-lg bg-pine-deep/85 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-gold-soft backdrop-blur-md">
                Lookbook Sapeka
              </span>
            </div>
          </div>

          {/* Barra de 5 Miniaturas Clicáveis Proporcionais em Largura Total */}
          <div id="barra-departamentos" className="border-t border-ink/10 bg-cream/90 p-2 sm:p-5 backdrop-blur-sm overflow-hidden w-full">
            {/* Grid 100% uniforme com as 5 miniaturas ocupando toda a largura */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-4 w-full min-w-0">
              {DEPARTMENTS.map((d, i) => {
                const isActive = activeIdx === i;
                const displayName =
                  d.id === "casa" ? "Cama & Banho" : d.name;

                return (
                  <button
                    key={d.id}
                    onClick={() => setActiveIdx(i)}
                    className={`group relative flex flex-col items-center gap-1 sm:gap-2 rounded-xl border p-1 sm:p-2.5 transition-all text-center min-w-0 overflow-hidden w-full ${
                      isActive
                        ? "border-pine bg-paper shadow-md scale-[1.02] ring-2 ring-pine/25"
                        : "border-ink/10 bg-paper/60 opacity-70 hover:opacity-100 hover:border-pine/30 hover:bg-paper"
                    }`}
                  >
                    <img
                      src={d.img}
                      alt={d.name}
                      loading="lazy"
                      className="h-9 sm:h-16 w-full rounded-lg object-cover object-top"
                    />
                    <div className="flex flex-col items-center">
                      <span className="font-mono text-[8.5px] sm:text-[11px] font-bold uppercase tracking-tight sm:tracking-wider text-ink leading-tight line-clamp-1">
                        {displayName}
                      </span>
                      <span className="hidden sm:block font-mono text-[9px] text-ink/50 mt-0.5">
                        0{i + 1}
                      </span>
                    </div>
                    {isActive && (
                      <span className="absolute -bottom-1 inset-x-3 sm:inset-x-6 h-0.5 sm:h-1 rounded-full bg-pine" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dots de Paginação Compactos Centralizados Abaixo (Visíveis no Mobile) */}
            <div className="mt-3 flex items-center justify-center gap-1.5 sm:hidden">
              {DEPARTMENTS.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Ir para departamento ${d.name}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIdx === i
                      ? "w-6 bg-pine"
                      : "w-2 bg-ink/20 hover:bg-ink/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
