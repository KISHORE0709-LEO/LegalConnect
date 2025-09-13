import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Languages, Play, Download, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const MultiLanguage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState("hindi");
  const [isPlaying, setIsPlaying] = useState(false);

  const languages = [
    { code: "english", name: "English", native: "English" },
    { code: "hindi", name: "Hindi", native: "हिंदी" },
    { code: "telugu", name: "Telugu", native: "తెలుగు" },
    { code: "tamil", name: "Tamil", native: "தமிழ்" }
  ];

  const translations = {
    english: {
      title: "Employment Agreement",
      content: `This Employment Agreement ("Agreement") is entered into between ABC Corporation ("Company") and John Doe ("Employee").

1. Position and Duties
Employee will serve as Software Engineer and will perform duties as assigned by the Company.

2. Compensation
Employee will receive a monthly salary of $5,000, payable on the last day of each month.

3. Benefits
Employee is entitled to health insurance, dental coverage, and 20 days of paid vacation annually.

4. Termination
Either party may terminate this agreement with 30 days written notice to the other party.`
    },
    hindi: {
      title: "रोजगार समझौता",
      content: `यह रोजगार समझौता ("समझौता") ABC कॉर्पोरेशन ("कंपनी") और जॉन डो ("कर्मचारी") के बीच किया गया है।

1. पद और कर्तव्य
कर्मचारी सॉफ्टवेयर इंजीनियर के रूप में कार्य करेगा और कंपनी द्वारा सौंपे गए कर्तव्यों का पालन करेगा।

2. मुआवजा
कर्मचारी को $5,000 का मासिक वेतन मिलेगा, जो हर महीने के अंतिम दिन देय होगा।

3. लाभ
कर्मचारी स्वास्थ्य बीमा, दंत चिकित्सा कवरेज, और वार्षिक 20 दिन के वेतन सहित छुट्टी का हकदार है।

4. समाप्ति
कोई भी पक्ष दूसरे पक्ष को 30 दिन की लिखित सूचना देकर इस समझौते को समाप्त कर सकता है।`
    },
    telugu: {
      title: "ఉద్యోగ ఒప్పందం",
      content: `ఈ ఉద్యోగ ఒప్పందం ("ఒప్పందం") ABC కార్పోరేషన్ ("కంపెనీ") మరియు జాన్ డో ("ఉద్యోగి") మధ్య కుదుర్చుకోబడింది।

1. స్థానం మరియు విధులు
ఉద్యోగి సాఫ్ట్‌వేర్ ఇంజనీర్‌గా పనిచేస్తారు మరియు కంపెనీ కేటాయించిన విధులను నిర్వహిస్తారు।

2. పరిహారం
ఉద్యోగికి నెలవారీ $5,000 జీతం లభిస్తుంది, ప్రతి నెల చివరి రోజు చెల్లించబడుతుంది।

3. ప్రయోజనాలు
ఉద్యోగి ఆరోగ్య బీమా, దంత కవరేజ్ మరియు వార్షిక 20 రోజుల చెల్లింపు సెలవుకు అర్హుడు.

4. ముగింపు
ఏ పక్షమైనా మరో పక్షానికి 30 రోజుల వ్రాతపూర్వక నోటీసుతో ఈ ఒప్పందాన్ని రద్దు చేయవచ్చు।`
    },
    tamil: {
      title: "வேலை ஒப்பந்தம்",
      content: `இந்த வேலை ஒப்பந்தம் ("ஒப்பந்தம்") ABC கார்ப்பரேஷன் ("நிறுவனம்") மற்றும் ஜான் டோ ("பணியாளர்") இடையே கையெழுத்தானது.

1. பதவி மற்றும் கடமைகள்
பணியாளர் மென்பொருள் பொறியியலாளராக பணியாற்றுவார் மற்றும் நிறுவனத்தால் ஒதுக்கப்பட்ட கடமைகளை செய்வார்.

2. இழப்பீடு
பணியாளருக்கு மாதத்திற்கு $5,000 சம்பளம் கிடைக்கும், இது ஒவ்வொரு மாதத்தின் கடைசி நாளில் செலுத்தப்படும்.

3. நன்மைகள்
பணியாளர் உடல்நலக் காப்பீடு, பல் மருத்துவ காப்பீடு மற்றும் ஆண்டுக்கு 20 நாட்கள் ஊதியத்துடன் கூடிய விடுமுறைக்கு உரிமையுடையவர்.

4. முடிவு
எந்த தரப்பும் மற்ற தரப்பிற்கு 30 நாட்கள் எழுத்துப்பூர்வ அறிவிப்புடன் இந்த ஒப்பந்தத்தை நிறுத்தலாம்.`
    }
  };

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    toast({ 
      title: "Language Changed", 
      description: `Document translated to ${languages.find(l => l.code === languageCode)?.name}`
    });
  };

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    toast({ 
      title: isPlaying ? "Audio Stopped" : "Audio Playing",
      description: isPlaying ? "Text-to-speech stopped" : "Playing document in selected language"
    });
  };

  const handleDownloadPDF = () => {
    toast({ 
      title: "Download Started", 
      description: `Downloading translated PDF in ${languages.find(l => l.code === selectedLanguage)?.name}`
    });
  };

  const currentTranslation = translations[selectedLanguage as keyof typeof translations];

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
                Multi-Language Support
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handlePlayAudio}>
                {isPlaying ? (
                  <Volume2 className="h-4 w-4 mr-2" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                {isPlaying ? "Stop Audio" : "Play Audio"}
              </Button>
              <Button onClick={handleDownloadPDF} className="bg-gradient-primary">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Language Selection */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-legal-primary" />
                  Language Settings
                </CardTitle>
                <CardDescription>
                  Choose your preferred language
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Language</label>
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center gap-2">
                            <span>{lang.name}</span>
                            <span className="text-muted-foreground">({lang.native})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Translation Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Legal-specific translation</li>
                    <li>• Cultural context awareness</li>
                    <li>• Regional law variations</li>
                    <li>• Audio pronunciation</li>
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Supported Languages</h4>
                  <div className="space-y-2">
                    {languages.map((lang) => (
                      <div key={lang.code} className="flex items-center justify-between text-sm">
                        <span>{lang.name}</span>
                        <span className="text-muted-foreground">{lang.native}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Display */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Original Document */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-center">Original Document (English)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] w-full">
                    <div className="space-y-4 text-sm">
                      <h3 className="text-lg font-semibold">{translations.english.title}</h3>
                      <div className="whitespace-pre-line">{translations.english.content}</div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Translated Document */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-center">
                    Translated Document ({languages.find(l => l.code === selectedLanguage)?.name})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] w-full">
                    <div className="space-y-4 text-sm">
                      <h3 className="text-lg font-semibold">{currentTranslation.title}</h3>
                      <div className="whitespace-pre-line" dir={selectedLanguage === 'tamil' ? 'ltr' : 'ltr'}>
                        {currentTranslation.content}
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Translation Quality Notice */}
            <Card className="mt-6 bg-gradient-to-br from-legal-primary/5 to-legal-primary-dark/5 border-legal-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Languages className="h-5 w-5 text-legal-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-legal-primary mb-2">Translation Accuracy</h4>
                    <p className="text-sm text-muted-foreground">
                      Our AI-powered translation maintains legal context and terminology accuracy across languages. 
                      For critical legal documents, we recommend having translations reviewed by a qualified legal professional 
                      familiar with local laws and regulations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};