import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, FileText, Send, Mic, Download, User, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const ChatDocuments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);

  const chatHistory = [
    {
      type: "user",
      message: "Can I terminate this contract early?",
      timestamp: "2:30 PM"
    },
    {
      type: "ai",
      message: "Yes, according to Section 7.2 of your contract, you can terminate with 30 days written notice. However, you'll be subject to an early termination fee of $500 as stated in clause 7.3.",
      timestamp: "2:30 PM",
      sources: ["Section 7.2", "Clause 7.3"]
    },
    {
      type: "user", 
      message: "What's the penalty for late payment?",
      timestamp: "2:35 PM"
    },
    {
      type: "ai",
      message: "According to Section 4.1, late payments incur a 2% monthly penalty fee on the outstanding amount. After 30 days, the penalty increases to 5% per month.",
      timestamp: "2:35 PM",
      sources: ["Section 4.1"]
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    toast({ 
      title: "Message Sent", 
      description: "AI is analyzing your question..." 
    });
    setMessage("");
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    toast({ 
      title: isListening ? "Voice Recording Stopped" : "Voice Recording Started",
      description: isListening ? "Processing your voice message..." : "Speak your question now"
    });
  };

  const handleDownloadTranscript = () => {
    toast({ title: "Download Started", description: "Chat transcript is being prepared for download." });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-legal-secondary/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-legal-primary to-legal-primary-dark bg-clip-text text-transparent">
                Chat with Documents
              </h1>
            </div>
            <Button variant="outline" onClick={handleDownloadTranscript}>
              <Download className="h-4 w-4 mr-2" />
              Download Transcript
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Document Preview */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-legal-primary" />
                Document Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <ScrollArea className="h-[500px] w-full border rounded-lg p-4">
                <div className="space-y-4 text-sm">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded">
                    <strong>Section 7.2 - Termination</strong>
                  </div>
                  <p>Either party may terminate this agreement with thirty (30) days written notice to the other party...</p>
                  
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded">
                    <strong>Clause 7.3 - Early Termination Fee</strong>
                  </div>
                  <p>In the event of early termination by the Client, a fee of $500 shall be paid to the Service Provider...</p>
                  
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded">
                    <strong>Section 4.1 - Payment Terms</strong>
                  </div>
                  <p>All payments are due within 15 days of invoice date. Late payments shall incur a penalty of 2% per month...</p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="bg-gradient-card border-border/50 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-legal-primary" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              {/* Chat Messages */}
              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-4">
                  {chatHistory.map((chat, index) => (
                    <div key={index} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        chat.type === "user" 
                          ? "bg-legal-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          {chat.type === "user" ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                          <span className="text-xs opacity-70">{chat.timestamp}</span>
                        </div>
                        <p className="text-sm">{chat.message}</p>
                        {chat.sources && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {chat.sources.map((source, idx) => (
                              <span key={idx} className="text-xs bg-background/20 px-2 py-1 rounded">
                                {source}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask a question about your document..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleVoiceInput}
                  className={isListening ? "bg-red-500 text-white" : ""}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button onClick={handleSendMessage} className="bg-gradient-primary">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};