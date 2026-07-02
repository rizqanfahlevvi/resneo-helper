import { useState, FormEvent } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Baby, User, AtSign, Mail, Lock, Loader2, CheckCircle2, MessageCircle } from 'lucide-react';
import { auth, db } from '../lib/firebase';

interface SignUpPageProps {
  onGoToLogin: () => void;
}

function mapFirebaseError(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Email ini sudah terdaftar. Silakan masuk.';
    case 'auth/invalid-email':
      return 'Format email tidak valid.';
    case 'auth/weak-password':
      return 'Kata sandi terlalu lemah (minimal 6 karakter).';
    case 'auth/network-request-failed':
      return 'Koneksi internet bermasalah.';
    default:
      return 'Terjadi kesalahan. Silakan coba lagi.';
  }
}

export default function SignUpPage({ onGoToLogin }: SignUpPageProps) {
  const [namaLengkap, setNamaLengkap] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const waLink = `https://wa.me/6287749076019?text=${encodeURIComponent(
    `Hai dok, saya sudah daftar ResNeo Helper MD Kit, username saya ${username}`
  )}`;

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (password.length < 6) {
      setError('Kata sandi minimal 6 karakter.');
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(cred.user, { displayName: namaLengkap });

      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        email: cred.user.email,
        username,
        namaLengkap,
        role: 'pending',
        verificationStatus: 'unverified',
        isAdmin: false,
        subscriptionStatus: 'inactive',
        subscriptionPlan: null,
        subscriptionExpiredAt: null,
        profileCompleted: false,
        googleFormSubmitted: false,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });

      setSuccess(true);
    } catch (err: any) {
      setError(mapFirebaseError(err?.code || ''));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-[#0B132B] dark:via-slate-950 dark:to-[#0B132B] p-4">
        <div className="w-full max-w-sm bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 mb-4">
            <CheckCircle2 className="w-9 h-9 text-emerald-500" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            Akun Anda sudah dibuat. Untuk mengaktifkan langganan, silakan konfirmasi via WhatsApp.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-all shadow-sm mb-3"
          >
            <MessageCircle className="w-4 h-4" /> Konfirmasi via WhatsApp
          </a>
          <button onClick={onGoToLogin} className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline">
            Kembali ke Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-[#0B132B] dark:via-slate-950 dark:to-[#0B132B] p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg shadow-teal-500/30 mb-4">
            <Baby className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">ResNeo Helper</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Ur Daily Neonatal Emergency Companion</p>
        </div>

        <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Buat Akun Baru</h2>

          {error && (
            <div className="mb-4 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl px-3 py-2.5">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-3">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-1.5 tracking-wider">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={namaLengkap}
                  onChange={e => setNamaLengkap(e.target.value)}
                  placeholder="dr. Nama Lengkap"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-1.5 tracking-wider">Username</label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value.replace(/\s/g, '').toLowerCase())}
                  placeholder="username"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-1.5 tracking-wider">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-1.5 tracking-wider">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-1.5 tracking-wider">Konfirmasi Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-600 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm disabled:opacity-60 mt-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Memproses...' : 'Daftar'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-5">
            Sudah punya akun?{' '}
            <button onClick={onGoToLogin} className="font-bold text-teal-600 dark:text-teal-400 hover:underline">
              Masuk di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
