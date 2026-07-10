import TocNav from '../../TocNav';

export default function Body() {
  return (
    <>
      <TocNav
        items={[
          { id: 'v5-anatomi', label: '5.1 Anatomi Ventilator: Sirkuit, Sensor, Katup' },
          { id: 'v5-variabel', label: '5.2 Variabel Kontrol: Tekanan vs Volume vs Waktu' },
          { id: 'v5-tlc', label: '5.3 Trigger, Limit, Cycle' },
          { id: 'v5-waveform', label: '5.4 Waveform Dasar: Kurva dan Loop' },
        ]}
      />

      <h3 id="v5-anatomi" className="scroll-mt-4">5.1 Anatomi Ventilator: Sirkuit, Sensor Flow, Katup Inspirasi/Ekspirasi</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">5.1.1 Komponen Fungsional Universal</h4>
      <p>Terlepas dari merek, semua ventilator modern memiliki komponen fungsional yang sama:</p>
      <ol className="list-decimal list-inside space-y-1.5 text-sm">
        <li><strong>Sumber gas</strong> — kompresor internal atau suplai gas dinding (udara + oksigen), dicampur (blender) sesuai FiO₂ yang diset.</li>
        <li><strong>Katup inspirasi</strong> — mengatur aliran gas masuk ke pasien sesuai variabel kontrol yang diset (tekanan/volume/flow).</li>
        <li><strong>Sirkuit pasien</strong> — jalur pipa yang menghubungkan ventilator ke ETT/interface pasien; bisa single-limb atau dual-limb.</li>
        <li><strong>Sensor</strong> — flow sensor, tekanan (proksimal dan/atau di mesin), oksigen (O₂ sensor), kadang CO₂/kapnografi.</li>
        <li><strong>Katup ekspirasi</strong> — mengatur pelepasan gas saat ekspirasi, juga menjaga PEEP tetap terkontrol.</li>
        <li><strong>Unit kontrol/prosesor</strong> — mikroprosesor yang menjalankan algoritma mode ventilasi dan menampilkan monitoring.</li>
      </ol>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">5.1.2 Contoh Konkret: Komponen Fisik Bellavista</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Komponen Universal</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Implementasi di Bellavista</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Sensor flow', 'Flow sensor terpasang di sirkuit dekat pasien (khusus neonatal: flow sensor neonatal 301.470.010 dengan kalibrasi wajib sebelum pemakaian)'],
              ['Sensor tekanan proksimal', 'Connector khusus untuk pengukuran tekanan proksimal (dekat pasien) — meningkatkan akurasi pengukuran tekanan aktual di jalan napas pasien'],
              ['Sensor oksigen', 'O₂ sensor internal (memerlukan kalibrasi berkala — sensor O₂ tidak terkalibrasi dapat menyebabkan pengukuran salah dan alarm tidak adekuat)'],
              ['Katup ekspirasi', 'Expiratory valve terpisah (atau dual limb adapter sebagai alternatif)'],
              ['Interface eksternal', 'Port untuk sensor SpO₂ dan sensor CO₂ eksternal, data communication interface, USB, Ethernet'],
              ['Unit kontrol', 'Layar sentuh (touch-screen) sebagai antarmuka utama monitoring dan setting'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-l-4 border-sky-300 dark:border-sky-700 pl-4 py-1 text-sm font-medium italic bg-sky-50/50 dark:bg-sky-950/10 rounded-r-lg mb-0">
        <strong>Catatan human-factors penting:</strong> manual secara eksplisit mewajibkan <strong>quick check</strong> sebelum setiap penggunaan, dan menyatakan bahwa sensor O₂ dan CO₂ yang tidak terkalibrasi dapat menghasilkan pengukuran salah dan alarm yang tidak adekuat — contoh nyata bagaimana kalibrasi rutin bukan sekadar SOP administratif, melainkan pencegahan aktif kesalahan pengukuran klinis yang bisa fatal.
      </p>

      <h3 id="v5-variabel" className="scroll-mt-4">5.2 Variabel Kontrol Ventilator: Tekanan vs Volume vs Waktu</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">5.2.1 Konsep Dasar</h4>
      <p>Variabel kontrol adalah parameter yang <strong>dijaga konstan oleh ventilator</strong> sepanjang fase inspirasi, dan menjadi basis klasifikasi mode ventilasi:</p>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Volume Control (VC):</strong> ventilator menjaga volume tidal yang dihantarkan tetap konstan; tekanan yang dihasilkan bervariasi tergantung compliance/resistance pasien saat itu.</li>
        <li><strong>Pressure Control (PC):</strong> ventilator menjaga tekanan puncak/target tetap konstan; volume yang dihasilkan bervariasi tergantung compliance/resistance pasien.</li>
        <li><strong>Dual/hybrid (mis. PRVC, TargetVent):</strong> ventilator menargetkan volume tertentu namun mengantarkannya menggunakan mekanisme pressure-limited, menyesuaikan tekanan otomatis breath-per-breath untuk mencapai volume target.</li>
      </ul>
      <p>
        Pada mode volume-controlled, gelombang flow inspirasi umumnya konstan (rectangular); pada mode pressure-controlled, gelombang flow inspirasi berbentuk penurunan eksponensial — perbedaan bentuk gelombang ini adalah &quot;sidik jari visual&quot; yang membedakan mode di layar monitoring (Bab 8).
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">5.2.2 Rise Time — Parameter yang Sering Diabaikan</h4>
      <p className="mb-0">
        Kebanyakan ventilator modern memungkinkan pengaturan waktu yang dibutuhkan mesin untuk mencapai tekanan limit yang diprogram — parameter ini disebut &quot;rise time&quot;; bila ingin mesin mem-pressurize sistem lebih cepat, rise time harus dipersingkat. Rise time yang terlalu cepat pada neonatus dapat menyebabkan lonjakan tekanan awal berlebihan; terlalu lambat dapat membuat pasien &quot;bekerja&quot; lebih keras di awal inspirasi (asinkroni, Bab 9).
      </p>

      <h3 id="v5-tlc" className="scroll-mt-4">5.3 Trigger, Limit, Cycle — Tiga Pilar Siklus Napas Ventilator</h3>
      <p>Ini adalah kerangka konseptual paling penting untuk memahami <em>bagaimana</em> ventilator &quot;memutuskan&quot; kapan memulai napas, seberapa besar, dan kapan mengakhirinya.</p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">5.3.1 Trigger — Apa yang Memulai Inspirasi</h4>
      <p>Variabel trigger digunakan untuk memulai inspirasi. Trigger dapat berupa waktu, flow, tekanan, atau volume — variabel ini menentukan apakah suatu napas bersifat &quot;mandatory&quot; (dipicu mesin) atau &quot;spontan&quot; (dipicu pasien).</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Jenis Trigger</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Mekanisme</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Contoh Napas</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Time-triggered', 'Mesin yang memutuskan kapan napas diberikan — timer yang memicu', 'Napas mandatory terjadwal (rate backup pada SIMV)'],
              ['Flow-triggered', 'Ventilator mendeteksi perubahan flow akibat usaha inspirasi pasien', 'Napas spontan/assist'],
              ['Pressure-triggered', 'Ventilator mendeteksi penurunan tekanan sirkuit akibat usaha inspirasi pasien', 'Napas spontan/assist (mode lama)'],
            ].map(([j, m, c], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{j}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{m}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-l-4 border-sky-300 dark:border-sky-700 pl-4 py-1 text-sm font-medium italic bg-sky-50/50 dark:bg-sky-950/10 rounded-r-lg">
        <strong>Peringatan klinis:</strong> bila sensitivitas ventilator diset terlalu tinggi (terlalu sensitif), ventilator dapat secara tidak sengaja mendeteksi kebocoran minor di sirkuit dan memicu napas otomatis padahal tidak dibutuhkan (auto-triggering) — risiko ini <strong>jauh lebih relevan pada neonatal/NIV</strong> karena kebocoran (leak) di sekitar prong/mask adalah hal umum, bukan pengecualian.
      </p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">5.3.2 Limit — Batas Selama Inspirasi (Bukan Mengakhiri Napas)</h4>
      <p>
        Variabel limit merepresentasikan nilai maksimum yang dapat dicapai suatu parameter selama fase inspirasi napas mekanik. Ini membatasi variabel tersebut, namun tidak mengakhiri fase inspirasi — inilah ciri khas yang mendefinisikan variabel limit, berbeda dari variabel kontrol atau variabel cycle. Berbeda dengan variabel kontrol atau cycle, beberapa limit dapat berlaku bersamaan selama fase inspirasi.
      </p>
      <p>
        Contoh konkret: pada mode volume control dengan batas tekanan (pressure limit) diset 30 cmH₂O — bila tekanan mencapai 30 sebelum volume tidal tercapai, ketika limit volume tercapai, aliran inspirasi berhenti (ventilator menutup katup inspirasi), namun fase ekspirasi tidak langsung dimulai; jika mode bersifat time-cycled, pasien akan &quot;menahan napas&quot; hingga waktu yang ditentukan berlalu — sehingga secara efektif terjadi jeda inspirasi singkat.
      </p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">5.3.3 Cycle — Apa yang Mengakhiri Inspirasi (Memulai Ekspirasi)</h4>
      <p>Variabel cycling adalah mekanisme yang digunakan untuk mengakhiri inspirasi dan memulai ekspirasi; waktu dan flow adalah setting paling umum untuk variabel ini, meski ventilasi volume-cycled dan pressure-cycled juga dimungkinkan.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Jenis Cycle</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Kapan Ekspirasi Dimulai</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Time-cycled', 'Setelah waktu inspirasi (Ti) yang diset tercapai — umum pada PCV neonatal'],
              ['Volume-cycled', 'Setelah volume tidal target tercapai — umum pada VCV'],
              ['Flow-cycled', 'Setelah flow inspirasi turun ke persentase tertentu dari flow puncak — umum pada pressure support (PSV)'],
            ].map(([j, k], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{j}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{k}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">5.3.4 Contoh Terapan: Membedah Sebuah Mode</h4>
      <p className="mb-0">
        Contoh Volume Control-Assist Control (V-A/C) napas mandatory: trigger variable pada napas terkontrol adalah waktu — setiap kali interval waktu tertentu berlalu (mis. 6 detik untuk rate 10x/menit), napas baru dipicu. Limit variable adalah flow rate yang diset (mis. 60 L/menit) — nilai ini yang akan dicapai selama inspirasi dan tidak akan melebihi itu. Yang meng-cycle napas dari inspirasi ke ekspirasi adalah volume — ketika volume yang diset tercapai, terjadi perpindahan ke ekspirasi. Pada napas assist (dipicu pasien), trigger variable bukan lagi waktu melainkan diinisiasi oleh pasien — ventilator diset untuk mendeteksi flow tertentu (mis. 3 L/menit) atau perubahan tekanan tertentu sebagai sinyal trigger.
      </p>

      <h3 id="v5-waveform" className="scroll-mt-4">5.4 Waveform Dasar: Kurva dan Loop</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">5.4.1 Empat Fase Siklus Napas pada Grafik</h4>
      <p>
        Napas yang dihantarkan ventilator mekanik didefinisikan oleh empat fase: fase trigger (bagaimana napas dimulai), fase inspirasi (bagaimana napas dihantarkan), fase cycle (bagaimana inspirasi berakhir dan ekspirasi dimulai), dan fase ekspirasi (tekanan baseline selama periode antar napas). Banyak aspek dari keempat fase ini dapat diubah melalui pengaturan ventilator, dan dengan bantuan waveform, setting optimal dapat dicapai untuk memventilasi pasien dengan baik serta mengurangi asinkroni.
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">5.4.2 Tiga Kurva Skalar Utama</h4>
      <ol className="list-decimal list-inside space-y-1.5 text-sm">
        <li><strong>Kurva Tekanan-Waktu</strong> — menunjukkan tekanan jalan napas sepanjang siklus napas; bentuknya berbeda jelas antara PC (kotak/persegi, mencapai plateau cepat) vs VC (naik lebih gradual sesuai resistance-compliance pasien).</li>
        <li><strong>Kurva Flow-Waktu</strong> — menunjukkan laju aliran gas; bentuk konstan (persegi) pada VC klasik, bentuk menurun eksponensial pada PC.</li>
        <li><strong>Kurva Volume-Waktu</strong> — menunjukkan volume terkumpul sepanjang inspirasi-ekspirasi; idealnya kembali ke baseline di akhir ekspirasi (bila tidak, indikasi air trapping — Bab 9).</li>
      </ol>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">5.4.3 Loop P-V dan F-V</h4>
      <ul className="list-disc list-inside space-y-1 text-sm mb-0">
        <li><strong>Loop Pressure-Volume (P-V):</strong> menggambarkan hubungan tekanan-volume sepanjang siklus; bentuknya membantu menilai compliance dan mendeteksi overdistensi (terbentuk &quot;beak&quot;/paruh di ujung atas loop bila terjadi overdistensi — sinyal peringatan penting pada strategi lung-protective).</li>
        <li><strong>Loop Flow-Volume (F-V):</strong> membantu menilai resistensi jalan napas dan mendeteksi air trapping/obstruksi.</li>
      </ul>

      <p className="border-l-4 border-indigo-300 dark:border-indigo-700 pl-4 py-1 text-sm font-medium italic bg-indigo-50/50 dark:bg-indigo-950/10 rounded-r-lg mb-0">
        Pemahaman trigger-limit-cycle dan variabel kontrol pada bab ini menjadi <strong>fondasi wajib</strong> sebelum mempelajari Bab 6 (Mode-Mode Ventilator) — karena setiap mode (VCV, PCV, PSV, SIMV, dst.) pada dasarnya adalah <strong>kombinasi spesifik</strong> dari ketiga variabel fase ini.
      </p>
    </>
  );
}
