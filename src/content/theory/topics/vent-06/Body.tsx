import TocNav from '../../TocNav';

export default function Body() {
  return (
    <>
      <TocNav
        items={[
          { id: 'v6-klas', label: '6.1 Klasifikasi Mode: Kontrol vs Support vs Kombinasi' },
          { id: 'v6-vc', label: '6.2 Volume Control (VCV, V-A/C, VC-SIMV)' },
          { id: 'v6-pc', label: '6.3 Pressure Control (PCV, P-A/C, PC-SIMV)' },
          { id: 'v6-ps', label: '6.4 Pressure Support (PSV, S, S/T)' },
          { id: 'v6-hybrid', label: '6.5 Target Volume/Hybrid (PRVC/TargetVent)' },
          { id: 'v6-aprv', label: '6.6 APRV' },
          { id: 'v6-hfov', label: '6.7 HFOV' },
          { id: 'v6-neonatal', label: '6.8 Mode Spesifik Neonatal: nCPAP, nIPPV, beLevel' },
          { id: 'v6-atc', label: '6.9 Automatic Tube Compensation (ATC) & Sigh' },
          { id: 'v6-tabel', label: '6.10 Tabel Perbandingan Mode' },
        ]}
      />

      <h3 id="v6-klas" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">6.1 Klasifikasi Mode: Kontrol vs Support vs Kombinasi</h3>
      <p>Menggunakan kerangka trigger-limit-cycle dari Bab 5, semua mode ventilator dapat dipetakan ke dalam tiga kategori napas dasar. Manual Bellavista secara eksplisit membedakan ketiganya:</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kategori Napas</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Definisi</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Karakteristik</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Triggered breath (synchronized)', 'Dipicu oleh usaha napas spontan pasien; terdeteksi via trigger tekanan atau flow', 'Ditampilkan sebagai kurva terisi (filled curve) pada layar Bellavista'],
              ['Mandatory breath (controlled)', 'Dihantarkan mesin pada rate yang diset, tanpa bergantung usaha pasien', 'Ditampilkan sebagai kurva kosong (empty curve) pada layar Bellavista'],
              ['Triggered/Mandatory (intermittent)', 'Kombinasi keduanya — bila pasien tidak trigger napas spontan dalam jendela waktu, napas mandatory tetap dihantarkan', 'Basis dari semua mode "SIMV"'],
            ].map(([k, d, c], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{d}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-0">
        Klasifikasi mode besar berdasarkan <strong>variabel kontrol</strong> (Bab 5.2): <strong>Pressure-controlled</strong> (tekanan konstan, volume bervariasi), <strong>Volume-controlled</strong> (volume konstan, tekanan bervariasi), <strong>Pressure-supported</strong> (sepenuhnya dipicu dan diakhiri pasien), <strong>Hybrid/adaptive</strong> (target volume — kombinasi keduanya dengan algoritma penyesuaian breath-to-breath).
      </p>

      <h3 id="v6-vc" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">6.2 Volume Control (VCV, V-A/C, VC-SIMV)</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.2.1 Prinsip Dasar</h4>
      <p>Pada seluruh mode volume-controlled, <strong>tidal volume adalah variabel yang dijaga konstan</strong>; tekanan jalan napas yang dihasilkan bervariasi tergantung compliance dan resistance pasien saat itu.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.2.2 Implementasi di Bellavista</h4>
      <p>
        <strong>VCV</strong> dan <strong>V-A/C (Volume/Assist-Control)</strong>: napas volume-controlled mandatory dihantarkan pada rate yang diset; pada V-A/C, usaha napas spontan pasien dapat memicu napas terkontrol tambahan. Parameter setting V-A/C: VtInsp (tidal volume), PEEP, Rate, TInsp, Plateau (waktu plateau akhir-inspirasi, dalam % dari cycle time), pressure/flow trigger, pattern aliran inspirasi, dan oksigen.
      </p>
      <p>
        <strong>VC-SIMV</strong> (Volume Controlled – Synchronized Intermittent Mandatory Ventilation): napas volume-controlled mandatory dihantarkan pada rate yang diset; di antara napas mandatory, pasien dapat memicu napas pressure-supported. Napas terkontrol didahului <strong>jendela ekspektasi trigger</strong> (60% dari cycle time, maksimal 10 detik), memungkinkan penghantaran napas yang dipicu pasien secara nyaman tanpa mengorbankan rate yang diset.
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.2.3 Fitur Kompensasi Otomatis (Volume-Controlled Breath, Bellavista)</h4>
      <p>Pada seluruh mode volume-controlled Bellavista, tidal volume diadaptasi berdasarkan <strong>VtCurrent</strong> yang diukur (rata-rata Vt inspirasi dan ekspirasi). Adaptasi dilakukan per-napas, dengan increment dibatasi hingga 30% dari selisih antara volume yang diset dan volume aktual. Keunggulan mekanisme ini:</p>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Kompensasi kebocoran (leak) dan volume nebulizer bahkan pada mode volume-controlled.</li>
        <li>Penghantaran volume akurat berdasarkan pengukuran proksimal (dekat pasien, bukan hanya di mesin).</li>
        <li>Kompensasi otomatis terhadap compliance sirkuit napas.</li>
      </ul>
      <p className="border-l-4 border-violet-300 dark:border-violet-700 pl-4 py-1 text-sm font-medium italic bg-violet-50/50 dark:bg-violet-950/10 rounded-r-lg mb-0">
        <strong>PLV (Pressure Limited Ventilation) selalu aktif</strong> pada mode volume-controlled Bellavista — begitu tekanan inspirasi naik hingga 5 mbar di bawah alarm PPeak yang diset, tekanan dipertahankan pada level tersebut hingga volume tidal tercapai (atau hingga akhir waktu inspirasi yang diset). Ini adalah <strong>contoh konkret pengamanan volutrauma-barotrauma</strong> yang dibangun langsung ke dalam mode volume-controlled — filosofi lung-protective dari Bab 1 diimplementasikan sebagai fitur otomatis perangkat.
      </p>

      <h3 id="v6-pc" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">6.3 Pressure Control (PCV, P-A/C, PC-SIMV)</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.3.1 Prinsip Dasar</h4>
      <p>Pada mode pressure-controlled, <strong>tekanan inspirasi adalah variabel yang dijaga konstan</strong>; tidal volume yang dihasilkan bergantung pada tekanan inspirasi serta compliance dan resistance paru pasien.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.3.2 Implementasi di Bellavista</h4>
      <p>
        <strong>PCV</strong> dan <strong>P-A/C (Pressure – Assist/Control)</strong>: napas pressure-controlled mandatory dihantarkan pada rate yang diset (&quot;Timed&quot;). Pada P-A/C, usaha napas spontan hanya memicu napas terkontrol tambahan (bukan napas support terpisah). Parameter: PInsp (tekanan inspirasi, relatif di atas PEEP), IPAP (tekanan inspirasi absolut), PEEP/EPAP, Rate, TInsp, trigger (khusus P-A/C), rise time, oksigen.
      </p>
      <p>
        <strong>PC-SIMV</strong>: napas pressure-controlled mandatory pada rate yang diset; di antaranya pasien dapat memicu napas pressure-supported. Sama seperti VC-SIMV, terdapat jendela ekspektasi trigger 60% cycle time (maks 10 detik) untuk kenyamanan sinkronisasi.
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.3.3 Automatic Pressure Rise (Auto.Rise)</h4>
      <p>Fitur ini secara otomatis meminimalkan laju kenaikan tekanan (rise rate), mencegah overshoot tekanan, dan memaksimalkan flow puncak. Adaptasi berbasis napas, dengan nilai awal berdasarkan TInsp yang diset:</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">TInsp</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Rise Time Awal</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['< 0,15 detik', '0,06 detik'],
              ['< 0,25 detik', '0,12 detik'],
              ['< 0,35 detik', '0,15 detik'],
              ['≥ 0,35 detik', '0,2 detik'],
            ].map(([t, r], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{t}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-0"><strong>Relevansi neonatal:</strong> mengingat time constant neonatus bisa sependek 0,05 detik (Bab 1.2.3), fitur auto-rise yang mengaitkan rise time dengan TInsp sangat relevan — mencegah rise time yang terlalu lambat relatif terhadap TInsp yang sudah sangat singkat pada bayi prematur.</p>

      <h3 id="v6-ps" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">6.4 Pressure Support (PSV, S, S/T)</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.4.1 Prinsip Dasar</h4>
      <p>Pada pressure support, <strong>waktu inspirasi ditentukan oleh pasien</strong>, bukan oleh mesin — ini yang membedakannya secara fundamental dari mode kontrol.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.4.2 Mekanisme Trigger-Cycle pada PSV/S/S-T</h4>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Napas pressure-supported dipicu berdasarkan usaha napas (synchronized).</li>
        <li>Inspirasi berakhir begitu flow turun ke persentase tertentu dari flow puncak (<strong>flow-cycled</strong> — Bab 5.3.3).</li>
        <li>Ekspirasi diinisiasi otomatis bila TInsp Max terlampaui (pengaman terhadap napas yang &quot;macet&quot; di inspirasi).</li>
        <li><strong>S/T (Spontaneous/Timed):</strong> bila laju napas turun di bawah RateBackup, napas mandatory dipicu dengan TInsp = TInsp Max — menjadikan S/T sebagai &quot;PSV dengan jaring pengaman apnea&quot; (hanya tersedia pada mode PSV dan S/T).</li>
      </ul>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.4.3 Automatic Expiratory Trigger (Auto.Sync)</h4>
      <p>Fitur ini menggunakan <strong>tiga kriteria simultan</strong> untuk menentukan kapan beralih dari inspirasi ke ekspirasi:</p>
      <ol className="list-decimal list-inside space-y-1.5 text-sm mb-0">
        <li><strong>Differential flow trigger</strong> — usaha ekspirasi aktif pasien dikenali melalui penurunan flow yang cepat.</li>
        <li><strong>Limit ekspirasi berbasis rasio volume-flow</strong> — semakin penuh paru, semakin rendah flow; sebagai trigger ekspirasi, rasio peningkatan tidal volume terhadap penurunan flow mengurangi risiko hiperinflasi.</li>
        <li><strong>Differential pressure trigger</strong> — usaha ekspirasi substansial pasien (mis. batuk) menghasilkan lonjakan tekanan mendadak yang segera menginisiasi ekspirasi.</li>
      </ol>
      <p className="text-xs italic text-slate-500 dark:text-slate-400">Ini adalah contoh nyata bagaimana ventilator modern mendeteksi <strong>asinkroni siklus-berakhir (cycling asynchrony)</strong> secara otomatis — dibahas lebih detail sebagai troubleshooting di Bab 9.</p>

      <h3 id="v6-hybrid" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">6.5 Target Volume/Hybrid (PRVC/TargetVent)</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.5.1 Konsep dan Terminologi</h4>
      <p>
        Dalam literatur mode ini disebut <strong>Pressure Regulated Volume Controlled (PRVC)</strong> ventilation. Prinsip dasarnya: selama ventilasi PRVC, ventilator akan mengevaluasi volume yang dihantarkan ke pasien dan membandingkannya dengan volume yang diinginkan yang diset oleh klinisi. Jika volume yang dihantarkan kurang dari volume yang diinginkan, tekanan target untuk napas berikutnya akan ditingkatkan secara proporsional; sebaliknya, jika volume yang dihantarkan melebihi volume yang diinginkan, tekanan target akan diturunkan.
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.5.2 Implementasi Detail di Bellavista: TargetVent</h4>
      <p>Pada mode TargetVent, tekanan inspirasi (PInsp) disesuaikan otomatis napas-per-napas untuk mencapai target tidal volume (Vttarget) yang diset. TargetVent menghitung <strong>dynamic compliance (CDyn)</strong> untuk setiap napas dan menetapkan pressure support napas berikutnya berdasarkan Vttarget yang dipilih.</p>
      <p><strong>Cara kerja bertahap:</strong></p>
      <ol className="list-decimal list-inside space-y-1.5 text-sm">
        <li>Napas uji pressure-controlled dilakukan sesuai setting awal.</li>
        <li>Berdasarkan napas uji, compliance dihitung dan tekanan target dikalkulasi — yaitu 50% dari selisih antara tekanan target terkalkulasi dan tekanan target saat ini (kenaikan maksimal 7 mbar).</li>
        <li>Setiap napas berikutnya, tekanan inspirasi dihitung ulang berdasarkan tidal volume saat ini (VtCurrent = rata-rata Vt inspirasi dan ekspirasi; bila leak-compensated Vt tersedia, nilai itu yang dipakai).</li>
        <li><strong>Adaptasi lambat:</strong> bila tidal volume yang dihantarkan &gt;50% dari volume target, perubahan Pinsp maksimal per napas adalah ±2 mbar. <strong>Adaptasi cepat (pengaman):</strong> bila tidal volume &gt;30% lebih tinggi dari target, napas dihentikan untuk mencegah overdistensi.</li>
      </ol>
      <p>Kontrol range: PInsp Min ≤ PInsp ≤ PInsp Max — klinisi tetap menentukan batas atas dan bawah tekanan meski algoritma otomatis mengatur di dalamnya.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.5.3 Evidence Klinis: PRVC pada Neonatus</h4>
      <p>
        Volume-targeted, volume-guaranteed ventilation saat ini dianggap sebagai mode ventilasi paling valid untuk bayi prematur, dan PRVC dilaporkan dapat digunakan secara aman pada neonatus dan berpotensi berkontribusi pada angka komplikasi yang lebih rendah. Sebuah studi subgroup pada bayi &lt;1000 g menemukan kelompok PRVC memiliki durasi ventilasi lebih singkat dan insidensi hipotensi lebih rendah (p&lt;0,005).
      </p>
      <p>
        Studi kuasi-eksperimental terbaru (2025) membandingkan PRVC vs PCV pada neonatus dengan gagal napas akut: kebutuhan FiO₂ lebih rendah pada kelompok PRVC di jam ke-1 (p=0,036) dan jam ke-24 (p=0,024); PRVC juga menghasilkan laju napas yang lebih rendah secara signifikan di jam ke-24 (p=0,033); tidal volume tetap lebih tinggi (p&lt;0,05), sementara tekanan inspirasi puncak dan mean airway pressure konsisten lebih rendah pada kelompok PRVC (p&lt;0,001).
      </p>
      <p className="mb-0"><strong>Prinsip praktis:</strong> PRVC/TargetVent menggabungkan keunggulan kepastian volume (mencegah volutrauma) dengan keunggulan tekanan yang self-adjusting (mengurangi risiko klinisi lupa menyesuaikan tekanan manual saat compliance pasien berubah) — mengurangi beban penyesuaian manual berulang oleh klinisi.</p>

      <h3 id="v6-aprv" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">6.6 APRV (Airway Pressure Release Ventilation)</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.6.1 Prinsip Dasar dan Implementasi Bellavista</h4>
      <p>Pasien dapat bernapas tanpa batasan pada dua level tekanan: <strong>PHigh</strong> dan <strong>PLow</strong>. Pressure support dapat diset untuk napas spontan. Untuk ekspirasi, tekanan diturunkan ke PLow. Transisi dari PHigh ke PLow disinkronkan untuk kenyamanan pasien (THigh dapat berubah hingga ±1 detik). Parameter: PHigh, PLow, PSupport High (relatif di atas PHigh), THigh, TLow, trigger, rise time, oksigen.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.6.2 Karakteristik Klinis</h4>
      <p className="mb-0">APRV pada dasarnya adalah &quot;CPAP dengan pelepasan tekanan periodik&quot; — memungkinkan napas spontan hampir sepanjang siklus, kontras dengan mode kontrol konvensional yang lebih membatasi napas spontan pasien. Cocok dipertimbangkan pada kondisi dengan atelektasis difus yang mendapat manfaat dari mean airway pressure tinggi berkelanjutan, namun tetap memerlukan clinical judgment berpengalaman karena kompleksitas monitoring dan potensi risiko auto-PEEP bila TLow tidak tepat (Bab 9).</p>

      <h3 id="v6-hfov" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">6.7 HFOV (High Frequency Oscillatory Ventilation)</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.7.1 Prinsip Fisiologis</h4>
      <p>
        HFOV menghantarkan tidal volume yang lebih kecil dari dead space pada frekuensi supra-fisiologis 5 hingga 15 Hz (300–900 napas/menit). Tidal volume dihasilkan oleh piston osilatori sembari menggunakan tekanan distensi konstan untuk mempertahankan volume paru yang adekuat. Dengan menggunakan tekanan konstan, HFOV menghasilkan inflasi paru yang lebih seragam, sehingga mengurangi kerusakan yang diakibatkan ventilasi konvensional.
      </p>
      <p>HFOV berbeda dari ventilasi konvensional dan ventilasi jet frekuensi tinggi karena baik inspirasi maupun ekspirasi bersifat aktif. Oksigenasi dan ventilasi relatif independen selama HFOV — oksigenasi dikontrol oleh FiO₂ dan mean airway pressure (mPaw), sementara ventilasi dikontrol oleh tidal volume (amplitude) dan frekuensi.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.7.2 Tiga Setting Utama</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Parameter</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Fungsi</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Prinsip Titrasi</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['MAP', 'Mengontrol oksigenasi bersama FiO₂; mempertahankan rekrutmen paru untuk stabilitas alveolar dan meminimalkan toksisitas oksigen', 'Umumnya diset 5 cmH₂O di atas mPaw pada ventilasi konvensional sebelumnya'],
              ['Amplitude (ΔP)', 'Komponen utama untuk mengontrol tidal volume; amplitude lebih tinggi meningkatkan pergerakan piston sehingga menghasilkan tidal volume lebih tinggi', 'Disesuaikan hingga terlihat vibrasi dada yang sesuai, kemudian dititrasi lebih lanjut untuk mencapai pCO₂ optimal'],
              ['Frekuensi (Hz)', 'Memengaruhi tidal volume secara inversi', 'Menurunkan Hz meningkatkan waktu untuk siklus gelombang osilatori dihantarkan sehingga meningkatkan tidal volume dan memperbaiki CO₂'],
            ].map(([p, f, t], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{p}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{f}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.7.3 Panduan Praktis Titrasi (Kerangka Umum)</h4>
      <p>Target vibrasi dada, abdomen, dan sedikit paha sebagai tanda amplitude adekuat — pada bayi, target chest wiggle hingga umbilikus; pada anak, hingga area pelvis; pada dewasa, hingga pertengahan paha.</p>
      <p>Contoh kerangka setting awal berbasis usia (<strong>sebagai ilustrasi umum, bukan protokol tetap</strong>):</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kategori Usia</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Frekuensi Awal</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Bias Flow</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Preterm', '15 Hz', '15–25 L/menit (<1 tahun)'],
              ['Term/bayi', '12 Hz', '15–25 L/menit'],
              ['Anak', '10 Hz', '15–30 L/menit (1–8 tahun)'],
              ['Anak besar', '8 Hz', '25–40 L/menit (≥8 tahun)'],
            ].map(([u, f, b], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{u}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{f}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>FiO₂ awal umumnya 1,0 (100%), diturunkan bertahap sesuai kebutuhan oksigenasi, dititrasi ke target SaO₂ 88–92%. Periksa gas darah setiap 15–20 menit hingga PaCO₂ mencapai target, sambil menitrasi power/amplitude berdasarkan PaCO₂ yang diinginkan.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.7.4 Indikasi</h4>
      <p>
        HFOV telah digunakan di NICU untuk pasien yang gagal dengan ventilasi konvensional. HFOV sangat efektif diterapkan pada kondisi paru yang tepat, khususnya gagal napas akut berat terkait atelektasis (seperti RDS defisiensi surfaktan) dan hipertensi pulmonal. Pada neonatus, HFOV dapat digunakan pada paru prematur sebagai lini pertama untuk mencegah cedera paru akibat ventilasi konvensional. Indikasi lain mencakup sindrom kebocoran udara luas (air leak) dengan ketidakmampuan mempertahankan paru tetap terbuka, seperti fistula bronkopleural, pneumotoraks, dan emfisema interstisial paru.
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.7.5 Kewaspadaan Hemodinamik</h4>
      <p className="border-l-4 border-violet-300 dark:border-violet-700 pl-4 py-1 text-sm font-medium italic bg-violet-50/50 dark:bg-violet-950/10 rounded-r-lg">
        Peningkatan MAP menyebabkan peningkatan volume paru dan pergeseran diafragma ke bawah; bila MAP diset terlalu tinggi, tumpulnya sudut kostodiafragma dapat terlihat, dan tekanan jalan napas tinggi menyebabkan peningkatan tekanan intratoraks yang dapat mengganggu venous return, menyebabkan hipotensi (kaitkan Bab 2.3). Bila hipotensi terjadi, MAP harus diturunkan untuk memungkinkan pengisian jantung dan output ventrikel yang adekuat.
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.7.6 HFOV dengan Volume Guarantee (HFOV-VG)</h4>
      <p className="mb-0">
        HFOV-VG menggabungkan dua strategi lanjutan: HFOV dan Volume Guarantee, memungkinkan klinisi menetapkan &quot;high frequency tidal volume&quot; (VThf) yang telah ditentukan sebelumnya; klinisi menetapkan ΔP maksimum (amplitude max) yang diset 10–15% di atas amplitude rata-rata yang dibutuhkan untuk mencapai VThf target, dan ventilator akan menyesuaikan ΔP yang dihantarkan sesuai kebutuhan (hingga batas maksimum) untuk mencapai tidal volume yang diset. Untuk memulai HFOV-VG, direkomendasikan memulai VThf pada 2–2,5 ml/kg dengan monitoring ketat nilai CO₂, karena banyak bayi sebenarnya membutuhkan VThf &lt;2 ml/kg.
      </p>

      <h3 id="v6-neonatal" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">6.8 Mode Spesifik Neonatal: nCPAP, nIPPV, beLevel</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.8.1 nCPAP di Bellavista</h4>
      <p>Mode nCPAP mengasumsikan pasien bernapas spontan; tidak ada kerja napas yang dilakukan oleh ventilator — hanya tekanan positif kontinu (mirip PEEP) yang dihasilkan. Napas manual dapat diset dan dipicu terpisah. Konfigurasi nCPAP tersedia dalam dua cara:</p>
      <ul className="list-disc list-inside space-y-1.5 text-sm">
        <li><strong>Flow-based:</strong> flow konstan yang dikonversi menjadi tekanan jalan napas oleh interface nasal. Setting default flow-based nCPAP adalah 8,0 L/menit, menghasilkan level nCPAP sekitar 4 cmH₂O — namun generator CPAP nasal individual memiliki toleransi hingga 15% dari nominal, sehingga tekanan termonitor harus diverifikasi dan flow disesuaikan.</li>
        <li><strong>Pressure-based (default):</strong> CPAP yang dihasilkan langsung oleh interface nasal, dengan flow yang diregulasi otomatis untuk menghasilkan CPAP yang diset.</li>
      </ul>
      <p>
        <strong>Catatan penting:</strong> kebocoran prong/mask dapat memengaruhi level nCPAP kapan saja selama terapi — pengingat penting bahwa monitoring tekanan aktual (bukan hanya nilai setting) esensial pada NIV neonatal. Kompatibel hanya dengan generator <strong>Infant Flow LP®</strong>; mode nCPAP/nIPPV hanya boleh digunakan dengan interface nasal yang kompatibel untuk memastikan alarm berfungsi benar.
      </p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.8.2 nIPPV di Bellavista</h4>
      <p>Tekanan jalan napas beralih antara dua level — PEEP dan PEEP+PInsp — secara pressure-controlled. Pasien dapat bernapas spontan pada kedua level tekanan. Parameter: PInsp, PEEP, Rate, TInsp, Rise, Oksigen.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.8.3 beLevel — Mode Biphasic Fleksibel</h4>
      <p className="mb-0">
        Mode ventilasi biphasic di mana tekanan jalan napas beralih antara dua level tekanan, PEEP dan PHigh. Pasien dapat bernapas spontan di kedua level. Pressure support (PSupport) dapat diset terpisah untuk napas spontan — bila PEEP+PSupport melebihi PHigh, pressure support juga dihantarkan di level atas. <strong>beLevel adalah mode sangat fleksibel</strong> yang dapat dikonfigurasi menyerupai CPAP, P-A/C, PC-SIMV, PSV, atau APRV, tergantung aplikasi — menjadikannya mode &quot;serba bisa&quot; yang parameternya disesuaikan sesuai tujuan klinis spesifik.
      </p>

      <h3 id="v6-atc" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">6.9 Automatic Tube Compensation (ATC) dan Sigh</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.9.1 ATC</h4>
      <p>ATC mengompensasi resistensi ETT dengan meningkatkan tekanan ventilasi di sirkuit napas selama inspirasi (berbasis flow-dependent), atau menguranginya selama ekspirasi. Kurva PATC terkalkulasi ditumpangkan pada kurva tekanan.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Fase</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Pressure-controlled</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Volume-controlled</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">Inspirasi</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">Peningkatan</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">Tidak berpengaruh</td>
            </tr>
            <tr>
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">Ekspirasi</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">Pengurangan</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">Pengurangan</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Setting ATC: jenis tube (Off/Endotrakeal/Trakeostomi), diameter internal tube, derajat kompensasi (10–100%), fase respirasi tempat ATC aktif.</p>
      <p><strong>Prinsip klinis:</strong> ATC secara konseptual mengoreksi kenyataan bahwa <strong>tekanan yang diukur ventilator bukanlah tekanan aktual di ujung distal ETT</strong> — resistensi tube kecil (terutama neonatal) menyerap sebagian tekanan yang diset. ATC membantu meng-approksimasi &quot;tekanan trakea sesungguhnya&quot; pasien.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">6.9.2 Sigh</h4>
      <p className="mb-0">
        Fungsi sigh dapat diaktifkan pada sebagian besar mode ventilasi, memberikan napas dengan amplitude lebih besar secara periodik (menyerupai napas dalam spontan manusia) — <strong>tidak tersedia pada CPAP, beLevel, atau APRV</strong>, dan <strong>sigh untuk neonatal tidak tersedia</strong> (hanya untuk ventilasi dewasa pada Bellavista). Peringatan keselamatan eksplisit: tekanan tidak adekuat atau tidal volume berlebihan dapat menyebabkan baro- atau volutrauma — sigh harus selalu disesuaikan mengikuti rekomendasi seperti dari ARDSnet untuk mencegah bahaya pada pasien.
      </p>

      <h3 id="v6-tabel" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">6.10 Tabel Perbandingan Mode: Kapan Pilih Apa</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Mode</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Kategori</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Cocok Untuk</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Catatan Kunci</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['CPAP/nCPAP', 'Non-invasif/spontan penuh', 'Pasien dengan usaha napas adekuat, butuh dukungan tekanan distensi saja', 'Tidak ada kerja napas oleh ventilator'],
              ['nIPPV', 'Non-invasif, biphasic', 'RDS neonatal, weaning pasca-ekstubasi', 'Lebih superior dari nCPAP untuk menurunkan reintubasi (Bab 3)'],
              ['PCV/P-A/C', 'Kontrol, pressure-limited', 'Neonatus/pasien dengan risiko barotrauma, compliance tidak stabil', 'Volume bervariasi — pantau ketat'],
              ['VCV/V-A/C', 'Kontrol, volume-limited', 'Pasien dengan kebutuhan volume presisi (strategi lung-protective ARDS ketat)', 'Tekanan bervariasi — pantau PPeak/Pplat'],
              ['PC-SIMV/VC-SIMV', 'Intermittent mandatory', 'Transisi dari kontrol penuh menuju support, proses weaning bertahap', 'Memberi ruang usaha spontan tanpa kehilangan jaminan rate minimal'],
              ['PSV/S/S-T', 'Support penuh', 'Pasien dengan drive napas adekuat, tahap weaning lanjut', 'S/T memberi jaring pengaman apnea'],
              ['TargetVent (PRVC)', 'Hybrid adaptif', 'Neonatus prematur — kombinasi kepastian volume + tekanan self-adjusting', 'Evidence mendukung penurunan komplikasi khususnya <1000g'],
              ['APRV/beLevel', 'Biphasic fleksibel', 'Atelektasis difus butuh MAP tinggi berkelanjutan dengan napas spontan dipertahankan', 'Butuh clinical judgment berpengalaman'],
              ['HFOV', 'Frekuensi tinggi', 'Gagal ventilasi konvensional, RDS berat, air leak syndrome', 'Oksigenasi (MAP/FiO₂) independen dari ventilasi (amplitude/frekuensi)'],
              ['NHFOV', 'Non-invasif frekuensi tinggi', 'Dukungan pasca-ekstubasi neonatal (Bab 3)', 'Evidence terbaru: paling efektif turunkan reintubasi'],
              ['HFOT', 'Terapi oksigen aliran tinggi', 'Pasien spontan penuh, butuh FiO₂/flow tinggi tanpa PEEP presisi terukur', 'Tersedia neonatal-pediatrik-dewasa; tidak untuk pasien apnea'],
            ].map(([m, k, c, n], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{m}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{c}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
