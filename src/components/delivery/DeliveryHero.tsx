"use client";

import { SkeletonOverlay, useImageLoaded } from "@/components/ui/ImageSkeleton";

export default function DeliveryHero() {
  const {
    loaded: heroLoaded,
    onLoad: onHeroLoad,
    onError: onHeroError,
    setNode: setHeroNode,
  } = useImageLoaded();

  return (
    <section className="relative overflow-hidden font-sans min-h-screen min-h-svh w-full flex flex-col justify-between pt-24 sm:pt-28">
      {/* Background Hero Image */}
      <SkeletonOverlay loaded={heroLoaded} variant="dark" />
      <img
        ref={setHeroNode}
        alt="Blue Fish Port Ghalib Waterfront Marina"
        src="/images/hero/hero.webp"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          heroLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={onHeroLoad}
        onError={onHeroError}
      />

      {/* Dark overlay for contrast & readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,32,59,0.5) 0%, rgba(11,32,59,0.3) 40%, rgba(7,20,40,0.7) 100%)",
        }}
      />

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 my-auto w-full text-center flex flex-col items-center justify-center">
        {/* Title */}
        <h1
          className="font-sans leading-none tracking-tight"
          style={{
            fontSize: "clamp(3.5rem, 8.5vw, 6.5rem)",
            color: "#FAF6F0",
            lineHeight: 1.05,
            marginBottom: "1rem",
            textShadow: "0 4px 24px rgba(0,0,0,0.45)",
          }}
        >
          BlueFish <span style={{ color: "#C68B59" }}>Delivery</span>
        </h1>

        {/* Tagline */}
        <p
          className="uppercase tracking-[0.2em] font-normal"
          style={{
            fontSize: "clamp(1.15rem, 2.5vw, 1.85rem)",
            color: "#FAF6F0",
            fontFamily: "var(--font-arapey), Georgia, serif",
            textShadow: "0 2px 14px rgba(0,0,0,0.5)",
          }}
        >
          FRESH TO YOUR RESORT
          <span className="text-[#0084D1] mx-2.5 sm:mx-3.5 text-[0.6em] align-middle leading-none inline-block">
            •
          </span>
          MARINA YACHT
          <span className="text-[#0084D1] mx-2.5 sm:mx-3.5 text-[0.6em] align-middle leading-none inline-block">
            •
          </span>
          PRIVATE VILLA
        </p>
      </div>

      {/* === WAVE BOTTOM BORDER === */}
      <div className="relative z-10" style={{ marginTop: "-2px", lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "80px" }}
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="#F5EFE7"
          />
        </svg>
      </div>
    </section>
  );
}
