import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertTriangle, Share2, FileX, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const RiskAssessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const riskData = [
    { label: "Low Risk", value: 45, color: "text-green-600", bgColor: "bg-green-500" },
    { label: "Medium Risk", value: 35, color: "text-yellow-600", bgColor: "bg-yellow-500" },
    { label: "High Risk", value: 20, color: "text-red-600", bgColor: "bg-red-500" }
  ];

  const flaggedClauses = [
    {
      id: 1,
      clause: "Termination without notice",
      risk: "high",
      description: "Employer can terminate employment immediately without any notice period",
      suggestion: "Request minimum 30-day notice period for job security"
    },
    {
      id: 2,
      clause: "Unlimited liability",
      risk: "high", 
      description: "You're responsible for all damages regardless of cause",
      suggestion: "Negotiate liability cap to limit financial exposure"
    },
    {
      id: 3,
      clause: "Non-compete duration",
      risk: "medium",
      description: "2-year non-compete period after employment ends",
      suggestion: "Consider reducing to 6-12 months in your industry"
    },
    {
      id: 4,
      clause: "Intellectual property rights",
      risk: "low",
      description: "Standard IP assignment clause for work products",
      suggestion: "Clause is fair and industry-standard"
    }
  ];

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "high":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20";
      case "medium":
        return "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20";
      default:
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20";
    }
  };

  const handleShareWithLawyer = () => {
    toast({ title: "Shared with Lawyer", description: "Risk assessment has been sent to your preferred lawyer." });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-legal-secondary/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-legal-primary to-legal-primary-dark bg-clip-text text-transparent">
              Risk Assessment
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Risk Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-legal-primary" />
                  Risk Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Risk Pie Chart Visual */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="8"/>
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="8" 
                            strokeDasharray={`${20 * 2.51} 251`} strokeDashoffset="0"/>
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#eab308" strokeWidth="8" 
                            strokeDasharray={`${35 * 2.51} 251`} strokeDashoffset={`-${20 * 2.51}`}/>
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="8" 
                            strokeDasharray={`${45 * 2.51} 251`} strokeDashoffset={`-${55 * 2.51}`}/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">75</div>
                      <div className="text-sm text-muted-foreground">Risk Score</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {riskData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.bgColor}`}></div>
                        <span className="text-sm">{item.label}</span>
                      </div>
                      <span className={`text-sm font-medium ${item.color}`}>{item.value}%</span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={handleShareWithLawyer}
                  className="w-full mt-6 bg-gradient-primary"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share with Lawyer
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Flagged Clauses */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileX className="h-5 w-5 text-legal-primary" />
                  Flagged Clauses
                </CardTitle>
                <CardDescription>
                  AI has identified these clauses that need your attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {flaggedClauses.map((clause) => (
                  <div key={clause.id} className={`p-4 rounded-lg border ${getRiskColor(clause.risk)}`}>
                    <div className="flex items-start gap-3">
                      {getRiskIcon(clause.risk)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{clause.clause}</h4>
                          <Badge variant={clause.risk === "high" ? "destructive" : clause.risk === "medium" ? "secondary" : "default"}>
                            {clause.risk.toUpperCase()} RISK
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{clause.description}</p>
                        <div className="bg-background/50 p-3 rounded border border-border/50">
                          <p className="text-sm"><strong>AI Suggestion:</strong> {clause.suggestion}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};