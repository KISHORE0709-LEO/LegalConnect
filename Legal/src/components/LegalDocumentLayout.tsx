import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LegalHealthBadge } from "@/components/LegalHealthBadge";
import { DocumentUpload } from "@/components/DocumentUpload";
import { DocumentViewer } from "@/components/DocumentViewer";
import { ClauseList } from "@/components/ClauseList";
import { ChatPanel } from "@/components/ChatPanel";
import { RiskBreakdown } from "@/components/RiskBreakdown";
import { FileText, Globe, UserCheck, Settings, BarChart3 } from "lucide-react";

interface Clause {
  id: string;
  number: string;
  title: string;
  excerpt: string;
  fullText: string;
  riskLevel: 'safe' | 'caution' | 'high';
  tags: string[];
  explanation?: string;
  startOffset: number;
  endOffset: number;
}

export const LegalDocumentLayout = () => {
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [selectedClause, setSelectedClause] = useState<Clause | null>(null);
  const [highlightRange, setHighlightRange] = useState<{ start: number; end: number } | null>(null);
  const [language, setLanguage] = useState("english");
  const [userRole, setUserRole] = useState("tenant");
  const [legalHealthScore] = useState(67); // Mock score
  const [showRiskBreakdown, setShowRiskBreakdown] = useState(false);

  const handleDocumentUpload = (docId: string) => {
    setDocumentId(docId);
  };

  const handleUploadNew = () => {
    setDocumentId(null);
    setSelectedClause(null);
    setHighlightRange(null);
    setShowRiskBreakdown(false);
  };

  const handleClauseSelect = (clause: Clause) => {
    setSelectedClause(clause);
  };

  const handleClauseHighlight = (start: number, end: number) => {
    setHighlightRange({ start, end });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Top Header Bar */}
      <header className="border-b border-glass-border bg-glass-bg backdrop-blur-sm shadow-soft sticky top-0 z-50 animate-fade-in">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-medium">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">LegalScan AI</h1>
                  <p className="text-xs text-muted-foreground">Intelligent Document Analysis</p>
                </div>
              </div>
              
              {documentId && (
                <Badge variant="outline" className="bg-glass-bg">
                  Document: contract_2024.pdf
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-6">
              <LegalHealthBadge 
                score={legalHealthScore} 
                onUploadNew={documentId ? handleUploadNew : undefined}
              />
              
              <div className="flex items-center gap-3">
                {documentId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowRiskBreakdown(!showRiskBreakdown)}
                    className="bg-glass-bg border border-glass-border"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Risk Details
                  </Button>
                )}
                
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-32 bg-glass-bg border-glass-border">
                    <Globe className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">हिंदी</SelectItem>
                    <SelectItem value="tamil">தமிழ்</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={userRole} onValueChange={setUserRole}>
                  <SelectTrigger className="w-32 bg-glass-bg border-glass-border">
                    <UserCheck className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tenant">Tenant</SelectItem>
                    <SelectItem value="borrower">Borrower</SelectItem>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="ghost" size="sm" className="bg-glass-bg border border-glass-border">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-6">
        {showRiskBreakdown && documentId && (
          <div className="mb-6">
            <RiskBreakdown score={legalHealthScore} riskFactors={[]} />
          </div>
        )}
        
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          {/* Left Panel - Document Viewer & Upload */}
          <div className="col-span-7 flex flex-col gap-6">
            {!documentId ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <DocumentUpload onUploadComplete={handleDocumentUpload} />
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <DocumentViewer 
                    documentId={documentId} 
                    highlightRange={highlightRange || undefined}
                  />
                </div>
                <div className="h-80">
                  <ClauseList
                    clauses={[]} // Will be populated when document is analyzed
                    selectedClauseId={selectedClause?.id}
                    onClauseSelect={handleClauseSelect}
                    onClauseHighlight={handleClauseHighlight}
                  />
                </div>
              </>
            )}
          </div>

          {/* Right Panel - Chat Assistant */}
          <div className="col-span-5">
            <ChatPanel
              selectedClause={selectedClause?.title}
              documentId={documentId || undefined}
            />
          </div>
        </div>
      </main>

      {/* Background Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent pointer-events-none -z-10" />
    </div>
  );
};