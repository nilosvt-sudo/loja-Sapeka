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
}

export const PRODUCTS: Product[] = [
  {
    id: "vestido-midi",
    name: "Vestido Midi Floral",
    dept: "feminino",
    price: 189.9,
    tag: "NOVO",
    img: IMG.feminino,
  },
  {
    id: "camisa-linho",
    name: "Camisa de Linho Premium",
    dept: "masculino",
    price: 159.9,
    tag: "NOVO",
    img: IMG.masculino,
  },
  {
    id: "conjunto-kids",
    name: "Conjunto Kids Divertido",
    dept: "infantil",
    price: 99.9,
    oldPrice: 124.9,
    tag: "-20%",
    img: IMG.infantil,
  },
  {
    id: "tenis-urban",
    name: "Tênis Urban Comfort",
    dept: "calcados",
    price: 219.9,
    img: IMG.calcados,
  },
  {
    id: "jogo-toalhas",
    name: "Jogo de Toalhas Felpudas · 5 pçs",
    dept: "casa",
    price: 129.9,
    tag: "MAIS VENDIDO",
    img: IMG.casa,
  },
  {
    id: "denim-slim",
    name: "Denim Premium Slim",
    dept: "feminino",
    price: 179.9,
    img: IMG.jeans,
  },
  {
    id: "bolsa-tote",
    name: "Bolsa Tote Estruturada",
    dept: "feminino",
    price: 149.9,
    oldPrice: 214.9,
    tag: "-30%",
    img: IMG.bolsa,
  },
  {
    id: "tenis-kids",
    name: "Tênis Kids Colorido",
    dept: "calcados",
    price: 109.9,
    tag: "NOVO",
    img: IMG.kidsTenis,
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
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Comprei pelo direct numa segunda e chegou na quinta. Embalagem cheirosa, bilhete escrito à mão… virei cliente de verdade.",
    name: "Mariana C.",
    place: "Fortaleza · CE",
    tilt: -2.5,
  },
  {
    quote:
      "Visto meus dois filhos na Sapeka desde bebês. A ala infantil tem cada achado que nem shopping grande tem.",
    name: "Paula R.",
    place: "Belo Horizonte · MG",
    tilt: 1.8,
  },
  {
    quote:
      "Atendimento rápido, foto das peças no manequim e postagem no mesmo dia. Compro calçado lá de olho fechado.",
    name: "Jorge M.",
    place: "Curitiba · PR",
    tilt: 2.4,
  },
  {
    quote:
      "O enxoval da casa nova veio todo de lá: Buddemeyer, Lepper… qualidade de loja grande com preço de interior.",
    name: "Cláudia & André",
    place: "Recife · PE",
    tilt: -1.6,
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
