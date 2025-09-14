import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const roleConfig = {
  startup: {
    title: "Tell Us About Your Startup",
    fields: [
      { name: "orgName", label: "Organization Name", type: "text", required: true },
      { name: "industry", label: "Industry", type: "select", options: ["Technology", "Healthcare", "Finance", "E-commerce", "Education", "Other"], required: true },
      { name: "stage", label: "Stage", type: "select", options: ["Idea", "Early", "Growth", "Scaling"], required: true }
    ]
  },
  freelancer: {
    title: "Tell Us About Your Freelance Work",
    fields: [
      { name: "fullName", label: "Your Full Name", type: "text", required: true },
      { name: "profession", label: "Profession", type: "select", options: ["Designer", "Developer", "Writer", "Consultant", "Other"], required: true },
      { name: "experience", label: "Years of Experience", type: "select", options: ["0-1", "2-5", "6-10", "10+"], required: true }
    ]
  },
  student: {
    title: "Tell Us About Your Studies",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "college", label: "College/University", type: "text", required: true },
      { name: "year", label: "Year", type: "select", options: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"], required: true },
      { name: "city", label: "City", type: "text", required: true }
    ]
  },
  hr: {
    title: "Tell Us About Your HR Role",
    fields: [
      { name: "companyName", label: "Company Name", type: "text", required: true },
      { name: "companySize", label: "Company Size", type: "select", options: ["1-10", "11-50", "51-200", "200+"], required: true },
      { name: "hrNeeds", label: "Primary HR Focus", type: "select", options: ["Hiring Contracts", "Policies", "Compliance", "Employee Relations"], required: true }
    ]
  },
  farmer: {
    title: "Tell Us About Your Farm",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "farmLocation", label: "Farm Location", type: "text", required: true },
      { name: "farmingType", label: "Type of Farming", type: "select", options: ["Crop Farming", "Dairy", "Poultry", "Mixed Farming", "Other"], required: true }
    ]
  },
  other: {
    title: "Tell Us About Yourself",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "profession", label: "Profession", type: "text", required: true },
      { name: "organization", label: "Company/Organization (Optional)", type: "text", required: false }
    ]
  }
};

const BasicInfo = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get("role") as keyof typeof roleConfig;
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!role || !roleConfig[role]) {
      navigate("/");
    }
  }, [role, navigate]);

  if (!role || !roleConfig[role]) {
    return null;
  }

  const config = roleConfig[role];

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    config.fields.forEach(field => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      const params = new URLSearchParams({ role, ...formData });
      navigate(`/onboarding/legal-needs?${params}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-legal-secondary/20 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button 
          variant="ghost" 
          className="mb-8 flex items-center gap-2" 
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-card border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-legal-primary to-legal-primary-dark bg-clip-text text-transparent">
              {config.title}
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              We'll collect some basic details to give you the most relevant legal help.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {config.fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="text-sm font-medium">
                  {field.label} {field.required && <span className="text-destructive">*</span>}
                </Label>
                {field.type === "select" ? (
                  <Select 
                    value={formData[field.name] || ""} 
                    onValueChange={(value) => handleInputChange(field.name, value)}
                  >
                    <SelectTrigger id={field.name} className={errors[field.name] ? "border-destructive" : ""}>
                      <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className={errors[field.name] ? "border-destructive" : ""}
                  />
                )}
                {errors[field.name] && (
                  <p className="text-sm text-destructive">{errors[field.name]}</p>
                )}
              </div>
            ))}

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

export default BasicInfo;