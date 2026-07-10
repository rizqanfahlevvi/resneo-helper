import TocNav from '../../TocNav';

export default function Body() {
  return (
    <>
      <TocNav
        items={[
          { id: 'v4-indikasi', label: '4.1 Indikasi Intubasi' },
          { id: 'v4-persiapan', label: '4.2 Persiapan Alat: Checklist & Ukuran ETT' },
          { id: 'v4-premedikasi', label: '4.3 Premedikasi Intubasi — Prinsip Umum' },
          { id: 'v4-teknik', label: '4.4 Teknik Intubasi & Konfirmasi Posisi ETT' },
          { id: 'v4-komplikasi', label: '4.5 Komplikasi Intubasi & Pencegahannya' },
        ]}
      />

      <h3 id="v4-indikasi" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">4.1 Indikasi Intubasi</h3>
      <p>
        Intubasi endotrakeal diindikasikan ketika dukungan non-invasif (Bab 3) gagal atau tidak sesuai untuk kondisi klinis pasien. Intubasi endotrakeal diindikasikan pada berbagai kondisi klinis, seperti gagal napas yang mengancam (impending respiratory failure) dan kebutuhan untuk melindungi jalan napas pasien.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kategori</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Contoh Kondisi</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Kegagalan oksigenasi/ventilasi', 'Gagal napas hipoksemik/hiperkapnik refrakter terhadap NIV maksimal (Bab 3.7)'],
              ['Proteksi jalan napas', 'Penurunan kesadaran berat (refleks jalan napas hilang), risiko aspirasi tinggi'],
              ['Obstruksi jalan napas', 'Obstruksi anatomis/dinamis yang tidak teratasi dengan support non-invasif'],
              ['Prosedural', 'Kebutuhan sedasi dalam/anestesi untuk prosedur, transportasi pasien kritis'],
              ['Antisipatif', 'Perjalanan klinis yang diprediksi memburuk cepat (sepsis berat, status epileptikus refrakter)'],
              ['Neonatal spesifik', 'RDS berat dengan kebutuhan surfaktan (LISA/MIST, Bab 3.7.2), apnea signifikan tak respons NCPAP, hernia diafragmatika kongenital, dsb.'],
            ].map(([k, c], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">4.1.1 Perbedaan Pendekatan Neonatus vs Pediatrik</h4>
      <ul className="list-disc list-inside space-y-1 text-sm mb-0">
        <li><strong>Neonatus:</strong> indikasi sering terkait penyakit paru primer (RDS, TTN berat, meconium aspiration, sepsis dengan gagal napas) atau kebutuhan pemberian surfaktan.</li>
        <li><strong>Pediatrik (di luar neonatal):</strong> spektrum indikasi lebih luas — termasuk trauma, status neurologis, sepsis, gagal napas akibat penyakit jalan napas bawah (bronkiolitis berat, status asmatikus).</li>
      </ul>

      <h3 id="v4-persiapan" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">4.2 Persiapan Alat: Checklist dan Ukuran ETT</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">4.2.1 Mnemonic Persiapan: SOAPME</h4>
      <p>
        Sebelum melakukan rapid sequence intubation (RSI), semua monitor, peralatan, personel, dan obat yang diperlukan harus disiapkan dan diorganisasi terlebih dahulu. Mnemonic SOAPME menjadi alat bantu memori untuk lima komponen persiapan alat: (1) Suction, (2) Oxygen, (3) Airway, (4) Pharmacology, dan (5) Monitoring Equipment.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Komponen</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Detail Praktis</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Suction', 'Suction dengan ujung Yankauer siap pakai'],
              ['Oxygen', 'Sumber oksigen dan alat pemberian (bag-mask, dsb) siap dan berfungsi'],
              ['Airway', 'ETT ukuran sesuai + satu ukuran lebih kecil dan lebih besar sebagai cadangan, laringoskop dengan bilah sesuai usia, stylet, plester fiksasi'],
              ['Pharmacology', 'Obat premedikasi/induksi/paralitik sudah disiapkan sesuai kebijakan lokal (4.3)'],
              ['Monitoring Equipment', 'Pulse oximeter, kapnografi/EtCO₂ detector, EKG, tekanan darah'],
            ].map(([k, d], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">4.2.2 Ukuran ETT</h4>
      <p><strong>Formula umum (anak di luar neonatus):</strong></p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Jenis ETT</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Formula</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">Uncuffed</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">(Usia ÷ 4) + 4</td>
            </tr>
            <tr>
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">Cuffed</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">(Usia ÷ 4) + 3,5</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Catatan penting mengenai akurasi formula:</strong> Trakea pediatrik ditemukan berbentuk elips pada level infraglotis, dengan diameter transversal sebagai yang tersempit — bukan bentuk kerucut murni seperti anggapan klasik; pada titik tersempit ini, formula standar cenderung overestimate ukuran, sehingga direkomendasikan menggunakan formula ETT cuffed (usia/4)+3,5, atau bila memakai formula standar, memilih setengah ukuran lebih kecil. Oversizing tube berisiko cedera dinding trakea, jaringan parut, dan stenosis.
      </p>
      <p><strong>Ukuran neonatal/bayi (berbasis berat dan usia, bukan formula usia):</strong></p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kategori</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Ukuran ETT (ID, uncuffed)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Neonatus <1 kg', '2,5 mm'],
              ['Prematur 1–2 kg', '2,5–3,0 mm'],
              ['Neonatus cukup bulan (full-term)', '3,5–4,0 mm'],
              ['Standar AAP/AHA: bayi prematur & neonatus', 'Uncuffed 2,5 dan 3,0 mm'],
              ['Bayi & anak kecil', 'Uncuffed atau cuffed 3,5, 4,0, 4,5, dan 5,5 mm'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-center font-extrabold text-violet-600 dark:text-violet-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">4.2.3 Cuffed vs Uncuffed pada Anak</h4>
      <p>Pandangan modern telah bergeser dari dogma lama &quot;selalu uncuffed pada anak&quot;:</p>
      <ul className="list-disc list-inside space-y-1.5 text-sm">
        <li>Pemahaman anatomi terbaru menunjukkan glotis (bukan area subglotis berbentuk kerucut) sebagai titik tersempit, elips, dan silindris — mendukung penggunaan ETT cuffed dengan teknologi high-volume low-pressure (HVLP), khususnya dengan cuff berbahan poliuretan.</li>
        <li>Pada intubasi darurat anak, tube cuffed kini lebih disukai dibanding uncuffed, dengan syarat memonitor tekanan cuff tetap rendah dan inflasi cuff yang hati-hati pada ukuran tube kecil.</li>
        <li>Namun pada neonatus atau bayi dengan berat &lt;3,0 kg, tetap bijak menggunakan ETT uncuffed.</li>
        <li>Studi kohort retrospektif menemukan tidak ada perbedaan insidensi stridor pasca-ekstubasi antara ETT cuffed vs uncuffed pada bayi dengan berat 2–6 kg, dan penggunaan ETT uncuffed tidak menunjukkan risiko lebih tinggi terhadap stenosis subglotis yang didapat pada kohort ini.</li>
      </ul>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">4.2.4 Kedalaman Insersi</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Metode</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Perhitungan</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">Umum (uncuffed)</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">Kedalaman insersi (cm) ≈ 3 × diameter internal tube</td>
            </tr>
            <tr>
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">Neonatus (alternatif)</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">Nasal septum ke tragus (cm) + 1 cm</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Formula kedalaman insersi ETT telah tervalidasi secara klinis untuk pasien neonatal dengan berat &gt;750 g hingga 4 kg. Namun, formula berbasis berat memiliki keterbatasan keandalan pada bayi berat lahir sangat rendah (&lt;1 kg), sehingga konfirmasi radiologis esensial pada neonatus dan bayi, terutama yang &lt;1 kg.
      </p>
      <p className="border-l-4 border-violet-300 dark:border-violet-700 pl-4 py-1 text-sm font-medium italic bg-violet-50/50 dark:bg-violet-950/10 rounded-r-lg mb-0">
        <strong>Prinsip keselamatan:</strong> formula hanyalah estimasi awal — <strong>verifikasi klinis (auskultasi bilateral, pengembangan dada simetris) dan konfirmasi radiologis/kapnografi tetap wajib</strong>, tidak boleh mengandalkan angka formula semata.
      </p>

      <h3 id="v4-premedikasi" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">4.3 Premedikasi Intubasi — Prinsip Umum</h3>
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/30 rounded-xl p-4 text-sm">
        <p className="m-0 text-amber-800 dark:text-amber-300"><strong>Catatan penting:</strong> Bagian ini membahas <strong>prinsip dan kategori</strong> obat premedikasi, bukan dosis spesifik. Dosis aktual harus mengikuti kebijakan/formularium institusi Anda dan guideline resmi (PALS/NRP/protokol lokal), karena dosis bergantung pada kondisi klinis individual pasien.</p>
      </div>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">4.3.1 Tiga Kategori Obat dalam RSI</h4>
      <p>
        Rapid sequence intubation paling sering melibatkan pemberian sinkron obat sedatif dan agen pelumpuh otot (neuromuscular blocking agent/NMBA) untuk menginduksi ketidaksadaran dan paralisis motorik guna memfasilitasi intubasi endotrakeal, bertujuan memfasilitasi intubasi dengan menyediakan kondisi jalan napas optimal untuk insersi ETT secara cepat dan berhasil, sekaligus mengurangi risiko komplikasi.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kategori</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Tujuan</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Contoh Golongan</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Pretreatment/premedikasi', 'Mengurangi respons fisiologis tidak diinginkan (lonjakan TIK, bradikardia refleks)', 'Analgesik opioid kerja cepat, kadang antikolinergik'],
              ['Induksi (sedasi/hipnotik)', 'Menghilangkan kesadaran sebelum laringoskopi', 'Golongan hipnotik-sedatif kerja cepat'],
              ['Paralitik (NMBA)', 'Relaksasi otot untuk kondisi intubasi optimal', 'Golongan depolarizing/non-depolarizing'],
            ].map(([k, t, c], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{t}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">4.3.2 Catatan Khusus Populasi Neonatal</h4>
      <p>
        Studi multisenter menemukan penggunaan obat induksi dan NMBA jauh lebih rendah pada pasien NICU (52% dan 23%) dibanding pasien di luar NICU (98% dan 95%), dengan pasien NICU yang menerima obat RSI cenderung lebih tua dan lebih berat — mencerminkan variasi praktik signifikan pada populasi neonatal, seringkali karena kekhawatiran stabilitas hemodinamik pada bayi sangat prematur.
      </p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">4.3.3 Kontroversi: Atropin sebagai Premedikasi</h4>
      <p>
        Tidak ada bukti yang mendukung penggunaan rutin atropin sebagai premedikasi untuk mencegah bradikardia pada intubasi darurat anak — ini pergeseran dari praktik lama yang dulu rutin memberikan atropin pretreatment pada semua intubasi pediatrik.
      </p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">4.3.4 Komplikasi Tersering RSI Pediatrik</h4>
      <p>
        Komplikasi tersering yang dilaporkan adalah desaturasi (29% dari seluruh intubasi), hipotensi (16%), dan bradikardia (7%) — data ini menegaskan pentingnya preoksigenasi optimal (Bab 1.3 mengenai cadangan oksigen rendah pada anak) dan monitoring hemodinamik ketat selama dan segera setelah tindakan.
      </p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">4.3.5 Cricoid Pressure (Sellick Maneuver)</h4>
      <p className="mb-0">
        Keamanan dan efikasi manuver Sellick telah dipertanyakan — bila dilakukan tidak tepat (hal yang tidak jarang terjadi), tekanan krikoid dapat mengganggu visualisasi langsung laring; pada kasus berat yang jarang, ruptur esofagus dapat terjadi bila tekanan krikoid diterapkan pada pasien yang sedang aktif muntah. Keputusan penggunaan manuver ini sebaiknya dibuat berdasarkan basis individual, dengan kekuatan lembut yang diterapkan pada kartilago krikoid secara hati-hati.
      </p>

      <h3 id="v4-teknik" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">4.4 Teknik Intubasi dan Konfirmasi Posisi ETT</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">4.4.1 Posisi Pasien</h4>
      <p>
        Secara umum, untuk intubasi endotrakeal, lobus telinga anak dan ujung bahu sebaiknya sejajar — prinsip ini membantu mencapai posisi &quot;sniffing&quot; yang optimal, meski detail teknis bervariasi sesuai usia (bayi vs anak lebih besar memiliki oksiput relatif lebih besar yang memengaruhi posisi optimal kepala).
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">4.4.2 Konfirmasi Posisi Setelah Intubasi</h4>
      <p>
        Penempatan yang tepat harus diverifikasi segera setelah intubasi melalui: penilaian klinis (pengembangan dada bilateral dan suara napas), dan idealnya kapnografi/deteksi EtCO₂ sebagai konfirmasi objektif.
      </p>
      <p><strong>Langkah verifikasi standar (urutan disarankan):</strong></p>
      <ol className="list-decimal list-inside space-y-1 text-sm">
        <li>Visualisasi langsung ETT melewati pita suara saat insersi (bila memungkinkan).</li>
        <li>Deteksi CO₂ end-tidal (kapnografi waveform, bukan hanya kolorimetri) — konfirmasi paling reliable bahwa tube berada di trakea, bukan esofagus.</li>
        <li>Auskultasi bilateral dada dan epigastrium — suara napas simetris kanan-kiri, tidak ada suara di epigastrium.</li>
        <li>Observasi pengembangan dada simetris.</li>
        <li>Konfirmasi radiologis (rontgen toraks) — terutama pada neonatus — untuk memastikan posisi ujung ETT yang tepat (idealnya di pertengahan trakea, sekitar level T1–T2, di antara klavikula dan karina).</li>
      </ol>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">4.4.3 Fiksasi Tube</h4>
      <p className="mb-0">
        Praktik umum adalah memotong ETT pada bayi sehingga tube tidak lebih dari 1–2 cm keluar dari mulut — mengurangi resistensi jalan napas tambahan (sesuai hukum Hagen-Poiseuille, resistensi meningkat seiring panjang tube) dan mengurangi risiko manipulasi pasca-intubasi yang dapat meningkatkan risiko malposisi tube.
      </p>

      <h3 id="v4-komplikasi" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">4.5 Komplikasi Intubasi dan Pencegahannya</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Komplikasi</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Faktor Risiko/Penyebab</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Pencegahan</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Desaturasi (tersering, ~29%)', 'Preoksigenasi tak adekuat, waktu apnea terlalu lama, cadangan oksigen rendah pada anak', 'Preoksigenasi optimal, batasi jumlah percobaan, pertimbangkan apneic oxygenation'],
              ['Hipotensi (~16%)', 'Efek obat induksi, efek hemodinamik ventilasi tekanan positif (Bab 2.3), hipovolemia yang belum terkoreksi', 'Optimalkan volume sebelum tindakan bila memungkinkan, pilih obat induksi sesuai status hemodinamik'],
              ['Bradikardia (~7%)', 'Hipoksia (bradikardia pada anak sering tanda hipoksia, bukan primer kardiak), stimulasi vagal saat laringoskopi', 'Preoksigenasi adekuat, monitoring ketat, kesiapan obat emergensi'],
              ['Malposisi ETT (terlalu dalam/dangkal)', 'Kesalahan estimasi kedalaman, pergerakan kepala (fleksi mendorong tube lebih dalam, ekstensi menarik tube keluar)', 'Verifikasi multi-modalitas (auskultasi + kapnografi + radiologi), fiksasi adekuat, minimalkan pergerakan kepala berlebihan pasca-intubasi'],
              ['Multiple attempts (≥3 kali)', 'Predisposisi ke komplikasi lain', 'Dilaporkan sebagai faktor risiko independen — pertimbangkan eskalasi ke operator lebih senior/videolaringoskopi bila percobaan pertama gagal'],
            ].map(([k, f, p], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{f}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{p}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
