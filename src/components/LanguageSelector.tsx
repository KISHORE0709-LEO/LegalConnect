import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { supportedLanguages } from '../services/translation';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void;
  currentLanguage: string;
}

export function LanguageSelector({ onLanguageChange, currentLanguage }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4" />
      <Select value={currentLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(supportedLanguages).map(([code, name]) => (
            <SelectItem key={code} value={code}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}