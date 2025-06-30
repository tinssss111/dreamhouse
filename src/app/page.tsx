import Header from "@/components/Header";
import MainSection from "@/components/MainSection";
import { SectionContent } from "@/components/SectionContent";
import { UrlSection } from "@/components/UrlSection";
import { HowToBuy } from "@/components/HowToBuy";
import { Community } from "@/components/Community";
import { Footer } from "@/components/Footer";
import { Tokenomics } from "@/components/Tokenomics";
import About from "@/components/About";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <div className="min-h-screen">
        <MainSection />
        <About />
        <SectionContent />
        <UrlSection />
        <Tokenomics />
        <HowToBuy />
        <Community />
        <Footer />
      </div>
    </div>
  );
}
