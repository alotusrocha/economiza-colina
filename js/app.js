// Lógica Principal de Renderização, Filtros, Pesquisa e Modais

let currentCategory = 'all';
let currentMarket = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  renderSupermarketChips();
  renderCategories();
  renderProducts();
  renderEncartesGallery();
  renderCommunityTips();
  setupEventListeners();
});

// Renderização dos Chips de Supermercado no Hero
function renderSupermarketChips() {
  const container = document.getElementById('marketChipsContainer');
  if (!container) return;

  let html = `
    <button class="chip-market ${currentMarket === 'all' ? 'active' : ''}" onclick="filterByMarket('all')">
      Todos os Mercados
    </button>
  `;

  SUPERMARKETS.forEach(m => {
    html += `
      <button class="chip-market ${currentMarket === m.id ? 'active' : ''}" onclick="filterByMarket('${m.id}')">
        ${m.name} <span class="chip-badge">${m.badge}</span>
      </button>
    `;
  });

  container.innerHTML = html;
}

// Renderização dos Botões de Categoria
function renderCategories() {
  const container = document.getElementById('categoriesBar');
  if (!container) return;

  let html = '';
  CATEGORIES.forEach(c => {
    html += `
      <button class="category-btn ${currentCategory === c.id ? 'active' : ''}" onclick="filterByCategory('${c.id}')">
        <span>${c.icon}</span> ${c.name}
      </button>
    `;
  });

  container.innerHTML = html;
}

