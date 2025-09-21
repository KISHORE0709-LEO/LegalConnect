import { ref, push, set, get, update, remove, onValue } from 'firebase/database';
import { db } from '../firebase/config';

export interface UserProfile {
  uid: string;
  email: string;
  name?: string;
  persona?: string;
  legalNeeds?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DocumentAnalysis {
  id?: string;
  userId: string;
  fileName: string;
  fileType: string;
  analysis: any;
  riskScore?: number;
  summary?: string;
  createdAt: string;
}

export const firebaseService = {
  // User Profile Management
  createUserProfile: async (uid: string, profileData: Partial<UserProfile>) => {
    const userRef = ref(db, `users/${uid}`);
    const profile: UserProfile = {
      uid,
      ...profileData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as UserProfile;
    
    await set(userRef, profile);
    return profile;
  },

  getUserProfile: async (uid: string): Promise<UserProfile | null> => {
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);
    return snapshot.exists() ? snapshot.val() : null;
  },

  updateUserProfile: async (uid: string, updates: Partial<UserProfile>) => {
    const userRef = ref(db, `users/${uid}`);
    const updateData = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await update(userRef, updateData);
  },

  // Document Analysis Storage
  saveDocumentAnalysis: async (analysis: Omit<DocumentAnalysis, 'id' | 'createdAt'>) => {
    const analysisRef = ref(db, `documentAnalyses/${analysis.userId}`);
    const newAnalysisRef = push(analysisRef);
    
    const documentAnalysis: DocumentAnalysis = {
      ...analysis,
      id: newAnalysisRef.key!,
      createdAt: new Date().toISOString(),
    };
    
    await set(newAnalysisRef, documentAnalysis);
    return documentAnalysis;
  },

  getUserDocumentAnalyses: async (userId: string): Promise<DocumentAnalysis[]> => {
    const analysisRef = ref(db, `documentAnalyses/${userId}`);
    const snapshot = await get(analysisRef);
    
    if (!snapshot.exists()) return [];
    
    const analyses = snapshot.val();
    return Object.values(analyses) as DocumentAnalysis[];
  },

  deleteDocumentAnalysis: async (userId: string, analysisId: string) => {
    const analysisRef = ref(db, `documentAnalyses/${userId}/${analysisId}`);
    await remove(analysisRef);
  },

  // Real-time listeners
  subscribeToUserProfile: (uid: string, callback: (profile: UserProfile | null) => void) => {
    const userRef = ref(db, `users/${uid}`);
    return onValue(userRef, (snapshot) => {
      callback(snapshot.exists() ? snapshot.val() : null);
    });
  },

  subscribeToUserDocuments: (userId: string, callback: (documents: DocumentAnalysis[]) => void) => {
    const analysisRef = ref(db, `documentAnalyses/${userId}`);
    return onValue(analysisRef, (snapshot) => {
      if (!snapshot.exists()) {
        callback([]);
        return;
      }
      
      const analyses = snapshot.val();
      callback(Object.values(analyses) as DocumentAnalysis[]);
    });
  },
};