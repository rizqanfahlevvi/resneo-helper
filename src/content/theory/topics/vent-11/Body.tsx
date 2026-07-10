import TocNav from '../../TocNav';

export default function Body() {
  return (
    <>
      <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-800/30 rounded-xl p-4 text-sm">
        <p className="m-0 text-indigo-800 dark:text-indigo-300">Bab ini adalah kompilasi tabel-tabel kunci dari Bab 1–10 untuk akses cepat di ranjang pasien. <strong>Selalu rujuk bab lengkap terkait untuk konteks klinis dan nuansa keputusan</strong> — tabel di sini adalah alat bantu ingat, bukan pengganti penilaian klinis.</p>
      </div>

      <TocNav
        items={[
          { id: 'v11-ett', label: '11.1 Tabel Ukuran ETT per Usia/Berat' },
          { id: 'v11-setting', label: '11.2 Setting Awal Ventilator per Kategori Pasien' },
          { id: 'v11-nilai', label: '11.3 Nilai Normal Monitoring per Usia' },
          { id: 'v11-troubleshoot', label: '11.4 Algoritma Troubleshooting Satu Halaman' },
          { id: 'v11-checklist', label: '11.5 Checklist Intubasi dan Ekstubasi' },
          { id: 'v11-peta', label: 'Peta Navigasi Materi Lengkap' },
        ]}
      />

      <h3 id="v11-ett" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">11.1 Tabel Ukuran ETT per Usia/Berat</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Formula Usia (Anak di Luar Neonatal)</h4>
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
      <p className="text-xs italic text-slate-500 dark:text-slate-400">Formula standar cenderung overestimate — bila ragu, pilih setengah ukuran lebih kecil dari hasil formula, atau gunakan formula cuffed sebagai estimasi lebih akurat.</p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Berdasarkan Berat/Usia Neonatal</h4>
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
              ['Bayi dan anak kecil', '3,5 / 4,0 / 4,5 / 5,5 mm'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
          <h5 className="font-extrabold text-slate-700 dark:text-slate-300 text-xs uppercase mb-1.5">Cuffed vs Uncuffed</h5>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside m-0">
            <li>Neonatus/bayi &lt;3,0 kg → Uncuffed</li>
            <li>Anak dengan intubasi darurat → Cuffed lebih disukai (cuff HVLP, monitoring tekanan cuff rendah)</li>
          </ul>
        </div>
        <div className="bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
          <h5 className="font-extrabold text-slate-700 dark:text-slate-300 text-xs uppercase mb-1.5">Kedalaman Insersi</h5>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside m-0">
            <li>Umum (uncuffed): ≈3 × diameter internal tube</li>
            <li>Neonatus (alternatif): nasal septum ke tragus (cm) + 1 cm</li>
          </ul>
        </div>
      </div>
      <p className="border-l-4 border-indigo-300 dark:border-indigo-700 pl-4 py-1 text-sm font-medium italic bg-indigo-50/50 dark:bg-indigo-950/10 rounded-r-lg mb-0">
        <strong>Wajib:</strong> verifikasi klinis (auskultasi bilateral) + konfirmasi radiologis, terutama pada neonatus &lt;1 kg — formula hanya estimasi awal.
      </p>

      <h3 id="v11-setting" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">11.2 Tabel Setting Awal Ventilator per Kategori Pasien</h3>
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
              ['Vt target', '4–6 ml/kg', '6–10 ml/kg', '6–8 ml/kg (4–6 bila tekanan sulit dikontrol)'],
              ['PEEP awal', '5–6 cmH₂O', '5 cmH₂O', 'Sesuai tabel ARDSnet PEEP/FiO₂'],
              ['PIP awal (PCV)', '15–20 cmH₂O', '20–25 cmH₂O', 'Individual, jaga Pplat ≤28 cmH₂O'],
              ['Plateau limit', '—', '—', '≤28 cmH₂O (≤32 bila compliance dinding dada rendah)'],
              ['Driving pressure limit', '—', '—', '≤15 cmH₂O'],
              ['Rate awal', '30–60x/menit', '30–60x/menit', 'Sesuai usia'],
              ['Target SpO₂', '88–92%', '88–92%', '≥92% (setelah PEEP optimal), lebih tinggi sebelum optimasi'],
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
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Setting HFOV Berdasarkan Usia</h4>
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
              ['Preterm', '15 Hz', '15–25 L/menit'],
              ['Term/bayi (<1 tahun)', '12 Hz', '15–25 L/menit'],
              ['Anak (1–8 tahun)', '10 Hz', '15–30 L/menit'],
              ['Anak besar (≥8 tahun)', '8 Hz', '25–40 L/menit'],
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
      <p className="text-sm mb-0">MAP awal: 2–5 cmH₂O di atas MAP ventilasi konvensional sebelumnya. FiO₂ awal 1,0, titrasi ke SpO₂ 88–92%. Target vibrasi dada: bayi hingga umbilikus, anak hingga pelvis.</p>

      <h3 id="v11-nilai" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">11.3 Tabel Nilai Normal Monitoring per Usia</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Parameter</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Nilai Normal/Target</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['EtCO₂ (napas spontan)', '36–40 mmHg'],
              ['Gradien a-ET PCO₂ (umum)', '-0,65 hingga 2,4 mmHg'],
              ['Gradien a-ET PCO₂ (preterm)', 'Hingga 3,5 mmHg'],
              ['Laju napas neonatal', '30–60x/menit'],
              ['PaCO₂ target HFOV', '40–60 mmHg (sesuaikan target individual)'],
            ].map(([k, v], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Indeks Oksigenasi (PALICC-2)</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Indeks</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Rumus</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Kapan Digunakan</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['OI', 'MAP × FiO₂ / PaO₂', 'Ventilasi invasif, AGD tersedia'],
              ['OSI', 'MAP × FiO₂ / SpO₂', 'Ventilasi invasif, AGD tidak tersedia'],
              ['P/F ratio', 'PaO₂ / FiO₂', 'NIV (CPAP/BiPAP ≥5 cmH₂O), AGD tersedia'],
              ['S/F ratio', 'SpO₂ / FiO₂', 'NIV, AGD tidak tersedia'],
            ].map(([k, r, kg], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-black text-indigo-600 dark:text-indigo-400">{k}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{r}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{kg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs italic text-slate-500 dark:text-slate-400 mb-0">Terapi oksigen harus disesuaikan untuk mempertahankan SpO₂ 88–97% sebelum indeks ini dihitung agar valid.</p>

      <h3 id="v11-troubleshoot" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">11.4 Algoritma Troubleshooting Satu Halaman</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Langkah 1: DOPE(S) — Diagnosis Cepat Perburukan Mendadak</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Huruf</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Cek</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['D', 'Displacement ETT — suara napas berubah, kapnografi berubah'],
              ['O', 'Obstruction — sekret, kinking, gigitan pasien'],
              ['P', 'Pneumothorax — suara napas asimetris + tekanan tinggi mendadak'],
              ['E', 'Equipment failure — cek ventilator, sirkuit, sumber gas'],
              ['(S)', 'Stacking/auto-PEEP — cek waktu ekspirasi, HoldExp'],
              ['(R)', 'Rigidity dinding dada — curigai bila baru diberi opioid dosis tinggi/cepat'],
            ].map(([h, c], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-black text-rose-600 dark:text-rose-400">{h}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Langkah 2: DOTTS — Tindakan Korektif</h4>
      <ol className="list-decimal list-inside space-y-1 text-sm">
        <li><strong>D</strong>isconnect dari ventilator</li>
        <li><strong>O</strong>xygen 100% via bag-mask, rasakan resistensi/kebocoran</li>
        <li><strong>T</strong>ube position — cek posisi, lewatkan suction kateter/bougie untuk cek patensi</li>
        <li><strong>T</strong>weak the vent — turunkan rate, sesuaikan I:E bila auto-PEEP dicurigai</li>
        <li><strong>S</strong>onography/CXR untuk konfirmasi</li>
      </ol>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Kunci Diagnostik Peak vs Plateau Pressure</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Pola</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Curiga</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">Peak tinggi, Plateau normal</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">Masalah sirkuit/ETT/bronkokonstriksi (resistensi)</td>
            </tr>
            <tr>
              <td className="p-2 font-bold text-slate-700 dark:text-slate-300">Peak tinggi, Plateau tinggi</td>
              <td className="p-2 text-slate-600 dark:text-slate-400">Masalah compliance (paru/dinding dada)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Tabel Cepat Alarm</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Alarm</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Penyebab Umum</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Tekanan tinggi', 'Sumbatan, bronkospasme, asinkroni, pneumotoraks'],
              ['Tekanan rendah', 'Diskoneksi, kebocoran sirkuit'],
              ['Vt ekshalasi rendah', 'Obstruksi, kebocoran'],
              ['PEEP rendah', 'Kebocoran, cuff ETT kurang inflasi'],
              ['Apnea/rate rendah', 'Oversedasi, masalah neurologis, perburukan penyakit'],
            ].map(([a, p], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{a}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{p}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs italic text-slate-500 dark:text-slate-400"><strong>Prinsip:</strong> lihat pasien dulu, baru layar. Jangan menaikkan ambang alarm tanpa mengoreksi penyebab.</p>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Tabel Cepat Asinkroni</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Jenis</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Tampilan</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Ineffective triggering', 'Usaha tanpa napas terkirim', 'Cek auto-PEEP, sesuaikan trigger'],
              ['Double triggering', '2 napas tanpa jeda penuh', 'Perpanjang TInsp, evaluasi sedasi'],
              ['Flow starvation', 'Kurva tekanan cekung', 'Naikkan flow/rise time'],
              ['Delayed cycling', 'Inspirasi berlanjut lewat usaha pasien', 'Persingkat TInsp Max'],
              ['Premature cycling', 'Napas terpotong dini', 'Perpanjang TInsp Max'],
            ].map(([j, t, a], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{j}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{t}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 id="v11-checklist" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">11.5 Checklist Intubasi dan Checklist Ekstubasi</h3>
      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Checklist Intubasi — SOAPME</h4>
      <div className="bg-violet-50 dark:bg-violet-950/20 border border-violet-200/60 dark:border-violet-800/30 rounded-xl p-4 text-sm">
        <ul className="text-xs text-violet-700 dark:text-violet-400 space-y-1.5 list-none m-0">
          <li>☐ <strong>S</strong>uction — Yankauer siap, berfungsi</li>
          <li>☐ <strong>O</strong>xygen — sumber oksigen dan bag-mask siap</li>
          <li>☐ <strong>A</strong>irway — ETT ukuran sesuai + 1 lebih kecil + 1 lebih besar, laringoskop + bilah sesuai, stylet, plester</li>
          <li>☐ <strong>P</strong>harmacology — obat premedikasi/induksi/paralitik sesuai kebijakan lokal siap</li>
          <li>☐ <strong>M</strong>onitoring <strong>E</strong>quipment — pulse oximeter, kapnografi, EKG, tekanan darah terpasang</li>
        </ul>
      </div>
      <p className="text-sm"><strong>Pasca-intubasi — verifikasi wajib (urutan):</strong></p>
      <ol className="list-decimal list-inside space-y-1 text-sm">
        <li>☐ Kapnografi waveform positif</li>
        <li>☐ Auskultasi bilateral simetris, tidak ada suara di epigastrium</li>
        <li>☐ Pengembangan dada simetris</li>
        <li>☐ Konfirmasi radiologis (terutama neonatus)</li>
        <li>☐ Fiksasi tube adekuat, dokumentasikan kedalaman di bibir/gusi</li>
      </ol>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">Checklist Ekstubasi</h4>
      <p className="text-sm mb-1"><strong>Sebelum ekstubasi:</strong></p>
      <div className="bg-teal-50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-800/30 rounded-xl p-4 text-sm">
        <ul className="text-xs text-teal-700 dark:text-teal-400 space-y-1.5 list-none m-0">
          <li>☐ SBT lulus (dengan catatan keterbatasan pada preterm ekstrem — integrasikan penilaian klinis)</li>
          <li>☐ Hemodinamik stabil</li>
          <li>☐ Kesadaran adekuat, refleks proteksi jalan napas ada</li>
          <li>☐ FiO₂ dan PEEP sudah diturunkan mendekati level fisiologis</li>
          <li>☐ Modalitas dukungan pasca-ekstubasi <strong>sudah dipilih dan siap terpasang</strong> (bukan disiapkan setelahnya)</li>
          <li>☐ Tim yang mampu reintubasi darurat tersedia/dapat segera diakses</li>
          <li>☐ Alat suction siap</li>
        </ul>
      </div>
      <p className="text-sm mb-1"><strong>Saat/segera setelah ekstubasi:</strong></p>
      <div className="bg-teal-50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-800/30 rounded-xl p-4 text-sm">
        <ul className="text-xs text-teal-700 dark:text-teal-400 space-y-1.5 list-none m-0">
          <li>☐ Suction jalan napas dan orofaring sebelum melepas ETT</li>
          <li>☐ Segera pasang dukungan pasca-ekstubasi terencana</li>
          <li>☐ Pulse oximetry ± kapnografi terpasang</li>
          <li>☐ Observasi ketat pada jam-jam pertama (periode risiko tertinggi)</li>
        </ul>
      </div>
      <p className="border-l-4 border-rose-300 dark:border-rose-700 pl-4 py-1 text-sm font-medium italic bg-rose-50/50 dark:bg-rose-950/10 rounded-r-lg mb-0">
        <strong>Tanda kegagalan yang mengindikasikan reintubasi (jangan tunda):</strong> kerja napas tetap berat/memburuk meski support non-invasif maksimal; asidosis respiratorik memburuk progresif; apnea signifikan berulang tak respons terhadap NIV; instabilitas hemodinamik tidak membaik; penurunan kesadaran yang mengancam proteksi jalan napas.
      </p>

      <h3 id="v11-peta" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">Peta Navigasi Materi Lengkap</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Bab</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Judul</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Fokus Utama</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['1', 'Pendahuluan & Konsep Dasar', 'Lung-protective ventilation, fisiologi compliance-resistance-time constant'],
              ['2', 'ABC dalam Konteks Ventilasi', 'Anatomi jalan napas, interaksi kardiopulmoner'],
              ['3', 'Alat Bantu Napas Non-Invasif', 'HFNC, CPAP, NIPPV, NHFOV, kriteria kegagalan NIV'],
              ['4', 'Persiapan Intubasi', 'SOAPME, ukuran ETT, premedikasi, komplikasi'],
              ['5', 'Ventilator Secara Umum', 'Trigger-limit-cycle, waveform dasar, komponen Bellavista'],
              ['6', 'Mode-Mode Ventilator', 'VCV/PCV/PSV/PRVC/APRV/HFOV, mode neonatal spesifik'],
              ['7', 'Nilai & Parameter', 'Tabel angka setting per kategori pasien'],
              ['8', 'Monitoring', 'OI/OSI, kapnografi, alarm, compliance/resistance'],
              ['9', 'Troubleshooting', 'DOPE(S)/DOTTS, asinkroni, auto-PEEP, hipoksemia refrakter'],
              ['10', 'Weaning & Ekstubasi', 'SBT, prediktor kegagalan, dukungan pasca-ekstubasi'],
              ['11', 'Quick Reference', '(bab ini)'],
            ].map(([b, j, f], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-black text-indigo-600 dark:text-indigo-400 text-center">{b}</td>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{j}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{f}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
