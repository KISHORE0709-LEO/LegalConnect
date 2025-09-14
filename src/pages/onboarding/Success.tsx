import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download, Calendar, FileText, ArrowRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const email = searchParams.get("email");
  const role = searchParams.get("role");
  const lawyerRecommendations = searchParams.get("lawyerRecommendations") === "true";

  const handleViewChecklist = () => {
    toast({
      title: "Checklist Generated!",
      description: "Your personalized legal checklist has been created based on your profile."
    });
    // In a real app, this would navigate to the actual checklist page
    navigate("/");
  };

  const handleBookLawyer = () => {
    toast({
      title: "Lawyer Booking",
      description: "Redirecting to lawyer consultation booking..."
    });
    navigate("/lawyers");
  };

  const handleDownloadSummary = () => {
    toast({
      title: "Download Started",
      description: "Your personalized summary PDF is being prepared..."
    });
    // In a real app, this would trigger an actual PDF download
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-legal-secondary/20 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-card border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-legal-primary to-legal-primary-dark bg-clip-text text-transparent">
              Your Legal Checklist is Ready! 🎉
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              We've created a personalized legal roadmap for you. Here's what you can explore next.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Success Summary */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">What We've Prepared for You:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>✓ Personalized legal checklist based on your {role} profile</li>
                <li>✓ Priority recommendations for your specific needs</li>
                <li>✓ Document templates and guidelines</li>
                {lawyerRecommendations && <li>✓ Curated lawyer recommendations in your area</li>}
              </ul>
            </div>

            {/* Email Confirmation */}
            <div className="text-center p-4 bg-gradient-to-r from-legal-primary/5 to-legal-primary-dark/10 rounded-lg border border-legal-primary/20">
              <p className="text-sm text-muted-foreground">
                📧 A detailed checklist has been sent to <strong>{email}</strong>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={handleViewChecklist}
                className="w-full bg-gradient-primary shadow-legal hover:shadow-hover transition-all duration-300"
                size="lg"
              >
                <FileText className="mr-2 h-5 w-5" />
                View Checklist
              </Button>

              {lawyerRecommendations && (
                <Button 
                  onClick={handleBookLawyer}
                  variant="outline"
                  className="w-full border-legal-primary text-legal-primary hover:bg-legal-primary hover:text-primary-foreground"
                  size="lg"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Lawyer Call
                </Button>
              )}

              <Button 
                onClick={handleDownloadSummary}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Summary (PDF)
              </Button>
            </div>

            {/* Next Steps */}
            <div className="space-y-4 pt-6 border-t border-border">
              <h3 className="font-semibold text-center">What's Next?</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-card rounded-lg border border-border/50">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Review Your Checklist</p>
                    <p className="text-sm text-muted-foreground">Start with the highest priority items</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-card rounded-lg border border-border/50">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Upload Documents for Analysis</p>
                    <p className="text-sm text-muted-foreground">Get AI-powered insights on your existing documents</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-card rounded-lg border border-border/50">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Connect with Experts</p>
                    <p className="text-sm text-muted-foreground">Get professional help when you need it</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-6">
              <Button 
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-legal-primary hover:text-legal-primary-dark"
              >
                Back to Home
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Success;