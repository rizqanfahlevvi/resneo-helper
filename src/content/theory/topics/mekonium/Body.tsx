import { Cite } from '../../TheoryArticle';

export default function Body() {
  return (
    <>
      <p>
        <strong>Meconium Stained Amniotic Fluid (MSAF)</strong> terjadi pada ~10–15% persalinan. NRP 2021 menegaskan: <strong className="text-amber-700 dark:text-amber-400">suction trakea rutin tidak lagi direkomendasikan</strong> untuk semua bayi MSAF.<Cite n={1} />
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-4 border border-emerald-200/60 dark:border-emerald-800/30">
          <h4 className="font-extrabold text-emerald-800 dark:text-emerald-300 text-xs uppercase mb-2">✓ Bayi BUGAR (VIGOROUS)</h4>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-snug mb-0">Menangis kuat, tonus baik, LDJ &gt;100. <strong>Perawatan rutin</strong> — tanpa laringoskopi/suction trakea.<Cite n={1} /></p>
        </div>
        <div className="bg-rose-50 dark:bg-rose-950/20 rounded-xl p-4 border border-rose-200/60 dark:border-rose-800/30">
          <h4 className="font-extrabold text-rose-800 dark:text-rose-300 text-xs uppercase mb-2">⚠ Bayi TIDAK BUGAR</h4>
          <p className="text-xs text-rose-700 dark:text-rose-400 leading-snug mb-0">Tonus lemah/apnu, LDJ &lt;100. Prioritaskan <strong>VTP</strong>; laringoskopi + suction hanya bila ada obstruksi jalan napas jelas.<Cite n={[1, 2]} /></p>
        </div>
      </div>
      <p className="text-sm mb-0">Indikasi intervensi adalah <strong>obstruksi jalan napas</strong>, bukan sekadar keberadaan mekonium. RCT tidak menunjukkan manfaat suction trakea rutin pada bayi tidak bugar.<Cite n={2} /></p>
    </>
  );
}
