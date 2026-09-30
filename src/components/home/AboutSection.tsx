"use client";

import Image from "next/image";
import Link from "next/link";
import { SkeletonOverlay, useImageLoaded } from "@/components/ui/ImageSkeleton";

export default function AboutSection() {
  const {
    loaded: logoLoaded,
    onLoad: onLogoLoad,
    onError: onLogoError,
    setNode: setLogoNode,
  } = useImageLoaded();
  return (
    <section
      id="about"
      aria-labelledby="section-heading-about"
      className="py-28 bg-[#FAF7F2] border-b border-[#C68B59]/20 relative overflow-hidden"
    >
      {/* Subtle Boho Organic Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8F2F8]/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F3ECE2]/80 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative Column - Boho Editorial Style */}
          <div className="lg:col-span-6 flex flex-col space-y-7">
            {/* Editorial Boho Heading */}
            <div>
              <h2
                id="section-heading-about"
                className="font-heading text-3xl sm:text-5xl text-[#0B203B] leading-[1.15] font-normal"
              >
                Sushi, <br />
                <span className="italic font-serif text-[#C68B59]">Seafood</span> &amp; Seaview
              </h2>
            </div>

            {/* Narrative Text */}
            <div
              className="space-y-4 text-[#0B203B]/85 text-lg sm:text-xl leading-relaxed font-normal font-arapey"
              style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
            >
              <p>
                Perched right on the Red Sea shore in Port Ghalib, <strong>Blue Fish</strong> is where fresh
                sushi meets an unforgettable sea view. Enjoy expertly crafted rolls, nigiri, and sashimi made
                from the freshest ingredients, all served just steps from the sparkling water.
              </p>
              <p>
                Whether you&apos;re planning a romantic sunset dinner, a relaxed evening with friends, or a
                special family celebration, our calm atmosphere and panoramic views set the perfect scene.
                Watch the sun sink into the horizon as you savor each bite, accompanied by refreshing drinks
                and attentive service.
              </p>
            </div>

            {/* Desktop CTA (Hidden on mobile) */}
            <div className="pt-3 hidden lg:flex flex-row items-center gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-full bg-[#0B203B] hover:bg-[#C68B59] text-white uppercase text-xs tracking-[0.2em] font-bold px-8 py-4 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                Menu &rarr;
              </Link>
            </div>
          </div>

          {/* Right Arched Boho Photo Showcase */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center mt-8 lg:mt-0">
            {/* Main Arched Photo Showcase */}
            <div className="relative w-full max-w-md aspect-[3/4] rounded-t-full rounded-b-3xl overflow-hidden border-4 border-white shadow-2xl bg-[#E5E7EB] flex items-center justify-center">
              <SkeletonOverlay loaded={logoLoaded} className="rounded-t-full rounded-b-3xl" />
              <img
                ref={setLogoNode}
                src="/images/gallery/gallery-8.JPEG"
                alt="Blue Fish Port Ghalib"
                className={`w-full h-full object-cover transition-all duration-700 hover:scale-105 ${
                  logoLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={onLogoLoad}
                onError={onLogoError}
              />
            </div>

            {/* Mobile CTA (Displayed under the image on mobile view) */}
            <div className="mt-8 lg:hidden flex justify-center w-full">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-full bg-[#0B203B] hover:bg-[#C68B59] text-white uppercase text-xs tracking-[0.2em] font-bold px-8 py-4 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                Menu &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
