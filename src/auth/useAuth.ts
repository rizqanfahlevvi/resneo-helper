import { useAuthStore } from './useAuthStore';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { signOut as firebaseSignOut } from 'firebase/auth';

export function useAuth() {
  const { user, userProfile, isLoading, isInitialized } = useAuthStore();

  const isAuthenticated = !!user;

  const isAuthorized =
    isAuthenticated &&
    userProfile !== null &&
    (!userProfile.subscriptionExpiredAt ||
      userProfile.subscriptionExpiredAt.toDate() > new Date());

  const isAdmin =
    userProfile?.role === 'admin' ||
    user?.email === 'driverizqanf@gmail.com';

  const refreshProfile = async () => {
    if (!user) return;
    const docSnap = await getDoc(doc(db, 'users', user.uid));
    if (docSnap.exists()) {
      useAuthStore.getState().setUserProfile(docSnap.data() as any);
    }
  };

  return {
    user,
    userProfile,
    isLoading,
    isInitialized,
    isLoggedIn: isAuthenticated,
    isAuthenticated,
    isAuthorized,
    isAdmin,
    refreshProfile,
  };
}

export async function signOut() {
  await firebaseSignOut(auth);
}
