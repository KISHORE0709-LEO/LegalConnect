import { env } from '../config/environment';

const API_BASE_URL = env.API_BASE_URL;

export const apiService = {
  // Analyze document with Gemini
  analyzeDocument: async (file: File, language: string = 'en') => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('language', language);

    const response = await fetch(`${API_BASE_URL}/analyze-document`, {
      method: 'POST',
      body: formData,
    });

    return response.json();
  },

  // Chat with document using Gemini
  chatWithDocument: async (question: string, documentContext: string) => {
    const response = await fetch(`${API_BASE_URL}/chat-document`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, documentContext }),
    });

    return response.json();
  },

  // Translate text using Google Translate
  translateText: async (text: string, targetLanguage: string) => {
    const response = await fetch(`${API_BASE_URL}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, targetLanguage }),
    });

    return response.json();
  },

  // Compare documents using Gemini
  compareDocuments: async (document1: string, document2: string) => {
    const response = await fetch(`${API_BASE_URL}/compare-documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ document1, document2 }),
    });

    return response.json();
  },
};