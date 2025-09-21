import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDd3YIOVr5wOpRvDNxtU8-4GNC0vQfgun4",
  authDomain: "legal-connect-ai.firebaseapp.com",
  projectId: "legal-connect-ai",
  storageBucket: "legal-connect-ai.firebasestorage.app",
  messagingSenderId: "887966300059",
  appId: "1:887966300059:web:4e5c21454cc6000f98133e",
  measurementId: "G-D89VRHJK43"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const db = getDatabase(app);