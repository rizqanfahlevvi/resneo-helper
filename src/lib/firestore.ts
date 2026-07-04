import {
  doc, setDoc, getDoc, updateDoc, deleteDoc,
  collection, getDocs,
  query, orderBy, limit,
  serverTimestamp, Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { SessionRecord } from '../store';

// ─── Tipe dasar ──────────────────────────────────────────────────────────────

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
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
// Dokumen Firestore memakai ID yang SAMA dengan SessionRecord.id lokal (bukan
// auto-generated) agar sinkron antar-device tanpa perlu proses merge/dedup.

export async function saveSessionRecord(uid: string, record: SessionRecord): Promise<void> {
  const ref = doc(db, 'users', uid, 'sessions', record.id);
  await setDoc(ref, { ...record, createdAt: serverTimestamp() });
}

export async function getRecentSessions(uid: string, count = 20): Promise<SessionRecord[]> {
  const ref = collection(db, 'users', uid, 'sessions');
  const q = query(ref, orderBy('createdAt', 'desc'), limit(count));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as SessionRecord);
}

export async function deleteSessionRecord(uid: string, sessionId: string): Promise<void> {
  await deleteDoc(doc(db, 'users', uid, 'sessions', sessionId));
}
