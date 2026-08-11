// Catálogo Completo de Supermercados, Encartes e Produtos
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
    badge: 'Laranjeiras',
    color: '#0077b6',
    distance: '1.2 km',
    isLocal: false
  },
  {
    id: 'casagrande',
    name: 'Rede Casagrande',
    location: 'Bairro Barcelona (Av. Região Sudeste)',
    badge: 'Bairro Barcelona',
    color: '#16a34a',
    distance: '1.9 km',
    isLocal: false
  },
  {
    id: 'bh',
    name: 'Supermercados BH',
    location: 'Laranjeiras (Av. Eldes Scherrer)',
    badge: 'Laranjeiras',
    color: '#d62828',
    distance: '1.4 km',
    isLocal: false
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
    id: 'atacado_vem',
    name: 'Atacado Vem',
    location: 'Serra (Rodovia Norte-Sul)',
    badge: 'Atacarejo No Bairro',
    color: '#f4a261',
    distance: '1.1 km',
    isLocal: true
  }
];

const ENCARTES = [
  { id: 1, file: 'oferta-pagina-1.png', title: 'Extrabom: Descontaço Clube Extrabom (Capa & Carnes)', market: 'extrabom', validity: 'Válido 06/08 a 12/08' },
  { id: 2, file: 'oferta-pagina-2.png', title: 'Extrabom: Mercearia, Perecíveis, Bebidas e Limpeza', market: 'extrabom', validity: 'Válido 06/08 a 12/08' },
  { id: 3, file: 'campanha-169512-cluster-541-pagina-1.jpeg', title: 'Assaí: Acelera com Preço Baixo (Capa)', market: 'assai', validity: 'Válido 07/08 a 08/08' },
  { id: 4, file: 'campanha-169512-cluster-541-pagina-2.jpeg', title: 'Assaí: Laticínios, Limpeza e Cervejas', market: 'assai', validity: 'Válido 07/08 a 08/08' },
  { id: 5, file: 'WhatsApp Image 2026-08-07 at 08.18.24.jpeg', title: 'Atacadão BR-101: Especial Aves Copacol', market: 'atacadao', validity: 'Ofertas da Semana' },
  { id: 6, file: 'WhatsApp Image 2026-08-07 at 09.00.44.jpeg', title: 'Atacadão BR-101: Super Sexta Café Número Um', market: 'atacadao', validity: 'Válido 07/08' },
  { id: 7, file: 'WhatsApp Image 2026-08-07 at 09.15.47.jpeg', title: 'Carone: Especial Ofertas Dia dos Pais', market: 'carone', validity: 'Válido 07/08 a 08/08' },
  { id: 8, file: 'WhatsApp Image 2026-08-07 at 13.00.42.jpeg', title: 'Carone: Especial Destilados Dia dos Pais', market: 'carone', validity: 'Válido 03/08 a 09/08' },
  { id: 9, file: 'WhatsApp Image 2026-08-07 at 11.02.07.jpeg', title: 'Carone: Batata, Calabresa Sadia & Comfort', market: 'carone', validity: 'Válido 07/08 a 08/08' },
  { id: 10, file: 'WhatsApp Image 2026-08-04 at 07.00.43.jpeg', title: 'Carone: Especial Azeite Andorinha Extra Virgem', market: 'carone', validity: 'Válido 04/08 a 09/08' },
  { id: 11, file: 'casagrande-pagina-1.png', title: 'Rede Casagrande: Encarte Semanal Matinais & Açougue', market: 'casagrande', validity: 'Válido 01/08 a 09/08' },
  { id: 12, file: 'casagrande-pagina-2.png', title: 'Rede Casagrande: Feira, Bebidas & Mercearia Imbatível', market: 'casagrande', validity: 'Válido 07/08 a 11/08' }
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
  {
    "id": "online_1",
    "name": "Manteiga Capel com Sal 500g",
    "category": "laticinios",
    "unit": "500g",
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 22.99,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 24.9,
      "carone": 27.9,
      "casagrande": 26.5,
      "bh": 24.49,
      "assai": 23.9,
      "atacado_vem": 22.99
    },
    "featured": true,
    "discountTag": "Menor preço no Atacado Vem R$ 22,99"
  },
  {
    "id": "online_2",
    "name": "Manteiga Porto Alegre com Sal 500g",
    "category": "laticinios",
    "unit": "500g",
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 23.89,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 25.9,
      "carone": 28.9,
      "casagrande": 27.5,
      "bh": 25.49,
      "assai": 24.9,
      "atacado_vem": 23.89
    },
    "featured": true,
    "discountTag": "Menor preço no Atacado Vem R$ 23,89"
  },
  {
    "id": "online_3",
    "name": "Manteiga Aviação com Sal 500g",
    "category": "laticinios",
    "unit": "500g",
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 24.99,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 26.9,
      "carone": 29.9,
      "casagrande": 28.5,
      "bh": 26.49,
      "assai": 25.9,
      "atacado_vem": 24.99
    },
    "featured": true,
    "discountTag": "Menor preço no Atacado Vem R$ 24,99"
  },
  {
    "id": "online_4",
    "name": "Manteiga Selita com Sal 500g",
    "category": "laticinios",
    "unit": "500g",
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 21.99,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 23.9,
      "carone": 26.9,
      "casagrande": 25.5,
      "bh": 23.49,
      "assai": 22.9,
      "atacado_vem": 21.99
    },
    "featured": true,
    "discountTag": "Menor preço no Atacado Vem R$ 21,99"
  },
  {
    "id": "online_5",
    "name": "Manteiga Itambé com Sal 500g",
    "category": "laticinios",
    "unit": "500g",
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 22.49,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 24.5,
      "carone": 27.5,
      "casagrande": 26.0,
      "bh": 24.19,
      "assai": 23.5,
      "atacado_vem": 22.49
    },
    "featured": true,
    "discountTag": "Menor preço no Atacado Vem R$ 22,49"
  },
  {
    "id": "online_6",
    "name": "Manteiga Capel com Sal 200g",
    "category": "laticinios",
    "unit": "200g",
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 9.99,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 10.9,
      "carone": 12.49,
      "casagrande": 11.9,
      "bh": 10.79,
      "assai": 10.29,
      "atacado_vem": 9.99
    },
    "featured": true,
    "discountTag": "Menor preço no Atacado Vem R$ 9,99"
  },
  {
    "id": "online_7",
    "name": "Manteiga Porto Alegre com Sal 200g",
    "category": "laticinios",
    "unit": "200g",
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 10.49,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 11.5,
      "carone": 12.9,
      "casagrande": 12.2,
      "bh": 11.29,
      "assai": 10.79,
      "atacado_vem": 10.49
    },
    "featured": true,
    "discountTag": "Menor preço no Atacado Vem R$ 10,49"
  },
  {
    "id": "online_8",
    "name": "Manteiga Aviação com Sal 200g",
    "category": "laticinios",
    "unit": "200g",
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 10.99,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 11.9,
      "carone": 13.49,
      "casagrande": 12.9,
      "bh": 11.79,
      "assai": 11.29,
      "atacado_vem": 10.99
    },
    "featured": true,
    "discountTag": "Menor preço no Atacado Vem R$ 10,99"
  },
  {
    "id": "online_9",
    "name": "Arroz Agulhinha Tio João Tipo 1 5kg",
    "category": "mercearia",
    "unit": "5kg",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 22.49,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 23.9,
      "carone": 25.9,
      "casagrande": 24.9,
      "bh": 23.49,
      "assai": 22.9,
      "atacado_vem": 22.49
    },
    "featured": true,
    "discountTag": "Menor preço no Atacado Vem R$ 22,49"
  },
  {
    "id": "online_10",
    "name": "Arroz Agulhinha Sepé Tipo 1 5kg",
    "category": "mercearia",
    "unit": "5kg",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 18.79,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 19.98,
      "carone": 21.9,
      "casagrande": 20.5,
      "bh": 19.49,
      "assai": 18.9,
      "atacado_vem": 18.79
    },
    "featured": true,
    "discountTag": "Menor preço no Atacado Vem R$ 18,79"
  },
  {
    "id": "online_11",
    "name": "Arroz Agulhinha Vasconcelos Tipo 1 5kg",
    "category": "mercearia",
    "unit": "5kg",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 19.49,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 20.9,
      "carone": 22.9,
      "casagrande": 21.9,
      "bh": 20.49,
      "assai": 19.9,
      "atacado_vem": 19.49
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 19,49"
  },
  {
    "id": "online_12",
    "name": "Arroz Agulhinha Camil Tipo 1 5kg",
    "category": "mercearia",
    "unit": "5kg",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 21.49,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 22.9,
      "carone": 24.9,
      "casagrande": 23.9,
      "bh": 22.49,
      "assai": 21.9,
      "atacado_vem": 21.49
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 21,49"
  },
  {
    "id": "online_13",
    "name": "Feijão Preto Zuppa Tipo 1 1kg",
    "category": "mercearia",
    "unit": "1kg",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 5.19,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 5.49,
      "carone": 6.29,
      "casagrande": 5.99,
      "bh": 5.79,
      "assai": 5.29,
      "atacado_vem": 5.19
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 5,19"
  },
  {
    "id": "online_14",
    "name": "Feijão Preto Kicaldo Tipo 1 1kg",
    "category": "mercearia",
    "unit": "1kg",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 5.39,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 5.99,
      "carone": 6.79,
      "casagrande": 6.49,
      "bh": 5.89,
      "assai": 5.59,
      "atacado_vem": 5.39
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 5,39"
  },
  {
    "id": "online_15",
    "name": "Feijão Preto Máximo Tipo 1 1kg",
    "category": "mercearia",
    "unit": "1kg",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 5.25,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 5.79,
      "carone": 6.49,
      "casagrande": 6.19,
      "bh": 5.69,
      "assai": 5.39,
      "atacado_vem": 5.25
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 5,25"
  },
  {
    "id": "online_16",
    "name": "Feijão Carioca Kicaldo Tipo 1 1kg",
    "category": "mercearia",
    "unit": "1kg",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 5.99,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 6.49,
      "carone": 7.29,
      "casagrande": 6.99,
      "bh": 6.79,
      "assai": 6.29,
      "atacado_vem": 5.99
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 5,99"
  },
  {
    "id": "online_17",
    "name": "Feijão Branco Kicaldo 500g",
    "category": "mercearia",
    "unit": "500g",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 7.19,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 7.9,
      "carone": 8.9,
      "casagrande": 8.5,
      "bh": 7.89,
      "assai": 7.49,
      "atacado_vem": 7.19
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 7,19"
  },
  {
    "id": "online_18",
    "name": "Lentilha Seca Yoki 500g",
    "category": "mercearia",
    "unit": "500g",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 8.19,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 8.9,
      "carone": 9.9,
      "casagrande": 9.5,
      "bh": 8.89,
      "assai": 8.49,
      "atacado_vem": 8.19
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 8,19"
  },
  {
    "id": "online_19",
    "name": "Grão de Bico Yoki 500g",
    "category": "mercearia",
    "unit": "500g",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 9.19,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 9.9,
      "carone": 10.9,
      "casagrande": 10.5,
      "bh": 9.89,
      "assai": 9.49,
      "atacado_vem": 9.19
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 9,19"
  },
  {
    "id": "online_20",
    "name": "Café Moído Número Um 500g",
    "category": "mercearia",
    "unit": "500g",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 16.79,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 17.9,
      "carone": 18.9,
      "casagrande": 18.5,
      "bh": 17.49,
      "assai": 16.9,
      "atacado_vem": 16.79
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 16,79"
  },
  {
    "id": "online_21",
    "name": "Café Moído Pilão 500g",
    "category": "mercearia",
    "unit": "500g",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 17.59,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 18.9,
      "carone": 19.9,
      "casagrande": 19.49,
      "bh": 18.49,
      "assai": 17.9,
      "atacado_vem": 17.59
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 17,59"
  },
  {
    "id": "online_22",
    "name": "Café Moído 3 Corações 500g",
    "category": "mercearia",
    "unit": "500g",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 17.29,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 18.5,
      "carone": 19.5,
      "casagrande": 18.99,
      "bh": 18.19,
      "assai": 17.5,
      "atacado_vem": 17.29
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 17,29"
  },
  {
    "id": "online_23",
    "name": "Café Moído Capital 500g",
    "category": "mercearia",
    "unit": "500g",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 15.69,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 16.9,
      "carone": 17.9,
      "casagrande": 17.49,
      "bh": 16.49,
      "assai": 15.9,
      "atacado_vem": 15.69
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 15,69"
  },
  {
    "id": "online_24",
    "name": "Leite Integral UHT Selita 1L",
    "category": "laticinios",
    "unit": "1L",
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 4.49,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 4.79,
      "carone": 5.19,
      "casagrande": 4.99,
      "bh": 4.69,
      "assai": 4.59,
      "atacado_vem": 4.49
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 4,49"
  },
  {
    "id": "online_25",
    "name": "Leite Integral UHT Porto Alegre 1L",
    "category": "laticinios",
    "unit": "1L",
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 4.55,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 4.89,
      "carone": 5.29,
      "casagrande": 5.09,
      "bh": 4.79,
      "assai": 4.69,
      "atacado_vem": 4.55
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 4,55"
  },
  {
    "id": "online_26",
    "name": "Leite Integral UHT Ninho 1L",
    "category": "laticinios",
    "unit": "1L",
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 4.99,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 5.49,
      "carone": 5.99,
      "casagrande": 5.79,
      "bh": 5.39,
      "assai": 5.19,
      "atacado_vem": 4.99
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 4,99"
  },
  {
    "id": "online_27",
    "name": "Leite Integral UHT Piracanjuba 1L",
    "category": "laticinios",
    "unit": "1L",
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 4.65,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 4.99,
      "carone": 5.39,
      "casagrande": 5.19,
      "bh": 4.89,
      "assai": 4.79,
      "atacado_vem": 4.65
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 4,65"
  },
  {
    "id": "online_28",
    "name": "Queijo Mussarela Fatiado Selita 200g",
    "category": "laticinios",
    "unit": "200g",
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 8.99,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 9.9,
      "carone": 11.49,
      "casagrande": 10.9,
      "bh": 9.79,
      "assai": 9.29,
      "atacado_vem": 8.99
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 8,99"
  },
  {
    "id": "online_29",
    "name": "Queijo Mussarela Fatiado Porto Alegre 200g",
    "category": "laticinios",
    "unit": "200g",
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 9.19,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 10.2,
      "carone": 11.8,
      "casagrande": 11.2,
      "bh": 10.0,
      "assai": 9.5,
      "atacado_vem": 9.19
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 9,19"
  },
  {
    "id": "online_30",
    "name": "Contrafilé Bovino Friboi kg",
    "category": "acougue",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 36.9,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 39.9,
      "carone": 44.9,
      "casagrande": 42.9,
      "bh": 38.9,
      "assai": 37.9,
      "atacado_vem": 36.9
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 36,90"
  },
  {
    "id": "online_31",
    "name": "Carne Moída de Primeira Friboi kg",
    "category": "acougue",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 26.9,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 29.9,
      "carone": 33.9,
      "casagrande": 31.9,
      "bh": 28.9,
      "assai": 27.9,
      "atacado_vem": 26.9
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 26,90"
  },
  {
    "id": "online_32",
    "name": "Peito de Frango Resfriado Seara kg",
    "category": "acougue",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 13.49,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 14.9,
      "carone": 16.9,
      "casagrande": 15.9,
      "bh": 14.49,
      "assai": 13.9,
      "atacado_vem": 13.49
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 13,49"
  },
  {
    "id": "online_33",
    "name": "Bisteca Suína Fresca Saudali kg",
    "category": "acougue",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 14.99,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 16.9,
      "carone": 18.9,
      "casagrande": 17.9,
      "bh": 16.49,
      "assai": 15.9,
      "atacado_vem": 14.99
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 14,99"
  },
  {
    "id": "online_34",
    "name": "Lombo Suíno Resfriado Pif Paf kg",
    "category": "acougue",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 17.99,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 19.9,
      "carone": 22.9,
      "casagrande": 21.5,
      "bh": 19.49,
      "assai": 18.9,
      "atacado_vem": 17.99
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 17,99"
  },
  {
    "id": "online_35",
    "name": "Linguiça Tuscana Perdigão kg",
    "category": "acougue",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 18.49,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 19.9,
      "carone": 22.9,
      "casagrande": 21.5,
      "bh": 19.49,
      "assai": 18.9,
      "atacado_vem": 18.49
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 18,49"
  },
  {
    "id": "online_36",
    "name": "Linguiça Tuscana Seara kg",
    "category": "acougue",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 17.49,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 18.9,
      "carone": 21.9,
      "casagrande": 20.5,
      "bh": 18.49,
      "assai": 17.9,
      "atacado_vem": 17.49
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 17,49"
  },
  {
    "id": "online_37",
    "name": "Alface Crespa / Americana un",
    "category": "hortifruti",
    "unit": "unidade",
    "image": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 2.79,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 3.49,
      "carone": 3.99,
      "casagrande": 3.79,
      "bh": 3.29,
      "assai": 2.99,
      "atacado_vem": 2.79
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 2,79"
  },
  {
    "id": "online_38",
    "name": "Couve Manteiga Maço",
    "category": "hortifruti",
    "unit": "maço",
    "image": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 2.39,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 2.99,
      "carone": 3.49,
      "casagrande": 3.29,
      "bh": 2.89,
      "assai": 2.59,
      "atacado_vem": 2.39
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 2,39"
  },
  {
    "id": "online_39",
    "name": "Batata Monalisa kg",
    "category": "hortifruti",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 4.99,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 5.99,
      "carone": 6.99,
      "casagrande": 6.49,
      "bh": 5.79,
      "assai": 5.49,
      "atacado_vem": 4.99
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 4,99"
  },
  {
    "id": "online_40",
    "name": "Alho Roxo Selecionado 200g",
    "category": "hortifruti",
    "unit": "200g",
    "image": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 5.99,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 6.9,
      "carone": 7.9,
      "casagrande": 7.5,
      "bh": 6.79,
      "assai": 6.49,
      "atacado_vem": 5.99
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 5,99"
  },
  {
    "id": "online_41",
    "name": "Cerveja Heineken Lata 350ml",
    "category": "bebidas",
    "unit": "350ml",
    "image": "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 4.59,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 4.99,
      "carone": 5.49,
      "casagrande": 5.29,
      "bh": 4.89,
      "assai": 4.69,
      "atacado_vem": 4.59
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 4,59"
  },
  {
    "id": "online_42",
    "name": "Cerveja Amstel Lata 350ml",
    "category": "bebidas",
    "unit": "350ml",
    "image": "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 3.29,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 3.69,
      "carone": 4.19,
      "casagrande": 3.99,
      "bh": 3.59,
      "assai": 3.39,
      "atacado_vem": 3.29
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 3,29"
  },
  {
    "id": "online_43",
    "name": "Cerveja Brahma Duplo Malte 350ml",
    "category": "bebidas",
    "unit": "350ml",
    "image": "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 3.09,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 3.49,
      "carone": 3.99,
      "casagrande": 3.79,
      "bh": 3.39,
      "assai": 3.19,
      "atacado_vem": 3.09
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 3,09"
  },
  {
    "id": "online_44",
    "name": "Cerveja Budweiser Lata 350ml",
    "category": "bebidas",
    "unit": "350ml",
    "image": "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 3.79,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 4.19,
      "carone": 4.69,
      "casagrande": 4.49,
      "bh": 4.09,
      "assai": 3.89,
      "atacado_vem": 3.79
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 3,79"
  },
  {
    "id": "online_45",
    "name": "Refrigerante Coca-Cola PET 2L",
    "category": "bebidas",
    "unit": "2L",
    "image": "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 8.79,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 9.49,
      "carone": 10.49,
      "casagrande": 9.99,
      "bh": 9.29,
      "assai": 8.99,
      "atacado_vem": 8.79
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 8,79"
  },
  {
    "id": "online_46",
    "name": "Refrigerante Guaraná Antarctica PET 2L",
    "category": "bebidas",
    "unit": "2L",
    "image": "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 6.79,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 7.49,
      "carone": 8.49,
      "casagrande": 7.99,
      "bh": 7.29,
      "assai": 6.99,
      "atacado_vem": 6.79
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 6,79"
  },
  {
    "id": "online_47",
    "name": "Azeite Extra Virgem Andorinha 500ml",
    "category": "mercearia",
    "unit": "500ml",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 36.9,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 38.9,
      "carone": 42.9,
      "casagrande": 41.5,
      "bh": 39.49,
      "assai": 37.9,
      "atacado_vem": 36.9
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 36,90"
  },
  {
    "id": "online_48",
    "name": "Azeite Extra Virgem Gallo 500ml",
    "category": "mercearia",
    "unit": "500ml",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 38.9,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 41.9,
      "carone": 45.9,
      "casagrande": 43.9,
      "bh": 41.49,
      "assai": 39.9,
      "atacado_vem": 38.9
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 38,90"
  },
  {
    "id": "online_49",
    "name": "Detergente Líquido Ypê 500ml",
    "category": "limpeza",
    "unit": "500ml",
    "image": "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 1.99,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 2.29,
      "carone": 2.59,
      "casagrande": 2.49,
      "bh": 2.19,
      "assai": 2.09,
      "atacado_vem": 1.99
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 1,99"
  },
  {
    "id": "online_50",
    "name": "Detergente Líquido Limpol 500ml",
    "category": "limpeza",
    "unit": "500ml",
    "image": "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 1.89,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 2.19,
      "carone": 2.49,
      "casagrande": 2.39,
      "bh": 2.09,
      "assai": 1.99,
      "atacado_vem": 1.89
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 1,89"
  },
  {
    "id": "online_51",
    "name": "Sabão em Pó Omo Lavanderia Perfeita 1.6kg",
    "category": "limpeza",
    "unit": "1.6kg",
    "image": "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 17.49,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 18.9,
      "carone": 20.9,
      "casagrande": 19.9,
      "bh": 18.49,
      "assai": 17.9,
      "atacado_vem": 17.49
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 17,49"
  },
  {
    "id": "online_52",
    "name": "Sabão em Pó Ariel 1.6kg",
    "category": "limpeza",
    "unit": "1.6kg",
    "image": "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacado_vem",
    "offerPrice": 18.29,
    "validity": "Consulta Online (Preços de Hoje)",
    "prices": {
      "extrabom": 19.9,
      "carone": 21.9,
      "casagrande": 20.9,
      "bh": 19.49,
      "assai": 18.9,
      "atacado_vem": 18.29
    },
    "featured": false,
    "discountTag": "Menor preço no Atacado Vem R$ 18,29"
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
