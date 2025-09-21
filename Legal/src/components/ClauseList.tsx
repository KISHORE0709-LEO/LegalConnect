import { useState } from "react";
import { AlertCircle, AlertTriangle, Shield, FileText, ChevronRight, Filter, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RiskTooltip } from "@/components/RiskTooltip";

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
  riskReason?: string;
  legalCitation?: string;
  ruleMatches?: string[];
}

interface ClauseListProps {
  clauses: Clause[];
  selectedClauseId?: string;
  onClauseSelect: (clause: Clause) => void;
  onClauseHighlight: (startOffset: number, endOffset: number) => void;
}

const mockClauses: Clause[] = [
  {
    id: '1',
    number: '2.1',
    title: 'Payment Terms',
    excerpt: 'Payment shall be due within 30 days of invoice date...',
    fullText: 'Payment shall be due within 30 days of invoice date. Late payments may incur penalty charges of 2% per month.',
    riskLevel: 'safe',
    tags: ['Payment', 'Timeline'],
    explanation: 'Standard payment terms with reasonable penalty structure.',
    startOffset: 150,
    endOffset: 280,
    riskReason: 'Standard payment terms with industry-typical penalty rates',
    legalCitation: 'Complies with Payment of Interest Act guidelines',
    ruleMatches: ['Standard payment window (30 days)', 'Reasonable penalty rate (2%)']
  },
  {
    id: '2',
    number: '4.3',
    title: 'Liability Limitation',
    excerpt: 'Company shall not be liable for any damages exceeding...',
    fullText: 'Company shall not be liable for any damages exceeding the total amount paid under this agreement, regardless of cause.',
    riskLevel: 'caution',
    tags: ['Liability', 'Risk'],
    explanation: 'This clause significantly limits the company\'s liability. Consider negotiating for specific exceptions.',
    startOffset: 450,
    endOffset: 620,
    riskReason: 'Liability cap may be too restrictive for high-value transactions',
    legalCitation: 'May conflict with Section 23, Indian Contract Act regarding void agreements',
    ruleMatches: ['Liability limitation detected', 'Broad exclusion language']
  },
  {
    id: '3',
    number: '7.2',
    title: 'Termination Rights',
    excerpt: 'Either party may terminate this agreement at any time...',
    fullText: 'Either party may terminate this agreement at any time without cause by providing 24 hours written notice.',
    riskLevel: 'high',
    tags: ['Termination', 'Notice'],
    explanation: 'Very short notice period for termination creates significant business risk. Industry standard is typically 30-90 days.',
    startOffset: 890,
    endOffset: 1050,
    riskReason: 'Extremely short termination notice creates severe business continuity risk',
    legalCitation: 'Below minimum standards under Employment Contract guidelines',
    ruleMatches: ['Short notice period (24 hours)', 'Termination without cause', 'No cure period']
  },
  {
    id: '4',
    number: '3.1',
    title: 'Service Description',
    excerpt: 'Services to be provided include but are not limited to...',
    fullText: 'Services to be provided include but are not limited to consulting, analysis, and reporting as deemed necessary by the provider.',
    riskLevel: 'caution',
    tags: ['Services', 'Scope'],
    explanation: 'Vague service description. Request more specific deliverables and scope definition.',
    startOffset: 320,
    endOffset: 480,
    riskReason: 'Undefined scope may lead to disputes over deliverables and billing',
    legalCitation: 'Vague terms may be unenforceable under Contract Act clarity requirements',
    ruleMatches: ['Vague scope language', 'Open-ended obligations']
  },
  {
    id: '5',
    number: '6.1',
    title: 'Indemnification',
    excerpt: 'You agree to indemnify and hold harmless the Company...',
    fullText: 'You agree to indemnify and hold harmless the Company from any and all claims, damages, losses, and expenses arising from your use of the service.',
    riskLevel: 'high',
    tags: ['Liability', 'Indemnification'],
    explanation: 'Broad indemnification clause puts significant financial risk on you.',
    startOffset: 1100,
    endOffset: 1280,
    riskReason: 'Unlimited indemnification exposure with no exceptions or caps',
    legalCitation: 'May be partially void under Section 28, Indian Contract Act',
    ruleMatches: ['Unlimited indemnification', 'No liability cap', 'Broad indemnity scope']
  }
];

