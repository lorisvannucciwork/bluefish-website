import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import MediaPortal from "@/components/media/MediaPortal";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Medal | Blue Fish Port Ghalib Marina",
  description:
    "Discover Blue Fish Port Ghalib across social media, view our full digital dining menu, and explore authentic Red Sea seafood and sushi.",
  openGraph: {
    title: "Medal Hub | Blue Fish Port Ghalib Marina",
    description:
      "Explore Blue Fish Port Ghalib social media channels and digital dining menu.",
  },
};

export default function MedalPage() {
  return (
    <div
      className="min-h-screen text-[#0B203B] flex flex-col justify-between font-sans"
      style={{ background: "#F5EFE7" }}
    >
      <Navbar variant="solid" />
      <main className="flex-grow">
        <MediaPortal />
      </main>
      <Footer />
    </div>
  );
}
