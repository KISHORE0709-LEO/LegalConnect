import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/Header';
import { ArrowLeft, Users, Star, MapPin, Clock, Phone, Video, MessageSquare, Calendar, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  location: string;
  rating: number;
  reviews: number;
  pricing: string;
  availability: string;
  languages: string[];
  verified: boolean;
}

const mockLawyers: Lawyer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialization: 'Contract Law',
    experience: 8,
    location: 'New York, NY',
    rating: 4.9,
    reviews: 127,
    pricing: 'Free consultation, $300/hour',
    availability: 'Available today',
    languages: ['English', 'Spanish'],
    verified: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    specialization: 'Real Estate Law',
    experience: 12,
    location: 'Los Angeles, CA',
    rating: 4.8,
    reviews: 89,
    pricing: '$250/hour, Flat fee available',
    availability: 'Available tomorrow',
    languages: ['English', 'Mandarin'],
    verified: true
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    specialization: 'Employment Law',
    experience: 6,
    location: 'Chicago, IL',
    rating: 4.7,
    reviews: 156,
    pricing: 'Free consultation, $275/hour',
    availability: 'Available now',
    languages: ['English', 'Spanish'],
    verified: true
  }
];

export default function LawyerConnect() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [caseContext, setCaseContext] = useState({
    documentType: location.state?.documentType || '',
    riskDetected: location.state?.riskDetected || '',
    userNotes: '',
    urgency: 'normal'
  });
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [connectionType, setConnectionType] = useState('');

  const handleCaseSubmit = () => {
    setStep(2);
  };

  const handleLawyerSelect = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setStep(3);
  };

  const handleConnect = () => {
    setStep(4);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {step > stepNum ? <CheckCircle className="h-4 w-4" /> : stepNum}
          </div>
          {stepNum < 4 && (
            <div className={`w-16 h-1 mx-2 ${
              step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderCaseContext = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Case Context
        </CardTitle>
        <p className="text-muted-foreground">Help us match you with the right lawyer</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {caseContext.riskDetected && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
              <AlertTriangle className="h-4 w-4" />
              AI Detected Risk
            </div>
            <p className="text-red-700">{caseContext.riskDetected}</p>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium mb-2">Document Type</label>
          <Select value={caseContext.documentType} onValueChange={(value) => 
            setCaseContext(prev => ({ ...prev, documentType: value }))
          }>
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rental">Rental Agreement</SelectItem>
              <SelectItem value="employment">Employment Contract</SelectItem>
              <SelectItem value="loan">Loan Agreement</SelectItem>
              <SelectItem value="business">Business Contract</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Urgency Level</label>
          <Select value={caseContext.urgency} onValueChange={(value) => 
            setCaseContext(prev => ({ ...prev, urgency: value }))
          }>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal - Within a week</SelectItem>
              <SelectItem value="urgent">Urgent - Within 24 hours</SelectItem>
              <SelectItem value="emergency">Emergency - Immediate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Additional Notes</label>
          <Textarea 
            placeholder="Describe your situation or specific concerns..."
            value={caseContext.userNotes}
            onChange={(e) => setCaseContext(prev => ({ ...prev, userNotes: e.target.value }))}
            rows={4}
          />
        </div>

        <Button onClick={handleCaseSubmit} className="w-full">
          Find Matching Lawyers
        </Button>
      </CardContent>
    </Card>
  );

  const renderLawyerMatches = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Recommended Lawyers</h2>
        <p className="text-muted-foreground">Based on your case context and location</p>
      </div>
      
      <div className="grid gap-6">
        {mockLawyers.map((lawyer) => (
          <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {lawyer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                      {lawyer.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-blue-600 font-medium">{lawyer.specialization}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{lawyer.experience} years experience</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {lawyer.location}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{lawyer.rating}</span>
                    <span className="text-sm text-muted-foreground">({lawyer.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <Clock className="h-3 w-3" />
                    {lawyer.availability}
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Pricing</p>
                  <p className="text-sm">{lawyer.pricing}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Languages</p>
                  <div className="flex gap-1">
                    {lawyer.languages.map(lang => (
                      <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button onClick={() => handleLawyerSelect(lawyer)} className="w-full">
                Connect with {lawyer.name.split(' ')[0]}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderConnectionOptions = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Connect with {selectedLawyer?.name}</CardTitle>
        <p className="text-muted-foreground">Choose how you'd like to connect</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <Button 
            variant={connectionType === 'chat' ? 'default' : 'outline'}
            onClick={() => setConnectionType('chat')}
            className="flex items-center gap-3 h-16 justify-start"
          >
            <MessageSquare className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Secure Chat</div>
              <div className="text-sm text-muted-foreground">Start messaging immediately</div>
            </div>
          </Button>
          
          <Button 
            variant={connectionType === 'call' ? 'default' : 'outline'}
            onClick={() => setConnectionType('call')}
            className="flex items-center gap-3 h-16 justify-start"
          >
            <Phone className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Phone Call</div>
              <div className="text-sm text-muted-foreground">Schedule or request callback</div>
            </div>
          </Button>
          
          <Button 
            variant={connectionType === 'video' ? 'default' : 'outline'}
            onClick={() => setConnectionType('video')}
            className="flex items-center gap-3 h-16 justify-start"
          >
            <Video className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Video Consultation</div>
              <div className="text-sm text-muted-foreground">Face-to-face meeting</div>
            </div>
          </Button>
          
          <Button 
            variant={connectionType === 'appointment' ? 'default' : 'outline'}
            onClick={() => setConnectionType('appointment')}
            className="flex items-center gap-3 h-16 justify-start"
          >
            <Calendar className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Schedule Appointment</div>
              <div className="text-sm text-muted-foreground">Book a specific time slot</div>
            </div>
          </Button>
        </div>
        
        {connectionType && (
          <Button onClick={handleConnect} className="w-full mt-6">
            Connect via {connectionType === 'chat' ? 'Chat' : 
                        connectionType === 'call' ? 'Phone' :
                        connectionType === 'video' ? 'Video' : 'Appointment'}
          </Button>
        )}
      </CardContent>
    </Card>
  );

  const renderSuccess = () => (
    <Card className="max-w-2xl mx-auto text-center">
      <CardContent className="pt-8 pb-8">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Connection Established!</h2>
        <p className="text-muted-foreground mb-6">
          You're now connected with {selectedLawyer?.name}. They will reach out to you shortly.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-2">Next Steps:</h3>
          <ul className="text-sm text-left space-y-1">
            <li>• Check your email for connection details</li>
            <li>• Prepare any additional documents</li>
            <li>• Note down your questions</li>
            <li>• Wait for lawyer's response (usually within 2 hours)</li>
          </ul>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/profile')}>
            View in Profile
          </Button>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Lawyer Connect</h1>
          <p className="text-muted-foreground">Get expert legal help from verified professionals</p>
        </div>
        
        {renderStepIndicator()}
        
        {step === 1 && renderCaseContext()}
        {step === 2 && renderLawyerMatches()}
        {step === 3 && renderConnectionOptions()}
        {step === 4 && renderSuccess()}
      </div>
    </div>
  );
}