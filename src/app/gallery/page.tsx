import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryShowcase from "@/components/gallery/GalleryShowcase";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Visual Gallery | Blue Fish Port Ghalib Marina",
  description:
    "Explore the visual atmosphere of Blue Fish Port Ghalib Marina: waterfront yacht terraces, twilight private salons, live omakase sushi bar, and artisanal Mediterranean seafood.",
  openGraph: {
    title: "Visual Gallery | Blue Fish Port Ghalib Marina",
    description:
      "Waterfront marina terraces, private glass salons, and nautical architecture at Blue Fish Port Ghalib.",
  },
};

export default function GalleryPage() {
  return (
    <div
      className="min-h-screen text-[#0B203B] flex flex-col justify-between font-sans"
      style={{ background: "#F5EFE7" }}
    >
      <Navbar variant="solid" />
      <main className="flex-grow">
        <GalleryHero />
        <GalleryShowcase />
      </main>
      <Footer />
    </div>
  );
}
