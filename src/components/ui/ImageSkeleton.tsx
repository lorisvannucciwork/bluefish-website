"use client";

import { useState } from "react";

interface SkeletonOverlayProps {
  loaded: boolean;
  className?: string;
  variant?: "light" | "dark" | "plate";
}

export function SkeletonOverlay({
  loaded,
  className = "",
  variant = "light",
}: SkeletonOverlayProps) {
  if (loaded) return null;

  const bgStyles =
    variant === "dark"
      ? "bg-[#0B203B]/90"
      : variant === "plate"
      ? "bg-white/40 backdrop-blur-sm"
      : "bg-[#EAE4DC]/80";

  const shimmerStyles =
    variant === "dark"
      ? "from-transparent via-white/10 to-transparent"
      : "from-transparent via-white/50 to-transparent";

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 z-10 overflow-hidden pointer-events-none transition-opacity duration-500 ease-out ${bgStyles} ${className}`}
    >
      {/* Animated shimmer sweep */}
      <div
        className={`absolute inset-0 -translate-x-full bg-gradient-to-r ${shimmerStyles}`}
        style={{
          animation: "shimmer 1.8s infinite ease-in-out",
        }}
      />
      {/* Subtle warm center glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <div className="w-8 h-8 rounded-full bg-[#C68B59]/25 animate-pulse" />
      </div>
    </div>
  );
}

export function useImageLoaded(initial = false) {
  const [loaded, setLoaded] = useState(initial);
  return {
    loaded,
    onLoad: () => setLoaded(true),
    setLoaded,
  };
}
