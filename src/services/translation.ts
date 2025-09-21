interface TranslationResponse {
  translatedText: string;
}

interface TranslationRequest {
  q: string;
  source: string;
  target: string;
  format: string;
}

export const supportedLanguages: Record<string, string> = {
  en: 'English',
  hi: 'हिंदी',
  es: 'Español', 
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  ja: '日本語',
  ko: '한국어',
  zh: '中文',
  ar: 'العربية',
  te: 'తెలుగు',
  ta: 'தமிழ்',
  bn: 'বাংলা',
  gu: 'ગુજરાતી',
  kn: 'ಕನ್ನಡ',
  ml: 'മലയാളം',
  mr: 'मराठी',
  pa: 'ਪੰਜਾਬੀ',
  ur: 'اردو'
};

export class TranslationService {
  private static readonly API_URL = 'https://libretranslate.com/translate';
  private static readonly LANGUAGES_URL = 'https://libretranslate.com/languages';

  static async translateText(text: string, targetLanguage: string): Promise<string> {
    if (targetLanguage === 'en' || !text.trim()) return text;
    
    try {
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`);
      const data = await response.json();
      return data[0][0][0] || text;
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    }
  }




}