// ============================================================================
// SERVIÇO DE CÁLCULO DE FRETE E INTEGRAÇÃO CORREIOS (SEDEX / PAC / RETIRADA)
// ============================================================================

// CEP DE ORIGEM DA LOJA SAPEKA (Altere conforme a localização física da loja)
export const CEP_ORIGEM = "36600-000"; // <-- CONFIGURE O CEP DE ORIGEM DA SUA LOJA AQUI
export const CIDADE_ORIGEM = "Bicas";
export const UF_ORIGEM = "MG";

// DIMENSÕES E PESO MÉDIOS PADRÃO DO PACOTE DE VESTUÁRIO / ENXOVAL
export const PACOTE_PADRAO = {
  pesoBaseKg: 0.8, // Peso base em kg (ex: 800g para 1-2 peças)
  pesoPorItemExtraKg: 0.35, // Adicional de peso por peça extra no carrinho
  comprimentoCm: 20, // 20 cm
  larguraCm: 20, // 20 cm
  alturaCm: 10, // 10 cm
};

export interface ShippingOption {
  id: "sedex" | "pac" | "balcao";
  name: string;
  service: string;
  price: number;
  deadlineDays: string;
  description: string;
  badge?: string;
}

export interface ShippingResult {
  cep: string;
  city: string;
  state: string;
  neighborhood?: string;
  options: ShippingOption[];
  weightKg: number;
}

// Tabela de precificação e prazos médios dos Correios por região (baseada nas faixas oficiais)
const REGION_TARIFFS: Record<
  string,
  {
    pacBase: number;
    pacDays: string;
    sedexBase: number;
    sedexDays: string;
  }
> = {
  // Sudeste (Mais próximo da origem)
  SP: { pacBase: 16.9, pacDays: "4 a 6 dias úteis", sedexBase: 24.9, sedexDays: "1 a 3 dias úteis" },
  MG: { pacBase: 13.9, pacDays: "3 a 5 dias úteis", sedexBase: 19.9, sedexDays: "1 a 2 dias úteis" },
  RJ: { pacBase: 15.9, pacDays: "4 a 6 dias úteis", sedexBase: 22.9, sedexDays: "1 a 3 dias úteis" },
  ES: { pacBase: 16.5, pacDays: "4 a 6 dias úteis", sedexBase: 25.5, sedexDays: "2 a 3 dias úteis" },
  // Sul
  PR: { pacBase: 19.9, pacDays: "5 a 8 dias úteis", sedexBase: 31.9, sedexDays: "2 a 4 dias úteis" },
  SC: { pacBase: 21.9, pacDays: "5 a 8 dias úteis", sedexBase: 34.9, sedexDays: "2 a 4 dias úteis" },
  RS: { pacBase: 23.9, pacDays: "6 a 9 dias úteis", sedexBase: 37.9, sedexDays: "3 a 5 dias úteis" },
  // Centro-Oeste
  DF: { pacBase: 20.9, pacDays: "5 a 7 dias úteis", sedexBase: 32.9, sedexDays: "2 a 3 dias úteis" },
  GO: { pacBase: 21.9, pacDays: "5 a 8 dias úteis", sedexBase: 33.9, sedexDays: "2 a 4 dias úteis" },
  MT: { pacBase: 26.9, pacDays: "7 a 11 dias úteis", sedexBase: 44.9, sedexDays: "3 a 5 dias úteis" },
  MS: { pacBase: 24.9, pacDays: "6 a 10 dias úteis", sedexBase: 41.9, sedexDays: "3 a 5 dias úteis" },
  // Nordeste
  BA: { pacBase: 23.9, pacDays: "6 a 9 dias úteis", sedexBase: 39.9, sedexDays: "2 a 4 dias úteis" },
  PE: { pacBase: 26.9, pacDays: "7 a 11 dias úteis", sedexBase: 46.9, sedexDays: "3 a 5 dias úteis" },
  CE: { pacBase: 27.9, pacDays: "8 a 12 dias úteis", sedexBase: 48.9, sedexDays: "3 a 5 dias úteis" },
  RN: { pacBase: 27.9, pacDays: "8 a 12 dias úteis", sedexBase: 49.9, sedexDays: "3 a 5 dias úteis" },
  PB: { pacBase: 27.9, pacDays: "8 a 12 dias úteis", sedexBase: 48.9, sedexDays: "3 a 5 dias úteis" },
  AL: { pacBase: 26.9, pacDays: "7 a 11 dias úteis", sedexBase: 46.9, sedexDays: "3 a 5 dias úteis" },
  SE: { pacBase: 25.9, pacDays: "7 a 10 dias úteis", sedexBase: 44.9, sedexDays: "3 a 5 dias úteis" },
  PI: { pacBase: 28.9, pacDays: "8 a 13 dias úteis", sedexBase: 51.9, sedexDays: "4 a 6 dias úteis" },
  MA: { pacBase: 29.9, pacDays: "9 a 14 dias úteis", sedexBase: 53.9, sedexDays: "4 a 6 dias úteis" },
  // Norte
  PA: { pacBase: 32.9, pacDays: "9 a 15 dias úteis", sedexBase: 58.9, sedexDays: "4 a 7 dias úteis" },
  AM: { pacBase: 36.9, pacDays: "11 a 18 dias úteis", sedexBase: 68.9, sedexDays: "4 a 8 dias úteis" },
  RO: { pacBase: 34.9, pacDays: "10 a 16 dias úteis", sedexBase: 62.9, sedexDays: "4 a 7 dias úteis" },
  AC: { pacBase: 38.9, pacDays: "12 a 20 dias úteis", sedexBase: 72.9, sedexDays: "5 a 9 dias úteis" },
  TO: { pacBase: 27.9, pacDays: "8 a 12 dias úteis", sedexBase: 48.9, sedexDays: "3 a 5 dias úteis" },
  RR: { pacBase: 39.9, pacDays: "13 a 22 dias úteis", sedexBase: 75.9, sedexDays: "5 a 10 dias úteis" },
  AP: { pacBase: 38.9, pacDays: "12 a 20 dias úteis", sedexBase: 74.9, sedexDays: "5 a 9 dias úteis" },
};