// Renderização da Grid de Produtos e Comparador de Preços
function renderProducts() {
  const container = document.getElementById('productsGrid');
  const countEl = document.getElementById('productCount');
  if (!container) return;

  let filtered = PRODUCTS.filter(product => {
    const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
    const matchesMarket = currentMarket === 'all' || product.prices[currentMarket] !== undefined;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesMarket && matchesSearch;
  });

  if (countEl) {
    countEl.textContent = `${filtered.length} ofertas encontradas`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: white; border-radius: 16px;">
        <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
        <h3 style="font-size: 1.2rem; color: #0f172a; margin-bottom: 6px;">Nenhum produto encontrado</h3>
        <p style="color: #64748b; font-size: 0.9rem;">Tente pesquisar com outro termo ou limpar os filtros de categoria e supermercado.</p>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(product => {
    // Cálculo do menor preço e preço médio
    const priceEntries = Object.entries(product.prices);
    const sortedPrices = priceEntries.sort((a, b) => a[1] - b[1]);
    const [lowestMarketId, lowestPrice] = sortedPrices[0];

    const lowestMarket = SUPERMARKETS.find(m => m.id === lowestMarketId) || { name: 'Supermercado' };
    const avgPrice = priceEntries.reduce((sum, [, val]) => sum + val, 0) / priceEntries.length;
    const savingsPercent = Math.round(((avgPrice - lowestPrice) / avgPrice) * 100);

    html += `
      <div class="product-card">
        <div class="card-top-badges">
          <span class="tag-discount">${product.discountTag || `-${savingsPercent}% Econ.`}</span>
          <span class="tag-encarte" onclick="openEncarteModal(${product.encarteId})">
            📄 Encarte Pág. ${product.encarteId}
          </span>
        </div>

        <div class="product-img-box">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>

        <div class="product-details">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <div style="font-size: 0.75rem; font-weight: 700; color: #059669; background: #d1fae5; padding: 2px 8px; border-radius: 12px; display: flex; align-items: center; gap: 4px;">
              🕒 ${product.validity}
            </div>
          </div>
          <h3 class="product-name" title="${product.name}">${product.name}</h3>

          <div class="best-offer-box">
            <div class="best-offer-header">
              <span class="market-name-tag">
                🏆 ${lowestMarket.name}
              </span>
              <span class="unit-tag">por ${product.unit}</span>
            </div>
            <div class="best-price-value">R$ ${lowestPrice.toFixed(2)}</div>
          </div>

          <!-- Tabela de Comparação Concorrentes ou Referência Única -->
          <div class="price-comparison-box">
            <div class="comp-header">
              <span>${sortedPrices.length > 1 ? 'Supermercados Comparados' : 'Referência Catalogada no Bairro'}</span>
              <span>Preço (${product.unit})</span>
            </div>
    `;

    if (sortedPrices.length > 1) {
      // Exibir até 4 principais concorrentes
      sortedPrices.slice(0, 4).forEach(([mId, price]) => {
        const mInfo = SUPERMARKETS.find(m => m.id === mId);
        const isLowest = mId === lowestMarketId;
        const isReported = product.communityReported && product.communityReported.marketName === (mInfo ? mInfo.name : '');

        html += `
          <div class="comp-row">
            <span class="comp-market">
              ${mInfo ? mInfo.name.split(' ')[0] : mId}
              ${isReported ? '<span style="font-size: 0.65rem; background: #fbbf24; color: black; padding: 1px 4px; border-radius: 4px; font-weight: 800;">📸 Vizinho</span>' : ''}
            </span>
            <span class="comp-price ${isLowest ? 'lowest' : ''}">R$ ${price.toFixed(2)}</span>
          </div>
        `;
      });

      html += `
        <div class="average-price-bar">
          <span>Preço Médio da Região:</span>
          <span class="avg-val">R$ ${avgPrice.toFixed(2)}</span>
        </div>
      `;
    } else {
      // Produto com APENAS UM supermercado como referência
      html += `
        <div class="comp-row" style="background: #fef3c7; border-radius: 6px; padding: 6px 8px; margin: 4px 0;">
          <span class="comp-market" style="color: #92400e; font-weight: 700;">⭐ Oferta Única: ${lowestMarket.name.split(' ')[0]}</span>
          <span class="comp-price lowest" style="font-size: 1rem;">R$ ${lowestPrice.toFixed(2)}</span>
        </div>
        <div style="margin-top: 8px; font-size: 0.74rem; color: #78350f; background: #fffbeb; padding: 8px; border-radius: 6px; border: 1px dashed #f59e0b; text-align: center;">
          📢 <strong>Única loja com este item anunciado hoje.</strong> Viu em outro mercado? Clique em <strong>"+ Publicar Oferta"</strong>!
        </div>
      `;
    }

    html += `
          </div>

          <button class="btn-add-cart" onclick="cart.addItem('${product.id}')">
            🛒 Adicionar à Cesta
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Visualizador da Galeria de Encartes
function renderEncartesGallery() {
  const container = document.getElementById('encartesGrid');
  if (!container) return;

  let html = '';
  ENCARTES.forEach(encarte => {
    const market = SUPERMARKETS.find(m => m.id === encarte.market) || { name: 'Supermercado' };
    html += `
      <div class="encarte-card" onclick="openEncarteModal(${encarte.id})">
        <div class="encarte-thumb">
          <img src="${encarte.file}" alt="${encarte.title}">
        </div>
        <div class="encarte-info">
          <div class="encarte-market">${market.name}</div>
          <div class="encarte-title">${encarte.title}</div>
          <div class="encarte-validity">🕒 ${encarte.validity}</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Dicas da Comunidade
function renderCommunityTips() {
  const container = document.getElementById('communityTipsContainer');
  if (!container) return;

  let html = '';
  COMMUNITY_TIPS.forEach(tip => {
    html += `
      <div class="tip-card">
        <span class="tip-author">💬 ${tip.author}:</span>
        <span>"${tip.text}"</span>
        <span class="tip-time">${tip.time}</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Filtros
function filterByCategory(catId) {
  currentCategory = catId;
  renderCategories();
  renderProducts();
}

function filterByMarket(marketId) {
  currentMarket = marketId;
  renderSupermarketChips();
  renderProducts();
}

function getCategoryName(catId) {
  const c = CATEGORIES.find(cat => cat.id === catId);
  return c ? c.name : catId;
}

// Event Listeners
function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }
}

// Modais
function openCartModal() {
  const modal = document.getElementById('cartModal');
  if (modal) {
    cart.renderCartModal();
    modal.classList.add('active');
  }
}

function closeCartModal() {
  const modal = document.getElementById('cartModal');
  if (modal) modal.classList.remove('active');
}

function openEncarteModal(encarteId) {
  const encarte = ENCARTES.find(e => e.id === encarteId) || ENCARTES[0];
  const market = SUPERMARKETS.find(m => m.id === encarte.market) || { name: 'Supermercado' };

  const modal = document.getElementById('encarteViewerModal');
  const body = document.getElementById('encarteViewerBody');

  if (modal && body) {
    body.innerHTML = `
      <div style="margin-bottom: 12px; color: white;">
        <h3 style="font-size: 1.2rem; font-weight: 800;">${encarte.title}</h3>
        <p style="color: #94a3b8; font-size: 0.85rem;">Encarte Oficial: ${market.name} • ${encarte.validity}</p>
      </div>
      <img src="${encarte.file}" class="encarte-img-full" alt="${encarte.title}">
    `;
    modal.classList.add('active');
  }
}

function closeEncarteModal() {
  const modal = document.getElementById('encarteViewerModal');
  if (modal) modal.classList.remove('active');
}

function openTipModal() {
  const modal = document.getElementById('tipModal');
  if (modal) modal.classList.add('active');
}

function closeTipModal() {
  const modal = document.getElementById('tipModal');
  if (modal) modal.classList.remove('active');
}

function submitCommunityTip(e) {
  e.preventDefault();
  const author = document.getElementById('tipAuthor').value || 'Morador de Colina';
  const market = document.getElementById('tipMarket').value || 'Supermercado';
  const text = document.getElementById('tipText').value;

  if (!text) return;

  // 1. Adicionar dica à lista comunitária
  COMMUNITY_TIPS.unshift({
    author: `${author} (Colina)`,
    market,
    text,
    time: 'Agora mesmo'
  });

  // 2. Tentar vincular automaticamente o achado do vizinho ao produto no catálogo!
  let priceMatch = text.match(/R\$\s*(\d+[.,]\d{2})/i) || text.match(/(\d+[.,]\d{2})/);
  if (priceMatch) {
    let reportedPrice = parseFloat(priceMatch[1].replace(',', '.'));
    let lowerText = text.toLowerCase();

    // Mapeamento de mercado por id
    const marketObj = SUPERMARKETS.find(m => m.name.toLowerCase().includes(market.toLowerCase()) || market.toLowerCase().includes(m.id)) || SUPERMARKETS[0];

    // Encontrar produto correspondente pelo nome
    const matchedProduct = PRODUCTS.find(p => lowerText.split(' ').some(word => word.length > 3 && p.name.toLowerCase().includes(word)));

    if (matchedProduct && reportedPrice > 0) {
      // Atualizar preço do concorrente e adicionar selo comunitário
      matchedProduct.prices[marketObj.id] = reportedPrice;
      matchedProduct.communityReported = {
        author,
        marketName: marketObj.name,
        price: reportedPrice
      };
      cart.showToast(`Preço do ${matchedProduct.name} atualizado no ${marketObj.name} para R$ ${reportedPrice.toFixed(2)} por vizinho!`);
    } else {
      cart.showToast('Sua dica foi publicada com sucesso para a comunidade do bairro!');
    }
  } else {
    cart.showToast('Sua dica foi publicada com sucesso para o bairro!');
  }

  renderCommunityTips();
  renderProducts();
  closeTipModal();
  document.getElementById('tipForm').reset();
}
