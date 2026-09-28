export interface EventSpace {
  id: string;
  name: string;
  subtitle: string;
  capacity: string;
  sqm: string;
  setting: "Outdoor Waterfront" | "Private Indoor" | "Lounge & Bar";
  description: string;
  image: string;
  features: string[];
  idealFor: string[];
}

export interface EventExperience {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
}

export interface EventFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface EventFaq {
  question: string;
  answer: string;
}

export const eventSpaces: EventSpace[] = [
  {
    id: "waterfront-deck",
    name: "The Marina Waterfront Deck",
    subtitle: "Open-Air Coastal Glamour",
    capacity: "Up to 120 Guests",
    sqm: "240 m²",
    setting: "Outdoor Waterfront",
    description:
      "Perched right along the Port Ghalib boardwalk with panoramic sea views. Gently caressed by evening Red Sea breezes and ambient nautical lighting, this alfresco terrace provides an unforgettable backdrop for wedding receptions, sunset galas, and grand seated banquets.",
    image: "/wp-content/uploads/2026/01/SS-SG_INTERIOR-006-1.jpg",
    features: [
      "Panoramic marina & yachts backdrop",
      "Customizable banquet & cocktail arrangements",
      "Built-in ambient lighting & sound system",
      "Direct boardwalk arrival & boat docking",
    ],
    idealFor: ["Weddings & Rehearsal Dinners", "Corporate Galas", "Sunset Receptions"],
  },
  {
    id: "sunset-salon",
    name: "The VIP Sunset Salon",
    subtitle: "Intimate High-End Seclusion",
    capacity: "Up to 35 Guests",
    sqm: "85 m²",
    setting: "Private Indoor",
    description:
      "An exclusive, glass-enclosed sanctuary framing the twilight horizon. Features bespoke plush velvet seating, sculptural warm amber chandelier installations, and dedicated sommelier & private mixologist service for high-profile gatherings and executive retreats.",
    image: "/wp-content/uploads/2026/01/SS-SG_INTERIOR-007.jpg",
    features: [
      "Private climate-controlled glass salon",
      "Dedicated mixology bar & head sommelier",
      "Executive audiovisual & presentation ready",
      "Custom multi-course wine-paired tasting menus",
    ],
    idealFor: ["Executive Dinners", "Milestone Birthdays", "Private Wine Tastings"],
  },
  {
    id: "sculptural-lounge",
    name: "The Lounge & Omakase Bar",
    subtitle: "High-Energy Culinary Theatre",
    capacity: "Up to 65 Guests",
    sqm: "130 m²",
    setting: "Lounge & Bar",
    description:
      "A dynamic architectural centerpiece featuring geometric ceiling canopy art, a live sushi cutting counter, and craft mixology bar. Perfect for networking mixers, stylish cocktail parties, and interactive chef omakase masterclasses.",
    image: "/wp-content/uploads/2026/01/SS-SG_INTERIOR-001-1.jpg",
    features: [
      "Interactive live raw bar & sushi stations",
      "Resident DJ booth & curated soundscape",
      "Signature cocktails & Japanese whisky collection",
      "Casual standing cocktail / high-top lounge layout",
    ],
    idealFor: ["Cocktail Parties", "DJ Sessions", "Interactive Masterclasses"],
  },
];

