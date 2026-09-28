"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryImages } from "@/data/galleryData";
import GalleryLightbox from "./GalleryLightbox";
import { Maximize2 } from "lucide-react";
import { SkeletonOverlay } from "@/components/ui/ImageSkeleton";

function ShowcaseCard({ image, idx, onClick }: { image: typeof galleryImages[0]; idx: number; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      onClick={onClick}
      className="group relative rounded-[2rem] overflow-hidden shadow-lg cursor-pointer transition-all duration-500 hover:-translate-y-1.5"
      style={{
        background: "linear-gradient(145deg, #FFFDF9, #F8F0E5)",
        border: "1px solid rgba(198, 139, 89, 0.3)",
      }}
    >
      {/* Photo Container */}
      <div className="relative w-full h-72 sm:h-80 overflow-hidden">
        <SkeletonOverlay loaded={loaded} />
        <Image
          src={image.src}
          alt={image.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-108"
          onLoad={() => setLoaded(true)}
        />
        {/* Subtle dark gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-75"
          style={{
            background:
              "linear-gradient(to top, rgba(11,32,59,0.85) 0%, rgba(11,32,59,0.2) 50%, transparent 100%)",
          }}
        />

        {/* Expand Icon Badge */}
        <div
          className="absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 shadow-lg text-white"
          style={{
            background: "rgba(11, 32, 59, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <Maximize2 style={{ width: "16px", height: "16px", color: "#C68B59" }} />
        </div>

        {/* Card Bottom Text */}
        <div className="absolute bottom-5 left-5 right-5 text-white space-y-1 transform transition-transform duration-300">
          <h3 className="text-lg sm:text-xl font-sans font-bold leading-tight text-[#FAF6F0] group-hover:text-[#C68B59] transition-colors duration-300">
            {image.title}
          </h3>
          <p
            className="text-xs text-[#FAF6F0]/80 font-light line-clamp-2"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            {image.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GalleryShowcase() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section
      id="gallery-showcase"
      className="py-16 sm:py-24 relative overflow-hidden font-sans"
      style={{ background: "#F5EFE7" }}
    >
      {/* Background ambient lighting glows */}
      <div
        className="absolute top-1/3 left-0 w-80 h-80 pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(198, 139, 89, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 132, 209, 0.1) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2
            className="font-sans leading-tight text-3xl sm:text-4xl lg:text-5xl text-[#0B203B]"
            style={{ letterSpacing: "-0.01em" }}
          >
            Moments of Coastal Glamour
          </h2>

          <p
            className="text-sm sm:text-base text-[#0B203B]/70 font-light leading-relaxed"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Every corner of Blue Fish has been sculpted to embrace the natural poetry of the Red Sea.
            Click any photo to explore the atmosphere in high-definition fullscreen.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {galleryImages.slice(0, 3).map((image, idx) => (
              <ShowcaseCard
                key={image.id || idx}
                image={image}
                idx={idx}
                onClick={() => setLightboxIndex(idx)}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {galleryImages.slice(3, 5).map((image, idx) => (
              <ShowcaseCard
                key={image.id || idx + 3}
                image={image}
                idx={idx + 3}
                onClick={() => setLightboxIndex(idx + 3)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <GalleryLightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(index) => setLightboxIndex(index)}
      />
    </section>
  );
}
