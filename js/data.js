// Catálogo Completo de Supermercados, Encartes e Produtos
// Colina de Laranjeiras & Imediações (Serra / ES)
// Atualizado com Ofertas Oficiais Atacadão (Válidas de 25/08 a 31/08/2026)

const SUPERMARKETS = [
  {
    "id": "extrabom",
    "name": "Extrabom Supermercados",
    "location": "Colina de Laranjeiras (Shopping Montserrat)",
    "badge": "No Bairro",
    "color": "#e63946",
    "distance": "0.4 km",
    "isLocal": true
  },
  {
    "id": "carone",
    "name": "Supermercados Carone",
    "location": "Colina de Laranjeiras",
    "badge": "No Bairro",
    "color": "#0077b6",
    "distance": "0.6 km",
    "isLocal": true
  },
  {
    "id": "casagrande",
    "name": "Rede Casagrande",
    "location": "Bairro Barcelona (Av. Região Sudeste)",
    "badge": "Bairro Barcelona",
    "color": "#16a34a",
    "distance": "1.9 km",
    "isLocal": false
  },
  {
    "id": "bh",
    "name": "Supermercados BH",
    "location": "Laranjeiras (Av. Eldes Scherrer)",
    "badge": "Laranjeiras",
    "color": "#d62828",
    "distance": "1.4 km",
    "isLocal": false
  },
  {
    "id": "assai",
    "name": "Assaí Atacadista",
    "location": "Laranjeiras / Civit",
    "badge": "Atacarejo",
    "color": "#023e8a",
    "distance": "1.8 km",
    "isLocal": false
  },
  {
    "id": "atacadao",
    "name": "Atacadão Serra",
    "location": "Colina de Laranjeiras (BR-101 Norte)",
    "badge": "Atacarejo No Bairro",
    "color": "#f4a261",
    "distance": "0.8 km",
    "isLocal": true
  },
  {
    "id": "atacado_vem",
    "name": "Atacado Vem",
    "location": "Serra (Rodovia Norte-Sul)",
    "badge": "Atacarejo No Bairro",
    "color": "#e76f51",
    "distance": "1.1 km",
    "isLocal": true
  }
];

const ENCARTES = [
  {
    "id": 1,
    "file": "WhatsApp Image 2026-08-25 at 07.13.29.jpeg",
    "title": "Atacadão BR-101: Hortifrúti & Açougue",
    "market": "atacadao",
    "validity": "Válido 25/08 a 31/08/2026"
  },
  {
    "id": 2,
    "file": "WhatsApp Image 2026-08-25 at 07.13.30.jpeg",
    "title": "Atacadão BR-101: Frios, Resfriados, Congelados & Mercearia",
    "market": "atacadao",
    "validity": "Válido 25/08 a 31/08/2026"
  },
  {
    "id": 3,
    "file": "WhatsApp Image 2026-08-25 at 07.13.30 (1).jpeg",
    "title": "Atacadão BR-101: Bomboniere & Bebidas",
    "market": "atacadao",
    "validity": "Válido 25/08 a 31/08/2026"
  },
  {
    "id": 4,
    "file": "WhatsApp Image 2026-08-25 at 07.13.31.jpeg",
    "title": "Atacadão BR-101: Limpeza, Higiene, Bazar & Pet Shop",
    "market": "atacadao",
    "validity": "Válido 25/08 a 31/08/2026"
  },
  {
    "id": 5,
    "file": "oferta-pagina-1.png",
    "title": "Extrabom: Descontaço Clube Extrabom (Capa & Carnes)",
    "market": "extrabom",
    "validity": "Válido 20/08 a 27/08/2026"
  },
  {
    "id": 6,
    "file": "campanha-169512-cluster-541-pagina-1.jpeg",
    "title": "Assaí: Acelera com Preço Baixo (Capa)",
    "market": "assai",
    "validity": "Válido 22/08 a 28/08/2026"
  },
  {
    "id": 7,
    "file": "casagrande-pagina-1.png",
    "title": "Rede Casagrande: Encarte Semanal Matinais & Açougue",
    "market": "casagrande",
    "validity": "Válido 21/08 a 28/08/2026"
  },
  {
    "id": 8,
    "file": "WhatsApp Image 2026-08-26 at 11.30.44.jpeg",
    "title": "Carone: Viva a Itália (Polpas, Pesto & Massas)",
    "market": "carone",
    "validity": "Válido 26/08 a 05/09/2026"
  },
  {
    "id": 9,
    "file": "WhatsApp Image 2026-08-26 at 11.31.16.jpeg",
    "title": "Carone: Viva a Itália (Azeites & Vinhos Especial)",
    "market": "carone",
    "validity": "Válido 26/08 a 05/09/2026"
  }
];

const CATEGORIES = [
  {
    "id": "all",
    "name": "Todas as Ofertas",
    "icon": "🏷️"
  },
  {
    "id": "acougue",
    "name": "Açougue & Carnes",
    "icon": "🥩"
  },
  {
    "id": "hortifruti",
    "name": "Hortifrúti & Frutas",
    "icon": "🥦"
  },
  {
    "id": "laticinios",
    "name": "Laticínios & Frios",
    "icon": "🧀"
  },
  {
    "id": "mercearia",
    "name": "Mercearia & Matinais",
    "icon": "🌾"
  },
  {
    "id": "bebidas",
    "name": "Bebidas & Cervejas",
    "icon": "🥤"
  },
  {
    "id": "limpeza",
    "name": "Limpeza & Casa",
    "icon": "🧹"
  },
  {
    "id": "higiene",
    "name": "Higiene & Perfumaria",
    "icon": "🧴"
  }
];