export const eventExperiences: EventExperience[] = [
  {
    id: "weddings",
    title: "Marina Weddings & Receptions",
    category: "ROMANCE & CELEBRATION",
    tagline: "Seaside vows meet world-class culinary craftsmanship",
    description:
      "Say 'I do' against the golden glow of the Red Sea. Our culinary team crafts custom Mediterranean seafood feasts, multi-tiered celebratory desserts, and champagne towers alongside the yachts.",
    image: "/wp-content/uploads/2026/01/SS-SG_INTERIOR-004.jpg",
    gallery: [
      "/wp-content/uploads/2026/01/SS-SG_INTERIOR-006-1.jpg",
      "/wp-content/uploads/2026/01/SS-SG_INTERIOR-007.jpg",
      "/wp-content/uploads/2026/01/SS-SG_INTERIOR-001-1.jpg",
    ],
  },
  {
    id: "corporate",
    title: "Executive Retreats & Corporate Galas",
    category: "BUSINESS & NETWORKING",
    tagline: "Elevate your team and impress international partners",
    description:
      "Host seamless conferences, product launches, or client appreciation dinners in an environment that blends beachside serenity with discreet five-star hospitality.",
    image: "/wp-content/uploads/2026/01/SS-SG_INTERIOR-006-1.jpg",
    gallery: [
      "/wp-content/uploads/2026/01/SS-SG_INTERIOR-007.jpg",
      "/wp-content/uploads/2026/01/SS-SG_INTERIOR-005.jpg",
      "/wp-content/uploads/2026/01/SS-SG_INTERIOR-004.jpg",
    ],
  },
  {
    id: "private-dining",
    title: "Chef's Omakase & Curated Tastings",
    category: "GASTRONOMY",
    tagline: "A multi-sensory journey across Mediterranean & Japanese waters",
    description:
      "Immerse your guests in our signature live sushi bar experience. Fresh catches prepared table-side, paired with rare sakes, vintage champagnes, and artisanal spirits.",
    image: "/wp-content/uploads/2026/01/SS-SG_INTERIOR-005.jpg",
    gallery: [
      "/wp-content/uploads/2026/01/SS-SG_INTERIOR-001-1.jpg",
      "/wp-content/uploads/2026/01/SS-SG_INTERIOR-006-1.jpg",
      "/wp-content/uploads/2026/01/SS-SG_INTERIOR-007.jpg",
    ],
  },
];

export const venueFeatures: EventFeature[] = [
  {
    icon: "Anchor",
    title: "Marina Boardwalk & Boat Arrival",
    desc: "Guests can arrive directly via yacht or private tender at our reserved marina docking slip.",
  },
  {
    icon: "UtensilsCrossed",
    title: "Tailored Menus",
    desc: "From seated 7-course seafood degustations to standing sushi & cocktail canapés.",
  },
  {
    icon: "Sparkles",
    title: "Dedicated Event Concierge",
    desc: "A singular point of contact to orchestrate decor, floral arrangements, photography, and music.",
  },
  {
    icon: "Music",
    title: "Acoustics & Sound Integration",
    desc: "Integrated state-of-the-art Bose sound system with plug-and-play DJ station & wireless microphones.",
  },
  {
    icon: "Wine",
    title: "Private Sommelier & Mixologist",
    desc: "Signature welcome cocktails designed specifically for your event date and color theme.",
  },
  {
    icon: "Clock",
    title: "Flexible Hours",
    desc: "After-hours buyout options available for twilight receptions and late-night celebrations.",
  },
];

export const eventFaqs: EventFaq[] = [
  {
    question: "What is the maximum guest capacity for full restaurant buyouts?",
    answer:
      "A complete buyout of Blue Fish (indoor salon, lounge, and outdoor waterfront deck) accommodates up to 180 guests for standing cocktail receptions or up to 140 guests for seated dinners.",
  },
  {
    question: "How far in advance should we reserve our event?",
    answer:
      "We recommend booking at least 3 to 6 weeks in advance for weekend dates and sunset hours. For wedding receptions and holiday buyouts, 2 to 3 months notice is suggested to ensure date availability.",
  },
  {
    question: "Can you accommodate dietary restrictions and allergies?",
    answer:
      "Yes, our chef prepares custom vegetarian, vegan, gluten-free, and halal-compliant options upon request with advance notice during the menu planning stage.",
  },
  {
    question: "Can we bring our own music, DJ, or live performers?",
    answer:
      "Absolutely. Our sound system has dedicated inputs for visiting DJs, acoustic musicians, or curated playlists. We can also provide our resident lounge DJ on request.",
  },
];
