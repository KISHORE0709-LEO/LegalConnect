import { useState, useEffect } from 'react';
import { TranslationService } from '../services/translation';
import { useLanguage } from '../contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

interface TranslatedTextProps {
  text: string;
  className?: string;
}

export function TranslatedText({ text, className }: TranslatedTextProps) {
  const { currentLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const translateText = async () => {
      if (currentLanguage === 'en') {
        setTranslatedText(text);
        return;
      }

      setIsLoading(true);
      try {
        const translated = await TranslationService.translateText(text, currentLanguage);
        setTranslatedText(translated);
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslatedText(text);
      } finally {
        setIsLoading(false);
      }
    };

    translateText();
  }, [text, currentLanguage]);

  if (isLoading) {
    return (
      <span className={className}>
        <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
        {text}
      </span>
    );
  }

  return <span className={className}>{translatedText}</span>;
}