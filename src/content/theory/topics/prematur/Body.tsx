import { Cite } from '../../TheoryArticle';

export default function Body() {
  return (
    <>
      <p>
        Bayi &lt;35 minggu memerlukan pertimbangan khusus: paru imatur (defisiensi surfaktan), kulit tipis (kehilangan panas), dan risiko IVH lebih tinggi.<Cite n={1} />
      </p>
      <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
        <ul className="space-y-1.5 text-sm list-disc list-inside m-0">
          <li><strong>Termoregulasi &lt;32 mgg:</strong> bungkus plastik polietilen tanpa dikeringkan + topi; target suhu 36,5–37,5°C.<Cite n={2} /></li>
          <li><strong>Oksigen:</strong> mulai 21–30%, titrasi dengan oksimeter pre-duktal.<Cite n={3} /></li>
          <li><strong>Dukungan napas:</strong> utamakan <strong>CPAP dini</strong> (PEEP 5–8) di ruang bersalin bila bernapas spontan — kurangi intubasi &amp; BPD.<Cite n={1} /></li>
          <li><strong>PEEP:</strong> gunakan T-piece resuscitator untuk PIP/PEEP konsisten.<Cite n={1} /></li>
        </ul>
      </div>
      <p className="text-sm mb-0">Strategi "gentle ventilation": VT rendah (4–6 mL/kg), hindari volutrauma &amp; hiperoksia. Lihat kalkulator ventilator untuk setting per tier GA.</p>
    </>
  );
}
