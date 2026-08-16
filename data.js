// SK Foods - Products & Catalog Data

const STORE_CONFIG = {
  storeName: "SK Foods",
  tagline: "100% Certified Organic & Farm Fresh Groceries",
  phone: "+91 98765 43210", // Merchant WhatsApp/Phone
  whatsappNumber: "919876543210", // WhatsApp number without spaces or + for direct wa.me link
  email: "orders@skfoods.in",
  address: "No. 42, Green Avenue, Anna Nagar, Chennai, Tamil Nadu - 600040",
  currency: "₹",
  freeDeliveryMin: 499,
  deliveryCharge: 40,
  upiId: "skfoods@upi"
};

const CATEGORIES = [
  { id: "all", name: "All Products", nameTa: "அனைத்து பொருட்கள்", icon: "bi-grid-fill" },
  { id: "vegetables-fruits", name: "Organic Veggies & Fruits", nameTa: "இயற்கை காய்கறிகள் & பழங்கள்", icon: "bi-apple" },
  { id: "oils-ghee", name: "Cold-Pressed Oils & Ghee", nameTa: "மரச்செக்கு எண்ணெய் & நெய்", icon: "bi-droplet-half" },
  { id: "millets-grains", name: "Traditional Millets & Rice", nameTa: "பாரம்பரிய சிறுதானியங்கள் & அரிசி", icon: "bi-grain" },
  { id: "spices-masalas", name: "Pure Spices & Herbs", nameTa: "இயற்கை மசாலா & மூலிகைகள்", icon: "bi-fire" },
  { id: "dryfruits-nuts", name: "Dry Fruits & Healthy Snacks", nameTa: "உலர் பழங்கள் & நட்ஸ்", icon: "bi-box2-heart" }
];

