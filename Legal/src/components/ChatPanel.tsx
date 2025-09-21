import { useState } from "react";
import { Send, MessageSquare, Sparkles, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  citations?: string[];
}

interface ChatPanelProps {
  selectedClause?: string;
  documentId?: string;
}

export const ChatPanel = ({ selectedClause, documentId }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your legal document assistant. I can help explain clauses, identify risks, and answer questions about your document. What would you like to know?',
      timestamp: new Date(),
      citations: []
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickActions = [
    { label: 'Summarize Document', icon: FileQuestion, prompt: 'Please provide a comprehensive summary of this document' },
    { label: 'Key Risks', icon: MessageSquare, prompt: 'What are the main risks I should be aware of?' },
    { label: 'Negotiation Points', icon: Sparkles, prompt: 'What clauses should I negotiate or modify?' },
  ];

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I understand you're asking: "${messageContent}". Based on the legal analysis of your document, here are the key points to consider:\n\n• This appears to be related to contractual obligations\n• There are specific risk factors to be aware of\n• I recommend reviewing the relevant legal precedents\n\nWould you like me to elaborate on any specific aspect?`,
        timestamp: new Date(),
        citations: ['Section 12, Indian Contract Act', 'Consumer Protection Act 2019']
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex h-full flex-col bg-glass-bg backdrop-blur-sm border-glass-border shadow-medium animate-slide-in-right">
      <div className="border-b border-glass-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-soft">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-foreground">Legal Assistant</h3>
          {documentId && (
            <Badge variant="outline" className="ml-auto text-xs">
              Document Loaded
            </Badge>
          )}
        </div>

        {selectedClause && (
          <div className="mb-3 rounded-lg bg-primary/10 p-2 text-xs">
            <span className="font-medium">Selected Clause:</span> {selectedClause}
          </div>
        )}

        <div className="grid grid-cols-1 gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="ghost"
              size="sm"
              className="justify-start h-auto p-2 text-xs hover:bg-primary/10 transition-all duration-200"
              onClick={() => handleSendMessage(action.prompt)}
            >
              <action.icon className="mr-2 h-3 w-3" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-3 text-sm ${
                  message.type === 'user'
                    ? 'bg-gradient-primary text-white shadow-soft'
                    : 'bg-card border shadow-soft'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                {message.citations && message.citations.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {message.citations.map((citation, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {citation}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="mt-1 text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-card border rounded-lg p-3 shadow-soft">
                <div className="flex items-center gap-2">
                  <div className="animate-spin-slow h-3 w-3 rounded-full border-2 border-primary border-t-transparent"></div>
                  <span className="text-sm text-muted-foreground">Analyzing...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-glass-border p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your document..."
            className="flex-1 bg-background/50 backdrop-blur-sm border-glass-border focus:ring-primary/50"
            disabled={isLoading}
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};