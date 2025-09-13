import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Upload, Download, FileText, Zap, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const InstantProcessing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const processingStages = [
    { stage: "Uploading Document", progress: 20, duration: "1s" },
    { stage: "OCR Text Extraction", progress: 40, duration: "2s" },
    { stage: "Document Analysis", progress: 60, duration: "3s" },
    { stage: "Structure Detection", progress: 80, duration: "1s" },
    { stage: "Final Processing", progress: 100, duration: "1s" }
  ];

  const handleFileUpload = () => {
    setIsProcessing(true);
    setShowResults(false);
    
    let currentStageIndex = 0;
    
    const processStage = () => {
      if (currentStageIndex < processingStages.length) {
        const currentStage = processingStages[currentStageIndex];
        setProcessingStage(currentStage.stage);
        setUploadProgress(currentStage.progress);
        
        setTimeout(() => {
          currentStageIndex++;
          if (currentStageIndex < processingStages.length) {
            processStage();
          } else {
            setIsProcessing(false);
            setShowResults(true);
            toast({ title: "Processing Complete", description: "Document processed in under 8 seconds!" });
          }
        }, parseInt(currentStage.duration) * 1000);
      }
    };
    
    processStage();
  };

  const handleDownloadText = () => {
    toast({ title: "Download Started", description: "Cleaned text file is being prepared for download." });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-legal-secondary/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-legal-primary to-legal-primary-dark bg-clip-text text-transparent">
                Instant Processing
              </h1>
            </div>
            {showResults && (
              <Button onClick={handleDownloadText}>
                <Download className="h-4 w-4 mr-2" />
                Download Cleaned Text
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Section */}
          {!showResults && (
            <Card className="bg-gradient-card border-border/50">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Zap className="h-5 w-5 text-legal-primary" />
                  Lightning-Fast Document Processing
                </CardTitle>
                <CardDescription>
                  Upload scanned PDFs or images for instant OCR and text extraction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-legal-primary/30 rounded-xl p-12 text-center bg-gradient-to-br from-legal-primary/5 to-legal-primary-dark/5">
                  <Upload className="h-16 w-16 text-legal-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Upload Scanned Document</h3>
                  <p className="text-muted-foreground mb-6">
                    Supports PDF, JPG, PNG files up to 50MB
                  </p>
                  <Button 
                    onClick={handleFileUpload}
                    className="bg-gradient-primary"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Choose File & Process"}
                  </Button>
                </div>

                {/* Processing Progress */}
                {isProcessing && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{processingStage}</span>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-legal-primary" />
                        <span className="text-sm text-muted-foreground">
                          {uploadProgress < 100 ? "Processing..." : "Complete"}
                        </span>
                      </div>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                    
                    <div className="grid grid-cols-5 gap-2 mt-4">
                      {processingStages.map((stage, index) => (
                        <div key={index} className="text-center">
                          <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                            uploadProgress >= stage.progress 
                              ? "bg-green-500 text-white" 
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {uploadProgress >= stage.progress ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{stage.stage}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Speed Features */}
                <div className="grid md:grid-cols-3 gap-4 pt-6 border-t">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-1">Sub-10 Second Processing</h4>
                    <p className="text-sm text-muted-foreground">Complete analysis in under 10 seconds</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-1">Advanced OCR</h4>
                    <p className="text-sm text-muted-foreground">99.5% accuracy text extraction</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold mb-1">Batch Processing</h4>
                    <p className="text-sm text-muted-foreground">Multiple documents at once</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Section */}
          {showResults && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Original Scanned Document Preview */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-legal-primary" />
                    Original Scanned Document
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-lg h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Scanned Document Preview</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Original PDF/Image file with handwritten notes and poor quality text
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Extracted and Cleaned Text */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Cleaned Text Output
                    </CardTitle>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      99.5% Accuracy
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] w-full">
                    <div className="space-y-4 text-sm">
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded border border-green-200/50">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                          EMPLOYMENT AGREEMENT
                        </h4>
                        <p>This Employment Agreement is entered into between ABC Corporation and John Smith, effective January 1, 2024.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold">1. POSITION AND DUTIES</h4>
                        <p>Employee shall serve as Senior Software Developer and shall perform such duties as assigned by the Company.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold">2. COMPENSATION</h4>
                        <p>Employee shall receive a base salary of $85,000 per annum, payable in accordance with Company's regular payroll schedule.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold">3. BENEFITS</h4>
                        <p>Employee shall be entitled to participate in all benefit plans generally available to employees, including health insurance, retirement plans, and paid time off.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold">4. TERMINATION</h4>
                        <p>Either party may terminate this agreement with thirty (30) days written notice to the other party.</p>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded border border-blue-200/50">
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                          <strong>Processing Note:</strong> Text extracted from scanned PDF, cleaned formatting applied, 
                          special characters normalized, and document structure preserved.
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Processing Statistics */}
          {showResults && (
            <Card className="bg-gradient-to-br from-legal-primary/5 to-legal-primary-dark/5 border-legal-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-legal-primary" />
                  Processing Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-legal-primary mb-1">7.8s</div>
                    <p className="text-sm text-muted-foreground">Total Processing Time</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-1">99.5%</div>
                    <p className="text-sm text-muted-foreground">OCR Accuracy</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-1">2,847</div>
                    <p className="text-sm text-muted-foreground">Words Extracted</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-1">15</div>
                    <p className="text-sm text-muted-foreground">Sections Identified</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};