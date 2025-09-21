import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Shield, Scale } from "lucide-react";

interface RiskTooltipProps {
  children: ReactNode;
  riskLevel: 'safe' | 'caution' | 'high';
  reason: string;
  legalCitation?: string;
  ruleMatches?: string[];
  className?: string;
}

export const RiskTooltip = ({ 
  children, 
  riskLevel, 
  reason, 
  legalCitation, 
  ruleMatches = [],
  className 
}: RiskTooltipProps) => {
  const getRiskConfig = (level: string) => {
    switch (level) {
      case 'safe':
        return {
          icon: Shield,
          color: 'text-risk-safe',
          bgColor: 'bg-risk-safe-bg',
          label: 'Safe'
        };
      case 'caution':
        return {
          icon: AlertTriangle,
          color: 'text-risk-caution',
          bgColor: 'bg-risk-caution-bg',
          label: 'Caution Required'
        };
      case 'high':
        return {
          icon: AlertCircle,
          color: 'text-risk-high',
          bgColor: 'bg-risk-high-bg',
          label: 'High Risk'
        };
      default:
        return {
          icon: Shield,
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/20',
          label: 'Unknown'
        };
    }
  };

  const config = getRiskConfig(riskLevel);
  const IconComponent = config.icon;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild className={className}>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-80 p-4 bg-card border shadow-strong animate-fade-in-scale"
          sideOffset={8}
        >
          <div className="space-y-3">
            {/* Risk Level Header */}
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${config.bgColor}`}>
                <IconComponent className={`h-4 w-4 ${config.color}`} />
              </div>
              <div>
                <Badge variant={riskLevel} className="text-xs font-semibold">
                  {config.label}
                </Badge>
              </div>
            </div>

            {/* Risk Reason */}
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Risk Assessment:</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{reason}</p>
            </div>

            {/* Legal Citation */}
            {legalCitation && (
              <div className="pt-2 border-t border-border">
                <div className="flex items-start gap-2">
                  <Scale className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-primary mb-1">Legal Reference:</p>
                    <p className="text-xs text-muted-foreground">{legalCitation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Rule Matches */}
            {ruleMatches.length > 0 && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-medium text-foreground mb-2">Detected Patterns:</p>
                <div className="space-y-1">
                  {ruleMatches.map((rule, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span className="text-xs text-muted-foreground">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};