import { Card, CardContent } from '@/components/ui/card';
import { Brain, Shield, Users, ArrowRight } from 'lucide-react';

export const LawyerFlowDiagram = () => {
  return (
    <div className="max-w-3xl mx-auto mb-16">
      <div className="flex items-center justify-between">
        {/* Step 1: AI Analysis */}
        <Card className="text-center w-48">
          <CardContent className="pt-3 pb-3 px-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-1 text-xs">AI Analysis</h3>
            <p className="text-xs text-muted-foreground leading-tight">
              Upload document, get instant risk detection
            </p>
          </CardContent>
        </Card>

        <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />

        {/* Step 2: Risk Detection */}
        <Card className="text-center w-48">
          <CardContent className="pt-3 pb-3 px-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="font-semibold mb-1 text-xs">Risk Alert</h3>
            <p className="text-xs text-muted-foreground leading-tight">
              High-risk clauses trigger lawyer recommendation
            </p>
          </CardContent>
        </Card>

        <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />

        {/* Step 3: Lawyer Match */}
        <Card className="text-center w-48">
          <CardContent className="pt-3 pb-3 px-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-1 text-xs">Expert Match</h3>
            <p className="text-xs text-muted-foreground leading-tight">
              Connect with specialized, verified lawyers
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
