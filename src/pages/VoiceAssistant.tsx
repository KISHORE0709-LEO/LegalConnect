import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mic, MicOff, Play, Pause, Volume2, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const VoiceAssistant = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");

  const conversations = [
    {
      id: 1,
      userQuery: "What are the termination clauses in my employment contract?",
      timestamp: "2:30 PM",
      aiResponse: "Based on your employment contract, there are two main termination clauses: Section 8.1 allows either party to terminate with 30 days written notice, and Section 8.2 covers immediate termination for cause, including misconduct or breach of confidentiality.",
      audioLength: "45 seconds"
    },
    {
      id: 2,
      userQuery: "Can I work for competitors after leaving this job?",
      timestamp: "2:35 PM", 
      aiResponse: "Your contract includes a non-compete clause in Section 12.3 that restricts working for direct competitors for 12 months after employment ends. However, this only applies to companies in the same industry within a 50-mile radius.",
      audioLength: "38 seconds"
    }
  ];

  const handleStartListening = () => {
    setIsListening(true);
    setCurrentTranscript("Listening...");
    toast({ title: "Voice Recording Started", description: "Speak your question now" });
    
    // Simulate voice recognition
    setTimeout(() => {
      setCurrentTranscript("What is the penalty for early contract termination?");
      setTimeout(() => {
        setIsListening(false);
        toast({ title: "Processing", description: "Analyzing your question..." });
      }, 2000);
    }, 1000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    setCurrentTranscript("");
    toast({ title: "Recording Stopped", description: "Processing your voice message..." });
  };

  const handlePlayResponse = (conversationId: number) => {
    setIsPlaying(!isPlaying);
    toast({ 
      title: isPlaying ? "Audio Stopped" : "Playing Response",
      description: isPlaying ? "Audio playback stopped" : "Playing AI response"
    });
  };

  const handleReplayResponse = (conversationId: number) => {
    toast({ title: "Replaying Response", description: "Starting audio from beginning" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-legal-secondary/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-legal-primary to-legal-primary-dark bg-clip-text text-transparent">
              Voice Assistant
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Voice Input Section */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Volume2 className="h-5 w-5 text-legal-primary" />
                Voice Query
              </CardTitle>
              <CardDescription>
                Ask questions about your legal documents using voice commands
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              {/* Main Mic Button */}
              <div className="flex justify-center">
                <Button
                  variant={isListening ? "destructive" : "default"}
                  size="lg"
                  className={`w-32 h-32 rounded-full ${
                    isListening 
                      ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                      : "bg-gradient-primary hover:scale-105"
                  } transition-all duration-300`}
                  onClick={isListening ? handleStopListening : handleStartListening}
                >
                  {isListening ? (
                    <MicOff className="h-12 w-12" />
                  ) : (
                    <Mic className="h-12 w-12" />
                  )}
                </Button>
              </div>

              {/* Status and Transcript */}
              <div className="space-y-3">
                <Badge variant={isListening ? "destructive" : "secondary"} className="text-sm">
                  {isListening ? "Listening..." : "Ready to Listen"}
                </Badge>
                
                {currentTranscript && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Live Transcript:</p>
                    <p className="font-medium">{currentTranscript}</p>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-gradient-to-br from-legal-primary/5 to-legal-primary-dark/5 p-4 rounded-lg border border-legal-primary/20">
                <h4 className="font-semibold text-legal-primary mb-2">How to Use Voice Assistant</h4>
                <ul className="text-sm text-muted-foreground space-y-1 text-left">
                  <li>• Click the microphone button and speak clearly</li>
                  <li>• Ask specific questions about your document</li>
                  <li>• Listen to AI responses with text-to-speech</li>
                  <li>• Replay responses anytime using the replay button</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Conversation History */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Voice Conversation History</CardTitle>
              <CardDescription>
                Your previous voice interactions with the AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] w-full">
                <div className="space-y-6">
                  {conversations.map((conversation) => (
                    <div key={conversation.id} className="space-y-4">
                      {/* User Query */}
                      <div className="flex justify-end">
                        <div className="max-w-[80%] bg-legal-primary text-primary-foreground p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Mic className="h-4 w-4" />
                            <span className="text-xs opacity-70">{conversation.timestamp}</span>
                          </div>
                          <p className="text-sm">{conversation.userQuery}</p>
                        </div>
                      </div>

                      {/* AI Response */}
                      <div className="flex justify-start">
                        <div className="max-w-[80%] bg-muted p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Volume2 className="h-4 w-4 text-legal-primary" />
                              <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {conversation.audioLength}
                            </Badge>
                          </div>
                          <p className="text-sm mb-3">{conversation.aiResponse}</p>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handlePlayResponse(conversation.id)}
                            >
                              {isPlaying ? (
                                <>
                                  <Pause className="h-3 w-3 mr-1" />
                                  Pause
                                </>
                              ) : (
                                <>
                                  <Play className="h-3 w-3 mr-1" />
                                  Play
                                </>
                              )}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleReplayResponse(conversation.id)}
                            >
                              <RotateCcw className="h-3 w-3 mr-1" />
                              Replay
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Voice Settings */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Voice Settings</CardTitle>
              <CardDescription>
                Customize your voice assistant experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Languages Supported</h4>
                  <p className="text-sm text-muted-foreground">English, Hindi, Telugu, Tamil</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Speech Recognition</h4>
                  <p className="text-sm text-muted-foreground">Advanced AI with 95% accuracy</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Response Time</h4>
                  <p className="text-sm text-muted-foreground">Real-time processing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};