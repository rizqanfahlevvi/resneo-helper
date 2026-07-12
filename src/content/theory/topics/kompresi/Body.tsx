import { Cite } from '../../TheoryArticle';

export default function Body() {
  return (
    <>
      <p>
        Kompresi diindikasikan bila <strong className="text-rose-600 dark:text-rose-400">LDJ &lt;60 x/menit</strong> setelah 30 detik VTP adekuat (dada mengembang) dengan O₂ 100%. Pastikan ventilasi benar-benar efektif dulu.<Cite n={1} />
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-rose-50 dark:bg-rose-950/20 rounded-xl p-4 border border-rose-200/60 dark:border-rose-800/30">
          <h4 className="font-extrabold text-rose-800 dark:text-rose-300 text-xs uppercase mb-2">Teknik Ibu Jari Melingkar ⭐</h4>
          <p className="text-xs text-rose-700 dark:text-rose-400 leading-snug mb-0">Kedua ibu jari di <strong>⅓ bawah sternum</strong>, jari melingkari dada. Perfusi koroner lebih tinggi — teknik pilihan NRP.<Cite n={[1, 3]} /></p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-950/30 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800/30">
          <h4 className="font-extrabold text-slate-700 dark:text-slate-300 text-xs uppercase mb-2">Teknik 2 Jari (Alternatif)</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug mb-0">Dipakai bila akses umbilikal dibutuhkan bersamaan; jari tengah &amp; telunjuk di ⅓ bawah sternum.<Cite n={1} /></p>
        </div>
      </div>
      <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
        <ul className="space-y-2 text-sm list-none m-0 p-0">
          <li><strong className="text-slate-800 dark:text-slate-200">Rasio:</strong> <span className="text-rose-600 dark:text-rose-400 font-extrabold">3 kompresi : 1 ventilasi</span> (berbeda dari 30:2 dewasa)<Cite n={1} /></li>
          <li><strong className="text-slate-800 dark:text-slate-200">Kecepatan:</strong> 90 kompresi + 30 ventilasi = <strong>120 events/menit</strong></li>
          <li><strong className="text-slate-800 dark:text-slate-200">Ritme:</strong> <em>"satu–dua–tiga–napas"</em> tiap ~2 detik</li>
          <li><strong className="text-slate-800 dark:text-slate-200">Kedalaman:</strong> ⅓ diameter antero-posterior dada</li>
          <li><strong className="text-slate-800 dark:text-slate-200">Evaluasi LDJ:</strong> tiap 45–60 detik; hentikan kompresi bila LDJ &gt;60.<Cite n={2} /></li>
        </ul>
      </div>
      <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl p-4 border border-amber-200/60 dark:border-amber-800/30">
        <h4 className="font-extrabold text-amber-800 dark:text-amber-300 text-xs uppercase mb-2">Kapan Rasio 3:1 TIDAK Berlaku</h4>
        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed mb-0">
          Rasio 3:1 ini spesifik untuk periode <strong>"newly born"</strong> — resusitasi transisi fetal-neonatal di kamar bersalin/ruang tindakan segera pasca-lahir, di mana etiologi arrest hampir selalu asfiksia/respiratory sehingga strategi menitikberatkan ventilasi.<Cite n={4} /> Untuk neonatus yang sudah stabil pasca-lahir lalu mengalami cardiac arrest di kemudian hari (mis. di NICU akibat sepsis lanjut atau penyebab kardiak), gunakan algoritma PALS infant (15:2 dua penolong / 30:2 satu penolong) — bukan rasio NRP ini. Pembeda utamanya adalah <strong>konteks resusitasi</strong> (transisi kelahiran vs sudah <em>established</em> postnatal), bukan semata usia kronologis.
        </p>
      </div>
    </>
  );
}
