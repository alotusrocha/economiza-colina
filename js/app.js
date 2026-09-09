// Lógica Principal de Renderização, Filtros, Pesquisa e Modais

let currentCategory = 'all';
let currentMarket = 'all';
let currentSource = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  updateHeaderDate();
  applyStoredCustomPrices();
  renderSupermarketChips();
  renderCategories();
  renderProducts();
  renderEncartesGallery();
  renderCommunityTips();
  setupEventListeners();
  trackPWAMode();
});

// Detecção e Rastreamento de PWA Instalado no Android / iOS (GA4)
function trackPWAMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (isStandalone) {
    trackEvent('pwa_launch', {
      event_category: 'PWA',
      event_label: 'Standalone App Mode',
      platform: 'Android/Mobile'
    });
  }
}

// Atualização Dinâmica da Data no Topo
function updateHeaderDate() {
  const el = document.getElementById('topBarUpdateDate');
  if (el) {
    const now = new Date();
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const currentMonth = months[now.getMonth()];
    const currentYear = now.getFullYear();
    el.textContent = `Serra / ES • Atualizado em ${currentMonth}/${currentYear}`;
  }
}

// Helper de Rastreamento de Eventos (Google Analytics GA4)
function trackEvent(eventName, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

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

// Filtro por Fonte da Informação (Folheto Promo vs Scraper/API)
function filterBySource(sourceType) {
  currentSource = sourceType;
  ['all', 'encarte', 'scraper'].forEach(s => {
    const btn = document.getElementById(`source-filter-${s}`);
    if (btn) {
      if (s === sourceType) {
        btn.classList.add('active');
        btn.style.background = 'rgba(255, 255, 255, 0.2)';
        btn.style.color = 'white';
        btn.style.borderColor = 'rgba(255, 255, 255, 0.4)';
      } else {
        btn.classList.remove('active');
        btn.style.background = 'rgba(255, 255, 255, 0.08)';
        btn.style.color = '#cbd5e1';
        btn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      }
    }
  });
  renderProducts();
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

const STOP_WORDS = new Set(['de', 'da', 'do', 'das', 'dos', 'com', 'em', 'para', 'por', 'e', 'a', 'o', 'um', 'uma', 'kg', 'g', 'ml', 'l', 'un', 'unid', 'unidade']);

function normalizeString(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function getMarketShortName(mInfo) {
  if (!mInfo) return 'Supermercado';
  if (mInfo.shortName) return mInfo.shortName;
  const name = mInfo.name;
  if (name.toLowerCase().includes('carone')) return 'Carone';
  if (name.toLowerCase().includes('extrabom')) return 'Extrabom';
  if (name.toLowerCase().includes('casagrande')) return 'Casagrande';
  if (name.toLowerCase().includes('bh')) return 'BH';
  if (name.toLowerCase().includes('assai') || name.toLowerCase().includes('assaí')) return 'Assaí';
  if (name.toLowerCase().includes('atacadao') || name.toLowerCase().includes('atacadão')) return 'Atacadão';
  if (name.toLowerCase().includes('atacado vem')) return 'Atacado Vem';
  return name.replace(/^Supermercados?\s+/i, '').replace(/\s+Supermercados?$/i, '').split(' ')[0];
}

function onSearchInput(val) {
  searchQuery = val || '';
  renderProducts();
}

// Renderização da Grid de Produtos e Comparador de Preços
function renderProducts() {
  const container = document.getElementById('productsGrid');
  const countEl = document.getElementById('productCount');
  if (!container) return;

  const normQuery = normalizeString(searchQuery);
  const rawTokens = normQuery.split(/\s+/).filter(t => t.length > 0);
  const mainTokens = rawTokens.filter(t => !STOP_WORDS.has(t));
  const queryTokens = mainTokens.length > 0 ? mainTokens : rawTokens;

  let filtered = PRODUCTS.filter(product => {
    const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
    const matchesMarket = currentMarket === 'all' || product.prices[currentMarket] !== undefined;
    const matchesSource = currentSource === 'all' || (product.sourceType || 'encarte') === currentSource;

    let matchesSearch = true;
    if (queryTokens.length > 0) {
      const normName = normalizeString(product.name);
      const normCategory = normalizeString(getCategoryName(product.category));
      matchesSearch = queryTokens.every(token => normName.includes(token) || normCategory.includes(token));
    }

    return matchesCategory && matchesMarket && matchesSource && matchesSearch;
  });

  if (countEl) {
    if (searchQuery.trim()) {
      countEl.textContent = `${filtered.length} ofertas encontradas para "${searchQuery.trim()}"`;
    } else {
      countEl.textContent = `${filtered.length} ofertas encontradas`;
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
        <h3 style="font-size: 1.2rem; color: #0f172a; margin-bottom: 6px;">Nenhum produto encontrado${searchQuery.trim() ? ` para "${searchQuery.trim()}"` : ''}</h3>
        <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 16px;">Tente pesquisar com outro termo ou limpar os filtros de categoria e supermercado.</p>
        <button onclick="clearSearchFilters()" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 700; cursor: pointer;">
          🔄 Limpar Busca e Mostrar Todas as Ofertas
        </button>
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

    const iconConfig = getProductIconConfig(product);
    const sourceType = product.sourceType || (product.encarteId ? 'encarte' : 'scraper');
    const sourceBadgeHTML = sourceType === 'encarte'
      ? `<span class="tag-encarte" onclick="openEncarteModal(${product.encarteId || 1})" style="background: #fef3c7; color: #92400e; border: 1px solid #f59e0b; cursor: pointer;" title="Preço Oficial do Folheto Promocional">📄 Folheto Promo</span>`
      : `<span class="tag-encarte" style="background: #e0f2fe; color: #0369a1; border: 1px solid #38bdf8;" title="Preço do Site Oficial / API Scraper">🌐 API / Site</span>`;

    const discountBadgeText = savingsPercent > 0 ? `🔥 -${savingsPercent}% Econ.` : `🏆 Oferta do Bairro`;

    html += `
      <div class="product-card">
        <div class="card-top-badges">
          <span class="tag-discount">${discountBadgeText}</span>
          ${sourceBadgeHTML}
        </div>

        <div class="product-icon-box" style="background: ${iconConfig.bg}; border-color: ${iconConfig.border};">
          <span class="product-icon-symbol">${iconConfig.icon}</span>
          <span class="product-icon-label" style="color: ${iconConfig.textColor};">${iconConfig.label}</span>
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
      // Exibir todos os supermercados comparados para este produto
      let displayPrices = sortedPrices;

      // Se o usuário filtrou por um mercado específico (ex: Carone), garante destaque e primeira posição
      if (currentMarket !== 'all') {
        const selectedEntry = sortedPrices.find(([mId]) => mId === currentMarket);
        const otherEntries = sortedPrices.filter(([mId]) => mId !== currentMarket);
        if (selectedEntry) {
          displayPrices = [selectedEntry, ...otherEntries];
        }
      }

      displayPrices.forEach(([mId, price]) => {
        const mInfo = SUPERMARKETS.find(m => m.id === mId);
        const isLowest = mId === lowestMarketId;
        const isSelected = mId === currentMarket;
        const isReported = product.communityReported && product.communityReported.marketName === (mInfo ? mInfo.name : '');

        html += `
          <div class="comp-row ${isSelected ? 'selected-market-row' : ''}" style="${isSelected ? 'background: rgba(0, 119, 182, 0.1); border-left: 3px solid #0077b6; padding-left: 6px;' : ''}">
            <span class="comp-market">
              ${mInfo ? getMarketShortName(mInfo) : mId}
              ${isLowest ? '<span style="font-size: 0.65rem; background: #10b981; color: white; padding: 1px 5px; border-radius: 4px; font-weight: 800; margin-left: 4px;">Menor Preço</span>' : ''}
              ${isReported ? '<span style="font-size: 0.65rem; background: #fbbf24; color: black; padding: 1px 4px; border-radius: 4px; font-weight: 800; margin-left: 4px;">📸 Vizinho</span>' : ''}
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

    // Votação & Contador de Visualizações da Comunidade
    const votes = getProductVotes(product.id);
    const views = getProductViews(product.id);
    const userVoteToday = hasUserVotedToday(product.id);
    let voteButtonsHTML = '';

    if (userVoteToday === 'up') {
      voteButtonsHTML = `
        <button id="btn-vote-up-${product.id}" onclick="toggleConfirmProductPrice('${product.id}')" title="✓ Clique para desfazer sua confirmação de preço" style="flex: 1; background: #10b981; border: 1px solid #10b981; color: #ffffff; padding: 5px 8px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 0.76rem; transition: all 0.2s;">
          ✓ Confirmado <span id="vote-up-count-${product.id}">(${votes.up})</span>
        </button>
        <button id="btn-vote-down-${product.id}" onclick="openPriceReportModal('${product.id}')" title="Trocar para informar preço diferente" style="flex: 1; background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 5px 8px; border-radius: 8px; font-weight: 700; cursor: pointer; opacity: 0.75; display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 0.76rem;">
          👎 Diferente <span id="vote-down-count-${product.id}">(${votes.down})</span>
        </button>
      `;
    } else if (userVoteToday === 'down') {
      voteButtonsHTML = `
        <button id="btn-vote-up-${product.id}" onclick="toggleConfirmProductPrice('${product.id}')" title="Trocar para confirmar preço" style="flex: 1; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; padding: 5px 8px; border-radius: 8px; font-weight: 700; cursor: pointer; opacity: 0.75; display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 0.76rem;">
          👍 Sim <span id="vote-up-count-${product.id}">(${votes.up})</span>
        </button>
        <button id="btn-vote-down-${product.id}" onclick="openPriceReportModal('${product.id}')" title="✓ Você informou uma alteração de preço para esta oferta hoje" style="flex: 1; background: #ef4444; border: 1px solid #ef4444; color: #ffffff; padding: 5px 8px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 0.76rem;">
          ✓ Informado <span id="vote-down-count-${product.id}">(${votes.down})</span>
        </button>
      `;
    } else {
      voteButtonsHTML = `
        <button id="btn-vote-up-${product.id}" onclick="toggleConfirmProductPrice('${product.id}')" title="Confirmar que o preço está correto" style="flex: 1; background: #ecfdf5; border: 1px solid #10b981; color: #047857; padding: 5px 8px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; transition: all 0.2s; font-size: 0.76rem;">
          👍 Sim <span id="vote-up-count-${product.id}">(${votes.up})</span>
        </button>
        <button id="btn-vote-down-${product.id}" onclick="openPriceReportModal('${product.id}')" title="Informar valor real ou preço diferente que encontrou no mercado" style="flex: 1; background: #fef2f2; border: 1px solid #ef4444; color: #b91c1c; padding: 5px 8px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; transition: all 0.2s; font-size: 0.76rem;">
          👎 Diferente <span id="vote-down-count-${product.id}">(${votes.down})</span>
        </button>
      `;
    }

    html += `
          </div>

          <!-- Barra de Confirmação e Visualização dos Moradores -->
          <div class="community-vote-box">
            <div class="vote-box-header">
              <div class="vote-views-count" title="Visualizações hoje">
                <span>👁️ <strong id="view-count-${product.id}">${views}</strong> moradores viram hoje</span>
              </div>
              <span class="vote-box-question">Preço correto?</span>
            </div>
            <div class="vote-buttons-row">
              ${voteButtonsHTML}
            </div>
          </div>

          <button class="btn-add-cart" onclick="recordProductView('${product.id}'); cart.addItem('${product.id}');">
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

// Dicas da Comunidade (Apenas Envios Reais dos Moradores)
function getRealCommunityTips() {
  try {
    const stored = localStorage.getItem('economiza_colina_real_tips');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

function renderCommunityTips() {
  const container = document.getElementById('communityTipsContainer');
  if (!container) return;

  const realTips = getRealCommunityTips();

  if (realTips.length === 0) {
    container.innerHTML = `
      <div class="tip-card" style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid #10b981; color: #047857; border-radius: 20px; padding: 6px 14px; font-size: 0.82rem;">
        <span class="tip-author">📢 Dica de Vizinho:</span>
        <span>Nenhuma dica enviada hoje pelos moradores. Viu algo no mercado? Clique em <strong>"+ Publicar Oferta que Vi"</strong>!</span>
      </div>
    `;
    return;
  }

  let html = '';
  realTips.forEach(tip => {
    const photoThumb = tip.photoUrl
      ? `<img src="${tip.photoUrl}" alt="Foto da oferta" style="height: 36px; width: 36px; object-fit: cover; border-radius: 6px; border: 1.5px solid #10b981; margin-right: 6px; flex-shrink: 0;">`
      : '';
    html += `
      <div class="tip-card" style="display: flex; align-items: center; gap: 8px;">
        ${photoThumb}
        <div>
          <span class="tip-author">💬 ${tip.author}:</span>
          <span>"${tip.text}"</span>
          <span class="tip-time">${tip.time}</span>
        </div>
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

function executeSearch(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchQuery = searchInput.value || '';
    if (searchQuery.trim()) {
      currentCategory = 'all';
      renderCategories();
    }
    renderProducts();
    scrollToProducts();
  }
  return false;
}

function scrollToProducts() {
  const section = document.getElementById('productsGrid');
  if (section) {
    const yOffset = -100;
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function clearSearchFilters() {
  searchQuery = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  currentCategory = 'all';
  currentMarket = 'all';
  renderSupermarketChips();
  renderCategories();
  renderProducts();
}

// Event Listeners
function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const btnSearchSubmit = document.getElementById('btnSearchSubmit');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeSearch();
      }
    });
  }

  if (btnSearchSubmit) {
    btnSearchSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      executeSearch();
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

let currentTipPhotoDataUrl = null;
let currentReportPhotoDataUrl = null;

function handleTipPhotoSelect(e, sourceType) {
  const file = e.target.files && e.target.files[0];
  const container = document.getElementById('photoPreviewContainer');
  const img = document.getElementById('photoPreviewImg');
  const badge = document.getElementById('photoPreviewBadge');

  if (file && container && img) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      currentTipPhotoDataUrl = evt.target.result;
      img.src = currentTipPhotoDataUrl;
      container.style.display = 'block';
      if (badge) {
        badge.textContent = sourceType === 'camera'
          ? '📸 Foto da Câmera capturada com sucesso!'
          : '📁 Foto da Galeria selecionada com sucesso!';
      }
    };
    reader.onerror = function() {
      if (window.cart && window.cart.showToast) {
        window.cart.showToast('❌ Erro ao ler a imagem. Tente outra foto.');
      }
    };
    reader.readAsDataURL(file);
  }
}

function clearTipPhoto() {
  currentTipPhotoDataUrl = null;
  const container = document.getElementById('photoPreviewContainer');
  const img = document.getElementById('photoPreviewImg');
  const fileInput = document.getElementById('tipPhotoFile');
  const cameraInput = document.getElementById('tipPhotoCamera');

  if (fileInput) fileInput.value = '';
  if (cameraInput) cameraInput.value = '';
  if (img) img.src = '';
  if (container) container.style.display = 'none';
}

function previewTipPhoto(e) {
  handleTipPhotoSelect(e, 'gallery');
}

function submitCommunityTip(e) {
  e.preventDefault();
  const authorInput = document.getElementById('tipAuthor');
  const marketSelect = document.getElementById('tipMarket');
  const priceInput = document.getElementById('tipPrice');
  const textInput = document.getElementById('tipText');

  const author = (authorInput && authorInput.value.trim()) || 'Morador de Colina';
  const marketId = (marketSelect && marketSelect.value) || 'carone';
  const marketObj = SUPERMARKETS.find(m => m.id === marketId) || SUPERMARKETS[0];
  const marketName = marketObj.name;
  const text = (textInput && textInput.value.trim()) || '';
  const priceVal = priceInput ? parseFloat(priceInput.value) : 0;
  const hasPhoto = !!currentTipPhotoDataUrl;

  if (!text && !hasPhoto && (!priceVal || priceVal <= 0)) {
    if (window.cart && window.cart.showToast) {
      window.cart.showToast('⚠️ Por favor, informe o nome do produto ou envie uma foto!');
    }
    return;
  }

  // Tentar extrair preço do campo de entrada OU do texto da oferta
  let reportedPrice = priceVal;
  if (!reportedPrice || isNaN(reportedPrice) || reportedPrice <= 0) {
    let priceMatch = text.match(/R\$\s*(\d+[.,]\d{2})/i) || text.match(/(\d+[.,]\d{2})/);
    if (priceMatch) {
      reportedPrice = parseFloat(priceMatch[1].replace(',', '.'));
    }
  }

  const priceText = reportedPrice > 0 ? ` - R$ ${reportedPrice.toFixed(2)}` : '';
  const displayText = hasPhoto
    ? `📸 [Foto Anexada] ${text ? text : 'Preço fotografado'}${priceText}`
    : `${text}${priceText}`;

  // 1. Salvar dica real de comunidade na barra "Dica de Vizinho"
  const newTip = {
    author: `${author} (${marketName.split(' ')[0]})`,
    market: marketName,
    text: displayText,
    photoUrl: currentTipPhotoDataUrl || null,
    time: 'Agora mesmo'
  };

  const realTips = getRealCommunityTips();
  realTips.unshift(newTip);
  localStorage.setItem('economiza_colina_real_tips', JSON.stringify(realTips));

  // 2. Se houver um produto existente no catálogo, atualiza o preço no mercado correspondente!
  let lowerText = text.toLowerCase();
  let matchedProduct = PRODUCTS.find(p => {
    return lowerText.length > 2 && lowerText.split(' ').some(word => word.length > 3 && p.name.toLowerCase().includes(word));
  });

  if (matchedProduct && reportedPrice > 0) {
    matchedProduct.prices[marketObj.id] = reportedPrice;
    matchedProduct.communityReported = { author, marketName: marketName, realPrice: reportedPrice, date: 'Hoje' };
    if (currentTipPhotoDataUrl) {
      matchedProduct.image = currentTipPhotoDataUrl;
    }

    // Salvar no localStorage de preços comunitários customizados
    const customPrices = JSON.parse(localStorage.getItem('economiza_colina_custom_prices')) || {};
    customPrices[matchedProduct.id] = { marketId: marketObj.id, realPrice: reportedPrice, marketName, image: currentTipPhotoDataUrl || null };
    localStorage.setItem('economiza_colina_custom_prices', JSON.stringify(customPrices));

    if (window.cart && window.cart.showToast) {
      window.cart.showToast(`🎉 Foto enviada! Preço do ${matchedProduct.name} atualizado no ${marketName}!`);
    }
  } else if ((text || hasPhoto) && reportedPrice > 0) {
    // 3. Se for um produto NOVO que não existe no catálogo estático, CRIA O CARD DO PRODUTO DINAMICAMENTE!
    const newProductId = 'user_prod_' + Date.now();
    const newProductCard = {
      id: newProductId,
      name: text || 'Oferta Fotografada',
      category: 'mercearia',
      unit: 'un',
      image: currentTipPhotoDataUrl || 'assets/limpeza.png',
      encarteId: 1,
      offerMarketId: marketObj.id,
      offerPrice: reportedPrice,
      validity: 'Publicado por Morador Hoje',
      prices: {
        [marketObj.id]: reportedPrice
      },
      featured: true,
      discountTag: `📸 Oferta do Vizinho (${author})`,
      sourceType: 'community',
      communityReported: { author, marketName, realPrice: reportedPrice, date: 'Hoje' }
    };

    // Adiciona ao topo dos produtos
    PRODUCTS.unshift(newProductCard);

    // Salva produtos criados pelos moradores no localStorage
    const customUserProducts = JSON.parse(localStorage.getItem('economiza_colina_user_created_products')) || [];
    customUserProducts.unshift(newProductCard);
    localStorage.setItem('economiza_colina_user_created_products', JSON.stringify(customUserProducts));

    if (window.cart && window.cart.showToast) {
      window.cart.showToast(`🎉 Nova oferta "${newProductCard.name}" (R$ ${reportedPrice.toFixed(2)}) publicada com sucesso no ${marketName}!`);
    }
  } else {
    if (window.cart && window.cart.showToast) {
      window.cart.showToast('📸 Foto/Oferta publicada com sucesso no mural do bairro!');
    }
  }

  // Ocultar pré-visualização e fechar modal
  clearTipPhoto();

  renderCommunityTips();
  renderProducts();
  closeTipModal();

  const tipForm = document.getElementById('tipForm');
  if (tipForm) tipForm.reset();
}

// Mapeamento Inteligente de Ícones Padronizados por Categoria / Tipo de Item
function getProductIconConfig(product) {
  const name = product.name.toLowerCase();
  const cat = product.category;

  // 1. Azeites & Óleos
  if (name.includes('azeite')) {
    return { icon: '🫒', label: 'Azeite & Oliva', bg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '#a7f3d0', textColor: '#065f46' };
  }
  if (name.includes('óleo') || name.includes('oleo')) {
    return { icon: '🌻', label: 'Óleo de Cozinha', bg: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)', border: '#fde047', textColor: '#854d0e' };
  }

  // 2. Carnes & Aves
  if (name.includes('frango') || name.includes('sassami') || name.includes('coxa') || name.includes('aves') || name.includes('costelinha de fgo') || name.includes('coxinha asa')) {
    return { icon: '🍗', label: 'Aves & Frango', bg: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)', border: '#fdba74', textColor: '#9a3412' };
  }
  if (cat === 'acougue' || name.includes('contrafilé') || name.includes('picanha') || name.includes('mignon') || name.includes('lagarto') || name.includes('bacon') || name.includes('salsicha') || name.includes('linguiça') || name.includes('hambúrguer') || name.includes('suína')) {
    return { icon: '🥩', label: 'Carne Bovina/Suína', bg: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', border: '#fca5a5', textColor: '#991b1b' };
  }

  // 3. Hortifrúti
  if (name.includes('banana') || name.includes('mamão') || name.includes('fruta')) {
    return { icon: '🍎', label: 'Frutas Frescas', bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '#fcd34d', textColor: '#78350f' };
  }
  if (cat === 'hortifruti' || name.includes('tomate') || name.includes('batata') || name.includes('cebola') || name.includes('verdura')) {
    return { icon: '🥦', label: 'Verduras & Legumes', bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', border: '#86efac', textColor: '#166534' };
  }

  // 4. Bebidas
  if (name.includes('cerveja') || name.includes('chopp') || name.includes('lager') || name.includes('spaten') || name.includes('amstel') || name.includes('heineken') || name.includes('antarctica')) {
    return { icon: '🍺', label: 'Cerveja & Chopp', bg: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)', border: '#fde047', textColor: '#854d0e' };
  }
  if (name.includes('vinho')) {
    return { icon: '🍷', label: 'Vinhos & Especialidades', bg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', border: '#f472b6', textColor: '#831843' };
  }
  if (name.includes('whisky') || name.includes('uisque') || name.includes('gin') || name.includes('vodka') || name.includes('chivas') || name.includes('beefeater') || name.includes('ballantine') || name.includes('jameson') || name.includes('glenlivet')) {
    return { icon: '🥃', label: 'Wísquis & Destilados', bg: 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)', border: '#f59e0b', textColor: '#78350f' };
  }
  if (cat === 'bebidas' || name.includes('refrigerante') || name.includes('suco') || name.includes('néctar') || name.includes('energético') || name.includes('água') || name.includes('guaraná') || name.includes('dafruta')) {
    return { icon: '🥤', label: 'Bebidas & Sucos', bg: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', border: '#7dd3fc', textColor: '#075985' };
  }

  // 5. Grãos, Massas & Matinais
  if (name.includes('massa') || name.includes('macarrão') || name.includes('espaguete')) {
    return { icon: '🍝', label: 'Massas & Pastas', bg: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)', border: '#fdba74', textColor: '#9a3412' };
  }
  if (name.includes('arroz') || name.includes('feijão') || name.includes('farinha') || name.includes('açúcar')) {
    return { icon: '🌾', label: 'Grãos & Cereais', bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '#fcd34d', textColor: '#78350f' };
  }
  if (name.includes('café') || name.includes('toddy') || name.includes('nescau')) {
    return { icon: '☕', label: 'Café & Matinais', bg: 'linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)', border: '#d6d3d1', textColor: '#44403c' };
  }
  if (name.includes('maionese') || name.includes('molho') || name.includes('pesto') || name.includes('polpa') || name.includes('requeijão') || name.includes('milho') || name.includes('azeitona')) {
    return { icon: '🥫', label: 'Molhos & Condimentos', bg: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)', border: '#fde047', textColor: '#713f12' };
  }

  // 6. Laticínios
  if (cat === 'laticinios' || name.includes('leite') || name.includes('queijo') || name.includes('margarina') || name.includes('manteiga') || name.includes('iogurte') || name.includes('lasanha') || name.includes('whey')) {
    return { icon: '🧀', label: 'Laticínios & Frios', bg: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)', border: '#fde047', textColor: '#854d0e' };
  }

  // 7. Doces
  if (name.includes('chocolate') || name.includes('bombom') || name.includes('bis') || name.includes('biscoito') || name.includes('doce') || name.includes('rosquinha') || name.includes('wafer')) {
    return { icon: '🍫', label: 'Doces & Chocolates', bg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', border: '#f472b6', textColor: '#831843' };
  }

  // 8. Limpeza
  if (cat === 'limpeza' || name.includes('sabão') || name.includes('amaciante') || name.includes('detergente') || name.includes('omo') || name.includes('tixan') || name.includes('downy') || name.includes('ariel') || name.includes('comfort') || name.includes('ápyce') || name.includes('surf') || name.includes('limpador') || name.includes('esponja') || name.includes('razzo')) {
    return { icon: '🧹', label: 'Limpeza & Casa', bg: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', border: '#38bdf8', textColor: '#0369a1' };
  }

  // 9. Higiene
  if (cat === 'higiene' || name.includes('fralda') || name.includes('papel') || name.includes('creme dental') || name.includes('shampoo') || name.includes('pampers') || name.includes('huggies') || name.includes('colgate') || name.includes('nivea') || name.includes('gillette') || name.includes('always')) {
    return { icon: '🧴', label: 'Higiene & Perfumaria', bg: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)', border: '#d8b4fe', textColor: '#6b21a8' };
  }

  // Padrão
  return { icon: '🏷️', label: 'Oferta Catalogada', bg: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', border: '#cbd5e1', textColor: '#334155' };
}

// ==========================================
// --- OTIMIZADOR INTELIGENTE DE LISTA DE COMPRAS ---
// ==========================================

function fillExampleList() {
  const textarea = document.getElementById('listTextarea');
  if (textarea) {
    textarea.value = `Arroz 5kg\nFeijão Preto\nCafé\nContrafilé\nCerveja Amstel\nSabão em pó\nAzeite\nLeite\nFralda Huggies`;
    optimizeShoppingList();
  }
}

function optimizeShoppingList() {
  const textarea = document.getElementById('listTextarea');
  const resultsContainer = document.getElementById('listOptimizationResults');

  if (!textarea || !resultsContainer) return;
  const text = textarea.value.trim();

  if (!text) {
    cart.showToast('Por favor, digite ou cole sua lista de compras!');
    return;
  }

  // 1. Separar linhas ou vírgulas da lista informada
  const rawLines = text.split(/[\n,]+/).map(s => s.trim()).filter(s => s.length > 0);

  if (rawLines.length === 0) return;

  const matchedProducts = [];
  const unmatchedItems = [];

  const STOP_WORDS_SET = new Set(['de', 'da', 'do', 'das', 'dos', 'com', 'em', 'para', 'por', 'e', 'a', 'o', 'um', 'uma', 'kg', 'g', 'ml', 'l', 'un', 'unid']);

  // 2. Buscar o produto mais próximo na base de dados
  rawLines.forEach(line => {
    const cleanLine = line.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    const tokens = cleanLine.split(/\s+/).filter(w => w.length >= 2 && !STOP_WORDS_SET.has(w));

    let bestProduct = null;
    let maxScore = 0;

    if (tokens.length > 0) {
      PRODUCTS.forEach(product => {
        const prodNameClean = product.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const catClean = product.category.toLowerCase();

        let score = 0;
        let matchedTokenCount = 0;

        tokens.forEach(token => {
          const wordRegex = new RegExp(`\\b${token}\\b`, 'i');
          if (wordRegex.test(prodNameClean)) {
            score += 10;
            matchedTokenCount++;
          } else if (token.length >= 4 && prodNameClean.includes(token)) {
            score += 4;
            matchedTokenCount++;
          } else if (catClean.includes(token)) {
            score += 1;
          }
        });

        if (prodNameClean.includes(cleanLine)) {
          score += 15;
        }

        const minTokensNeeded = Math.ceil(tokens.length * 0.6);
        if (matchedTokenCount >= minTokensNeeded && score > maxScore && score >= 10) {
          maxScore = score;
          bestProduct = product;
        }
      });
    }

    if (bestProduct) {
      if (!matchedProducts.some(mp => mp.product.id === bestProduct.id)) {
        matchedProducts.push({
          userQuery: line,
          product: bestProduct
        });
      }
    } else {
      unmatchedItems.push(line);
    }
  });

  if (matchedProducts.length === 0) {
    resultsContainer.innerHTML = `
      <div style="text-align: center; color: #ef4444; padding: 20px;">
        <div style="font-size: 2rem; margin-bottom: 8px;">⚠️</div>
        <div style="font-weight: 800; font-size: 1rem;">Nenhum produto correspondente encontrado</div>
        <div style="font-size: 0.82rem; color: #94a3b8; margin-top: 6px;">
          Não encontramos ofertas nos encartes atuais para os itens informados. Tente termos genéricos como "Arroz", "Feijão", "Contrafilé", "Cerveja", "Café".
        </div>
      </div>
    `;
    return;
  }

  // 3. Calcular totais por Supermercado
  const marketTotals = {};
  SUPERMARKETS.forEach(m => {
    marketTotals[m.id] = {
      market: m,
      totalSum: 0,
      availableCount: 0,
      items: []
    };
  });

  // Para a Rota Inteligente de Maior Economia (Dividindo ou em 1 Loja):
  const bestMultiRoute = [];

  matchedProducts.forEach(({ userQuery, product }) => {
    const priceEntries = Object.entries(product.prices);
    const sortedPrices = priceEntries.sort((a, b) => a[1] - b[1]);
    const [bestMarketId, bestPrice] = sortedPrices[0];
    const bestMarketObj = SUPERMARKETS.find(m => m.id === bestMarketId) || SUPERMARKETS[0];

    bestMultiRoute.push({
      userQuery,
      product,
      market: bestMarketObj,
      price: bestPrice
    });

    // Somar total para cada mercado
    SUPERMARKETS.forEach(m => {
      if (product.prices[m.id] !== undefined) {
        marketTotals[m.id].totalSum += product.prices[m.id];
        marketTotals[m.id].availableCount += 1;
        marketTotals[m.id].items.push({ product, price: product.prices[m.id] });
      }
    });
  });

  const sortedMarkets = Object.values(marketTotals)
    .filter(mt => mt.availableCount > 0)
    .sort((a, b) => (b.availableCount - a.availableCount) || (a.totalSum - b.totalSum));

  const bestSingleMarket = sortedMarkets[0];

  // Agrupar Rota de Maior Economia por supermercado
  const multiGrouped = {};
  let multiTotalSum = 0;
  bestMultiRoute.forEach(item => {
    multiTotalSum += item.price;
    const mId = item.market.id;
    if (!multiGrouped[mId]) {
      multiGrouped[mId] = { market: item.market, items: [] };
    }
    multiGrouped[mId].items.push(item);
  });

  const multiMarketsUsed = Object.values(multiGrouped);

  // 4. Renderizar Resultado Formatado e Atraente
  let resHtml = `
    <div style="color: white; text-align: left;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 10px; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
        <span style="font-size: 0.85rem; font-weight: 800; color: #38bdf8;">
          🎯 ${matchedProducts.length} de ${rawLines.length} itens encontrados nos encartes
        </span>
        <button onclick="addMatchedListToCart(${JSON.stringify(matchedProducts.map(m => m.product.id)).replace(/"/g, '&quot;')})" style="background: #10b981; color: white; border: none; font-size: 0.76rem; font-weight: 800; padding: 6px 12px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
          🛒 Adicionar Todos à Cesta
        </button>
      </div>
  `;

  // Alerta de itens não encontrados
  if (unmatchedItems.length > 0) {
    const primaryMarketName = bestSingleMarket ? bestSingleMarket.market.name : 'Extrabom';
    const altMarket = SUPERMARKETS.find(m => m.name !== primaryMarketName) || { name: 'Carone' };
    resHtml += `
      <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 8px 12px; margin-bottom: 12px; font-size: 0.78rem; color: #fca5a5;">
        <strong>⚠️ Itens não identificados nos encartes de hoje (${unmatchedItems.length}):</strong> ${unmatchedItems.join(', ')}.
        <br><span style="color: #cbd5e1; font-size: 0.74rem;">Dica: Você encontrará esses itens no setor de mercearia do <strong>${primaryMarketName}</strong> ou <strong>${altMarket.name}</strong>.</span>
      </div>
    `;
  }

  // OPÇÃO 1: Rota de Economia Máxima
  resHtml += `
    <div style="background: linear-gradient(135deg, #065f46 0%, #047857 100%); border-radius: 10px; padding: 12px; margin-bottom: 12px; border: 1px solid #10b981;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 800; font-size: 0.88rem; color: #a7f3d0; display: flex; align-items: center; gap: 6px;">
          🏆 1. Rota de Economia Imbatível ${multiMarketsUsed.length > 1 ? `(Dividindo em ${multiMarketsUsed.length} Lojas)` : '(Loja Única)'}
        </span>
        <span style="font-size: 1.1rem; font-weight: 900; color: #ffffff;">R$ ${multiTotalSum.toFixed(2)}</span>
      </div>
      <div style="font-size: 0.78rem; color: #ecfdf5; margin-top: 6px;">
  `;

  multiMarketsUsed.forEach(grp => {
    resHtml += `
      <div style="margin-top: 4px; padding: 4px 8px; background: rgba(0,0,0,0.25); border-radius: 6px;">
        📍 <strong>Ir ao ${grp.market.name}:</strong> ${grp.items.map(i => `${i.product.name.split(' ')[0]} (R$ ${i.price.toFixed(2)})`).join(', ')}
      </div>
    `;
  });

  resHtml += `
      </div>
    </div>
  `;

  // OPÇÃO 2: Compra em 1 Único Supermercado (Praticidade)
  resHtml += `
    <div style="background: #0f172a; border-radius: 10px; padding: 12px; border: 1px solid #334155;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 800; font-size: 0.84rem; color: #f8fafc; display: flex; align-items: center; gap: 6px;">
          🛍️ 2. Fazer Tudo em 1 Só Lugar: <strong>${bestSingleMarket.market.name}</strong>
        </span>
        <span style="font-size: 1rem; font-weight: 800; color: #34d399;">
          R$ ${bestSingleMarket.totalSum.toFixed(2)}
        </span>
      </div>
      <div style="font-size: 0.74rem; color: #94a3b8; margin-top: 4px;">
        Possui ${bestSingleMarket.availableCount} de ${matchedProducts.length} itens da sua lista com oferta catalogada.
      </div>
    </div>
  `;

  resHtml += `</div>`;
  resultsContainer.innerHTML = resHtml;
}

function addMatchedListToCart(productIds) {
  let count = 0;
  productIds.forEach(id => {
    cart.addItem(id);
    count++;
  });
  cart.showToast(`✨ ${count} itens da sua lista foram adicionados à Cesta de Compras!`);
}

// ==========================================================================
// VOTAÇÃO & CONTADOR DE VISUALIZAÇÕES DOS MORADORES
// ==========================================================================

// Limpa sementes de dados de teste antigos do navegador do usuário
(function resetLegacyMockCounters() {
  try {
    if (!localStorage.getItem('economiza_colina_zeroed_v2')) {
      localStorage.removeItem('economiza_colina_views');
      localStorage.removeItem('economiza_colina_votes');
      localStorage.setItem('economiza_colina_zeroed_v2', 'true');
    }
  } catch (e) {}
})();

function getProductViews(productId) {
  const viewsData = JSON.parse(localStorage.getItem('economiza_colina_views')) || {};
  if (viewsData[productId] === undefined) {
    viewsData[productId] = 0;
    localStorage.setItem('economiza_colina_views', JSON.stringify(viewsData));
  }
  return viewsData[productId];
}

function recordProductView(productId) {
  const viewsData = JSON.parse(localStorage.getItem('economiza_colina_views')) || {};
  const current = viewsData[productId] !== undefined ? viewsData[productId] : getProductViews(productId);
  viewsData[productId] = current + 1;
  localStorage.setItem('economiza_colina_views', JSON.stringify(viewsData));

  const viewSpan = document.getElementById(`view-count-${productId}`);
  if (viewSpan) viewSpan.textContent = viewsData[productId];
}

// Carrega alterações de preços e ofertas criadas pelos moradores salvas no localStorage
function applyStoredCustomPrices() {
  try {
    // 1. Carregar produtos criados por moradores no aplicativo
    const customUserProducts = JSON.parse(localStorage.getItem('economiza_colina_user_created_products')) || [];
    customUserProducts.forEach(up => {
      if (!PRODUCTS.some(p => p.id === up.id)) {
        PRODUCTS.unshift(up);
      }
    });

    // 2. Carregar preços customizados informados pelos moradores
    const customPrices = JSON.parse(localStorage.getItem('economiza_colina_custom_prices')) || {};
    Object.keys(customPrices).forEach(pId => {
      const product = PRODUCTS.find(p => p.id === pId);
      if (product && customPrices[pId]) {
        const { marketId, realPrice, marketName } = customPrices[pId];
        product.prices[marketId] = realPrice;
        product.communityReported = { marketName, realPrice, date: 'Hoje' };
      }
    });
  } catch (e) {
    console.error('Erro ao carregar preços comunitários:', e);
  }
}

let lastVoteTimestamp = 0;

function hasUserVotedToday(productId) {
  try {
    const todayKey = new Date().toISOString().split('T')[0];
    const dailyVotes = JSON.parse(localStorage.getItem('economiza_colina_user_daily_votes')) || {};
    return (dailyVotes[todayKey] && dailyVotes[todayKey][productId]) || false;
  } catch (e) {
    return false;
  }
}

function recordUserVoteToday(productId, type) {
  try {
    const todayKey = new Date().toISOString().split('T')[0];
    const dailyVotes = JSON.parse(localStorage.getItem('economiza_colina_user_daily_votes')) || {};
    if (!dailyVotes[todayKey]) dailyVotes[todayKey] = {};
    dailyVotes[todayKey][productId] = type;
    localStorage.setItem('economiza_colina_user_daily_votes', JSON.stringify(dailyVotes));
  } catch (e) {
    console.error('Erro ao registrar voto diário:', e);
  }
}

function removeUserVoteToday(productId) {
  try {
    const todayKey = new Date().toISOString().split('T')[0];
    const dailyVotes = JSON.parse(localStorage.getItem('economiza_colina_user_daily_votes')) || {};
    if (dailyVotes[todayKey] && dailyVotes[todayKey][productId]) {
      delete dailyVotes[todayKey][productId];
      localStorage.setItem('economiza_colina_user_daily_votes', JSON.stringify(dailyVotes));
    }
  } catch (e) {
    console.error('Erro ao remover voto diário:', e);
  }
}

function getProductVotes(productId) {
  const votes = JSON.parse(localStorage.getItem('economiza_colina_votes')) || {};
  if (!votes[productId]) {
    votes[productId] = { up: 0, down: 0 };
    localStorage.setItem('economiza_colina_votes', JSON.stringify(votes));
  }
  return votes[productId];
}

// Confirmar ou Desfazer Confirmação de Preço (👍) - Alternância (Toggle) 1 Voto Por Morador
function toggleConfirmProductPrice(productId) {
  const now = Date.now();
  if (now - lastVoteTimestamp < 400) return;
  lastVoteTimestamp = now;

  const previousVote = hasUserVotedToday(productId);
  const votes = JSON.parse(localStorage.getItem('economiza_colina_votes')) || {};
  const current = votes[productId] || getProductVotes(productId);

  if (previousVote === 'up') {
    // Morador já havia confirmado 👍 -> Clique novamente REMOVE/DESFAZ a confirmação (-1)
    current.up = Math.max(0, current.up - 1);
    votes[productId] = current;
    localStorage.setItem('economiza_colina_votes', JSON.stringify(votes));

    removeUserVoteToday(productId);
    renderProducts();

    if (window.cart && window.cart.showToast) {
      window.cart.showToast('↩️ Sua confirmação de preço foi removida.');
    }
  } else {
    // Se o morador já tinha registrado 'down' antes, desfaz a divergência (-1)
    if (previousVote === 'down') {
      current.down = Math.max(0, current.down - 1);
    }

    // Adiciona a confirmação (+1)
    current.up += 1;
    votes[productId] = current;
    localStorage.setItem('economiza_colina_votes', JSON.stringify(votes));

    recordUserVoteToday(productId, 'up');
    recordProductView(productId);

    renderProducts();

    if (window.cart && window.cart.showToast) {
      window.cart.showToast('👍 Preço confirmado por você! (Clique novamente se desejar desfazer)');
    }
  }
}

function confirmProductPrice(productId) {
  toggleConfirmProductPrice(productId);
}

// Abrir Modal para Morador Informar o Preço Real Encontrado (👎)
function openPriceReportModal(productId) {
  const previousVote = hasUserVotedToday(productId);
  if (previousVote) {
    if (window.cart && window.cart.showToast) {
      window.cart.showToast('🔒 Você já registrou uma avaliação para esta oferta hoje!');
    }
    return;
  }

  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('priceReportModal');
  const body = document.getElementById('priceReportModalBody');
  if (!modal || !body) return;

  const sortedPrices = Object.entries(product.prices).sort((a, b) => a[1] - b[1]);
  const [lowestMarketId, lowestPrice] = sortedPrices[0];

  let marketOptions = SUPERMARKETS.map(m => `
    <option value="${m.id}" ${m.id === lowestMarketId ? 'selected' : ''}>
      ${m.name} (${m.badge}) - Atual: R$ ${(product.prices[m.id] || lowestPrice).toFixed(2)}
    </option>
  `).join('');

  body.innerHTML = `
    <div style="text-align: center; margin-bottom: 16px;">
      <div style="font-size: 2.5rem; margin-bottom: 6px;">🏷️</div>
      <h3 style="font-size: 1.05rem; color: #0f172a; font-weight: 800; line-height: 1.3;">${product.name}</h3>
      <div style="font-size: 0.8rem; color: #64748b; margin-top: 4px;">
        Catalogado por <strong>R$ ${lowestPrice.toFixed(2)}</strong> no menor preço atual
      </div>
    </div>

    <form onsubmit="submitPriceReport(event, '${product.id}')" style="display: flex; flex-direction: column; gap: 14px;">
      <div>
        <label style="font-size: 0.82rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">1. Selecione o Supermercado:</label>
        <select id="reportMarketSelect" required style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #cbd5e1; font-weight: 700; font-size: 0.88rem; color: #0f172a; background: #f8fafc;">
          ${marketOptions}
        </select>
      </div>

      <div>
        <label style="font-size: 0.82rem; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">2. Qual valor real você achou na prateleira? (R$):</label>
        <input type="number" step="0.01" min="0.01" id="reportRealPriceInput" placeholder="Ex: 5.49" required style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #059669; font-size: 1.1rem; font-weight: 800; color: #047857; background: #ecfdf5;">
      </div>

      <div>
        <label style="font-size: 0.82rem; font-weight: 700; color: #334155; display: block; margin-bottom: 6px;">3. Anexar Foto da Etiqueta / Preço (Opcional):</label>
        <input type="file" id="reportPhotoFile" accept="image/*" onchange="handleReportPhotoSelect(event, 'gallery')" style="display: none;">
        <input type="file" id="reportPhotoCamera" accept="image/*" capture="environment" onchange="handleReportPhotoSelect(event, 'camera')" style="display: none;">

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <button type="button" onclick="document.getElementById('reportPhotoFile').click()" style="background: #f8fafc; border: 1.5px dashed #cbd5e1; color: #334155; padding: 8px 6px; border-radius: 8px; font-weight: 700; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
            <span>📁 Galeria / Arquivos</span>
          </button>
          <button type="button" onclick="document.getElementById('reportPhotoCamera').click()" style="background: #ecfdf5; border: 1.5px solid #10b981; color: #065f46; padding: 8px 6px; border-radius: 8px; font-weight: 700; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
            <span>📸 Usar Câmera</span>
          </button>
        </div>

        <div id="reportPhotoPreviewContainer" style="display: none; margin-top: 8px; text-align: center; background: #f8fafc; padding: 8px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <img id="reportPhotoPreviewImg" src="" alt="Foto anexada" style="max-height: 110px; border-radius: 6px; border: 1px solid #10b981; object-fit: contain;">
          <div id="reportPhotoPreviewBadge" style="font-size: 0.74rem; color: #059669; font-weight: 700; margin-top: 2px;">✓ Foto selecionada!</div>
          <button type="button" onclick="clearReportPhoto()" style="margin-top: 4px; background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; cursor: pointer;">
            🗑️ Remover
          </button>
        </div>
      </div>

      <div style="background: #eff6ff; border: 1px solid #93c5fd; padding: 10px; border-radius: 8px; font-size: 0.78rem; color: #1e40af; line-height: 1.4;">
        📢 <strong>Colaboração Comunitária:</strong> O novo valor atualizará o comparador instantaneamente para todos os vizinhos de Colina!
      </div>

      <div style="display: flex; gap: 10px; margin-top: 6px;">
        <button type="button" onclick="closePriceReportModal()" style="flex: 1; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 12px; border-radius: 10px; font-weight: 700; cursor: pointer;">
          Cancelar
        </button>
        <button type="submit" style="flex: 2; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 800; font-size: 0.92rem; cursor: pointer; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
          🚀 Atualizar Preço no Bairro
        </button>
      </div>
    </form>
  `;

  modal.classList.add('active');
  modal.style.display = 'flex';
}

function handleReportPhotoSelect(e, sourceType) {
  const file = e.target.files && e.target.files[0];
  const container = document.getElementById('reportPhotoPreviewContainer');
  const img = document.getElementById('reportPhotoPreviewImg');
  const badge = document.getElementById('reportPhotoPreviewBadge');

  if (file && container && img) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      currentReportPhotoDataUrl = evt.target.result;
      img.src = currentReportPhotoDataUrl;
      container.style.display = 'block';
      if (badge) {
        badge.textContent = sourceType === 'camera'
          ? '📸 Foto da Câmera capturada!'
          : '📁 Foto da Galeria selecionada!';
      }
    };
    reader.readAsDataURL(file);
  }
}

function clearReportPhoto() {
  currentReportPhotoDataUrl = null;
  const container = document.getElementById('reportPhotoPreviewContainer');
  const img = document.getElementById('reportPhotoPreviewImg');
  const fileInput = document.getElementById('reportPhotoFile');
  const cameraInput = document.getElementById('reportPhotoCamera');

  if (fileInput) fileInput.value = '';
  if (cameraInput) cameraInput.value = '';
  if (img) img.src = '';
  if (container) container.style.display = 'none';
}

function closePriceReportModal() {
  clearReportPhoto();
  const modal = document.getElementById('priceReportModal');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
}

function submitPriceReport(event, productId) {
  event.preventDefault();
  const marketSelect = document.getElementById('reportMarketSelect');
  const priceInput = document.getElementById('reportRealPriceInput');

  if (!marketSelect || !priceInput) return;

  const marketId = marketSelect.value;
  const newPrice = parseFloat(priceInput.value);

  if (isNaN(newPrice) || newPrice <= 0) {
    if (window.cart && window.cart.showToast) window.cart.showToast('⚠️ Por favor, insira um preço válido maior que zero.');
    return;
  }

  const product = PRODUCTS.find(p => p.id === productId);
  const marketObj = SUPERMARKETS.find(m => m.id === marketId) || { name: 'Supermercado' };

  if (product) {
    product.prices[marketId] = newPrice;
    product.communityReported = { marketName: marketObj.name, realPrice: newPrice, date: 'Hoje' };
    if (currentReportPhotoDataUrl) {
      product.image = currentReportPhotoDataUrl;
    }

    const customPrices = JSON.parse(localStorage.getItem('economiza_colina_custom_prices')) || {};
    customPrices[productId] = { marketId, realPrice: newPrice, marketName: marketObj.name, image: currentReportPhotoDataUrl || null };
    localStorage.setItem('economiza_colina_custom_prices', JSON.stringify(customPrices));

    const previousVote = hasUserVotedToday(productId);
    const votes = JSON.parse(localStorage.getItem('economiza_colina_votes')) || {};
    const current = votes[productId] || getProductVotes(productId);

    if (previousVote === 'up') {
      current.up = Math.max(0, current.up - 1);
    }
    if (previousVote !== 'down') {
      current.down += 1;
    }
    
    votes[productId] = current;
    localStorage.setItem('economiza_colina_votes', JSON.stringify(votes));
    
    recordUserVoteToday(productId, 'down');
    recordProductView(productId);

    renderProducts();
    closePriceReportModal();

    if (window.cart && window.cart.showToast) {
      window.cart.showToast(`🎉 Preço do ${product.name} atualizado para R$ ${newPrice.toFixed(2)} no ${marketObj.name}! Obrigado!`);
    }
  }
}

// ==========================================================================
// PRESETS DE BUSCA RÁPIDA (PERFIS DE COMPRA)
// ==========================================================================

function applyPresetFilter(presetKey) {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  const presets = {
    'churrasco': 'Contrafilé',
    'feira': 'Tomate',
    'bebe': 'Fralda',
    'limpeza': 'Detergente',
    'cesta': 'Arroz'
  };

  const query = presets[presetKey] || '';
  searchInput.value = query;
  onSearchInput(query);

  const container = document.getElementById('productsGrid');
  if (container) {
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ==========================================================================
// MODAIS DE GAMIFICAÇÃO E RANKING
// ==========================================================================

function openRankingModal() {
  const modal = document.getElementById('rankingModal');
  if (modal) modal.style.display = 'flex';
}

function closeRankingModal() {
  const modal = document.getElementById('rankingModal');
  if (modal) modal.style.display = 'none';
}

function closeSavingsCardModal() {
  const modal = document.getElementById('savingsCardModal');
  if (modal) modal.style.display = 'none';
}

// Registro do Service Worker PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(() => {
      console.log('PWA ServiceWorker registrado com sucesso no Economiza Colina!');
    }).catch(err => {
      console.log('Falha ao registrar ServiceWorker PWA:', err);
    });
  });
}
