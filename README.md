# 🍗 SK Foods - B2B Wholesale Chicken & Poultry Supply Web Portal

Dedicated mobile-first B2B wholesale poultry supply web app for **Restaurants, Hotels, Dhabas, Biryani Centers, Mess, and Fast Food Outlets**.

---

## 🌟 Key Features

1. **📱 100% Mobile-First High-Speed UI/UX**:
   - Designed for hotel managers and chefs ordering on smartphones late at night.
   - 1-tap quick add bulk chips (`+5 Kg`, `+10 Kg`, `+25 Kg`, `+50 Kg`) and numeric stepper.
   - Sticky bottom mobile summary bar showing live total Kgs.

2. **🚫 NO PRICE IN BILL (Only Units & Kgs)**:
   - Daily fluctuating poultry rates are handled via wholesale terms.
   - The web app and bills strictly track **Quantities & Weights in Kg / Trays** with zero price confusion.

3. **📊 100% Automated Google Sheet Logging (13-Item Columns)**:
   - Every hotel order automatically creates a structured row in your Google Sheet with separate columns for each of the exact 13 poultry items:
     - `W/S Briyani Cut (Kg)`
     - `W/S Curry Cut (Kg)`
     - `Skinless Curry Cut (Kg)`
     - `Tandoori Without Neck (Kg/Birds)`
     - `Grill Chicken (Kg/Birds)`
     - `Lollipop (Kg)`
     - `Boneless Breast (Kg)`
     - `Leg Boneless (Kg)`
     - `Drumstick W/S (Kg)`
     - `Drumstick Skinless (Kg)`
     - `Janatha (Kg)`
     - `Liver (Kg)`
     - `Gizzard (Kg)`
     - *Plus Hotel Name, Contact, Phone, Delivery Slot, Cutting Style, Total Kgs, Notes, and Merchant Call Confirmation Status (`📞 Pending Merchant Call Confirmation`).*

4. **📲 Instant WhatsApp Bill Dispatch**:
   - Simultaneously prepares a formatted receipt and opens WhatsApp for instant order confirmation.

---

## 🚀 Google Sheets 100% Free Setup (2 Minutes Step-by-Step)

### Step 1: Create a Google Spreadsheet
1. Open [Google Sheets](https://sheets.google.com) and click **+ Blank Spreadsheet**.
2. Name it: `SK Foods - Daily Hotel Chicken Orders`.

### Step 2: Add Google Apps Script
1. In the Google Sheets top menu, click **Extensions** -> **Apps Script**.
2. Delete any default code in `Code.gs`.
3. Open the [`google_apps_script.js`](./google_apps_script.js) file from this folder, copy all code, and paste it into Apps Script.
4. Click the **Save** icon (💾).

### Step 3: Deploy as Web App
1. Click the blue **Deploy** button (top right) -> **New deployment**.
2. Click the gear icon (⚙️) next to *Select type* and choose **Web app**.
3. Set:
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone` *(Crucial!)*
4. Click **Deploy** and authorize access if prompted.
5. Copy the generated **Web app URL** (e.g. `https://script.google.com/macros/s/.../exec`).

### Step 4: Paste URL into `data.js`
1. Open [`data.js`](./data.js) and paste your URL:
   ```javascript
   STORE_CONFIG.googleSheetScriptUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
   ```
2. Also check that `STORE_CONFIG.whatsappNumber` has your WhatsApp number (e.g. `919876543210`).

---

## 🌐 Updating GitHub Pages

1. Go to your GitHub repository: `https://github.com/SkFood/sk-foods-live`
2. Click **Add file ▾** -> **Upload files**.
3. Drag & drop the updated `index.html`, `style.css`, `data.js`, `app.js`, and `README.md`.
4. Click **Commit changes**.
5. Within 1 minute, your updated B2B Chicken Supply portal will be live at:
   👉 **`https://skfood.github.io/sk-foods-live/`**
