import TocNav from '../../TocNav';

export default function Body() {
  return (
    <>
      <TocNav
        items={[
          { id: 'v10-kriteria', label: '10.1 Kriteria Kesiapan Weaning' },
          { id: 'v10-strategi', label: '10.2 Strategi Weaning: SIMV Taper vs PSV vs Protokol' },
          { id: 'v10-sbt', label: '10.3 Spontaneous Breathing Trial (SBT)' },
          { id: 'v10-prediktor', label: '10.4 Prediktor Keberhasilan Ekstubasi' },
          { id: 'v10-persiapan', label: '10.5 Persiapan dan Teknik Ekstubasi' },
          { id: 'v10-pascaekstubasi', label: '10.6 Dukungan Pasca-Ekstubasi' },
          { id: 'v10-kegagalan', label: '10.7 Kegagalan Ekstubasi & Reintubasi' },
        ]}
      />

      <h3 id="v10-kriteria" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">10.1 Kriteria Kesiapan Weaning</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.1.1 Prinsip Umum</h4>
      <p>Weaning bukan sekadar &quot;menurunkan angka&quot; — merupakan proses evaluasi berkelanjutan terhadap kesiapan fisiologis pasien untuk mengambil alih kembali kerja napas sepenuhnya. Kesiapan weaning idealnya dievaluasi <strong>setiap hari</strong> (bahkan lebih sering pada kasus akut), bukan menunggu &quot;hari tertentu&quot; secara kaku.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.1.2 Indikator Kesiapan Umum</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Domain</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Indikator Kesiapan</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Penyakit dasar', 'Proses akut yang mendasari intubasi menunjukkan perbaikan/stabil'],
              ['Oksigenasi', 'FiO₂ rendah (mendekati batas non-toksik), PEEP sudah diturunkan mendekati level fisiologis'],
              ['Ventilasi', 'Rate mandatory sudah dapat diturunkan tanpa retensi CO₂ signifikan'],
              ['Hemodinamik', 'Stabil tanpa eskalasi vasopressor/inotropik yang sedang berlangsung'],
              ['Neurologis', 'Kesadaran adekuat untuk melindungi jalan napas, refleks batuk/muntah ada'],
              ['Sekresi', 'Jumlah dan viskositas sekresi jalan napas dapat dikelola pasien pasca-ekstubasi'],
            ].map(([d, k], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{d}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{k}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.1.3 Kompleksitas Spesifik Populasi Pediatrik vs Neonatal</h4>
      <p>
        Manajemen anak terintubasi di PICU lebih kompleks dibanding dewasa karena perbedaan anatomi jalan napas dan paru; anak menghadapi risiko komplikasi lebih tinggi, dan usia yang lebih muda adalah faktor risiko yang diakui untuk kegagalan ekstubasi. Rentang profil fisiologis yang luas serta kondisi medis dan bedah dasar yang beragam, ditambah heterogenitas penyakit respirasi pediatrik, membuat prediksi dan tata laksana gagal napas menjadi sangat menantang.
      </p>
      <p className="border-l-4 border-teal-300 dark:border-teal-700 pl-4 py-1 text-sm font-medium italic bg-teal-50/50 dark:bg-teal-950/10 rounded-r-lg mb-0">
        <strong>Perbedaan penting neonatal:</strong> akibat fisiologi neonatal, uji napas spontan (spontaneous breathing test) kurang prediktif, karena kegagalan ekstubasi pada neonatus sering dipengaruhi faktor tambahan yang tidak tertangkap SBT konvensional (mis. apnea prematuritas, kelelahan otot napas yang berkembang lebih lambat setelah ekstubasi).
      </p>

      <h3 id="v10-strategi" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">10.2 Strategi Weaning: SIMV Taper vs PSV vs Protokol Terstruktur</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.2.1 Pendekatan Klasik</h4>
      <ul className="list-disc list-inside space-y-1.5 text-sm">
        <li><strong>SIMV taper:</strong> menurunkan rate mandatory secara bertahap, memberi ruang lebih besar untuk napas spontan pasien, dengan rate sebagai &quot;jaring pengaman&quot; yang terus dikurangi.</li>
        <li><strong>PSV progresif:</strong> menurunkan level pressure support secara bertahap sambil memantau kerja napas dan Vt spontan pasien yang dihasilkan.</li>
        <li><strong>Kombinasi (SIMV+PSV) bertahap:</strong> menurunkan kedua komponen secara paralel — pendekatan paling umum di praktik klinis.</li>
      </ul>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.2.2 Evidence Protokol Terstruktur vs Weaning Berbasis Judgment Klinisi</h4>
      <p>Pendekatan berbasis protokol untuk weaning ventilasi berpotensi bermanfaat dalam membantu dokter selama proses weaning, namun pada pediatrik, perbedaan outcome yang signifikan secara klinis terkait penggunaannya belum terbukti jelas.</p>
      <p>
        Sebuah tinjauan sistematis RCT terbaru (2025) terhadap 7 uji klinis (n=11.742) menemukan: durasi ventilasi mekanik invasif lebih singkat dengan protokol weaning (perbedaan rata-rata -1,2 jam; bukti kepastian sedang; 1 uji, n=260) dan dengan protokol weaning otomatis berbasis komputer (perbedaan rata-rata -2,33 jam; 1 uji) dibanding weaning berbasis judgment klinisi konvensional.
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.2.3 SANDWICH Trial: Bundle Sedasi + Weaning Ventilator</h4>
      <p>
        SANDWICH trial adalah uji klinis stepped-wedge cluster-randomized terhadap protokol sedasi dan pembebasan ventilator, dilakukan 2018–2019. Intervensi menghasilkan waktu median menuju ekstubasi sukses yang secara statistik signifikan lebih singkat (64,8 jam vs 66,2 jam pada kontrol; perbedaan median terkoreksi -6,1 jam; hazard ratio terkoreksi 1,11) — meski signifikansi klinis dari perbedaan ini masih memiliki ketidakpastian.
      </p>
      <p className="border-l-4 border-amber-300 dark:border-amber-700 pl-4 py-1 text-sm font-medium italic bg-amber-50/50 dark:bg-amber-950/10 rounded-r-lg">
        <strong>Catatan penting mengenai trade-off:</strong> frekuensi ekstubasi tak terencana (unplanned extubation) justru lebih tinggi pada kelompok yang menerima intervensi SANDWICH dibanding yang tidak, meski tidak ada perbedaan pada angka kegagalan ekstubasi — temuan ini menyoroti trade-off di level populasi antara pencapaian optimal sedasi-weaning dengan tujuan ekstubasi dini, dan potensi peningkatan ekstubasi gagal serta tak terencana. Pada subgrup bronkiolitis secara khusus, tim PICU sebaiknya mempertimbangkan penerapan bundle SANDWICH, karena pengurangan waktu menuju ekstubasi sukses pada bayi dengan bronkiolitis dapat berdampak pada tekanan bed musiman.
      </p>
      <p className="mb-0"><strong>Prinsip praktis:</strong> protokol terstruktur membantu <strong>konsistensi</strong> proses weaning (mengurangi variasi antar-klinisi), namun <strong>bukan pengganti</strong> penilaian klinis individual — protokol adalah <em>alat bantu keputusan</em>, bukan algoritma otomatis tanpa pengawasan.</p>

      <h3 id="v10-sbt" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">10.3 Spontaneous Breathing Trial (SBT) — Protokol dan Kriteria Lulus</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.3.1 SBT pada Neonatus</h4>
      <p>
        Uji napas spontan (SBT) menggunakan CPAP endotrakeal (ET-CPAP) selama tiga menit dilakukan sebelum ekstubasi pada neonatus yang terintubasi &gt;24 jam dan dinilai siap ekstubasi. Dalam studi validasi tersebut, 77,5% bayi lulus SBT, dengan 78 dari 83 yang lulus berhasil diekstubasi (positive predictive value 93,97%); sensitivitas dan spesifisitas SBT masing-masing 81,2% dan 54,5%. Angka keberhasilan ekstubasi keseluruhan mencapai 90%.
      </p>
      <p className="border-l-4 border-rose-300 dark:border-rose-700 pl-4 py-1 text-sm font-medium italic bg-rose-50/50 dark:bg-rose-950/10 rounded-r-lg">
        <strong>Catatan penting untuk bayi sangat prematur:</strong> hasil studi lain menunjukkan gambaran berbeda — SBT dengan Youden index tertinggi mendefinisikan SBT lulus sebagai tidak adanya apnea (dengan desaturasi yang membutuhkan stimulasi) atau peningkatan kebutuhan oksigen sebesar 15% dari baseline, memprediksi keberhasilan ekstubasi dengan sensitivitas 93% namun spesifisitas hanya 39%. Temuan ini menunjukkan bahwa bayi sangat prematur seringkali menunjukkan tanda instabilitas klinis selama ET-CPAP, dan akurasi kombinasi berbagai kejadian klinis untuk mendefinisikan SBT tergolong rendah — sehingga SBT mungkin memberikan nilai tambah terbatas dalam penilaian kesiapan ekstubasi pada populasi ini.
      </p>
      <p><strong>Implikasi klinis:</strong> pada bayi sangat prematur, SBT <strong>tidak boleh menjadi satu-satunya penentu</strong> — integrasikan dengan penilaian klinis menyeluruh (10.4).</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.3.2 SBT pada Pediatrik (di Luar Neonatal)</h4>
      <p className="mb-0">Berbagai pendekatan klinis telah dijelaskan untuk menentukan waktu terbaik ekstubasi, yang umumnya dapat dicapai dengan melakukan uji napas spontan sebelum ekstubasi. Namun tidak ada bukti jelas mengenai teknik mana yang paling baik memprediksi kegagalan ekstubasi.</p>

      <h3 id="v10-prediktor" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">10.4 Prediktor Keberhasilan Ekstubasi (Neonatus vs Pediatrik)</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.4.1 Faktor Risiko Kegagalan Ekstubasi Neonatal</h4>
      <p>
        Studi kohort retrospektif pada neonatus ≤32 minggu dengan RDS mengidentifikasi enam faktor risiko independen kegagalan ekstubasi pertama: <strong>berat badan lebih rendah saat ekstubasi, FiO₂ lebih tinggi, patent ductus arteriosus (PDA &gt;1,5 mm), perdarahan intrakranial derajat 3 atau lebih tinggi, infeksi Ureaplasma urealyticum maternal, dan solusio plasenta selama kehamilan</strong>, dengan model nomogram menggabungkan enam faktor ini menunjukkan sensitivitas 91% dan spesifisitas 52% untuk memprediksi kegagalan ekstubasi (AUC 0,77).
      </p>
      <p>
        <strong>Konsekuensi kegagalan ekstubasi:</strong> kegagalan ekstubasi secara signifikan meningkatkan risiko atelektasis dan BPD, serta memperpanjang durasi dukungan ventilasi invasif. Ventilasi invasif berkepanjangan juga berhubungan dengan komplikasi seperti pneumonia terkait ventilator, atrofi diafragma, dan pneumotoraks — argumen kuat untuk <strong>tidak menunda ekstubasi tanpa alasan jelas</strong>, sembari tetap memastikan kesiapan adekuat.
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.4.2 Angka Kegagalan Ekstubasi Pediatrik</h4>
      <p>Kegagalan ekstubasi terjadi pada hingga 20% pasien di PICU, dengan bukti menunjukkan kejadiannya berhubungan dengan outcome pasien yang lebih buruk termasuk mortalitas lebih tinggi.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.4.3 Faktor Risiko Spesifik Populasi Bedah Jantung</h4>
      <p className="mb-0">
        Pada populasi kompleks seperti pasca-prosedur Norwood, kegagalan ekstubasi terjadi pada 10% (31 dari 311) percobaan ekstubasi dalam 48 jam pertama; analisis univariat menemukan angka kegagalan ekstubasi lebih tinggi ketika pasien diekstubasi ke CPAP/BiPAP dibanding ke HFNC atau nasal kanul (16% vs 7,8%) — menunjukkan bahwa pilihan modalitas dukungan pasca-ekstubasi sendiri dapat memengaruhi outcome, tidak selalu &quot;lebih tinggi support = lebih aman&quot; pada populasi tertentu (kemungkinan terkait interaksi kardiopulmoner spesifik pasca-bedah jantung — Bab 2.3).
      </p>

      <h3 id="v10-persiapan" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">10.5 Persiapan dan Teknik Ekstubasi</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.5.1 Checklist Persiapan (Prinsip Umum)</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kategori</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Item Persiapan</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Klinis', 'SBT lulus (dengan catatan keterbatasan pada preterm ekstrem, 10.3.1), hemodinamik stabil, kesadaran adekuat'],
              ['Alat', 'Suction siap (jalan napas dan mulut), sumber oksigen dan alat dukungan pasca-ekstubasi terpasang siap pakai (bukan disiapkan setelah ekstubasi)'],
              ['Personel', 'Tim yang mampu melakukan reintubasi darurat tersedia di lokasi/segera dapat diakses'],
              ['Monitoring', 'Pulse oximetry, kapnografi (bila tersedia untuk transisi awal) siap terpasang'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.5.2 Prinsip Teknik</h4>
      <ol className="list-decimal list-inside space-y-1.5 text-sm mb-0">
        <li>Suction jalan napas dan orofaring sebelum melepas ETT (mengurangi risiko aspirasi sekresi).</li>
        <li>Lepas fiksasi, lalu ETT ditarik pada puncak inspirasi (prinsip umum — meningkatkan kemungkinan batuk efektif yang membantu membersihkan sekresi residual).</li>
        <li><strong>Segera pasang dukungan pasca-ekstubasi yang sudah direncanakan</strong> (bukan menunggu tanda distres muncul dulu) — 10.6.</li>
        <li>Observasi ketat pada jam-jam pertama pasca-ekstubasi (periode risiko tertinggi kegagalan).</li>
      </ol>

      <h3 id="v10-pascaekstubasi" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">10.6 Dukungan Pasca-Ekstubasi (NIV Post-Extubation, HFNC)</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.6.1 Prinsip Umum</h4>
      <p>Dukungan pasca-ekstubasi <strong>direncanakan sebelum ekstubasi</strong>, bukan reaksi terhadap distres yang muncul kemudian — filosofi ini konsisten dengan prinsip proaktif troubleshooting (Bab 9) dan human-error-proofing (mencegah lebih baik daripada mengoreksi).</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.6.2 Evidence Efikasi Modalitas Neonatal</h4>
      <p>
        Berdasarkan Cochrane review dan meta-analisis terkini: dukungan pasca-ekstubasi menunjukkan pengurangan risiko signifikan secara statistik dan klinis terhadap kriteria kegagalan ekstubasi (RR tipikal 0,70) dan kebutuhan reintubasi (RR tipikal 0,76) dibanding tanpa dukungan terstruktur.
      </p>
      <p>
        Perbandingan antar-modalitas (network meta-analysis, Bab 3.6.2): <strong>NHFOV adalah modalitas dukungan non-invasif pasca-ekstubasi paling efektif</strong>, sementara NCPAP adalah yang paling kurang efektif; NHFOV dan NIPPV juga menunjukkan keunggulan signifikan dalam menurunkan insidensi BPD dibanding NCPAP. Sebuah meta-analisis lain secara spesifik menemukan NHFOV dibanding NCPAP menurunkan reintubasi dalam 7 hari (RR 0,34), menurunkan kegagalan ekstubasi (RR 0,39), menurunkan reintubasi dalam 72 jam (RR 0,40), menurunkan BPD (RR 0,59), dan menurunkan air leak paru (RR 0,46).
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.6.3 Kewaspadaan Khusus: HFNC pada Bayi Berisiko Sangat Tinggi</h4>
      <p>
        Untuk bayi paling imatur dengan risiko kegagalan ekstubasi tertinggi, tampak bijak untuk menghindari penggunaan HFNC sebagai dukungan awal pasca-ekstubasi — meski secara konsisten dengan bukti sebelumnya, angka reintubasi serupa ketika HFNC digunakan dengan NCPAP/NIPPV sebagai &quot;cadangan&quot; bila HFNC gagal. Prinsip praktis: HFNC dapat menjadi pilihan pada bayi risiko rendah-sedang, namun pada bayi risiko tinggi (preterm ekstrem, faktor risiko multipel dari 10.4.1), NCPAP/NIPPV sebagai lini pertama lebih dianjurkan, dengan HFNC sebagai opsi step-down berikutnya.
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.6.4 Populasi Khusus: Pasca-Bedah Jantung Kongenital</h4>
      <p className="mb-0">
        Non-invasive ventilation memberikan manfaat pada bayi pasca-ekstubasi dan penyakit paru pasca-infeksi, mengurangi risiko gagal napas berulang. NCPAP banyak digunakan sebagai dukungan respirasi pasca bedah jantung, namun 40% bayi dan neonatus dengan NCPAP tidak mencapai perbaikan oksigenasi dan sulit di-wean dari ventilasi invasif — populasi ini memerlukan pertimbangan khusus mengingat kompleksitas interaksi kardiopulmoner (Bab 2.3, Bab 6.7.5).
      </p>

      <h3 id="v10-kegagalan" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">10.7 Kegagalan Ekstubasi: Definisi, Faktor Risiko, Reintubasi</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.7.1 Definisi Operasional</h4>
      <p>Definisi kegagalan ekstubasi bervariasi antar-studi namun umumnya merujuk pada <strong>kebutuhan reintubasi dalam jendela waktu tertentu pasca-ekstubasi</strong> (paling umum 48–72 jam, meski beberapa studi menggunakan 7 hari).</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.7.2 Ringkasan Faktor Risiko Terintegrasi</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Domain</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Faktor Risiko</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Neonatal — pasien', 'Berat badan rendah saat ekstubasi, FiO₂ tinggi pra-ekstubasi, PDA signifikan'],
              ['Neonatal — komorbiditas', 'Perdarahan intrakranial derajat tinggi, faktor maternal-perinatal (infeksi, solusio plasenta)'],
              ['Pediatrik umum', 'Usia lebih muda'],
              ['Populasi bedah jantung', 'Pilihan modalitas dukungan pasca-ekstubasi (CPAP/BiPAP tampak berisiko lebih tinggi dibanding HFNC/NC pada populasi Norwood spesifik)'],
            ].map(([d, f], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{d}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{f}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">10.7.3 Prinsip Reintubasi</h4>
      <p className="border-l-4 border-teal-300 dark:border-teal-700 pl-4 py-1 text-sm font-medium italic bg-teal-50/50 dark:bg-teal-950/10 rounded-r-lg mb-0">
        Keputusan reintubasi mengikuti kriteria kegagalan NIV yang sudah dibahas (Bab 3.7) — reintubasi bukan kegagalan tata laksana, melainkan respons klinis tepat terhadap kegagalan dukungan non-invasif yang teridentifikasi cepat. <strong>Penundaan reintubasi pada pasien yang sudah menunjukkan tanda kegagalan jelas</strong> berisiko lebih besar dibanding reintubasi itu sendiri.
      </p>
    </>
  );
}
