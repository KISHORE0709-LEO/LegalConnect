import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CourtLocatorButton } from './CourtLocatorButton';
import { Building, MapPin, FileText, Clock, Navigation, CheckCircle, ArrowRight } from 'lucide-react';

export const CourtLocatorShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Know Where to Go
            <span className="block text-green-600">Find the Right Court</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't get lost in the legal system. Our AI identifies your case type and shows you exactly 
            which court or authority handles your specific issue.
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-4 gap-6 items-center">
            {/* Step 1: Case Analysis */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Case Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  AI identifies your case type and jurisdiction
                </p>
              </CardContent>
            </Card>

            <ArrowRight className="h-8 w-8 text-gray-400 mx-auto hidden md:block" />

            {/* Step 2: Location Match */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Location Match</h3>
                <p className="text-sm text-muted-foreground">
                  Find nearest courts and authorities
                </p>
              </CardContent>
            </Card>

            <ArrowRight className="h-8 w-8 text-gray-400 mx-auto hidden md:block" />

            {/* Step 3: Filing Guide */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Filing Guide</h3>
                <p className="text-sm text-muted-foreground">
                  Get step-by-step filing instructions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sample Courts */}
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

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: <MapPin className="h-6 w-6" />,
              title: 'Location-Based',
              description: 'Find courts near you with GPS integration'
            },
            {
              icon: <FileText className="h-6 w-6" />,
              title: 'Filing Guidance',
              description: 'Step-by-step instructions and checklists'
            },
            {
              icon: <Clock className="h-6 w-6" />,
              title: 'Processing Times',
              description: 'Know how long your case will take'
            },
            {
              icon: <Navigation className="h-6 w-6" />,
              title: 'Directions',
              description: 'Get driving directions to the court'
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 text-green-600">
                  {feature.icon}
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto border-green-200 bg-green-50">
            <CardContent className="pt-8 pb-8">
              <Building className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Ready to Take Legal Action?</h3>
              <p className="text-muted-foreground mb-6">
                Find the right court or authority for your case. Get filing guidance, fees, and directions.
              </p>
              <div className="flex gap-4 justify-center">
                <CourtLocatorButton size="lg" />
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};