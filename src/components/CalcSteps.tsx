import { ListOrdered, ShieldAlert } from 'lucide-react';

export interface CalcStep {
  /** Label singkat langkah, mis. "Volume total cairan" */
  label: string;
  /** Rumus generik, mis. "Volume = mL/kg/hari × BB" */
  formula: string;
  /** Substitusi angka pasien sesungguhnya, mis. "100 × 1.5 = 150 mL" */
  substitution: string;
  /** Catatan singkat: kenapa faktor/ambang ini dipakai, opsional */
  note?: string;
}

/**
 * Rincian perhitungan langkah-demi-langkah dengan angka pasien
 * tersubstitusi — dipakai konsisten di semua kalkulator dosis/cairan/
 * skoring agar tidak ada kalkulator yang hanya menampilkan "angka jadi"
 * tanpa jembatan ke rumus & rasional klinisnya.
 */
export default function CalcSteps({ steps }: { steps: CalcStep[] }) {
  if (steps.length === 0) return null;
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/40 p-4">
      <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
        <ListOrdered className="w-3.5 h-3.5" /> Rincian Perhitungan
      </span>
      <ol className="space-y-2.5 list-none m-0 p-0">
        {steps.map((s, i) => (
          <li key={i} className="text-xs">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-black text-slate-400 dark:text-slate-500 shrink-0">{i + 1}.</span>
              <span className="font-bold text-slate-700 dark:text-slate-300">{s.label}:</span>
              <span className="text-slate-400 dark:text-slate-500 font-mono">{s.formula}</span>
              <span className="text-slate-300 dark:text-slate-600">→</span>
              <span className="font-mono font-extrabold text-slate-800 dark:text-slate-100">{s.substitution}</span>
            </div>
            {s.note && <p className="text-[10.5px] text-slate-400 dark:text-slate-500 mt-0.5 ml-5">{s.note}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Disclaimer standar wajib untuk semua fitur penghasil dosis/volume/laju.
 */
export function CalcDisclaimer({ text }: { text?: string }) {
  return (
    <p className="flex items-start gap-1.5 text-[10.5px] text-slate-400 dark:text-slate-500 leading-snug">
      <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
      <span>{text ?? 'Alat bantu edukasi/referensi cepat — bukan pengganti penilaian klinis atau keputusan DPJP. Verifikasi ulang sebelum tindakan.'}</span>
    </p>
  );
}
