import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/Header';
import { ArrowLeft, MapPin, Building, Phone, Clock, Navigation, Download, FileText, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Court {
  id: string;
  name: string;
  type: string;
  address: string;
  distance: string;
  phone: string;
  email: string;
  website: string;
  hours: string;
  jurisdiction: string[];
  filingFee: string;
  avgProcessingTime: string;
  requiredDocs: string[];
}

const mockCourts: Court[] = [
  {
    id: '1',
    name: 'District Consumer Forum',
    type: 'Consumer Protection',
    address: '123 Justice Street, Downtown, NY 10001',
    distance: '2.3 km',
    phone: '+1 (555) 123-4567',
    email: 'consumer.forum@court.ny.gov',
    website: 'www.nyconsumerforum.gov',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    jurisdiction: ['Consumer disputes', 'Product defects', 'Service complaints'],
    filingFee: '$50 - $200',
    avgProcessingTime: '3-6 months',
    requiredDocs: ['Complaint form', 'Purchase receipts', 'Communication records', 'ID proof']
  },
  {
    id: '2',
    name: 'Small Claims Court',
    type: 'Civil Court',
    address: '456 Legal Avenue, Midtown, NY 10002',
    distance: '3.7 km',
    phone: '+1 (555) 234-5678',
    email: 'smallclaims@nycourts.gov',
    website: 'www.nycourts.gov/smallclaims',
    hours: 'Mon-Thu: 8:30 AM - 4:30 PM',
    jurisdiction: ['Money disputes up to $5,000', 'Property damage', 'Contract breaches'],
    filingFee: '$15 - $25',
    avgProcessingTime: '1-3 months',
    requiredDocs: ['Claim form', 'Evidence documents', 'Proof of service', 'Filing fee']
  },
  {
    id: '3',
    name: 'Housing Court',
    type: 'Specialized Court',
    address: '789 Tenant Rights Blvd, Brooklyn, NY 11201',
    distance: '5.1 km',
    phone: '+1 (555) 345-6789',
    email: 'housing@nycourts.gov',
    website: 'www.nycourts.gov/housing',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    jurisdiction: ['Landlord-tenant disputes', 'Rent issues', 'Housing violations'],
    filingFee: '$45',
    avgProcessingTime: '2-4 months',
    requiredDocs: ['Petition form', 'Lease agreement', 'Rent receipts', 'Notice to quit']
  }
];

export default function CourtLocator() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [caseContext, setCaseContext] = useState({
    caseType: location.state?.caseType || '',
    issueDescription: location.state?.issueDescription || '',
    location: '',
    urgency: 'normal'
  });
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [filteredCourts, setFilteredCourts] = useState<Court[]>([]);

  const handleContextSubmit = () => {
    // Filter courts based on case type
    let filtered = mockCourts;
    if (caseContext.caseType === 'rental') {
      filtered = mockCourts.filter(court => court.type.includes('Housing') || court.type.includes('Consumer'));
    } else if (caseContext.caseType === 'consumer') {
      filtered = mockCourts.filter(court => court.type.includes('Consumer') || court.type.includes('Civil'));
    }
    setFilteredCourts(filtered);
    setStep(2);
  };

  const handleCourtSelect = (court: Court) => {
    setSelectedCourt(court);
    setStep(3);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= stepNum ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {step > stepNum ? <CheckCircle className="h-4 w-4" /> : stepNum}
          </div>
          {stepNum < 3 && (
            <div className={`w-16 h-1 mx-2 ${
              step > stepNum ? 'bg-green-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderContextCollection = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5 text-green-600" />
          Case Context
        </CardTitle>
        <p className="text-muted-foreground">Help us find the right court or authority for your case</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {caseContext.issueDescription && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800 font-medium mb-2">
              <AlertTriangle className="h-4 w-4" />
              AI Detected Issue
            </div>
            <p className="text-blue-700">{caseContext.issueDescription}</p>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium mb-2">Case Type</label>
          <Select value={caseContext.caseType} onValueChange={(value) => 
            setCaseContext(prev => ({ ...prev, caseType: value }))
          }>
            <SelectTrigger>
              <SelectValue placeholder="Select your case type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rental">Rental/Housing Dispute</SelectItem>
              <SelectItem value="consumer">Consumer Complaint</SelectItem>
              <SelectItem value="employment">Employment Issue</SelectItem>
              <SelectItem value="contract">Contract Dispute</SelectItem>
              <SelectItem value="small-claims">Small Claims (Money)</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Your Location</label>
          <div className="flex gap-2">
            <Input 
              placeholder="Enter city, state, or ZIP code"
              value={caseContext.location}
              onChange={(e) => setCaseContext(prev => ({ ...prev, location: e.target.value }))}
            />
            <Button variant="outline" size="icon">
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
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
              <SelectItem value="normal">Normal - Within a month</SelectItem>
              <SelectItem value="urgent">Urgent - Within a week</SelectItem>
              <SelectItem value="emergency">Emergency - Immediate filing needed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleContextSubmit} className="w-full">
          Find Courts & Authorities
        </Button>
      </CardContent>
    </Card>
  );

  const renderCourtMatches = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Recommended Courts & Authorities</h2>
        <p className="text-muted-foreground">Based on your case type and location</p>
      </div>
      
      <div className="grid gap-6">
        {filteredCourts.map((court) => (
          <Card key={court.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                    <Building className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-semibold">{court.name}</h3>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {court.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{court.address}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{court.distance} away</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {court.hours.split(':')[0]}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600 mb-1">
                    Filing Fee: {court.filingFee}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Processing: {court.avgProcessingTime}
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Jurisdiction</p>
                  <div className="flex flex-wrap gap-1">
                    {court.jurisdiction.slice(0, 2).map(item => (
                      <Badge key={item} variant="outline" className="text-xs">{item}</Badge>
                    ))}
                    {court.jurisdiction.length > 2 && (
                      <Badge variant="outline" className="text-xs">+{court.jurisdiction.length - 2} more</Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Contact</p>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{court.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      <span className="text-blue-600 cursor-pointer">{court.website}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => handleCourtSelect(court)} className="flex-1">
                  Select {court.name.split(' ')[0]}
                </Button>
                <Button variant="outline" size="icon">
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderFilingGuidance = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Filing Guidance for {selectedCourt?.name}
          </CardTitle>
          <p className="text-muted-foreground">Everything you need to file your case</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{selectedCourt?.filingFee}</div>
              <p className="text-sm text-muted-foreground">Filing Fee</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{selectedCourt?.avgProcessingTime}</div>
              <p className="text-sm text-muted-foreground">Processing Time</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{selectedCourt?.requiredDocs.length}</div>
              <p className="text-sm text-muted-foreground">Required Documents</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Required Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {selectedCourt?.requiredDocs.map((doc, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{doc}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Court Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p className="text-sm">{selectedCourt?.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Hours</p>
              <p className="text-sm">{selectedCourt?.hours}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Contact</p>
              <p className="text-sm">{selectedCourt?.phone}</p>
              <p className="text-sm text-blue-600">{selectedCourt?.email}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Step-by-Step Filing Process</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Before You Go:</h4>
              <ul className="text-sm space-y-1">
                <li>• Gather all required documents</li>
                <li>• Prepare filing fee (cash/check)</li>
                <li>• Make copies of all documents</li>
                <li>• Review court rules online</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">At the Court:</h4>
              <ul className="text-sm space-y-1">
                <li>• Go to clerk's office</li>
                <li>• Submit forms and fee</li>
                <li>• Get case number and receipt</li>
                <li>• Schedule hearing if required</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button className="bg-green-600 hover:bg-green-700">
          <Download className="h-4 w-4 mr-2" />
          Download Filing Checklist
        </Button>
        <Button variant="outline">
          <Navigation className="h-4 w-4 mr-2" />
          Get Directions
        </Button>
        <Button variant="outline" onClick={() => navigate('/profile')}>
          Save to Profile
        </Button>
      </div>
    </div>
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
          <h1 className="text-3xl font-bold mb-2">Court & Authority Locator</h1>
          <p className="text-muted-foreground">Find the right court or government office for your legal case</p>
        </div>
        
        {renderStepIndicator()}
        
        {step === 1 && renderContextCollection()}
        {step === 2 && renderCourtMatches()}
        {step === 3 && renderFilingGuidance()}
      </div>
    </div>
  );
}