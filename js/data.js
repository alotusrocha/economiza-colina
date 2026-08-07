// Catálogo Completo de Supermercados, Encartes e Produtos (com Ofertas de Referência Única e Múltiplas)
// Colina de Laranjeiras & Imediações (Serra / ES)

const SUPERMARKETS = [
  {
    id: 'extrabom',
    name: 'Extrabom Supermercados',
    location: 'Colina de Laranjeiras (Shopping Montserrat)',
    badge: 'No Bairro',
    color: '#e63946',
    distance: '0.4 km',
    isLocal: true
  },
  {
    id: 'carone',
    name: 'Carone Supermercados',
    location: 'Laranjeiras (Av. Central)',
    badge: 'Imediações',
    color: '#0077b6',
    distance: '1.2 km',
    isLocal: false
  },
  {
    id: 'perim',
    name: 'Perim Supermercados',
    location: 'Laranjeiras (Av. Eldes Scherrer)',
    badge: 'Imediações',
    color: '#2a9d8f',
    distance: '1.5 km',
    isLocal: false
  },
  {
    id: 'atacadao',
    name: 'Atacadão Serra',
    location: 'Colina de Laranjeiras (BR-101 Norte)',
    badge: 'Atacarejo No Bairro',
    color: '#f4a261',
    distance: '0.8 km',
    isLocal: true
  },
  {
    id: 'assai',
    name: 'Assaí Atacadista',
    location: 'Laranjeiras / Civit',
    badge: 'Atacarejo',
    color: '#023e8a',
    distance: '1.8 km',
    isLocal: false
  },
  {
    id: 'ok_super',
    name: 'OK Superatacado',
    location: 'Laranjeiras (Av. Eldes Scherrer)',
    badge: 'Atacarejo',
    color: '#e76f51',
    distance: '1.6 km',
    isLocal: false
  },
  {
    id: 'epa',
    name: 'EPA Supermercados',
    location: 'Laranjeiras',
    badge: 'Imediações',
    color: '#d62828',
    distance: '1.4 km',
    isLocal: false
  }
];

const ENCARTES = [
  { id: 1, file: 'campanha-169512-cluster-541-pagina-1.jpeg', title: 'Assaí: Acelera com Preço Baixo (Capa)', market: 'assai', validity: 'Válido 07/08 a 08/08' },
  { id: 2, file: 'campanha-169512-cluster-541-pagina-2.jpeg', title: 'Assaí: Laticínios, Limpeza e Cervejas', market: 'assai', validity: 'Válido 07/08 a 08/08' },
  { id: 3, file: 'WhatsApp Image 2026-08-07 at 08.18.24.jpeg', title: 'Atacadão BR-101: Especial Aves Copacol', market: 'atacadao', validity: 'Ofertas da Semana' },
  { id: 4, file: 'WhatsApp Image 2026-08-07 at 09.00.44.jpeg', title: 'Atacadão BR-101: Super Sexta Café Número Um', market: 'atacadao', validity: 'Válido 07/08' },
  { id: 5, file: 'WhatsApp Image 2026-08-07 at 09.15.47.jpeg', title: 'Carone: Especial Ofertas Dia dos Pais', market: 'carone', validity: 'Válido 07/08 a 08/08' },
  { id: 6, file: 'WhatsApp Image 2026-08-07 at 13.00.42.jpeg', title: 'Carone: Especial Destilados Dia dos Pais', market: 'carone', validity: 'Válido 03/08 a 09/08' },
  { id: 7, file: 'oferta-pagina-9.png', title: 'Extrabom: Especial Limpeza Downy e Ariel', market: 'extrabom', validity: 'Válido até 12/08' }
];

