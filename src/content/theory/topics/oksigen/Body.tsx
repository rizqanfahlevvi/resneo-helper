import { Cite } from '../../TheoryArticle';

export default function Body() {
  return (
    <>
      <p>
        Pemberian oksigen harus <strong className="text-slate-800 dark:text-slate-200">berbasis target SpO₂ pre-duktal</strong>, bukan intuisi. Oksigen 100% rutin tidak direkomendasikan karena risiko stres oksidatif, ROP, dan cedera otak.<Cite n={1} />
      </p>
      <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/30 rounded-xl p-4">
        <h4 className="font-extrabold text-sky-800 dark:text-sky-300 text-xs uppercase tracking-widest mb-3">Target SpO₂ Pre-Duktal (Tangan Kanan) — NRP 2021</h4>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {[['1 mnt', '60–65%'], ['2 mnt', '65–70%'], ['3 mnt', '70–75%'], ['4 mnt', '75–80%'], ['5 mnt', '80–85%'], ['10 mnt', '85–95%']].map(([t, v]) => (
            <div key={t} className="bg-white dark:bg-sky-900/30 rounded-lg p-2 text-center border border-sky-100 dark:border-sky-800/30">
              <span className="block text-[9px] font-bold text-sky-500 uppercase">{t}</span>
              <span className="block text-xs font-extrabold text-sky-700 dark:text-sky-300 mt-0.5">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 border border-slate-100 dark:border-slate-800 text-sm">
          <strong className="text-slate-800 dark:text-slate-200">Bayi ≥35 minggu:</strong>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-0">Mulai <strong>21% O₂</strong>; naikkan FiO₂ bila SpO₂ tak mencapai target.<Cite n={1} /></p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 border border-slate-100 dark:border-slate-800 text-sm">
          <strong className="text-slate-800 dark:text-slate-200">Bayi &lt;35 minggu:</strong>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-0">Mulai <strong>21–30% O₂</strong> dengan blender; hindari hiperoksia (ROP).<Cite n={[2, 3]} /></p>
        </div>
      </div>
      <p className="border-l-4 border-sky-300 dark:border-sky-700 pl-4 py-1 text-sm font-medium italic bg-sky-50/50 dark:bg-sky-950/10 rounded-r-lg">
        Pasang oksimeter di <strong>tangan/pergelangan kanan</strong> (pre-duktal). Probe di kaki (post-duktal) bisa memberi nilai rendah palsu saat ada pirau kanan-ke-kiri.<Cite n={1} />
      </p>
    </>
  );
}
