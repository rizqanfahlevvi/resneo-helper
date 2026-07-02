import { create } from 'zustand';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  namaLengkap?: string;
  role: "pending" | "doctor" | "resident" | "specialist" | "admin";
  subscriptionStatus: "inactive" | "trial" | "active" | "expired";
  profileCompleted: boolean;
  subscriptionExpiredAt?: Timestamp | null;
  verificationStatus?: string;
  isAdmin?: boolean;
  createdAt: Timestamp;
  lastLogin: Timestamp;
}

interface AuthStore {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  userProfile: null,
  isLoading: false,
  isInitialized: false,
  setUser: (user) => set({ user }),
  setUserProfile: (userProfile) => set({ userProfile }),
  setLoading: (isLoading) => set({ isLoading }),
  setInitialized: (isInitialized) => set({ isInitialized }),
}));
