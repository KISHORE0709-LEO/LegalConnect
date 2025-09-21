import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { T } from './T';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  className?: string;
}

export function VoiceInput({ onTranscript, className }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false; // Changed to false for better control
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      let finalTranscript = '';

      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        finalTranscript = '';
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        // Send the current transcript (final + interim)
        const currentText = (finalTranscript + interimTranscript).trim();
        if (currentText) {
          onTranscript(currentText);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please allow microphone access and try again.');
        } else if (event.error === 'no-speech') {
          console.log('No speech detected, stopping...');
        } else {
          alert(`Speech recognition error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
        
        // Send final transcript if available
        if (finalTranscript.trim()) {
          onTranscript(finalTranscript.trim());
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
      
      // Auto-stop after 15 seconds
      setTimeout(() => {
        if (recognitionRef.current && isListening) {
          recognitionRef.current.stop();
        }
      }, 15000);
      
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      setIsSupported(false);
      alert('Failed to start speech recognition. Please try again.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) {
    return (
      <div className={className}>
        <Button variant="outline" disabled>
          <MicOff className="h-4 w-4" />
          <T>Voice not supported</T>
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        variant={isListening ? "destructive" : "outline"}
        onClick={isListening ? stopListening : startListening}
        className={`relative ${isListening ? 'animate-pulse' : ''}`}
        title={isListening ? 'Click to stop recording' : 'Click to start voice input'}
      >
        {isListening ? (
          <>
            <div className="absolute inset-0 bg-red-500 rounded animate-pulse opacity-30"></div>
            <MicOff className="h-4 w-4 relative z-10 text-white" />
          </>
        ) : (
          <Mic className="h-4 w-4" />
        )}
        <span className="ml-1">
          <T>{isListening ? 'Stop' : 'Voice'}</T>
        </span>
      </Button>
    </div>
  );
}