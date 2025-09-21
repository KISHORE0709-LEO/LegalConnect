import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Send, Sparkles, Clock, Shield } from "lucide-react";
import { Header } from "@/components/Header";

export default function SmartContractDrafting() {
  const [userInput, setUserInput] = useState("");
  const [generatedContract, setGeneratedContract] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [contractType, setContractType] = useState("");

  const handleGenerate = async () => {
    if (!userInput.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockContract = `
**${contractType.toUpperCase() || 'SERVICE'} AGREEMENT**

This Agreement is entered into on [INSERT DATE] between:

**Party A (Client):** [INSERT CLIENT NAME]
Address: [INSERT CLIENT ADDRESS]

**Party B (Service Provider):** [INSERT PROVIDER NAME]  
Address: [INSERT PROVIDER ADDRESS]

**1. SCOPE OF WORK**
${userInput}

**2. PAYMENT TERMS**
- Total Amount: $[INSERT AMOUNT]
- Payment Schedule: [INSERT SCHEDULE]
- Late Payment Fee: [INSERT FEE]

**3. DURATION**
This agreement shall commence on [START DATE] and terminate on [END DATE].

**4. INTELLECTUAL PROPERTY**
All work products created under this agreement shall belong to [INSERT OWNER].

**5. CONFIDENTIALITY**
Both parties agree to maintain confidentiality of all proprietary information.

**6. TERMINATION**
Either party may terminate this agreement with [INSERT NOTICE PERIOD] written notice.

**7. GOVERNING LAW**
This agreement shall be governed by the laws of [INSERT JURISDICTION].

**Signatures:**
Client: _________________ Date: _________
Provider: _________________ Date: _________
      `;
      
      setGeneratedContract(mockContract);
      setIsGenerating(false);
    }, 2000);
  };

  const contractTypes = [
    "Freelance Agreement",
    "Rental Agreement", 
    "Employment Contract",
    "Non-Disclosure Agreement",
    "Service Agreement",
    "Loan Agreement"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Sparkles className="h-10 w-10 text-legal-primary" />
              Smart Contract Drafting
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Describe your contract needs in plain language, and our AI will generate a legally-structured first draft tailored to your requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Describe Your Contract Needs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {contractTypes.map((type) => (
                    <Button
                      key={type}
                      variant={contractType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setContractType(type)}
                      className="text-xs"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
                
                <Textarea
                  placeholder="Example: I need a freelance photography contract that protects my rights to the photos, includes a 50% upfront payment, and covers a 3-day wedding event with editing services..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
                
                <Button 
                  onClick={handleGenerate}
                  disabled={!userInput.trim() || isGenerating}
                  className="w-full bg-gradient-primary"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Generating Contract...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Contract Draft
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Generated Contract Draft
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedContract ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg max-h-[400px] overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        {generatedContract}
                      </pre>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Export PDF
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Export Word
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Send className="mr-2 h-4 w-4" />
                        Send to Lawyer
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Your generated contract will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Disclaimer */}
          <Card className="mt-8 border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <p className="text-sm text-amber-800">
                <strong>Legal Disclaimer:</strong> This AI-generated contract is a starting point only and does not constitute legal advice. 
                Please consult with a qualified attorney before using any contract for legal purposes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}