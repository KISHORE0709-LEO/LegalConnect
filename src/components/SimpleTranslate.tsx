import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SimpleTranslateProps {
  text: string;
  className?: string;
}

const translations: Record<string, Record<string, string>> = {
  'Make Legal Documents': {
    hi: 'कानूनी दस्तावेज़ बनाएं',
    es: 'Hacer Documentos Legales',
    fr: 'Créer des Documents Juridiques'
  },
  'Understandable': {
    hi: 'समझने योग्य',
    es: 'Comprensible',
    fr: 'Compréhensible'
  },
  'AI-powered platform that simplifies legal jargon, analyzes risks, and connects you with lawyers. Perfect for freelancers, startups, students, and everyone who needs legal clarity.': {
    hi: 'एआई-संचालित प्लेटफॉर्म जो कानूनी शब्दजाल को सरल बनाता है, जोखिमों का विश्लेषण करता है, और आपको वकीलों से जोड़ता है।',
    es: 'Plataforma impulsada por IA que simplifica la jerga legal, analiza riesgos y te conecta con abogados.',
    fr: 'Plateforme alimentée par IA qui simplifie le jargon juridique, analyse les risques et vous connecte avec des avocats.'
  },
  'Upload Document': {
    hi: 'दस्तावेज़ अपलोड करें',
    es: 'Subir Documento',
    fr: 'Télécharger Document'
  },
  'Watch Demo': {
    hi: 'डेमो देखें',
    es: 'Ver Demo',
    fr: 'Voir Démo'
  },
  'Document Analysis': {
    hi: 'दस्तावेज़ विश्लेषण',
    es: 'Análisis de Documentos',
    fr: 'Analyse de Documents'
  },
  'Risk Assessment': {
    hi: 'जोखिम मूल्यांकन',
    es: 'Evaluación de Riesgos',
    fr: 'Évaluation des Risques'
  },
  'Lawyer Connect': {
    hi: 'वकील कनेक्ट',
    es: 'Conectar Abogado',
    fr: 'Connecter Avocat'
  }
};

export function SimpleTranslate({ text, className }: SimpleTranslateProps) {
  const { currentLanguage } = useLanguage();
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (currentLanguage === 'en') {
      setDisplayText(text);
    } else if (translations[text] && translations[text][currentLanguage]) {
      setDisplayText(translations[text][currentLanguage]);
    } else {
      setDisplayText(text);
    }
  }, [text, currentLanguage]);

  return <span className={className}>{displayText}</span>;
}