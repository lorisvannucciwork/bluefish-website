"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import { GalleryImage } from "@/types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SkeletonOverlay } from "@/components/ui/ImageSkeleton";

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onSelectIndex,
}: GalleryLightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < images.length;
  const currentImage = isOpen ? images[currentIndex] : null;
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const newIdx = (currentIndex - 1 + images.length) % images.length;
    onSelectIndex(newIdx);
  }, [currentIndex, images.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const newIdx = (currentIndex + 1) % images.length;
    onSelectIndex(newIdx);
  }, [currentIndex, images.length, onSelectIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10"
      style={{
        background: "rgba(11, 32, 59, 0.92)",
        backdropFilter: "blur(16px)",
      }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close fullscreen view"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-3 rounded-full backdrop-blur-md transition-transform duration-300 hover:scale-110 cursor-pointer shadow-xl text-white hover:text-[#C68B59]"
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
        }}
      >
        <X style={{ width: "22px", height: "22px" }} />
      </button>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        aria-label="Previous image"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full backdrop-blur-md transition-transform duration-300 hover:scale-110 cursor-pointer shadow-xl text-white hover:text-[#C68B59]"
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
        }}
      >
        <ChevronLeft style={{ width: "24px", height: "24px" }} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Next image"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full backdrop-blur-md transition-transform duration-300 hover:scale-110 cursor-pointer shadow-xl text-white hover:text-[#C68B59]"
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
        }}
      >
        <ChevronRight style={{ width: "24px", height: "24px" }} />
      </button>

      {/* Main Image Container */}
      <div
        className="relative max-w-5xl w-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative w-full max-h-[75vh] h-[55vh] sm:h-[65vh] lg:h-[72vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
          style={{
            border: "2px solid rgba(198, 139, 89, 0.4)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
          }}
        >
          <SkeletonOverlay loaded={loaded} variant="dark" />
          <Image
            ref={imgRef}
            src={currentImage.src}
            alt={currentImage.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className={`object-cover transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            priority
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(11,32,59,0.7) 0%, transparent 40%)",
            }}
          />
        </div>

        {/* Captions & Counter Bar */}
        <div className="w-full mt-4 sm:mt-5 px-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-white font-sans">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-wide text-[#FAF6F0]">
              {currentImage.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/75 font-light max-w-2xl mt-0.5">
              {currentImage.desc}
            </p>
          </div>

          <div className="text-xs font-mono tracking-widest text-[#C68B59] shrink-0">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}
