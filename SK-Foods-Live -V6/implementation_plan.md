# SK Foods - Grocery & Organic Products Online Store

A premium, responsive, and feature-rich E-commerce website for **SK Foods** focusing on Organic & Farm Fresh Groceries, ready for 100% free hosting on **GitHub Pages**.

## Proposed Features

1. **Header & Navigation**:
   - Brand Logo ("SK Foods Organic & Groceries")
   - Category navigation & Quick search bar with instant autocomplete
   - Cart counter badge with live total & slide-over Cart Drawer
   - Language selector (English / தமிழ்)

2. **Hero & Promotional Sections**:
   - Interactive hero banner with seasonal offers, farm-fresh highlights, and CTA ("Shop Now")
   - Trust Badges: 100% Certified Organic, Direct from Farmers, Same-Day Delivery, Eco-friendly Packaging

3. **Product Catalog & Interactive Store**:
   - Category Tabs (All, Fresh Veggies & Fruits, Cold Pressed Oils & Ghee, Millets & Traditional Grains, Spices & Masalas, Dry Fruits & Nuts)
   - Product Cards with discounts, weight selector (500g, 1kg, 2kg, etc.), stock status, star ratings, and "Add to Cart" button with animated micro-feedback
   - Quick View / Product Detail Modal with nutrition info, health benefits, and gallery

4. **Cart & Direct WhatsApp Checkout**:
   - Slide-over Cart Drawer showing line items, itemized price, delivery fee calculator (e.g. Free delivery over ₹500), coupon code discount
   - Seamless WhatsApp Order Integration: Generates a neatly formatted order message sent directly to your WhatsApp number
   - UPI QR Code & Cash on Delivery options ready for Indian local markets

5. **Customer Experience & Polish**:
   - Customer Reviews & Ratings section
   - Interactive FAQs & Delivery Policy
   - Location / Contact info & Google Maps placeholder
   - LocalStorage persistence so customers don't lose their cart items

## File Structure

- [NEW] [`index.html`](file:///c:/SK-Foods-Live%20-V6/index.html) - Main semantic HTML5 markup
- [NEW] [`style.css`](file:///c:/SK-Foods-Live%20-V6/style.css) - Premium CSS design system (tokens, glassmorphism, responsive grid, animations)
- [NEW] [`data.js`](file:///c:/SK-Foods-Live%20-V6/data.js) - Complete organic product catalog dataset with descriptions, prices, weights, categories
- [NEW] [`app.js`](file:///c:/SK-Foods-Live%20-V6/app.js) - Complete shopping cart, filter, search, modal, and WhatsApp checkout logic
- [NEW] [`README.md`](file:///c:/SK-Foods-Live%20-V6/README.md) - Simple step-by-step guide to upload and activate GitHub Pages for free

## Verification Plan

### Manual Verification
1. Test responsive layout across mobile and desktop viewports.
2. Verify dynamic search, category filtering, and sorting.
3. Test adding, updating, and removing items from the cart.
4. Verify coupon discount calculation and cart state saving in localStorage.
5. Test WhatsApp checkout message generation and UPI payment modal.
6. Check browser console for zero JS errors.
