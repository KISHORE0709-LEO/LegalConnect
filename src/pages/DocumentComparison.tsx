import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Upload, Download, FileText, Plus, Minus, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const DocumentComparison = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isComparing, setIsComparing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const handleFileUpload = () => {
    setIsComparing(true);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComparing(false);
          setShowComparison(true);
          toast({ title: "Comparison Complete", description: "Documents analyzed successfully!" });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const changes = [
    { type: "addition", text: "and shall include quarterly performance reviews", line: 15 },
    { type: "deletion", text: "without prior written consent", line: 23 },
    { type: "modification", oldText: "30 days notice", newText: "60 days notice", line: 45 },
    { type: "modification", oldText: "$2,000 per month", newText: "$2,500 per month", line: 67 }
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "addition":
        return <Plus className="h-4 w-4 text-green-600" />;
      case "deletion":
        return <Minus className="h-4 w-4 text-red-600" />;
      default:
        return <Edit3 className="h-4 w-4 text-blue-600" />;
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case "addition":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20";
      case "deletion":
        return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20";
      default:
        return "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20";
    }
  };

  const handleExportReport = () => {
    toast({ title: "Export Started", description: "Comparison report is being prepared for download." });
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
                Document Comparison
              </h1>
            </div>
            {showComparison && (
              <Button onClick={handleExportReport}>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!showComparison ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Upload Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-legal-primary" />
                    Original Document
                  </CardTitle>
                  <CardDescription>Upload the first version of your document</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-legal-primary/30 rounded-xl p-8 text-center bg-gradient-to-br from-legal-primary/5 to-legal-primary-dark/5">
                    <Upload className="h-12 w-12 text-legal-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload Original</h3>
                    <p className="text-muted-foreground mb-4">Drag & drop or click to browse</p>
                    <Button variant="outline">Choose File</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-legal-primary" />
                    Modified Document
                  </CardTitle>
                  <CardDescription>Upload the updated version to compare</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-legal-primary/30 rounded-xl p-8 text-center bg-gradient-to-br from-legal-primary/5 to-legal-primary-dark/5">
                    <Upload className="h-12 w-12 text-legal-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload Modified</h3>
                    <p className="text-muted-foreground mb-4">Drag & drop or click to browse</p>
                    <Button variant="outline">Choose File</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button onClick={handleFileUpload} className="bg-gradient-primary" size="lg">
                Compare Documents
              </Button>
            </div>

            {isComparing && (
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Comparing documents...</span>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Side-by-side Comparison */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Side-by-Side Comparison</CardTitle>
                  <CardDescription>
                    Changes are highlighted in the documents below
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 h-[600px]">
                    {/* Original Document */}
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <h4 className="font-semibold mb-4 text-center">Original Document</h4>
                      <div className="space-y-3 text-sm">
                        <p>Employment Agreement between Company ABC and Employee...</p>
                        <p>Term of Employment: This employment shall commence on...</p>
                        <p className="bg-red-100 dark:bg-red-900/30 p-2 rounded">
                          Line 23: <del>without prior written consent</del>
                        </p>
                        <p className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded">
                          Line 45: <del>30 days notice</del>
                        </p>
                        <p className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded">
                          Line 67: <del>$2,000 per month</del>
                        </p>
                        <p>Additional terms and conditions...</p>
                      </div>
                    </div>

                    {/* Modified Document */}
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <h4 className="font-semibold mb-4 text-center">Modified Document</h4>
                      <div className="space-y-3 text-sm">
                        <p>Employment Agreement between Company ABC and Employee...</p>
                        <p className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
                          Line 15: <ins>and shall include quarterly performance reviews</ins>
                        </p>
                        <p>Term of Employment: This employment shall commence on...</p>
                        <p className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded">
                          Line 45: <ins>60 days notice</ins>
                        </p>
                        <p className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded">
                          Line 67: <ins>$2,500 per month</ins>
                        </p>
                        <p>Additional terms and conditions...</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary of Changes */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Summary of Changes</CardTitle>
                  <CardDescription>
                    {changes.length} changes detected
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {changes.map((change, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${getChangeColor(change.type)}`}>
                      <div className="flex items-start gap-2">
                        {getChangeIcon(change.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              Line {change.line}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {change.type.charAt(0).toUpperCase() + change.type.slice(1)}
                            </Badge>
                          </div>
                          {change.type === "modification" ? (
                            <div className="text-xs space-y-1">
                              <p><span className="text-red-600">Old:</span> {change.oldText}</p>
                              <p><span className="text-green-600">New:</span> {change.newText}</p>
                            </div>
                          ) : (
                            <p className="text-xs">{change.text}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <div className="font-bold text-green-600">1</div>
                        <div className="text-muted-foreground">Added</div>
                      </div>
                      <div>
                        <div className="font-bold text-red-600">1</div>
                        <div className="text-muted-foreground">Deleted</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-600">2</div>
                        <div className="text-muted-foreground">Modified</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};