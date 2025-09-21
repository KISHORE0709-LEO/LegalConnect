import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Scale } from 'lucide-react';
import { T } from '@/components/T';
import { useAuth } from '@/contexts/AuthContext';
import { firebaseService } from '@/services/firebase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

export default function PersonaSetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPersona, setSelectedPersona] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePersonaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (user) {
        await firebaseService.updateUserProfile(user.uid, {
          persona: selectedPersona,
        });
        
        toast({
          title: "Setup complete!",
          description: "Your persona has been set successfully.",
        });
        
        navigate('/ai-features');
      }
    } catch (error) {
      toast({
        title: "Setup failed",
        description: "Failed to save your persona. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-legal-primary/10 via-transparent to-legal-primary-dark/5"></div>
      
      <div className="w-full max-w-md relative z-10">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center pb-6 pt-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-primary p-3 rounded-2xl shadow-legal">
                <Scale className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-legal-primary mb-1">
              <T>Choose Your Perspective</T>
            </h1>
            <p className="text-muted-foreground">
              <T>Help us personalize your legal experience</T>
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handlePersonaSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  <T>Select your role</T>
                </label>
                <select 
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value)}
                  className="w-full h-11 px-3 border-2 border-border focus:border-legal-primary rounded-md bg-background text-foreground"
                  required
                >
                  <option value="">Select your role...</option>
                  <option value="freelancer">Freelancer - Contract reviews & client agreements</option>
                  <option value="student">Student - Legal documents & understanding rights</option>
                  <option value="startup">Startup Founder - Business formation & compliance</option>
                  <option value="individual">Individual - Personal legal matters</option>
                  <option value="lawyer">Lawyer - Legal practice & client consultation</option>
                  <option value="business">Business Owner - Corporate legal needs</option>
                  <option value="nonprofit">Non-Profit - Compliance & governance</option>
                  <option value="investor">Investor - Due diligence & contracts</option>
                  <option value="consultant">Consultant - Professional services agreements</option>
                  <option value="other">Other - General legal assistance</option>
                </select>
              </div>

              <Button 
                type="submit"
                disabled={loading || !selectedPersona}
                className="w-full h-11 bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all duration-300 font-semibold shadow-hover disabled:opacity-50"
              >
                {loading ? <T>Setting up...</T> : <T>Continue</T>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}