import TocNav from '../../TocNav';

export default function Body() {
  return (
    <>
      <TocNav
        items={[
          { id: 'v8-klinis', label: '8.1 Monitoring Klinis' },
          { id: 'v8-agd', label: '8.2 Monitoring Gas Darah' },
          { id: 'v8-oi', label: '8.3 Oxygenation Index, OSI, P/F, S/F — PALICC-2' },
          { id: 'v8-etco2', label: '8.4 Kapnografi (EtCO2)' },
          { id: 'v8-spo2', label: '8.5 Pulse Oximetry (SpO2) — Target per Kondisi' },
          { id: 'v8-waveform', label: '8.6 Waveform Monitoring: Mengenali Asinkroni' },
          { id: 'v8-compliance', label: '8.7 Compliance dan Resistance' },
          { id: 'v8-alarm', label: '8.8 Alarm Ventilator' },
          { id: 'v8-lanjut', label: '8.9 Lung Recruitment Tool & Esophageal Pressure' },
        ]}
      />

      <h3 id="v8-klinis" className="scroll-mt-4">8.1 Monitoring Klinis (Inspeksi, Auskultasi, Kerja Napas)</h3>
      <p>Monitoring ventilator tidak pernah menggantikan monitoring klinis di ranjang pasien — <strong>angka di layar hanyalah salah satu input</strong>, bukan satu-satunya. Prinsip ABC (Bab 2) harus dievaluasi ulang setiap kali monitoring dilakukan:</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Aspek Klinis</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Yang Diperiksa</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Inspeksi', 'Pengembangan dada simetris, retraksi, napas cuping hidung, warna kulit/perfusi, agitasi/ketidaknyamanan'],
              ['Auskultasi', 'Suara napas bilateral simetris, ada/tidaknya ronki/wheezing, suara napas menjauh (tanda pneumotoraks/malposisi ETT)'],
              ['Kerja napas', 'Penggunaan otot bantu napas, sinkronisasi dengan ventilator (asinkroni, Bab 9)'],
              ['Tingkat kesadaran/kenyamanan', 'Relevan untuk menilai kecukupan sedasi dan potensi asinkroni akibat "fighting the ventilator"'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-l-4 border-rose-300 dark:border-rose-700 pl-4 py-1 text-sm font-medium italic bg-rose-50/50 dark:bg-rose-950/10 rounded-r-lg mb-0">
        <strong>Prinsip integrasi:</strong> setiap perubahan pada monitoring numerik (SpO₂ turun, EtCO₂ naik) harus <strong>dikonfirmasi dengan pemeriksaan klinis langsung</strong> sebelum mengambil tindakan — angka bisa salah karena artefak, sensor lepas, atau kalibrasi buruk (8.9 — troubleshooting sensor).
      </p>

      <h3 id="v8-agd" className="scroll-mt-4">8.2 Monitoring Gas Darah: Interpretasi AGD dalam Konteks Ventilator</h3>
      <p className="mb-0">
        Analisis gas darah (AGD) tetap menjadi <strong>gold standard</strong> untuk menilai oksigenasi dan ventilasi aktual, melengkapi (bukan digantikan oleh) monitoring non-invasif seperti SpO₂ dan EtCO₂. Interpretasi AGD harus selalu dikaitkan dengan setting ventilator saat itu — misalnya PaCO₂ tinggi pada TInsp yang terlalu singkat mengarahkan evaluasi ke time constant (Bab 1.2.3), bukan otomatis menaikkan rate.
      </p>

      <h3 id="v8-oi" className="scroll-mt-4">8.3 Oxygenation Index, OSI, Rasio PaO2/FiO2, SpO2/FiO2 — PALICC-2</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.3.1 Definisi dan Rumus</h4>
      <p>OI (Oxygenation Index) = Mean Airway Pressure (MAP, cmH₂O) × FiO₂ / PaO₂ (mmHg). OSI (Oxygenation Saturation Index) = MAP (cmH₂O) × FiO₂ / SpO₂.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.3.2 Kapan Menggunakan Indeks Mana</h4>
      <p>
        Pada pasien terintubasi dengan ventilasi mekanik invasif, OI digunakan bila pengukuran AGD tersedia; jika tidak, OSI digunakan sebagai gantinya. Pada pasien dengan ventilasi non-invasif seperti BiPAP atau CPAP (diikuti dengan full-face mask dan tekanan minimum 5 cmH₂O), rasio PaO₂/FiO₂ (P/F) digunakan bila AGD tersedia; jika tidak, rasio SpO₂/FiO₂ (S/F) digunakan. Terapi oksigen harus disesuaikan untuk mempertahankan SpO₂ antara 88% dan 97% sebelum indeks-indeks ini dihitung, agar perhitungan valid.
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.3.3 Signifikansi Klinis</h4>
      <p className="mb-0">Indeks-indeks ini digunakan PALICC-2 untuk <strong>stratifikasi keparahan PARDS</strong> — memungkinkan klasifikasi keparahan bahkan pada pasien yang belum diintubasi (menggunakan OSI atau S/F ratio), memperluas cakupan diagnosis PARDS ke pasien dengan dukungan non-invasif termasuk HFNC.</p>

      <h3 id="v8-etco2" className="scroll-mt-4">8.4 Kapnografi (EtCO2) — Nilai Normal, Cara Ukur, Interpretasi Kurva</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.4.1 Nilai Normal dan Korelasi dengan PaCO2</h4>
      <p className="text-xs italic text-slate-500 dark:text-slate-400">(Bab 7.10.) EtCO₂ normal pada napas spontan neonatus/anak berkisar 36–40 mmHg, dengan korelasi baik terhadap PaCO₂ (r≈0,8) pada paru sehat, namun korelasi ini <strong>menurun pada penyakit paru berat</strong>.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.4.2 Interpretasi Bentuk Gelombang (Waveform) Kapnografi</h4>
      <p>
        Kapnografi end-tidal dapat memberikan informasi klinis berguna yang ditampilkan pada layar ventilator atau monitor bedside. Perubahan mendadak atau hilangnya gelombang CO₂ dapat berfungsi sebagai tindakan pengamanan untuk mengingatkan klinisi mengenai ETT yang terlepas atau tersumbat, dengan mempertimbangkan gelombang flow dan volume yang menyertainya secara bersamaan.
      </p>
      <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-800/30 rounded-xl p-4 text-sm">
        <h5 className="font-extrabold text-rose-800 dark:text-rose-300 text-xs uppercase tracking-widest mb-2">Pola Waveform yang Perlu Dikenali</h5>
        <ul className="text-xs text-rose-700 dark:text-rose-400 space-y-1.5 list-disc list-inside m-0">
          <li><strong>Hilang mendadak (flat line):</strong> ETT terlepas, ekstubasi tak sengaja, atau obstruksi total.</li>
          <li><strong>Penurunan bertahap plateau:</strong> kebocoran sirkuit, sampling line bermasalah.</li>
          <li><strong>Bentuk landai (tidak mencapai plateau tegas):</strong> obstruksi ekspirasi/bronkospasme, waktu ekspirasi tidak adekuat.</li>
          <li><strong>Baseline tidak kembali ke nol saat inspirasi:</strong> rebreathing CO₂ (terkait pengaturan PEEP/waktu ekspirasi yang tidak adekuat).</li>
        </ul>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.4.3 Kegunaan sebagai Alat Tren, Bukan Pengganti AGD</h4>
      <p className="mb-0">
        Korelasi antara EtCO₂ mainstream dan PaCO₂ secara umum baik; neonatus dengan penyakit paru akan memiliki korelasi lebih rendah. Terapi surfaktan memperbaiki korelasi ini. Monitoring EtCO₂ membantu dalam melihat tren atau skrining nilai PaCO₂ abnormal — bukan menggantikan pengukuran definitif.
      </p>

      <h3 id="v8-spo2" className="scroll-mt-4">8.5 Pulse Oximetry (SpO2) — Target Saturasi per Kondisi</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kondisi</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Target SpO₂</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['PARDS umum (sebelum optimasi PEEP)', 'Lebih tinggi, disesuaikan individual'],
              ['PARDS berat (setelah PEEP optimal)', 'Dapat menerima SpO₂ <92% untuk mengurangi paparan FiO₂'],
              ['HFOV (umum)', '88–92%'],
              ['ARDS berat (minimalisasi toksisitas O₂)', '>88–90%'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-0"><strong>Prinsip umum:</strong> target SpO₂ <strong>bukan angka tunggal universal</strong> — bergantung pada kondisi spesifik (ARDS berat vs RDS neonatal ringan vs kondisi jantung dengan shunt), dan harus mengikuti kebijakan/guideline yang relevan dengan diagnosis pasien.</p>

      <h3 id="v8-waveform" className="scroll-mt-4">8.6 Waveform Monitoring: Mengenali Asinkroni dari Kurva</h3>
      <p className="text-xs italic text-slate-500 dark:text-slate-400">(Detail troubleshooting lengkap ada di Bab 9; bagian ini fokus pada bagaimana asinkroni tampil di monitoring visual.)</p>
      <p>
        Asinkroni pasien-ventilator (PVA) adalah ketidaksesuaian antara kebutuhan pasien — dari segi waktu, flow, volume, atau tekanan — dengan ventilator yang menyuplai kebutuhan tersebut selama ventilasi mekanik. Ini fenomena umum, dengan angka kejadian berkisar 10% hingga 85%. PVA dapat diidentifikasi melalui monitoring grafis ventilator berupa gelombang tekanan dan flow.
      </p>
      <p>Karena ini adalah <strong>kemampuan monitoring inti</strong> yang harus dikuasai klinisi ranjang, tanda visual kunci di layar ventilator:</p>
      <ul className="list-disc list-inside space-y-1 text-sm mb-0">
        <li><strong>Ineffective effort:</strong> terlihat sebagai lekukan kecil pada kurva tekanan/flow tanpa napas terkirim (usaha pasien &quot;tenggelam&quot;, tidak memicu napas).</li>
        <li><strong>Double triggering:</strong> dua napas berurutan tanpa ekspirasi penuh di antaranya.</li>
        <li><strong>Flow starvation:</strong> kurva tekanan tampak cekung ke dalam (&quot;scooped out&quot;) selama fase inspirasi pada mode volume control — tanda flow yang diset tidak memenuhi demand pasien.</li>
        <li><strong>Cycling asynchrony (premature/delayed):</strong> terlihat dari ketidaksesuaian antara akhir usaha inspirasi pasien (terlihat dari flow) dengan waktu ventilator mengakhiri inspirasi.</li>
      </ul>

      <h3 id="v8-compliance" className="scroll-mt-4">8.7 Compliance dan Resistance — Cara Ventilator Menghitung dan Interpretasi Tren</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.7.1 Hold Maneuver sebagai Alat Pengukuran</h4>
      <p>Manual Bellavista mendemonstrasikan cara konkret ventilator mengukur mekanika paru menggunakan <strong>Hold Maneuver</strong> — tombol yang menghentikan ventilasi sesaat di akhir inspirasi atau ekspirasi:</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Jenis Hold</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Durasi Maksimal</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Parameter yang Diukur</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">HoldInsp (akhir inspirasi)</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">Adult/Pediatric ≤10 detik; <strong>Neonatal ≤3 detik</strong></td>
              <td className="p-2 text-slate-600 dark:text-slate-400">PPlateau, CStat, RInsp, ΔPTAStat, CCW, CTA, PTAStat</td>
            </tr>
            <tr>
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">HoldExp (akhir ekspirasi)</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">—</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">P0.1, NIF, AutoPEEP, VTrapped, PEEPTA</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Catatan penting dari manual:</strong> bila TInsp relatif besar dan flow sudah mendekati nol di akhir inspirasi, parameter HoldInsp tidak dapat diukur secara akurat — relevan mengingat time constant neonatal yang sangat pendek (Bab 1.2.3), di mana flow memang cenderung sudah mendekati nol lebih awal pada paru compliance rendah.
      </p>
      <p><strong>Batasan durasi hold neonatal yang jauh lebih singkat (≤3 detik vs ≤10 detik dewasa/pediatrik)</strong> adalah pengamanan eksplisit terhadap risiko instabilitas neonatus selama periode tanpa ventilasi aktif — contoh konkret bagaimana desain alat mempertimbangkan cadangan fisiologis rendah pada neonatus (Bab 1.3).</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.7.2 HoldExp untuk Deteksi Air Trapping</h4>
      <p>HoldExp secara spesifik dirancang untuk mendeteksi <strong>AutoPEEP</strong> dan <strong>VTrapped</strong> (volume gas yang terperangkap) — parameter esensial untuk mendeteksi air trapping sebelum menjadi masalah klinis signifikan (Bab 9).</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.7.3 Interpretasi Tren, Bukan Nilai Tunggal</h4>
      <p className="mb-0">
        Compliance dan resistensi paling bermakna secara klinis <strong>sebagai tren</strong>, bukan angka absolut tunggal — penurunan compliance progresif dapat menandakan perburukan penyakit paru (ARDS memberat, atelektasis) atau masalah mekanis (ETT tersumbat parsial), sementara peningkatan mendadak dapat menandakan perbaikan klinis nyata atau, sebaliknya, kebocoran sirkuit yang membuat pengukuran tidak valid.
      </p>

      <h3 id="v8-alarm" className="scroll-mt-4">8.8 Alarm Ventilator: Kategori, Penyebab Umum, Respons Klinis</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.8.1 Tiga Prioritas Alarm (Contoh Konkret: Bellavista)</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Prioritas</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Sinyal</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Contoh Situasi</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Tinggi', 'Nada alarm kontinu, lampu alarm merah — tindakan segera diperlukan untuk mencegah situasi mengancam nyawa', 'Diskoneksi, apnea, tekanan sangat tinggi'],
              ['Sedang', 'Nada alarm intermiten, lampu alarm kuning — tindakan cepat diperlukan dalam waktu yang wajar', 'Leak tinggi, kecenderungan parameter menyimpang'],
              ['Info', 'Nada singkat, lampu biru — informasi, tidak perlu tindakan segera namun tetap perlu diperhatikan', 'Perubahan status non-kritis'],
            ].map(([p, s, c], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{p}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{s}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-l-4 border-rose-300 dark:border-rose-700 pl-4 py-1 text-sm font-medium italic bg-rose-50/50 dark:bg-rose-950/10 rounded-r-lg">
        <strong>Prinsip keselamatan eksplisit dari manual:</strong> &quot;Sesuaikan pengaturan alarm dan volume alarm dengan tepat. Kegagalan melakukannya akan mengakibatkan alarm yang tidak adekuat pada situasi darurat. Jangan gunakan pengaturan alarm yang belum disesuaikan, karena ini dapat mencegah aktivasi alarm dalam keadaan darurat. Jika alarm terjadi berulang tanpa alasan jelas, bellavista harus ditarik dari pelayanan.&quot;
      </p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.8.2 Kategori Umum Alarm (Lintas Platform Ventilator)</h4>
      <p>Alarm prioritas tinggi menandakan ancaman langsung terhadap keselamatan pasien, seperti apnea, tekanan jalan napas tinggi, atau diskoneksi sirkuit. Alarm prioritas rendah memberi tahu klinisi mengenai masalah yang meski perlu diperhatikan, tidak menimbulkan risiko langsung, seperti baterai lemah, laju napas tinggi, atau CPAP rendah.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Alarm</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Penyebab Umum</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Respons Awal</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Tekanan jalan napas tinggi', 'Selang ventilator tersumbat, bronkospasme, sumbatan mukus, asinkroni pasien-ventilator, atau masalah paru seperti pneumotoraks', 'Cek pasien dulu, auskultasi, pertimbangkan suction'],
              ['Tekanan jalan napas rendah', 'Biasanya menandakan diskoneksi atau kebocoran sirkuit', 'Cek sambungan sirkuit, cek cuff ETT (bila ada)'],
              ['Tidal volume ekshalasi tinggi', 'Hiperventilasi atau setting ventilator yang tidak tepat', 'Evaluasi setting vs kondisi klinis'],
              ['PEEP rendah', 'Kebocoran sirkuit pasien, inflasi cuff ETT tidak adekuat', 'Cek cuff, cek sambungan'],
              ['Tidal volume ekshalasi rendah', 'Obstruksi jalan napas, ETT, sirkuit ventilator, atau kebocoran sirkuit pasien', 'Auskultasi, cek patensi ETT'],
              ['Konsentrasi oksigen rendah', 'Masalah suplai oksigen seperti tangki kosong, sambungan longgar, atau error sensor oksigen', 'Cek sumber gas, kalibrasi sensor'],
              ['Apnea/laju napas rendah', 'Oversedasi, masalah neurologis, atau perburukan penyakit yang sedang berlangsung', 'Evaluasi status neurologis dan sedasi pasien'],
            ].map(([a, p, r], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{a}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{p}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.8.3 Prinsip Respons Sistematis terhadap Alarm</h4>
      <p>
        Saat alarm ventilator berbunyi, klinisi harus menggunakan urutan bedside yang konsisten untuk mengevaluasi masalah secara efisien. Pendekatan ini mendukung intervensi cepat sambil meminimalkan kepanikan dan kebingungan. Langkah pertama selalu adalah melihat pasien: periksa pengembangan dada, warna kulit, saturasi oksigen, denyut jantung, usaha napas, dan kenyamanan keseluruhan pasien. Jika pasien tampak tidak stabil atau ventilasi tidak dapat dipastikan, melepaskan pasien dari ventilator dan melakukan ventilasi manual dengan resuscitation bag mungkin menjadi tindakan paling aman.
      </p>
      <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-800/30 rounded-xl p-4 text-sm">
        <ol className="text-xs text-rose-700 dark:text-rose-400 space-y-1.5 list-decimal list-inside m-0">
          <li><strong>Lihat pasien</strong> — bukan layar — terlebih dahulu.</li>
          <li><strong>Identifikasi alarm spesifik</strong> yang aktif di layar.</li>
          <li><strong>Nilai stabilitas</strong> — bila tidak stabil/ventilasi tak pasti, lepas dari ventilator dan lakukan bagging manual sambil memanggil bantuan.</li>
          <li><strong>Cari penyebab</strong> sesuai kategori alarm (tabel 8.8.2).</li>
          <li><strong>Koreksi penyebab</strong>, bukan hanya membisukan/menaikkan batas alarm tanpa evaluasi.</li>
        </ol>
      </div>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.8.4 Peringatan Eksplisit: Jangan Menaikkan Batas Alarm Tanpa Alasan Jelas</h4>
      <p className="border-l-4 border-rose-300 dark:border-rose-700 pl-4 py-1 text-sm font-medium italic bg-rose-50/50 dark:bg-rose-950/10 rounded-r-lg">
        Batas alarm frekuensi tinggi tidak boleh dinaikkan tanpa alasan yang jelas — prinsip ini berlaku universal lintas semua jenis alarm: <strong>menaikkan ambang alarm untuk &quot;menghilangkan gangguan&quot; tanpa mengoreksi akar masalah adalah anti-pattern berbahaya</strong> yang menghilangkan lapisan keselamatan tanpa menyelesaikan masalah sesungguhnya.
      </p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.8.5 Fitur Manajemen Alarm di Bellavista</h4>
      <ul className="list-disc list-inside space-y-1.5 text-sm">
        <li><strong>Autoset:</strong> menyesuaikan pengaturan alarm otomatis ke situasi ventilasi saat ini — hanya gunakan bila situasi ventilasi aman dan stabil.</li>
        <li><strong>Autoset Leakage</strong> (khusus neonatal): menyesuaikan alarm leak tinggi selama ventilasi nCPAP/nIPPV — relevan mengingat kebocoran adalah hal umum pada interface nasal neonatal (Bab 3, Bab 6.8.1).</li>
        <li><strong>Alarm silence:</strong> pembisuan sementara (2 menit) — namun <strong>alarm failsafe ventilator (TF300) tetap dapat membunyikan alarm</strong> bahkan selama periode silence.</li>
        <li><strong>Alarm log:</strong> seluruh alarm yang terjadi tersimpan, <strong>tetap utuh bahkan saat kegagalan daya</strong> — penting untuk rekonstruksi kejadian pasca-insiden dan audit keselamatan.</li>
      </ul>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.8.6 Alarm Fatigue — Risiko yang Harus Diwaspadai</h4>
      <p className="mb-0">
        ICU terus menghadapi tantangan alarm fatigue meski sudah bertahun-tahun berupaya mengatasinya. Studi menunjukkan 72% hingga 99% alarm tergolong alarm palsu atau secara klinis tidak relevan. Ini bukan alasan untuk mengabaikan alarm, melainkan <strong>alasan kuat untuk penyesuaian alarm yang tepat dan spesifik-pasien</strong> sejak awal (menggunakan Autoset saat kondisi stabil, menyesuaikan batas sesuai kondisi klinis aktual) — bukan menaikkan ambang secara serampangan.
      </p>

      <h3 id="v8-lanjut" className="scroll-mt-4">8.9 Lung Recruitment Tool dan Esophageal Pressure Monitoring (Fitur Lanjutan)</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.9.1 Lung Recruitment Tool — Monitoring Selama Maneuver</h4>
      <p>Selama maneuver rekrutmen paru/pengukuran, sebagian besar alarm pasien disupresi sementara — namun beberapa alarm spesifik tetap memonitor maneuver itu sendiri:</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Alarm</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Fungsi</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Maneuver running', 'Menandakan maneuver aktif, alarm pasien tertentu disupresi selama periode ini'],
              ['Maneuver aborted', 'Maneuver dihentikan otomatis atau oleh pengguna — termasuk bila tekanan jalan napas melebihi PMax+10 mbar'],
              ['Occlusion compliance too low', 'Compliance sangat rendah selama inflasi — indikasi kemungkinan oklusi'],
              ['Occlusion deflation', 'Maneuver gagal menurunkan tekanan selama deflasi'],
            ].map(([a, f], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{a}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{f}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs italic text-slate-500 dark:text-slate-400">Parameter monitoring: loop pressure-volume, dV (volume hysteresis), dVMax, VInsp, VPEEP, VRecruit, CCursor (compliance antara dua kursor yang diset manual, terpisah untuk inflasi dan deflasi).</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">8.9.2 Esophageal Pressure Monitoring (Pes/Paux)</h4>
      <p>Interface Paux pada Bellavista dapat menampilkan tekanan auksiler tambahan, memungkinkan pengukuran dan kalkulasi <strong>tekanan esofageal/transpulmoner</strong> menggunakan kateter balon berisi udara. Tombol <strong>PTP/PTA</strong> memungkinkan input diameter ETT/trakeostomi untuk parameter tekanan transalveolar yang dikompensasi resistensi.</p>
      <p className="mb-0"><strong>Signifikansi klinis:</strong> pengukuran tekanan esofageal adalah metode paling akurat untuk mengestimasi tekanan pleura, memungkinkan perhitungan <strong>tekanan transpulmoner sesungguhnya</strong> (bukan hanya tekanan jalan napas) — relevan pada pasien dengan compliance dinding dada abnormal (distensi abdomen berat, edema anasarka) di mana tekanan jalan napas saja bisa menyesatkan penilaian risiko overdistensi paru.</p>
    </>
  );
}
