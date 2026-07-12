import { useState } from 'react';
import { CheckCircle2, ClipboardCheck } from 'lucide-react';
import { useStore } from '../store';

/**
 * Tombol konfirmasi untuk kalkulator dosis/volume/laju — BERBEDA dari
 * CalcTrigger (skoring): di sini hasil TETAP tampil realtime (bukan
 * digerbang di balik tombol) karena menyembunyikan angka dosis sampai
 * tombol ditekan berisiko klinis (nakes perlu lihat dosis begitu BB
 * selesai diketik, bukan setelah klik tambahan). Tombol ini hanya
 * menandai "sudah dihitung & dicatat" dengan mencatat ringkasan hasil
 * ke Log Klinis (clinicalLog) sebagai jejak audit.
 */
export default function CalcConfirmLog({ summary, disabled }: { summary: string; disabled?: boolean }) {
  const addLog = useStore((s) => s.addLog);
  const [justLogged, setJustLogged] = useState(false);

  return (
    <button
      onClick={() => {
        addLog(0, summary);
        setJustLogged(true);
        setTimeout(() => setJustLogged(false), 2000);
      }}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 disabled:opacity-40 disabled:cursor-not-allowed text-indigo-600 dark:text-indigo-400 font-bold text-xs transition-colors"
    >
      {justLogged ? <CheckCircle2 className="w-4 h-4" /> : <ClipboardCheck className="w-4 h-4" />}
      {justLogged ? 'Tercatat ke Log Klinis' : 'Tandai Sudah Dihitung & Catat'}
    </button>
  );
}
