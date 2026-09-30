"use client";

import { siteConfig } from "@/data/siteConfig";
import { SkeletonOverlay, useImageLoaded } from "@/components/ui/ImageSkeleton";

export default function HeroSection() {
  const { loaded, onLoad, onError, setNode } = useImageLoaded();

  return (
    <section
      id="hero"
      aria-labelledby="section-heading-hero"
      className="group/block relative w-full h-svh min-h-[640px] overflow-hidden flex flex-col justify-between"
      data-layout="hero"
      data-next-layout="textmedia"
      data-position="1"
    >
      {/* Background hero image */}
      <SkeletonOverlay loaded={loaded} variant="dark" />
      <img
        ref={setNode}
        alt="Blue Fish Port Ghalib Marina Waterfront"
        src="/images/hero/hero.webp"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={onLoad}
        onError={onError}
      />

      {/* Dark overlay for contrast & readability */}
      <div className="absolute inset-0 pointer-events-none bg-black/50" />

      {/* Centered Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center md:px-8 mt-12 sm:mt-14">
        <header id="section-heading-hero">
          <h1 className="text-center text-[clamp(1.1rem,5.2vw,3.75rem)] text-white uppercase tracking-[0.1em] sm:tracking-[0.15em] font-normal leading-tight whitespace-nowrap">
            SEAFOOD<span className="text-[#0084D1] mx-0.5 sm:mx-1">•</span>SUSHI
            <span className="text-[#0084D1] mx-0.5 sm:mx-1">•</span>SEAVIEW
          </h1>
          <p
            className="text-center text-lg lg:text-2xl whitespace-pre-line text-white tracking-[0.15em] mt-3 font-normal font-arapey"
            style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
          >
            {siteConfig.heroSubtitle}
          </p>
        </header>
      </div>

      {/* === WAVE BOTTOM BORDER === */}
      <div className="relative z-20" style={{ marginTop: "-2px", lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "80px" }}
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="#FAF7F2"
          />
        </svg>
      </div>
    </section>
  );
}
