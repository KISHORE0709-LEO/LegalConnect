import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, CheckCircle, AlertTriangle, Lightbulb, Target, Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { T } from '@/components/T';

export default function PlainEnglishSummary() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<any>(null);
  const [processingStep, setProcessingStep] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const generateSummary = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setProcessingStep('Analyzing your document...');
    
    setTimeout(() => setProcessingStep('Extracting key points...'), 1000);
    setTimeout(() => setProcessingStep('Translating into plain English...'), 2000);
    
    // Mock AI response - replace with actual API call
    setTimeout(() => {
      setSummary({
        agreeing_to: "This is a loan agreement for $25,000 at a fixed interest rate of 7.5% over 5 years.",
        obligations: [
          "Make monthly payments of $497 for 60 months",
          "Maintain insurance on any collateral",
          "Notify lender of address changes within 30 days"
        ],
        risks: [
          "Late payments incur a 5% penalty fee",
          "Default may result in acceleration of full loan amount",
          "Lender can repossess collateral if payments are missed"
        ],
        options: [
          "You may repay early without penalty",
          "Request payment deferrals in case of hardship",
          "Transfer loan to another qualified borrower with lender approval"
        ]
      });
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-legal-primary/10 via-transparent to-legal-primary-dark/5"></div>
      
      <Link to="/" className="absolute top-6 left-6 z-10">
        <Button variant="ghost" className="text-primary-foreground hover:text-primary-foreground/80">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <T>Back to Home</T>
        </Button>
      </Link>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">
            <T>Plain-English Contract Summary</T>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            <T>Upload your contract and get a clear summary in simple language — no legal jargon.</T>
          </p>
        </div>

        {!summary ? (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-legal-primary">
                  <T>Upload Your Contract</T>
                </CardTitle>
                <p className="text-muted-foreground">
                  <T>We'll summarize your document in plain English — takes less than a minute.</T>
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {!isProcessing ? (
                  <>
                    <div 
                      className="border-2 border-dashed border-legal-primary/30 rounded-lg p-8 text-center hover:border-legal-primary/50 transition-colors cursor-pointer"
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => document.getElementById('file-input')?.click()}
                    >
                      <Upload className="h-12 w-12 text-legal-primary mx-auto mb-4" />
                      <p className="text-lg font-medium text-foreground mb-2">
                        <T>Drag & drop your contract here</T>
                      </p>
                      <p className="text-muted-foreground mb-4">
                        <T>or click to browse files</T>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <T>Supports PDF and DOCX files</T>
                      </p>
                    </div>
                    
                    <input
                      id="file-input"
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    
                    {file && (
                      <div className="flex items-center justify-between p-4 bg-legal-primary/10 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-legal-primary" />
                          <span className="font-medium">{file.name}</span>
                        </div>
                        <Button 
                          onClick={generateSummary}
                          className="bg-gradient-primary"
                        >
                          <T>Generate Summary</T>
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-spin h-12 w-12 border-4 border-legal-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-lg font-medium text-legal-primary mb-2">{processingStep}</p>
                    <p className="text-muted-foreground">
                      <T>Please wait while we analyze your document...</T>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardHeader className="text-center border-b">
                <CardTitle className="text-3xl text-legal-primary mb-2">
                  <T>Your Contract in Plain English</T>
                </CardTitle>
                <p className="text-muted-foreground">
                  <T>Here's what your document means in simple terms</T>
                </p>
              </CardHeader>
              
              <CardContent className="p-8 space-y-8">
                {/* What You're Agreeing To */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      <T>What You're Agreeing To</T>
                    </h3>
                  </div>
                  <p className="text-muted-foreground ml-12 text-lg">
                    {summary.agreeing_to}
                  </p>
                </div>

                {/* Your Main Obligations */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Target className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      <T>Your Main Obligations</T>
                    </h3>
                  </div>
                  <ul className="ml-12 space-y-2">
                    {summary.obligations.map((obligation: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{obligation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Risks & Penalties */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      <T>Key Risks & Penalties</T>
                    </h3>
                  </div>
                  <ul className="ml-12 space-y-2">
                    {summary.risks.map((risk: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-red-600 mt-1">•</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Your Options */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <Lightbulb className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      <T>Your Options</T>
                    </h3>
                  </div>
                  <ul className="ml-12 space-y-2">
                    {summary.options.map((option: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-yellow-600 mt-1">•</span>
                        <span>{option}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                  <Button className="bg-gradient-primary">
                    <Download className="h-4 w-4 mr-2" />
                    <T>Download Summary</T>
                  </Button>
                  <Button variant="outline">
                    <T>Show Details</T>
                  </Button>
                  <Button variant="outline">
                    <T>Talk to a Lawyer</T>
                  </Button>
                </div>

                {/* Disclaimer */}
                <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
                  <p>
                    <T>This summary is generated automatically and is not a substitute for legal advice. Please consult a qualified lawyer for complex or high-risk contracts.</T>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}