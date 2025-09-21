import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { LawyerConnectShowcase } from "@/components/LawyerConnectShowcase";
import { CourtLocatorShowcase } from "@/components/CourtLocatorShowcase";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-legal">
      <Header />
      <HeroSection />
      <LawyerConnectShowcase />
      <CourtLocatorShowcase />
    </div>
  );
};

export default Index;