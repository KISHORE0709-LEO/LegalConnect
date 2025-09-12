import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Shield, 
  MessageSquare, 
  Users, 
  MapPin, 
  FileSearch,
  Globe,
  Mic,
  Zap
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced AI breaks down complex legal jargon into plain language you can understand.",
    badge: "Core Feature",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Color-coded risk levels (Green/Yellow/Red) highlight potential issues and unfavorable terms.",
    badge: "Risk Detection",
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    icon: MessageSquare,
    title: "Chat with Documents",
    description: "Ask questions about your contract in natural language and get instant, accurate answers.",
    badge: "Interactive",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: Users,
    title: "Lawyer Connect",
    description: "Direct connection to verified lawyers with chat, video calls, and appointment booking.",
    badge: "Professional",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: MapPin,
    title: "Court Locator",
    description: "Find nearby courts, legal aid centers, and government offices with directions and hours.",
    badge: "Navigation",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    icon: FileSearch,
    title: "Document Comparison",
    description: "Compare multiple versions to detect changes, additions, or modifications in contracts.",
    badge: "Analysis",
    color: "text-teal-600",
    bgColor: "bg-teal-50"
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Available in English, Hindi, Telugu, and Tamil with accurate legal translations.",
    badge: "Accessibility",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  {
    icon: Mic,
    title: "Voice Assistant",
    description: "Ask questions via voice and get explanations read aloud in your preferred language.",
    badge: "Voice AI",
    color: "text-pink-600",
    bgColor: "bg-pink-50"
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "OCR technology and fast AI processing deliver results in seconds, not hours.",
    badge: "Speed",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  }
];

export const FeatureShowcase = () => {
  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
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
              <Card 
                key={index}
                className="group hover:shadow-hover transition-all duration-300 border-border/50 hover:border-legal-primary/20 bg-gradient-card h-full"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-legal-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-primary p-8 rounded-2xl shadow-legal text-primary-foreground max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Make Legal Documents Simple?
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Join thousands of users who trust Legal Connect for their document analysis needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-legal-accent">10K+</div>
                <div className="text-sm text-primary-foreground/70">Documents Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-legal-accent">500+</div>
                <div className="text-sm text-primary-foreground/70">Verified Lawyers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-legal-accent">95%</div>
                <div className="text-sm text-primary-foreground/70">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};