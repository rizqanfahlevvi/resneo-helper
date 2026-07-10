import { Cite } from '../../TheoryArticle';

export default function Body() {
  return (
    <>
      <p>Bila dada tidak mengembang selama VTP awal, lakukan koreksi berurutan MR. SOPA sebelum menyimpulkan VTP gagal.<Cite n={1} /></p>
      <div className="flex flex-col gap-2">
        {[
          { l: 'M', word: 'Mask Adjustment', t: 'Perbaiki perlekatan sungkup agar tidak bocor.' },
          { l: 'R', word: 'Reposition Airway', t: 'Posisi kepala menghidu (sniffing position).' },
          { l: 'S', word: 'Suction', t: 'Isap mulut lalu hidung (M before N).' },
          { l: 'O', word: 'Open Mouth', t: 'Buka sedikit mulut bayi saat ventilasi.' },
          { l: 'P', word: 'Pressure Increase', t: 'Naikkan PIP bertahap hingga dada mengembang (maks ~40 cmH₂O).' },
          { l: 'A', word: 'Airway Alternative', t: 'Pertimbangkan intubasi ETT atau LMA.' },
        ].map((s, i) => (
          <div key={i} className="flex gap-3 bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-lg w-5 text-center shrink-0">{s.l}</span>
            <div>
              <h5 className="font-bold text-[11px] text-slate-800 dark:text-slate-200 m-0">{s.word}</h5>
              <p className="text-[10px] text-slate-500 m-0">{s.t}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs italic text-slate-500 mb-0">Dua langkah pertama (M, R) paling sering memperbaiki ventilasi; setelah S-O-P selalu evaluasi ulang gerak dada &amp; LDJ.<Cite n={1} /></p>
    </>
  );
}