export const ClauseList = ({ 
  clauses = mockClauses, 
  selectedClauseId, 
  onClauseSelect, 
  onClauseHighlight 
}: ClauseListProps) => {
  const [expandedClause, setExpandedClause] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<'all' | 'safe' | 'caution' | 'high'>('all');

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'safe': return Shield;
      case 'caution': return AlertTriangle;
      case 'high': return AlertCircle;
      default: return FileText;
    }
  };

  const getRiskColors = (level: string) => {
    switch (level) {
      case 'safe': return 'bg-risk-safe text-white';
      case 'caution': return 'bg-risk-caution text-white';
      case 'high': return 'bg-risk-high text-white animate-risk-pulse';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleClauseClick = (clause: Clause) => {
    onClauseSelect(clause);
    onClauseHighlight(clause.startOffset, clause.endOffset);
    setExpandedClause(expandedClause === clause.id ? null : clause.id);
  };

  const filteredClauses = riskFilter === 'all' 
    ? clauses 
    : clauses.filter(clause => clause.riskLevel === riskFilter);

  const riskCounts = {
    safe: clauses.filter(c => c.riskLevel === 'safe').length,
    caution: clauses.filter(c => c.riskLevel === 'caution').length,
    high: clauses.filter(c => c.riskLevel === 'high').length
  };

  return (
    <Card className="h-full bg-glass-bg backdrop-blur-sm border-glass-border shadow-medium animate-fade-in-up">
      <div className="border-b border-glass-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Document Clauses</h3>
            <Badge variant="outline" className="ml-auto">
              {filteredClauses.length} of {clauses.length}
            </Badge>
          </div>
        </div>

        {/* Risk Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <Filter className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Filter:</span>
          </div>
          
          <Button
            variant={riskFilter === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setRiskFilter('all')}
            className="h-7 px-2 text-xs"
          >
            All ({clauses.length})
          </Button>
          
          <Button
            variant={riskFilter === 'high' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setRiskFilter('high')}
            className="h-7 px-2 text-xs"
          >
            🔴 High ({riskCounts.high})
          </Button>
          
          <Button
            variant={riskFilter === 'caution' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setRiskFilter('caution')}
            className="h-7 px-2 text-xs"
          >
            🟡 Caution ({riskCounts.caution})
          </Button>
          
          <Button
            variant={riskFilter === 'safe' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setRiskFilter('safe')}
            className="h-7 px-2 text-xs"
          >
            🟢 Safe ({riskCounts.safe})
          </Button>

          {riskFilter !== 'all' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRiskFilter('all')}
              className="h-7 px-2 text-xs"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-120px)]">
        <div className="p-4 space-y-3">
          {filteredClauses.map((clause) => {
            const RiskIcon = getRiskIcon(clause.riskLevel);
            const isSelected = selectedClauseId === clause.id;
            const isExpanded = expandedClause === clause.id;

            return (
              <RiskTooltip
                key={clause.id}
                riskLevel={clause.riskLevel}
                reason={clause.riskReason || 'No specific risk detected'}
                legalCitation={clause.legalCitation}
                ruleMatches={clause.ruleMatches}
              >
                <div
                  className={`
                    group cursor-pointer rounded-lg border transition-all duration-300 ease-smooth
                    ${isSelected 
                      ? 'border-primary bg-primary/5 shadow-glow' 
                      : 'border-border bg-card hover:border-primary/50 hover:shadow-soft'
                    }
                    ${clause.riskLevel === 'high' ? 'ring-1 ring-risk-high/20' : ''}
                  `}
                  onClick={() => handleClauseClick(clause)}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`
                        flex h-8 w-8 items-center justify-center rounded-lg shadow-soft
                        ${getRiskColors(clause.riskLevel)}
                      `}>
                        <RiskIcon className="h-4 w-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm text-foreground">
                            Clause {clause.number}: {clause.title}
                          </h4>
                          <ChevronRight className={`
                            h-4 w-4 text-muted-foreground transition-transform duration-200
                            ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}
                          `} />
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {clause.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-1">
                          {clause.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          <Badge variant={clause.riskLevel} className="text-xs">
                            {clause.riskLevel === 'safe' ? '🟢' : clause.riskLevel === 'caution' ? '🟡' : '🔴'} 
                            {clause.riskLevel.charAt(0).toUpperCase() + clause.riskLevel.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {isExpanded && clause.explanation && (
                      <div className="mt-3 pt-3 border-t border-border animate-fade-in-up">
                        <p className="text-sm text-foreground">
                          <strong>Analysis:</strong> {clause.explanation}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 h-auto p-1 text-xs text-primary hover:text-primary-foreground hover:bg-primary"
                        >
                          View Full Text
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </RiskTooltip>
            );
          })}

          {filteredClauses.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No clauses match the selected filter
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};