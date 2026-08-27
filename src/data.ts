// ============================================================================
// CONFIGURAÇÃO DE CONTATO OFICIAL DA LOJA SAPEKA
// ============================================================================
export const WHATSAPP_NUMBER = "553299640316";
export const WHATSAPP_DISPLAY = "(32) 9964-0316";

export const INSTAGRAM_URL = "https://www.instagram.com/sapekaloja/";
export const INSTAGRAM_HANDLE = "@sapekaloja";

export type DeptId =
  | "feminino"
  | "masculino"
  | "infantil"
  | "calcados"
  | "casa";

export const DEPT_LABEL: Record<DeptId, string> = {
  feminino: "Feminino",
  masculino: "Masculino",
  infantil: "Infantil",
  calcados: "Calçados",
  casa: "Cama, Mesa & Banho",
};

const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/1036f36e-989e-42e5-baeb-14194819e89f/_result.png",
  feminino:
    "https://image.qwenlm.ai/generated-images/701971cb-de43-4eec-897d-9959bcc65aad/_result.png",
  masculino:
    "https://image.qwenlm.ai/generated-images/a0d592db-8326-4fb3-a785-6820d66f16cc/_result.png",
  infantil:
    "https://image.qwenlm.ai/generated-images/49f5484a-66c2-4f56-92c9-e2c5883d8c1e/_result.png",
  calcados:
    "https://image.qwenlm.ai/generated-images/48c778df-cf60-4395-b49b-375c66d2713c/_result.png",
  casa: "https://image.qwenlm.ai/generated-images/74933626-bbc9-473b-85e9-14e3d6289d9f/_result.png",
  historia:
    "https://image.qwenlm.ai/generated-images/d3575d5c-c0b4-47c7-a772-053e540663af/_result.png",
  jeans:
    "https://image.qwenlm.ai/generated-images/c002a04d-594a-41a5-82b8-490ecff68e34/_result.png",
  bolsa:
    "https://image.qwenlm.ai/generated-images/6e3a9bd5-6108-4fae-9fb5-5f941dcc3f08/_result.png",
  kidsTenis:
    "https://image.qwenlm.ai/generated-images/82dc7a2d-da9e-4181-a45d-9df21476b570/_result.png",
};

export { IMG };

export interface Department {
  id: DeptId;
  name: string;
  desc: string;
  count: string;
  img: string;
}

export const DEPARTMENTS: Department[] = [
  {
    id: "feminino",
    name: "Feminino",
    desc: "Vestidos, jeans, blusas e acessórios para todos os estilos — do trabalho ao fim de semana.",
    count: "320+ peças",
    img: IMG.feminino,
  },
  {
    id: "masculino",
    name: "Masculino",
    desc: "Camisas, camisetas e o casual bem cortado de sempre.",
    count: "180+ peças",
    img: IMG.masculino,
  },
  {
    id: "infantil",
    name: "Infantil",
    desc: "Do RN ao juvenil: conforto para brincar e estilo para crescer.",
    count: "240+ peças",
    img: IMG.infantil,
  },
  {
    id: "calcados",
    name: "Calçados",
    desc: "Tênis, sandálias e botas das marcas que o Brasil calça.",
    count: "150+ pares",
    img: IMG.calcados,
  },
  {
    id: "casa",
    name: "Cama, Mesa & Banho",
    desc: "Toalhas, enxovais e mesa posta com cheiro de casa nova.",
    count: "200+ itens",
    img: IMG.casa,
  },
];

