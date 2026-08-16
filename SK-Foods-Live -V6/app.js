// SK Foods - B2B Wholesale Poultry Order Logic & Google Sheets Integration

// State
let orderQuantities = {}; // { item_id: number }
let hotelProfile = JSON.parse(localStorage.getItem('sk_hotel_profile') || '{}');
let activeCategory = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  initB2BPortal();
});

function initB2BPortal() {
  renderDropdownOptions();
  renderPoultryItems();
  updateHotelProfileBanner();
  updateStickySummary();
}

// ---------------- RENDER DROPDOWN OPTIONS ----------------

function renderDropdownOptions() {
  const hotelTypeSelect = document.getElementById('form-hotel-type');
  if (hotelTypeSelect) {
    hotelTypeSelect.innerHTML = HOTEL_TYPES.map(t => `<option value="${t}">${t}</option>`).join('');
  }

  const slotSelect = document.getElementById('form-delivery-slot');
  if (slotSelect) {
    slotSelect.innerHTML = DELIVERY_SLOTS.map(s => `<option value="${s}">${s}</option>`).join('');
  }

  const cuttingSelect = document.getElementById('form-cutting-style');
  if (cuttingSelect) {
    cuttingSelect.innerHTML = CUTTING_STYLES.map(c => `<option value="${c}">${c}</option>`).join('');
  }
}

// ---------------- CATEGORY & SEARCH FILTERING ----------------

function filterByCategory(categoryId, buttonElement) {
  activeCategory = categoryId;
  document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
  if (buttonElement) buttonElement.classList.add('active');
  renderPoultryItems();
}

function handleSearchFilter(query) {
  searchQuery = query.toLowerCase().trim();
  renderPoultryItems();
}

// ---------------- RENDER POULTRY ITEMS ----------------

