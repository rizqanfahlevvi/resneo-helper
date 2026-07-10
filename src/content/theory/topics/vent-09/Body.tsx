import TocNav from '../../TocNav';

export default function Body() {
  return (
    <>
      <TocNav
        items={[
          { id: 'v9-sistematis', label: '9.1 Pendekatan Sistematis Pasien Memburuk di Ventilator' },
          { id: 'v9-asinkroni', label: '9.2 Asinkroni Pasien-Ventilator' },
          { id: 'v9-autopeep', label: '9.3 Auto-PEEP / Air Trapping' },
          { id: 'v9-hipoksemia', label: '9.4 Penanganan Hipoksemia Refrakter' },
          { id: 'v9-hiperkapnia', label: '9.5 Penanganan Hiperkapnia/Asidosis Respiratorik' },
        ]}
      />

      <h3 id="v9-sistematis" className="scroll-mt-4">9.1 Pendekatan Sistematis Pasien Memburuk di Ventilator</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.1.1 Mnemonic DOPE(S) — Diagnosis Cepat</h4>
      <p>
        Ketika hipoksia terjadi setelah intubasi dan tidak segera terdeteksi, kondisi dapat berujung fatal dengan cepat tanpa intervensi dini. Pendekatan terstruktur untuk mengidentifikasi dan menangani penyebab dasar secara bersamaan sangat penting. Mnemonic yang membantu adalah &quot;DOPE&quot;: displacement (perpindahan) atau obstruksi ETT, pneumotoraks, dan kegagalan ventilator/peralatan.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Huruf</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Arti</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Penjelasan</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['D', 'Displacement (perpindahan ETT)', 'Terdeteksi melalui tanda klinis seperti perubahan suara napas, kesulitan memventilasi pasien, perubahan mendadak saturasi oksigen, dan perubahan pembacaan kapnografi'],
              ['O', 'Obstruction (obstruksi)', 'Sumbatan pada ETT — mukus, darah, kinking, atau pasien menggigit tube'],
              ['P', 'Pneumothorax', 'Terutama dicurigai bila tekanan tinggi mendadak disertai suara napas asimetris'],
              ['E', 'Equipment failure (kegagalan alat)', 'Masalah terkait ventilator atau peralatan terkait yang dapat mengganggu penghantaran ventilasi efektif — mencakup malfungsi setting, software, atau kegagalan hardware'],
              ['S (opsional)', 'Stacking/breath stacking (auto-PEEP)', 'Ditambahkan pada beberapa versi mnemonic untuk mencakup air trapping'],
            ].map(([h, a, p], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-black text-rose-600 dark:text-rose-400">{h}</td>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{a}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{p}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <strong>Ekstensi &quot;R&quot; untuk Kasus Spesifik:</strong> &quot;R&quot; untuk rigidity (kekakuan dinding dada) — komplikasi terkait pemberian opioid tertentu seperti fentanyl, khususnya bila diberikan cepat dan dosis tinggi, dapat menyebabkan kekakuan otot dinding dada yang mengganggu kemampuan bernapas efektif. Meski lebih sering dijelaskan pada pasien pediatrik dan dosis anestesi, kekakuan dinding dada dapat terjadi bahkan pada dosis analgesik fentanyl — <strong>relevan khusus untuk PICU/NICU</strong> mengingat penggunaan opioid pada sedasi neonatal/pediatrik.
      </p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.1.2 Mnemonic DOTTS — Tindakan Perbaikan</h4>
      <p>Setelah DOPE(S) mengidentifikasi kemungkinan penyebab, <strong>DOTTS</strong> memandu tindakan korektif langkah demi langkah:</p>
      <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-800/30 rounded-xl p-4 text-sm">
        <ul className="text-xs text-rose-700 dark:text-rose-400 space-y-1.5 list-none m-0">
          <li><strong>D</strong> - Disconnect: lepaskan dari ventilator dan berikan tekanan ringan pada dada pasien.</li>
          <li><strong>O</strong> - Oxygen: berikan oksigen 100% via bag-valve-mask, perhatikan pengembangan dada, dengarkan dan rasakan kebocoran cuff.</li>
          <li><strong>T</strong> - Tube position and patency: masukkan bougie atau lakukan suction menyeluruh melalui tube untuk menyingkirkan obstruksi.</li>
          <li><strong>T</strong> - Tweak the vent: biasanya perlu menurunkan laju napas, memperpendek waktu inspirasi dengan mengubah rasio I:E (terkait breath stacking).</li>
          <li><strong>S</strong> - Sonography and CXR: USG paru bedside dan rontgen toraks untuk konfirmasi diagnosis definitif.</li>
        </ul>
      </div>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.1.3 Prinsip Fundamental: Jangan Abaikan Alarm</h4>
      <p>Tidak ada alarm ventilator yang berbunyi tanpa alasan — setiap dan semua alarm harus diinvestigasi. Alarm yang mengindikasikan situasi mengancam nyawa dapat diinvestigasi melalui pemeriksaan klinis: pengembangan dada, suara napas, saturasi oksigen, dan kapnografi.</p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.1.4 Membedakan Peak Pressure vs Plateau Pressure sebagai Kunci Diagnostik</h4>
      <p>Tekanan puncak (peak pressure) adalah tekanan seluruh sistem (ventilator, ETT, trakea, bronkus, bronkiolus, alveolus). Tekanan puncak tinggi tidak selalu berarti barotrauma. Tekanan plateau diperiksa dengan tombol hold inspirasi pada ventilator (Bab 8.7.1 — HoldInsp Bellavista).</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Pola</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Interpretasi</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Contoh Penyebab</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Peak pressure tinggi, Plateau normal', 'Masalah pada ventilator, ETT, atau bronkokonstriksi (penyakit jalan napas reaktif/asma/PPOK)', 'Sumbatan parsial ETT, bronkospasme, sekret'],
              ['Peak pressure tinggi, Plateau juga tinggi', 'Masalah compliance paru/dinding dada', 'ARDS memberat, pneumotoraks, distensi abdomen berat'],
            ].map(([p, itp, c], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{p}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{itp}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 id="v9-asinkroni" className="scroll-mt-4">9.2 Asinkroni Pasien-Ventilator: Jenis dan Tata Laksana</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.2.1 Klasifikasi Berdasarkan Fase Siklus Napas</h4>
      <p>
        Terdapat kesepakatan mengenai keberadaan 7 jenis asinkroni pasien-ventilator: ineffective effort, double trigger, premature cycling, delayed cycling, reverse triggering, flow starvation, dan auto-cycling. Klasifikasi berdasarkan fase siklus napas: asinkroni fase triggering (ineffective effort/delayed triggering, auto-triggering, double triggering, reverse triggering); asinkroni fase penghantaran flow (flow starvation pada ventilasi volume-controlled, dan pressurisasi tidak adekuat — rise time terlalu lambat pada pressure support); asinkroni fase cycling (late cycling dan premature cycling).
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.2.2 Tabel Jenis, Penyebab, dan Tata Laksana</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Jenis Asinkroni</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Mekanisme</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Tampilan di Waveform</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Tata Laksana Prinsip</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Ineffective effort/triggering', 'Usaha otot inspirasi pasien gagal memicu ventilator — jenis tersering, terjadi pada 45% pasien dengan penyakit neuromuskular', 'Lekukan kecil pada kurva tekanan/flow tanpa napas terkirim', 'Turunkan ambang trigger sensitivity (bila memungkinkan tanpa memicu auto-trigger); evaluasi auto-PEEP yang mungkin menyembunyikan usaha pasien'],
              ['Auto-triggering (auto-cycling)', 'Ventilator menghantarkan napas melebihi kebutuhan pasien; dapat diakibatkan oleh osilasi kardiak', 'Napas triggered tanpa usaha pasien yang jelas', 'Sesuaikan trigger sensitivity, cek kebocoran sirkuit (terutama NIV — Bab 5.3.1)'],
              ['Double triggering (breath stacking)', 'Ventilator menghantarkan 2 napas berurutan, dengan atau tanpa ekspirasi penuh di antaranya, akibat demand ventilasi pasien yang tinggi', 'Dua napas berdempetan tanpa jeda ekspirasi lengkap', 'Perpanjang TInsp bila neural inspiratory time pasien lebih panjang dari TInsp yang diset; evaluasi kecukupan sedasi'],
              ['Flow starvation', 'Penghantaran gas tidak sepenuhnya memenuhi demand ventilasi pasien akibat aliran udara tidak mencukupi dan/atau usaha inspirasi tinggi', 'Waveform tekanan terdistorsi (bentuk cekung ke dalam)', 'Naikkan flow rate/rise time pada mode volume control'],
              ['Delayed cycling', 'Waktu inspirasi yang diset ventilator melebihi kebutuhan neurologis pasien', 'Inspirasi tetap berlanjut meski usaha pasien sudah selesai', 'Persingkat TInsp/TInsp Max, atau naikkan exp trigger sensitivity pada PSV'],
              ['Premature cycling', 'Ventilator mengakhiri napas lebih cepat dari waktu inspirasi neural yang dibutuhkan pasien', 'Napas terpotong sebelum usaha pasien selesai', 'Perpanjang TInsp/TInsp Max'],
            ].map(([j, m, w, t], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{j}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{m}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{w}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.2.3 Signifikansi Klinis</h4>
      <p>
        Asinkroni pasien-ventilator adalah fenomena umum dengan angka kejadian 10-85%, dan karena berhubungan dengan outcome klinis negatif, staf ICU harus secara aktif mencari diagnosis dan penyelesaian cepat masalah ini. Mode ventilasi baru seperti NAVA dan PAV+, serta software untuk deteksi dan kuantifikasi asinkroni otomatis, telah menunjukkan hasil menjanjikan meski belum tersedia luas.
      </p>
      <p className="mb-0"><strong>Relevansi khusus untuk Bellavista:</strong> fitur Auto.Sync (tiga kriteria trigger ekspirasi, Bab 6.4.3) dan mekanisme kompensasi volume otomatis pada mode volume-controlled (Bab 6.2.3) adalah <strong>contoh implementasi teknis</strong> untuk mengurangi asinkroni fase cycling dan flow — memahami mekanismenya membantu klinisi menginterpretasi kapan penyesuaian manual masih diperlukan meski fitur otomatis sudah aktif.</p>

      <h3 id="v9-autopeep" className="scroll-mt-4">9.3 Auto-PEEP / Air Trapping</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.3.1 Mekanisme</h4>
      <p>Breath stacking terjadi ketika waktu ekspirasi tidak adekuat sebelum napas berikutnya dimulai (terutama pada penyakit paru obstruktif); breath stacking membangun peningkatan tekanan intratoraks dan mencegah pengisian jantung kanan.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.3.2 Deteksi</h4>
      <p>Metode deteksi utama adalah <strong>HoldExp (end-expiratory hold maneuver)</strong> — Bab 8.7.1, secara spesifik mengukur AutoPEEP dan VTrapped. Tanda tidak langsung: kurva volume-waktu yang tidak kembali ke baseline sebelum napas berikutnya dimulai (Bab 5.4.2).</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.3.3 Tata Laksana</h4>
      <p>Tweak the vent (dari DOTTS) biasanya berarti menurunkan laju napas, memperpendek waktu inspirasi dengan mengubah rasio I:E. Prinsip umum tambahan:</p>
      <ul className="list-disc list-inside space-y-1 text-sm mb-0">
        <li>Perpanjang waktu ekspirasi (turunkan rate, atau percepat flow inspirasi untuk memperpendek TInsp tanpa mengubah rate).</li>
        <li>Pada kasus berat: pertimbangkan sedasi lebih dalam untuk mengurangi demand ventilasi pasien yang berkontribusi pada breath stacking.</li>
        <li>Kaitkan dengan time constant (Bab 1.2.3) — pasien dengan resistensi tinggi (time constant panjang) membutuhkan waktu ekspirasi proporsional lebih panjang.</li>
      </ul>

      <h3 id="v9-hipoksemia" className="scroll-mt-4">9.4 Penanganan Hipoksemia Refrakter</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.4.1 Definisi dan Urutan Eskalasi</h4>
      <p>
        Meski jarang terjadi, ketika hipoksemia refrakter menetap meski sudah diterapkan ventilasi lung-protective dengan PEEP sedang hingga tinggi, direkomendasikan pertama-tama menggunakan maneuver rekrutmen paru dan uji PEEP dekremental; bila tidak menyelesaikan masalah, posisi pronasi harus dicoba. Vasodilator pulmoner aerosolized dapat digunakan untuk &quot;membeli waktu&quot; ketika pendekatan ini gagal, sembari pasien ditransisikan ke extracorporeal membrane oxygenation (ECMO). Terdapat bukti cukup untuk merekomendasikan menghindari penggunaan osilasi frekuensi tinggi dalam manajemen hipoksemia refrakter (catatan: ini konteks dewasa/ARDS umum — HFOV tetap memiliki peran spesifik pada neonatal RDS sebagai lini awal, bukan hanya rescue, Bab 6.7).
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.4.2 Posisi Pronasi</h4>
      <p>
        Ventilasi pronasi sangat efektif untuk pasien dengan hipoksemia refrakter (PaO₂ ≤60 mmHg), akibat kondisi termasuk pneumonia, PARDS, penyakit membran hialin, hipertensi pulmonal neonatal, gagal jantung kongestif, dan gagal napas pasca bedah jantung. Pendekatan ini mengurangi gradien tekanan pleura, menghasilkan tekanan pleura dorsal yang lebih negatif, meningkatkan tekanan transpulmoner, dan memperbaiki permeabilitas alveolar pada pasien dengan penyakit paru berat — juga menginduksi perubahan fisiologis kunci seperti peningkatan FRC melalui rekrutmen alveolar, re-ekspansi paru, perbaikan rasio ventilasi-perfusi, pengurangan shunt paru, dan optimasi PEEP.
      </p>
      <p className="border-l-4 border-rose-300 dark:border-rose-700 pl-4 py-1 text-sm font-medium italic bg-rose-50/50 dark:bg-rose-950/10 rounded-r-lg">
        <strong>Kewaspadaan komplikasi:</strong> sebagian besar komplikasi terkait posisi pronasi muncul saat posisi pasien diubah, termasuk pelepasan tidak sengaja ETT, drain, atau kateter. Posisi pronasi tidak boleh diterapkan pada pasien syok, hipertensi intrakranial tak termonitor, cedera traumatik berat, atau instabilitas spinal.
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.4.3 Recruitment Maneuver</h4>
      <p>
        Recruitment-to-inflation ratio (R/I ratio) adalah maneuver napas tunggal yang dapat dilakukan dengan ventilator manapun, dikembangkan untuk menilai rekrutmen paru pada pasien ARDS — merepresentasikan proporsi volume yang terdistribusi ke paru yang berhasil direkrut dibanding &quot;baby lung&quot; ketika PEEP diubah. Metode ini dapat mengidentifikasi baik risiko atelektrauma (bila PEEP diset rendah pada pasien dengan R/I ratio tinggi) maupun risiko hiperinflasi (bila PEEP diset tinggi).
      </p>
      <p>
        Dua jenis recruitment maneuver yang paling banyak dipelajari: sustained inflation (square wave) dan metode PEEP incremental/staircase. Berdasarkan dua uji klinis besar: pendekatan staircase (uji ART) menemukan lebih banyak kematian dini dan barotrauma, sehingga pendekatan gaya LOVS (breath hold singkat pada tekanan tinggi, FiO₂ 1,0) lebih disarankan dibanding pendekatan staircase yang lebih agresif.
      </p>
      <p className="mb-0"><strong>Kaitan dengan fitur Bellavista:</strong> Lung Recruitment Tool (Bab 8.9.1) menyediakan monitoring terstruktur untuk maneuver ini — parameter dVMax dan CCursor membantu mengidentifikasi titik PEEP optimal sesuai prinsip R/I ratio di atas.</p>

      <h3 id="v9-hiperkapnia" className="scroll-mt-4">9.5 Penanganan Hiperkapnia/Asidosis Respiratorik</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.5.1 Prinsip Permissive Hypercapnia</h4>
      <p>Sebagaimana dibahas di Bab 7.6.2, PALICC-2 memperbolehkan permissive hypercapnia hingga pH 7,20 pada PARDS untuk mempertahankan strategi lung-protective. Prinsip ini berlaku sebagai <strong>trade-off yang disengaja</strong>, bukan kegagalan tata laksana — menerima PaCO₂ lebih tinggi demi menghindari volutrauma/barotrauma dari usaha &quot;mengejar&quot; normokapnia dengan tekanan/volume berlebihan.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.5.2 Langkah Evaluasi Sistematis Hiperkapnia</h4>
      <ol className="list-decimal list-inside space-y-1.5 text-sm">
        <li><strong>Cek mekanik dasar dulu</strong> — apakah TInsp cukup relatif terhadap time constant pasien (Bab 1.2.3)? Apakah ada auto-PEEP yang mengurangi ventilasi efektif (9.3)?</li>
        <li><strong>Cek asinkroni</strong> — ineffective triggering berulang mengurangi minute ventilation efektif meski rate &quot;terlihat&quot; adekuat di layar (9.2).</li>
        <li><strong>Cek ruang rugi mekanik</strong> — sirkuit yang tidak sesuai ukuran pasien (terutama neonatal) menambah dead space signifikan relatif terhadap tidal volume kecil.</li>
        <li><strong>Evaluasi apakah menaikkan rate atau Vt lebih tepat</strong> — mengingat batasan lung-protective (Bab 1, Bab 7), preferensi umum menaikkan rate terlebih dahulu dibanding Vt bila driving pressure sudah mendekati batas aman.</li>
        <li><strong>Bila hiperkapnia berat menetap meski optimasi konvensional</strong> — pertimbangkan eskalasi ke HFOV (Bab 6.7), di mana ventilasi dikontrol independen oleh amplitude dan frekuensi.</li>
      </ol>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">9.5.3 Kapan Menerima vs Mengoreksi Agresif</h4>
      <p className="mb-0">
        Batas pH 7,20 (PALICC-2) bukan angka mutlak universal — pada kondisi dengan hipertensi pulmonal signifikan atau instabilitas hemodinamik berat, asidosis respiratorik dapat memperberat resistensi vaskular paru dan disfungsi ventrikel kanan (Bab 2.3 dan Bab 6.7.5) — sehingga ambang toleransi permissive hypercapnia perlu dipertimbangkan ulang secara individual pada kondisi ini, idealnya melalui diskusi dengan intensivis/kardiologi.
      </p>
    </>
  );
}
