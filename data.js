// SK Foods - B2B Wholesale Poultry Supply Configuration & Catalog (15 Items Total)

const STORE_CONFIG = {
  storeName: "SK Foods",
  tagline: "Farm Fresh Wholesale Poultry Supply",
  supplyTitle: "Wholesale Poultry & Chicken Supply (B2B)",
  phone: "+91 96297 73923",
  whatsappNumber: "919629773923", // Merchant WhatsApp number
  address: "Wholesale Poultry Market, Chennai & Statewide Delivery",
  nightOrderNotice: "🌙 Night Orders Open: 6:00 PM - 11:00 PM for Early Morning Delivery",
  
  // Connected Google Apps Script Web App URL for Automated Google Sheets sync
  googleSheetScriptUrl: "https://script.google.com/macros/s/AKfycbw1ER0bod32XB3wIqH1eZNlxJVDpNyOMTGoYGzlEomRVisEMcEdCrOkWIv6NlVXt33y/exec"
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

// 15 B2B Poultry Products (10 Core + 5 Dummy / Sample Items)
const POULTRY_ITEMS = [
  {
    id: "item_broiler_skinless",
    sheetColumnName: "Broiler Skinless (Kg)",
    name: "Broiler Chicken - Skinless",
    category: "broiler",
    unit: "Kg",
    minOrder: 5,
    quickAddKgs: [5, 10, 25, 50],
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80",
    description: "Fresh skin-out broiler chicken, hygienically dressed and cleaned for restaurants & gravies."
  },
  {
    id: "item_broiler_withskin",
    sheetColumnName: "Broiler With Skin (Kg)",
    name: "Broiler Chicken - With Skin",
    category: "broiler",
    unit: "Kg",
    minOrder: 5,
    quickAddKgs: [5, 10, 25, 50],
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=500&q=80",
    description: "Skin-on whole dressed broiler chicken. Ideal for roast, grill, tandoor and dhabas."
  },
  {
    id: "item_boneless_breast",
    sheetColumnName: "Boneless Breast (Kg)",
    name: "Boneless Breast Fillet",
    category: "special-cuts",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80",
    description: "100% tender boneless breast meat. Perfect for Chilli Chicken, Chicken 65 & Shawarma."
  },
  {
    id: "item_leg_thigh_cuts",
    sheetColumnName: "Leg & Thigh Pieces (Kg)",
    name: "Leg & Thigh Pieces",
    category: "special-cuts",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=500&q=80",
    description: "Juicy leg quarters and drumsticks. Preferred for Biryani, Leg Roast, and Tandoori."
  },
  {
    id: "item_chicken_lollipop",
    sheetColumnName: "Chicken Lollipop (Kg/Pcs)",
    name: "Chicken Lollipop Cuts",
    category: "special-cuts",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 15],
    image: "https://images.unsplash.com/photo-1527477245898-df6519f97750?auto=format&fit=crop&w=500&q=80",
    description: "Frenched winglets expertly trimmed for restaurant Chicken Lollipop appetizers."
  },
  {
    id: "item_chicken_wings",
    sheetColumnName: "Chicken Wings (Kg)",
    name: "Chicken Wings",
    category: "special-cuts",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1527477245898-df6519f97750?auto=format&fit=crop&w=500&q=80",
    description: "Full tender wings. Best suited for Fried Chicken, Chinese gravies & snacks."
  },
  {
    id: "item_country_chicken",
    sheetColumnName: "Country Chicken / Naatu Kozhi (Kg)",
    name: "Country Chicken / Naatu Kozhi",
    category: "country-special",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1548567117-0429f55e54d8?auto=format&fit=crop&w=500&q=80",
    description: "Genuine free-range farm country chicken. Dressed fresh for authentic soup and kulambu."
  },
  {
    id: "item_liver_gizzard",
    sheetColumnName: "Liver & Gizzard (Kg)",
    name: "Chicken Liver & Gizzard",
    category: "offal",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 15],
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80",
    description: "Freshly cleaned chicken liver and gizzard. High demand for fry, gravy, and side dishes."
  },
  {
    id: "item_chicken_keema",
    sheetColumnName: "Chicken Minced / Keema (Kg)",
    name: "Chicken Minced / Keema",
    category: "special-cuts",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80",
    description: "Fine minced chicken meat for Keema dosa, rolls, samosa fillings & meatballs."
  },
  {
    id: "item_farm_eggs_tray",
    sheetColumnName: "Farm Eggs (Trays - 30 Pcs)",
    name: "Farm Fresh Eggs (Tray - 30 Pcs)",
    category: "eggs",
    unit: "Tray",
    minOrder: 1,
    quickAddKgs: [1, 2, 5, 10],
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=500&q=80",
    description: "Standard 30-eggs poultry tray. Fresh daily supply for egg fried rice, parotta & biryani."
  },
  // --- 5 DUMMY / SAMPLE ITEMS ---
  {
    id: "item_kadaknath_black",
    sheetColumnName: "Kadaknath Black Chicken (Kg)",
    name: "Kadaknath Black Meat Chicken",
    category: "country-special",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1548567117-0429f55e54d8?auto=format&fit=crop&w=500&q=80",
    description: "Original pure black Kadaknath bird. High protein medicinal meat for specialized restaurant menus."
  },
  {
    id: "item_quail_kaadai",
    sheetColumnName: "Farm Quail / Kaadai (Pcs/Kg)",
    name: "Farm Quail / Kaadai Birds",
    category: "special-cuts",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1527477245898-df6519f97750?auto=format&fit=crop&w=500&q=80",
    description: "Dressed ready-to-cook whole farm quails (Kaadai) for signature roasts and pepper fry."
  },
  {
    id: "item_drumstick_only",
    sheetColumnName: "Chicken Drumsticks Only (Kg)",
    name: "Chicken Drumsticks (Legs Only)",
    category: "special-cuts",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 25],
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=500&q=80",
    description: "Uniformly graded meaty chicken drumsticks. Prime selection for Tandoori, Fried & BBQ."
  },
  {
    id: "item_duck_vaathu",
    sheetColumnName: "Farm Duck Meat / Vaathu (Kg)",
    name: "Farm Duck Meat / Vaathu",
    category: "country-special",
    unit: "Kg",
    minOrder: 2,
    quickAddKgs: [2, 5, 10, 20],
    image: "https://images.unsplash.com/photo-1548567117-0429f55e54d8?auto=format&fit=crop&w=500&q=80",
    description: "Tender farm duck meat dressed clean for Chettinad duck roast and traditional curry."
  },
  {
    id: "item_country_eggs_tray",
    sheetColumnName: "Country Chicken Eggs (Tray)",
    name: "Country Chicken Eggs (Tray - 30 Pcs)",
    category: "eggs",
    unit: "Tray",
    minOrder: 1,
    quickAddKgs: [1, 2, 5, 10],
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=500&q=80",
    description: "100% genuine brown Naatu Kozhi eggs tray for premium breakfast and catering."
  }
];