const CATEGORIES = [
  { id: 'all', name: 'Todas as Ofertas', icon: '🏷️' },
  { id: 'acougue', name: 'Açougue & Carnes', icon: '🥩' },
  { id: 'hortifruti', name: 'Hortifrúti & Frutas', icon: '🥦' },
  { id: 'laticinios', name: 'Laticínios & Frios', icon: '🧀' },
  { id: 'mercearia', name: 'Mercearia & Matinais', icon: '🌾' },
  { id: 'bebidas', name: 'Bebidas & Cervejas', icon: '🥤' },
  { id: 'limpeza', name: 'Limpeza & Casa', icon: '🧹' },
  { id: 'higiene', name: 'Higiene & Perfumaria', icon: '🧴' }
];

const PRODUCTS = [
  // --- OFERTAS COM VÁRIAS REFERÊNCIAS ---
  {
    id: 'p1',
    name: 'Contrafilé Bovino Resfriado Friboi (Peça/Pedaço kg)',
    category: 'acougue',
    unit: 'kg',
    image: 'assets/contrafile.png',
    encarteId: 1,
    offerMarketId: 'assai',
    offerPrice: 49.90,
    validity: 'Válido 07/08 a 08/08',
    prices: {
      assai: 49.90,
      atacadao: 52.90,
      extrabom: 59.90,
      carone: 58.90,
      perim: 62.50,
      ok_super: 53.90,
      epa: 67.90
    },
    featured: true,
    discountTag: 'App Assaí R$ 49,90/kg'
  },
  {
    id: 'p2',
    name: 'Arroz Branco Tipo 1 Puro Grão 5kg',
    category: 'mercearia',
    unit: '5kg',
    image: 'assets/arroz.png',
    encarteId: 1,
    offerMarketId: 'assai',
    offerPrice: 15.79,
    validity: 'Válido 07/08 a 08/08',
    prices: {
      assai: 15.79,
      atacadao: 18.90,
      extrabom: 22.90,
      carone: 23.50,
      perim: 24.90,
      ok_super: 19.20,
      epa: 25.90
    },
    featured: true,
    discountTag: 'Mega Preço R$ 15,79'
  },
  {
    id: 'p3',
    name: 'Café Tradicional ou Extraforte Número Um 250g',
    category: 'mercearia',
    unit: '250g',
    image: 'assets/cafe.png',
    encarteId: 4,
    offerMarketId: 'atacadao',
    offerPrice: 8.99,
    validity: 'Super Sexta 07/08',
    prices: {
      atacadao: 8.99,
      assai: 8.69,
      extrabom: 12.89,
      carone: 11.90,
      perim: 12.50,
      ok_super: 9.50,
      epa: 13.80
    },
    featured: true,
    discountTag: 'Super Sexta Atacadão'
  },
  {
    id: 'p4',
    name: 'Café Torrado e Moído Melitta 500g',
    category: 'mercearia',
    unit: '500g',
    image: 'assets/cafe.png',
    encarteId: 5,
    offerMarketId: 'carone',
    offerPrice: 24.98,
    validity: 'Válido 07/08 a 08/08',
    prices: {
      carone: 24.98,
      extrabom: 28.90,
      perim: 29.90,
      atacadao: 25.90,
      assai: 25.50,
      ok_super: 26.90,
      epa: 29.99
    },
    featured: false,
    discountTag: 'Clube Carone R$ 24,98'
  },
  {
    id: 'p5',
    name: 'Caixa de Bombons Sortidos Garoto 220g',
    category: 'mercearia',
    unit: '220g',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&auto=format&fit=crop&q=80',
    encarteId: 5,
    offerMarketId: 'carone',
    offerPrice: 11.99,
    validity: 'Válido 07/08 a 08/08',
    prices: {
      carone: 11.99,
      extrabom: 13.98,
      perim: 14.50,
      atacadao: 12.50,
      assai: 12.30,
      ok_super: 12.90,
      epa: 14.90
    },
    featured: true,
    discountTag: 'Especial Dia dos Pais'
  },

  // --- OFERTAS COM APENAS UM SUPERMERCADO COMO REFERÊNCIA DE PREÇO (MUITO IMPORTANTE!) ---
  {
    id: 'p15',
    name: 'Amaciante Concentrado Downy 1L (Perfuma e Premia)',
    category: 'limpeza',
    unit: '1L',
    image: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?w=400&auto=format&fit=crop&q=80',
    encarteId: 7, // Extrabom Pág 9
    offerMarketId: 'extrabom',
    offerPrice: 18.99,
    validity: 'Válido até 12/08',
    prices: {
      extrabom: 18.99 // APENAS EXTRABOM COMO REFERÊNCIA
    },
    featured: true,
    discountTag: 'Referência Única: Extrabom'
  },
  {
    id: 'p16',
    name: 'Sabão Líquido Ariel Cores Radiantes 3L',
    category: 'limpeza',
    unit: '3L',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&auto=format&fit=crop&q=80',
    encarteId: 7, // Extrabom Pág 9
    offerMarketId: 'extrabom',
    offerPrice: 34.90,
    validity: 'Válido até 12/08',
    prices: {
      extrabom: 34.90 // APENAS EXTRABOM COMO REFERÊNCIA
    },
    featured: true,
    discountTag: 'Referência Única: Extrabom'
  },
  {
    id: 'p17',
    name: 'Whisky Escocês Chivas Regal 12Y 750ml',
    category: 'bebidas',
    unit: '750ml',
    image: 'assets/cerveja.png',
    encarteId: 6, // Carone Destilados
    offerMarketId: 'carone',
    offerPrice: 99.90,
    validity: 'Válido 03/08 a 09/08',
    prices: {
      carone: 99.90 // APENAS CARONE COMO REFERÊNCIA
    },
    featured: true,
    discountTag: 'Referência Única: Carone'
  },
  {
    id: 'p18',
    name: 'Gin Inglês Beefeater Sabores 750ml',
    category: 'bebidas',
    unit: '750ml',
    image: 'assets/cerveja.png',
    encarteId: 6, // Carone Destilados
    offerMarketId: 'carone',
    offerPrice: 89.90,
    validity: 'Válido 03/08 a 09/08',
    prices: {
      carone: 89.90 // APENAS CARONE COMO REFERÊNCIA
    },
    featured: false,
    discountTag: 'Referência Única: Carone'
  },
  {
    id: 'p19',
    name: 'Petisco de Frango Temperado Copacol Congelado 1kg',
    category: 'acougue',
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&auto=format&fit=crop&q=80',
    encarteId: 3, // Atacadão BR-101
    offerMarketId: 'atacadao',
    offerPrice: 16.90,
    validity: 'Atacadão BR-101',
    prices: {
      atacadao: 16.90 // APENAS ATACADÃO COMO REFERÊNCIA
    },
    featured: false,
    discountTag: 'Referência Única: Atacadão'
  },
  {
    id: 'p20',
    name: 'Hambúrguer Misto Congelado Texas Burger Seara 672g',
    category: 'acougue',
    unit: '672g',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
    encarteId: 2, // Assaí Pág 2
    offerMarketId: 'assai',
    offerPrice: 11.90,
    validity: 'Válido 07/08 a 08/08',
    prices: {
      assai: 11.90 // APENAS ASSAÍ COMO REFERÊNCIA
    },
    featured: false,
    discountTag: 'Referência Única: Assaí'
  }
];

const COMMUNITY_TIPS = [
  {
    author: 'Mariana S. (Moradora de Colina)',
    market: 'Assaí Atacadista',
    text: 'Contrafilé Friboi tá por R$ 49,90 no App Meu Assaí hoje!',
    time: 'Há 15 minutos'
  },
  {
    author: 'Carlos Eduardo',
    market: 'Atacadão BR-101',
    text: 'Café Número Um tá R$ 8,99 na Super Sexta do Atacadão!',
    time: 'Há 45 minutos'
  },
  {
    author: 'Fernanda Lima',
    market: 'Carone Laranjeiras',
    text: 'Gin Beefeater tá por R$ 89,90 no Clube Carone!',
    time: 'Há 2 horas'
  }
];
