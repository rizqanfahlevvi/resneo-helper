import React from 'react';
import { BookMarked, ExternalLink, Star } from 'lucide-react';
import { TheoryReference } from './types';

interface Accent {
  icon: string;
  badge: string;
  refBox: string;
}

const ACCENTS: Record<string, Accent> = {
  indigo: { icon: 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400', badge: 'text-indigo-500', refBox: 'border-indigo-200/60 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/10' },
  orange: { icon: 'bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400', badge: 'text-orange-500', refBox: 'border-orange-200/60 dark:border-orange-900/40 bg-orange-50/40 dark:bg-orange-950/10' },
  rose: { icon: 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400', badge: 'text-rose-500', refBox: 'border-rose-200/60 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/10' },
  emerald: { icon: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400', badge: 'text-emerald-500', refBox: 'border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/10' },
  sky: { icon: 'bg-sky-100 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400', badge: 'text-sky-500', refBox: 'border-sky-200/60 dark:border-sky-900/40 bg-sky-50/40 dark:bg-sky-950/10' },
  amber: { icon: 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400', badge: 'text-amber-500', refBox: 'border-amber-200/60 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/10' },
  violet: { icon: 'bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400', badge: 'text-violet-500', refBox: 'border-violet-200/60 dark:border-violet-900/40 bg-violet-50/40 dark:bg-violet-950/10' },
  cyan: { icon: 'bg-cyan-100 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400', badge: 'text-cyan-500', refBox: 'border-cyan-200/60 dark:border-cyan-900/40 bg-cyan-50/40 dark:bg-cyan-950/10' },
  teal: { icon: 'bg-teal-100 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400', badge: 'text-teal-500', refBox: 'border-teal-200/60 dark:border-teal-900/40 bg-teal-50/40 dark:bg-teal-950/10' },
};

/**
 * Sitasi inline — tampil sebagai superskrip [n] yang merujuk ke nomor di
 * kotak "Referensi & Evidence" pada bagian yang sama. Nomor di-reset per bagian.
 */
export function Cite({ n }: { n: number | number[] }) {
  const arr = Array.isArray(n) ? n : [n];
  return (
    <sup className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 ml-px align-super cursor-default">
      [{arr.join(',')}]
    </sup>
  );
}

/**
 * Tampilan detail satu topik — selalu terbuka penuh (bukan accordion),
 * dipakai di layar detail TabTheory agar hanya satu topik yang dirender
 * pada satu waktu (menghindari tumpukan konten yang menutupi layar).
 */
export default function TheoryArticle({
  icon: Icon,
  accent = 'indigo',
  title,
  badge,
  favorite,
  onToggleFavorite,
  children,
  refs,
}: {
  icon: React.ComponentType<{ className?: string }>;
  accent?: string;
  title: string;
  badge?: string;
  favorite?: boolean;
  onToggleFavorite?: () => void;
  children: React.ReactNode;
  refs?: TheoryReference[];
}) {
  const a = ACCENTS[accent] ?? ACCENTS.indigo;
  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-200/30 dark:shadow-none overflow-hidden">
      <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800">
        <div className={`p-2.5 rounded-xl shrink-0 ${a.icon}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">{title}</h2>
          {badge && <span className={`block text-[10px] font-bold uppercase tracking-widest mt-0.5 ${a.badge}`}>{badge}</span>}
        </div>
        {onToggleFavorite && (
          <button
            type="button"
            aria-label={favorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
            onClick={onToggleFavorite}
            className={`shrink-0 p-1.5 rounded-lg transition-colors ${favorite ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600 hover:text-amber-400'}`}
          >
            <Star className="w-5 h-5" fill={favorite ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <div className="px-4 sm:px-6 py-5">
        <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
          {children}
        </div>

        {refs && refs.length > 0 && (
          <div className={`mt-5 rounded-xl border p-4 ${a.refBox}`}>
            <span className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2.5">
              <BookMarked className="w-3.5 h-3.5" /> Referensi &amp; Evidence
            </span>
            <ol className="space-y-2 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed list-none m-0 p-0">
              {refs.map((r) => (
                <li key={r.n} className="flex gap-2">
                  <span className="font-bold text-slate-400 dark:text-slate-500 shrink-0">[{r.n}]</span>
                  <span className="min-w-0">
                    {r.text}
                    {r.link && (
                      <a href={r.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 ml-1 text-indigo-500 hover:underline font-semibold">
                        tautan <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
