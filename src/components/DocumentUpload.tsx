import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Image, 
  AlertCircle, 
  CheckCircle,
  Languages,
  Scan
} from "lucide-react";

export const DocumentUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Upload Your Document
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Drag and drop your legal document or click to browse. We support PDFs, Word documents, 
            and scanned images with OCR technology.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-dashed border-border hover:border-legal-primary/50 transition-colors duration-300 bg-gradient-card">
            <CardContent className="p-12">
              {!uploadComplete ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-legal-primary/10 rounded-full mb-6">
                    <Upload className="h-12 w-12 text-legal-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    Drop your document here
                  </h3>
                  
                  <p className="text-muted-foreground mb-8">
                    Or click to browse your files
                  </p>

                  {isUploading ? (
                    <div className="space-y-4">
                      <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
                      <p className="text-sm text-muted-foreground">
                        Uploading and analyzing... {uploadProgress}%
                      </p>
                    </div>
                  ) : (
                    <Button 
                      size="lg" 
                      onClick={handleUpload}
                      className="bg-gradient-primary shadow-legal hover:shadow-hover transition-all duration-300"
                    >
                      Choose File
                      <Upload className="ml-2 h-5 w-5" />
                    </Button>
                  )}

                  <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
                    <div className="flex items-start space-x-3">
                      <FileText className="h-6 w-6 text-legal-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">PDF & Word Support</h4>
                        <p className="text-sm text-muted-foreground">Upload any PDF or Word document</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Scan className="h-6 w-6 text-legal-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">OCR Technology</h4>
                        <p className="text-sm text-muted-foreground">Scanned documents are automatically converted</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Languages className="h-6 w-6 text-legal-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">Multi-Language</h4>
                        <p className="text-sm text-muted-foreground">English, Hindi, Telugu, Tamil supported</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-risk-low/10 rounded-full mb-6">
                    <CheckCircle className="h-12 w-12 text-risk-low" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    Document Analyzed Successfully!
                  </h3>
                  
                  <p className="text-muted-foreground mb-8">
                    Your contract has been processed and analyzed. View the results below.
                  </p>

                  <Button 
                    size="lg"
                    className="bg-gradient-primary shadow-legal hover:shadow-hover transition-all duration-300"
                  >
                    View Analysis
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {uploadComplete && (
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Card className="border-risk-low/20 bg-risk-low/5">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-risk-low" />
                    <CardTitle className="text-risk-low">Low Risk Detected</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Most clauses are standard and favorable. 2 items need your attention.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-legal-accent/20 bg-legal-accent/5">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-legal-accent" />
                    <CardTitle className="text-legal-accent">Summary Available</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Plain language summary and clause-by-clause breakdown ready.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};