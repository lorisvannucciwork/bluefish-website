import { siteConfig } from "@/data/siteConfig";

interface SocialLinksProps {
  variant?: "header-transparent" | "header-scrolled" | "drawer" | "footer";
  className?: string;
}

export default function SocialLinks({
  variant = "header-transparent",
  className = "",
}: SocialLinksProps) {
  const getButtonStyles = () => {
    switch (variant) {
      case "header-scrolled":
        return "w-9 h-9 rounded-full border border-[#0B203B]/20 text-[#0B203B] hover:border-[#0084D1] hover:text-[#0084D1] hover:bg-[#0084D1]/5";
      case "drawer":
        return "w-10 h-10 rounded-full border border-[#0B203B]/20 text-[#0B203B] hover:border-[#0084D1] hover:text-[#0084D1]";
      case "footer":
        return "w-10 h-10 rounded-full bg-white border border-[#C68B59]/30 text-[#0B203B] hover:bg-[#C68B59] hover:text-white shadow-sm";
      case "header-transparent":
      default:
        return "w-9 h-9 rounded-full border border-white/30 text-white hover:border-white hover:bg-white/15";
    }
  };

  const renderIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case "facebook":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z" />
          </svg>
        );
      case "tiktok":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.88-4.49V8.65a8.27 8.27 0 0 0 4.84 1.55V6.75a4.85 4.85 0 0 1-.95-.06z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {siteConfig.socialLinks.map((social) => (
        <a
          key={social.platform}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center transition-all duration-300 cursor-pointer ${getButtonStyles()}`}
          aria-label={social.label}
        >
          {renderIcon(social.platform)}
        </a>
      ))}
    </div>
  );
}
