interface Environment {
  API_BASE_URL: string;
  GOOGLE_CLOUD_PROJECT_ID: string;
  ENVIRONMENT: 'development' | 'production';
}

const getEnvironment = (): Environment => {
  const isDevelopment = import.meta.env.DEV;
  
  return {
    API_BASE_URL: isDevelopment 
      ? 'http://localhost:3001/api'
      : 'https://legal-connect-ai.appspot.com/api',
    GOOGLE_CLOUD_PROJECT_ID: import.meta.env.VITE_GOOGLE_CLOUD_PROJECT_ID || 'legal-connect-ai',
    ENVIRONMENT: isDevelopment ? 'development' : 'production'
  };
};

export const env = getEnvironment();