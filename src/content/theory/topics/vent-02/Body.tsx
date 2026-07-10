import TocNav from '../../TocNav';

export default function Body() {
  return (
    <>
      <TocNav
        items={[
          { id: 'v2-airway', label: '2.1 Airway: Assessment & Anatomi Jalan Napas' },
          { id: 'v2-breathing', label: '2.2 Breathing: Mekanisme Pertukaran Gas & Kerja Napas' },
          { id: 'v2-circulation', label: '2.3 Circulation: Interaksi Kardiopulmoner' },
          { id: 'v2-redflags', label: '2.4 Red Flags Kegagalan Tiap Komponen ABC' },
        ]}
      />

      <h3 id="v2-airway" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">2.1 Airway: Assessment dan Anatomi Jalan Napas Neonatus vs Anak</h3>
      <p>
        Sebelum bicara ventilator, klinisi harus memahami bahwa <strong>jalan napas anak bukan versi kecil dari jalan napas dewasa</strong> — perbedaan struktural memengaruhi pemilihan ukuran ETT, teknik intubasi, dan risiko komplikasi. Terdapat perbedaan fundamental antara anatomi dan fisiologi jalan napas neonatus, pediatrik, dan dewasa; bayi bukan sekadar orang dewasa berukuran kecil dalam hal ini — ukuran, luas permukaan, proporsi, resistensi, dan compliance sangat bervariasi antar kelompok usia.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Struktur</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Neonatus/Bayi</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Anak Besar/Dewasa</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Implikasi Klinis</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Pola napas', 'Obligat/preferensial nasal breather — epiglotis besar berdekatan dengan nasofaring', 'Bisa napas mulut leluasa', 'Obstruksi nasal (sekret, choanal atresia) bisa fatal pada neonatus'],
              ['Lidah', 'Relatif besar terhadap rongga mulut', 'Proporsional', 'Mudah menyumbat jalan napas atas saat sedasi/tidak sadar'],
              ['Laring', 'Lebih tinggi & anterior (C3–C4)', 'Lebih rendah (C4–C6)', 'Visualisasi laring saat intubasi lebih menantang'],
              ['Epiglotis', 'Besar, berbentuk omega (Ω), lebih lunak', 'Lebih kecil dan kaku', 'Sering perlu bilah lurus (straight blade)'],
              ['Titik tersempit', 'Subglotis (cincin krikoid) — bentuk corong/funnel', 'Pita suara (bentuk silinder)', 'ETT uncuffed bisa pas di pita suara namun tetap cedera di subglotis bila salah ukur'],
              ['Trakea', 'Panjang ~4 cm saat lahir; berlipat dua panjangnya, diameter 3×, luas penampang 6× hingga remaja', 'Jauh lebih panjang', 'Margin kesalahan posisi ETT sangat kecil pada neonatus'],
              ['Membran krikotiroid', '2,6 × 3,0 mm', '10,4 × 8,2 mm (dewasa)', 'Krikotiroidotomi darurat sangat berisiko & sulit pada neonatus'],
              ['Bronkus utama', 'Sudut percabangan kanan-kiri relatif simetris', 'Bronkus kiri lebih tajam sudutnya', 'ETT yang didorong berlebihan hampir selalu masuk bronkus utama kanan pada neonatus/anak'],
            ].map(([s, n, a, i2], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{s}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{n}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{a}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{i2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Jalan napas paling sulit ditangani adalah ketika beberapa tipe jalan napas sulit terjadi bersamaan, dan ketika obstruksi jalan napas terjadi di beberapa lokasi anatomis sekaligus. Pendekatan yang konsisten terhadap manajemen jalan napas mengurangi kesalahan dan morbiditas; persiapan, perencanaan, dan penetapan jalur eskalasi untuk mendapatkan bantuan ahli sangatlah esensial.
      </p>
      <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-800/30 rounded-xl p-4">
        <h5 className="font-extrabold text-rose-800 dark:text-rose-300 text-xs uppercase tracking-widest mb-2">Prinsip Praktis di ICU/NICU/PICU</h5>
        <ul className="text-xs text-rose-700 dark:text-rose-400 space-y-1.5 list-disc list-inside m-0">
          <li>Setiap kali menghadapi kasus berpotensi jalan napas sulit (mikrognatia, massa leher, kelainan kraniofasial), <strong>libatkan tim eskalasi lebih awal</strong> (anestesi/THT), jangan tunggu sampai kondisi darurat.</li>
          <li>Penilaian jalan napas anak sering sulit karena anak seringkali tidak dapat kooperatif dalam memberikan informasi dari anamnesis dan pemeriksaan fisik — sehingga observasi objektif (pola napas, retraksi, stridor) menjadi lebih penting dibanding riwayat subjektif.</li>
        </ul>
      </div>

      <h3 id="v2-breathing" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">2.2 Breathing: Mekanisme Pertukaran Gas dan Kerja Napas</h3>
      <p>
        Ventilasi efektif membutuhkan rantai utuh: <strong>jalan napas paten → mekanika dinding dada/otot pernapasan adekuat → alveolus fungsional → membran alveolus-kapiler intak → perfusi kapiler paru adekuat</strong>. Kegagalan di titik manapun dalam rantai ini menghasilkan gagal napas, namun dengan mekanisme dan tata laksana yang berbeda:
      </p>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Kegagalan ventilasi</strong> (hipoksemia + hiperkapnia) — biasanya masalah pompa (otot lemah, obstruksi jalan napas, kelainan dinding dada, depresi sentral).</li>
        <li><strong>Kegagalan oksigenasi</strong> (hipoksemia dominan, PaCO₂ normal/rendah) — biasanya masalah pertukaran gas di level alveolus-kapiler (V/Q mismatch, shunt, difusi).</li>
      </ul>
      <p>
        Pembedaan ini penting karena <strong>menentukan strategi ventilator</strong>: kegagalan ventilasi murni sering cukup dengan dukungan tekanan/volume dan rate yang tepat; kegagalan oksigenasi membutuhkan optimasi PEEP dan mean airway pressure (Bab 6–7).
      </p>
      <p className="mb-0">
        Kerja napas berlebihan (takipnea, retraksi, napas cuping hidung, grunting) adalah <strong>tanda klinis paling awal dan paling sensitif</strong> dari gagal napas yang akan datang — sering muncul sebelum gas darah abnormal. Pada bayi/anak dengan tanda kerja napas berat namun gas darah &quot;masih oke&quot;, jangan tenang — ini justru situasi peringatan untuk bersiap eskalasi support sebelum terjadi dekompensasi mendadak.
      </p>

      <h3 id="v2-circulation" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">2.3 Circulation: Interaksi Kardiopulmoner — Efek Ventilasi Tekanan Positif</h3>
      <p>Ini adalah salah satu konsep paling sering diremehkan klinisi non-intensivis: <strong>ventilator tidak hanya memengaruhi paru, tapi juga jantung</strong>, melalui perubahan tekanan intratoraks (ITP).</p>
      <p>
        Ventilasi tekanan positif meningkatkan tekanan intratoraks. Efeknya pada sirkulasi bergantung pada <strong>ventrikel mana</strong> dan <strong>status volume pasien</strong>.
      </p>
      <p>
        <strong>Efek pada preload (venous return):</strong> Ventilasi tekanan positif menurunkan preload ventrikel kanan (venous return berkurang). Selama napas tekanan positif, peningkatan tekanan pleura meningkatkan tekanan atrium kanan, yang mengurangi gradien tekanan pendorong venous return, sehingga preload RV menurun. Penambahan PEEP pada napas mekanik memperkuat peningkatan tekanan pleura dan tekanan atrium kanan ini secara terus-menerus sepanjang siklus napas.
      </p>
      <p>
        <strong>Efek pada afterload:</strong> Pada <strong>ventrikel kanan (RV)</strong>, PEEP meningkatkan afterload melalui peningkatan resistensi vaskular paru akibat kompresi kapiler alveolar. Sebaliknya pada <strong>ventrikel kiri (LV)</strong>, peningkatan tekanan intratoraks justru menurunkan afterload dan akan meningkatkan ejeksi ventrikel kiri — pada pasien dengan gagal jantung hipervolemik, efek penurunan afterload ini dapat memperbaiki ejeksi ventrikel kiri, meningkatkan curah jantung, dan mengurangi kebutuhan oksigen miokard.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kondisi Pasien</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Efek PPV/PEEP yang Diprediksi</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Sikap Klinis</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Hipovolemia', 'Penurunan preload dapat menyebabkan hipotensi akibat preload LV yang tidak adekuat', 'Resusitasi cairan sebelum/bersamaan eskalasi PEEP; waspada hipotensi pasca-intubasi'],
              ['Gagal jantung kiri kongestif (hipervolemik)', 'CPAP/BiPAP secara selektif menurunkan afterload LV, menggeser kurva fungsi ventrikel ke atas tanpa menurunkan venous return', 'PPV/CPAP dapat menguntungkan secara hemodinamik, bukan hanya respirasi'],
              ['Gagal jantung kanan / hipertensi pulmonal', 'Perubahan preload & afterload RV dapat menyebabkan hipotensi refrakter meski vasopresor/inotropik dosis tinggi', 'Titrasi PEEP hati-hati; hindari overdistensi paru yang memperberat resistensi vaskular paru'],
              ['Status volume tidak jelas', 'Variabel', 'Pulse pressure variation dapat membantu menilai preload-dependency'],
            ].map(([kd, e, s], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{kd}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{e}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-800/30 rounded-xl p-4">
        <h5 className="font-extrabold text-rose-800 dark:text-rose-300 text-xs uppercase tracking-widest mb-2">Prinsip Praktis di Ranjang Pasien</h5>
        <ol className="text-xs text-rose-700 dark:text-rose-400 space-y-1.5 list-decimal list-inside m-0">
          <li><strong>Setiap eskalasi PEEP atau mean airway pressure signifikan</strong> → observasi tekanan darah dan perfusi beberapa menit setelahnya, terutama pada pasien yang berpotensi hipovolemik atau dengan disfungsi ventrikel kanan.</li>
          <li><strong>Hipotensi pasca-intubasi/pasca-eskalasi ventilator</strong> bukan selalu karena obat sedasi — pertimbangkan efek hemodinamik tekanan positif itu sendiri, khususnya bila pasien hipovolemik.</li>
          <li>Pada bayi dengan <strong>penyakit jantung kongenital</strong> (terutama shunt kanan-ke-kiri atau fisiologi ventrikel tunggal), interaksi jantung-paru menjadi jauh lebih kompleks dan idealnya melibatkan diskusi dengan kardiologi/intensivis sebelum perubahan setting besar.</li>
        </ol>
      </div>

      <h3 id="v2-redflags" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">2.4 Red Flags Kegagalan Tiap Komponen ABC</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Komponen</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Red Flag Klinis</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Tindakan Segera</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Airway', 'Stridor progresif, tidak ada suara napas meski usaha napas terlihat, sekresi masif tak terkontrol', 'Buka/amankan jalan napas segera; siapkan eskalasi (definitive airway)'],
              ['Breathing', 'Retraksi berat, grunting, napas cuping hidung, apnea/gasping, SpO₂ turun meski FiO₂ dinaikkan', 'Berikan/tingkatkan support ventilasi; jangan tunggu AGD'],
              ['Circulation', 'Hipotensi baru setelah intubasi/eskalasi ventilator, perfusi perifer memburuk, bradikardia progresif (neonatus — sering tanda hipoksia, bukan primer kardiak)', 'Cek status volume, pertimbangkan efek hemodinamik ventilator, evaluasi ulang setting'],
            ].map(([k, r, t], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{r}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-l-4 border-rose-300 dark:border-rose-700 pl-4 py-1 text-sm font-medium italic bg-rose-50/50 dark:bg-rose-950/10 rounded-r-lg mb-0">
        Ventilasi mekanik bukan intervensi yang &quot;hanya menyentuh paru&quot; — setiap perubahan setting berpotensi berdampak pada hemodinamik, khususnya pada neonatus dan anak dengan cadangan fisiologis yang tipis. Evaluasi ABC harus dilakukan <strong>ulang</strong> setiap kali ada perubahan bermakna pada ventilator, bukan hanya sekali di awal.
      </p>
    </>
  );
}
