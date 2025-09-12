import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PersonaSelector } from "@/components/PersonaSelector";
import { DocumentUpload } from "@/components/DocumentUpload";
import { FeatureShowcase } from "@/components/FeatureShowcase";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-legal">
      <Header />
      <HeroSection />
      <PersonaSelector />
      <DocumentUpload />
      <FeatureShowcase />
    </div>
  );
};

export default Index;