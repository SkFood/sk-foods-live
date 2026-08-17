// SK Foods - B2B Wholesale Poultry Supply Configuration & Catalog (15 Items Total)

const STORE_CONFIG = {
  storeName: "SK Foods",
  tagline: "Farm Fresh Wholesale Poultry Supply",
  supplyTitle: "Wholesale Poultry & Chicken Supply (B2B)",
  phone: "+91 96297 73923",
  whatsappNumber: "919629773923", // Merchant WhatsApp number
  address: "Wholesale Poultry Market, Chennai & Statewide Delivery",
  nightOrderNotice: "🌙 Booking Open: 3:00 PM - 8:00 PM for Early Morning Delivery",
  
  // Connected Google Apps Script Web App URL for Automated Google Sheets sync
  googleSheetScriptUrl: "https://script.google.com/macros/s/AKfycbwC4-dC2HAAjou6fGHhoa9SxRsvz1tGoYLtdcoAYvX1xkl-ZsAmjFEEFL8tytPgL9_Q/exec"
};

// Hotel / Business Categories (Exact User Order)
const HOTEL_TYPES = [
  "Restaurant",
  "Dhaba",
  "Hotels",
  "Mess",
  "Fast Food",
  "mini Shop",
  "Catering & Events",
  "Others"
];

// Delivery Slots (Early Morning B2B Supply)
const DELIVERY_SLOTS = [
  "Early Morning 4:30 AM - 5:30 AM",
  "Early Morning 5:30 AM - 6:30 AM",
  "Morning 6:30 AM - 7:30 AM",
  "Morning 7:30 AM - 8:30 AM",
  "Midday / Lunch Batch 11:30 AM"
];

// Cutting & Preparation Styles
const CUTTING_STYLES = [
  "Standard Curry Cut",
  "Small Curry Cut (For Gravy / Fry)",
  "Biryani 4-Pieces Cut",
  "Biryani 8-Pieces Cut",
  "Chilli / 65 Small Cut",
  "Whole Cleaned Bird (No Cut)",
  "Custom / See Special Notes"
];

// SK Foods - B2B Wholesale Poultry Products (Exact 13 Items)
const POULTRY_ITEMS = [
  {
    id: "item_ws_briyani_cut",
    sheetColumnName: "W/S Briyani Cut (Kg)",
    name: "W/S Briyani Cut",
    category: "curry-cuts",
    unit: "Kg",
    minOrder: 5,
    quickAddKgs: [5, 10, 25, 50],
    image: "images/ws_briyani_cut.jpg",
    description: "Skin-on large juicy cuts specially portioned for Dum & Hotel Biryani."
  },
  {
    id: "item_ws_curry_cut",
    sheetColumnName: "W/S Curry Cut (Kg)",
    name: "W/S Curry Cut",
    category: "curry-cuts",
    unit: "Kg",
    minOrder: 5,
    quickAddKgs: [5, 10, 25, 50],
    image: "images/ws_curry_cut.jpg",
    description: "Standard medium skin-on curry pieces for gravies, curries & dhabas."
  },
  {
    id: "item_skinless_curry_cut",
    sheetColumnName: "Skinless Curry Cut (Kg)",
    name: "Skinless Curry Cut",
    category: "curry-cuts",
    unit: "Kg",
    minOrder: 5,
    quickAddKgs: [5, 10, 25, 50],
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80",
    description: "Fresh skin-out broiler chicken pieces, hygienically dressed and cleaned for restaurant gravies."
  },
  {
    id: "item_tandoori_without_neck",
    sheetColumnName: "Tandoori Without Neck (Kg/Birds)",
    name: "Tandoori (Without Neck)",
    category: "curry-cuts",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "images/tandoori_without_neck.jpg",
    description: "Whole skinless dressed chicken (900g-1.2kg) without neck, pre-cut and scored for Tandoori."
  },
  {
    id: "item_grill_chicken",
    sheetColumnName: "Grill Chicken (Kg/Birds)",
    name: "Grill Chicken",
    category: "curry-cuts",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=500&q=80",
    description: "Whole skin-on dressed chicken (900g-1.2kg) calibrated for rotisserie, shawarma & charcoal grill."
  },
  {
    id: "item_lollipop",
    sheetColumnName: "Lollipop (Kg)",
    name: "Lollipop",
    category: "boneless-special",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 15],
    image: "images/chicken_lollipop.jpg",
    description: "Frenched winglet cuts expertly shaped for restaurant Chicken Lollipop starters."
  },
  {
    id: "item_boneless_breast",
    sheetColumnName: "Boneless Breast (Kg)",
    name: "Boneless Breast",
    category: "boneless-special",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=500&q=80",
    description: "100% pure tender boneless breast meat. Perfect for Chilli Chicken, Chicken 65 & Shawarma."
  },
  {
    id: "item_leg_boneless",
    sheetColumnName: "Leg Boneless (Kg)",
    name: "Leg Boneless",
    category: "boneless-special",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "images/leg_boneless.jpg",
    description: "Juicy dark meat boneless leg thigh fillets for tikkas, kebabs and restaurant gravies."
  },
  {
    id: "item_drumstick_ws",
    sheetColumnName: "Drumstick W/S (Kg)",
    name: "Drumstick (W/S)",
    category: "boneless-special",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80",
    description: "Skin-on meaty chicken drumsticks. Prime selection for crispy fry, barbecue & roasts."
  },
  {
    id: "item_drumstick_skinless",
    sheetColumnName: "Drumstick Skinless (Kg)",
    name: "Drumstick (Skinless)",
    category: "boneless-special",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?auto=format&fit=crop&w=500&q=80",
    description: "Skinless cleaned uniform drumstick leg pieces for gravies, Tandoori & biryani."
  },
  {
    id: "item_janatha",
    sheetColumnName: "Janatha (Kg)",
    name: "Janatha",
    category: "curry-cuts",
    unit: "Kg",
    minOrder: 5,
    quickAddKgs: [5, 10, 25, 50],
    image: "images/janatha_chicken.jpg",
    description: "Economical wholesale dressed chicken batch for high-volume mess, fast food & catering."
  },
  {
    id: "item_liver",
    sheetColumnName: "Liver (Kg)",
    name: "Liver",
    category: "offal",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 15],
    image: "images/chicken_liver.jpg",
    description: "Freshly cleaned chicken liver, separated fresh daily for fry, masala & side dishes."
  },
  {
    id: "item_gizzard",
    sheetColumnName: "Gizzard (Kg)",
    name: "Gizzard",
    category: "offal",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 15],
    image: "images/chicken_gizzard.jpg",
    description: "Freshly dressed chicken gizzards, thoroughly washed and cleaned for pepper fry."
  }
];