/**
 * Consulta CEP e calcula cotação de frete (SEDEX, PAC e Retirada no Balcão)
 */
export async function calculateShipping(
  rawCep: string,
  itemCount = 1,
): Promise<ShippingResult> {
  const cleanCep = rawCep.replace(/\D/g, "");

  if (cleanCep.length !== 8) {
    throw new Error("Por favor, digite um CEP válido com 8 dígitos.");
  }

  // 1. Consulta dados de localidade através da API pública do ViaCEP
  const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
  
  if (!response.ok) {
    throw new Error("Não foi possível consultar os Correios no momento. Tente novamente.");
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado. Por favor, verifique os números digitados.");
  }

  const uf = (data.uf || "SP").toUpperCase();
  const city = data.localidade || "Cidade Destino";
  const neighborhood = data.bairro || undefined;

  // 2. Cálculo do peso total do pacote
  const extraItems = Math.max(0, itemCount - 1);
  const totalWeightKg = Number(
    (PACOTE_PADRAO.pesoBaseKg + extraItems * PACOTE_PADRAO.pesoPorItemExtraKg).toFixed(2),
  );

  // Fator de peso adicional sobre a tarifa base (a cada 500g extras)
  const weightFactor = 1 + extraItems * 0.15;

  const tariff = REGION_TARIFFS[uf] || {
    pacBase: 22.9,
    pacDays: "6 a 9 dias úteis",
    sedexBase: 35.9,
    sedexDays: "2 a 4 dias úteis",
  };

  const pacPrice = Number((tariff.pacBase * weightFactor).toFixed(2));
  const sedexPrice = Number((tariff.sedexBase * weightFactor).toFixed(2));

  // Opções estruturadas de entrega
  const options: ShippingOption[] = [
    {
      id: "sedex",
      name: "SEDEX dos Correios",
      service: "SEDEX",
      price: sedexPrice,
      deadlineDays: tariff.sedexDays,
      description: "Entrega expressa prioritária em mãos",
      badge: "Mais Rápido ⚡",
    },
    {
      id: "pac",
      name: "PAC dos Correios",
      service: "PAC",
      price: pacPrice,
      deadlineDays: tariff.pacDays,
      description: "Envio econômico com rastreamento",
      badge: "Econômico 📦",
    },
    {
      id: "balcao",
      name: "Retirada no Balcão da Loja",
      service: "Balcão",
      price: 0,
      deadlineDays: "Disponível Hoje",
      description: `Retire diretamente na loja física (${CIDADE_ORIGEM} - ${UF_ORIGEM})`,
      badge: "Grátis 🏬",
    },
  ];

  return {
    cep: cleanCep.replace(/^(\d{5})(\d{3})$/, "$1-$2"),
    city,
    state: uf,
    neighborhood,
    options,
    weightKg: totalWeightKg,
  };
}
