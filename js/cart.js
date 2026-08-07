// Lógica da Cesta de Compras e Otimizador de Economia

class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('economiza_colina_cart')) || [];
    this.optimizationMode = 'single'; // 'single' (1 mercado) ou 'multi' (dividir compras)
  }

  save() {
    localStorage.setItem('economiza_colina_cart', JSON.stringify(this.items));
    this.updateCartBadge();
  }

  addItem(productId) {
    const existing = this.items.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ id: productId, quantity: 1 });
    }
    this.save();
    this.showToast('Item adicionado à sua cesta de compras!');
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
    this.renderCartModal();
  }

  updateQuantity(productId, delta) {
    const item = this.items.find(i => i.id === productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.save();
        this.renderCartModal();
      }
    }
  }

  clear() {
    this.items = [];
    this.save();
    this.renderCartModal();
  }

  updateCartBadge() {
    const totalCount = this.items.reduce((sum, i) => sum + i.quantity, 0);
    const badge = document.getElementById('cartBadgeCount');
    if (badge) {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'flex' : 'none';
    }
  }

  // Cálculo de otimização de preços
  calculateOptimization() {
    if (this.items.length === 0) return null;

    const fullItems = this.items.map(cartItem => {
      const product = PRODUCTS.find(p => p.id === cartItem.id);
      return { ...cartItem, product };
    }).filter(item => item.product);

    // 1. Otimização de Compra Única (1 Mercado)
    const marketTotals = SUPERMARKETS.map(market => {
      let total = 0;
      fullItems.forEach(item => {
        const price = item.product.prices[market.id] || item.product.offerPrice;
        total += price * item.quantity;
      });
      return { market, total };
    });

    marketTotals.sort((a, b) => a.total - b.total);
    const bestSingleMarket = marketTotals[0];

    // 2. Otimização de Economia Máxima (Multi-Mercado)
    let multiTotal = 0;
    const itemBreakdown = fullItems.map(item => {
      let lowestPrice = Infinity;
      let bestMarket = null;

      Object.entries(item.product.prices).forEach(([marketId, price]) => {
        if (price < lowestPrice) {
          lowestPrice = price;
          bestMarket = SUPERMARKETS.find(m => m.id === marketId);
        }
      });

      const subtotal = lowestPrice * item.quantity;
      multiTotal += subtotal;

      return {
        product: item.product,
        quantity: item.quantity,
        lowestPrice,
        bestMarket,
        subtotal
      };
    });

    // 3. Preço Médio Total da Lista na Região
    let averageTotal = 0;
    fullItems.forEach(item => {
      const priceVals = Object.values(item.product.prices);
      const avgPrice = priceVals.reduce((a, b) => a + b, 0) / priceVals.length;
      averageTotal += avgPrice * item.quantity;
    });

    const singleSavings = averageTotal - bestSingleMarket.total;
    const multiSavings = averageTotal - multiTotal;

    return {
      fullItems,
      bestSingleMarket,
      allSingleMarkets: marketTotals,
      multiTotal,
      itemBreakdown,
      averageTotal,
      singleSavings: Math.max(0, singleSavings),
      multiSavings: Math.max(0, multiSavings)
    };
  }

  setMode(mode) {
    this.optimizationMode = mode;
    this.renderCartModal();
  }

  renderCartModal() {
    const container = document.getElementById('cartModalBody');
    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
          <div style="font-size: 3rem; margin-bottom: 10px;">🛒</div>
          <h3 style="font-size: 1.2rem; color: #0f172a; margin-bottom: 6px;">Sua cesta está vazia!</h3>
          <p style="color: #64748b; font-size: 0.9rem;">Navegue pelas ofertas do bairro e adicione itens para saber onde fica mais barato comprar.</p>
        </div>
      `;
      document.getElementById('cartFooter').style.display = 'none';
      return;
    }

    document.getElementById('cartFooter').style.display = 'flex';
    const opt = this.calculateOptimization();

    let html = `
      <div class="optimizer-tabs">
        <button class="opt-tab ${this.optimizationMode === 'single' ? 'active' : ''}" onclick="cart.setMode('single')">
          🏆 Praticidade (1 Único Mercado)
        </button>
        <button class="opt-tab ${this.optimizationMode === 'multi' ? 'active' : ''}" onclick="cart.setMode('multi')">
          ⚡ Economia Máxima (Multi-Mercados)
        </button>
      </div>

      <div class="cart-items-list">
    `;

    opt.fullItems.forEach(item => {
      const bestPrice = Math.min(...Object.values(item.product.prices));
      html += `
        <div class="cart-item-row">
          <div class="cart-item-info">
            <img src="${item.product.image}" class="cart-item-thumb" alt="${item.product.name}">
            <div>
              <div class="cart-item-name">${item.product.name}</div>
              <div style="font-size: 0.78rem; color: #64748b;">Melhor preço individual: <strong>R$ ${bestPrice.toFixed(2)}</strong>/${item.product.unit}</div>
            </div>
          </div>
          <div class="cart-item-qty">
            <button class="btn-qty" onclick="cart.updateQuantity('${item.product.id}', -1)">-</button>
            <span style="font-weight: 700; min-width: 20px; text-align: center;">${item.quantity}</span>
            <button class="btn-qty" onclick="cart.updateQuantity('${item.product.id}', 1)">+</button>
          </div>
        </div>
      `;
    });

    html += `</div>`;

    // Exibição do Resultado da Otimização
    if (this.optimizationMode === 'single') {
      html += `
        <div class="cart-summary-box">
          <div class="market-name-tag" style="font-size: 1rem; color: #047857;">
            🥇 Campeão de Economia no Bairro: <strong>${opt.bestSingleMarket.market.name}</strong>
          </div>
          <div style="font-size: 0.8rem; color: #065f46; margin: 4px 0 12px;">
            📍 Location: ${opt.bestSingleMarket.market.location} (${opt.bestSingleMarket.market.distance})
          </div>

          <div class="summary-row">
            <span>Preço Médio da Lista no Bairro:</span>
            <span style="text-decoration: line-through; color: #64748b;">R$ ${opt.averageTotal.toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Você economiza neste mercado:</span>
            <span style="color: #047857; font-weight: 700;">- R$ ${opt.singleSavings.toFixed(2)}</span>
          </div>
          <div class="summary-row summary-total">
            <span>Total Comprando Tudo Aqui:</span>
            <span>R$ ${opt.bestSingleMarket.total.toFixed(2)}</span>
          </div>
        </div>
      `;
    } else {
      html += `
        <div class="cart-summary-box">
          <div class="market-name-tag" style="font-size: 1rem; color: #047857;">
            ⚡ Estratégia dos Menores Preços Individuais
          </div>
          <div style="font-size: 0.8rem; color: #065f46; margin: 4px 0 12px;">
            Comprando cada item no supermercado mais barato da região de Colina:
          </div>

          <div class="summary-row">
            <span>Preço Médio da Cesta:</span>
            <span style="text-decoration: line-through; color: #64748b;">R$ ${opt.averageTotal.toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Economia Máxima Estimada:</span>
            <span style="color: #047857; font-weight: 700;">- R$ ${opt.multiSavings.toFixed(2)}</span>
          </div>
          <div class="summary-row summary-total">
            <span>Total Absoluto Mais Baixo:</span>
            <span>R$ ${opt.multiTotal.toFixed(2)}</span>
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  shareWhatsApp() {
    const opt = this.calculateOptimization();
    if (!opt) return;

    let text = `🛒 *MINHA LISTA DE COMPRAS - ECONOMIZA COLINA*\n\n`;

    if (this.optimizationMode === 'single') {
      text += `🏆 *Melhor Opção no Bairro:* ${opt.bestSingleMarket.market.name}\n`;
      text += `📍 ${opt.bestSingleMarket.market.location}\n`;
      text += `💰 *Total Estimado:* R$ ${opt.bestSingleMarket.total.toFixed(2)}\n`;
      text += `🎉 *Economia em R$:* R$ ${opt.singleSavings.toFixed(2)}\n\n`;
    } else {
      text += `⚡ *Estratégia Economia Máxima (Multi-Lojas):*\n`;
      text += `💰 *Total Absoluto:* R$ ${opt.multiTotal.toFixed(2)}\n`;
      text += `🎉 *Economia em R$:* R$ ${opt.multiSavings.toFixed(2)}\n\n`;
    }

    text += `*Itens da Lista:*\n`;
    opt.fullItems.forEach(item => {
      text += `• ${item.quantity}x ${item.product.name}\n`;
    });

    text += `\nEncontrado via *Economiza Colina de Laranjeiras* 🛍️`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  }

  exportPDF() {
    const opt = this.calculateOptimization();
    if (!opt) return;

    const printWindow = window.open('', '_blank');
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Lista de Compras - Economiza Colina</title>

        <style>
          body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; padding: 30px; color: #0f172a; }
          h1 { font-size: 1.5rem; color: #059669; border-bottom: 2px solid #10b981; padding-bottom: 8px; }
          .badge { background: #d1fae5; color: #047857; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 0.85rem; }
          .summary-box { background: #f8fafc; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px; margin: 20px 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; }
          th { background: #0f172a; color: white; }
          .total { font-size: 1.2rem; font-weight: bold; color: #059669; margin-top: 15px; }
          @media print { button { display: none; } }
        </style>
      </head>
      <body>
        <h1>🛒 Economiza Colina - Sua Lista de Compras</h1>
        <p><strong>Bairro:</strong> Colina de Laranjeiras e Imediações (Serra/ES)</p>
        <p><strong>Data da Consulta:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>

        <div class="summary-box">
    `;

    if (this.optimizationMode === 'single') {
      html += `
        <h3>🏆 Melhor Opção de Compra Única: <span class="badge">${opt.bestSingleMarket.market.name}</span></h3>
        <p>📍 ${opt.bestSingleMarket.market.location} (${opt.bestSingleMarket.market.distance})</p>
        <p class="total">Total Estimado: R$ ${opt.bestSingleMarket.total.toFixed(2)} (Economia de R$ ${opt.singleSavings.toFixed(2)})</p>
      `;
    } else {
      html += `
        <h3>⚡ Estratégia de Economia Máxima (Multi-Mercados)</h3>
        <p class="total">Total Absoluto Mais Baixo: R$ ${opt.multiTotal.toFixed(2)} (Economia de R$ ${opt.multiSavings.toFixed(2)})</p>
      `;
    }

    html += `
        </div>

        <table>
          <thead>
            <tr>
              <th>Qtd</th>
              <th>Produto</th>
              <th>Melhor Preço</th>
              <th>Supermercado Recomendado</th>
            </tr>
          </thead>
          <tbody>
    `;

    opt.itemBreakdown.forEach(item => {
      html += `
        <tr>
          <td><strong>${item.quantity}x</strong></td>
          <td>${item.product.name}</td>
          <td>R$ ${item.lowestPrice.toFixed(2)} / ${item.product.unit}</td>
          <td>${item.bestMarket.name}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>

        <div style="margin-top: 30px; font-size: 0.8rem; color: #64748b; text-align: center;">
          Gerado automaticamente por <strong>Economiza Colina</strong> • Dicas e Promoções de Supermercados no Bairro
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  }

  showToast(message) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotification';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #0f172a;
        color: white;
        padding: 12px 20px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.88rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 2000;
        border: 1px solid #334155;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.innerHTML = `✅ ${message}`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 2500);
  }
}

const cart = new ShoppingCart();
document.addEventListener('DOMContentLoaded', () => cart.updateCartBadge());
