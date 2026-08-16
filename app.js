// SK Foods - Application Logic & State Management

let currentLanguage = 'en'; // 'en' or 'ta'
let activeCategory = 'all';
let currentSort = 'featured';
let searchQuery = '';
let cart = JSON.parse(localStorage.getItem('sk_foods_cart') || '[]');
let appliedCoupon = null;
let selectedPayment = 'cod';

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  renderCategoryPills();
  renderProducts();
  renderCoupons();
  renderTestimonials();
  renderFAQs();
  updateCartUI();
  setupEventListeners();
}

// ---------------- CATEGORY & PRODUCT RENDERING ----------------

function renderCategoryPills() {
  const container = document.getElementById('category-pills-container');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => {
    const name = currentLanguage === 'ta' && cat.nameTa ? cat.nameTa : cat.name;
    const isActive = cat.id === activeCategory ? 'active' : '';
    return `
      <button class="cat-pill ${isActive}" onclick="selectCategory('${cat.id}')">
        <i class="bi ${cat.icon}"></i>
        <span>${name}</span>
      </button>
    `;
  }).join('');
}

function selectCategory(categoryId) {
  activeCategory = categoryId;
  renderCategoryPills();
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  let filtered = PRODUCTS.filter(prod => {
    const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting
  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.variants[0].price - b.variants[0].price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.variants[0].price - a.variants[0].price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem;">
        <i class="bi bi-search" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem; display:block;"></i>
        <h3 style="color: var(--primary-deep); margin-bottom: 0.5rem;">No organic products found</h3>
        <p style="color: var(--text-muted);">Try searching for another item or choose a different category.</p>
        <button class="btn-primary" style="margin-top: 1rem;" onclick="resetFilters()">View All Products</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(prod => {
    const defaultVariant = prod.variants[0];
    const discountPercent = Math.round(((defaultVariant.originalPrice - defaultVariant.price) / defaultVariant.originalPrice) * 100);

    return `
      <div class="product-card" id="card-${prod.id}">
        <div class="product-media">
          ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
          <button class="quick-view-btn" onclick="openProductModal('${prod.id}')" title="Quick View">
            <i class="bi bi-eye"></i>
          </button>
          <img src="${prod.image}" alt="${prod.name}" loading="lazy">
        </div>

        <div class="product-info">
          <div class="product-rating">
            <i class="bi bi-star-fill"></i>
            <span>${prod.rating} (${prod.reviewsCount})</span>
          </div>

          <h3 class="product-title" title="${prod.name}">${prod.name}</h3>

          <div class="variant-selector">
            <select class="variant-select" onchange="onVariantChange('${prod.id}', this.value)">
              ${prod.variants.map((v, idx) => `
                <option value="${idx}">
                  ${v.weight} - ₹${v.price} (${discountPercent > 0 ? discountPercent + '% OFF' : ''})
                </option>
              `).join('')}
            </select>
          </div>

          <div class="product-footer">
            <div class="product-price">
              <span class="current-price" id="price-display-${prod.id}">₹${defaultVariant.price}</span>
              <span class="original-price" id="mrp-display-${prod.id}">₹${defaultVariant.originalPrice}</span>
            </div>

            <button class="add-cart-btn" onclick="handleAddToCart('${prod.id}')">
              <i class="bi bi-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function onVariantChange(productId, variantIndex) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const variant = product.variants[variantIndex];
  const priceDisplay = document.getElementById(`price-display-${productId}`);
  const mrpDisplay = document.getElementById(`mrp-display-${productId}`);

  if (priceDisplay) priceDisplay.textContent = `₹${variant.price}`;
  if (mrpDisplay) mrpDisplay.textContent = `₹${variant.originalPrice}`;
}

function resetFilters() {
  activeCategory = 'all';
  searchQuery = '';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  renderCategoryPills();
  renderProducts();
}

// ---------------- COUPONS, TESTIMONIALS, FAQS ----------------

function renderCoupons() {
  const container = document.getElementById('coupon-chips-list');
  if (!container) return;

  container.innerHTML = COUPONS.map(c => `
    <div class="coupon-chip" onclick="copyCouponCode('${c.code}')" title="Click to copy coupon code">
      <i class="bi bi-scissors" style="color:var(--accent);"></i>
      <span class="coupon-code-text">${c.code}</span>
      <span style="color:#e2e8f0; font-size:0.75rem;">- ${c.description}</span>
      <i class="bi bi-copy copy-coupon-btn"></i>
    </div>
  `).join('');
}

function copyCouponCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast(`Coupon code ${code} copied! Paste it in the cart.`);
    const cartCouponInput = document.getElementById('cart-coupon-input');
    if (cartCouponInput) cartCouponInput.value = code;
  }).catch(() => {
    const cartCouponInput = document.getElementById('cart-coupon-input');
    if (cartCouponInput) cartCouponInput.value = code;
    showToast(`Coupon code ${code} applied!`);
  });
}

function renderTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;

  container.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">
        ${'<i class="bi bi-star-fill"></i>'.repeat(t.rating)}
      </div>
      <p class="testimonial-comment">"${t.comment}"</p>
      <div class="testimonial-user">
        <img src="${t.avatar}" alt="${t.name}">
        <div>
          <div class="user-name">${t.name}</div>
          <div class="user-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderFAQs() {
  const container = document.getElementById('faq-container');
  if (!container) return;

  container.innerHTML = FAQS.map((faq, index) => {
    const question = currentLanguage === 'ta' && faq.questionTa ? faq.questionTa : faq.question;
    return `
      <div class="faq-item ${index === 0 ? 'open' : ''}">
        <button class="faq-question" onclick="toggleFAQ(this)">
          <span>${question}</span>
          <i class="bi bi-chevron-down"></i>
        </button>
        <div class="faq-answer">
          <p>${faq.answer}</p>
        </div>
      </div>
    `;
  }).join('');
}

function toggleFAQ(button) {
  const faqItem = button.closest('.faq-item');
  if (!faqItem) return;
  faqItem.classList.toggle('open');
}

// ---------------- CART OPERATIONS ----------------

function handleAddToCart(productId, variantIndexOverride = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  let variantIndex = 0;
  if (variantIndexOverride !== null) {
    variantIndex = variantIndexOverride;
  } else {
    const card = document.getElementById(`card-${productId}`);
    if (card) {
      const select = card.querySelector('.variant-select');
      if (select) variantIndex = parseInt(select.value, 10);
    }
  }

  const selectedVariant = product.variants[variantIndex] || product.variants[0];
  const cartItemId = `${productId}_${selectedVariant.weight}`;

  const existingItemIndex = cart.findIndex(item => item.cartItemId === cartItemId);
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({
      cartItemId: cartItemId,
      productId: product.id,
      name: product.name,
      image: product.image,
      weight: selectedVariant.weight,
      price: selectedVariant.price,
      originalPrice: selectedVariant.originalPrice,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.name.split('(')[0].trim()}" (${selectedVariant.weight}) to cart!`);
}

function updateCartQuantity(cartItemId, delta) {
  const itemIndex = cart.findIndex(item => item.cartItemId === cartItemId);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity += delta;
  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
  }

  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('sk_foods_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  // Header Badge
  const headerCount = document.getElementById('header-cart-count');
  if (headerCount) headerCount.textContent = totalItemCount;

  // Drawer Count
  const drawerCount = document.getElementById('drawer-cart-count');
  if (drawerCount) drawerCount.textContent = totalItemCount;

  // Render Items List
  const itemsContainer = document.getElementById('cart-items-list');
  const cartFooter = document.getElementById('cart-footer');

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-cart-state">
        <i class="bi bi-cart-x"></i>
        <h3>Your cart is empty</h3>
        <p>Add pure cold-pressed oils & organic grains to begin shopping.</p>
        <button class="btn-primary" style="margin-top: 1.25rem;" onclick="toggleCartDrawer(false)">Start Shopping</button>
      </div>
    `;
    if (cartFooter) cartFooter.style.display = 'none';
    updateDeliveryProgress(0);
    return;
  }

  if (cartFooter) cartFooter.style.display = 'block';

  itemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4 class="cart-item-name">${item.name}</h4>
        <div class="cart-item-variant">${item.weight}</div>
        <div class="cart-item-price-row">
          <span class="cart-item-price">₹${item.price * item.quantity}</span>
          <div class="qty-control-group">
            <button class="qty-btn" onclick="updateCartQuantity('${item.cartItemId}', -1)">-</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQuantity('${item.cartItemId}', 1)">+</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Coupon Discount
  let discount = 0;
  if (appliedCoupon) {
    if (subtotal >= appliedCoupon.minOrder) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = Math.min((subtotal * appliedCoupon.value) / 100, appliedCoupon.maxDiscount);
      } else {
        discount = appliedCoupon.value;
      }
    } else {
      appliedCoupon = null; // Invalidate if below min order
      showToast(`Coupon removed: Minimum order of ₹${appliedCoupon ? appliedCoupon.minOrder : 300} required.`);
    }
  }

  const deliveryFee = subtotal >= STORE_CONFIG.freeDeliveryMin ? 0 : STORE_CONFIG.deliveryCharge;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  // Update UI amounts
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const discountRow = document.getElementById('coupon-discount-row');
  const discountEl = document.getElementById('cart-discount-val');
  const deliveryEl = document.getElementById('cart-delivery-val');
  const totalEl = document.getElementById('cart-grand-total');

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (discountRow && discountEl) {
    if (discount > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `-₹${Math.round(discount)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }
  if (deliveryEl) deliveryEl.textContent = deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`;
  if (totalEl) totalEl.textContent = `₹${Math.round(grandTotal)}`;

  updateDeliveryProgress(subtotal);
}

function updateDeliveryProgress(subtotal) {
  const target = STORE_CONFIG.freeDeliveryMin;
  const progressText = document.getElementById('delivery-progress-text');
  const progressFill = document.getElementById('delivery-progress-fill');

  if (!progressText || !progressFill) return;

  if (subtotal >= target) {
    progressText.innerHTML = `🎉 <strong>Congratulations!</strong> You get <strong>FREE Delivery</strong>!`;
    progressFill.style.width = '100%';
    progressFill.style.background = '#22c55e';
  } else {
    const diff = target - subtotal;
    const pct = Math.min(100, Math.round((subtotal / target) * 100));
    progressText.innerHTML = `Add <strong>₹${diff}</strong> more for <strong>FREE Delivery</strong>!`;
    progressFill.style.width = `${pct}%`;
    progressFill.style.background = 'var(--primary)';
  }
}

function applyCoupon() {
  const input = document.getElementById('cart-coupon-input');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    showToast('Please enter a coupon code.');
    return;
  }

  const coupon = COUPONS.find(c => c.code === code);
  if (!coupon) {
    showToast('Invalid Coupon Code. Try SKFIRST, ORGANIC50, or FARM100');
    return;
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  if (subtotal < coupon.minOrder) {
    showToast(`Coupon valid only on orders above ₹${coupon.minOrder}`);
    return;
  }

  appliedCoupon = coupon;
  updateCartUI();
  showToast(`🎉 Coupon ${coupon.code} applied successfully!`);
}

function toggleCartDrawer(open) {
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');

  if (open) {
    if (overlay) overlay.classList.add('active');
    if (drawer) drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    if (overlay) overlay.classList.remove('active');
    if (drawer) drawer.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ---------------- PRODUCT DETAILS MODAL ----------------

function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const overlay = document.getElementById('product-modal-overlay');
  const content = document.getElementById('modal-product-content');
  if (!overlay || !content) return;

  content.innerHTML = `
    <div style="display:grid; grid-template-columns: 1fr 1.2fr; gap: 1.5rem; align-items: start;">
      <div style="border-radius: var(--radius-md); overflow:hidden;">
        <img src="${product.image}" alt="${product.name}" style="width:100%; height:280px; object-fit:cover; display:block;">
      </div>
      <div>
        <span class="section-tag" style="margin-bottom:0.4rem;">${product.category.replace('-', ' ').toUpperCase()}</span>
        <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">${product.name}</h3>
        
        <div style="display:flex; align-items:center; gap:0.5rem; color:var(--accent-dark); font-size:0.85rem; margin-bottom: 1rem; font-weight:700;">
          <i class="bi bi-star-fill" style="color:var(--accent);"></i>
          <span>${product.rating} / 5.0 (${product.reviewsCount} Customer Reviews)</span>
        </div>

        <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom: 1.2rem; line-height:1.6;">
          ${product.description}
        </p>

        <div style="margin-bottom: 1.2rem;">
          <h4 style="font-size:0.92rem; margin-bottom:0.4rem; color:var(--primary-dark);">Health & Purity Highlights:</h4>
          <ul style="list-style:none; padding-left:0; font-size:0.85rem; color:var(--text-main); display:flex; flex-direction:column; gap:0.3rem;">
            ${product.benefits.map(b => `<li><i class="bi bi-check-circle-fill" style="color:var(--primary); margin-right:0.4rem;"></i>${b}</li>`).join('')}
          </ul>
        </div>

        <div class="form-group">
          <label class="form-label">Select Quantity / Size:</label>
          <select id="modal-variant-select" class="form-control" onchange="onModalVariantChange('${product.id}', this.value)">
            ${product.variants.map((v, i) => `
              <option value="${i}">${v.weight} - ₹${v.price} (MRP: ₹${v.originalPrice})</option>
            `).join('')}
          </select>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; margin-top: 1.5rem; padding-top: 1rem; border-top:1px solid var(--border-light);">
          <div>
            <div style="font-size:1.5rem; font-weight:800; color:var(--primary-dark); font-family:var(--font-heading);" id="modal-price-val">
              ₹${product.variants[0].price}
            </div>
            <div style="font-size:0.82rem; color:var(--text-light); text-decoration:line-through;" id="modal-mrp-val">
              ₹${product.variants[0].originalPrice}
            </div>
          </div>
          <button class="btn-primary" onclick="handleAddToCart('${product.id}', parseInt(document.getElementById('modal-variant-select').value, 10)); closeProductModal();">
            <i class="bi bi-bag-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function onModalVariantChange(productId, variantIndex) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const variant = product.variants[variantIndex];
  const priceVal = document.getElementById('modal-price-val');
  const mrpVal = document.getElementById('modal-mrp-val');

  if (priceVal) priceVal.textContent = `₹${variant.price}`;
  if (mrpVal) mrpVal.textContent = `₹${variant.originalPrice}`;
}

function closeProductModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const overlay = document.getElementById('product-modal-overlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ---------------- CHECKOUT & WHATSAPP ORDER ----------------

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast('Your cart is empty. Please add items to order.');
    return;
  }

  toggleCartDrawer(false);
  const overlay = document.getElementById('checkout-modal-overlay');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const overlay = document.getElementById('checkout-modal-overlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function selectPaymentMethod(method, element) {
  selectedPayment = method;
  document.querySelectorAll('.pay-option-card').forEach(card => card.classList.remove('active'));
  if (element) element.classList.add('active');

  const upiBox = document.getElementById('upi-qr-box');
  const upiImg = document.getElementById('upi-qr-image');

  if (method === 'upi') {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discount = appliedCoupon ? (appliedCoupon.discountType === 'percentage' ? Math.min((subtotal * appliedCoupon.value) / 100, appliedCoupon.maxDiscount) : appliedCoupon.value) : 0;
    const deliveryFee = subtotal >= STORE_CONFIG.freeDeliveryMin ? 0 : STORE_CONFIG.deliveryCharge;
    const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

    const upiUri = `upi://pay?pa=${STORE_CONFIG.upiId}&pn=${encodeURIComponent(STORE_CONFIG.storeName)}&am=${grandTotal}&cu=INR`;
    if (upiImg) {
      upiImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUri)}`;
    }
    if (upiBox) upiBox.style.display = 'block';
  } else {
    if (upiBox) upiBox.style.display = 'none';
  }
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('cust-name').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const address = document.getElementById('cust-address').value.trim();
  const notes = document.getElementById('cust-notes').value.trim();

  if (!name || !phone || !address) {
    showToast('Please fill in Name, Phone, and Address.');
    return;
  }

  // Calculate Totals
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? (appliedCoupon.discountType === 'percentage' ? Math.min((subtotal * appliedCoupon.value) / 100, appliedCoupon.maxDiscount) : appliedCoupon.value) : 0;
  const deliveryFee = subtotal >= STORE_CONFIG.freeDeliveryMin ? 0 : STORE_CONFIG.deliveryCharge;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  // Build WhatsApp Message String
  let message = `🛒 *NEW ORDER - ${STORE_CONFIG.storeName.toUpperCase()}* 🌿\n`;
  message += `--------------------------------\n`;
  message += `👤 *Customer:* ${name}\n`;
  message += `📞 *Phone:* ${phone}\n`;
  message += `📍 *Address:* ${address}\n`;
  if (notes) message += `📝 *Notes/Slot:* ${notes}\n`;
  message += `\n📦 *Order Items:*\n`;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} (${item.weight}) x ${item.quantity} = ₹${item.price * item.quantity}\n`;
  });

  message += `\n--------------------------------\n`;
  message += `💰 *Subtotal:* ₹${subtotal}\n`;
  if (appliedCoupon && discount > 0) {
    message += `🎟️ *Coupon (${appliedCoupon.code}):* -₹${Math.round(discount)}\n`;
  }
  message += `🚚 *Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}\n`;
  message += `⭐ *Grand Total: ₹${Math.round(grandTotal)}*\n`;
  message += `💳 *Payment Mode:* ${selectedPayment === 'cod' ? 'Cash on Delivery (COD)' : 'UPI / GPay / Paytm'}\n`;
  message += `--------------------------------\n`;
  message += `Please confirm my order and share dispatch details. Thank you!`;

  // Encode for URL
  const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

  // Clear Cart & Close Modal
  cart = [];
  appliedCoupon = null;
  saveCart();
  updateCartUI();
  closeCheckoutModal();

  showToast('Order details prepared! Opening WhatsApp...');
  window.open(waUrl, '_blank');
}

// ---------------- TOAST & UTILITIES ----------------

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="bi bi-info-circle-fill"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'ta' : 'en';
  
  const label = document.getElementById('current-lang-label');
  if (label) label.textContent = currentLanguage === 'en' ? 'தமிழ்' : 'English';

  const promoBanner = document.getElementById('promo-banner-text');
  const heroHeading = document.getElementById('hero-heading');
  const heroSubtext = document.getElementById('hero-subtext');
  const productsHeading = document.getElementById('products-heading');

  if (currentLanguage === 'ta') {
    if (promoBanner) promoBanner.textContent = '₹499க்கு மேல் அனைத்து ஆர்டர்களுக்கும் இலவச ஹோம் டெலிவரி!';
    if (heroHeading) heroHeading.innerHTML = 'பாரம்பரியமான & <span>இயற்கை மளிகைப் பொருட்கள்</span> உங்கள் இல்லத்திற்கு';
    if (heroSubtext) heroSubtext.textContent = 'மரச்செக்கு எண்ணெய், தூய நாட்டுப்பசு நெய், பாரம்பரிய அரிசி மற்றும் ஆரோக்கியமான இயற்கை பொருட்கள் நேரடி பண்ணை தரம்.';
    if (productsHeading) productsHeading.textContent = 'எங்கள் இயற்கை உற்பத்தி பொருட்கள்';
  } else {
    if (promoBanner) promoBanner.textContent = 'FREE Home Delivery on all orders above ₹499!';
    if (heroHeading) heroHeading.innerHTML = 'Pure, Traditional & <span>Organic Groceries</span> For Your Family';
    if (heroSubtext) heroSubtext.textContent = 'Experience the wholesome goodness of traditional wood-pressed oils, native grains, pure A2 desi cow ghee, and unadulterated spices delivered right to your doorstep.';
    if (productsHeading) productsHeading.textContent = 'Our Fresh & Pure Collection';
  }

  renderCategoryPills();
  renderFAQs();
  showToast(currentLanguage === 'ta' ? 'தமிழ் மொழிக்கு மாற்றப்பட்டது' : 'Switched to English');
}

// ---------------- EVENT LISTENERS SETUP ----------------

function setupEventListeners() {
  // Cart Drawer toggles
  const cartToggleBtn = document.getElementById('cart-drawer-toggle');
  if (cartToggleBtn) cartToggleBtn.addEventListener('click', () => toggleCartDrawer(true));

  const openCartBannerBtn = document.getElementById('open-cart-banner-btn');
  if (openCartBannerBtn) openCartBannerBtn.addEventListener('click', () => toggleCartDrawer(true));

  // Language Toggle
  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) langBtn.addEventListener('click', toggleLanguage);

  // Search input
  const searchInput = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearBtn) clearBtn.style.display = searchQuery ? 'inline' : 'none';
      renderProducts();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      clearBtn.style.display = 'none';
      renderProducts();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Coupon apply button
  const applyCouponBtn = document.getElementById('apply-coupon-btn');
  if (applyCouponBtn) applyCouponBtn.addEventListener('click', applyCoupon);

  // Checkout modal launch
  const proceedCheckoutBtn = document.getElementById('proceed-checkout-btn');
  if (proceedCheckoutBtn) proceedCheckoutBtn.addEventListener('click', openCheckoutModal);

  // Checkout form submission
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckoutSubmit);
}