export interface Product {
  id: string;
  name: string;
  dept: DeptId;
  price: number;
  oldPrice?: number;
  tag?: "NOVO" | "MAIS VENDIDO" | string;
  img: string;
  imgHover?: string;
  sizes?: string[];
  stockWarning?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "vestido-midi",
    name: "Vestido Midi Floral",
    dept: "feminino",
    price: 189.9,
    tag: "NOVO",
    img: IMG.feminino,
    imgHover: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=700&auto=format&fit=crop&q=80",
    sizes: ["P", "M", "G", "GG"],
    stockWarning: "🔥 Apenas 2 peças no Tam M",
  },
  {
    id: "camisa-linho",
    name: "Camisa de Linho Premium",
    dept: "masculino",
    price: 159.9,
    tag: "NOVO",
    img: IMG.masculino,
    imgHover: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&auto=format&fit=crop&q=80",
    sizes: ["P", "M", "G", "GG", "XG"],
    stockWarning: "⚡ Últimas 3 unidades",
  },
  {
    id: "conjunto-kids",
    name: "Conjunto Kids Divertido",
    dept: "infantil",
    price: 99.9,
    oldPrice: 124.9,
    tag: "-20%",
    img: IMG.infantil,
    imgHover: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=700&auto=format&fit=crop&q=80",
    sizes: ["2", "4", "6", "8", "10", "12"],
    stockWarning: "🔥 Restam poucos conjuntos",
  },
  {
    id: "tenis-urban",
    name: "Tênis Urban Comfort",
    dept: "calcados",
    price: 219.9,
    img: IMG.calcados,
    imgHover: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80",
    sizes: ["37", "38", "39", "40", "41", "42"],
    stockWarning: "⚡ Apenas 1 par Tam 41",
  },
  {
    id: "jogo-toalhas",
    name: "Jogo de Toalhas Felpudas · 5 pçs",
    dept: "casa",
    price: 129.9,
    tag: "MAIS VENDIDO",
    img: IMG.casa,
    imgHover: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=700&auto=format&fit=crop&q=80",
    sizes: ["Único"],
  },
  {
    id: "denim-slim",
    name: "Denim Premium Slim",
    dept: "feminino",
    price: 179.9,
    img: IMG.jeans,
    imgHover: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=700&auto=format&fit=crop&q=80",
    sizes: ["36", "38", "40", "42", "44"],
    stockWarning: "🔥 Últimas 2 peças no 38",
  },
  {
    id: "bolsa-tote",
    name: "Bolsa Tote Estruturada",
    dept: "feminino",
    price: 149.9,
    oldPrice: 214.9,
    tag: "-30%",
    img: IMG.bolsa,
    imgHover: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=700&auto=format&fit=crop&q=80",
    sizes: ["Único"],
    stockWarning: "⚡ Quase esgotado na loja",
  },
  {
    id: "tenis-kids",
    name: "Tênis Kids Colorido",
    dept: "calcados",
    price: 109.9,
    tag: "NOVO",
    img: IMG.kidsTenis,
    imgHover: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=700&auto=format&fit=crop&q=80",
    sizes: ["24", "26", "28", "30", "32"],
  },
];

export const TICKER_ITEMS = [
  "Enviamos para todo o Brasil",
  "Desde 1990 no varejo",
  "Loja multimarcas",
  "Parcele em até 6x",
  "Novidades toda semana",
  "Peça pelo direct " + INSTAGRAM_HANDLE,
];

export const MARQUEE_CATS = [
  "Moda Feminina",
  "Moda Masculina",
  "Infantil",
  "Calçados",
  "Cama, Mesa & Banho",
  "Multimarcas",
];

export const BRANDS_ROW_A = [
  "Hering",
  "Colcci",
  "Malwee",
  "Kyly",
  "PUC",
  "Lunelli",
  "Fakini",
];

export const BRANDS_ROW_B = [
  "Moleca",
  "Beira Rio",
  "Vizzano",
  "Olympikus",
  "Via Marte",
  "Lepper",
  "Buddemeyer",
];

export interface Milestone {
  year: string;
  title: string;
  text: string;
}

export const MILESTONES: Milestone[] = [
  {
    year: "1990",
    title: "A primeira arara",
    text: "A Sapeka abre as portas com poucas araras, muita vontade e um nome inspirado no jeitinho sapeca de vestir a cidade.",
  },
  {
    year: "1998",
    title: "Moda para eles",
    text: "Chegam o departamento masculino e as primeiras prateleiras de calçados — a loja dobra de tamanho.",
  },
  {
    year: "2007",
    title: "Geração Sapekinha",
    text: "A ala infantil nasce e veste bebês, crianças e adolescentes que crescem junto com a loja.",
  },
  {
    year: "2015",
    title: "Casa arrumada",
    text: "Cama, mesa & banho entram para a família: toalhas, enxovais e mesa posta das melhores marcas.",
  },
  {
    year: "2020",
    title: "O Brasil inteiro de cliente",
    text: "O direct do Instagram vira vitrine e o CEP deixa de ser limite: envios para todos os estados.",
  },
  {
    year: "Hoje",
    title: "35 anos de estrada",
    text: "Mais de mil peças, cinco departamentos e o mesmo atendimento de balcão de 1990.",
  },
];

