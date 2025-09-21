import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LawyerConnectButton } from './LawyerConnectButton';
import { Users, Brain, MessageSquare, Shield, Star, CheckCircle, ArrowRight } from 'lucide-react';

export const LawyerConnectShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            AI + Human Expertise
            <span className="block text-blue-600">Perfect Legal Support</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            When AI detects risks, connect instantly with verified lawyers. Get the best of both worlds - 
            instant AI analysis followed by expert human guidance.
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-4 gap-6 items-center">
            {/* Step 1: AI Analysis */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Upload document, get instant risk detection
                </p>
              </CardContent>
            </Card>

            <ArrowRight className="h-8 w-8 text-gray-400 mx-auto hidden md:block" />

            {/* Step 2: Risk Detection */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Risk Alert</h3>
                <p className="text-sm text-muted-foreground">
                  High-risk clauses trigger lawyer recommendation
                </p>
              </CardContent>
            </Card>

            <ArrowRight className="h-8 w-8 text-gray-400 mx-auto hidden md:block" />

            {/* Step 3: Lawyer Match */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Expert Match</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with specialized, verified lawyers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sample Lawyer Cards */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Meet Our Verified Legal Experts</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Johnson',
                specialization: 'Contract Law',
                experience: 8,
                rating: 4.9,
                reviews: 127,
                availability: 'Available today'
              },
              {
                name: 'Michael Chen',
                specialization: 'Real Estate Law',
                experience: 12,
                rating: 4.8,
                reviews: 89,
                availability: 'Available now'
              },
              {
                name: 'Emily Rodriguez',
                specialization: 'Employment Law',
                experience: 6,
                rating: 4.7,
                reviews: 156,
                availability: 'Available tomorrow'
              }
            ].map((lawyer, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {lawyer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-semibold">{lawyer.name}</h4>
                      <p className="text-sm text-blue-600">{lawyer.specialization}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{lawyer.rating} ({lawyer.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span className="text-green-600">{lawyer.availability}</span>
                    </div>
                    <p className="text-muted-foreground">{lawyer.experience} years experience</p>
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
              icon: <MessageSquare className="h-6 w-6" />,
              title: 'Secure Chat',
              description: 'Encrypted messaging with lawyers'
            },
            {
              icon: <Shield className="h-6 w-6" />,
              title: 'Verified Lawyers',
              description: 'All lawyers are licensed and verified'
            },
            {
              icon: <Brain className="h-6 w-6" />,
              title: 'AI Pre-Context',
              description: 'Lawyers get AI analysis before consultation'
            },
            {
              icon: <CheckCircle className="h-6 w-6" />,
              title: 'Quick Response',
              description: 'Most lawyers respond within 2 hours'
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 text-blue-600">
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
          <Card className="max-w-2xl mx-auto border-blue-200 bg-blue-50">
            <CardContent className="pt-8 pb-8">
              <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Ready to Connect with Legal Experts?</h3>
              <p className="text-muted-foreground mb-6">
                Start with AI analysis, then connect with the right lawyer when you need human expertise.
              </p>
              <div className="flex gap-4 justify-center">
                <LawyerConnectButton size="lg" />
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