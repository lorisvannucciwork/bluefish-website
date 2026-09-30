import Link from "next/link";
import { Utensils, ExternalLink, ArrowRight } from "lucide-react";

export default function MediaPortal() {
  const socialChannels = [
    {
      name: "Instagram",
      handle: "@bluefishportghalib",
      description: "Daily sunset vistas, fresh catch creations, and waterfront atmosphere.",
      url: "https://www.instagram.com/bluefishportghalib",
      color: "#E1306C",
      accentBg: "hover:border-[#E1306C]/40 hover:bg-[#E1306C]/5",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      handle: "Blue Fish Port Ghalib",
      description: "Community updates, featured dishes, and dining announcements.",
      url: "https://www.facebook.com/share/19dR4ZmFtg/?mibextid=wwXIfr",
      color: "#1877F2",
      accentBg: "hover:border-[#1877F2]/40 hover:bg-[#1877F2]/5",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      handle: "@bluefishportghalib",
      description: "Behind the counter culinary moments, chef highlights, and Red Sea vibes.",
      url: "https://www.tiktok.com/@bluefishportghalib",
      color: "#000000",
      accentBg: "hover:border-[#0B203B]/40 hover:bg-[#0B203B]/5",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.88-4.49V8.65a8.27 8.27 0 0 0 4.84 1.55V6.75a4.85 4.85 0 0 1-.95-.06z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-28 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(198, 139, 89, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-10 w-80 h-80 pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 132, 209, 0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10 space-y-6">
        {/* Bright Digital Menu Action Card */}
        <div className="relative group">
          <Link
            href="/menu"
            className="block p-5 sm:p-6 rounded-2xl bg-white text-[#0B203B] border-2 border-[#C68B59]/30 hover:border-[#0084D1] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden relative"
          >
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#C68B59]/15 border border-[#C68B59]/30 flex items-center justify-center text-[#C68B59] shrink-0 group-hover:bg-[#C68B59] group-hover:text-white transition-colors duration-300">
                  <Utensils className="w-6 h-6" />
                </div>
                <span className="text-xl sm:text-2xl font-bold tracking-wide text-[#0B203B] group-hover:text-[#C68B59] transition-colors">
                  View Digital Menu
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#0B203B]/5 border border-[#0B203B]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0084D1] group-hover:translate-x-1 transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-[#0B203B] group-hover:text-white transition-colors" />
              </div>
            </div>
          </Link>
        </div>

        {/* Social Media Channels Grid */}
        <div className="space-y-3.5">
          {socialChannels.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={`group flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-white border border-[#C68B59]/25 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${item.accentBg}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ color: item.color, backgroundColor: `${item.color}15` }}
                >
                  {item.icon}
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#0B203B] group-hover:text-[#C68B59] transition-colors">
                    {item.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#0084D1] font-medium">
                    {item.handle}
                  </p>
                  <p
                    className="text-xs sm:text-sm text-[#0B203B]/70 font-normal mt-0.5 hidden sm:block font-arapey"
                    style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B203B]/50 group-hover:text-[#C68B59] transition-colors shrink-0">
                <span className="hidden sm:inline">Visit</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>

        {/* Back to Home Link */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#0B203B]/70 hover:text-[#C68B59] transition-colors"
          >
            &larr; Return to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