export const STATS = [
  { value: 35, suffix: "", label: "anos de história" },
  { value: 1000, suffix: "+", label: "peças na loja" },
  { value: 27, suffix: "", label: "estados atendidos" },
  { value: 5, suffix: "", label: "departamentos" },
];

export interface Testimonial {
  quote: string;
  name: string;
  place: string;
  tilt: number;
  avatar: string;
  bought: string;
  rating: number;
  verified: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Comprei o Vestido Floral pelo direct numa segunda e chegou na quinta! Embalagem cheirosa, bilhete escrito à mão… virei cliente fiel.",
    name: "Mariana Costa",
    place: "Fortaleza · CE",
    tilt: -1.5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bought: "Vestido Midi Floral (Tam: M)",
    rating: 5,
    verified: true,
  },
  {
    quote:
      "Visto meus dois filhos na Sapeka desde bebês. A ala infantil tem achados de qualidade impecável que duram muito.",
    name: "Paula Rezende",
    place: "Belo Horizonte · MG",
    tilt: 1.2,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    bought: "Conjunto Kids & Tênis (Tam: 6)",
    rating: 5,
    verified: true,
  },
  {
    quote:
      "Atendimento rápido no WhatsApp, mandaram fotos do tênis no manequim e postaram no mesmo dia com rastreio!",
    name: "Jorge Medeiros",
    place: "Curitiba · PR",
    tilt: 1.8,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bought: "Tênis Urban Comfort (Tam: 41)",
    rating: 5,
    verified: true,
  },
  {
    quote:
      "O enxoval da casa nova veio todo de lá: Buddemeyer, Lepper… qualidade de loja tradicional com preço justo e envio seguro.",
    name: "Cláudia & André",
    place: "Recife · PE",
    tilt: -1.2,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    bought: "Jogo de Toalhas & Lençóis 5 pçs",
    rating: 5,
    verified: true,
  },
];

export const FEED_TILES = [
  { img: IMG.infantil, likes: "1.284", caption: "Ala infantil reposta ✿" },
  { img: IMG.calcados, likes: "987", caption: "Novidades em calçados" },
  { img: IMG.casa, likes: "1.542", caption: "Mesa posta de sábado" },
  { img: IMG.feminino, likes: "2.031", caption: "O vestido da semana" },
  { img: IMG.bolsa, likes: "876", caption: "Acessório novo na arara" },
];

export const fmtBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const installment = (v: number) =>
  (v / 6).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function buildWhatsAppCartUrl(
  items: { product: Product; qty: number; size?: string }[],
  subtotal: number,
  shipping?: {
    option: {
      name: string;
      price: number;
      deadlineDays: string;
    };
    destination: {
      cep: string;
      city: string;
      state: string;
      neighborhood?: string;
    };
  },
): string {
  const lineItems = items
    .map(
      (item, idx) =>
        `${idx + 1}️⃣ *${item.qty}x* ${item.product.name} ${item.size ? `(Tam: *${item.size}*)` : ""} — ${fmtBRL(item.product.price * item.qty)}`,
    )
    .join("\n");

  const shippingCost = shipping?.option.price ?? 0;
  const total = subtotal + shippingCost;

  const shippingBlock = shipping
    ? [
        `\n🚚 *OPÇÃO DE ENTREGA:*`,
        `• Modalidade: *${shipping.option.name}*`,
        `• Valor: *${shippingCost === 0 ? "Grátis (Retirada no Balcão)" : fmtBRL(shippingCost)}*`,
        `• Prazo: *${shipping.option.deadlineDays}*`,
        `• Destino: *${shipping.destination.city}/${shipping.destination.state}* (CEP: ${shipping.destination.cep})`,
      ].join("\n")
    : `\n📦 *Frete:* A calcular no atendimento`;

  const message = [
    `🛍️ *Olá, Loja Sapeka!*`,
    `Gostaria de fechar meu pedido feito pelo site:\n`,
    `📋 *ITENS DO PEDIDO:*`,
    lineItems,
    `\n💰 *Subtotal das Peças:* ${fmtBRL(subtotal)}`,
    shippingBlock,
    `\n✨ *VALOR TOTAL DO PEDIDO:* *${fmtBRL(total)}*`,
    `💳 *Parcelamento:* em até 6x de ${installment(total)} sem juros`,
    `\nPor favor, me confirme a disponibilidade das peças e os dados para pagamento!`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
