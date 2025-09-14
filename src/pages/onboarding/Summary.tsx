import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, User, Mail, Phone, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Summary = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const role = searchParams.get("role");
    const email = searchParams.get("email");
    if (!role || !email) {
      navigate("/");
    }
  }, [navigate, searchParams]);

  const role = searchParams.get("role");
  const email = searchParams.get("email");
  const whatsapp = searchParams.get("whatsapp");
  const lawyerRecommendations = searchParams.get("lawyerRecommendations") === "true";

  // Get role-specific data
  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      startup: "Startup",
      freelancer: "Freelancer", 
      student: "Student",
      hr: "HR Professional",
      farmer: "Farmer",
      other: "Other"
    };
    return roleNames[role as keyof typeof roleNames] || role;
  };

  const getSelectedNeeds = () => {
    const selectedNeeds = searchParams.get("selectedNeeds");
    const customNeed = searchParams.get("customNeed");
    
    if (customNeed) {
      return [customNeed];
    }
    
    if (selectedNeeds) {
      return selectedNeeds.split(",");
    }
    
    return [];
  };

  const getUserInfo = () => {
    const info: Record<string, string> = {};
    
    // Extract all form data
    for (const [key, value] of searchParams.entries()) {
      if (!["role", "selectedNeeds", "customNeed", "email", "whatsapp", "lawyerRecommendations"].includes(key)) {
        info[key] = value;
      }
    }
    
    return info;
  };

  const handleBack = () => {
    const currentParams = Object.fromEntries(searchParams);
    const params = new URLSearchParams(currentParams);
    navigate(`/onboarding/contact?${params}`);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const params = new URLSearchParams(searchParams);
    navigate(`/onboarding/success?${params}`);
  };

  const userInfo = getUserInfo();
  const selectedNeeds = getSelectedNeeds();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-legal-secondary/20 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Button 
          variant="ghost" 
          className="mb-8 flex items-center gap-2" 
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Card className="shadow-card border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-legal-primary to-legal-primary-dark bg-clip-text text-transparent">
              Review Your Details
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Here's what you shared. Make changes if needed before proceeding.
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Role & Basic Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-legal-primary" />
                <h3 className="text-lg font-semibold">Basic Information</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Role</p>
                  <Badge variant="secondary" className="bg-gradient-to-r from-legal-primary/10 to-legal-primary-dark/10 text-legal-primary">
                    {getRoleDisplayName(role!)}
                  </Badge>
                </div>
                {Object.entries(userInfo).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <p className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Needs */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-legal-primary" />
                <h3 className="text-lg font-semibold">Legal Needs</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedNeeds.map((need, index) => (
                  <Badge key={index} variant="outline" className="border-legal-primary/20">
                    {need}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5 text-legal-primary" />
                <h3 className="text-lg font-semibold">Contact Information</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{email}</span>
                </div>
                {whatsapp && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{whatsapp}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <CheckCircle2 className={`h-4 w-4 ${lawyerRecommendations ? 'text-green-500' : 'text-muted-foreground'}`} />
                  <span className="text-sm">
                    Lawyer recommendations: {lawyerRecommendations ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-primary shadow-legal hover:shadow-hover transition-all duration-300"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full mr-2" />
                    Generating Your Legal Checklist...
                  </>
                ) : (
                  <>
                    Generate My Legal Checklist
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Summary;