export interface DeliveryZone {
  name: string;
  type: "resort" | "marina" | "residential";
  timeEstimate: string;
  notes: string;
}

export const DELIVERY_PHONE = "01109789626";
export const DELIVERY_PHONE_INTL = "+20 110 978 9626";
export const DELIVERY_WHATSAPP_CLEAN = "201109789626";
export const DELIVERY_HOURS = "5:00 PM – 1:00 AM (Daily)";
export const DELIVERY_AVG_TIME = "30–45 Mins";

export const deliveryZones: DeliveryZone[] = [
  {
    name: "Port Ghalib Marina Waterfront & Docks",
    type: "marina",
    timeEstimate: "20–30 mins",
    notes: "Direct dockside delivery to private yachts, sailing boats, and marina berths.",
  },
  {
    name: "Pickalbatros Oasis, Sands & Palace",
    type: "resort",
    timeEstimate: "30–40 mins",
    notes: "Prompt delivery to resort reception / main entrance gate.",
  },
  {
    name: "Pickalbatros Portofino & Villaggio",
    type: "resort",
    timeEstimate: "35–45 mins",
    notes: "Fresh thermal-bag delivery to main lobby area.",
  },
  {
    name: "Jaz Grand Marsa, Solaya, Lamaya & Maraya",
    type: "resort",
    timeEstimate: "35–45 mins",
    notes: "Delivered directly to designated resort entrance / reception.",
  },
  {
    name: "Marina Lodge at Port Ghalib",
    type: "resort",
    timeEstimate: "25–35 mins",
    notes: "Quick delivery across the marina promenade.",
  },
  {
    name: "The Three Corners Fayrouz Plaza",
    type: "resort",
    timeEstimate: "35–45 mins",
    notes: "Thermal fresh delivery to hotel reception.",
  },
  {
    name: "Port Ghalib Private Villas & Apartments",
    type: "residential",
    timeEstimate: "25–35 mins",
    notes: "Direct doorstep delivery throughout Port Ghalib community.",
  },
];

export const deliveryHighlights = [
  {
    title: "Thermal Fresh Packaging",
    desc: "Specially insulated sushi containers with eco ice-packs ensure pristine ocean temperature.",
    icon: "PackageCheck",
  },
  {
    title: "Yacht & Resort Delivery",
    desc: "We bring hot seafood and chilled nigiri directly to your marina mooring or hotel lobby.",
    icon: "Anchor",
  },
  {
    title: "Instant WhatsApp Checkout",
    desc: "Submit your order in one click; our team confirms instantly on WhatsApp at 01109789626.",
    icon: "MessageSquare",
  },
  {
    title: "Condiments & Chopsticks Included",
    desc: "Every order includes premium soy sauce, authentic wasabi, pickled ginger & chopsticks.",
    icon: "Utensils",
  },
];

export const deliveryFaqs = [
  {
    q: "How does resort and hotel delivery work?",
    a: "Due to resort security regulations, our couriers meet you at your resort's main entrance or lobby gate. You will receive an arrival WhatsApp text 5 minutes beforehand so you can meet our driver seamlessly.",
  },
  {
    q: "Can you deliver directly to boats moored in Port Ghalib Marina?",
    a: "Yes! Port Ghalib Marina is our backyard. Just provide your boat name and berth/pier number during checkout, and our courier will walk your order straight to your gangway.",
  },
  {
    q: "How do you keep raw sushi and sashimi cold during transit?",
    a: "All raw sushi, sashimi, and poke bowls are packed inside food-grade insulated thermal carriers paired with dry chill gel packs, preserving delicate texture and ocean-fresh taste.",
  },
  {
    q: "What payment methods are supported for delivery?",
    a: "You can pay upon arrival via Cash (EGP, EUR, USD) or with Credit/Debit Card (Visa/Mastercard) using our mobile card terminal. Please specify your preference in the order notes.",
  },
  {
    q: "What are the daily delivery hours?",
    a: "We deliver 7 days a week from 5:00 PM until 1:00 AM. Pre-orders for sunset dining and evening boat trips can also be placed in advance.",
  },
];
