(() => {

  // ===== DADOS DOS PRODUTOS =====
  const products = [
    { id: 'gelo-cubo-bala', title: 'Gelo Cubo (Formato de Bala)', price: 150, weight: 2, desc: 'Gelo em cubo formato de bala, ideal para bebidas e refrigeração rápida.', img: '4.png' },
    { id: 'gelo-cubo-normal', title: 'Gelo Cubo Normal', price: 150, weight: 2, desc: 'Gelo em cubo normal, embalado e produzido com água filtrada.', img: '4.png' },
    { id: 'gelo-garrafa-5l', title: 'Gelo de Garrafa 5L', price: 80, weight: 5, desc: 'Gelo em garrafa de 5L, prático para viagens, festas e pequenos eventos.', img: '4.png' },
    { id: 'gelo-garrafa-10l', title: 'Gelo de Garrafa 10L', price: 160, weight: 10, desc: 'Gelo em garrafa de 10L, perfeito para grandes eventos e arrefecimento prolongado.', img: '4.png' }
  ];

  // ===== DADOS DOS CARDS (PRODUCTS PAGE) =====
  const aboutCards = {
    1: {
      title: 'Saco de Gelo 2kg',
      badge: '⭐ Mais Vendido',
      image: '4.png',
      closeup: 'card1.png',
      layout: 'left',
      details: [
        'Peso: 2 kg',
        'Cubo: 3.5×3×3cm',
        'Peso por cubo: 8g',
        'Dimensões: 28-32cm',
        'Embalagem: Polietileno food-grade'
      ],
      tags: [
        '<img src="filtro.png" alt="Água Filtrada" /> Água Filtrada',
        '<img src="cubo.png" alt="Cubos Perfeitos" /> Cubos Perfeitos',
        '<img src="easy.png" alt="Fácil Transporte" /> Fácil Transporte'
      ],
      price: '150 esc (130 esc 10+)'
    },
    2: {
      title: 'Garrafa 5L',
      badge: '💧 Popular',
      closeup: 'card6.png',
      layout: 'left',
      details: [
        'Capacidade: 5L',
        'Peso: ~5kg',
        'Dimensões: 32×16×16cm',
        'Água Filtrada',
        'Material: PEAD'
      ],
      tags: [
        '<img src="R3.png" alt="Reutilizável" /> Reutilizável',
        '<img src="tampa.png" alt="Tampa de Rosca" /> Tampa de Rosca',
        '<img src="FREEZER.png" alt="Fácil Guardar" /> Fácil Guardar'
      ],
      price: '80 esc'
    },
    3: {
      title: 'Garrafa 10L',
      badge: '❄️ Eventos',
      closeup: '17.png',
      layout: 'left',
      details: [
        'Capacidade: 10L',
        'Peso: ~10kg',
        'Dimensões: 40×18×18cm',
        'Água Filtrada',
        'Material: PEAD'
      ],
      tags: [
        '<img src="R3.png" alt="Reutilizável" /> Reutilizável',
        '<img src="easy.png" alt="Alça Transporte" /> Alça Transporte',
        '<img src="EVENT.png" alt="Grandes Eventos" /> Grandes Eventos'
      ],
      price: '160 esc'
    },
    4: {
      title: 'Cubo de Gelo 2cm',
      badge: '🧊 Premium',
      image: '4.png',
      closeup: 'card2.png',
      layout: 'left',
      details: [
        'Tamanho: 2×2×2cm',
        'Peso: 8g',
        'Formato: Cubo perfeito',
        'Água Filtrada',
        'Uso: Bebidas'
      ],
      tags: [
        '<img src="cubo.png" alt="Cubo Perfeito" /> Cubo Perfeito',
        '<img src="filtro.png" alt="Água Filtrada" /> Água Filtrada',
        '<img src="VERSATIL.PNG" alt="Uso Versátil" /> Uso Versátil'
      ],
      price: '150 esc (130 esc 10+)'
    },
    5: {
      title: 'Gelo em Flocos',
      badge: '❄️ Conservação',
      closeup: '22.png',
      layout: 'left',
      details: [
        'Peso: 1 kg',
        'Formato: Flocos finos',
        'Ideal para conservação de alimentos e bebidas',
        'Água Filtrada',
        'Embalagem: Saco resistente'
      ],
      tags: [
        '<img src="FLOCO.JPG" alt="Flocos Finos" /> Flocos Finos',
        '<img src="filtro.png" alt="Água Filtrada" /> Água Filtrada',
        '<img src="FREEZER.png" alt="Conservação" /> Conservação'
      ],
      price: '200 esc'
    }
  };

  // ===== FUNÇÕES AUXILIARES =====
  function $(s) { return document.querySelector(s); }
  function $all(s) { return Array.from(document.querySelectorAll(s)); }
  function findProduct(id) { return products.find(p => p.id === id); }

  // ===== FUNÇÕES DE VÍDEO (FALTANTES) =====
  function pauseAllVideos(exceptCard) {
    document.querySelectorAll('.about-card video').forEach(video => {
      if (video.closest('.about-card') !== exceptCard) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }

  function playVideo(card) {
    const video = card.querySelector('video');
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }

  // ===== RENDER PRODUCT GRID =====
  function renderProductGrid(sortedBy) {
    const grid = $('#productGrid');
    if (!grid) return;
    let list = products.slice();
    if (sortedBy === 'price') list.sort((a, b) => a.price - b.price);
    if (sortedBy === 'weight') list.sort((a, b) => a.weight - b.weight);

    grid.innerHTML = list.map(p => `
      <div class="card">
        <div class="thumb"><img src="${p.img}" alt="${p.title}"></div>
        <h4>${p.title}</h4>
        <p class="small">${p.desc}</p>
        <div class="meta">
          <div><strong>${p.price} esc</strong></div>
          <div><a class="btn btn-primary" href="order.html">Pedir</a></div>
        </div>
      </div>
    `).join('');
  }

  // ===== ORDER PAGE =====
  function renderOrderPage() {
    const container = document.getElementById('productList');
    if (!container) return;

    const VENDEDOR_WHATSAPP = '2389982151';

    const orderProducts = [
      { id: 'gelo-cubo-bala',   title: 'Saco Gelo (2kg) — Cubo Bala',  basePrice: 150, weight: 2, img: 'c1.png' },
      { id: 'gelo-cubo-normal', title: 'Saco Gelo (2kg) — Cubo Normal', basePrice: 150, weight: 2, img: 'c5.png' },
      { id: 'gelo-floco',       title: 'Gelo Floco (1kg)',             basePrice: 200, weight: 1, img: 'c4.png' },
      { id: 'gelo-garrafa-5l',  title: 'Garrafa 5L',                   basePrice: 80,  weight: 5, img: 'c2.png' },
      { id: 'gelo-garrafa-10l', title: 'Garrafa 10L',                  basePrice: 160, weight: 10, img: 'c3.png' }
    ];

    const cardClasses = ['card-1', 'card-2', 'card-3', 'card-4', 'card-5'];
    const discountGroupIds = ['gelo-cubo-bala', 'gelo-cubo-normal'];
    const DISCOUNT_PRICE = 130;
    const DISCOUNT_THRESHOLD = 10;

    function renderProducts() {
      container.innerHTML = orderProducts.map((p, index) => {
        const cardClass = cardClasses[index % cardClasses.length];
        const isDiscount = discountGroupIds.includes(p.id);
        return `
          <div class="product-card ${cardClass}" data-id="${p.id}">
            <img class="card-img" src="${p.img}" alt="${p.title}" />
            <div class="card-info">
              <div class="name">${p.title}</div>
              <div class="price">
                <span class="normal">${p.basePrice} CVE</span>
                ${isDiscount ? `<span class="bulk">(130 CVE se total ≥ 10)</span>` : ''}
              </div>
            </div>
            <div class="qty-control">
              <button class="qty-btn minus" data-id="${p.id}">−</button>
              <input type="number" min="0" value="0" class="qty-input" data-id="${p.id}" readonly />
              <button class="qty-btn plus" data-id="${p.id}">+</button>
            </div>
          </div>
        `;
      }).join('');

      container.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const id = this.dataset.id;
          const input = container.querySelector(`.qty-input[data-id="${id}"]`);
          let val = parseInt(input.value) || 0;
          if (this.classList.contains('plus')) val++;
          else if (this.classList.contains('minus')) val = Math.max(0, val - 1);
          input.value = val;
          updateTotals();
        });
      });

      container.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', updateTotals);
      });

      updateTotals();
    }

    function updateTotals() {
      const inputs = container.querySelectorAll('.qty-input');
      let subtotal = 0;
      let discountGroupTotal = 0;

      inputs.forEach(input => {
        const id = input.dataset.id;
        const qty = Math.max(0, parseInt(input.value) || 0);
        if (discountGroupIds.includes(id)) {
          discountGroupTotal += qty;
        }
      });

      const applyDiscount = discountGroupTotal >= DISCOUNT_THRESHOLD;

      inputs.forEach(input => {
        const id = input.dataset.id;
        const qty = Math.max(0, parseInt(input.value) || 0);
        const product = orderProducts.find(p => p.id === id);
        if (!product) return;

        let unitPrice = product.basePrice;
        if (discountGroupIds.includes(id) && applyDiscount) {
          unitPrice = DISCOUNT_PRICE;
        }
        subtotal += unitPrice * qty;
      });

      const insidePraia = document.getElementById('insidePraia').checked;

      if (insidePraia) {
        document.getElementById('deliveryValue').textContent = 'Grátis';
        document.getElementById('deliveryNote').textContent = '(grátis)';
        document.getElementById('outsideNote').style.display = 'none';
      } else {
        document.getElementById('deliveryValue').textContent = 'A confirmar';
        document.getElementById('deliveryNote').textContent = '(fora de Praia)';
        document.getElementById('outsideNote').style.display = 'block';
      }

      document.getElementById('subtotalValue').textContent = subtotal + ' CVE';
      document.getElementById('totalValue').textContent = subtotal + ' CVE';
    }

    document.getElementById('insidePraia').addEventListener('change', updateTotals);

    // ===== BOTÃO CONFIRMAR PEDIDO (WHATSAPP) =====
    document.getElementById('buyButton').addEventListener('click', function() {
      const name = document.getElementById('custName').value.trim();
      const phone = document.getElementById('custPhone').value.trim();
      const email = document.getElementById('custEmail').value.trim();
      const payment = document.getElementById('paymentMethod').value;
      const inside = document.getElementById('insidePraia').checked;
      const zonaSelect = document.getElementById('zona');
      const zona = zonaSelect ? zonaSelect.options[zonaSelect.selectedIndex]?.text || '' : '';

      if (!name || !phone) {
        alert('Por favor, preencha o seu nome e telefone.');
        return;
      }

      const inputs = container.querySelectorAll('.qty-input');
      let items = [];
      let subtotal = 0;
      let discountGroupTotal = 0;

      inputs.forEach(input => {
        const id = input.dataset.id;
        const qty = Math.max(0, parseInt(input.value) || 0);
        if (discountGroupIds.includes(id)) {
          discountGroupTotal += qty;
        }
      });
      const applyDiscount = discountGroupTotal >= DISCOUNT_THRESHOLD;

      inputs.forEach(input => {
        const id = input.dataset.id;
        const qty = Math.max(0, parseInt(input.value) || 0);
        if (qty === 0) return;
        const product = orderProducts.find(p => p.id === id);
        let unitPrice = product.basePrice;
        if (discountGroupIds.includes(id) && applyDiscount) {
          unitPrice = DISCOUNT_PRICE;
        }
        const total = unitPrice * qty;
        subtotal += total;
        items.push(`${product.title}: ${qty} x ${unitPrice} = ${total} CVE`);
      });

      if (items.length === 0) {
        alert('Selecione pelo menos um produto.');
        return;
      }

      const orderId = 'GP-' + Date.now().toString().slice(-6) + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
      const deliveryText = inside ? 'Dentro de Praia (Grátis)' : 'Fora de Praia (a confirmar)';

      let message = '🛒 *NOVO PEDIDO GELO PINA*\n\n';
      message += `📋 *Nº Pedido:* ${orderId}\n`;
      message += `👤 *Cliente:* ${name}\n`;
      message += `📞 *Telefone:* ${phone}\n`;
      if (email) message += `📧 *Email:* ${email}\n`;
      message += `📍 *Entrega:* ${deliveryText}\n`;
      message += `🗺️ *Zona:* ${zona || 'Não selecionada'}\n`;

      const paymentMap = {
        'presencial-dinheiro': 'Presencial (Dinheiro Físico)',
        'presencial-cartao': 'Presencial (Cartão24)',
        'transferencia': 'Transferência Bancária'
      };
      message += `💳 *Pagamento:* ${paymentMap[payment] || payment}\n\n`;

      message += '📦 *PRODUTOS:*\n';
      items.forEach(item => {
        message += `  • ${item}\n`;
      });
      message += `\n💰 *Subtotal:* ${subtotal} CVE\n`;
      message += `🚚 *Entrega:* ${deliveryText}\n`;
      message += `🔹 *Total:* ${subtotal} CVE\n\n`;
      message += '✅ Pedido gerado automaticamente. Aguardar confirmação do vendedor.';

      const whatsappUrl = `https://wa.me/${VENDEDOR_WHATSAPP}?text=${encodeURIComponent(message)}`;

      document.getElementById('orderId').textContent = orderId;
      document.getElementById('confirmation').classList.add('visible');

      this.disabled = true;
      this.textContent = 'Pedido Enviado ✓';

      window.open(whatsappUrl, '_blank');
    });

    renderProducts();
  }

  // ===== LÓGICA DE ZONAS =====
  function setupZonas() {
    const zonaSelect = document.getElementById('zona');
    const insidePraiaCheckbox = document.getElementById('insidePraia');
    const outsideNote = document.getElementById('outsideNote');

    if (!zonaSelect || !insidePraiaCheckbox) return;

    const praiaZonas = [
      "Plateau", "Achada Santo António", "Palmarejo", "Várzea",
      "Achada Grande Frente", "Achada Grande Trás", "Gamboa / Chã de Areia",
      "Achadinha", "Fazenda", "Praia Negra", "Calabaceira", "Tira Chapéu",
      "Prainha", "Cidadela", "Latada", "Lem Cachorro"
    ];

    const concelhosSantiago = {
      "Santa Catarina": {
        "zonas": ["Centro (Cidade)", "Achada Riba", "Atrás de Banco", "Bolanha", "Chã de Santos", "Covão", "Covão Ribeiro", "Cruz Vermelha"]
      },
      "Tarrafal": {
        "zonas": ["Centro da Cidade", "Achada Biscanhos", "Achada Lagoa", "Achada Longueira", "Achada Meio", "Achada Moirão"]
      },
      "Santa Cruz": {
        "zonas": ["Centro da Cidade", "Pedra Badejo"]
      },
      "São Miguel": {
        "zonas": ["Calheta", "Veneza", "Ponta Verde"]
      },
      "São Domingos": {
        "zonas": ["Várzea da Igreja", "Água do Gato", "Banana", "Mendes Faleiro", "Rendeiro", "Praia Baixo", "Milho Branco", "Rui Vaz", "Praia Formosa", "Achada Baleia"]
      },
      "São Lourenço dos Órgãos": {
        "zonas": ["João Teves", "Picos"]
      },
      "Ribeira Grande de Santiago": {
        "zonas": ["Cidade Velha", "Achada de Cidade Velha", "Achada Poça", "Convento", "Escada Branca", "Laranjinha"]
      },
      "São Salvador do Mundo": {
        "zonas": ["Picos", "Achada Igreja"]
      }
    };

    function preencherZonas() {
      zonaSelect.innerHTML = '';
      const isPraia = insidePraiaCheckbox.checked;

      if (isPraia) {
        praiaZonas.forEach(zona => {
          const option = document.createElement('option');
          option.value = zona;
          option.textContent = zona;
          zonaSelect.appendChild(option);
        });
      } else {
        Object.keys(concelhosSantiago).forEach(concelho => {
          const option = document.createElement('option');
          option.value = concelho;
          option.textContent = concelho;
          option.style.color = 'red';
          zonaSelect.appendChild(option);
        });
      }

      if (outsideNote) {
        outsideNote.style.display = isPraia ? 'none' : 'block';
      }
    }

    function atualizarZonasPorConcelho() {
      const selectedValue = zonaSelect.value;
      if (!insidePraiaCheckbox.checked && concelhosSantiago[selectedValue]) {
        const zonas = concelhosSantiago[selectedValue].zonas;
        zonaSelect.innerHTML = '';
        zonas.forEach(zona => {
          const option = document.createElement('option');
          option.value = zona;
          option.textContent = zona;
          zonaSelect.appendChild(option);
        });
      }
    }

    insidePraiaCheckbox.addEventListener('change', preencherZonas);

    zonaSelect.addEventListener('change', function() {
      if (!insidePraiaCheckbox.checked && concelhosSantiago[this.value]) {
        atualizarZonasPorConcelho();
      }
    });

    preencherZonas();
  }

  // ===== INICIALIZAÇÃO =====
  document.addEventListener('DOMContentLoaded', function() {

    // ===== PRODUCTS PAGE (grid de produtos) =====
    const sortSelect = $('#sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => renderProductGrid(sortSelect.value));
      renderProductGrid('default');
    }

    // ===== ORDER PAGE =====
    if (document.getElementById('productList')) {
      renderOrderPage();
    }

    // ===== LÓGICA DE ZONAS =====
    setupZonas();

    // ===== REVEAL ANIMATIONS =====
    const reveals = $all('.reveal');
    if (reveals.length) {
      try {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });
        reveals.forEach((el, i) => {
          el.style.transitionDelay = (i * 120) + 'ms';
          io.observe(el);
        });
      } catch (e) {
        reveals.forEach(el => el && el.classList.add('visible'));
      }
    }

    // ===== HOME PAGE =====
    if (document.body.classList.contains('home')) {
      const visual = document.querySelector('.visual-graphic');
      if (visual && visual.tagName === 'IMG') {
        visual.src = '4.png';
        visual.style.opacity = '1';
      }

      const heroCard = document.querySelector('.hero-card');
      if (heroCard && visual) {
        heroCard.addEventListener('mousemove', (ev) => {
          const r = heroCard.getBoundingClientRect();
          const x = (ev.clientX - r.left - r.width / 2) / r.width;
          const y = (ev.clientY - r.top - r.height / 2) / r.height;
          const tx = x * 10;
          const ty = y * -10;
          visual.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
          heroCard.style.transform = `translate3d(${tx * 0.04}px, ${ty * 0.04}px, 0)`;
        });
        heroCard.addEventListener('mouseleave', () => {
          visual.style.transform = '';
          heroCard.style.transform = '';
        });
      }
    }

    // ===== ABOUT / PRODUCTS PAGE =====
    if (document.body.classList.contains('about-page')) {
      const cards = $all('.about-card');
      const detailContainer = $('#detailView');

      if (!cards.length || !detailContainer) return;

      function closeDetails() {
        detailContainer.classList.add('hidden');
        detailContainer.innerHTML = '';
        cards.forEach(card => {
          card.style.opacity = '1';
          card.style.transform = '';
          const video = card.querySelector('video');
          if (video) {
            video.pause();
            video.currentTime = 0;
          }
        });
      }

      function renderDetail(cardId) {
        const data = aboutCards[cardId];
        if (!data) return;

        const infoBlocks = data.details.map(item => `<div class="info-block"><p>${item}</p></div>`).join('');
        const tags = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        const layoutClass = data.layout === 'right' ? 'detail-layout-right' : data.layout === 'top' ? 'detail-layout-top' : 'detail-layout-left';

        detailContainer.innerHTML = `
          <div class="detail-panel ${layoutClass}">
            <div class="detail-media">
              <img src="${data.closeup}" alt="${data.title} closeup" loading="lazy">
            </div>
            <div class="detail-content">
              <div>
                <div class="badge">${data.badge}</div>
                <h2 class="detail-title">${data.title}</h2>
                <p class="detail-price">${data.price}</p>
              </div>
              <div class="detail-info">${infoBlocks}</div>
              <div class="detail-tags">${tags}</div>
              <div class="detail-actions">
                <button class="btn-back" type="button">Voltar</button>
              </div>
            </div>
          </div>
        `;

        detailContainer.classList.remove('hidden');

        const backButton = detailContainer.querySelector('.btn-back');
        if (backButton) backButton.addEventListener('click', closeDetails);

        // Scroll para o detalhe
        detailContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      cards.forEach(card => {
        const cardId = card.dataset.card;

        const activate = () => {
          pauseAllVideos(card);
          cards.forEach(other => {
            if (other.dataset.card !== cardId) {
              other.style.opacity = '0';
              other.style.transform = 'translateY(20px)';
            } else {
              other.style.transform = 'translateX(-15px)';
            }
          });
          playVideo(card);
          renderDetail(cardId);
        };

        card.addEventListener('click', activate);
        card.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activate();
          }
        });

        card.addEventListener('mouseenter', () => {
          if (card.style.opacity !== '0') {
            pauseAllVideos(card);
            playVideo(card);
          }
        });

        card.addEventListener('mouseleave', () => {
          if (card.style.opacity !== '0') {
            const video = card.querySelector('video');
            if (video) {
              video.pause();
              video.currentTime = 0;
            }
          }
        });
      });
    }
  });

  // ===== EXPOSED API =====
  window.PraiaIce = {
    findProduct,
    PRICE: 150,
    BULK_PRICE: 130,
    BULK_QTY: 10,
    DELIVERY_MIN: 6,
    DELIVERY_FEE: 150,
    products: products,
    aboutCards: aboutCards
  };

})();