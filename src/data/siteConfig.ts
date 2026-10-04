import { NavLink, SocialLink } from "@/types";

export const siteConfig = {
  name: "BLUE FISH",
  title: "Blue Fish | Seafood • Sushi • Seaview Dining",
  description:
    "Experience the finest seafood, sushi, and sunset dining with panoramic seaviews at Blue Fish Port Ghalib Marina.",
  location: "Marina Waterfront Boardwalk • Port Ghalib",
  heroSubtitle: "PORTGHALIB | MARINA",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Delivery", href: "/delivery" },
  ] as NavLink[],
  socialLinks: [
    { platform: "instagram", url: "https://www.instagram.com/bluefishportghalib", label: "Instagram" },
    { platform: "facebook", url: "https://www.facebook.com/share/19dR4ZmFtg/?mibextid=wwXIfr", label: "Facebook" },
    { platform: "tiktok", url: "https://www.tiktok.com/@bluefishportghalib", label: "TikTok" },
  ] as SocialLink[],
};
