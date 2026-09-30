"use client";

import Image from "next/image";
import { eventSpaces } from "@/data/eventsData";
import { Users, Maximize2, Check, Sparkles } from "lucide-react";
import { SkeletonOverlay, useImageLoaded } from "@/components/ui/ImageSkeleton";

function SpaceImage({ src, alt }: { src: string; alt: string }) {
  const { loaded, onLoad, onError, setNode } = useImageLoaded();
  return (
    <>
      <SkeletonOverlay loaded={loaded} />
      <Image
        ref={setNode}
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-108"
        onLoad={onLoad}
        onError={onError}
      />
    </>
  );
}

export default function EventSpaces() {
  return (
    <section id="spaces" className="py-20 sm:py-28 relative overflow-hidden font-sans">
      {/* Decorative background glows */}
      <div
        className="absolute top-1/3 left-0 w-80 h-80 pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(198,139,89,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-10 right-0 w-96 h-96 pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,132,209,0.1) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-sans tracking-[0.2em] uppercase font-bold"
            style={{
              background: "rgba(198,139,89,0.12)",
              color: "#C68B59",
              border: "1px solid rgba(198,139,89,0.25)",
            }}
          >
            <Sparkles style={{ width: "13px", height: "13px" }} />
            <span>Curated Venues</span>
          </div>

          <h2
            className="font-sans leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#0B203B",
            }}
          >
            Distinctive Event Spaces
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed font-light"
            style={{
              color: "rgba(11,32,59,0.7)",
              fontFamily: "var(--font-montserrat), sans-serif",
            }}
          >
            Whether seeking an open-air starlit ocean deck, an intimate VIP private salon, or an
            energetic lounge with a live omakase counter, Blue Fish adapts seamlessly to your vision.
          </p>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {eventSpaces.map((space) => (
            <div
              key={space.id}
              className="group flex flex-col rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2"
              style={{
                background: "linear-gradient(145deg, #FFFDF9, #F8F0E5)",
                border: "1px solid rgba(198,139,89,0.25)",
                boxShadow: "0 10px 35px rgba(139,80,40,0.06)",
              }}
            >
              {/* Space Photo */}
              <div className="relative w-full h-64 sm:h-72 overflow-hidden">
                <SpaceImage src={space.image} alt={space.name} />

                {/* Subtle gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,32,59,0.2) 0%, transparent 60%, rgba(11,32,59,0.6) 100%)",
                  }}
                />

                {/* Setting Badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-sans font-semibold tracking-wider uppercase backdrop-blur-md"
                  style={{
                    background: "rgba(11,32,59,0.75)",
                    color: "#FFFFFF",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  {space.setting}
                </div>

                {/* Specs Pill */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white font-sans font-medium">
                  <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Users style={{ width: "12px", height: "12px", color: "#C68B59" }} />
                    {space.capacity}
                  </span>
                  <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Maximize2 style={{ width: "12px", height: "12px", color: "#0084D1" }} />
                    {space.sqm}
                  </span>
                </div>
              </div>

              {/* Space Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-[0.15em] font-semibold text-[#C68B59]">
                    {space.subtitle}
                  </div>
                  <h3
                    className="font-sans text-2xl sm:text-3xl text-[#0B203B] transition-colors duration-300 group-hover:text-[#C68B59]"
                    style={{ lineHeight: 1.2 }}
                  >
                    {space.name}
                  </h3>
                  <p
                    className="text-base text-[#0B203B]/80 leading-relaxed font-normal font-arapey"
                    style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
                  >
                    {space.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2 border-t border-[#C68B59]/20">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0B203B]/80 mb-2">
                    Key Features
                  </div>
                  {space.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-[#0B203B]/75"
                    >
                      <Check
                        style={{
                          width: "14px",
                          height: "14px",
                          color: "#C68B59",
                          flexShrink: 0,
                          marginTop: "3px",
                        }}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Ideal For Tags */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {space.idealFor.map((item, iIdx) => (
                      <span
                        key={iIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-sans"
                        style={{
                          background: "rgba(198,139,89,0.1)",
                          color: "#0B203B",
                          border: "1px solid rgba(198,139,89,0.2)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
