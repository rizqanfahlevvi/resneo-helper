import { useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuthStore } from './useAuthStore';

// Pasang listener onAuthStateChanged satu kali di root app
export function useAuthListener() {
  const { setUser, setInitialized } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitialized(true);
    });
    return unsubscribe;
  }, []);
}

// Shorthand hook untuk komponen yang butuh user + status
export function useAuth() {
  const { user, isLoading, isInitialized } = useAuthStore();
  return { user, isLoading, isInitialized, isLoggedIn: !!user };
}

export async function signOut() {
  await firebaseSignOut(auth);
}
