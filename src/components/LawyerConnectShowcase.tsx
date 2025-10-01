import { LawyerFlowDiagram } from './LawyerFlowDiagram';
import { LawyerCards } from './LawyerCards';
import { LawyerFeatures } from './LawyerFeatures';
import { LawyerCTA } from './LawyerCTA';

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

        <LawyerFlowDiagram />

        <LawyerCards />

        <LawyerFeatures />

        <LawyerCTA />
      </div>
    </section>
  );
};
