import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "header-transparent" | "header-scrolled" | "footer";
  className?: string;
}

export default function Logo({ variant = "header-transparent", className = "" }: LogoProps) {
  const borderClasses =
    variant === "footer"
      ? "border-[#C68B59]/40 sm:border-r sm:border-l sm:px-4"
      : variant === "header-scrolled"
      ? "border-[#0B203B]/20 min-[1100px]:border-r min-[1100px]:border-l min-[1100px]:px-4"
      : "border-white/30 min-[1100px]:border-r min-[1100px]:border-l min-[1100px]:px-4";

  const logoSrc = variant === "header-transparent" ? "/logo-hero.webp" : "/logo.webp";

  return (
    <div className={`flex items-center border-x-0 px-0 py-1 transition-colors ${borderClasses} ${className}`}>
      <Link aria-label="Blue Fish" href="/" className="flex items-center hover:opacity-80 transition-opacity">
        <Image
          src={logoSrc}
          alt="Blue Fish Logo"
          width={160}
          height={45}
          className="h-8 sm:h-9 w-auto object-contain"
          priority
        />
      </Link>
    </div>
  );
}
