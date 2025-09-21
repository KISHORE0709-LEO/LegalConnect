import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, sendEmailVerification } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth, database } from '../firebase/config';

interface UserData {
  fullName?: string;
  phone?: string;
  persona?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, additionalData?: UserData) => Promise<void>;
  logout: () => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch additional user data from Realtime Database
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string, additionalData?: UserData) => {
    try {
      console.log('AuthContext: Creating user account...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('AuthContext: User created with UID:', user.uid);
      
      if (additionalData?.fullName) {
        console.log('AuthContext: Updating display name...');
        await updateProfile(user, {
          displayName: additionalData.fullName
        });
      }
      
      console.log('AuthContext: Saving user data to database...');
      const userDataRef = ref(database, `users/${user.uid}`);
      const userData = {
        email: user.email,
        fullName: additionalData?.fullName || '',
        phone: additionalData?.phone || '',
        createdAt: new Date().toISOString(),
        ...additionalData
      };
      
      await set(userDataRef, userData);
      setUserData(userData);
      console.log('AuthContext: Signup process completed successfully');
    } catch (error) {
      console.error('AuthContext: Signup error:', error);
      throw error;
    }
  };

  const updateUserData = async (data: Partial<UserData>) => {
    if (!user) throw new Error('No user logged in');
    
    const userRef = ref(database, `users/${user.uid}`);
    const updatedData = { ...userData, ...data };
    
    await set(userRef, updatedData);
    setUserData(updatedData);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    userData,
    loading,
    login,
    signup,
    logout,
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};