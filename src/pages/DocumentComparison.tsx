import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, AlertTriangle, CheckCircle, XCircle, MessageSquare, Scale, Eye } from "lucide-react";
import { Header } from "@/components/Header";
import { DocumentUpload } from "@/components/DocumentUpload";

export default function DocumentComparison() {
  const [documents, setDocuments] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [chatQuery, setChatQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("upload");

  const handleDocumentUpload = (files: File[]) => {
    setDocuments(files);
  };

  const analyzeDocuments = async () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        riskScore: 7.2,
        riskLevel: "High",
        extractedClauses: [
          { type: "Payment Terms", content: "Payment due within 60 days", risk: "medium", highlighted: true },
          { type: "Non-Compete", content: "2-year restriction in same industry", risk: "high", highlighted: true },
          { type: "Liability", content: "No liability cap specified", risk: "high", highlighted: true },
          { type: "Termination", content: "30-day notice required", risk: "low", highlighted: false },
          { type: "Confidentiality", content: "5-year confidentiality period", risk: "medium", highlighted: true }
        ],
        differences: documents.length === 2 ? [
          { type: "added", clause: "Non-compete clause", description: "Added 2-year non-compete restriction", risk: "high" },
          { type: "modified", clause: "Payment terms", description: "Changed from 30 days to 60 days", risk: "medium" },
          { type: "removed", clause: "Liability cap", description: "Removed $100,000 liability limitation", risk: "high" }
        ] : [],
        summary: documents.length === 1 
          ? "Document contains several high-risk clauses including unlimited liability and restrictive non-compete terms."
          : "The updated contract introduces significant changes that increase legal risk, particularly the new non-compete clause and removal of liability protections.",
        recommendations: [
          { action: "Review non-compete clause", priority: "high", description: "Consider negotiating shorter restriction period" },
          { action: "Add liability cap", priority: "high", description: "Protect against unlimited financial exposure" },
          { action: "Clarify payment terms", priority: "medium", description: "Ensure payment schedule is acceptable" }
        ]
      });
      setIsAnalyzing(false);
      setActiveTab("analysis");
    }, 3000);
  };

  const handleChatQuery = () => {
    if (!chatQuery.trim()) return;
    
    const response = {
      query: chatQuery,
      answer: "This non-compete clause prevents you from working in the same industry for 2 years after contract termination. This is quite restrictive and may limit your future employment opportunities. Consider negotiating for a shorter period (6-12 months) or narrower scope."
    };
    
    setChatHistory([...chatHistory, response]);
    setChatQuery("");
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "high": return <XCircle className="h-4 w-4" />;
      case "medium": return <AlertTriangle className="h-4 w-4" />;
      case "low": return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Document Analysis</h1>
            <p className="text-muted-foreground text-lg">
              Upload, analyze, and understand your legal documents with AI-powered insights
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab("upload")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === "upload" ? "bg-background shadow-sm" : "hover:bg-background/50"
              }`}
            >
              Upload & Parse
            </button>
            <button 
              onClick={() => setActiveTab("analysis")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === "analysis" ? "bg-background shadow-sm" : "hover:bg-background/50"
              }`}
              disabled={!analysisResult}
            >
              Analysis Results
            </button>
            <button 
              onClick={() => setActiveTab("chat")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === "chat" ? "bg-background shadow-sm" : "hover:bg-background/50"
              }`}
              disabled={!analysisResult}
            >
              Ask Questions
            </button>
          </div>

          {/* Upload Tab */}
          {activeTab === "upload" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentUpload 
                  onUpload={handleDocumentUpload}
                  maxFiles={2}
                  acceptedTypes={[".pdf", ".doc", ".docx", ".txt"]}
                />
                
                {documents.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Uploaded Documents:</h3>
                    <div className="space-y-2">
                      {documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">{doc.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={analyzeDocuments}
                      disabled={isAnalyzing}
                      className="mt-4 w-full bg-gradient-primary"
                    >
                      {isAnalyzing ? "Analyzing Documents..." : documents.length === 1 ? "Analyze Document" : "Compare Documents"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Analysis Tab */}
          {activeTab === "analysis" && analysisResult && (
            <div className="space-y-6">
              {/* Risk Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Legal Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-red-600">
                        {analysisResult.riskScore}/10
                      </div>
                      <div className="text-sm text-muted-foreground">Risk Score</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-medium text-red-600">{analysisResult.riskLevel} Risk</div>
                      <div className="text-xs text-muted-foreground">Requires immediate attention</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{analysisResult.summary}</p>
                </CardContent>
              </Card>

              {/* Extracted Clauses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Clause Extraction & Highlighting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.extractedClauses.map((clause: any, index: number) => (
                      <div key={index} className={`p-3 rounded-lg border ${
                        clause.highlighted ? getRiskColor(clause.risk) : "bg-gray-50 border-gray-200"
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {getRiskIcon(clause.risk)}
                            <span className="font-semibold">{clause.type}</span>
                          </div>
                          {clause.highlighted && (
                            <span className="text-xs px-2 py-1 rounded bg-white/50">
                              {clause.risk.toUpperCase()} RISK
                            </span>
                          )}
                        </div>
                        <p className="text-sm">{clause.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Document Differences (if comparing) */}
              {analysisResult.differences.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Document Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResult.differences.map((diff: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getRiskIcon(diff.risk)}
                              <span className="font-semibold">{diff.clause}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              diff.type === "added" ? "bg-green-100 text-green-800" :
                              diff.type === "removed" ? "bg-red-100 text-red-800" :
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {diff.type.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{diff.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResult.recommendations.map((rec: any, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          rec.priority === "high" ? "bg-red-500" :
                          rec.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                        }`} />
                        <div className="flex-1">
                          <h4 className="font-semibold">{rec.action}</h4>
                          <p className="text-sm text-muted-foreground">{rec.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
                    <Button variant="outline" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Defense Letter
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Create Action Plan
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Connect with Lawyer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === "chat" && analysisResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Ask Questions About Your Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chatHistory.length > 0 && (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {chatHistory.map((chat, index) => (
                        <div key={index} className="space-y-2">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm font-medium">You asked:</p>
                            <p className="text-sm">{chat.query}</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm font-medium">AI Response:</p>
                            <p className="text-sm">{chat.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Ask about clauses, risks, or get explanations in plain language..."
                      value={chatQuery}
                      onChange={(e) => setChatQuery(e.target.value)}
                      className="flex-1"
                      rows={2}
                    />
                    <Button onClick={handleChatQuery} disabled={!chatQuery.trim()}>
                      Ask
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Example questions: "What does this non-compete clause mean?", "How risky is this contract?", "What should I negotiate?"
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}