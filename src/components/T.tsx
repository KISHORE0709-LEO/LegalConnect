import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { TranslationService } from '../services/translation';

interface TProps {
  children: string;
  className?: string;
}

const translationCache = new Map<string, string>();

export function T({ children, className }: TProps) {
  const { currentLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState(children);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const translateText = async () => {
      if (currentLanguage === 'en') {
        setTranslatedText(children);
        return;
      }

      const cacheKey = `${children}_${currentLanguage}`;
      if (translationCache.has(cacheKey)) {
        setTranslatedText(translationCache.get(cacheKey)!);
        return;
      }

      setIsLoading(true);
      try {
        const translated = await TranslationService.translateText(children, currentLanguage);
        translationCache.set(cacheKey, translated);
        setTranslatedText(translated);
      } catch (error) {
        setTranslatedText(children);
      } finally {
        setIsLoading(false);
      }
    };

    translateText();
  }, [children, currentLanguage]);

  return <span className={className}>{translatedText}</span>;
}