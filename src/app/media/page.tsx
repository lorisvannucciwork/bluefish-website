import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import MediaPortal from "@/components/media/MediaPortal";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Media | Blue Fish Port Ghalib Marina",
  description:
    "Follow Blue Fish Port Ghalib on Instagram, Facebook, and TikTok. View our digital menu and experience sushi, seafood, and seaview dining in Port Ghalib.",
  openGraph: {
    title: "Media & Social Hub | Blue Fish Port Ghalib Marina",
    description:
      "Connect with Blue Fish across social media and explore our full digital menu.",
  },
};

export default function MediaPage() {
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
