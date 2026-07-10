import TocNav from '../../TocNav';

export default function Body() {
  return (
    <>
      <TocNav
        items={[
          { id: 'v1-definisi', label: '1.1 Definisi, Tujuan & Filosofi Lung-Protective Ventilation' },
          { id: 'v1-fisiologi', label: '1.2 Fisiologi Respirasi Dasar yang Relevan' },
          { id: 'v1-perbedaan', label: '1.3 Perbedaan Fisiologis Neonatus vs Pediatrik vs Dewasa' },
          { id: 'v1-klasifikasi', label: '1.4 Klasifikasi Alat Bantu Napas' },
        ]}
      />

      <h3 id="v1-definisi" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">1.1 Definisi, Tujuan, dan Filosofi &quot;Lung-Protective Ventilation&quot;</h3>
      <p>
        Ventilasi mekanik adalah dukungan buatan terhadap fungsi ventilasi (pertukaran gas) ketika pasien tidak mampu mempertahankan oksigenasi dan/atau eliminasi CO₂ secara adekuat melalui usaha napas spontan. Tujuannya bukan sekadar &quot;membuat pasien bernapas&quot;, melainkan tiga hal sekaligus:
      </p>
      <ol className="list-decimal list-inside space-y-1.5 text-sm">
        <li><strong>Menjamin pertukaran gas adekuat</strong> — oksigenasi (PaO₂/SpO₂) dan ventilasi (PaCO₂) dalam rentang target yang sesuai kondisi klinis pasien.</li>
        <li><strong>Mengurangi kerja napas (work of breathing)</strong> — memberi waktu istirahat bagi otot pernapasan yang lelah atau imatur.</li>
        <li><strong>Meminimalkan cedera paru akibat ventilator (Ventilator-Induced Lung Injury/VILI)</strong> — prinsip sentral yang membedakan ventilasi modern dari pendekatan lama yang hanya berfokus pada angka gas darah normal.</li>
      </ol>
      <p>Filosofi <strong>lung-protective ventilation</strong> lahir dari pemahaman bahwa ventilator itu sendiri dapat menjadi sumber cedera, melalui empat mekanisme utama:</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Mekanisme</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Penyebab</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Konsekuensi</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Volutrauma', 'Tidal volume berlebihan → overdistensi alveolus', 'Ruptur alveolus, edema, inflamasi'],
              ['Barotrauma', 'Tekanan berlebihan (PIP/Pplat tinggi)', 'Pneumotoraks, pneumomediastinum, emfisema interstisial'],
              ['Atelektrauma', 'Alveolus kolaps-terbuka berulang (PEEP tidak adekuat)', 'Cedera epitel akibat gaya geser (shear stress)'],
              ['Biotrauma', 'Respons inflamasi sistemik akibat stres mekanik pada paru', 'Memperberat cedera paru dan organ jauh (multi-organ injury)'],
            ].map(([m, p, k], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{m}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{p}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{k}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Pada neonatus prematur, VILI berkontribusi signifikan terhadap <strong>bronkopulmonary dysplasia (BPD)</strong> — karena itu strategi &quot;gentle ventilation&quot; (tidal volume rendah, menghindari hipokapnia, minimal invasif bila memungkinkan) menjadi standar praktik saat ini, di mana tujuan dasar ventilasi mekanik adalah mengembalikan fungsi paru sambil membatasi cedera paru akibat ventilator, yang dianggap sebagai faktor risiko penting dalam perkembangan BPD.
      </p>
      <p className="mb-0">
        Pada anak dengan <strong>Pediatric ARDS (PARDS)</strong>, prinsip yang sama berlaku namun dengan target angka yang lebih terdefinisi secara formal.
      </p>

      <h3 id="v1-fisiologi" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">1.2 Fisiologi Respirasi Dasar yang Relevan</h3>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">1.2.1 Compliance (Kelenturan Paru)</h4>
      <p>
        Compliance menggambarkan seberapa mudah paru mengembang untuk perubahan tekanan tertentu (ΔV/ΔP) — yaitu volume yang dapat mengalir masuk ke paru pada perubahan tekanan tertentu. Karakteristiknya tidak linear:
      </p>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Pada volume/tekanan rendah</strong> — compliance rendah, karena alveolus harus &quot;dibuka&quot; dulu, butuh tekanan lebih besar untuk mencapai inflasi minimal.</li>
        <li><strong>Pada volume/tekanan tinggi</strong> — compliance juga rendah, karena paru sudah mendekati kapasitas maksimal (overdistensi).</li>
        <li><strong>Di tengah</strong> — compliance optimal, ini adalah zona kerja ideal ventilator (&quot;sweet spot&quot; pada kurva pressure-volume).</li>
      </ul>
      <p>
        Neonatus, khususnya prematur, secara fisiologis memiliki <strong>compliance paru rendah</strong> (terutama akibat defisiensi surfaktan) namun <strong>compliance dinding dada tinggi</strong> (tulang rawan lunak, otot interkostal imatur) — kombinasi ini membuat neonatus rentan kolaps alveolar dan atelektasis, dengan fisiologi respirasi neonatal yang dicirikan oleh compliance dinding dada yang lebih tinggi, compliance paru yang lebih rendah, dan resistensi jalan napas yang meningkat.
      </p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">1.2.2 Resistance (Resistensi Jalan Napas)</h4>
      <p>
        Resistensi adalah hambatan aliran gas melalui jalan napas (ΔP/flow). Dipengaruhi oleh diameter jalan napas (termasuk ETT — semakin kecil diameter, semakin besar resistensi), sekresi, bronkospasme, dan edema mukosa. Fisiologi jalan napas atas dan bawah pada anak dicirikan oleh resistensi aliran yang lebih tinggi dan kolapsibilitas jalan napas yang lebih besar dibanding dewasa — penjelasan mengapa anak lebih rentan gagal napas cepat saat jalan napas tersumbat sebagian.
      </p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">1.2.3 Time Constant (Konstanta Waktu)</h4>
      <p>
        Time constant (τ) = Compliance × Resistance. Ini menggambarkan <strong>seberapa cepat tekanan berekuilibrasi</strong> antara sirkuit ventilator dan alveolus — konsep krusial untuk menentukan inspiratory time dan expiratory time yang tepat.
      </p>
      <p>
        Tekanan mulut atau tekanan proksimal berekuilibrasi dengan tekanan alveolar dalam tiga hingga lima time constant; pada bayi baru lahir sehat nilai ini sekitar 0,33 detik, namun pada bayi prematur dengan respiratory distress syndrome yang compliance paru-nya menurun, time constant bisa sependek 0,05 detik.
      </p>
      <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-800/30 rounded-xl p-4">
        <h5 className="font-extrabold text-indigo-800 dark:text-indigo-300 text-xs uppercase tracking-widest mb-2">Implikasi Klinis Praktis</h5>
        <ul className="text-xs text-indigo-700 dark:text-indigo-400 space-y-1.5 list-disc list-inside m-0">
          <li><strong>Compliance rendah + resistance rendah</strong> (mis. RDS neonatal murni) → time constant <strong>pendek</strong> → butuh inspiratory time <strong>singkat</strong>, rate bisa <strong>cepat</strong>.</li>
          <li><strong>Compliance normal/tinggi + resistance tinggi</strong> (mis. penyakit paru kronis, meconium aspiration, bronkospasme) → time constant <strong>panjang</strong> → butuh inspiratory time <strong>dan</strong> expiratory time <strong>lebih panjang</strong>, rate <strong>lebih lambat</strong> untuk mencegah air trapping.</li>
        </ul>
      </div>
      <p>
        Pada bayi kecil dengan penyakit paru homogen, time constant sangat pendek karena compliance dan resistensi rendah; pada bayi dengan penyakit paru kronis, aspirasi mekonium, atau pneumonia, resistensi meningkat sehingga time constant memanjang dan dibutuhkan waktu inspirasi serta ekspirasi yang lebih panjang. Jika waktu inspirasi terlalu singkat, PCO₂ akan meningkat; jika waktu ekspirasi terlalu singkat, terjadi air trapping dan peningkatan CO₂ akibat peningkatan ruang rugi, yang juga dapat menurunkan curah jantung melalui distensi paru yang signifikan. Sebagai patokan umum, <strong>inspiratory time idealnya minimal 3× time constant</strong> agar volume tidal tersalur sempurna.
      </p>

      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">1.2.4 Work of Breathing (Kerja Napas)</h4>
      <p className="mb-0">
        Kerja napas pada neonatus meningkat, bahkan setelah memperhitungkan peningkatan kebutuhan respirasi dan laju metabolik. Diafragma neonatus juga lebih rentan lelah karena pada saat lahir memiliki lebih sedikit serat otot Tipe 1 (tipe serat lambat yang tahan lelah), sehingga diafragma bayi baru lahir dan prematur mudah lelah setelah usaha napas cepat yang berkepanjangan — hal ini berimplikasi pada gagal napas dan proses weaning dari ventilasi mekanik.
      </p>

      <h3 id="v1-perbedaan" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">1.3 Perbedaan Fisiologis Neonatus vs Pediatrik vs Dewasa</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-l-lg">Parameter</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Neonatus (prematur)</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300">Anak (pediatrik)</th>
              <th className="text-left p-2 font-extrabold text-slate-700 dark:text-slate-300 rounded-r-lg">Dewasa</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Compliance paru', 'Rendah (defisiensi surfaktan)', 'Meningkat seiring usia', 'Baseline referensi'],
              ['Compliance dinding dada', 'Sangat tinggi', 'Tinggi, menurun bertahap', 'Rendah/rigid'],
              ['Resistensi jalan napas', 'Tinggi (diameter kecil)', 'Tinggi, menurun bertahap', 'Baseline referensi'],
              ['Time constant', 'Pendek (0,05–0,33 detik)', 'Menengah', 'Lebih panjang'],
              ['Laju napas normal', '~30–60x/menit', '~15–40x/menit', '12–20x/menit'],
              ['Serat otot diafragma tipe 1', 'Sedikit → mudah lelah', 'Meningkat bertahap', 'Matur'],
              ['Rasio luas permukaan alveolus:BB', 'Kecil (cadangan O₂ rendah)', 'Meningkat bertahap', 'Baseline referensi'],
              ['Risiko kolaps jalan napas dinamis', 'Tinggi', 'Tinggi', 'Rendah'],
            ].map(([p, n, a, d], i) => (
              <tr key={i} className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/60 dark:bg-slate-900/30' : ''}`}>
                <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{p}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{n}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{a}</td>
                <td className="p-2 text-slate-600 dark:text-slate-400">{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-0">
        Peningkatan compliance dinding dada dan penurunan luas permukaan gas exchange paru mengurangi cadangan oksigen pulmoner dibanding kebutuhan oksigen metabolik yang lebih tinggi, menyebabkan desaturasi oksigen lebih cepat ketika ventilasi terganggu — ini alasan fisiologis mengapa neonatus dan anak kecil desaturasi jauh lebih cepat dibanding dewasa saat terjadi apnea atau obstruksi jalan napas, dan mengapa preoksigenasi serta kesiapan alat sebelum tindakan (mis. intubasi) menjadi sangat kritis.
      </p>

      <h3 id="v1-klasifikasi" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white pt-2 scroll-mt-4">1.4 Klasifikasi Alat Bantu Napas: Spektrum Non-Invasif hingga Invasif</h3>
      <p>Secara umum, dukungan respirasi tersusun sebagai sebuah <strong>spektrum eskalasi</strong>, bukan pilihan biner:</p>
      <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 rounded-xl p-4 overflow-x-auto">
        <div className="flex items-center gap-2 text-[11px] font-bold whitespace-nowrap min-w-max">
          <span className="px-2.5 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">Oksigen konvensional</span>
          <span className="text-slate-300">→</span>
          <span className="px-2.5 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">HFNC</span>
          <span className="text-slate-300">→</span>
          <span className="px-2.5 py-1.5 rounded-lg bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400">CPAP/nCPAP</span>
          <span className="text-slate-300">→</span>
          <span className="px-2.5 py-1.5 rounded-lg bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400">NIPPV/BiPAP</span>
          <span className="text-slate-300">→</span>
          <span className="px-2.5 py-1.5 rounded-lg bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400">NHFOV</span>
          <span className="text-slate-300">→</span>
          <span className="px-2.5 py-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400">Ventilasi Invasif</span>
          <span className="text-slate-300">→</span>
          <span className="px-2.5 py-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400">HFOV invasif</span>
          <span className="text-slate-300">→</span>
          <span className="px-2.5 py-1.5 rounded-lg bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400">ECMO</span>
        </div>
      </div>
      <p>Prinsip umum yang berlaku di seluruh spektrum ini:</p>
      <ul className="list-disc list-inside space-y-1 text-sm mb-0">
        <li><strong>Eskalasi</strong> dilakukan ketika level support saat ini gagal mempertahankan target oksigenasi/ventilasi, atau kerja napas pasien tetap berlebihan.</li>
        <li><strong>De-eskalasi</strong> (weaning) dilakukan progresif begitu kondisi membaik (Bab 10).</li>
        <li>Pilihan titik masuk ke spektrum ini bergantung pada derajat gagal napas, etiologi (paru primer vs sentral vs neuromuskular), dan usia/berat pasien.</li>
      </ul>
    </>
  );
}
