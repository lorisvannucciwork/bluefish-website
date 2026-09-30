"use client";

import { galleryImages } from "@/data/galleryData";
import { SkeletonOverlay, useImageLoaded } from "@/components/ui/ImageSkeleton";

function GalleryCard({ img, aspect }: { img: typeof galleryImages[0]; aspect: string }) {
  const { loaded, onLoad, onError, setNode } = useImageLoaded();
  return (
    <div
      className={`group relative ${aspect} rounded-[2rem] overflow-hidden border border-[#0084D1]/20 shadow-sm bg-[#EEF5FB]`}
    >
      <SkeletonOverlay loaded={loaded} className="rounded-[2rem]" />
      <img
        ref={setNode}
        src={img.src}
        alt={img.title}
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={onLoad}
        onError={onError}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B203B]/90 via-[#0B203B]/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
        <h3 className="text-base font-semibold tracking-wider text-white uppercase">{img.title}</h3>
        <p
          className="text-xs sm:text-sm text-white/90 font-normal mt-1 font-arapey"
          style={{ fontFamily: "var(--font-arapey), Georgia, serif" }}
        >
          {img.desc}
        </p>
      </div>
    </div>
  );
}

export default function AtmosphereGallery() {
  return (
    <section id="gallery" className="py-24 bg-white border-b border-[#0084D1]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#0084D1] font-bold">
            Interior &amp; Atmosphere
          </span>
          <h2 className="text-3xl sm:text-4xl uppercase tracking-[0.15em] font-light text-[#0B203B] mt-1">
            Visual Experience
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.slice(0, 3).map((img, i) => (
            <GalleryCard key={i} img={img} aspect="aspect-[4/3]" />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {galleryImages.slice(3, 5).map((img, i) => (
            <GalleryCard key={i} img={img} aspect="aspect-[16/9]" />
          ))}
        </div>
      </div>
    </section>
  );
}
