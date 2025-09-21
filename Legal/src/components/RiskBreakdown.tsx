import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, AlertCircle, TrendingDown } from "lucide-react";

interface RiskFactor {
  id: string;
  label: string;
  impact: number;
  description: string;
  category: 'liability' | 'termination' | 'payment' | 'scope' | 'penalty';
}

interface RiskBreakdownProps {
  score: number;
  riskFactors: RiskFactor[];
  className?: string;
}

const mockRiskFactors: RiskFactor[] = [
  {
    id: '1',
    label: 'Unlimited Liability Clause',
    impact: 25,
    description: 'Company limits liability to zero, leaving you fully exposed',
    category: 'liability'
  },
  {
    id: '2',
    label: 'Short Termination Notice',
    impact: 15,
    description: '24-hour termination notice creates business continuity risk',
    category: 'termination'
  },
  {
    id: '3',
    label: 'Unilateral Rate Changes',
    impact: 12,
    description: 'Service provider can change rates without your consent',
    category: 'payment'
  },
  {
    id: '4',
    label: 'Vague Service Scope',
    impact: 8,
    description: 'Poorly defined deliverables may lead to disputes',
    category: 'scope'
  },
  {
    id: '5',
    label: 'Excessive Late Fees',
    impact: 5,
    description: '2% monthly penalty is above market standards',
    category: 'penalty'
  }
];

export const RiskBreakdown = ({ 
  score, 
  riskFactors = mockRiskFactors, 
  className 
}: RiskBreakdownProps) => {
  const getHealthStatus = (score: number) => {
    if (score >= 70) return { label: "Safe", color: "text-risk-safe", variant: "safe" as const };
    if (score >= 40) return { label: "Caution", color: "text-risk-caution", variant: "caution" as const };
    return { label: "High Risk", color: "text-risk-high", variant: "high" as const };
  };

  const status = getHealthStatus(score);
  const topRiskFactors = riskFactors.slice(0, 3);
  const totalRiskImpact = riskFactors.reduce((sum, factor) => sum + factor.impact, 0);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'liability': return AlertCircle;
      case 'termination': return TrendingDown;
      default: return AlertTriangle;
    }
  };

  return (
    <Card className={`p-4 bg-glass-bg backdrop-blur-sm border-glass-border shadow-medium ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Risk Analysis Breakdown</h3>
          <Badge variant={status.variant} className="text-xs">
            {status.label}
          </Badge>
        </div>

        {/* Score Visualization */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Legal Health Score</span>
            <span className={`font-bold ${status.color}`}>{score}/100</span>
          </div>
          <Progress 
            value={score} 
            className="h-2"
          />
          <p className="text-xs text-muted-foreground">
            Based on {riskFactors.length} risk factors identified
          </p>
        </div>

        {/* Top Risk Contributors */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Top Risk Contributors</h4>
          <div className="space-y-2">
            {topRiskFactors.map((factor, index) => {
              const IconComponent = getCategoryIcon(factor.category);
              const percentage = Math.round((factor.impact / totalRiskImpact) * 100);
              
              return (
                <div 
                  key={factor.id} 
                  className="flex items-start gap-3 p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-risk-high/10">
                    <IconComponent className="h-3 w-3 text-risk-high" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {factor.label}
                      </p>
                      <Badge variant="outline" className="text-xs ml-2">
                        -{factor.impact}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {factor.description}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-1">
                        <div 
                          className="bg-risk-high h-1 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Risk Score Calculation:</span> 100 - (Risk Impact Sum: {totalRiskImpact}) = {score}
          </p>
        </div>
      </div>
    </Card>
  );
};