import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const legalNeedsConfig = {
  startup: [
    { id: "investment", label: "📑 Investment Docs", description: "Investor agreements, term sheets, due diligence" },
    { id: "partnership", label: "🤝 Partnership Agreements", description: "Co-founder agreements, joint ventures" },
    { id: "equity", label: "📊 Equity Terms", description: "Stock options, vesting schedules, cap tables" },
    { id: "compliance", label: "🛡️ Compliance", description: "Regulatory requirements, data protection" },
    { id: "contracts", label: "🏢 Contracts", description: "Service agreements, vendor contracts" }
  ],
  freelancer: [
    { id: "service", label: "📝 Service Agreements", description: "Client contracts, project agreements" },
    { id: "nda", label: "🔒 NDAs", description: "Non-disclosure agreements, confidentiality" },
    { id: "payment", label: "💰 Payment Terms", description: "Invoicing, payment schedules, late fees" },
    { id: "tax", label: "🧾 Tax Compliance", description: "Business registration, tax obligations" }
  ],
  student: [
    { id: "internship", label: "📜 Internship Contracts", description: "Internship agreements, stipend terms" },
    { id: "housing", label: "🏠 Housing Agreements", description: "Rental agreements, hostel contracts" },
    { id: "loans", label: "💳 Student Loans", description: "Education loans, repayment terms" },
    { id: "stipend", label: "🧾 Stipend Policies", description: "Scholarship terms, fellowship agreements" }
  ],
  hr: [
    { id: "employment", label: "🧑‍🤝‍🧑 Employment Contracts", description: "Offer letters, job agreements" },
    { id: "policies", label: "🏛 Policies & Handbooks", description: "Employee handbooks, company policies" },
    { id: "compliance", label: "✅ Compliance Docs", description: "Labor law compliance, statutory requirements" },
    { id: "disputes", label: "⚖️ Employee Disputes", description: "Grievance handling, disciplinary actions" }
  ],
  farmer: [
    { id: "land", label: "🌱 Land Agreements", description: "Land lease, purchase agreements" },
    { id: "insurance", label: "☔ Crop Insurance", description: "Weather insurance, crop protection" },
    { id: "supply", label: "📦 Supply Contracts", description: "Seed suppliers, equipment contracts" },
    { id: "schemes", label: "💵 Government Schemes", description: "Subsidies, loan schemes, benefits" }
  ],
  other: []
};

const LegalNeeds = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get("role") as keyof typeof legalNeedsConfig;
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [customNeed, setCustomNeed] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!role || !legalNeedsConfig[role]) {
      navigate("/");
    }
  }, [role, navigate]);

  if (!role || !legalNeedsConfig[role]) {
    return null;
  }

  const needs = legalNeedsConfig[role];

  const handleNeedToggle = (needId: string) => {
    setSelectedNeeds(prev => 
      prev.includes(needId) 
        ? prev.filter(id => id !== needId)
        : [...prev, needId]
    );
    setError("");
  };

  const handleNext = () => {
    if (role === "other" && !customNeed.trim()) {
      setError("Please describe your legal needs");
      return;
    }
    if (role !== "other" && selectedNeeds.length === 0) {
      setError("Please select at least one legal need");
      return;
    }

    const currentParams = Object.fromEntries(searchParams);
    const needsData = role === "other" 
      ? { customNeed } 
      : { selectedNeeds: selectedNeeds.join(",") };
    const params = new URLSearchParams({ ...currentParams, ...needsData });
    navigate(`/onboarding/contact?${params}`);
  };

  const handleBack = () => {
    const currentParams = Object.fromEntries(searchParams);
    delete currentParams.selectedNeeds;
    delete currentParams.customNeed;
    const params = new URLSearchParams(currentParams);
    navigate(`/onboarding/basic-info?${params}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-legal-secondary/20 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
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
              What Do You Need Help With?
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Choose the areas you want us to focus on. You can select multiple options.
            </p>
          </CardHeader>
          <CardContent>
            {role === "other" ? (
              <div className="space-y-4">
                <Label htmlFor="customNeed" className="text-sm font-medium">
                  📋 Describe Your Legal Needs
                </Label>
                <Textarea
                  id="customNeed"
                  value={customNeed}
                  onChange={(e) => {
                    setCustomNeed(e.target.value);
                    setError("");
                  }}
                  placeholder="Tell us about the legal documents or advice you need help with..."
                  className="min-h-32"
                />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {needs.map((need) => (
                  <Card 
                    key={need.id}
                    className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-hover ${
                      selectedNeeds.includes(need.id)
                        ? 'border-legal-primary bg-gradient-to-br from-legal-primary/10 to-legal-primary-dark/10'
                        : 'border-border/50 hover:border-legal-primary/30'
                    }`}
                    onClick={() => handleNeedToggle(need.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          checked={selectedNeeds.includes(need.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{need.label}</h3>
                          <p className="text-sm text-muted-foreground">{need.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {error && (
              <p className="text-sm text-destructive mt-4 text-center">{error}</p>
            )}

            <div className="pt-8">
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

export default LegalNeeds;