import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, CheckCircle } from 'lucide-react';

export const CourtCards = () => {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <h3 className="text-2xl font-bold text-center mb-8">Courts & Authorities We Cover</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            name: 'Consumer Forum',
            type: 'Consumer Protection',
            cases: ['Product defects', 'Service complaints', 'Unfair practices'],
            fee: '$50-200',
            time: '3-6 months'
          },
          {
            name: 'Small Claims Court',
            type: 'Civil Court',
            cases: ['Money disputes', 'Property damage', 'Contract issues'],
            fee: '$15-25',
            time: '1-3 months'
          },
          {
            name: 'Housing Court',
            type: 'Specialized Court',
            cases: ['Rent disputes', 'Tenant rights', 'Housing violations'],
            fee: '$45',
            time: '2-4 months'
          }
        ].map((court, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">{court.name}</h4>
                  <Badge variant="secondary" className="text-xs">{court.type}</Badge>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Handles:</p>
                  <ul className="space-y-1">
                    {court.cases.map((case_type, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                        <span>{case_type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">Filing Fee</p>
                    <p className="font-medium">{court.fee}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Processing</p>
                    <p className="font-medium">{court.time}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
