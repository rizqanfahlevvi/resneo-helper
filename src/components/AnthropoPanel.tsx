import { useState } from 'react';
import { useStore } from '../store';

export const ANTHROPO_FIELDS = [
  { key: 'bbl',  label: 'BB Lahir',       unit: 'gram', placeholder: '3200', note: 'Aktual (bukan estimasi)' },
  { key: 'pb',   label: 'Panjang Badan',  unit: 'cm',   placeholder: '50',   note: '' },
  { key: 'lk',   label: 'Lingkar Kepala', unit: 'cm',   placeholder: '34',   note: '' },
  { key: 'ld',   label: 'Lingkar Dada',   unit: 'cm',   placeholder: '33',   note: '' },
  { key: 'lila', label: 'LiLA',           unit: 'cm',   placeholder: '11',   note: 'Lingkar lengan atas' },
] as const;

/**
 * Panel input antropometri neonatus — satu sumber data (useStore.anthropometry)
 * dipakai di TabHome (berdiri sendiri, tanpa perlu masuk alur Resusitasi) dan
 * di TabEmergency (ringkasan/edit cepat saat resusitasi berlangsung).
 */
export default function AnthropoPanel({ setBirthWeight, compact = false, defaultOpen = false }: { setBirthWeight: (v: string) => void; compact?: boolean; defaultOpen?: boolean }) {
  const { anthropometry, setAnthropometry } = useStore();
  const [open, setOpen] = useState(defaultOpen);
  const filled = !!anthropometry.bbl;
  return (
    <div className={`rounded-2xl border overflow-hidden ${compact ? 'border-teal-200 dark:border-teal-500/30 bg-white/60 dark:bg-teal-950/10' : 'border-teal-200 dark:border-teal-500/20 glass-card'}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-colors"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <svg className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-sm font-bold text-teal-800 dark:text-teal-300">Antropometri Neonatus</span>
          {filled
            ? <span className="text-xs bg-teal-500 text-white font-bold px-2 py-0.5 rounded-full flex-shrink-0">BBL: {anthropometry.bbl} g{anthropometry.pb ? ` · PB: ${anthropometry.pb} cm` : ''}</span>
            : <span className="text-xs text-slate-400 dark:text-slate-500 truncate">BBL, PB, LK, LD, LiLA — autofill ke seluruh tab</span>
          }
        </div>
        <svg className={`w-4 h-4 text-teal-500 transition-transform duration-200 flex-shrink-0 ml-2 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-teal-100 dark:border-teal-500/20 px-4 py-4 space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl px-3 py-2">
            Data tersambung ke seluruh kalkulator & skor — bisa diisi di sini kapan saja, tidak perlu membuka Resusitasi. BB Lahir aktual akan memperbarui panduan dosis secara otomatis.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ANTHROPO_FIELDS.map(field => (
              <div key={field.key} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl p-3">
                <label className="block text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">
                  {field.label} <span className="normal-case font-normal">({field.unit})</span>
                </label>
                {field.note && <p className="text-[9px] text-teal-600 dark:text-teal-400 font-semibold mb-1">{field.note}</p>}
                <input
                  type="number"
                  value={anthropometry[field.key]}
                  onChange={(e) => {
                    setAnthropometry({ [field.key]: e.target.value });
                    if (field.key === 'bbl') setBirthWeight(e.target.value);
                  }}
                  placeholder={field.placeholder}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
