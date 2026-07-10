import TocNav from '../../TocNav';

export default function Body() {
  return (
    <>
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/30 rounded-xl p-4 text-sm">
        <p className="m-0 text-amber-800 dark:text-amber-300"><strong>Catatan penting:</strong> Angka pada bab ini adalah <strong>titik awal dan rentang target dari literatur/guideline</strong>, bukan resep kaku. Setting aktual selalu harus disesuaikan dengan kondisi klinis individual pasien, respons monitoring real-time, dan kebijakan unit/instruksi intensivis.</p>
      </div>

      <TocNav
        items={[
          { id: 'v7-vt', label: '7.1 Tidal Volume (Vt) — Target per Kg BB' },
          { id: 'v7-peep', label: '7.2 PEEP — Prinsip Titrasi dan Tabel PEEP/FiO2' },
          { id: 'v7-fio2', label: '7.3 FiO2 — Target Saturasi' },
          { id: 'v7-rate', label: '7.4 Rate/Frekuensi Napas — per Usia' },
          { id: 'v7-ie', label: '7.5 I:E Ratio, Inspiratory Time' },
          { id: 'v7-pressure', label: '7.6 Pressure Limit: PIP, Plateau, Driving Pressure' },
          { id: 'v7-flow', label: '7.7 Flow Rate dan Rise Time' },
          { id: 'v7-trigger', label: '7.8 Trigger Sensitivity — Ringkasan' },
          { id: 'v7-hfov', label: '7.9 Setting Spesifik HFOV' },
          { id: 'v7-etco2', label: '7.10 Nilai Monitoring Terkait: Kapnografi' },
          { id: 'v7-ringkasan', label: 'Ringkasan Tabel Cepat: Titik Awal Setting' },
        ]}
      />

      <h3 id="v7-vt" className="scroll-mt-4">7.1 Tidal Volume (Vt) — Target per Kg BB</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.1.1 Neonatus</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kategori</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Vt Target</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Bayi prematur (spontan)', 'Serendah 3,2 ml/kg pada preterm sangat kecil'],
              ['Neonatus sehat (spontan)', '5–10 ml/kg'],
              ['Neonatus dengan ventilasi mekanik (umum)', '6–10 ml/kg, 4–6 ml/kg pada preterm'],
              ['Neonatus sehat rata-rata', '4–6 ml/kg dengan target minute ventilation 0,2–0,3 L/menit/kg'],
              ['Volume control — prematur', '5–7 cc/kg'],
              ['Volume control — term', '7–10 cc/kg'],
              ['Ambang overdistensi', '>8,5 ml/kg dianggap mengindikasikan overdistensi volume'],
              ['BPD evolving (CMV)', '~4–5 ml/kg'],
              ['BPD evolving (HFOV)', '~1–2 ml/kg'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.1.2 Pediatrik (PARDS — PALICC-2)</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kondisi</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Vt Target</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['PARDS standar', '6–8 ml/kg (fisiologis)'],
              ['PARDS dengan tekanan sulit dikontrol', 'Bila kesulitan memenuhi batas tekanan, targetkan Vt 4–6 ml/kg'],
              ['ARDS berat (permissive hypercapnia)', '~6 cc/kg, menerima hiperkapnia terkontrol'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-0"><strong>Prinsip PALICC-2:</strong> penggunaan Vt fisiologis 6–8 ml/kg disarankan untuk pasien PARDS yang membutuhkan ventilasi invasif.</p>

      <h3 id="v7-peep" className="scroll-mt-4">7.2 PEEP — Prinsip Titrasi dan Tabel PEEP/FiO2</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.2.1 Setting Awal Neonatal</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kategori</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">PEEP Awal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">Semua bayi (umum)</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">PEEP 5 cmH₂O untuk semua bayi</td>
            </tr>
            <tr>
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">VTV-PPV neonatal (protokol resusitasi)</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">PEEP 6 cmH₂O</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.2.2 Prinsip PALICC-2 (Pediatrik)</h4>
      <p>
        PEEP direkomendasikan dipertahankan pada atau di atas tabel PEEP rendah/FiO₂ tinggi dari protokol ARDS Network, dibandingkan level PEEP yang lebih rendah dari tabel tersebut. Saat menyesuaikan level PEEP untuk mencapai target rentang oksigen pada PARDS, perhatian untuk menghindari melampaui batas tekanan plateau dan/atau driving pressure sangat penting.
      </p>
      <p className="mb-0"><strong>Adherence di lapangan (data real-world 2025):</strong> analisis retrospektif menemukan hanya sekitar 38% kepatuhan terhadap tabel PEEP rendah/FiO₂ ARDSnet dan 46% kepatuhan terhadap target tidal volume 6–8 ml/kg — menegaskan bahwa meski guideline jelas, implementasi konsisten di lapangan tetap menjadi tantangan nyata.</p>

      <h3 id="v7-fio2" className="scroll-mt-4">7.3 FiO2 — Target Saturasi</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Populasi/Kondisi</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Target SpO₂</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['PARDS umum (PALICC-2)', 'Menghindari SpO₂ <92% setelah PEEP dioptimalkan, guna mengurangi paparan FiO₂ — sebelum optimasi, target lebih tinggi'],
              ['ARDS berat, minimalisasi toksisitas O₂', 'Wean FiO₂ menuju 50–60%, mempertahankan saturasi >88–90%'],
              ['HFOV neonatal', 'FiO₂ awal 1,0 (100%), diturunkan bertahap ke target SpO₂ 88–92%'],
              ['HFOV umum', 'FiO₂ awal 1,0, dititrasi ke target SpO₂ 88–92%'],
            ].map(([p, t], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{p}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 id="v7-rate" className="scroll-mt-4">7.4 Rate/Frekuensi Napas — per Usia</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kategori</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">Neonatal (umum)</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">30–60x/menit</td>
            </tr>
            <tr>
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">VTV-PPV neonatal (protokol resusitasi)</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">50 inflasi/menit</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs italic text-slate-500 dark:text-slate-400">Sebagai perbandingan dengan AVM (Adaptive Ventilation Mode) Bellavista, rate minimum yang direkomendasikan berdasarkan Ideal Body Weight:</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">IBW (kg)</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">RateTarget Minimum (bpm)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['<6', '15'], ['6 – <9', '12'], ['9 – <21', '10'], ['21 – <30', '7'], ['30 – <60', '6'], ['≥60', '5'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 id="v7-ie" className="scroll-mt-4">7.5 I:E Ratio, Inspiratory Time</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.5.1 Prinsip Umum</h4>
      <p>Waktu inspirasi (TInsp) berkaitan erat dengan time constant paru (Bab 1.2.3) — pada compliance rendah (time constant pendek), TInsp singkat sudah adekuat; pada resistensi tinggi (time constant panjang), TInsp perlu diperpanjang.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.5.2 Contoh Setting Praktis</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Konteks</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">TInsp</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">VTV-PPV neonatal awal</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">0,3 detik, dapat ditingkatkan hingga 0,5 detik berdasarkan respons klinis</td>
            </tr>
            <tr>
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">HFJV (High Frequency Jet Ventilation) neonatal</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">PEEP dan IT diset 0,35–0,5 detik</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.5.3 Rentang AVM Bellavista (untuk perbandingan algoritma otomatis)</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Parameter</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Batas</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['TInsp minimum', '0,5 detik'], ['TInsp maksimum', '2 detik'], ['TExp minimum', '2 × RCExp (time constant ekspirasi terukur)'], ['TExp maksimum', '12 detik'], ['Rentang I:E hasil', '1:4 – 1:1'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 id="v7-pressure" className="scroll-mt-4">7.6 Pressure Limit: PIP, Plateau Pressure, Driving Pressure</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.6.1 Setting Awal Neonatal (Pressure-Controlled)</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kategori Berat</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">PIP Awal</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Very low/low birth weight', '15–20 cmH₂O'],
              ['Term/near-term', '20–25 cmH₂O'],
              ['Semua kategori', 'PEEP 5 untuk semua bayi'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.6.2 Batas Aman PALICC-2 (Pediatrik)</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Parameter</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Batas</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Plateau pressure', '≤28 cmH₂O bila pengukuran tekanan transpulmoner tidak tersedia'],
              ['Plateau pressure (compliance dinding dada rendah)', 'Dapat dipertahankan hingga ≤32 cmH₂O'],
              ['Driving pressure', 'Dibatasi hingga 15 cmH₂O (diukur pada kondisi statis)'],
              ['pH minimum (permissive hypercapnia)', 'Hingga batas bawah pH 7,20 diperbolehkan agar tetap dalam rentang tekanan dan volume yang direkomendasikan'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.6.3 Driving Pressure sebagai Prediktor VILI</h4>
      <p>Driving pressure adalah selisih antara plateau pressure dan PEEP; bukti dari studi observasional menunjukkan driving pressure yang tinggi merupakan determinan independen utama cedera paru akibat ventilator, meski uji klinis lanjutan masih dibutuhkan untuk menetapkan apakah menargetkan driving pressure rendah dapat memperbaiki outcome klinis.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.6.4 Contoh Bundle Ventilasi PARDS (Regional Asia)</h4>
      <p className="mb-0">Contoh bundle ventilasi yang diimplementasikan di kawasan Asia menetapkan target: tidal volume 3–6 ml/kg, tekanan puncak &lt;28–32 cmH₂O, dan tabel titrasi PEEP-FiO₂ — berdasar temuan bahwa mayoritas pasien PARDS di kawasan tersebut sebelumnya diventilasi dengan tidal volume tinggi, tekanan puncak tinggi, dan PEEP akhir-ekspirasi rendah, tidak sesuai rekomendasi PALICC.</p>

      <h3 id="v7-flow" className="scroll-mt-4">7.7 Flow Rate dan Rise Time</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.7.1 Rise Time Otomatis Bellavista (Auto.Rise, dari Bab 6.3.3)</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">TInsp</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Rise Time</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['<0,15 detik', '0,06 detik'], ['<0,25 detik', '0,12 detik'], ['<0,35 detik', '0,15 detik'], ['≥0,35 detik', '0,2 detik'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.7.2 Trigger Sensitivity Flow (Contoh Protokol)</h4>
      <p className="mb-0">Sensitivitas trigger diset pada 0,2 L/menit untuk memungkinkan napas yang dipicu bayi pada protokol VTV-PPV neonatal.</p>

      <h3 id="v7-trigger" className="scroll-mt-4">7.8 Trigger Sensitivity — Ringkasan</h3>
      <p>Dibahas mekanismenya di Bab 5.3.1 dan 6; sebagai rangkuman prinsip nilai:</p>
      <ul className="list-disc list-inside space-y-1 text-sm mb-0">
        <li>Trigger terlalu sensitif → risiko auto-triggering, terutama pada NIV dengan kebocoran (Bab 3, Bab 5.3.1).</li>
        <li>Trigger terlalu tidak sensitif → usaha napas pasien tidak terdeteksi, meningkatkan kerja napas dan risiko asinkroni (Bab 9).</li>
        <li>Nilai spesifik flow trigger dan pressure trigger bergantung platform ventilator — pada Bellavista, nilai ini dikonfigurasi eksplisit sebagai parameter &quot;Pressure trigger&quot; dan &quot;Flow trigger&quot; per mode (Bab 6).</li>
      </ul>

      <h3 id="v7-hfov" className="scroll-mt-4">7.9 Setting Spesifik HFOV (MAP, Amplitude/Delta P, Frekuensi Hz)</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.9.1 Setting Awal Berdasarkan Usia</h4>
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
              ['Preterm', '15 Hz', '15–25 L/menit'], ['Term/bayi (<1 tahun)', '12 Hz', '15–25 L/menit'], ['Anak (1–8 tahun)', '10 Hz', '15–30 L/menit'], ['Anak besar (≥8 tahun)', '8 Hz', '25–40 L/menit'],
            ].map(([k, f, b], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{f}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.9.2 MAP (Mean Airway Pressure)</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Kondisi</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Setting</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['HFOV rescue (umum)', 'Mulai 2 cmH₂O di atas MAP pada ventilasi konvensional sebelumnya'],
              ['HFOV (sumber lain)', 'mPaw diset 5 cmH₂O di atas mPaw pada ventilator konvensional, atau MAP 3–4 cmH₂O di atas MAP pada ventilasi konvensional'],
              ['Titrasi lanjutan', 'Disesuaikan bertahap dalam increment 2 cmH₂O berdasarkan saturasi'],
              ['HFOV minimal (target ekstubasi/transisi)', 'Umumnya tercapai sekitar MAP 7 cmH₂O dengan kebutuhan O₂ <40%'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.9.3 Amplitude (ΔP, Power)</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Parameter</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Nilai/Rentang</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Power range (SensorMedics 3100A)', '1,0–10,0'],
              ['Amplitude/Delta P range', '0–90 cmH₂O'],
              ['Amplitude awal (chest wiggle vigorous)', 'Umumnya tercapai pada amplitude 20–30'],
              ['Amplitude relatif terhadap PaCO₂', 'Sekitar 20–30 cmH₂O lebih tinggi dari PaCO₂ pasien pada ventilasi konvensional'],
              ['Amplitude target (rule of thumb)', '~50 cmH₂O sebagai titik awal, disesuaikan segera setelah terpasang'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.9.4 Target Vibrasi Dada (Chest Wiggle)</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Usia</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Target Vibrasi</th>
            </tr>
          </thead>
          <tbody>
            {[['Bayi', 'Hingga umbilikus'], ['Anak', 'Hingga area pelvis'], ['Dewasa', 'Hingga pertengahan paha']].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">7.9.5 Frekuensi Evaluasi Gas Darah Selama Titrasi</h4>
      <p className="mb-0">Periksa gas darah pada 30 menit pertama untuk menilai tren CO₂, dan periksa setiap 15–20 menit hingga PaCO₂ mencapai rentang target (umumnya 40–60 mmHg atau sesuai target individual).</p>

      <h3 id="v7-etco2" className="scroll-mt-4">7.10 Nilai Monitoring Terkait: Kapnografi (EtCO2)</h3>
      <p className="text-xs italic text-slate-500 dark:text-slate-400">(Pendalaman monitoring lengkap ada di Bab 8; nilai berikut relevan sebagai referensi angka setting/target bersama parameter ventilator.)</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Parameter</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Nilai</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['EtCO₂ normal (napas spontan neonatus/anak)', '36–40 mmHg'],
              ['Gradien a-ET PCO₂ (bayi/anak umum)', '-0,65 hingga 2,4 mmHg'],
              ['Gradien a-ET PCO₂ (bayi prematur)', 'Dapat mencapai 3,5 mmHg'],
              ['Korelasi EtCO₂-PaCO₂ (neonatal, umum)', 'r=0,8, korelasi baik meski menurun pada gagal napas signifikan'],
              ['Fixed mean difference arteri-EtCO₂ (preterm terventilasi)', '0,54 kPa (~4 mmHg)'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-l-4 border-emerald-300 dark:border-emerald-700 pl-4 py-1 text-sm font-medium italic bg-emerald-50/50 dark:bg-emerald-950/10 rounded-r-lg mb-0">
        Korelasi EtCO₂-PaCO₂ dipengaruhi secara negatif oleh keparahan penyakit paru — semakin berat penyakit paru, semakin rendah korelasinya. Ini berarti kapnografi <strong>tidak boleh menggantikan</strong> AGD pada pasien dengan penyakit paru berat — hanya sebagai alat tren, bukan pengganti definitif.
      </p>

      <h3 id="v7-ringkasan" className="scroll-mt-4">Ringkasan Tabel Cepat: Titik Awal Setting per Kategori Pasien</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Parameter</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Neonatus Prematur</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Neonatus Term</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Anak (PARDS)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Vt target', '4–6 ml/kg', '6–10 ml/kg', '6–8 ml/kg (4–6 bila tekanan sulit)'],
              ['PEEP awal', '5–6 cmH₂O', '5 cmH₂O', 'Sesuai tabel ARDSnet PEEP/FiO₂'],
              ['PIP awal (PCV)', '15–20 cmH₂O', '20–25 cmH₂O', 'Individual, jaga Pplat ≤28'],
              ['Plateau limit', '—', '—', '≤28 cmH₂O (≤32 bila compliance dinding dada rendah)'],
              ['Driving pressure limit', '—', '—', '≤15 cmH₂O'],
              ['Rate awal', '30–60x/menit', '30–60x/menit', 'Sesuai usia'],
              ['Target SpO₂', '88–92% (titrasi hati-hati risiko ROP)', '88–92%', '≥92% (setelah PEEP optimal) atau lebih tinggi sebelumnya'],
              ['pH minimum (permissive hypercapnia)', 'Individual', 'Individual', '7,20'],
            ].map(([p, np, nt, a], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{p}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{np}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{nt}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
