import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MessageCircle, Mic, Upload, Globe, Volume2, Send } from 'lucide-react';
import { VoiceInput } from './VoiceInput';
import { ImageUpload } from './ImageUpload';
import { T } from './T';

export function AIFeaturesWidget() {
  const [chatInput, setChatInput] = useState('');
  const [translationText, setTranslationText] = useState('');
  const [targetLang, setTargetLang] = useState('hi');

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4 font-serif">
            <T>Your AI-Powered Legal Assistant</T>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            <T>Get instant, accurate legal advice, document help, and contract review — available 24/7.</T>
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Button size="lg" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3">
              <T>Ask Your Legal Question</T>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-800 text-slate-800 px-8 py-3">
              <T>Book a Lawyer Consultation</T>
            </Button>
          </div>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* AI Legal Assistant */}
          <Card className="bg-white shadow-lg rounded-xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-slate-800 font-serif">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
                <T>AI Legal Assistant</T>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-48 bg-slate-50 rounded-lg p-4 overflow-y-auto">
                <div className="bg-white p-3 rounded-lg shadow-sm mb-3">
                  <p className="text-sm text-slate-700">
                    <T>Hello! I'm your AI legal assistant. Ask me about contracts, legal documents, or any legal questions.</T>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask your legal question..."
                  className="border-slate-200 focus:border-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                <T>Clean chat interface with professional styling</T>
              </p>
            </CardContent>
          </Card>

          {/* Voice Assistant */}
          <Card className="bg-white shadow-lg rounded-xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-slate-800 font-serif">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mic className="h-6 w-6 text-green-600" />
                </div>
                <T>Voice Assistant</T>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <VoiceInput 
                  onTranscript={(text) => setChatInput(text)}
                  className="justify-center"
                />
                <p className="text-sm text-slate-600 mt-4">
                  <T>Speak to your legal assistant</T>
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs font-medium text-slate-700 mb-2">
                  <T>Supported Languages:</T>
                </p>
                <div className="flex flex-wrap gap-2">
                  {['English', 'Hindi', 'Telugu', 'Tamil'].map(lang => (
                    <span key={lang} className="px-2 py-1 bg-white rounded text-xs text-slate-600">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document & Image Analysis */}
          <Card className="bg-white shadow-lg rounded-xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-slate-800 font-serif">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Upload className="h-6 w-6 text-purple-600" />
                </div>
                <T>Document & Image Analysis</T>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center bg-slate-50">
                <Upload className="h-8 w-8 mx-auto mb-3 text-slate-400" />
                <p className="text-sm text-slate-600 mb-2">
                  <T>Upload Document/Image for Review</T>
                </p>
                <Button variant="outline" size="sm" className="border-slate-300">
                  <T>Choose File</T>
                </Button>
              </div>
              <Select defaultValue="contract">
                <SelectTrigger className="border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contract"><T>Contract</T></SelectItem>
                  <SelectItem value="agreement"><T>Agreement</T></SelectItem>
                  <SelectItem value="policy"><T>Policy</T></SelectItem>
                  <SelectItem value="other"><T>Other</T></SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Live Translation */}
          <Card className="bg-white shadow-lg rounded-xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-slate-800 font-serif">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
                <T>Live Translation</T>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={translationText}
                onChange={(e) => setTranslationText(e.target.value)}
                placeholder="Enter text to translate..."
                className="border-slate-200 focus:border-orange-500 min-h-20"
              />
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger className="border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="te">Telugu</SelectItem>
                  <SelectItem value="ta">Tamil</SelectItem>
                  <SelectItem value="kn">Kannada</SelectItem>
                </SelectContent>
              </Select>
              <div className="bg-slate-50 p-3 rounded-lg min-h-16">
                <p className="text-sm text-slate-600">
                  <T>Real-time translation will appear here...</T>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Section */}
        <div className="mt-16 text-center">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-4xl mx-auto mb-8">
            <p className="text-amber-800 text-sm">
              <T>⚠️ This service provides AI-generated legal assistance. For complex cases, please consult a qualified lawyer.</T>
            </p>
          </div>
          
          <div className="flex justify-center gap-8 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <T>SSL Secure</T>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <T>Data Privacy</T>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <T>GDPR Compliant</T>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-16 bg-slate-800 rounded-xl p-8">
          <div className="grid md:grid-cols-4 gap-6 text-center text-white">
            <div className="flex flex-col items-center">
              <MessageCircle className="h-8 w-8 mb-3 text-blue-400" />
              <h4 className="font-semibold mb-1"><T>AI Chat</T></h4>
              <p className="text-sm text-slate-300"><T>Instant legal answers</T></p>
            </div>
            <div className="flex flex-col items-center">
              <Mic className="h-8 w-8 mb-3 text-green-400" />
              <h4 className="font-semibold mb-1"><T>Voice I/O</T></h4>
              <p className="text-sm text-slate-300"><T>Speak to your assistant</T></p>
            </div>
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 mb-3 text-purple-400" />
              <h4 className="font-semibold mb-1"><T>Document Analysis</T></h4>
              <p className="text-sm text-slate-300"><T>Upload contracts for review</T></p>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="h-8 w-8 mb-3 text-orange-400" />
              <h4 className="font-semibold mb-1"><T>Translation</T></h4>
              <p className="text-sm text-slate-300"><T>Multilingual legal help</T></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}