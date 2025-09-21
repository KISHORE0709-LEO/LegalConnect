import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale, Download, Mail, FileText, AlertTriangle, Gavel } from "lucide-react";
import { Header } from "@/components/Header";

export default function LegalDefenseWriter() {
  const [issueDescription, setIssueDescription] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!issueDescription.trim() || !documentType || !userLocation) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockLetter = `
**FORMAL NOTICE OF LEGAL VIOLATION**

Date: ${new Date().toLocaleDateString()}

To: [RECIPIENT NAME]
Address: [RECIPIENT ADDRESS]

Re: Violation of ${documentType} Terms and Applicable Law

Dear [RECIPIENT NAME],

**STATEMENT OF ISSUE**
I am writing to formally notify you of a violation regarding: ${issueDescription}

**CONTRACTUAL REFERENCE**
This issue pertains to our ${documentType.toLowerCase()} dated [CONTRACT DATE]. The relevant clause states: [SPECIFIC CLAUSE TEXT].

**LEGAL CITATION**
According to ${userLocation} state law, specifically [RELEVANT STATUTE CODE]:
- [APPLICABLE LAW SECTION 1]
- [APPLICABLE LAW SECTION 2]
- [PENALTY/REMEDY PROVISION]

**FORMAL REQUEST**
Based on the above legal violations, I formally request:

1. Immediate cessation of the illegal practice
2. Full refund/correction of any overcharges or violations
3. Written confirmation of compliance within 14 days
4. Assurance that such violations will not recur

**LEGAL CONSEQUENCES**
Please be advised that failure to address this matter may result in:
- Filing a complaint with [RELEVANT AUTHORITY]
- Pursuing legal action for damages and attorney fees
- Reporting to consumer protection agencies

I trust this matter can be resolved promptly and amicably. I look forward to your written response within 14 days of receipt of this notice.

Sincerely,

[YOUR NAME]
[YOUR ADDRESS]
[YOUR CONTACT INFORMATION]

**ATTACHMENTS:**
- Copy of original ${documentType.toLowerCase()}
- Supporting documentation
- Relevant law citations

---
*This letter was generated using AI assistance and does not constitute legal advice. Consult with a qualified attorney for complex legal matters.*
      `;
      
      setGeneratedLetter(mockLetter);
      setIsGenerating(false);
    }, 2000);
  };

  const issueTypes = [
    "Rental Agreement",
    "Employment Contract", 
    "Service Agreement",
    "Purchase Agreement",
    "Loan Agreement",
    "Insurance Policy"
  ];

  const states = [
    "California", "Texas", "Florida", "New York", "Pennsylvania",
    "Illinois", "Ohio", "Georgia", "North Carolina", "Michigan"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Scale className="h-10 w-10 text-amber-600" />
              Legal Defense Writer
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Generate formal legal letters and notices to defend your rights against unfair clauses or violations. 
              Professional documents that empower you to stand up for your rights.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  Describe Your Legal Issue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Your State/Location</Label>
                  <Select value={userLocation} onValueChange={setUserLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="issue">Describe the Issue</Label>
                  <Textarea
                    id="issue"
                    placeholder="Example: My landlord is charging a $500 cleaning fee, but state law limits it to $200 maximum. The lease doesn't specify the amount, and I left the apartment in good condition."
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    className="min-h-[150px] resize-none"
                  />
                </div>
                
                <Button 
                  onClick={handleGenerate}
                  disabled={!issueDescription.trim() || !documentType || !userLocation || isGenerating}
                  className="w-full bg-gradient-primary"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Scale className="mr-2 h-4 w-4 animate-spin" />
                      Generating Legal Letter...
                    </>
                  ) : (
                    <>
                      <Scale className="mr-2 h-4 w-4" />
                      Generate Defense Letter
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generated Legal Letter
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedLetter ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg max-h-[500px] overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        {generatedLetter}
                      </pre>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download Word
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Letter
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Your generated legal letter will appear here</p>
                    <p className="text-sm mt-2">Fill out the form and click generate to create your defense letter</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sample Issues */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Common Legal Issues We Can Help With</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🏠 Rental Issues</h4>
                  <p className="text-sm text-muted-foreground">Excessive deposits, illegal fees, maintenance violations</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">💼 Employment Issues</h4>
                  <p className="text-sm text-muted-foreground">Wage violations, illegal contract terms, discrimination</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🛒 Consumer Rights</h4>
                  <p className="text-sm text-muted-foreground">Unfair charges, service violations, warranty issues</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">💳 Financial Issues</h4>
                  <p className="text-sm text-muted-foreground">Loan violations, hidden fees, interest rate issues</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔒 Privacy Violations</h4>
                  <p className="text-sm text-muted-foreground">Data breaches, confidentiality violations</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">⚖️ Contract Disputes</h4>
                  <p className="text-sm text-muted-foreground">Breach of contract, unfair terms, non-compliance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="mt-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Important Legal Disclaimer</h4>
                  <p className="text-sm text-red-700">
                    This AI-generated letter is for informational purposes only and does not constitute legal advice. 
                    While we strive for accuracy, laws vary by jurisdiction and situation. For complex legal matters, 
                    please consult with a qualified attorney in your area.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}