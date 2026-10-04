import Link from "next/link";
import Logo from "@/components/ui/Logo";
import SocialLinks from "@/components/ui/SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#C68B59]/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-[#0B203B]">
      {/* Subtle Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#F3ECE2]/60 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#E8F2F8]/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center justify-between">
          {/* Left: Brand Identity */}
          <div className="md:col-span-6 text-center md:text-left flex flex-col items-center md:items-start">
            <Logo variant="footer" className="w-fit" />
          </div>

          {/* Right: Warm Social Badges */}
          <div className="md:col-span-6 flex items-center justify-center md:justify-end">
            <SocialLinks variant="footer" />
          </div>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex items-center justify-center gap-8 pt-6 border-t border-[#C68B59]/15 text-xs font-semibold tracking-[0.2em] uppercase text-[#0B203B]/70">
          <Link href="/delivery" className="hover:text-[#C68B59] transition-colors">
            Delivery
          </Link>
          <span className="text-[#C68B59]/30">•</span>
          <Link href="/media" className="hover:text-[#C68B59] transition-colors">
            Media
          </Link>
        </div>
      </div>
    </footer>
  );
}
