import { useState, useCallback } from 'react';
import { TranslationService } from '../services/translation';

export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const translateText = useCallback(async (text: string, targetLanguage?: string) => {
    const target = targetLanguage || currentLanguage;
    if (target === 'en') return text;

    setIsTranslating(true);
    try {
      const translated = await TranslationService.translateText(text, target);
      return translated;
    } finally {
      setIsTranslating(false);
    }
  }, [currentLanguage]);

  const translateDocument = useCallback(async (documentText: string, targetLanguage?: string) => {
    const target = targetLanguage || currentLanguage;
    if (target === 'en') return documentText;

    setIsTranslating(true);
    try {
      const translated = await TranslationService.translateDocument(documentText, target);
      return translated;
    } finally {
      setIsTranslating(false);
    }
  }, [currentLanguage]);

  return {
    currentLanguage,
    setCurrentLanguage,
    translateText,
    translateDocument,
    isTranslating
  };
}