import { HomeIcon, Brain, Shield, MessageSquare, Users, MapPin, FileSearch, Globe, Mic, Zap } from "lucide-react";
import Index from "./pages/Index.tsx";
import { AIAnalysis } from "./pages/AIAnalysis.tsx";
import { RiskAssessment } from "./pages/RiskAssessment.tsx";
import { ChatDocuments } from "./pages/ChatDocuments.tsx";
import { LawyerConnect } from "./pages/LawyerConnect.tsx";
import { CourtLocator } from "./pages/CourtLocator.tsx";
import { DocumentComparison } from "./pages/DocumentComparison.tsx";
import { MultiLanguage } from "./pages/MultiLanguage.tsx";
import { VoiceAssistant } from "./pages/VoiceAssistant.tsx";
import { InstantProcessing } from "./pages/InstantProcessing.tsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "AI Analysis",
    to: "/ai-analysis",
    icon: <Brain className="h-4 w-4" />,
    page: <AIAnalysis />,
  },
  {
    title: "Risk Assessment",
    to: "/risk-assessment",
    icon: <Shield className="h-4 w-4" />,
    page: <RiskAssessment />,
  },
  {
    title: "Chat with Documents",
    to: "/chat-documents",
    icon: <MessageSquare className="h-4 w-4" />,
    page: <ChatDocuments />,
  },
  {
    title: "Lawyer Connect",
    to: "/lawyer-connect",
    icon: <Users className="h-4 w-4" />,
    page: <LawyerConnect />,
  },
  {
    title: "Court Locator",
    to: "/court-locator",
    icon: <MapPin className="h-4 w-4" />,
    page: <CourtLocator />,
  },
  {
    title: "Document Comparison",
    to: "/document-comparison",
    icon: <FileSearch className="h-4 w-4" />,
    page: <DocumentComparison />,
  },
  {
    title: "Multi-Language",
    to: "/multi-language",
    icon: <Globe className="h-4 w-4" />,
    page: <MultiLanguage />,
  },
  {
    title: "Voice Assistant",
    to: "/voice-assistant",
    icon: <Mic className="h-4 w-4" />,
    page: <VoiceAssistant />,
  },
  {
    title: "Instant Processing",
    to: "/instant-processing",
    icon: <Zap className="h-4 w-4" />,
    page: <InstantProcessing />,
  },
];