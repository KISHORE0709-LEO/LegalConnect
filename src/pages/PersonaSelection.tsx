import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { 
  Briefcase, 
  GraduationCap, 
  Building2, 
  UserCheck, 
  Tractor,
  Users,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const personas = [
  {
    id: "freelancer",
    icon: Briefcase,
    title: "Freelancer",
    description: "Service agreements, NDAs, payment terms",
    color: "text-blue-600"
  },
  {
    id: "startup",
    icon: Building2,
    title: "Startup",
    description: "Investment docs, partnership agreements, equity terms",
    color: "text-green-600"
  },
  {
    id: "student",
    icon: GraduationCap,
    title: "Student",
    description: "Internship contracts, housing agreements, loans",
    color: "text-purple-600"
  },
  {
    id: "hr",
    icon: UserCheck,
    title: "HR Professional",
    description: "Employment contracts, policies, compliance docs",
    color: "text-orange-600"
  },
  {
    id: "farmer",
    icon: Tractor,
    title: "Farmer",
    description: "Land agreements, crop insurance, supply contracts",
    color: "text-emerald-600"
  },
  {
    id: "other",
    icon: Users,
    title: "Other",
    description: "Custom analysis for your specific profession",
    color: "text-gray-600"
  }
];

const PersonaSelection = () => {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [customOccupation, setCustomOccupation] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateUserData } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId);
  };

  const handleContinue = async () => {
    if (!selectedPersona) return;
    
    if (selectedPersona === 'other' && !customOccupation.trim()) {
      toast({
        title: "Occupation required",
        description: "Please enter your occupation.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      const personaData = {
        persona: selectedPersona,
        occupation: selectedPersona === 'other' ? customOccupation.trim() : selectedPersona,
        personaSelectedAt: new Date().toISOString()
      };
      
      await updateUserData(personaData);
      
      toast({
        title: "Setup complete!",
        description: "Welcome to your personalized legal assistant.",
      });
      
      window.location.href = '/';
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="py-20 bg-gradient-to-br from-secondary/30 via-background to-legal-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-legal-primary to-legal-primary-dark bg-clip-text text-transparent">
              Choose Your Perspective
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get personalized analysis and insights tailored to your role. 
              Our AI adapts explanations based on your profession and needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personas.map((persona) => {
              const Icon = persona.icon;
              const isSelected = selectedPersona === persona.id;
              return (
                <Card 
                  key={persona.id}
                  onClick={() => handlePersonaSelect(persona.id)}
                  className={`group hover:shadow-hover transition-all duration-300 cursor-pointer border-border/50 hover:border-legal-primary/20 ${
                    isSelected 
                      ? 'ring-2 ring-legal-primary bg-gradient-to-br from-legal-primary/10 to-legal-primary-dark/10 border-legal-primary' 
                      : 'bg-gradient-card'
                  }`}
                >
                  <CardHeader className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                      isSelected ? 'bg-gradient-primary' : 'bg-gradient-to-br from-legal-primary/5 to-legal-primary-dark/10'
                    } shadow-card mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 ${isSelected ? 'text-primary-foreground' : persona.color}`} />
                    </div>
                    <CardTitle className={`text-xl font-semibold ${isSelected ? 'text-legal-primary' : ''}`}>
                      {persona.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-muted-foreground mb-6">
                      {persona.description}
                    </CardDescription>
                     <Button 
                      variant={isSelected ? "default" : "outline"}
                      className={`w-full transition-all duration-300 ${
                        isSelected 
                          ? 'bg-gradient-primary shadow-legal' 
                          : 'group-hover:bg-legal-primary group-hover:text-primary-foreground group-hover:border-legal-primary'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select Role'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {selectedPersona === 'other' && (
            <div className="max-w-md mx-auto mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Tell us about your occupation</CardTitle>
                  <CardDescription>This helps us provide more relevant legal guidance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Your Occupation</Label>
                    <Input
                      id="occupation"
                      placeholder="e.g., Teacher, Doctor, Engineer, Artist"
                      value={customOccupation}
                      onChange={(e) => setCustomOccupation(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={handleContinue}
              disabled={!selectedPersona || loading || (selectedPersona === 'other' && !customOccupation.trim())}
              className="bg-gradient-primary shadow-legal hover:shadow-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Continue to Home"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonaSelection;