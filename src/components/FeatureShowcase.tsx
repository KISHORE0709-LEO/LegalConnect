import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Brain, 
  Shield, 
  MessageSquare, 
  Users, 
  MapPin, 
  FileSearch,
  Globe,
  Mic,
  Zap,
  ArrowRight,
  Play,
  MessageCircle,
  Video,
  Calendar,
  Search,
  FileCheck,
  Languages,
  MicIcon,
  PenTool,
  CheckSquare,
  Scale
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Legal Assistant",
    description: "Complete AI suite with document analysis, chat interface, voice commands, and instant processing.",
    badge: "Core Feature",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    detailedContent: {
      overview: "Our comprehensive AI engine combines document analysis, interactive chat, voice commands, and lightning-fast processing into one powerful legal assistant.",
      benefits: ["Plain language summaries", "Interactive document chat", "Voice-powered queries", "Instant OCR processing", "Context-aware insights"],
      demo: "Upload a contract, ask 'What are my payment terms?' via voice or text, and get instant analysis in under 10 seconds."
    }
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Color-coded risk levels (Green/Yellow/Red) highlight potential issues and unfavorable terms.",
    badge: "Risk Detection",
    color: "text-red-600",
    bgColor: "bg-red-50",
    detailedContent: {
      overview: "Smart risk detection algorithms analyze clauses and highlight potential issues with color-coded warnings.",
      benefits: ["🟢 Green: Safe clauses", "🟡 Yellow: Needs attention", "🔴 Red: High risk", "Instant risk scoring"],
      demo: "Unfair termination clauses, excessive penalties, and one-sided terms are automatically flagged for your review."
    }
  },
  {
    icon: Users,
    title: "Lawyer Connect",
    description: "Direct connection to verified lawyers with chat, video calls, and appointment booking.",
    badge: "Professional",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    detailedContent: {
      overview: "Connect with verified lawyers specializing in your document type through secure chat, video calls, and appointment scheduling.",
      benefits: ["Verified lawyer network", "Secure messaging", "Video consultations", "Easy appointment booking"],
      demo: "Get expert legal advice when AI analysis suggests consulting a professional."
    }
  },
  {
    icon: MapPin,
    title: "Court Locator",
    description: "Find nearby courts, legal aid centers, and government offices with directions and hours.",
    badge: "Navigation",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    detailedContent: {
      overview: "Comprehensive directory of legal institutions with real-time information about locations, hours, and services.",
      benefits: ["Court locations", "Legal aid centers", "Government offices", "Directions & hours"],
      demo: "Find the nearest family court for divorce proceedings or district court for contract disputes."
    }
  },
  {
    icon: FileSearch,
    title: "Document Comparison",
    description: "Compare multiple versions to detect changes, additions, or modifications in contracts.",
    badge: "Analysis",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    detailedContent: {
      overview: "Advanced document comparison tool identifies all changes between contract versions with detailed highlighting.",
      benefits: ["Version comparison", "Change detection", "Addition/deletion tracking", "Side-by-side view"],
      demo: "Upload two versions and instantly see what clauses were modified, added, or removed."
    }
  },
  {
    icon: PenTool,
    title: "Smart Contract Drafting",
    description: "Generate legally-structured contract drafts from plain language descriptions using AI.",
    badge: "AI Generation",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    detailedContent: {
      overview: "Describe your contract needs in plain language and get a professionally structured first draft with proper legal sections and clauses.",
      benefits: ["Plain language input", "Structured legal output", "Multiple contract types", "Export to PDF/Word", "Lawyer review option"],
      demo: "Type 'I need a freelance photography contract that protects my photo rights' and get a complete draft in seconds."
    }
  },
  {
    icon: CheckSquare,
    title: "Legal Action Planner",
    description: "Get actionable to-do lists and step-by-step guidance for any legal document with interactive tracking.",
    badge: "Action Guide",
    color: "text-green-600",
    bgColor: "bg-green-50",
    detailedContent: {
      overview: "Transform passive document analysis into practical action plans with context-aware suggestions for before signing, after signing, and record keeping.",
      benefits: ["Before/After signing checklists", "Interactive to-do tracker", "Document-specific guidance", "Export action plans", "Email reminders"],
      demo: "Upload a rental agreement and get: 'Before signing: Verify landlord ID', 'After signing: Take property photos', 'Records: Save digital copies'."
    }
  },
  {
    icon: Scale,
    title: "Legal Defense Writer",
    description: "Generate formal legal letters and notices to defend your rights against unfair clauses or violations.",
    badge: "Pro-Bono",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    detailedContent: {
      overview: "AI-powered legal brief generator that creates professional letters, notices, and formal documents to help users stand up for their rights without expensive legal fees.",
      benefits: ["Formal legal language", "Law citations included", "Professional formatting", "Download Word/PDF", "Email integration"],
      demo: "Report: 'My landlord charged illegal cleaning fees' → Get a formal letter citing relevant laws and demanding refund."
    }
  }
];

