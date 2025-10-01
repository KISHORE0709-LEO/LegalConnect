import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Shield, Brain, CheckCircle } from 'lucide-react';

export const LawyerFeatures = () => {
  return (
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
  );
};
