import TocNav from '../../TocNav';

export default function Body() {
  return (
    <>
      <TocNav
        items={[
          { id: 'v3-o2', label: '3.1 Oksigen Konvensional' },
          { id: 'v3-hfnc', label: '3.2 HFNC (High Flow Nasal Cannula)' },
          { id: 'v3-cpap', label: '3.3 CPAP/nCPAP' },
          { id: 'v3-nippv', label: '3.4 NIPPV/nIPPV' },
          { id: 'v3-bipap', label: '3.5 BiPAP/N-BiPAP' },
          { id: 'v3-nhfov', label: '3.6 NHFOV' },
          { id: 'v3-gagal', label: '3.7 Kegagalan NIV — Kapan Harus Intubasi' },
        ]}
      />

      <h3 id="v3-o2" className="scroll-mt-4">3.1 Oksigen Konvensional (Nasal Kanul, Head Box, Sungkup)</h3>
      <p>Merupakan level support paling dasar, hanya menyediakan tambahan FiO₂ tanpa dukungan tekanan positif signifikan atau dukungan usaha napas.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Alat</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">FiO₂ Tercapai (Perkiraan)</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Catatan</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Nasal kanul standar (low-flow)', '21–40%', 'Flow terbatas (~0,25–2 L/menit bayi; hingga 4–6 L/menit anak besar); FiO₂ tidak presisi karena tercampur udara ruangan'],
              ['Head box/oxygen hood', 'Hingga ~80–90% jika sistem tertutup baik', 'Umum untuk neonatus; FiO₂ perlu dianalisa dengan oxygen analyzer di dalam box'],
              ['Sungkup sederhana/NRM', '60–95% dengan reservoir bag adekuat', 'Kurang nyaman untuk neonatus/bayi kecil, lebih untuk anak lebih besar'],
            ].map(([a, f, c], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{a}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{f}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-0">
        <strong>Prinsip umum:</strong> semua modalitas ini tidak memberikan dukungan tekanan positif untuk membuka alveolus kolaps atau menurunkan kerja napas — jika pasien masih menunjukkan tanda kerja napas berat meski FiO₂ dinaikkan, ini indikasi eskalasi ke modalitas berikutnya, bukan menaikkan oksigen lebih tinggi lagi.
      </p>

      <h3 id="v3-hfnc" className="scroll-mt-4">3.2 HFNC (High Flow Nasal Cannula)</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">3.2.1 Mekanisme Kerja</h4>
      <p>
        HFNC bukan sekadar &quot;nasal kanul dengan flow tinggi&quot; — mekanismenya kompleks dan sering diringkas mnemonic <strong>HIFLOW</strong>: Heated and humidified, meets Inspiratory demands, increases Functional residual capacity (FRC), Lighter (weight of breathing berkurang), minimizes Oxygen dilution, dan Washout of pharyngeal dead space. Gas dipanaskan hingga 37°C dengan kelembapan relatif 100%, dan dapat mengantarkan FiO₂ 0,21 hingga 1,00 pada flow rate hingga 60 L/menit, dengan flow rate dan FiO₂ yang dapat dititrasi secara independen sesuai kebutuhan pasien.
      </p>
      <p>
        HFNC menggunakan kanul nasal yang disesuaikan ukuran nares bayi untuk mengantarkan gas hangat-lembap pada flow tinggi, yang berhubungan dengan perbaikan washout ruang rugi nasofaring, klirens mukosiliar paru, dan pengantaran oksigen dibanding sistem pengantaran oksigen lain. HFNC juga dapat menciptakan tekanan faring positif untuk mengurangi kerja napas, memposisikan alat ini di antara sistem pengantaran oksigen klasik dan continuous positive airway pressure (CPAP). Penting dicatat: <strong>HFNC membangun PEEP namun tanpa kemampuan monitoring kontinu terhadap tekanan tersebut</strong>, sehingga komplikasi terkait tekanan tetap menjadi risiko.
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">3.2.2 Indikasi</h4>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Neonatal:</strong> alternatif kurang invasif dibanding nCPAP untuk bayi prematur/neonatus.</li>
        <li><strong>Pediatrik:</strong> indikasi utama adalah bronkiolitis, dengan indikasi lain yang sedang diteliti termasuk asma, croup, pneumonia, transport pasien kritis, dan pasca-ekstubasi.</li>
        <li>Pengalaman di neonatologi dan ICU dewasa memperluas indikasi pediatrik meliputi weaning dari ventilasi invasif dan asma akut.</li>
      </ul>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">3.2.3 Keterbatasan dan Kewaspadaan</h4>
      <p>
        Meski HFNC diterima luas sebagai prosedur non-invasif, tetap ada potensi efek samping berat, sehingga penggunaannya harus dimonitor secara kontinu dan ketat dalam unit perawatan intensif atau intermediate. Komplikasi yang dilaporkan termasuk risiko pneumotoraks pada penggunaan flow tinggi tanpa monitoring tekanan yang adekuat.
      </p>
      <p className="border-l-4 border-sky-300 dark:border-sky-700 pl-4 py-1 text-sm font-medium italic bg-sky-50/50 dark:bg-sky-950/10 rounded-r-lg mb-0">
        HFNC memberi kenyamanan lebih dibanding CPAP (tanpa perlu sealing masker/prong ketat) namun <strong>tekanan yang dihasilkan tidak terukur dan tidak konsisten</strong> — jangan menganggapnya setara CPAP dalam hal kepastian PEEP yang diberikan.
      </p>

      <h3 id="v3-cpap" className="scroll-mt-4">3.3 CPAP/nCPAP</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">3.3.1 Mekanisme dan Prinsip</h4>
      <p>CPAP memberikan tekanan positif kontinu sepanjang siklus napas (inspirasi dan ekspirasi), mempertahankan alveolus tetap terbuka (mencegah atelektasis siklik) dan meningkatkan FRC — mekanisme inti dari prinsip lung-protective (Bab 1).</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">3.3.2 Indikasi Umum</h4>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Respiratory Distress Syndrome (RDS) neonatal — lini pertama pada banyak protokol modern, seringkali <strong>menggantikan</strong> intubasi dini.</li>
        <li>Apnea prematuritas (efek splinting jalan napas atas).</li>
        <li>Post-ekstubasi (mengurangi risiko atelektasis dan kegagalan ekstubasi).</li>
        <li>Edema paru kardiogenik (Bab 2.3).</li>
      </ul>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">3.3.3 Kontraindikasi Relatif</h4>
      <ul className="list-disc list-inside space-y-1 text-sm mb-0">
        <li>Obstruksi jalan napas atas berat yang tidak teratasi dengan tekanan positif.</li>
        <li>Fistula trakeoesofageal tak terkoreksi.</li>
        <li>Ketidakstabilan hemodinamik berat tak terkontrol.</li>
        <li>Distensi abdomen berat/obstruksi usus (risiko aspirasi, distensi lambung).</li>
      </ul>

      <h3 id="v3-nippv" className="scroll-mt-4">3.4 NIPPV/nIPPV (Nasal Intermittent Positive Pressure Ventilation)</h3>
      <p>NIPPV menambahkan siklus tekanan inspirasi tambahan di atas baseline CPAP — pada dasarnya &quot;CPAP plus breath tambahan periodik&quot; — memberikan dukungan ventilasi tambahan dibanding CPAP murni.</p>
      <p className="mb-0">
        Dibanding NCPAP, NIPPV terbukti menurunkan insidensi intubasi neonatal pada RDS (risk ratio 0,57; 95% CI 0,46–0,71), menurunkan insidensi BPD (RR 0,72; 95% CI 0,57–0,91), dan menurunkan angka mortalitas neonatal pada RDS (RR 0,55; 95% CI 0,31–0,97) berdasarkan meta-analisis 10 studi dengan total 1.104 pasien.
      </p>

      <h3 id="v3-bipap" className="scroll-mt-4">3.5 BiPAP/N-BiPAP</h3>
      <p className="mb-0">Memberikan dua level tekanan positif (tinggi dan rendah) secara bergantian, mirip prinsip NIPPV namun dengan kontrol level tekanan yang lebih eksplisit di kedua fase. Dalam konteks neonatal disebut <strong>N-BiPAP</strong>.</p>

      <h3 id="v3-nhfov" className="scroll-mt-4">3.6 NHFOV (Non-Invasive High-Frequency Oscillatory Ventilation)</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">3.6.1 Konsep</h4>
      <p>NHFOV adalah pendekatan yang lebih baru yang menggabungkan keunggulan high-frequency oscillatory ventilation (HFOV) dengan nasal CPAP — memberikan osilasi frekuensi tinggi di atas baseline CPAP tanpa memerlukan jalan napas invasif.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">3.6.2 Evidence Terkini (2024–2025)</h4>
      <p>
        Berdasarkan network meta-analysis 23 RCT (2.331 neonatus) yang membandingkan NCPAP, NIPPV, N-BiPAP, dan NHFOV sebagai dukungan pasca-ekstubasi pada NRDS: NHFOV, NIPPV, dan N-BiPAP secara signifikan lebih efektif dibanding NCPAP dalam menurunkan risiko reintubasi, dengan NHFOV sebagai yang paling efektif; untuk klirens CO₂, NHFOV mengungguli NIPPV dan NCPAP; NHFOV dan NIPPV juga menunjukkan keunggulan signifikan dalam menurunkan insidensi BPD dibanding NCPAP.
      </p>
      <p>
        Sebagai dukungan <strong>awal</strong> (bukan hanya pasca-ekstubasi), sebuah meta-analisis 5 RCT (912 bayi prematur) juga menemukan NHFOV secara signifikan menurunkan angka intubasi endotrakeal dibanding NCPAP (RR 0,51; 95% CI 0,37–0,68).
      </p>
      <p>
        Tidak ditemukan perbedaan bermakna antar modalitas dalam hal cedera nasal, air leak, perdarahan intraventrikular, atau mortalitas — menunjukkan profil keamanan yang sebanding antar modalitas NIV ini.
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">3.6.3 Catatan Praktis</h4>
      <p className="mb-0">NHFOV adalah teknologi yang relatif baru dan tidak tersedia di semua ventilator — ketersediaannya bergantung pada fitur perangkat (Bab 5).</p>

      <h3 id="v3-gagal" className="scroll-mt-4">3.7 Kegagalan NIV — Kapan Harus Intubasi</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">3.7.1 Prinsip Umum</h4>
      <p>
        NIV bukan tanpa batas — penundaan intubasi pada pasien yang sesungguhnya sudah gagal NIV berisiko memperburuk outcome (kelelahan otot napas, aspirasi, hipoksia berkepanjangan). Tanda-tanda kegagalan NIV yang menjadi indikasi eskalasi ke ventilasi invasif meliputi:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kategori</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Tanda Kegagalan</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Respiratorik', 'FiO₂ kebutuhan terus meningkat meski support NIV optimal; asidosis respiratorik memburuk (pH turun, PaCO₂ naik progresif); apnea berulang/signifikan tak respons terhadap NIV'],
              ['Klinis', 'Kerja napas tetap berat/memburuk meski sudah pada level NIV maksimal; kelelahan napas progresif (penurunan usaha napas yang sebelumnya kuat — tanda bahaya, bukan perbaikan)'],
              ['Hemodinamik', 'Instabilitas hemodinamik yang tidak membaik atau memburuk'],
              ['Kesadaran', 'Penurunan kesadaran yang mengancam proteksi jalan napas'],
              ['Toleransi alat', 'Ketidakcocokan sungkup/prong yang tidak teratasi, agitasi berat yang membahayakan'],
            ].map(([k, t], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">3.7.2 Prinsip Keputusan Klinis</h4>
      <ul className="list-disc list-inside space-y-1 text-sm mb-0">
        <li>Evaluasi respons NIV dilakukan dalam <strong>jendela waktu terbatas</strong> (umumnya dalam 1–2 jam pertama pada kondisi akut) — bukan menunggu berjam-jam tanpa perbaikan.</li>
        <li><strong>Trend lebih penting dari angka tunggal</strong> — pasien yang terus memburuk meski parameter belum &quot;sangat buruk&quot; tetap kandidat eskalasi lebih awal.</li>
        <li>Pada neonatus dengan RDS berat atau kebutuhan FiO₂ tinggi persisten meski NCPAP/NIPPV optimal, pertimbangan <strong>surfaktan + intubasi</strong> (atau strategi LISA/MIST bila tersedia) menjadi bagian dari algoritma, bukan semata &quot;NIV gagal → intubasi&quot;.</li>
      </ul>
    </>
  );
}
