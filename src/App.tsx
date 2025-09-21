import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PersonaSelection from "./pages/PersonaSelection";
import PersonaSetup from "./pages/PersonaSetup";
import AIFeatures from "./pages/AIFeatures";
import AIAnalysis from "./pages/AIAnalysis";
import ChatDocuments from "./pages/ChatDocuments";
import CourtLocator from "./pages/CourtLocator";
import DocumentComparison from "./pages/DocumentComparison";
import Features from "./pages/Features";
import InstantProcessing from "./pages/InstantProcessing";
import LawyerConnect from "./pages/LawyerConnect";
import MultiLanguage from "./pages/MultiLanguage";
import PlainEnglishSummary from "./pages/PlainEnglishSummary";
import RiskAssessment from "./pages/RiskAssessment";
import VoiceAssistant from "./pages/VoiceAssistant";
import BasicInfo from "./pages/onboarding/BasicInfo";
import LegalNeeds from "./pages/onboarding/LegalNeeds";
import OnboardingContact from "./pages/onboarding/Contact";
import Summary from "./pages/onboarding/Summary";
import Success from "./pages/onboarding/Success";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import SmartContractDrafting from "./pages/SmartContractDrafting";
import LegalActionPlanner from "./pages/LegalActionPlanner";
import LegalDefenseWriter from "./pages/LegalDefenseWriter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/support" element={<Contact />} />
              <Route path="/features" element={<Features />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/persona-selection" element={<PersonaSelection />} />
              <Route path="/persona-setup" element={<PersonaSetup />} />
              <Route path="/ai-features" element={<AIFeatures />} />
              <Route path="/ai-analysis" element={<AIAnalysis />} />
              <Route path="/chat-documents" element={<ChatDocuments />} />
              <Route path="/court-locator" element={<CourtLocator />} />
              <Route path="/document-comparison" element={<DocumentComparison />} />
              <Route path="/instant-processing" element={<InstantProcessing />} />
              <Route path="/lawyer-connect" element={<LawyerConnect />} />
              <Route path="/multi-language" element={<MultiLanguage />} />
              <Route path="/plain-english-summary" element={<PlainEnglishSummary />} />
              <Route path="/risk-assessment" element={<RiskAssessment />} />
              <Route path="/voice-assistant" element={<VoiceAssistant />} />
              <Route path="/smart-contract-drafting" element={<SmartContractDrafting />} />
              <Route path="/legal-action-planner" element={<LegalActionPlanner />} />
              <Route path="/legal-defense-writer" element={<LegalDefenseWriter />} />
              <Route path="/onboarding/basic-info" element={<BasicInfo />} />
              <Route path="/onboarding/legal-needs" element={<LegalNeeds />} />
              <Route path="/onboarding/contact" element={<OnboardingContact />} />
              <Route path="/onboarding/summary" element={<Summary />} />
              <Route path="/onboarding/success" element={<Success />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
