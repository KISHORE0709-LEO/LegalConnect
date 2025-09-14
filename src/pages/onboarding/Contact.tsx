import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    whatsapp: "",
    lawyerRecommendations: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const role = searchParams.get("role");
    if (!role) {
      navigate("/");
    }
  }, [navigate, searchParams]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.whatsapp && !/^\+?[\d\s-()]+$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      const currentParams = Object.fromEntries(searchParams);
      const params = new URLSearchParams({ 
        ...currentParams, 
        email: formData.email,
        whatsapp: formData.whatsapp,
        lawyerRecommendations: formData.lawyerRecommendations.toString()
      });
      navigate(`/onboarding/summary?${params}`);
    }
  };

  const handleBack = () => {
    const currentParams = Object.fromEntries(searchParams);
    delete currentParams.email;
    delete currentParams.whatsapp;
    delete currentParams.lawyerRecommendations;
    const params = new URLSearchParams(currentParams);
    navigate(`/onboarding/legal-needs?${params}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-legal-secondary/20 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
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
              How Should We Reach You?
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              We'll send your legal checklist and recommendations directly to you.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-sm font-medium">
                WhatsApp Number (Optional)
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                placeholder="+91 98765 43210"
                className={errors.whatsapp ? "border-destructive" : ""}
              />
              {errors.whatsapp && (
                <p className="text-sm text-destructive">{errors.whatsapp}</p>
              )}
              <p className="text-xs text-muted-foreground">
                We'll send updates and reminders via WhatsApp if provided
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-legal-primary/5 to-legal-primary-dark/10 rounded-lg border border-legal-primary/20">
              <div className="space-y-1">
                <Label htmlFor="lawyer-recommendations" className="text-sm font-medium">
                  Would you like lawyer recommendations?
                </Label>
                <p className="text-xs text-muted-foreground">
                  Get matched with verified lawyers based on your needs
                </p>
              </div>
              <Switch
                id="lawyer-recommendations"
                checked={formData.lawyerRecommendations}
                onCheckedChange={(checked) => handleInputChange("lawyerRecommendations", checked)}
              />
            </div>

            <div className="pt-6">
              <Button 
                onClick={handleNext}
                className="w-full bg-gradient-primary shadow-legal hover:shadow-hover transition-all duration-300"
                size="lg"
              >
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;