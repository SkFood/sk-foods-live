// SK Foods - B2B Wholesale Chicken & Poultry Supply Data Configuration

const STORE_CONFIG = {
  storeName: "SK Foods",
  supplyTitle: "Wholesale Poultry & Chicken Supply (B2B)",
  subtitle: "Daily Fresh Supply for Restaurants, Hotels, Dhabas, Mess & Caterers",
  phone: "+91 96297 73923",
  whatsappNumber: "919629773923", // Merchant WhatsApp number
  address: "Wholesale Poultry Market, Chennai & Statewide Delivery",
  nightOrderNotice: "🌙 Night Orders Open till 2:00 AM for Early Morning (5:00 AM - 7:00 AM) Delivery",
  
  // Connected Google Apps Script Web App URL for Automated Google Sheets sync
  googleSheetScriptUrl: "https://script.google.com/macros/s/AKfycbw1ER0bod32XB3wIqH1eZNlxJVDpNyOMTGoYGzlEomRVisEMcEdCrOkWIv6NlVXt33y/exec"
};

// Hotel / Business Categories
const HOTEL_TYPES = [
  "Non-Veg Restaurant (அசைவ உணவகம்)",
  "Biryani Speciality Hotel (பிரியாணி ஹோட்டல்)",
  "Dhaba / Highway Restaurant (தாபா)",
  "Mess / Military Hotel (மெஸ் / மிலிட்டரி ஹோட்டல்)",
  "Fast Food / Chinese Joint (பாஸ்ட் புட்)",
  "Catering / Event Functions (கேட்டரிங்)",
  "Tea & Snack Bar / Mini Hotel (மினி ஹோட்டல்)",
  "Other Wholesale Customer"
];

// Delivery Time Slots
const DELIVERY_SLOTS = [
  "Early Morning 4:30 AM - 5:30 AM (முாலை 4:30 - 5:30)",
  "Early Morning 5:30 AM - 6:30 AM (முாலை 5:30 - 6:30)",
  "Morning 6:30 AM - 7:30 AM (காலை 6:30 - 7:30)",
  "Morning 7:30 AM - 8:30 AM (காலை 7:30 - 8:30)",
  "Midday / Lunch Batch 11:30 AM (மதிய சப்ளை 11:30)"
];

// Cutting & Preparation Styles
const CUTTING_STYLES = [
  "Standard Curry Cut (சாதாரண குழம்பு கட்)",
  "Small Curry Cut (சிறிய கட் - கிரேவி & வறுவல்)",
  "Biryani 4-Pieces Cut (பிரியாணி 4 பீஸ் கட்)",
  "Biryani 8-Pieces Cut (பிரியாணி 8 பீஸ் கட்)",
  "Chilli / 65 Small Cut (சில்லி / 65 கட்)",
  "Whole Cleaned Bird (முழு கோழி கட் இன்றி)",
  "Custom / See Special Notes (குறிப்பில் குறிப்பிடப்பட்டுள்ளது)"
];

// 10 Core B2B Poultry Items
const POULTRY_ITEMS = [
  {
    id: "item_broiler_skinless",
    sheetColumnName: "Broiler Skinless (Kg)",
    name: "Broiler Chicken - Skinless (ஸ்கின்லெஸ் பிராய்லர்)",
    category: "broiler",
    unit: "Kg",
    step: 1,
    minOrder: 5,
    quickAddKgs: [5, 10, 25, 50],
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80",
    description: "Fresh skin-out broiler chicken, hygienically dressed and cleaned for restaurants, curries & gravies."
  },
  {
    id: "item_broiler_withskin",
    sheetColumnName: "Broiler With Skin (Kg)",
    name: "Broiler Chicken - With Skin (தோலுடன் பிராய்லர்)",
    category: "broiler",
    unit: "Kg",
    step: 1,
    minOrder: 5,
    quickAddKgs: [5, 10, 25, 50],
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=500&q=80",
    description: "Skin-on whole dressed broiler chicken. Ideal for traditional roast, grill, tandoor and dhabas."
  },
  {
    id: "item_boneless_breast",
    sheetColumnName: "Boneless Breast (Kg)",
    name: "Boneless Breast Fillet (போன்லெஸ் பிரஸ்ட் கட்)",
    category: "special-cuts",
    unit: "Kg",
    step: 1,
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80",
    description: "100% tender boneless breast meat. Perfect for Chilli Chicken, Chicken 65, Tikka, Shawarma & Fast food."
  },
  {
    id: "item_leg_thigh_cuts",
    sheetColumnName: "Leg & Thigh Pieces (Kg)",
    name: "Leg & Thigh Pieces (லெக் & தொடை பீஸ்)",
    category: "special-cuts",
    unit: "Kg",
    step: 1,
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=500&q=80",
    description: "Juicy leg quarters and drumsticks. Preferred for Biryani, Leg Roast, and Tandoori chicken."
  },
  {
    id: "item_chicken_lollipop",
    sheetColumnName: "Chicken Lollipop (Kg/Pcs)",
    name: "Chicken Lollipop Cuts (சிக்கன் லாலிபாப்)",
    category: "special-cuts",
    unit: "Kg",
    step: 1,
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 15],
    image: "https://images.unsplash.com/photo-1527477245898-df6519f97750?auto=format&fit=crop&w=500&q=80",
    description: "Frenched winglets expertly trimmed for restaurant Chicken Lollipop and Wing appetizers."
  },
  {
    id: "item_chicken_wings",
    sheetColumnName: "Chicken Wings (Kg)",
    name: "Chicken Wings (சிக்கன் விங்ஸ்)",
    category: "special-cuts",
    unit: "Kg",
    step: 1,
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1527477245898-df6519f97750?auto=format&fit=crop&w=500&q=80",
    description: "Full tender wings with tip/flat portions. Best suited for Fried Chicken, Chinese gravies & snacks."
  },
  {
    id: "item_country_chicken",
    sheetColumnName: "Country Chicken / Naatu Kozhi (Kg)",
    name: "Country Chicken / Naatu Kozhi (நாட்டுக்கோழி)",
    category: "country-special",
    unit: "Kg",
    step: 1,
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1548567117-0429f55e54d8?auto=format&fit=crop&w=500&q=80",
    description: "Genuine free-range farm country chicken. Dressed fresh for authentic Naatu Kozhi soup and kulambu."
  },
  {
    id: "item_liver_gizzard",
    sheetColumnName: "Liver & Gizzard (Kg)",
    name: "Chicken Liver & Gizzard (ஈரல் & ஜிizzard)",
    category: "offal",
    unit: "Kg",
    step: 1,
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 15],
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80",
    description: "Freshly separated and cleaned chicken liver and gizzard. High demand for fry, gravy, and side dishes."
  },
  {
    id: "item_chicken_keema",
    sheetColumnName: "Chicken Minced / Keema (Kg)",
    name: "Chicken Minced / Keema (சிக்கன் கீமா)",
    category: "special-cuts",
    unit: "Kg",
    step: 1,
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80",
    description: "Fine minced chicken meat for Keema dosa, rolls, samosa fillings, meatballs, and burgers."
  },
  {
    id: "item_farm_eggs_tray",
    sheetColumnName: "Farm Eggs (Trays - 30 Pcs)",
    name: "Farm Fresh Eggs Tray (முட்டை டிரே - 30 pcs)",
    category: "eggs",
    unit: "Tray",
    step: 1,
    minOrder: 1,
    quickAddKgs: [1, 2, 5, 10],
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=500&q=80",
    description: "Standard 30-eggs poultry tray. Fresh daily supply for egg fried rice, parotta, omelette & biryani."
  }
];
