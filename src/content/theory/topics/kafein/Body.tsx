import { Cite } from '../../TheoryArticle';

export default function Body() {
  return (
    <>
      <p>
        <strong className="text-slate-800 dark:text-slate-200">Apnea prematuritas</strong> terjadi akibat imaturitas pusat napas batang otak &amp; respons paradoks terhadap hipoksia. Kafein (metilxantin) bekerja sebagai <strong>antagonis reseptor adenosin</strong> — menstimulasi pusat napas, meningkatkan sensitivitas CO₂, tonus diafragma, &amp; ventilasi semenit. Kafein adalah metilxantin pilihan (dibanding teofilin/aminofilin) karena jendela terapeutik lebih lebar, waktu paruh panjang (sekali/hari), &amp; efek samping lebih sedikit.<Cite n={5} />
      </p>

      <div className="bg-violet-50 dark:bg-violet-950/20 border border-violet-200/60 dark:border-violet-800/30 rounded-xl p-4 text-sm">
        <h4 className="font-extrabold text-violet-800 dark:text-violet-300 text-xs uppercase tracking-widest mb-2">Dosis (kafein sitrat)<Cite n={6} /></h4>
        <ul className="space-y-1.5 list-disc list-inside text-violet-700 dark:text-violet-400 m-0">
          <li><strong>Loading:</strong> 20 mg/kg IV (infus 30 menit) atau PO</li>
          <li><strong>Rumatan:</strong> 5–10 mg/kg/hari, mulai 24 jam setelah loading (dosis tunggal harian)</li>
          <li><strong>Refrakter:</strong> rumatan dapat dinaikkan hingga 10 mg/kg (sebagian pusat sampai 20 mg/kg loading) dengan pemantauan takikardia</li>
          <li><em>Catatan:</em> dosis dinyatakan sebagai <strong>kafein sitrat</strong>; kafein basa = ½ dosis sitrat (20 mg sitrat = 10 mg basa)</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-violet-50 dark:bg-violet-950/20 rounded-xl p-4 border border-violet-200/60 dark:border-violet-800/30">
          <h5 className="font-extrabold text-violet-800 dark:text-violet-300 text-[11px] uppercase mb-1.5">Indikasi</h5>
          <ul className="text-[11px] text-violet-700 dark:text-violet-400 leading-snug list-disc list-inside m-0 space-y-1">
            <li>Terapi apnea prematuritas</li>
            <li>Fasilitasi ekstubasi (mulai sebelum ekstubasi)</li>
            <li>Profilaksis pada BBLSR/ELBW berisiko tinggi</li>
          </ul>
        </div>
        <div className="bg-slate-50 dark:bg-slate-950/30 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800/30">
          <h5 className="font-extrabold text-slate-700 dark:text-slate-300 text-[11px] uppercase mb-1.5">Pemantauan & Durasi</h5>
          <ul className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug list-disc list-inside m-0 space-y-1">
            <li>Pantau HR (takikardia), toleransi minum, gelisah</li>
            <li>Kadar serum rutin umumnya tidak perlu</li>
            <li>Hentikan ~34–36 mgg PMA &amp; bebas apnea 5–7 hari</li>
          </ul>
        </div>
      </div>

      <p className="text-sm">
        <strong>Bukti (CAP trial):</strong> kafein menurunkan insidens BPD, durasi ventilasi &amp; ketergantungan oksigen, serta PDA yang memerlukan terapi.<Cite n={[1, 4]} /> Pada usia 18–21 bulan menurunkan kematian/disabilitas neurodevelopmental &amp; cerebral palsy.<Cite n={2} /> Manfaat keselamatan bertahan hingga usia 5 tahun.<Cite n={3} />
      </p>
      <p className="border-l-4 border-violet-300 dark:border-violet-700 pl-4 py-1 text-sm font-medium italic bg-violet-50/50 dark:bg-violet-950/10 rounded-r-lg mb-0">
        <strong>Inisiasi dini</strong> (dalam 24–72 jam pertama, khususnya &lt;29 minggu) dikaitkan dengan luaran respirasi lebih baik dibanding inisiasi lambat.<Cite n={4} />
      </p>
    </>
  );
}
