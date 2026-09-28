"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import SocialLinks from "@/components/ui/SocialLinks";
import { siteConfig } from "@/data/siteConfig";

interface NavbarProps {
  variant?: "transparent" | "solid";
}


export default function Navbar({ variant = "transparent" }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isSolid = variant === "solid" || isScrolled;

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          mobileMenuOpen
            ? "bg-transparent py-4 text-[#0B203B]"
            : isSolid
            ? "bg-white/95 backdrop-blur-md border-b border-[#0084D1]/15 shadow-sm py-3 text-[#0B203B]"
            : "bg-transparent py-5 text-white"
        }`}
      >
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-x-8">
            <Logo
              variant={
                mobileMenuOpen
                  ? "header-scrolled"
                  : isSolid
                  ? "header-scrolled"
                  : "header-transparent"
              }
            />

            <nav className="hidden min-[1100px]:flex items-center">
              <ul
                className={`flex items-center gap-x-8 text-base lg:text-lg tracking-[0.1em] font-normal transition-colors ${
                  isSolid ? "text-[#0B203B]/90" : "text-white/90"
                }`}
              >
                {siteConfig.navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`transition-colors duration-200 ${
                          isActive
                            ? "text-[#0084D1] font-semibold"
                            : isSolid
                            ? "hover:text-[#0084D1]"
                            : "hover:text-white/70"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden min-[1100px]:flex items-center">
              <SocialLinks variant={isSolid ? "header-scrolled" : "header-transparent"} />
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className={`min-[1100px]:hidden relative z-50 cursor-pointer w-11 h-11 sm:w-12 sm:h-12 rounded-full flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ${
                mobileMenuOpen
                  ? "bg-[#0B203B] text-[#FAF6F0] border border-[#C68B59]/50 shadow-xl scale-105"
                  : isSolid
                  ? "bg-[#0B203B]/5 border border-[#0B203B]/20 text-[#0B203B] hover:bg-[#0084D1]/10 hover:border-[#0084D1] hover:text-[#0084D1]"
                  : "bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white/25 hover:border-white shadow-sm"
              }`}
              type="button"
            >
              <span
                className={`w-5 h-[2px] bg-current rounded-full transition-all duration-300 ease-out origin-center ${
                  mobileMenuOpen ? "rotate-45 translate-y-[8px]" : ""
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-current rounded-full transition-all duration-200 ease-out ${
                  mobileMenuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-current rounded-full transition-all duration-300 ease-out origin-center ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""
                }`}
              />
            </button>
          </div>
        </header>
      </div>

      <div
        className={`fixed inset-0 z-40 min-[1100px]:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between overflow-y-auto bg-[#FAF6F0] ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0 visible"
            : "opacity-0 pointer-events-none -translate-y-4 invisible"
        }`}
      >



        <div className="relative z-10 pt-28 px-6 sm:px-10" />

        <div className="relative z-10 px-6 sm:px-10 py-6 my-auto space-y-8 flex flex-col items-center justify-center text-center">
          {siteConfig.navLinks.map((link, idx) => {
            const isActive = pathname === link.href;

            return (
              <div
                key={link.href}
                className="transform transition-all duration-500 ease-out text-center"
                style={{
                  transitionDelay: mobileMenuOpen ? `${120 + idx * 100}ms` : "0ms",
                  transform: mobileMenuOpen ? "translateY(0)" : "translateY(16px)",
                  opacity: mobileMenuOpen ? 1 : 0,
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group block text-center"
                >
                  <span
                    className={`block font-sans text-5xl sm:text-6xl tracking-[0.02em] leading-none transition-all duration-300 group-hover:scale-105 text-center ${
                      isActive
                        ? "text-[#0084D1]"
                        : "text-[#0B203B] group-hover:text-[#C68B59]"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="relative z-10 px-6 sm:px-10 pb-8 pt-4 space-y-5">
          <div className="relative flex items-center justify-center">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C68B59]/30 to-transparent" />
            <div className="absolute px-3.5 bg-[#FAF6F0] flex items-center justify-center text-[#C68B59]">
              <svg
                viewBox="0 0 24 14"
                fill="currentColor"
                className="w-5 h-3 text-[#C68B59] transition-transform duration-300 hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2.5 7C5.5 3 13 2.5 17 6L21.5 2.8C20 5.2 20 8.8 21.5 11.2L17 8C13 11.5 5.5 11 2.5 7Z"
                  fill="currentColor"
                />
                <circle cx="6" cy="6" r="0.85" fill="#FAF6F0" />
                <path
                  d="M8.5 4.8C9.5 6 9.5 8 8.5 9.2"
                  stroke="#FAF6F0"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <SocialLinks variant="footer" />

            <div className="text-center sm:text-right">
              <div className="font-sans text-lg text-[#0B203B] leading-none">
                Blue Fish
              </div>
              <div className="font-montserrat text-[10px] tracking-[0.2em] text-[#C68B59] uppercase mt-0.5 font-medium">
                Red Sea Gastronomy
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
