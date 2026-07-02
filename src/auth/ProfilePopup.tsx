import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import {
  X, ShieldCheck, RefreshCw, KeyRound, LogOut, BadgeCheck, ShieldQuestion,
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { useAuth, signOut } from './useAuth';

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin: () => void;
}

function getRawDate(val: any): Date | null {
  if (!val) return null;
  if (val?.toDate) return val.toDate();
  if (val instanceof Date) return val;
  if (typeof val === 'string' || typeof val === 'number') return new Date(val);
  if (val?.seconds) return new Date(val.seconds * 1000);
  return null;
}

function fmtDateID(date: Date | null): string {
  if (!date) return 'Seumur hidup';
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
}

function getSubscriptionInfo(userProfile: any) {
  const status = (userProfile?.subscriptionStatus || 'inactive').toLowerCase();
  const expiredDate = getRawDate(userProfile?.subscriptionExpiredAt);
  const isExpired = expiredDate ? expiredDate.getTime() < Date.now() : false;

  if (isExpired) {
    return {
      label: 'Kedaluwarsa',
      colorClass: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900',
      detail: `Akses berakhir: ${fmtDateID(expiredDate)}`,
    };
  }
  if (status === 'active') {
    return {
      label: 'Aktif',
      colorClass: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900',
      detail: `Berlaku s.d.: ${fmtDateID(expiredDate)}`,
    };
  }
  if (status === 'trial') {
    return {
      label: 'Masa Trial',
      colorClass: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900',
      detail: `Berlaku s.d.: ${fmtDateID(expiredDate)}`,
    };
  }
  return {
    label: 'Tidak Aktif',
    colorClass: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700',
    detail: 'Belum berlangganan',
  };
}

export default function ProfilePopup({ isOpen, onClose, onOpenAdmin }: ProfilePopupProps) {
  const { user, userProfile, isAdmin, refreshProfile } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  if (!isOpen) return null;

  const displayName = userProfile?.namaLengkap || userProfile?.username || user?.email?.split('@')[0] || 'Pengguna';
  const initial = displayName.trim().charAt(0).toUpperCase() || '?';
  const sub = getSubscriptionInfo(userProfile);
  const emailVerified = user?.emailVerified;

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshProfile();
    } finally {
      setRefreshing(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetSent(true);
      setTimeout(() => setResetSent(false), 4000);
    } catch (err) {
      console.error('Gagal mengirim email reset:', err);
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-end p-4 pt-16 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2 zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-black text-lg shrink-0">
              {initial}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm text-slate-900 dark:text-white truncate">{displayName}</div>
              <div className="text-xs text-slate-400 truncate">@{userProfile?.username || '—'}</div>
              <span className="inline-block mt-1 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 capitalize">
                {userProfile?.role || 'pending'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center gap-1.5 text-xs">
            {emailVerified ? (
              <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <ShieldQuestion className="w-3.5 h-3.5 text-amber-500" />
            )}
            <span className={emailVerified ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-amber-600 dark:text-amber-400 font-semibold'}>
              {emailVerified ? 'Email terverifikasi' : 'Email belum terverifikasi'}
            </span>
          </div>

          <div className={`rounded-xl border p-3 ${sub.colorClass}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider">Status Langganan</span>
              <span className="text-xs font-bold">{sub.label}</span>
            </div>
            <p className="text-[11px] mt-1 opacity-90">{sub.detail}</p>
          </div>

          {resetSent && (
            <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg px-3 py-2">
              Email reset kata sandi telah dikirim.
            </p>
          )}

          <div className="space-y-1.5 pt-1">
            {isAdmin && (
              <button
                onClick={onOpenAdmin}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:bg-indigo-100 dark:hover:bg-indigo-950/50 transition-colors"
              >
                <ShieldCheck className="w-4 h-4" /> Admin Panel
              </button>
            )}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Memeriksa...' : 'Cek Status Akses'}
            </button>
            <button
              onClick={handleResetPassword}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <KeyRound className="w-4 h-4" /> Ganti Kata Sandi
            </button>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-bold text-xs hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors disabled:opacity-60"
            >
              <LogOut className="w-4 h-4" /> {signingOut ? 'Keluar...' : 'Keluar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
