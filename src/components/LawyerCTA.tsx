import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LawyerConnectButton } from './LawyerConnectButton';
import { Users } from 'lucide-react';

export const LawyerCTA = () => {
  return (
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
  );
};
