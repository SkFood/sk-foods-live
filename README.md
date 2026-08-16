# 🌿 SK Foods - Organic & Farm Fresh Groceries Online Store

A fast, responsive, modern E-Commerce web application built for **SK Foods** with zero backend hosting costs. Fully optimized for **100% Free Hosting on GitHub Pages**.

---

## 🌟 Key Features

1. **🛍️ Product Catalog & Variants**:
   - Multiple weight/size options (e.g. 500ml / 1L / 5L for oils, 250g / 500g / 1kg for millets & spices).
   - Dynamic price calculation based on selected variant.
   - Quick View Modal with health highlights, certified organic tags, and customer ratings.

2. **📱 Instant WhatsApp Ordering**:
   - Converts the customer's cart items, quantities, coupon discount, delivery fee, and address into a neat receipt.
   - One-click order dispatch straight to the merchant's WhatsApp.

3. **💳 Payment Modes & UPI QR**:
   - Cash on Delivery (COD) mode.
   - Dynamic UPI QR Code generator for Google Pay, PhonePe, Paytm, BHIM.

4. **🎟️ Discount Coupons & Free Delivery Tracker**:
   - Pre-configured discount coupons (`SKFIRST`, `ORGANIC50`, `FARM100`).
   - Interactive progress bar for Free Delivery above ₹499.

5. **🌐 Bilingual Support**:
   - One-click toggle between English and Tamil (தமிழ்).

6. **⚡ Zero Hosting Cost (100% Free)**:
   - Built with pure HTML5, CSS3, and modern JavaScript.
   - Runs directly on GitHub Pages with 0 server maintenance charges.

---

## 🚀 How to Host for FREE on GitHub Pages (தமிழ் & English)

### Step 1: Create a GitHub Account & Repository
1. Go to [github.com](https://github.com/) and sign up or sign in (Free).
2. Click **New Repository** (`+` icon at top right).
3. Name your repository (e.g., `sk-foods` or `organic-store`).
4. Set visibility to **Public** and click **Create Repository**.

### Step 2: Upload Website Files
1. On your new repository page, click **Upload files**.
2. Drag and drop all the files from this folder (`index.html`, `style.css`, `app.js`, `data.js`).
3. Click **Commit changes**.

### Step 3: Enable GitHub Pages (Free Hosting)
1. In your GitHub repository, click on **Settings** (top tab).
2. In the left sidebar, click on **Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**.
5. Within 1 minute, your website will be LIVE at:
   `https://<your-username>.github.io/<repository-name>/`

---

## 🛠️ How to Customize Your Store Details

Open `data.js` to easily change:
- **Merchant WhatsApp number**: Change `STORE_CONFIG.whatsappNumber` to your own number (e.g., `919876543210`).
- **Store Name & Address**: Update `STORE_CONFIG.storeName` and `STORE_CONFIG.address`.
- **UPI ID**: Set your own UPI ID in `STORE_CONFIG.upiId` (e.g., `yourname@okaxis` or `merchant@upi`).
- **Products & Prices**: Add, edit, or delete items inside the `PRODUCTS` list in `data.js`.

---

## 💻 Local Testing

You can open `index.html` directly in any web browser (Chrome, Edge, Safari, Firefox), or run a lightweight local server:

```powershell
# In PowerShell / Terminal:
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```
