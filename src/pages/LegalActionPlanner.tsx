import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Upload, Download, Mail, Clock, FileText, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";

export default function LegalActionPlanner() {
  const [uploadedDoc, setUploadedDoc] = useState("");
  const [actionPlan, setActionPlan] = useState<any>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const handleFileUpload = (docType: string) => {
    setUploadedDoc(docType);
    
    // Mock action plan based on document type
    const mockPlans = {
      "Rental Agreement": {
        beforeSigning: [
          "Verify landlord's identity and ownership documents",
          "Inspect property condition and take photos",
          "Confirm move-in date and rent amount",
          "Check for hidden fees or charges",
          "Review termination and renewal clauses"
        ],
        afterSigning: [
          "Take detailed photos of property condition",
          "Request receipt for security deposit",
          "Set up utility accounts in your name",
          "Get copies of all keys and access codes",
          "Document any existing damages"
        ],
        forRecords: [
          "Save digital copies of signed agreement",
          "Store landlord's contact information",
          "Keep receipts for deposit and first month's rent",
          "Document all communications with landlord",
          "Set calendar reminders for rent due dates"
        ]
      },
      "Employment Contract": {
        beforeSigning: [
          "Negotiate salary and benefits package",
          "Clarify job responsibilities and reporting structure",
          "Review non-compete and confidentiality clauses",
          "Understand termination conditions",
          "Verify company's background and reputation"
        ],
        afterSigning: [
          "Complete all onboarding paperwork",
          "Set up direct deposit and benefits enrollment",
          "Understand company policies and procedures",
          "Meet your team and key stakeholders",
          "Clarify performance expectations and goals"
        ],
        forRecords: [
          "Keep original signed contract in safe place",
          "Save digital backup of all employment documents",
          "Document your start date and initial salary",
          "Keep records of any amendments or changes",
          "Maintain file of performance reviews"
        ]
      }
    };

    setActionPlan(mockPlans[docType as keyof typeof mockPlans] || mockPlans["Rental Agreement"]);
  };

  const toggleCheck = (section: string, index: number) => {
    const key = `${section}-${index}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getProgress = (section: string, items: string[]) => {
    const checkedCount = items.filter((_, index) => checkedItems[`${section}-${index}`]).length;
    return Math.round((checkedCount / items.length) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <CheckSquare className="h-10 w-10 text-green-600" />
              Legal Action Planner
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get actionable to-do lists and step-by-step guidance for any legal document. Transform passive analysis into practical action plans.
            </p>
          </div>

          {!actionPlan ? (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Document for Action Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Select a document type to see a sample action plan, or upload your own document for personalized guidance.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => handleFileUpload("Rental Agreement")}
                  >
                    <FileText className="h-6 w-6" />
                    Rental Agreement
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2"
                    onClick={() => handleFileUpload("Employment Contract")}
                  >
                    <FileText className="h-6 w-6" />
                    Employment Contract
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Action Plan: {uploadedDoc}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Reminders
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Before Signing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                        Before Signing
                      </span>
                      <Badge variant="secondary">
                        {getProgress("before", actionPlan.beforeSigning)}% Complete
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {actionPlan.beforeSigning.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <Checkbox
                          checked={checkedItems[`before-${index}`] || false}
                          onCheckedChange={() => toggleCheck("before", index)}
                          className="mt-1"
                        />
                        <span className={`text-sm ${checkedItems[`before-${index}`] ? 'line-through text-muted-foreground' : ''}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* After Signing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckSquare className="h-5 w-5 text-blue-600" />
                        After Signing
                      </span>
                      <Badge variant="secondary">
                        {getProgress("after", actionPlan.afterSigning)}% Complete
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {actionPlan.afterSigning.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <Checkbox
                          checked={checkedItems[`after-${index}`] || false}
                          onCheckedChange={() => toggleCheck("after", index)}
                          className="mt-1"
                        />
                        <span className={`text-sm ${checkedItems[`after-${index}`] ? 'line-through text-muted-foreground' : ''}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* For Records */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-600" />
                        For Records
                      </span>
                      <Badge variant="secondary">
                        {getProgress("records", actionPlan.forRecords)}% Complete
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {actionPlan.forRecords.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <Checkbox
                          checked={checkedItems[`records-${index}`] || false}
                          onCheckedChange={() => toggleCheck("records", index)}
                          className="mt-1"
                        />
                        <span className={`text-sm ${checkedItems[`records-${index}`] ? 'line-through text-muted-foreground' : ''}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-2">Smart Reminders</h4>
                      <p className="text-sm text-amber-700">
                        Set up email reminders for time-sensitive actions like rent payments, contract renewals, or document deadlines.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setActionPlan(null);
                    setUploadedDoc("");
                    setCheckedItems({});
                  }}
                >
                  Plan Another Document
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}