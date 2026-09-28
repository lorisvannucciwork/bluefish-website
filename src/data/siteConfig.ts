import { NavLink, SocialLink } from "@/types";

export const siteConfig = {
  name: "BLUE FISH",
  title: "Blue Fish | Seafood • Sushi • Seaview Dining",
  description:
    "Experience the finest seafood, sushi, and sunset dining with panoramic seaviews at Blue Fish Port Ghalib Marina.",
  location: "Marina Waterfront Boardwalk • Port Ghalib",
  heroSubtitle: "PORTGHALIB | MARINA",
  tagline:
    "Where barefoot luxury and Red Sea serenity meet the refined soul of Japanese ocean gastronomy.",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    // { label: "Events", href: "/events" }, // Hidden for now
    // { label: "Gallery", href: "/gallery" }, // Hidden for now
  ] as NavLink[],
  socialLinks: [
    { platform: "instagram", url: "https://www.instagram.com/bluefishportghalib", label: "Instagram" },
    { platform: "facebook", url: "https://www.facebook.com/share/19dR4ZmFtg/?mibextid=wwXIfr", label: "Facebook" },
    { platform: "tiktok", url: "https://www.tiktok.com/@bluefishportghalib", label: "TikTok" },
  ] as SocialLink[],
  legalLinks: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms & Conditions", href: "#terms" },
    { label: "Accessibility", href: "#accessibility" },
  ],
};
