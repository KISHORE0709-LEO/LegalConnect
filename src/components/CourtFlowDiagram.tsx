import { Card, CardContent } from '@/components/ui/card';
import { FileText, MapPin, Building, ArrowRight } from 'lucide-react';

export const CourtFlowDiagram = () => {
  return (
    <div className="max-w-3xl mx-auto mb-16">
      <div className="flex items-center justify-between">
        {/* Step 1: Case Analysis */}
        <Card className="text-center w-48">
          <CardContent className="pt-3 pb-3 px-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold mb-1 text-xs">Case Analysis</h3>
            <p className="text-xs text-muted-foreground leading-tight">
              AI identifies your case type and jurisdiction
            </p>
          </CardContent>
        </Card>

        <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />

        {/* Step 2: Location Match */}
        <Card className="text-center w-48">
          <CardContent className="pt-3 pb-3 px-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-1 text-xs">Location Match</h3>
            <p className="text-xs text-muted-foreground leading-tight">
              Find nearest courts and authorities
            </p>
          </CardContent>
        </Card>

        <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />

        {/* Step 3: Filing Guide */}
        <Card className="text-center w-48">
          <CardContent className="pt-3 pb-3 px-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Building className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-1 text-xs">Filing Guide</h3>
            <p className="text-xs text-muted-foreground leading-tight">
              Get step-by-step filing instructions
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
