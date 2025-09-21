import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { ArrowLeft, Brain, AlertTriangle, CheckCircle, Users, Upload, FileText, Building } from 'lucide-react';
import { CourtLocatorButton } from '@/components/CourtLocatorButton';
import { useNavigate } from 'react-router-dom';

export default function AIAnalysis() {
  const navigate = useNavigate();
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock analysis result for demonstration
  const mockAnalysis = {
    documentType: 'Rental Agreement',
    riskLevel: 'High',
    risks: [
      {
        type: 'Illegal Clause',
        description: 'Security deposit exceeds legal limit (3x monthly rent)',
        severity: 'High',
        location: 'Section 4.2'
      },
      {
        type: 'Unfair Terms',
        description: 'Tenant responsible for all repairs regardless of cause',
        severity: 'Medium',
        location: 'Section 7.1'
      },
      {
        type: 'Missing Protection',
        description: 'No clause protecting tenant privacy rights',
        severity: 'Medium',
        location: 'Throughout document'
      }
    ],
    recommendations: [
      'Negotiate security deposit to legal maximum',
      'Request modification of repair responsibility clause',
      'Add privacy protection clause'
    ]
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleConnectLawyer = () => {
    navigate('/lawyer-connect', {
      state: {
        documentType: analysisResult?.documentType,
        riskDetected: `${analysisResult?.risks[0]?.description} (${analysisResult?.riskLevel} Risk)`
      }
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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
          <h1 className="text-3xl font-bold mb-2">AI Legal Analysis</h1>
          <p className="text-muted-foreground">Upload your document for instant AI-powered legal analysis</p>
        </div>

        {!analysisResult && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                Document Analysis
              </CardTitle>
              <p className="text-muted-foreground">Upload a legal document to get started</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop your document here</p>
                <p className="text-sm text-gray-500 mb-4">Supports PDF, DOC, DOCX files up to 10MB</p>
                <Button variant="outline">Choose File</Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Or try with a sample document</p>
                <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full">
                  {isAnalyzing ? (
                    <>
                      <Brain className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing Document...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Analyze Sample Rental Agreement
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {analysisResult && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Analysis Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Analysis Complete
                  </div>
                  <Badge className={getSeverityColor(analysisResult.riskLevel)}>
                    {analysisResult.riskLevel} Risk
                  </Badge>
                </CardTitle>
                <p className="text-muted-foreground">Document Type: {analysisResult.documentType}</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-600">{analysisResult.risks.length}</div>
                    <p className="text-sm text-muted-foreground">Issues Found</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {analysisResult.risks.filter((r: any) => r.severity === 'High').length}
                    </div>
                    <p className="text-sm text-muted-foreground">High Priority</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{analysisResult.recommendations.length}</div>
                    <p className="text-sm text-muted-foreground">Recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Identified Risks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisResult.risks.map((risk: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{risk.type}</h3>
                      <Badge className={getSeverityColor(risk.severity)}>
                        {risk.severity}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{risk.description}</p>
                    <p className="text-sm text-blue-600">Found in: {risk.location}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisResult.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action CTAs */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Lawyer Connect CTA */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Need Expert Help?</h3>
                    <p className="text-muted-foreground mb-4">
                      Connect with a qualified lawyer for professional advice.
                    </p>
                    <Button onClick={handleConnectLawyer} size="lg" className="bg-blue-600 hover:bg-blue-700 w-full">
                      <Users className="h-4 w-4 mr-2" />
                      Connect to a Lawyer
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Court Locator CTA */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Building className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Need to Escalate?</h3>
                    <p className="text-muted-foreground mb-4">
                      Find the right court or authority to file your case.
                    </p>
                    <CourtLocatorButton 
                      caseType={analysisResult.documentType === 'Rental Agreement' ? 'rental' : 'consumer'}
                      issueDescription={`${analysisResult.risks[0]?.description} detected in ${analysisResult.documentType}`}
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => setAnalysisResult(null)}>
                Analyze Another Document
              </Button>
              <Button variant="outline">
                Download Report
              </Button>
              <Button variant="outline">
                Save to Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}