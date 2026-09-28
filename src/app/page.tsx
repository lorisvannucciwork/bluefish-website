import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import AtmosphereGallery from "@/components/home/AtmosphereGallery";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F4F8FC] text-[#0B203B] selection:bg-[#0084D1]/20 selection:text-[#0084D1] font-sans">
      <Navbar variant="transparent" />
      <main>
        <HeroSection />
        <AboutSection />
        <AtmosphereGallery />
      </main>
      <Footer />
    </div>
  );
}
