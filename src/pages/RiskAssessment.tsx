import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { LawyerConnectButton } from '@/components/LawyerConnectButton';
import { CourtLocatorButton } from '@/components/CourtLocatorButton';
import { ArrowLeft, Shield, AlertTriangle, TrendingUp, FileText, CheckCircle, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RiskAssessment() {
  const navigate = useNavigate();
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [isAssessing, setIsAssessing] = useState(false);

  // Mock risk assessment result
  const mockAssessment = {
    overallRisk: 'High',
    riskScore: 78,
    categories: [
      {
        name: 'Financial Risk',
        score: 85,
        level: 'High',
        issues: ['Excessive security deposit', 'No rent increase cap'],
        impact: 'Could result in $2,000+ unexpected costs'
      },
      {
        name: 'Legal Compliance',
        score: 65,
        level: 'Medium',
        issues: ['Missing required disclosures', 'Unclear termination clause'],
        impact: 'May not be enforceable in court'
      },
      {
        name: 'Personal Liability',
        score: 90,
        level: 'High',
        issues: ['Tenant liable for all damages', 'No liability limits'],
        impact: 'Unlimited financial exposure'
      }
    ],
    urgentActions: [
      'Negotiate security deposit reduction',
      'Add liability protection clause',
      'Request legal compliance review'
    ]
  };

  const handleAssess = () => {
    setIsAssessing(true);
    setTimeout(() => {
      setAssessmentResult(mockAssessment);
      setIsAssessing(false);
    }, 2500);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Legal Risk Assessment</h1>
          <p className="text-muted-foreground">Comprehensive analysis of potential legal risks in your documents</p>
        </div>

        {!assessmentResult && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Risk Assessment
              </CardTitle>
              <p className="text-muted-foreground">Upload a document to analyze potential legal risks</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload your legal document</p>
                <p className="text-sm text-gray-500 mb-4">We'll analyze it for potential risks and liabilities</p>
                <Button variant="outline">Choose File</Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Or assess a sample document</p>
                <Button onClick={handleAssess} disabled={isAssessing} className="w-full">
                  {isAssessing ? (
                    <>
                      <Shield className="h-4 w-4 mr-2 animate-spin" />
                      Assessing Risks...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Assess Sample Contract
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {assessmentResult && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Overall Risk Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Overall Risk Assessment
                  </div>
                  <Badge className={getRiskColor(assessmentResult.overallRisk)}>
                    {assessmentResult.overallRisk} Risk
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className={`text-6xl font-bold mb-2 ${getScoreColor(assessmentResult.riskScore)}`}>
                    {assessmentResult.riskScore}
                  </div>
                  <p className="text-muted-foreground">Risk Score (out of 100)</p>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className={`h-3 rounded-full ${
                      assessmentResult.riskScore >= 80 ? 'bg-red-500' :
                      assessmentResult.riskScore >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${assessmentResult.riskScore}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Risk Categories */}
            <div className="grid gap-6">
              {assessmentResult.categories.map((category: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                        {category.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${getScoreColor(category.score)}`}>
                          {category.score}
                        </span>
                        <Badge className={getRiskColor(category.level)}>
                          {category.level}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Identified Issues:</h4>
                        <ul className="space-y-1">
                          {category.issues.map((issue: string, i: number) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-red-500 mt-1">•</span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Potential Impact:</h4>
                        <p className="text-sm text-muted-foreground">{category.impact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Urgent Actions */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <AlertTriangle className="h-5 w-5" />
                  Urgent Actions Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {assessmentResult.urgentActions.map((action: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-orange-800">{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action CTAs */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Lawyer Connect CTA */}
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-red-800">Get Legal Help</h3>
                    <p className="text-red-700 mb-4">
                      High risk detected. Connect with a lawyer immediately.
                    </p>
                    <LawyerConnectButton 
                      documentType="Contract"
                      riskDetected={`High risk score: ${assessmentResult.riskScore}/100`}
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Court Locator CTA */}
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Building className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-orange-800">File a Case</h3>
                    <p className="text-orange-700 mb-4">
                      Find the right court to escalate your legal issue.
                    </p>
                    <CourtLocatorButton 
                      caseType="contract"
                      issueDescription={`High-risk contract with score ${assessmentResult.riskScore}/100`}
                      size="lg"
                      className="bg-orange-600 hover:bg-orange-700 w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => setAssessmentResult(null)}>
                Assess Another Document
              </Button>
              <Button variant="outline">
                Download Risk Report
              </Button>
              <Button variant="outline">
                Save Assessment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}