function renderPoultryItems() {
  const grid = document.getElementById('poultry-items-grid');
  if (!grid) return;

  const filteredItems = POULTRY_ITEMS.filter(item => {
    const matchesCategory = (activeCategory === 'all') || (item.category === activeCategory);
    const matchesSearch = (!searchQuery) || 
                          item.name.toLowerCase().includes(searchQuery) || 
                          item.description.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filteredItems.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3.5rem 1rem; background: white; border-radius: 16px; border: 1.5px dashed #cbd5e1;">
        <i class="bi bi-search" style="font-size: 2.5rem; color: #94a3b8; display: block; margin-bottom: 0.75rem;"></i>
        <h4 style="color: var(--text-main); margin-bottom: 0.35rem;">No poultry items match your search</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Try searching for another item or click 'All Items'.</p>
        <button class="btn-step" style="width: auto; padding: 0.5rem 1.25rem; margin-top: 1rem; font-size: 0.88rem; background: var(--brand-red); color: white; border: none;" onclick="filterByCategory('all'); document.getElementById('item-search-input').value='';">
          Show All Items
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredItems.map(item => {
    const qty = orderQuantities[item.id] || 0;
    const hasOrderedClass = qty > 0 ? 'has-ordered' : '';

    return `
      <div class="item-card ${hasOrderedClass}" id="card-${item.id}">
        <div class="item-card-header">
          <div class="item-media">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
          </div>
          <div class="item-details">
            <h4 class="item-title">${item.name}</h4>
            <p class="item-desc">${item.description}</p>
            <span class="item-unit-badge">Unit: ${item.unit}</span>
          </div>
        </div>

        <div class="stepper-row">
          <span class="stepper-title">Required ${item.unit}:</span>
          <div class="stepper-actions">
            <button type="button" class="btn-step" onclick="adjustItemQty('${item.id}', -1)" aria-label="Decrease quantity">-</button>
            <input 
              type="number" 
              class="input-stepper-val" 
              id="input-${item.id}" 
              value="${qty}" 
              min="0" 
              step="1"
              oninput="onManualQtyChange('${item.id}', this.value)"
            >
            <button type="button" class="btn-step" onclick="adjustItemQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
          </div>
        </div>

        <div class="bulk-chips-wrapper">
          <span class="bulk-chip-title">Quick Add:</span>
          ${item.quickAddKgs.map(k => `
            <button type="button" class="bulk-chip" onclick="quickSetQty('${item.id}', ${k})">+${k} ${item.unit}</button>
          `).join('')}
          ${qty > 0 ? `
            <button type="button" class="bulk-chip chip-clear" onclick="quickSetQty('${item.id}', 0)">Clear</button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function adjustItemQty(itemId, delta) {
  const current = orderQuantities[itemId] || 0;
  const newQty = Math.max(0, current + delta);
  setQty(itemId, newQty);
}

function quickSetQty(itemId, value) {
  if (value === 0) {
    setQty(itemId, 0);
  } else {
    const current = orderQuantities[itemId] || 0;
    setQty(itemId, current + value);
  }
}

function onManualQtyChange(itemId, val) {
  const parsed = parseFloat(val);
  const qty = isNaN(parsed) || parsed < 0 ? 0 : parsed;
  orderQuantities[itemId] = qty;
  updateCardState(itemId, qty);
  updateStickySummary();
}

function setQty(itemId, qty) {
  orderQuantities[itemId] = qty;
  const input = document.getElementById(`input-${itemId}`);
  if (input) input.value = qty;
  updateCardState(itemId, qty);
  updateStickySummary();
}

function updateCardState(itemId, qty) {
  const card = document.getElementById(`card-${itemId}`);
  if (card) {
    if (qty > 0) {
      card.classList.add('has-ordered');
    } else {
      card.classList.remove('has-ordered');
    }
  }
}

// ---------------- STICKY MOBILE SUMMARY BAR ----------------

function updateStickySummary() {
  let totalKgs = 0;
  let eggTrays = 0;
  let itemsCount = 0;

  POULTRY_ITEMS.forEach(item => {
    const qty = orderQuantities[item.id] || 0;
    if (qty > 0) {
      itemsCount += 1;
      if (item.unit === 'Tray') {
        eggTrays += qty;
      } else {
        totalKgs += qty;
      }
    }
  });

  const qtyText = document.getElementById('sticky-total-qty-text');
  const countText = document.getElementById('sticky-items-count-text');
  const orderBtn = document.getElementById('open-order-modal-btn');

  let displaySummary = '';
  if (totalKgs > 0 && eggTrays > 0) {
    displaySummary = `${totalKgs} Kg + ${eggTrays} Trays`;
  } else if (totalKgs > 0) {
    displaySummary = `${totalKgs} Kg Weight`;
  } else if (eggTrays > 0) {
    displaySummary = `${eggTrays} Trays`;
  } else {
    displaySummary = `0.0 Kg`;
  }

  if (qtyText) qtyText.textContent = displaySummary;
  if (countText) countText.textContent = `${itemsCount} item${itemsCount === 1 ? '' : 's'} selected`;

  if (orderBtn) {
    if (itemsCount > 0) {
      orderBtn.removeAttribute('disabled');
    } else {
      orderBtn.setAttribute('disabled', 'true');
    }
  }
}

// ---------------- ORDER REVIEW MODAL ----------------

function openOrderModal() {
  const selectedItems = POULTRY_ITEMS.filter(item => (orderQuantities[item.id] || 0) > 0);
  
  if (selectedItems.length === 0) {
    showToast('Please select at least one item quantity to place an order.');
    return;
  }

  let totalKgs = 0;
  let eggTrays = 0;

  selectedItems.forEach(item => {
    const qty = orderQuantities[item.id] || 0;
    if (item.unit === 'Tray') {
      eggTrays += qty;
    } else {
      totalKgs += qty;
    }
  });

  const reviewList = document.getElementById('modal-review-items-list');
  if (reviewList) {
    let rowsHtml = `
      <div class="receipt-header-row">
        <span>Selected Item</span>
        <span>Quantity (Units)</span>
      </div>
    `;

    rowsHtml += selectedItems.map(item => `
      <div class="receipt-item-row">
        <span class="receipt-item-name">${item.name}</span>
        <span class="receipt-item-val">${orderQuantities[item.id]} ${item.unit}</span>
      </div>
    `).join('');

    let totalText = totalKgs > 0 && eggTrays > 0 ? `${totalKgs} Kg + ${eggTrays} Trays` : (totalKgs > 0 ? `${totalKgs} Kg` : `${eggTrays} Trays`);
    rowsHtml += `
      <div class="receipt-grand-total">
        <span class="grand-total-label">⭐ TOTAL ORDER WEIGHT:</span>
        <span class="grand-total-val">${totalText}</span>
      </div>
    `;

    reviewList.innerHTML = rowsHtml;
  }

  if (hotelProfile.hotelName) {
    document.getElementById('form-hotel-name').value = hotelProfile.hotelName || '';
    document.getElementById('form-hotel-type').value = hotelProfile.hotelType || HOTEL_TYPES[0];
    document.getElementById('form-contact-person').value = hotelProfile.contactPerson || '';
    document.getElementById('form-phone').value = hotelProfile.phone || '';
    document.getElementById('form-address').value = hotelProfile.address || '';
  }

  const overlay = document.getElementById('order-modal-overlay');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const overlay = document.getElementById('order-modal-overlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ---------------- HOTEL PROFILE MANAGEMENT ----------------

function updateHotelProfileBanner() {
  const hotelNameEl = document.getElementById('banner-hotel-name');
  const hotelMetaEl = document.getElementById('banner-hotel-meta');
  const savedHotelLabel = document.getElementById('saved-hotel-label');

  if (hotelProfile.hotelName) {
    if (hotelNameEl) hotelNameEl.textContent = `🏨 ${hotelProfile.hotelName}`;
    if (hotelMetaEl) hotelMetaEl.textContent = `Contact: ${hotelProfile.contactPerson || 'Chef'} | ${hotelProfile.phone || ''} | ${hotelProfile.address || ''}`;
    if (savedHotelLabel) savedHotelLabel.textContent = hotelProfile.hotelName;
  }
}

function openProfileModal() {
  document.getElementById('quick-hotel-name').value = hotelProfile.hotelName || '';
  document.getElementById('quick-contact-person').value = hotelProfile.contactPerson || '';
  document.getElementById('quick-phone').value = hotelProfile.phone || '';
  document.getElementById('quick-address').value = hotelProfile.address || '';

  const overlay = document.getElementById('profile-modal-overlay');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProfileModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const overlay = document.getElementById('profile-modal-overlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function saveProfileSettings(e) {
  e.preventDefault();
  hotelProfile = {
    hotelName: document.getElementById('quick-hotel-name').value.trim(),
    contactPerson: document.getElementById('quick-contact-person').value.trim(),
    phone: document.getElementById('quick-phone').value.trim(),
    address: document.getElementById('quick-address').value.trim()
  };

  localStorage.setItem('sk_hotel_profile', JSON.stringify(hotelProfile));
  updateHotelProfileBanner();
  closeProfileModal();
  showToast('Hotel profile saved successfully!');
}

// ---------------- SUBMIT ORDER (GOOGLE SHEETS + WHATSAPP) ----------------

async function handleOrderSubmission(e) {
  e.preventDefault();

  const hotelName = document.getElementById('form-hotel-name').value.trim();
  const hotelType = document.getElementById('form-hotel-type').value;
  const contactPerson = document.getElementById('form-contact-person').value.trim();
  const phone = document.getElementById('form-phone').value.trim();
  const address = document.getElementById('form-address').value.trim();
  const deliverySlot = document.getElementById('form-delivery-slot').value;
  const cuttingStyle = document.getElementById('form-cutting-style').value;
  const notes = document.getElementById('form-notes').value.trim();

  // Save profile for future
  hotelProfile = { hotelName, hotelType, contactPerson, phone, address };
  localStorage.setItem('sk_hotel_profile', JSON.stringify(hotelProfile));
  updateHotelProfileBanner();

  // Build items mapping & Summary String for Google Sheet
  const itemsMap = {};
  let totalKgs = 0;
  let eggTrays = 0;
  const orderedItemsList = [];
  const summaryParts = [];

  POULTRY_ITEMS.forEach(item => {
    const qty = orderQuantities[item.id] || 0;
    itemsMap[item.sheetColumnName] = qty > 0 ? `${qty}` : "0";
    
    if (qty > 0) {
      if (item.unit === 'Tray') {
        eggTrays += qty;
      } else {
        totalKgs += qty;
      }
      orderedItemsList.push({
        name: item.name,
        qty: qty,
        unit: item.unit
      });
      summaryParts.push(`${item.name.split('(')[0].trim()}: ${qty} ${item.unit}`);
    }
  });

  if (orderedItemsList.length === 0) {
    showToast('No items selected!');
    return;
  }

  let totalUnitsText = totalKgs > 0 && eggTrays > 0 ? `${totalKgs} Kg + ${eggTrays} Trays` : (totalKgs > 0 ? `${totalKgs} Kg` : `${eggTrays} Trays`);

  const submitBtn = document.getElementById('submit-order-btn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="bi bi-arrow-repeat spin"></i> Logging Order to Google Sheets...`;
  }

  // 1. Prepare Google Sheets Payload
  const now = new Date();
  const timestamp = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString('en-GB');

  const sheetPayload = {
    timestamp: timestamp,
    hotelName: hotelName,
    hotelType: hotelType,
    contactPerson: contactPerson,
    phone: phone,
    address: address,
    deliverySlot: deliverySlot,
    cuttingStyle: cuttingStyle,
    items: itemsMap,
    itemsSummary: summaryParts.join(' | '),
    totalUnits: totalUnitsText,
    notes: notes || '-'
  };

  const payloadString = JSON.stringify(sheetPayload);

  // Send to Google Sheets via Fetch + Hidden Form Target
  if (STORE_CONFIG.googleSheetScriptUrl && STORE_CONFIG.googleSheetScriptUrl.startsWith('https://script.google.com')) {
    // Method A: Direct Fetch
    try {
      fetch(STORE_CONFIG.googleSheetScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payloadString
      }).catch(err => console.log(err));
    } catch (e) {}

    // Method B: Hidden Form Submission via iframe (bypasses browser CORS completely)
    try {
      const hiddenForm = document.createElement('form');
      hiddenForm.action = STORE_CONFIG.googleSheetScriptUrl;
      hiddenForm.method = 'POST';
      hiddenForm.target = 'hidden_sheet_iframe';
      hiddenForm.style.display = 'none';

      const payloadInput = document.createElement('input');
      payloadInput.type = 'hidden';
      payloadInput.name = 'payload';
      payloadInput.value = payloadString;

      hiddenForm.appendChild(payloadInput);
      document.body.appendChild(hiddenForm);
      hiddenForm.submit();
      setTimeout(() => hiddenForm.remove(), 2000);
    } catch (e) {}
  }

  // 2. WhatsApp Message with clear Item Details & Total Weight
  let waMessage = `🍗 *${STORE_CONFIG.storeName.toUpperCase()} - WHOLESALE CHICKEN ORDER* 🌿\n`;
  waMessage += `----------------------------------------\n`;
  waMessage += `🏨 *Hotel / Restaurant:* ${hotelName}\n`;
  waMessage += `📋 *Category:* ${hotelType}\n`;
  waMessage += `👤 *Chef / Contact:* ${contactPerson}\n`;
  waMessage += `📞 *Phone:* ${phone}\n`;
  waMessage += `📍 *Delivery Area:* ${address}\n`;
  waMessage += `⏰ *Delivery Time:* ${deliverySlot}\n`;
  waMessage += `🔪 *Cutting Style:* ${cuttingStyle}\n`;
  waMessage += `\n📦 *ORDERED ITEMS DETAILS:*\n`;

  orderedItemsList.forEach((item, index) => {
    waMessage += `${index + 1}. *${item.name}*: ${item.qty} ${item.unit}\n`;
  });

  waMessage += `\n----------------------------------------\n`;
  waMessage += `⭐ *TOTAL ORDER WEIGHT:* ${totalUnitsText}\n`;
  if (notes) {
    waMessage += `📝 *Special Notes:* ${notes}\n`;
  }
  waMessage += `----------------------------------------\n`;
  waMessage += `Please confirm this early morning supply booking. Thank you!`;

  const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

  // Reset order
  orderQuantities = {};
  renderPoultryItems();
  updateStickySummary();
  closeOrderModal();

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="bi bi-send-check-fill"></i> <span>Confirm & Send Order (Google Sheets + WhatsApp)</span>`;
  }

  showToast(`Order recorded for ${totalUnitsText}! Opening WhatsApp...`);
  window.open(waUrl, '_blank');
}

// ---------------- TOAST NOTIFICATIONS ----------------

function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg-card';
  toast.innerHTML = `<i class="bi bi-check2-circle" style="color:#22c55e; font-size:1.15rem;"></i> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