const PRODUCTS = [
  {
    "id": "atc_1",
    "name": "Ovo Branco Grande (Bandeja com 30 un)",
    "category": "hortifruti",
    "unit": "30 un",
    "image": "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacadao",
    "offerPrice": 13.99,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 13.99,
      "extrabom": 16.9,
      "carone": 17.5,
      "assai": 14.5,
      "atacado_vem": 14.9
    },
    "featured": true,
    "discountTag": "App R$ 13,99 | Cartão R$ 12,59 | Varejo R$ 14,99"
  },
  {
    "id": "atc_2",
    "name": "Alho a Granel kg",
    "category": "hortifruti",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacadao",
    "offerPrice": 14.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 14.9,
      "extrabom": 21.9,
      "carone": 22.5,
      "casagrande": 20.9,
      "bh": 18.9
    },
    "featured": true,
    "discountTag": "App R$ 14,90 | Cartão R$ 13,29 | Varejo R$ 16,90"
  },
  {
    "id": "atc_3",
    "name": "Cebola Nacional kg",
    "category": "hortifruti",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacadao",
    "offerPrice": 4.99,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 4.99,
      "extrabom": 7.99,
      "carone": 7.5,
      "bh": 6.49,
      "assai": 5.49
    },
    "featured": true,
    "discountTag": "App R$ 4,99 | Cartão R$ 4,49 | Varejo R$ 5,99"
  },
  {
    "id": "atc_4",
    "name": "Tomate Salada kg",
    "category": "hortifruti",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacadao",
    "offerPrice": 5.99,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 5.99,
      "extrabom": 7.99,
      "carone": 8.2,
      "casagrande": 7.49,
      "atacado_vem": 6.5
    },
    "featured": true,
    "discountTag": "App R$ 5,99 | Cartão R$ 5,29 | Varejo R$ 6,99"
  },
  {
    "id": "atc_5",
    "name": "Batata Lavada kg",
    "category": "hortifruti",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacadao",
    "offerPrice": 4.99,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 4.99,
      "extrabom": 6.99,
      "carone": 7.1,
      "bh": 5.99,
      "assai": 5.29
    },
    "featured": false,
    "discountTag": "App R$ 4,99 | Cartão R$ 4,49 | Varejo R$ 5,99"
  },
  {
    "id": "atc_6",
    "name": "Repolho Branco kg",
    "category": "hortifruti",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacadao",
    "offerPrice": 3.59,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 3.59,
      "extrabom": 4.99,
      "casagrande": 4.5,
      "bh": 4.19,
      "atacado_vem": 3.89
    },
    "featured": false,
    "discountTag": "App R$ 3,59 | Cartão R$ 3,19 | Varejo R$ 3,99"
  },
  {
    "id": "atc_7",
    "name": "Carne Bovina Contra Filé Friboi Porcionada Resfriada kg",
    "category": "acougue",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacadao",
    "offerPrice": 54.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 54.9,
      "extrabom": 58.9,
      "carone": 62.9,
      "assai": 55.9,
      "casagrande": 59.9
    },
    "featured": true,
    "discountTag": "App R$ 54,90 | Cartão R$ 49,90 | Varejo R$ 56,90"
  },
  {
    "id": "atc_8",
    "name": "Carne Bovina Cupim Porcionada Friboi Resfriada kg",
    "category": "acougue",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacadao",
    "offerPrice": 45.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 45.9,
      "extrabom": 49.9,
      "carone": 52.9,
      "bh": 47.9,
      "atacado_vem": 46.9
    },
    "featured": true,
    "discountTag": "App R$ 45,90 | Cartão R$ 40,90 | Varejo R$ 47,90"
  },
  {
    "id": "atc_9",
    "name": "Filé de Peito de Frango Lar / Canção IQF Congelado 1kg",
    "category": "acougue",
    "unit": "1kg",
    "image": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacadao",
    "offerPrice": 15.98,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 15.98,
      "extrabom": 18.98,
      "carone": 19.9,
      "assai": 16.9,
      "atacado_vem": 16.49
    },
    "featured": true,
    "discountTag": "App R$ 15,98 | Cartão R$ 14,48 | Varejo R$ 16,98"
  },
  {
    "id": "atc_10",
    "name": "Coxinha da Asa de Frango Canção / Lar IQF Congelada 1kg",
    "category": "acougue",
    "unit": "1kg",
    "image": "https://images.unsplash.com/photo-1588347818036-558601350947?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacadao",
    "offerPrice": 10.5,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 10.5,
      "extrabom": 13.9,
      "carone": 14.5,
      "casagrande": 12.9,
      "bh": 11.9
    },
    "featured": false,
    "discountTag": "App R$ 10,50 | Cartão R$ 9,50 | Varejo R$ 11,50"
  },
  {
    "id": "atc_11",
    "name": "Frango à Passarinho IQF Lar Congelado 1kg",
    "category": "acougue",
    "unit": "1kg",
    "image": "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacadao",
    "offerPrice": 8.99,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 8.99,
      "extrabom": 10.99,
      "carone": 11.9,
      "assai": 9.9,
      "bh": 9.49
    },
    "featured": false,
    "discountTag": "App R$ 8,99 | Cartão R$ 7,99 | Varejo R$ 9,99"
  },
  {
    "id": "atc_12",
    "name": "Filé de Peixe Tilápia Vitalmar / C.Vale Congelado 800g",
    "category": "acougue",
    "unit": "800g",
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacadao",
    "offerPrice": 31.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 31.9,
      "extrabom": 38.9,
      "carone": 39.9,
      "casagrande": 36.9,
      "atacado_vem": 33.9
    },
    "featured": false,
    "discountTag": "App R$ 31,90 | Cartão R$ 28,90 | Varejo R$ 37,90"
  },
  {
    "id": "atc_13",
    "name": "Peixe Cação em Posta Vitalmar Congelado 800g",
    "category": "acougue",
    "unit": "800g",
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacadao",
    "offerPrice": 31.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 31.9,
      "extrabom": 37.9,
      "carone": 38.9,
      "bh": 34.9,
      "assai": 32.9
    },
    "featured": false,
    "discountTag": "App R$ 31,90 | Cartão R$ 28,90 | Varejo R$ 36,90"
  },
  {
    "id": "atc_14",
    "name": "Linguiça Calabresa Cofril Resfriada Defumada 2,5kg",
    "category": "acougue",
    "unit": "2.5kg",
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacadao",
    "offerPrice": 51.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 51.9,
      "extrabom": 53.9,
      "carone": 58.9,
      "casagrande": 54.9,
      "atacado_vem": 52.9
    },
    "featured": true,
    "discountTag": "App R$ 51,90 | Cartão R$ 46,90 | Varejo R$ 52,90"
  },
  {
    "id": "atc_15",
    "name": "Linguiça para Churrasco Aurora Congelada 2,5kg",
    "category": "acougue",
    "unit": "2.5kg",
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80",
    "encarteId": 1,
    "offerMarketId": "atacadao",
    "offerPrice": 49.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 49.9,
      "extrabom": 54.9,
      "carone": 59.9,
      "assai": 51.9,
      "bh": 52.9
    },
    "featured": false,
    "discountTag": "App R$ 49,90 | Cartão R$ 44,90 | Varejo R$ 52,90"
  },
  {
    "id": "atc_16",
    "name": "Batata Pré-Frita Prime Fries Congelada 2kg",
    "category": "laticinios",
    "unit": "2kg",
    "image": "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=400&auto=format&fit=crop&q=80",
    "encarteId": 2,
    "offerMarketId": "atacadao",
    "offerPrice": 16.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 16.9,
      "extrabom": 21.9,
      "carone": 22.9,
      "casagrande": 19.9,
      "atacado_vem": 17.9
    },
    "featured": true,
    "discountTag": "App R$ 16,90 | Cartão R$ 14,90 | Varejo R$ 17,90"
  },
  {
    "id": "atc_17",
    "name": "Iogurte Danone Vários Sabores Garrafa 1,25kg",
    "category": "laticinios",
    "unit": "1.25kg",
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop&q=80",
    "encarteId": 2,
    "offerMarketId": "atacadao",
    "offerPrice": 15.99,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 15.99,
      "extrabom": 17.99,
      "carone": 18.9,
      "bh": 16.9,
      "assai": 16.5
    },
    "featured": false,
    "discountTag": "App R$ 15,99 | Cartão R$ 14,49 | Varejo R$ 16,99"
  },
  {
    "id": "atc_18",
    "name": "Iogurte Nestlé Ninho Soleil Morango Bandeja 540g",
    "category": "laticinios",
    "unit": "540g",
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop&q=80",
    "encarteId": 2,
    "offerMarketId": "atacadao",
    "offerPrice": 9.99,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 9.99,
      "extrabom": 13.49,
      "carone": 13.9,
      "casagrande": 11.9,
      "atacado_vem": 10.5
    },
    "featured": false,
    "discountTag": "App R$ 9,99 | Cartão R$ 8,99 | Varejo R$ 10,99"
  },
  {
    "id": "atc_19",
    "name": "Leite Fermentado Bob Esponja 6x80g",
    "category": "laticinios",
    "unit": "6x80g",
    "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&auto=format&fit=crop&q=80",
    "encarteId": 2,
    "offerMarketId": "atacadao",
    "offerPrice": 6.99,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 6.99,
      "extrabom": 8.49,
      "carone": 8.99,
      "bh": 7.49,
      "assai": 7.2
    },
    "featured": false,
    "discountTag": "App R$ 6,99 | Cartão R$ 6,19 | Varejo R$ 7,99"
  },
  {
    "id": "atc_20",
    "name": "Salsicha Nobre Congelada Pacote 3kg",
    "category": "laticinios",
    "unit": "3kg",
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80",
    "encarteId": 2,
    "offerMarketId": "atacadao",
    "offerPrice": 26.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 26.9,
      "extrabom": 29.9,
      "carone": 32.9,
      "casagrande": 28.9,
      "atacado_vem": 27.5
    },
    "featured": false,
    "discountTag": "App R$ 26,90 | Cartão R$ 23,90 | Varejo R$ 27,90"
  },
  {
    "id": "atc_21",
    "name": "Apresuntado Cofril Peça kg",
    "category": "laticinios",
    "unit": "kg",
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&auto=format&fit=crop&q=80",
    "encarteId": 2,
    "offerMarketId": "atacadao",
    "offerPrice": 14.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 14.9,
      "extrabom": 18.9,
      "carone": 19.5,
      "bh": 16.9,
      "assai": 15.9
    },
    "featured": true,
    "discountTag": "App R$ 14,90 | Cartão R$ 13,50 | Varejo R$ 16,90"
  },
  {
    "id": "atc_22",
    "name": "Arroz Puro Grão Tipo 1 Pacote 5kg",
    "category": "mercearia",
    "unit": "5kg",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 2,
    "offerMarketId": "atacadao",
    "offerPrice": 17.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 17.9,
      "extrabom": 18.9,
      "carone": 21.9,
      "assai": 18.5,
      "atacado_vem": 18.2
    },
    "featured": true,
    "discountTag": "App R$ 17,90 | Cartão R$ 15,90 | Varejo R$ 18,40"
  },
  {
    "id": "atc_23",
    "name": "Açúcar Cristal Bulnez Pacote 5kg",
    "category": "mercearia",
    "unit": "5kg",
    "image": "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=400&auto=format&fit=crop&q=80",
    "encarteId": 2,
    "offerMarketId": "atacadao",
    "offerPrice": 11.79,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 11.79,
      "extrabom": 12.29,
      "carone": 13.5,
      "casagrande": 12.49,
      "bh": 11.99
    },
    "featured": true,
    "discountTag": "App R$ 11,79 | Cartão R$ 10,59 | Varejo R$ 11,99"
  },
  {
    "id": "atc_24",
    "name": "Leite Longa Vida Capel Integral TP 1L",
    "category": "laticinios",
    "unit": "1L",
    "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&auto=format&fit=crop&q=80",
    "encarteId": 2,
    "offerMarketId": "atacadao",
    "offerPrice": 4.69,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 4.69,
      "extrabom": 5.19,
      "carone": 5.49,
      "casagrande": 4.99,
      "bh": 4.79
    },
    "featured": true,
    "discountTag": "App R$ 4,69 | Cartão R$ 4,19 | Varejo R$ 4,89"
  },
  {
    "id": "atc_25",
    "name": "Óleo de Algodão Elogiata Balde 14,5kg",
    "category": "mercearia",
    "unit": "14.5kg",
    "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80",
    "encarteId": 2,
    "offerMarketId": "atacadao",
    "offerPrice": 179.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 179.9,
      "extrabom": 199.9,
      "carone": 209.0,
      "assai": 185.0,
      "atacado_vem": 182.0
    },
    "featured": false,
    "discountTag": "App R$ 179,90 | Cartão R$ 159,90 | Varejo R$ 189,90"
  },
  {
    "id": "atc_26",
    "name": "Azeite de Oliva Andorinha Extra Virgem Vidro 500ml",
    "category": "mercearia",
    "unit": "500ml",
    "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80",
    "encarteId": 2,
    "offerMarketId": "atacadao",
    "offerPrice": 29.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 29.9,
      "extrabom": 31.9,
      "carone": 35.9,
      "casagrande": 32.9,
      "bh": 30.9
    },
    "featured": true,
    "discountTag": "App R$ 29,90 | Cartão R$ 26,90 | Varejo R$ 30,90"
  },
  {
    "id": "atc_27",
    "name": "Flocão de Milho Maratá Pacote 500g",
    "category": "mercearia",
    "unit": "500g",
    "image": "https://images.unsplash.com/photo-1551462147-37885acc36f1?w=400&auto=format&fit=crop&q=80",
    "encarteId": 2,
    "offerMarketId": "atacadao",
    "offerPrice": 2.39,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 2.39,
      "extrabom": 2.69,
      "carone": 2.99,
      "bh": 2.5,
      "assai": 2.45
    },
    "featured": false,
    "discountTag": "App R$ 2,39 | Cartão R$ 2,19 | Varejo R$ 2,49"
  },
  {
    "id": "atc_28",
    "name": "Cereal Matinal Sucrilhos Kellogg's Original 800g",
    "category": "mercearia",
    "unit": "800g",
    "image": "https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 2,
    "offerMarketId": "atacadao",
    "offerPrice": 15.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 15.9,
      "extrabom": 21.9,
      "carone": 22.9,
      "casagrande": 18.9,
      "atacado_vem": 16.5
    },
    "featured": false,
    "discountTag": "App R$ 15,90 | Cartão R$ 14,20 | Varejo R$ 17,90"
  },
  {
    "id": "atc_29",
    "name": "Azeitona Verde Campo Belo Fatiada Pouch 150g",
    "category": "mercearia",
    "unit": "150g",
    "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&auto=format&fit=crop&q=80",
    "encarteId": 2,
    "offerMarketId": "atacadao",
    "offerPrice": 5.99,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 5.99,
      "extrabom": 7.99,
      "carone": 8.5,
      "bh": 6.99,
      "assai": 6.2
    },
    "featured": false,
    "discountTag": "App R$ 5,99 | Cartão R$ 5,29 | Varejo R$ 6,99"
  },
  {
    "id": "atc_30",
    "name": "Mistura para Bolo Itaiquara Vários Sabores 390g",
    "category": "mercearia",
    "unit": "390g",
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80",
    "encarteId": 2,
    "offerMarketId": "atacadao",
    "offerPrice": 1.99,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 1.99,
      "extrabom": 4.49,
      "carone": 4.9,
      "casagrande": 3.5,
      "atacado_vem": 2.2
    },
    "featured": false,
    "discountTag": "App R$ 1,99 | Cartão R$ 1,79 | Varejo R$ 2,49"
  },
  {
    "id": "atc_31",
    "name": "Bebida Láctea Nescau Pack 9x180ml",
    "category": "mercearia",
    "unit": "9x180ml",
    "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&auto=format&fit=crop&q=80",
    "encarteId": 3,
    "offerMarketId": "atacadao",
    "offerPrice": 15.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 15.9,
      "extrabom": 17.9,
      "carone": 18.9,
      "assai": 16.5,
      "bh": 16.2
    },
    "featured": true,
    "discountTag": "App R$ 15,90 | Cartão R$ 14,20 | Varejo R$ 16,90"
  },
  {
    "id": "atc_32",
    "name": "Cereal Matinal Nescau Nestlé Caixeta 270g",
    "category": "mercearia",
    "unit": "270g",
    "image": "https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=400&auto=format&fit=crop&q=80",
    "encarteId": 3,
    "offerMarketId": "atacadao",
    "offerPrice": 8.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 8.9,
      "extrabom": 11.9,
      "carone": 12.5,
      "casagrande": 10.9,
      "atacado_vem": 9.5
    },
    "featured": false,
    "discountTag": "App R$ 8,90 | Cartão R$ 7,90 | Varejo R$ 10,90"
  },
  {
    "id": "atc_33",
    "name": "Leite Condensado Moça Integral Nestlé Lata 395g",
    "category": "laticinios",
    "unit": "395g",
    "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&auto=format&fit=crop&q=80",
    "encarteId": 3,
    "offerMarketId": "atacadao",
    "offerPrice": 7.95,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 7.95,
      "extrabom": 8.99,
      "carone": 9.5,
      "bh": 8.49,
      "assai": 8.2
    },
    "featured": true,
    "discountTag": "App R$ 7,95 | Cartão R$ 7,05 | Varejo R$ 8,95"
  },
  {
    "id": "atc_34",
    "name": "Bombom Ferrero Rocher Collection Caixeta 7 un",
    "category": "mercearia",
    "unit": "7 un",
    "image": "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&auto=format&fit=crop&q=80",
    "encarteId": 3,
    "offerMarketId": "atacadao",
    "offerPrice": 23.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 23.9,
      "extrabom": 30.99,
      "carone": 32.9,
      "casagrande": 27.9,
      "atacado_vem": 24.9
    },
    "featured": true,
    "discountTag": "App R$ 23,90 | Cartão R$ 21,50 | Varejo R$ 24,99"
  },
  {
    "id": "atc_35",
    "name": "Chiclete Trident X Gamers Vários Sabores Pote 48,3g",
    "category": "mercearia",
    "unit": "48.3g",
    "image": "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&auto=format&fit=crop&q=80",
    "encarteId": 3,
    "offerMarketId": "atacadao",
    "offerPrice": 8.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 8.9,
      "extrabom": 11.9,
      "carone": 12.5,
      "bh": 9.9,
      "assai": 9.2
    },
    "featured": false,
    "discountTag": "App R$ 8,90 | Cartão R$ 7,90 | Varejo R$ 9,90"
  },
  {
    "id": "atc_36",
    "name": "Gelatina Royal Vários Sabores Pacote 25g",
    "category": "mercearia",
    "unit": "25g",
    "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&auto=format&fit=crop&q=80",
    "encarteId": 3,
    "offerMarketId": "atacadao",
    "offerPrice": 1.79,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 1.79,
      "extrabom": 2.19,
      "carone": 2.49,
      "casagrande": 2.0,
      "atacado_vem": 1.89
    },
    "featured": false,
    "discountTag": "App R$ 1,79 | Cartão R$ 1,59 | Varejo R$ 1,99"
  },
  {
    "id": "atc_37",
    "name": "Campari Bitter Garrafa 998ml",
    "category": "bebidas",
    "unit": "998ml",
    "image": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&auto=format&fit=crop&q=80",
    "encarteId": 3,
    "offerMarketId": "atacadao",
    "offerPrice": 54.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 54.9,
      "extrabom": 69.9,
      "carone": 72.9,
      "assai": 57.9,
      "bh": 59.9
    },
    "featured": true,
    "discountTag": "App R$ 54,90 | Cartão R$ 49,90 | Varejo R$ 59,90"
  },
  {
    "id": "atc_38",
    "name": "Coquetel de Vinho Cantina da Serra Garrafa 1,5L",
    "category": "bebidas",
    "unit": "1.5L",
    "image": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&auto=format&fit=crop&q=80",
    "encarteId": 3,
    "offerMarketId": "atacadao",
    "offerPrice": 10.99,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 10.99,
      "extrabom": 12.99,
      "carone": 13.9,
      "casagrande": 11.99,
      "atacado_vem": 11.5
    },
    "featured": false,
    "discountTag": "App R$ 10,99 | Cartão R$ 9,99 | Varejo R$ 11,99"
  },
  {
    "id": "atc_39",
    "name": "Cerveja Itaipava Latão 550ml",
    "category": "bebidas",
    "unit": "550ml",
    "image": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&auto=format&fit=crop&q=80",
    "encarteId": 3,
    "offerMarketId": "atacadao",
    "offerPrice": 4.19,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 4.19,
      "extrabom": 4.79,
      "carone": 4.99,
      "bh": 4.39,
      "assai": 4.29
    },
    "featured": false,
    "discountTag": "App R$ 4,19 | Cartão R$ 3,79 | Varejo R$ 4,59"
  },
  {
    "id": "atc_40",
    "name": "Cerveja Amstel Lata 269ml",
    "category": "bebidas",
    "unit": "269ml",
    "image": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&auto=format&fit=crop&q=80",
    "encarteId": 3,
    "offerMarketId": "atacadao",
    "offerPrice": 2.99,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 2.99,
      "extrabom": 3.29,
      "carone": 3.49,
      "casagrande": 3.19,
      "atacado_vem": 3.09
    },
    "featured": true,
    "discountTag": "App R$ 2,99 | Cartão R$ 2,69 | Varejo R$ 3,19"
  },
  {
    "id": "atc_41",
    "name": "Refrigerante Guaraná Antarctica PET 600ml",
    "category": "bebidas",
    "unit": "600ml",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80",
    "encarteId": 3,
    "offerMarketId": "atacadao",
    "offerPrice": 4.49,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 4.49,
      "extrabom": 4.99,
      "carone": 5.29,
      "bh": 4.79,
      "assai": 4.59
    },
    "featured": false,
    "discountTag": "App R$ 4,49 | Cartão R$ 3,99 | Varejo R$ 4,89"
  },
  {
    "id": "atc_42",
    "name": "Suco de Uva Campo Largo Integral PET 1,35L",
    "category": "bebidas",
    "unit": "1.35L",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&auto=format&fit=crop&q=80",
    "encarteId": 3,
    "offerMarketId": "atacadao",
    "offerPrice": 11.99,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 11.99,
      "extrabom": 13.99,
      "carone": 14.9,
      "casagrande": 12.9,
      "atacado_vem": 12.49
    },
    "featured": false,
    "discountTag": "App R$ 11,99 | Cartão R$ 10,79 | Varejo R$ 12,99"
  },
  {
    "id": "atc_43",
    "name": "Refresco H2OH! Limoneto / Limão PET 500ml",
    "category": "bebidas",
    "unit": "500ml",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80",
    "encarteId": 3,
    "offerMarketId": "atacadao",
    "offerPrice": 4.39,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 4.39,
      "extrabom": 4.99,
      "carone": 5.49,
      "bh": 4.69,
      "assai": 4.49
    },
    "featured": false,
    "discountTag": "App R$ 4,39 | Cartão R$ 3,99 | Varejo R$ 4,79"
  },
  {
    "id": "atc_44",
    "name": "Refresco Líquido Tampico Frutas Cítricas PET 450ml",
    "category": "bebidas",
    "unit": "450ml",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&auto=format&fit=crop&q=80",
    "encarteId": 3,
    "offerMarketId": "atacadao",
    "offerPrice": 1.89,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 1.89,
      "extrabom": 2.69,
      "carone": 2.89,
      "casagrande": 2.2,
      "atacado_vem": 1.99
    },
    "featured": false,
    "discountTag": "App R$ 1,89 | Cartão R$ 1,69 | Varejo R$ 1,99"
  },
  {
    "id": "atc_45",
    "name": "Refresco Líquido Guaravita Guaraná Copo 290ml",
    "category": "bebidas",
    "unit": "290ml",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80",
    "encarteId": 3,
    "offerMarketId": "atacadao",
    "offerPrice": 1.05,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 1.05,
      "extrabom": 1.29,
      "carone": 1.49,
      "bh": 1.19,
      "assai": 1.1
    },
    "featured": false,
    "discountTag": "App R$ 1,05 | Cartão R$ 0,95 | Varejo R$ 1,15"
  },
  {
    "id": "atc_46",
    "name": "Lava Roupas em Pó Tixan Maciez / Primavera 2,4kg",
    "category": "limpeza",
    "unit": "2.4kg",
    "image": "https://images.unsplash.com/photo-1585832770485-e68a5fcfad72?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 17.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 17.9,
      "extrabom": 19.9,
      "carone": 21.9,
      "casagrande": 18.9,
      "atacado_vem": 18.2
    },
    "featured": true,
    "discountTag": "App R$ 17,90 | Cartão R$ 15,90 | Varejo R$ 18,50"
  },
  {
    "id": "atc_47",
    "name": "Lava Roupas Mon Bijou Azul / Verde Refil 900ml",
    "category": "limpeza",
    "unit": "900ml",
    "image": "https://images.unsplash.com/photo-1585832770485-e68a5fcfad72?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 9.75,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 9.75,
      "extrabom": 10.79,
      "carone": 11.9,
      "bh": 10.2,
      "assai": 9.9
    },
    "featured": false,
    "discountTag": "App R$ 9,75 | Cartão R$ 8,75 | Varejo R$ 10,19"
  },
  {
    "id": "atc_48",
    "name": "Água Sanitária Cloral Frasco 1L",
    "category": "limpeza",
    "unit": "1L",
    "image": "https://images.unsplash.com/photo-1585832770485-e68a5fcfad72?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 1.99,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 1.99,
      "extrabom": 2.35,
      "carone": 2.59,
      "casagrande": 2.2,
      "atacado_vem": 2.05
    },
    "featured": false,
    "discountTag": "App R$ 1,99 | Cartão R$ 1,79 | Varejo R$ 2,15"
  },
  {
    "id": "atc_49",
    "name": "Lã de Aço Assolan 10% Desconto 45g",
    "category": "limpeza",
    "unit": "45g",
    "image": "https://images.unsplash.com/photo-1585832770485-e68a5fcfad72?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 1.39,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 1.39,
      "extrabom": 1.59,
      "carone": 1.79,
      "bh": 1.49,
      "assai": 1.42
    },
    "featured": false,
    "discountTag": "App R$ 1,39 | Cartão R$ 1,29 | Varejo R$ 1,45"
  },
  {
    "id": "atc_50",
    "name": "Desinfetante Búfalo Várias Fragrâncias 2L",
    "category": "limpeza",
    "unit": "2L",
    "image": "https://images.unsplash.com/photo-1585832770485-e68a5fcfad72?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 4.49,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 4.49,
      "extrabom": 5.69,
      "carone": 6.29,
      "casagrande": 5.2,
      "atacado_vem": 4.79
    },
    "featured": false,
    "discountTag": "App R$ 4,49 | Cartão R$ 3,99 | Varejo R$ 4,99"
  },
  {
    "id": "atc_51",
    "name": "Esponja Multiuso Allklin Unidade",
    "category": "limpeza",
    "unit": "unidade",
    "image": "https://images.unsplash.com/photo-1585832770485-e68a5fcfad72?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 0.89,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 0.89,
      "extrabom": 1.39,
      "carone": 1.49,
      "bh": 0.99,
      "assai": 0.95
    },
    "featured": false,
    "discountTag": "App R$ 0,89 | Cartão R$ 0,79 | Varejo R$ 1,09"
  },
  {
    "id": "atc_52",
    "name": "Desodorante Aerossol Nivea Várias Fragrâncias 200ml",
    "category": "higiene",
    "unit": "200ml",
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 13.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 13.9,
      "extrabom": 15.5,
      "carone": 16.9,
      "casagrande": 14.9,
      "atacado_vem": 14.2
    },
    "featured": true,
    "discountTag": "App R$ 13,90 | Cartão R$ 12,50 | Varejo R$ 14,29"
  },
  {
    "id": "atc_53",
    "name": "Desodorante Roll-On Giovanna Baby Frasco 50ml",
    "category": "higiene",
    "unit": "50ml",
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 5.98,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 5.98,
      "extrabom": 7.9,
      "carone": 8.5,
      "bh": 6.49,
      "assai": 6.2
    },
    "featured": false,
    "discountTag": "App R$ 5,98 | Cartão R$ 5,38 | Varejo R$ 6,98"
  },
  {
    "id": "atc_54",
    "name": "Sabonete Farnese Vários Tipos 180g",
    "category": "higiene",
    "unit": "180g",
    "image": "https://images.unsplash.com/photo-1607006344380-b6775a0847a4?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 2.95,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 2.95,
      "extrabom": 3.35,
      "carone": 3.69,
      "casagrande": 3.19,
      "atacado_vem": 3.05
    },
    "featured": false,
    "discountTag": "App R$ 2,95 | Cartão R$ 2,65 | Varejo R$ 3,10"
  },
  {
    "id": "atc_55",
    "name": "Creme Dental Sorriso Tripla Limpeza Completa 70g",
    "category": "higiene",
    "unit": "70g",
    "image": "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 2.49,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 2.49,
      "extrabom": 2.98,
      "carone": 3.29,
      "bh": 2.69,
      "assai": 2.59
    },
    "featured": false,
    "discountTag": "App R$ 2,49 | Cartão R$ 2,29 | Varejo R$ 2,69"
  },
  {
    "id": "atc_56",
    "name": "Pneu Dunlop SP Touring 175/70 R13 Unidade",
    "category": "limpeza",
    "unit": "unidade",
    "image": "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 349.0,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 349.0,
      "extrabom": 370.0,
      "carone": 389.0,
      "casagrande": 365.0,
      "atacado_vem": 355.0
    },
    "featured": true,
    "discountTag": "App R$ 349,00 | Cartão R$ 309,00 | Varejo R$ 360,00"
  },
  {
    "id": "atc_57",
    "name": "Mop Giratório Allklin 12L Unidade",
    "category": "limpeza",
    "unit": "unidade",
    "image": "https://images.unsplash.com/photo-1585832770485-e68a5fcfad72?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 66.25,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 66.25,
      "extrabom": 90.0,
      "carone": 95.0,
      "bh": 75.0,
      "assai": 69.9
    },
    "featured": false,
    "discountTag": "App R$ 66,25 | Cartão R$ 59,85 | Varejo R$ 79,60"
  },
  {
    "id": "atc_58",
    "name": "Papel Sulfite Report A4 75g Pacote 500 Folhas",
    "category": "limpeza",
    "unit": "500 fls",
    "image": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 24.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 24.9,
      "extrabom": 27.9,
      "carone": 29.9,
      "casagrande": 26.9,
      "atacado_vem": 25.5
    },
    "featured": false,
    "discountTag": "App R$ 24,90 | Cartão R$ 22,40 | Varejo R$ 25,90"
  },
  {
    "id": "atc_59",
    "name": "Alimento para Cães Bast Dog Arroz e Carne 15kg",
    "category": "limpeza",
    "unit": "15kg",
    "image": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 59.0,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 59.0,
      "extrabom": 79.9,
      "carone": 82.9,
      "bh": 69.9,
      "assai": 62.9
    },
    "featured": true,
    "discountTag": "App R$ 59,00 | Cartão R$ 52,90 | Varejo R$ 72,90"
  },
  {
    "id": "atc_60",
    "name": "Alimento para Cães Dog Chow Vários Sabores 2,5kg",
    "category": "limpeza",
    "unit": "2.5kg",
    "image": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 43.54,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 43.54,
      "extrabom": 52.9,
      "carone": 55.9,
      "casagrande": 48.9,
      "atacado_vem": 45.9
    },
    "featured": false,
    "discountTag": "App R$ 43,54 | Cartão R$ 39,83 | Varejo R$ 47,60"
  },
  {
    "id": "atc_61",
    "name": "Alimento para Cães Dog Chow Vários Sabores 900g",
    "category": "limpeza",
    "unit": "900g",
    "image": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&auto=format&fit=crop&q=80",
    "encarteId": 4,
    "offerMarketId": "atacadao",
    "offerPrice": 14.9,
    "validity": "Válido 25/08 a 31/08/2026",
    "prices": {
      "atacadao": 14.9,
      "extrabom": 22.9,
      "carone": 23.9,
      "bh": 17.9,
      "assai": 15.9
    },
    "featured": false,
    "discountTag": "App R$ 14,90 | Cartão R$ 13,20 | Varejo R$ 17,90"
  },
  {
    "id": "car_1",
    "name": "Polpa de Tomate Davia 680g",
    "category": "mercearia",
    "unit": "680g",
    "image": "https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&auto=format&fit=crop&q=80",
    "encarteId": 8,
    "offerMarketId": "carone",
    "offerPrice": 11.98,
    "validity": "Válido 26/08 a 05/09/2026",
    "prices": {
      "carone": 11.98,
      "extrabom": 13.99,
      "atacadao": 12.5,
      "assai": 12.9
    },
    "featured": true,
    "discountTag": "Oferta Carone Viva a Itália | R$ 11,98"
  },
  {
    "id": "car_2",
    "name": "Molho Pesto Filippo Berio 190g",
    "category": "mercearia",
    "unit": "190g",
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&auto=format&fit=crop&q=80",
    "encarteId": 8,
    "offerMarketId": "carone",
    "offerPrice": 17.98,
    "validity": "Válido 26/08 a 05/09/2026",
    "prices": {
      "carone": 17.98,
      "extrabom": 21.9,
      "atacadao": 18.9,
      "bh": 19.5
    },
    "featured": true,
    "discountTag": "Oferta Carone Viva a Itália | R$ 17,98"
  },
  {
    "id": "car_3",
    "name": "Tomate Pelado Rosso Gargano Pomadore 400g",
    "category": "mercearia",
    "unit": "400g",
    "image": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80",
    "encarteId": 8,
    "offerMarketId": "carone",
    "offerPrice": 7.79,
    "validity": "Válido 26/08 a 05/09/2026",
    "prices": {
      "carone": 7.79,
      "extrabom": 9.99,
      "atacadao": 8.5,
      "casagrande": 8.9
    },
    "featured": true,
    "discountTag": "Oferta Carone Viva a Itália | R$ 7,79"
  },
  {
    "id": "car_4",
    "name": "Massas Antico Molino Molisano Cortes 500g",
    "category": "mercearia",
    "unit": "500g",
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281276?w=400&auto=format&fit=crop&q=80",
    "encarteId": 8,
    "offerMarketId": "carone",
    "offerPrice": 7.79,
    "validity": "Válido 26/08 a 05/09/2026",
    "prices": {
      "carone": 7.79,
      "extrabom": 9.5,
      "atacadao": 8.2,
      "bh": 8.9
    },
    "featured": true,
    "discountTag": "Oferta Carone Viva a Itália | R$ 7,79"
  },
  {
    "id": "car_5",
    "name": "Azeite Italiano Extra Virgem Capone 500ml",
    "category": "mercearia",
    "unit": "500ml",
    "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80",
    "encarteId": 9,
    "offerMarketId": "carone",
    "offerPrice": 29.98,
    "validity": "Válido 26/08 a 05/09/2026",
    "prices": {
      "carone": 29.98,
      "extrabom": 35.9,
      "atacadao": 31.9,
      "assai": 32.5
    },
    "featured": true,
    "discountTag": "Oferta Carone Viva a Itália | R$ 29,98"
  },
  {
    "id": "car_6",
    "name": "Vinho Tinto Italiano Santa Lara Toscana 750ml",
    "category": "bebidas",
    "unit": "750ml",
    "image": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&auto=format&fit=crop&q=80",
    "encarteId": 9,
    "offerMarketId": "carone",
    "offerPrice": 84.9,
    "validity": "Válido 26/08 a 05/09/2026",
    "prices": {
      "carone": 84.9,
      "extrabom": 99.0,
      "atacadao": 89.9,
      "casagrande": 94.0
    },
    "featured": true,
    "discountTag": "Oferta Carone Viva a Itália | R$ 84,90"
  },
  {
    "id": "car_7",
    "name": "Vinho Tinto Italiano Santa Lara Chianti 750ml",
    "category": "bebidas",
    "unit": "750ml",
    "image": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&auto=format&fit=crop&q=80",
    "encarteId": 9,
    "offerMarketId": "carone",
    "offerPrice": 72.9,
    "validity": "Válido 26/08 a 05/09/2026",
    "prices": {
      "carone": 72.9,
      "extrabom": 85.0,
      "atacadao": 75.9,
      "bh": 79.9
    },
    "featured": true,
    "discountTag": "Oferta Carone Viva a Itália | R$ 72,90"
  },
  {
    "id": "car_8",
    "name": "Vinho Tinto Italiano La Scala Segreta Primitivo Di Manduria 750ml",
    "category": "bebidas",
    "unit": "750ml",
    "image": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&auto=format&fit=crop&q=80",
    "encarteId": 9,
    "offerMarketId": "carone",
    "offerPrice": 129.0,
    "validity": "Válido 26/08 a 05/09/2026",
    "prices": {
      "carone": 129.0,
      "extrabom": 149.0,
      "atacadao": 135.0,
      "assai": 139.0
    },
    "featured": true,
    "discountTag": "Oferta Carone Viva a Itália | R$ 129,00"
  }
];
