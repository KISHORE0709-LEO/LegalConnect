import { useState } from "react";
import { ZoomIn, ZoomOut, RotateCw, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DocumentViewerProps {
  documentId?: string;
  highlightRange?: { start: number; end: number };
}

export const DocumentViewer = ({ documentId, highlightRange }: DocumentViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const [activeTab, setActiveTab] = useState("viewer");

  // Mock document content
  const mockContent = `
RENTAL AGREEMENT

This Rental Agreement ("Agreement") is entered into on [DATE] between [LANDLORD NAME] ("Landlord") and [TENANT NAME] ("Tenant").

SECTION 1: PROPERTY DESCRIPTION
The property located at [ADDRESS] is hereby leased to the Tenant for residential purposes only.

SECTION 2: PAYMENT TERMS  
Payment shall be due within 30 days of invoice date. Late payments may incur penalty charges of 2% per month. The monthly rent is $[AMOUNT] due on the first day of each month.

SECTION 3: SERVICE DESCRIPTION
Services to be provided include but are not limited to consulting, analysis, and reporting as deemed necessary by the provider. Maintenance services will be available during business hours.

SECTION 4: LIABILITY LIMITATION
Company shall not be liable for any damages exceeding the total amount paid under this agreement, regardless of cause. This limitation applies to all claims whether in contract, tort, or otherwise.

SECTION 7: TERMINATION RIGHTS
Either party may terminate this agreement at any time without cause by providing 24 hours written notice. Upon termination, all obligations cease immediately except for payment obligations.

SECTION 8: ADDITIONAL TERMS
Additional terms and conditions may apply as specified in attached schedules and amendments.
  `;

  const handleZoomIn = () => setZoom(prev => Math.min(200, prev + 25));
  const handleZoomOut = () => setZoom(prev => Math.max(50, prev - 25));

  const getHighlightedContent = (content: string) => {
    if (!highlightRange) return content;
    
    const before = content.slice(0, highlightRange.start);
    const highlighted = content.slice(highlightRange.start, highlightRange.end);
    const after = content.slice(highlightRange.end);
    
    return (
      <>
        {before}
        <span className="bg-primary/20 border-l-4 border-primary px-2 py-1 rounded animate-pulse-glow">
          {highlighted}
        </span>
        {after}
      </>
    );
  };

  return (
    <Card className="h-full flex flex-col bg-glass-bg backdrop-blur-sm border-glass-border shadow-medium animate-fade-in-scale">
      <div className="border-b border-glass-border p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Document Viewer</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[3rem] text-center">
              {zoom}%
            </span>
            <Button variant="ghost" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-auto grid-cols-4 bg-glass border-glass-border">
          <TabsTrigger value="viewer" className="text-xs">
            <Eye className="h-3 w-3 mr-1" />
            Viewer
          </TabsTrigger>
          <TabsTrigger value="summary" className="text-xs">Summary</TabsTrigger>
          <TabsTrigger value="clauses" className="text-xs">Clauses</TabsTrigger>
          <TabsTrigger value="original" className="text-xs">Original</TabsTrigger>
        </TabsList>

        <div className="flex-1 p-4">
          <TabsContent value="viewer" className="h-full m-0">
            <ScrollArea className="h-full">
              <div 
                className="bg-white rounded-lg shadow-soft p-6 mx-auto max-w-4xl animate-fade-in-up"
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
              >
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {getHighlightedContent(mockContent)}
                  </pre>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="summary" className="h-full m-0">
            <Card className="h-full p-6 bg-gradient-subtle border-glass-border animate-fade-in-up">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Document Purpose</h4>
                  <p className="text-sm text-muted-foreground">
                    This is a rental agreement establishing the terms and conditions between a landlord and tenant for residential property rental.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Key Obligations</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Monthly rent payment due on the 1st of each month</li>
                    <li>• 24-hour notice required for termination</li>
                    <li>• Property to be used for residential purposes only</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Top 3 Risks</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-risk-high"></div>
                      Very short termination notice (24 hours)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-risk-caution"></div>
                      Limited liability protection for damages
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-risk-caution"></div>
                      Vague service description terms
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="clauses" className="h-full m-0">
            <div className="h-full animate-fade-in-up">
              <p className="text-center text-muted-foreground">
                Clause analysis will appear here when a document is uploaded.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="original" className="h-full m-0">
            <ScrollArea className="h-full">
              <div className="bg-muted/50 rounded-lg p-4 animate-fade-in-up">
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                  {mockContent}
                </pre>
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};