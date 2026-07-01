import {
  doc, setDoc, getDoc, updateDoc,
  collection, addDoc, getDocs,
  query, orderBy, limit,
  serverTimestamp, Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// ─── Tipe dasar ──────────────────────────────────────────────────────────────

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export interface SessionRecord {
  id?: string;
  userId: string;
  date: string;           // human-readable: "1 Juli 2026, 14:30"
  duration: string;       // "05:42"
  patientName: string;    // "By. Ny. Siti Aminah"
  birthWeight: string;
  gestationalAge: string;
  log: { time: string; message: string }[];
  drugLog: { drugName: string; dose: string; route: string; time: string }[];
  createdAt?: Timestamp;
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export async function createUserProfile(uid: string, data: Partial<UserProfile>) {
  const ref = doc(db, 'users', uid);
  await setDoc(ref, {
    ...data,
    uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  await updateDoc(doc(db, 'users', uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ─── Session / Resuscitation Records ─────────────────────────────────────────

export async function saveSessionRecord(record: Omit<SessionRecord, 'id' | 'createdAt'>) {
  const ref = collection(db, 'users', record.userId, 'sessions');
  return addDoc(ref, { ...record, createdAt: serverTimestamp() });
}

export async function getRecentSessions(uid: string, count = 20): Promise<SessionRecord[]> {
  const ref = collection(db, 'users', uid, 'sessions');
  const q = query(ref, orderBy('createdAt', 'desc'), limit(count));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as SessionRecord));
}
