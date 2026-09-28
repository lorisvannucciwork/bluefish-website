import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import MenuHero from "@/components/menu/MenuHero";
import MenuCatalog from "@/components/menu/MenuCatalog";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Menu | Blue Fish Seafood • Sushi • Seaview Dining",
  description:
    "Explore our coastal Mediterranean & Japanese sushi menu: Antipasti, Primi, Secondi, and Chef's Sushi Selection along the Port Ghalib Marina boardwalk.",
};

export default function MenuPage() {
  return (
    <div className="min-h-screen text-[#0B203B] flex flex-col justify-between font-sans" style={{ background: "#F5EFE7", userSelect: "none" }}>
      <Navbar variant="solid" />
      <main className="flex-grow">
        <MenuHero />
        <MenuCatalog />
      </main>
      <Footer />
    </div>
  );
}