const PRODUCTS = [
  {
    id: "prod-1",
    name: "Wood Pressed Groundnut Oil (மரச்செக்கு கடலை எண்ணெய்)",
    category: "oils-ghee",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 142,
    variants: [
      { weight: "500 ml", price: 175, originalPrice: 210 },
      { weight: "1 Litre", price: 330, originalPrice: 390 },
      { weight: "5 Litres", price: 1580, originalPrice: 1850 }
    ],
    description: "Cold-pressed in traditional Vaagai wooden chekku at low temperature to retain 100% aroma, nutrients, and authentic taste. Zero chemicals, unrefined, and cholesterol-friendly.",
    benefits: ["Rich in Vitamin E & Antioxidants", "100% Cold-Pressed (Vaagai Chekku)", "Zero Preservatives / Unrefined"],
    isOrganic: true,
    inStock: true
  },
  {
    id: "prod-2",
    name: "Pure A2 Desi Cow Ghee (நாட்டுப்பசு நெய்)",
    category: "oils-ghee",
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=600&q=80",
    badge: "100% Pure A2",
    rating: 5.0,
    reviewsCount: 89,
    variants: [
      { weight: "250 ml", price: 340, originalPrice: 399 },
      { weight: "500 ml", price: 650, originalPrice: 750 },
      { weight: "1 Litre", price: 1250, originalPrice: 1450 }
    ],
    description: "Prepared from grass-fed Desi Cow whole milk using the traditional Bilona curd-churning method. Granular golden texture with divine aroma.",
    benefits: ["Bilona Churned method", "Boosts Immunity & Gut Health", "Rich in Omega 3 & Healthy Fats"],
    isOrganic: true,
    inStock: true
  },
  {
    id: "prod-3",
    name: "Mappillai Samba Traditional Rice (மாப்பிள்ளை சம்பா அரிசி)",
    category: "millets-grains",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    badge: "Energy Rich",
    rating: 4.8,
    reviewsCount: 76,
    variants: [
      { weight: "1 kg", price: 110, originalPrice: 135 },
      { weight: "5 kg", price: 520, originalPrice: 650 },
      { weight: "10 kg", price: 999, originalPrice: 1250 }
    ],
    description: "Heritage red rice variety from Tamil Nadu known for enhancing strength, stamina, and hemoglobin levels. High in dietary fiber and low GI.",
    benefits: ["Increases Stamina & Iron content", "Low Glycemic Index (Diabetic friendly)", "100% Naturally Farm Cultivated"],
    isOrganic: true,
    inStock: true
  },
  {
    id: "prod-4",
    name: "Organic Country Farm Eggs (நாட்டுக்கோழி முட்டை)",
    category: "vegetables-fruits",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80",
    badge: "Free-Range",
    rating: 4.9,
    reviewsCount: 110,
    variants: [
      { weight: "6 pcs Pack", price: 78, originalPrice: 90 },
      { weight: "12 pcs Pack", price: 150, originalPrice: 175 },
      { weight: "30 pcs Tray", price: 360, originalPrice: 420 }
    ],
    description: "Fresh country eggs gathered daily from naturally grazed, hormone-free country hens. High protein, rich yellow yolk, and delicious natural taste.",
    benefits: ["Hormone & Antibiotic Free", "Pure Free-Range Country Hens", "Delivered Fresh Daily"],
    isOrganic: true,
    inStock: true
  },
  {
    id: "prod-5",
    name: "Wood Pressed Sesame / Gingelly Oil (மரச்செக்கு நல்லெண்ணெய்)",
    category: "oils-ghee",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    badge: "With Palm Jaggery",
    rating: 4.9,
    reviewsCount: 94,
    variants: [
      { weight: "500 ml", price: 195, originalPrice: 230 },
      { weight: "1 Litre", price: 370, originalPrice: 440 },
      { weight: "5 Litres", price: 1780, originalPrice: 2100 }
    ],
    description: "Extracted from black sesame seeds using natural palm jaggery (கருப்பட்டி) in wooden press. Supreme taste for authentic South Indian cooking, idli podi, and oil baths.",
    benefits: ["Traditional Palm Jaggery Blend", "Rich in Calcium & Zinc", "Authentic aroma & taste"],
    isOrganic: true,
    inStock: true
  },
  {
    id: "prod-6",
    name: "Organic Barnyard Millet / Kuthiraivali (குதிரைவாலி)",
    category: "millets-grains",
    image: "https://images.unsplash.com/photo-1574316071802-0d684efa7cd5?auto=format&fit=crop&w=600&q=80",
    badge: "High Fiber",
    rating: 4.7,
    reviewsCount: 53,
    variants: [
      { weight: "500 g", price: 55, originalPrice: 70 },
      { weight: "1 kg", price: 105, originalPrice: 130 }
    ],
    description: "Unpolished organic Barnyard Millet. Perfect healthy substitute for white rice. Great for making Pongal, Upma, Idli, and Biryani.",
    benefits: ["6x more fiber than white rice", "Aids Weight Management", "Gluten-Free & Easy Digestion"],
    isOrganic: true,
    inStock: true
  },
  {
    id: "prod-7",
    name: "Wild Forest Raw Honey (இயற்கை மலைத்தேன்)",
    category: "spices-masalas",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    badge: "100% Unprocessed",
    rating: 5.0,
    reviewsCount: 165,
    variants: [
      { weight: "250 g", price: 210, originalPrice: 260 },
      { weight: "500 g", price: 390, originalPrice: 480 },
      { weight: "1 kg", price: 740, originalPrice: 900 }
    ],
    description: "Ethically harvested raw honey collected from deep forest beehives. Unpasteurized, unfiltered, and contains active natural enzymes & pollen.",
    benefits: ["Natural Immunity Booster", "Zero Added Sugar or Glucose", "Contains Raw Pollen & Minerals"],
    isOrganic: true,
    inStock: true
  },
  {
    id: "prod-8",
    name: "Stone Ground Salem Turmeric Powder (மஞ்சள் தூள்)",
    category: "spices-masalas",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    badge: "High Curcumin",
    rating: 4.9,
    reviewsCount: 88,
    variants: [
      { weight: "250 g", price: 75, originalPrice: 95 },
      { weight: "500 g", price: 140, originalPrice: 175 },
      { weight: "1 kg", price: 270, originalPrice: 330 }
    ],
    description: "Ground from premium grade Salem turmeric fingers with guaranteed high curcumin content (above 4.5%). Vibrant golden yellow color and aroma.",
    benefits: ["High 4.5%+ Curcumin Level", "Natural Antibacterial & Antiseptic", "No Artificial Coloring"],
    isOrganic: true,
    inStock: true
  },
  {
    id: "prod-9",
    name: "Premium California Almonds / Badam (பாதாம்)",
    category: "dryfruits-nuts",
    image: "https://images.unsplash.com/photo-1508061252445-8450f3ff91f6?auto=format&fit=crop&w=600&q=80",
    badge: "Crisp & Fresh",
    rating: 4.9,
    reviewsCount: 120,
    variants: [
      { weight: "250 g", price: 260, originalPrice: 320 },
      { weight: "500 g", price: 490, originalPrice: 600 },
      { weight: "1 kg", price: 950, originalPrice: 1150 }
    ],
    description: "Hand-picked jumbo size California almonds, vacuum packed to seal freshness and crunchiness. Packed with Vitamin E and healthy omega fatty acids.",
    benefits: ["Rich in Brain-boosting nutrients", "Crunchy & Zero Chemical Preservatives", "Heart Healthy Snack"],
    isOrganic: true,
    inStock: true
  },
  {
    id: "prod-10",
    name: "Organic Karuppatti / Palm Jaggery (தூய பனை கருப்பட்டி)",
    category: "spices-masalas",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    badge: "Authentic",
    rating: 4.8,
    reviewsCount: 92,
    variants: [
      { weight: "500 g", price: 180, originalPrice: 220 },
      { weight: "1 kg", price: 340, originalPrice: 420 }
    ],
    description: "Traditional unrefined Palm Jaggery made from fresh palm tree sap without any chemical clarifiers or bleaching. Rich in natural iron and minerals.",
    benefits: ["Natural sweetener & High Iron", "Aids Digestion & Cleanses Respiratory tract", "Zero White Sugar / Chemicals"],
    isOrganic: true,
    inStock: true
  },
  {
    id: "prod-11",
    name: "Farm Fresh Organic Country Tomato (நாட்டு தக்காளி)",
    category: "vegetables-fruits",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    badge: "Farm Harvest",
    rating: 4.8,
    reviewsCount: 64,
    variants: [
      { weight: "1 kg", price: 42, originalPrice: 55 },
      { weight: "3 kg", price: 118, originalPrice: 155 }
    ],
    description: "Juicy and tangy native country tomatoes cultivated using organic compost and neem sprays. Direct from local organic farms to your kitchen.",
    benefits: ["Farm Harvested within 24 Hours", "Zero synthetic pesticide residues", "Rich in Lycopene"],
    isOrganic: true,
    inStock: true
  },
  {
    id: "prod-12",
    name: "Premium Whole Cashew Nuts / W240 (முந்திரி பருப்பு)",
    category: "dryfruits-nuts",
    image: "https://images.unsplash.com/photo-1536591375315-1b836890ba4e?auto=format&fit=crop&w=600&q=80",
    badge: "Premium W240",
    rating: 4.9,
    reviewsCount: 104,
    variants: [
      { weight: "250 g", price: 290, originalPrice: 350 },
      { weight: "500 g", price: 560, originalPrice: 680 },
      { weight: "1 kg", price: 1080, originalPrice: 1300 }
    ],
    description: "Export quality whole white cashew nuts (W240 grade). Sweet, buttery and crunchy texture for daily snacks, sweets, and cooking.",
    benefits: ["Grade W240 King Size", "Rich in Copper & Magnesium", "Vacuum sealed fresh pack"],
    isOrganic: true,
    inStock: true
  }
];

