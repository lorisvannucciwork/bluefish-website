import { GalleryImage, GalleryCategory } from "@/types";

export const galleryCategories: GalleryCategory[] = [
  { id: "all", name: "All Moments" },
  { id: "waterfront", name: "Waterfront & Marina" },
  { id: "interior", name: "Architecture & Interior" },
  { id: "bar-lounge", name: "Bar & Mixology" },
  { id: "private-salons", name: "Private Salons" },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "/images/gallery/gallery-1.jpg",
    title: "Artisanal Lighting & Foliage",
    desc: "Handcrafted rope sconces and cascading monstera greenery creating an intimate coastal sanctuary.",
    category: "interior",
    location: "Main Dining Lounge",
    aspect: "landscape",
  },
  {
    id: "2",
    src: "/images/gallery/gallery-2.jpg",
    title: "Red Sea Ocean Gastronomy",
    desc: "Delicate fresh catch and artisanal textures presented atop natural coastal stones.",
    category: "waterfront",
    location: "Oceanfront Terrace",
    aspect: "landscape",
  },
  {
    id: "3",
    src: "/images/gallery/gallery-3.jpg",
    title: "Candlelit Evening Ambience",
    desc: "Vintage embossed glassware and glowing candlelight casting a warm twilight atmosphere.",
    category: "bar-lounge",
    location: "Twilight Lounge",
    aspect: "landscape",
  },
  {
    id: "4",
    src: "/images/gallery/gallery-0.jpg",
    title: "Coastal Botanicals & Marina",
    desc: "Vibrant coastal succulents, palms, and sun-warmed pebbles overlooking the azure waters of Port Ghalib Marina.",
    category: "waterfront",
    location: "Waterfront Boardwalk",
    aspect: "wide",
  },
  {
    id: "5",
    src: "/images/gallery/gallery-5.jpg",
    title: "Sunset Seaview Dining",
    desc: "Japanese dining precision set against panoramic views of swaying palms and the Red Sea horizon.",
    category: "waterfront",
    location: "VIP Sunset Salon",
    aspect: "wide",
  },
];
