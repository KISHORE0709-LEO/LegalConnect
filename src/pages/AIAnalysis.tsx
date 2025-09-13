import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Upload, Download, FileText, Lightbulb, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const AIAnalysis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = () => {
    setIsAnalyzing(true);
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          toast({ title: "Analysis Complete", description: "Your document has been simplified successfully!" });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const glossaryTerms = [
    { term: "Indemnify", definition: "To protect someone from harm or loss by promising to pay for any damages" },
    { term: "Lessor", definition: "The person who owns property and rents it out to someone else" },
    { term: "Breach", definition: "Breaking or not following the rules in a contract" },
    { term: "Liability", definition: "Being responsible for damages or harm caused to others" }
  ];

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
              AI-Powered Analysis
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Upload Section */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-legal-primary" />
                  Upload Document
                </CardTitle>
                <CardDescription>
                  Upload your legal document to get AI-powered analysis and simplification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-legal-primary/30 rounded-xl p-8 text-center bg-gradient-to-br from-legal-primary/5 to-legal-primary-dark/5">
                  <Upload className="h-12 w-12 text-legal-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Drag & drop your document here</h3>
                  <p className="text-muted-foreground mb-4">or click to browse files</p>
                  <Button onClick={handleFileUpload} className="bg-gradient-primary">
                    Choose File
                  </Button>
                </div>
                
                {isAnalyzing && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Analyzing document...</span>
                      <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Document Preview */}
            {uploadProgress === 100 && (
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-legal-primary" />
                    Document Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Original Clause 1:</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      "The <mark className="bg-yellow-200 dark:bg-yellow-800">lessee</mark> shall <mark className="bg-yellow-200 dark:bg-yellow-800">indemnify</mark> the <mark className="bg-yellow-200 dark:bg-yellow-800">lessor</mark> against all claims, damages, costs, and expenses arising from any <mark className="bg-red-200 dark:bg-red-800">breach</mark> of this agreement."
                    </p>
                    <Badge variant="outline" className="mb-3">High Risk Terms Detected</Badge>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 p-4 rounded-lg border border-green-200/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-green-600" />
                      <h4 className="font-semibold text-green-800 dark:text-green-200">Simplified Version:</h4>
                    </div>
                    <p className="text-green-700 dark:text-green-300">
                      "If you (the renter) break any rules in this agreement, you must pay for any losses or legal costs the landlord faces because of it."
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Simplified Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Glossary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-legal-primary" />
                  Legal Glossary
                </CardTitle>
                <CardDescription>
                  Understanding key legal terms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {glossaryTerms.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-legal-primary">{item.term}</h4>
                    <p className="text-sm text-muted-foreground">{item.definition}</p>
                    {index < glossaryTerms.length - 1 && <Separator />}
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