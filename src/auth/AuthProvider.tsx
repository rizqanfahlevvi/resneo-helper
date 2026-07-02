import { useEffect, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useAuthStore, UserProfile } from './useAuthStore';

export default function AuthProvider({
  children
}: {
  children: ReactNode
}) {
  const { setUser, setUserProfile, setInitialized } = useAuthStore();

  useEffect(() => {
    let unsubscribeFirestore: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (unsubscribeFirestore) {
        unsubscribeFirestore();
        unsubscribeFirestore = null;
      }

      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        unsubscribeFirestore = onSnapshot(userDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              setUserProfile(docSnap.data() as UserProfile);
            } else {
              setUserProfile(null);
            }
            setInitialized(true);
          },
          (error) => {
            console.error('Error fetching user profile:', error);
            setUserProfile(null);
            setInitialized(true);
          }
        );
      } else {
        setUserProfile(null);
        setInitialized(true);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  return <>{children}</>;
}
