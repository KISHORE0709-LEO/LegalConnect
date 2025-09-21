import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RiskBreakdown } from "@/components/RiskBreakdown";
import { Shield, AlertTriangle, AlertCircle, TrendingUp, RotateCcw } from "lucide-react";

interface LegalHealthBadgeProps {
  score: number;
  onUploadNew?: () => void;
  className?: string;
}

export const LegalHealthBadge = ({ score, onUploadNew, className }: LegalHealthBadgeProps) => {
  const getHealthStatus = (score: number) => {
    if (score >= 70) return { 
      label: "Safe", 
      variant: "safe" as const, 
      icon: Shield,
      gradient: "bg-gradient-risk-safe",
      description: "Document appears legally sound with minimal risks"
    };
    if (score >= 40) return { 
      label: "Caution", 
      variant: "caution" as const, 
      icon: AlertTriangle,
      gradient: "bg-gradient-risk-caution",
      description: "Some concerning clauses require attention"
    };
    return { 
      label: "High Risk", 
      variant: "high" as const, 
      icon: AlertCircle,
      gradient: "bg-gradient-risk-high",
      description: "Multiple high-risk clauses detected - review recommended"
    };
  };

  const status = getHealthStatus(score);
  const IconComponent = status.icon;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Main Health Badge */}
      <div className="flex items-center gap-3">
        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${status.gradient} shadow-medium animate-fade-in-scale`}>
          <IconComponent className="h-6 w-6 text-white drop-shadow-sm" />
        </div>
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-muted-foreground">Legal Health</span>
            <Badge 
              variant={status.variant}
              className="text-xs font-semibold shadow-soft"
            >
              {status.label}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">{score}</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>/100</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground max-w-48 leading-relaxed">
            {status.description}
          </p>
        </div>
      </div>

      {/* Upload New Document Button */}
      {onUploadNew && (
        <div className="flex items-center gap-2">
          <div className="h-8 w-px bg-border"></div>
          <Button
            variant="outline"
            size="sm"
            onClick={onUploadNew}
            className="bg-glass-bg border-glass-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 animate-fade-in"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Upload New Document
          </Button>
        </div>
      )}
    </div>
  );
};