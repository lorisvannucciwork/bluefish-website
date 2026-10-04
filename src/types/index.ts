export interface MenuItem {
  name: string;
  category: string;
  price: string;
  desc?: string;
  image?: string;
  tag?: string;
  badgeColor?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
}

export interface MenuSection {
  id: string;
  categoryId: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

export interface GalleryImage {
  id?: string;
  src: string;
  title: string;
  desc: string;
  category?: string;
  aspect?: "landscape" | "portrait" | "wide";
  location?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: "instagram" | "facebook" | "tiktok";
  url: string;
  label: string;
}