const COUPONS = [
  { code: "SKFIRST", discountType: "percentage", value: 10, minOrder: 300, maxDiscount: 100, description: "10% OFF on your first order (Up to ₹100)" },
  { code: "ORGANIC50", discountType: "flat", value: 50, minOrder: 599, maxDiscount: 50, description: "Flat ₹50 OFF on orders above ₹599" },
  { code: "FARM100", discountType: "flat", value: 100, minOrder: 1200, maxDiscount: 100, description: "Flat ₹100 OFF on bulk orders above ₹1200" }
];

const TESTIMONIALS = [
  {
    name: "Karthik Raghavan",
    role: "Regular Customer, Anna Nagar",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "The Cold-Pressed Groundnut Oil and A2 Ghee aroma takes me back to my village days! Real organic quality with fast WhatsApp ordering."
  },
  {
    name: "Dr. Priya Sundaram",
    role: "Nutritionist & Health Advocate",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "I regularly recommend SK Foods Mappillai Samba rice and Barnyard millets to all my clients. Pristine unadulterated quality!"
  },
  {
    name: "Suresh Kumar",
    role: "Home Chef, Velachery",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "Super convenient to order directly on WhatsApp. Packaging was eco-friendly and delivered on time without any damage."
  }
];

const FAQS = [
  {
    question: "How do I place an order?",
    questionTa: "நான் எப்படி ஆர்டர் செய்வது?",
    answer: "Simply browse products, choose your preferred weight (500g, 1kg etc.), add to cart, and click 'Order via WhatsApp'. Your order summary with address will open in WhatsApp so our team can confirm and pack it immediately!"
  },
  {
    question: "Are all your products 100% organic & chemical free?",
    questionTa: "உங்கள் பொருட்கள் அனைத்தும் 100% இயற்கை முறையில் தயாரிக்கப்பட்டவையா?",
    answer: "Yes! We source directly from verified organic farmers and traditional mills. Our oils are 100% cold-pressed without heating or chemical solvents."
  },
  {
    question: "What are the delivery charges and delivery time?",
    questionTa: "டெலிவரி கட்டணம் மற்றும் நேரம் என்ன?",
    answer: "We offer FREE Delivery on all orders above ₹499. Orders are packed fresh and delivered within 24 hours in local city zones and 2-3 days statewide."
  },
  {
    question: "What payment methods are supported?",
    questionTa: "எந்தெந்த முறையில் பணம் செலுத்தலாம்?",
    answer: "We support Google Pay, PhonePe, Paytm, Any UPI QR, Bank Transfer, as well as Cash on Delivery (COD)."
  }
];
