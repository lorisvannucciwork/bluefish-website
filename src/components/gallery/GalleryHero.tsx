"use client";

import { useState } from "react";
import Image from "next/image";
import { SkeletonOverlay } from "@/components/ui/ImageSkeleton";

export default function GalleryHero() {
  const [heroBgLoaded, setHeroBgLoaded] = useState(false);
  const [circleLoaded, setCircleLoaded] = useState(false);

  return (
    <section
      className="relative overflow-hidden font-sans min-h-screen min-h-svh w-full flex flex-col justify-between pt-24 sm:pt-28"
    >
      {/* Background Hero Image */}
      <SkeletonOverlay loaded={heroBgLoaded} variant="dark" />
      <img
        alt="Blue Fish Port Ghalib Marina Waterfront"
        src="/images/hero/hero.webp"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          heroBgLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setHeroBgLoaded(true)}
      />

      {/* Dark overlay for contrast & readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,32,59,0.55) 0%, rgba(11,32,59,0.35) 40%, rgba(7,20,40,0.75) 100%)",
        }}
      />

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0 sm:pt-12 sm:pb-0 w-full flex-1 flex flex-col justify-center">
        {/* Main headline — split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* Left: Main Title */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start z-10">
            <h1
              className="font-sans leading-none"
              style={{
                fontSize: "clamp(3.2rem, 8.5vw, 7.2rem)",
                color: "#FAF6F0",
                lineHeight: 1.0,
                marginBottom: "1.5rem",
                textShadow: "0 4px 24px rgba(0,0,0,0.45)",
              }}
            >
              Bluefish{" "}
              <span style={{ color: "#C68B59" }}>Visual</span>
              <br />
              Gallery
            </h1>

            <p
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                color: "rgba(250,246,240,0.85)",
                fontFamily: "var(--font-montserrat), sans-serif",
                lineHeight: 1.6,
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              }}
            >
              is{" "}
              <span
                style={{
                  color: "#C68B59",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                }}
              >
                SUNSET VISTAS &amp; NAUTICAL ARCHITECTURE
              </span>
            </p>

          </div>

          {/* Right: Featured Photo Portal */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[360px] lg:h-[360px] xl:w-[420px] xl:h-[420px] drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)]">
              {/* Central circular photo frame */}
              <div
                className="absolute inset-0 rounded-full overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-105"
                style={{
                  border: "3px solid rgba(255,255,255,0.85)",
                  boxShadow: "inset 0 2px 10px rgba(0,0,0,0.3), 0 20px 50px rgba(0,0,0,0.5)",
                }}
              >
                <SkeletonOverlay loaded={circleLoaded} className="rounded-full" />
                <Image
                  src="/wp-content/uploads/2026/01/SS-SG_INTERIOR-006-1.jpg"
                  alt="Blue Fish Port Ghalib Seaview Dining"
                  fill
                  sizes="(max-width: 768px) 260px, 420px"
                  className="object-cover"
                  priority
                  onLoad={() => setCircleLoaded(true)}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,32,59,0.5) 0%, transparent 60%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
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
            fill="#F5EFE7"
          />
        </svg>
      </div>
    </section>
  );
}