export const FeatureShowcase = () => {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const { toast } = useToast();

  const openFeatureModal = (feature: any) => {
    setSelectedFeature(feature);
  };

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-secondary/30 via-background to-legal-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-legal-primary to-legal-primary-dark bg-clip-text text-transparent">
            Powerful Features for Everyone
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI analysis to lawyer connections, Legal Connect provides everything you need 
            to understand and navigate legal documents with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card 
                    className="group hover:shadow-hover transition-all duration-300 border-border/50 hover:border-legal-primary/20 bg-gradient-card h-full cursor-pointer hover:scale-[1.02]"
                    onClick={() => openFeatureModal(feature)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
                          <Icon className={`h-6 w-6 ${feature.color} relative z-10`} />
                        </div>
                        <Badge variant="secondary" className="text-xs bg-gradient-to-r from-legal-primary/10 to-legal-primary-dark/10">
                          {feature.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-semibold group-hover:text-legal-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground mb-4">
                        {feature.description}
                      </CardDescription>
                      <Button variant="outline" size="sm" className="w-full group-hover:bg-gradient-primary group-hover:text-primary-foreground group-hover:border-legal-primary" onClick={() => openFeatureModal(feature)}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                
                <DialogContent className="max-w-2xl bg-gradient-card">
                  <DialogHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor}`}>
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <div>
                        <DialogTitle className="text-2xl font-bold text-legal-primary">{feature.title}</DialogTitle>
                        <Badge variant="secondary" className="mt-1">{feature.badge}</Badge>
                      </div>
                    </div>
                  </DialogHeader>
                  
                  <DialogDescription asChild>
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-legal-primary/5 to-legal-primary-dark/5 p-4 rounded-lg border border-legal-primary/20">
                        <h4 className="font-semibold text-foreground mb-2">Overview</h4>
                        <p className="text-muted-foreground">{feature.detailedContent?.overview}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Key Benefits</h4>
                        <ul className="space-y-2">
                          {feature.detailedContent?.benefits?.map((benefit: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-gradient-primary rounded-full"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-br from-legal-accent/10 to-legal-accent/5 p-4 rounded-lg border border-legal-accent/20">
                        <h4 className="font-semibold text-foreground mb-2">Example</h4>
                        <p className="text-muted-foreground italic">{feature.detailedContent?.demo}</p>
                      </div>
                      
                      <div className="flex gap-2 pt-4">
                      <Button className="bg-gradient-primary shadow-legal" onClick={() => {
                        const routeMap: { [key: string]: string } = {
                          "AI-Powered Legal Assistant": "/ai-features",
                          "Risk Assessment": "/risk-assessment", 
                          "Lawyer Connect": "/lawyer-connect",
                          "Court Locator": "/court-locator",
                          "Document Comparison": "/document-comparison",
                          "Smart Contract Drafting": "/smart-contract-drafting",
                          "Legal Action Planner": "/legal-action-planner",
                          "Legal Defense Writer": "/legal-defense-writer"
                        };
                        const route = routeMap[feature.title];
                        if (route) {
                          window.location.href = route;
                        }
                      }}>
                          <Play className="mr-2 h-4 w-4" />
                          Try Demo
                        </Button>
                        <Button variant="outline" onClick={() => toast({ title: "Ask Questions", description: "Chat UI mock. Connect backend to enable document Q&A." })}>
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Ask Questions
                        </Button>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>


      </div>
    </section>
  );
};