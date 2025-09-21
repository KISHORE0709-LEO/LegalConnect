import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, FileText, MessageSquare, Shield, AlertTriangle, CheckCircle, 
  Send, Paperclip, User, Bot, Globe, Settings, Eye, Download
} from "lucide-react";

interface Clause {
  id: string;
  text: string;
  risk: 'low' | 'medium' | 'high';
  category: string;
  explanation: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIFeatures = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [healthScore, setHealthScore] = useState<number | null>(null);
  const [language, setLanguage] = useState('en');
  const [userRole, setUserRole] = useState('tenant');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [clauses, setClauses] = useState<Clause[]>([]);
  const [highlightedClause, setHighlightedClause] = useState<string | null>(null);

  const mockClauses: Clause[] = [
    {
      id: '1',
      text: 'Security deposit of $3,000 is required upon signing',
      risk: 'high',
      category: 'Financial Terms',
      explanation: 'This security deposit exceeds the legal limit of 2 months rent in most jurisdictions.'
    },
    {
      id: '2', 
      text: 'Tenant is responsible for all maintenance and repairs',
      risk: 'medium',
      category: 'Responsibilities',
      explanation: 'This clause may shift excessive responsibility to the tenant for structural repairs.'
    },
    {
      id: '3',
      text: 'Lease term is 12 months with automatic renewal',
      risk: 'low',
      category: 'Term & Renewal',
      explanation: 'Standard lease term with clear renewal conditions.'
    }
  ];

  const handleFileUpload = useCallback((file: File) => {
    setUploadedFile(file);
    setUploadProgress(0);
    setIsAnalyzing(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate analysis
          setTimeout(() => {
            setHealthScore(72);
            setClauses(mockClauses);
            setIsAnalyzing(false);
            setMessages([{
              id: '1',
              type: 'ai',
              content: 'I\'ve analyzed your document and found 3 key clauses. The overall legal health score is 72/100 with some areas of concern. How can I help you understand these terms?',
              timestamp: new Date()
            }]);
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Based on your question, I can see you\'re concerned about the security deposit clause. This amount appears to exceed typical legal limits. I recommend negotiating this down or seeking legal advice.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      {/* Main Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">LegalScan AI</h1>
              {uploadedFile && (
                <Badge variant="secondary" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {uploadedFile.name}
                </Badge>
              )}
              {healthScore && (
                <Badge className={`${getHealthScoreColor(healthScore)} bg-white border`}>
                  Health Score: {healthScore}/100
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="ta">தமிழ்</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={userRole} onValueChange={setUserRole}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tenant">Tenant</SelectItem>
                  <SelectItem value="borrower">Borrower</SelectItem>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {!uploadedFile ? (
          /* Upload Area */
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
              <CardContent className="pt-12 pb-12 text-center">
                <Upload className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">Upload Legal Document</h3>
                <p className="text-gray-600 mb-6">Drag & drop your PDF, Word, or image files here</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button className="bg-gradient-primary" asChild>
                    <span>Choose File</span>
                  </Button>
                </label>
                <div className="grid grid-cols-3 gap-4 mt-8 text-sm text-gray-600">
                  <div className="text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p>PDF & Word Support</p>
                  </div>
                  <div className="text-center">
                    <Eye className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p>OCR Technology</p>
                  </div>
                  <div className="text-center">
                    <Globe className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <p>Multi-Language</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Analysis Interface */
          <div className="grid grid-cols-12 gap-6">
            {/* Document Viewer */}
            <div className="col-span-7">
              <Card className="h-[600px]">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Document Viewer</span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-full">
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-lg font-medium mb-2">Analyzing Document...</p>
                      <Progress value={uploadProgress} className="w-64" />
                      <p className="text-sm text-gray-600 mt-2">{uploadProgress}% Complete</p>
                    </div>
                  ) : (
                    <div className="bg-gray-100 h-full rounded-lg p-6 overflow-y-auto">
                      <div className="bg-white p-6 rounded shadow-sm">
                        <h3 className="text-lg font-bold mb-4">RENTAL AGREEMENT</h3>
                        <div className="space-y-4 text-sm leading-relaxed">
                          <p>This Rental Agreement is entered into on [DATE] between:</p>
                          <p><strong>Landlord:</strong> [LANDLORD NAME]</p>
                          <p><strong>Tenant:</strong> [TENANT NAME]</p>
                          
                          <div className={`p-3 rounded border-l-4 ${highlightedClause === '1' ? 'bg-red-100 border-red-500' : 'bg-gray-50 border-gray-300'}`}>
                            <p><strong>Security Deposit:</strong> Security deposit of $3,000 is required upon signing this agreement.</p>
                          </div>
                          
                          <div className={`p-3 rounded border-l-4 ${highlightedClause === '2' ? 'bg-yellow-100 border-yellow-500' : 'bg-gray-50 border-gray-300'}`}>
                            <p><strong>Maintenance:</strong> Tenant is responsible for all maintenance and repairs of the property.</p>
                          </div>
                          
                          <div className={`p-3 rounded border-l-4 ${highlightedClause === '3' ? 'bg-green-100 border-green-500' : 'bg-gray-50 border-gray-300'}`}>
                            <p><strong>Term:</strong> Lease term is 12 months with automatic renewal unless terminated.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Chat Panel */}
            <div className="col-span-5">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    AI Legal Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-600' : 'bg-gray-600'}`}>
                            {message.type === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                          </div>
                          <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask about your document..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      Explain risks
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Suggest changes
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Legal advice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {/* Clause Analysis Panel */}
        {clauses.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Clause Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {clauses.map((clause) => (
                  <div 
                    key={clause.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${getRiskColor(clause.risk)} ${highlightedClause === clause.id ? 'ring-2 ring-blue-500' : ''}`}
                    onMouseEnter={() => setHighlightedClause(clause.id)}
                    onMouseLeave={() => setHighlightedClause(null)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">{clause.category}</Badge>
                          <Badge className={`text-xs ${clause.risk === 'high' ? 'bg-red-600' : clause.risk === 'medium' ? 'bg-yellow-600' : 'bg-green-600'}`}>
                            {clause.risk.toUpperCase()} RISK
                          </Badge>
                        </div>
                        <p className="font-medium mb-2">{clause.text}</p>
                        <p className="text-sm opacity-80">{clause.explanation}</p>
                      </div>
                      {clause.risk === 'high' && <AlertTriangle className="h-5 w-5 text-red-600" />}
                      {clause.risk === 'medium' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                      {clause.risk === 'low' && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIFeatures;