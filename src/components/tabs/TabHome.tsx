import { 
  Baby, 
  Activity, 
  ClipboardList, 
  Stethoscope, 
  ChevronRight, 
  ArrowRight, 
  Syringe, 
  Heart, 
  Wind, 
  AlertTriangle, 
  BookOpen, 
  Layers 
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface TabHomeProps {
  onNavigate: (tab: 'emergency' | 'scores' | 'advanced') => void;
}

export default function TabHome({ onNavigate }: TabHomeProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Carousel slider data for left hero card
  const slides = [
    {
      title: 'Mulai Protokol',
      subtitle: 'Resusitasi Neonatus',
      desc: 'Masuk ke dalam workspace resusitasi interaktif dengan master timer, asisten metronom, dan pencatatan log kronologis medis.',
      badge: 'WORKSPACE UTAMA',
      bgClass: 'bg-gradient-to-br from-rose-600 via-rose-500 to-orange-500 text-white',
      btnLabel: 'Mulai Skenario Baru',
      icon: Heart,
      tab: 'emergency' as const
    },
    {
      title: 'Dukungan Pengembangan',
      subtitle: 'saweria.co/rizqanfahlevvi',
      desc: 'Aplikasi ini dibuat gratis untuk membantu tenaga kesehatan. Dukung pengembangan lebih lanjut melalui platform Saweria secara sukarela.',
      badge: 'DUKUNGAN MANDIRI',
      bgClass: 'bg-gradient-to-br from-amber-600 to-yellow-500 text-white',
      btnLabel: 'Buka Saweria',
      icon: Baby,
      tab: 'link' as const
    }
  ];

  // Auto-switch carousel slides every 5 seconds (resetting timer on manual navigation)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeSlide, slides.length]);

  const handleSlideAction = (slide: typeof slides[number]) => {
    if (slide.tab === 'link') {
      window.open('https://saweria.co/rizqanfahlevvi', '_blank', 'noopener,noreferrer');
    } else {
      onNavigate(slide.tab);
    }
  };

  return (
    <div className="w-full text-slate-800 dark:text-slate-100 font-sans">
      {/* Top Header Jumbotron Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 pt-2 border-b border-slate-205 dark:border-slate-800/40">
        <div className="space-y-2">
          {/* Neonatal Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-105 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/30 font-extrabold uppercase tracking-widest text-[9px] md:text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Your Daily Neonatal Emergency Companion
          </div>
          
          <h1 className="text-3xl md:text-[40px] font-black tracking-tight leading-none text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-rose-600 dark:text-rose-500">ResNeo</span>Helper
          </h1>
          
          <p className="text-xs md:text-sm text-slate-505 dark:text-slate-400 max-w-2xl leading-relaxed">
            Asisten kognitif cerdas penanganan resusitasi neonatus, evaluasi distres pernapasan, perhitungan dosis darurat, serta penanganan lanjutan di unit intensif bayi baru lahir.
          </p>

          <div className="flex items-center gap-2 pt-1.5">
            <a 
              href="http://linkedin.com/in/rizqanfahlevvi/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50/70 dark:bg-slate-900 hover:bg-indigo-100 dark:hover:bg-slate-850 text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 rounded-lg border border-slate-200 dark:border-slate-800 transition-all hover:scale-[1.01]"
            >
              <svg className="w-3.5 h-3.5 text-indigo-650" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              MADE BY RIZQANFAHLEVVI
            </a>
          </div>
        </div>
      </div>

      {/* Segment Header Bar */}
      <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-white/5 p-3 rounded-xl mt-4 mb-6 flex items-center justify-between shadow-sm">
        <span className="text-xs font-black tracking-wider uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-rose-500" />
          Iktisar &amp; Akses Cepat Beranda
        </span>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-400 uppercase">Sistem Siap</span>
        </div>
      </div>

      {/* Core Hero and Quick Access Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Column: Intersecting Interactive Hero Slider Container */}
        <div className="lg:col-span-1 min-h-[220px] md:min-h-[260px] flex flex-col">
          <div 
            onClick={() => handleSlideAction(slides[activeSlide])}
            className={`flex-1 rounded-2xl p-6 ${slides[activeSlide].bgClass} shadow-lg relative overflow-hidden flex flex-col justify-between group transition-all duration-500 cursor-pointer hover:scale-[1.01] hover:shadow-xl`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSlideAction(slides[activeSlide]);
              }
            }}
            aria-label={`${slides[activeSlide].title}: ${slides[activeSlide].subtitle}`}
          >
            {/* Blurry glow */}
            <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-32 h-32 bg-white/10 blur-xl rounded-full" />
            
            <div>
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-0.5 rounded bg-white/20 text-[9px] font-black tracking-widest uppercase">
                  {slides[activeSlide].badge}
                </span>
                {/* Dynamically instantiate class icon */}
                {(() => {
                  const IconComp = slides[activeSlide].icon;
                  return <IconComp className="w-8 h-8 opacity-25 group-hover:scale-110 transition-transform duration-300" />;
                })()}
              </div>

              <div className="mt-4 space-y-1">
                <h2 className="text-3xl font-black tracking-tight leading-none">
                  {slides[activeSlide].title}
                </h2>
                <h3 className="text-lg font-bold opacity-90 tracking-tight leading-none">
                  {slides[activeSlide].subtitle}
                </h3>
                <p className="text-xs opacity-75 leading-relaxed pt-2 line-clamp-3">
                  {slides[activeSlide].desc}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
              {slides[activeSlide].tab === 'link' ? (
                <a
                  href="https://saweria.co/rizqanfahlevvi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-slate-900 hover:bg-slate-100 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-1.5 text-center decoration-none"
                >
                  {slides[activeSlide].btnLabel}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  onClick={() => handleSlideAction(slides[activeSlide])}
                  className="w-full bg-white text-slate-900 hover:bg-slate-100 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-1.5"
                >
                  {slides[activeSlide].btnLabel}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Slider Dots */}
              <div className="flex justify-center gap-1.5 self-center pt-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === activeSlide ? 'bg-white w-4' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 2x2 Grid for Specific Phase Shortcuts */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div 
            onClick={() => onNavigate('emergency')}
            className="group cursor-pointer bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800/90 p-5 rounded-3xl border border-slate-200/60 dark:border-white/5 transition-all shadow-lg shadow-slate-200/40 dark:shadow-none flex items-start gap-4 hover:border-rose-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-100 dark:bg-orange-500/10 text-orange-650 dark:text-orange-400 flex items-center justify-center font-black">
              F1
            </div>
            <div className="space-y-1 my-auto">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1">
                Langkah Awal Neonatus
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all text-orange-555" />
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Hangatkan, atur posisi, bersihkan jalan napas, keringkan, dan stimulasi taktil.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('emergency')}
            className="group cursor-pointer bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800/90 p-5 rounded-3xl border border-slate-200/60 dark:border-white/5 transition-all shadow-lg shadow-slate-200/40 dark:shadow-none flex items-start gap-4 hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-105 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black">
              VTP
            </div>
            <div className="space-y-1 my-auto">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1">
                Ventilasi Tekanan Positif (VTP)
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all text-blue-555" />
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Siklus tiup-dua-tiga ventilasi dengan masker balon mengembang sendiri selama 30 detik.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('scores')}
            className="group cursor-pointer bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800/90 p-5 rounded-3xl border border-slate-200/60 dark:border-white/5 transition-all shadow-lg shadow-slate-200/40 dark:shadow-none flex items-start gap-4 hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-650 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div className="space-y-1 my-auto">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1">
                Kalkulasi Dosis Darurat
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all text-emerald-555" />
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Ketuk langsung ukuran ETT, kedalaman pipa, dosis epinefrin IV/ETT, dan salin normal.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('advanced')}
            className="group cursor-pointer bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800/90 p-5 rounded-3xl border border-slate-200/60 dark:border-white/5 transition-all shadow-lg shadow-slate-200/40 dark:shadow-none flex items-start gap-4 hover:border-cyan-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-650 dark:text-cyan-400 flex items-center justify-center font-bold">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div className="space-y-1 my-auto">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1">
                Stabilisasi NICU &amp; STABLE
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all text-cyan-555" />
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Infus glukosa kontinu (GIR), inotropik vasoaktif, termoregulasi, dan evaluasi hasil Laborat.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Two Columns Section: Guidelines Workflow vs Drug Index Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        
        {/* Left Column: Neonatal Resuscitation Step Chronology Checklist */}
        <div className="lg:col-span-7 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100 dark:border-slate-805">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">ALGORITMA UTAMA</span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Alur Kronologi Resusitasi Neonatus</h3>
              </div>
              <button 
                onClick={() => onNavigate('emergency')}
                className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 shrink-0"
              >
                Lihat Lengkap <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-4">
              
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-rose-105 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-extrabold text-[11px] flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Persiapan Tim Medis &amp; Peralatan (Pre-Birth)</h5>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-snug mt-0.5">
                    Konseling antenatal, pembagian tugas peran tim resusitasi, uji coba fungsi hisap lendir, serta kalibrasi suhu penghangat inkubator.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-extrabold text-[11px] flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Langkah Awal (Golden Minute - 60 Detik Pertama)</h5>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-snug mt-0.5">
                    Lakukan pemotongan sribta tali pusat, keringkan seluruh tubuh bayi, rangsang refleks taktil pada tapak kaki atau punggung bayi.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-extrabold text-[11px] flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Evaluasi Paru-Paru &amp; Laju Denyut Jantung (LDJ)</h5>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-snug mt-0.5">
                    Bila bayi tidak menangis, megap-megap, atau denyut jantung di bawah 100 kali per menit, putuskan segera memulai VTP.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-extrabold text-[11px] flex items-center justify-center shrink-0">
                  4
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Melakukan Tindakan VTP Efektif (Balon-Masker)</h5>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-snug mt-0.5">
                    Gunakan tekanan awal 20-30 cmH2O. Jika dada bayi tidak mengembang, lakukan langkah koreksi MR. SOPA secara beruntun.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800/85 text-slate-600 dark:text-slate-450 font-extrabold text-[11px] flex items-center justify-center shrink-0">
                  5
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Sirkulasi Darurat: Kompresi Dada + Adrenalin</h5>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-snug mt-0.5">
                    Bila denyut jantung di bawah 60 pasca VTP adekuat, berikan CPR rasio 3 kompresi banding 1 ventilasi dan bersiap injeksi adrenalin.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Code Blue Meds Quick Index Reference */}
        <div className="lg:col-span-5 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100 dark:border-slate-805">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">OBAT &amp; DOSIS DARURAT</span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Referensi Cepat Obat Resusitasi</h3>
              </div>
              <button 
                onClick={() => onNavigate('scores')}
                className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 shrink-0"
              >
                Kalkulator <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3.5">
              
              <div className="p-3 bg-red-50/50 dark:bg-red-950/10 border-l-4 border-red-500 rounded-xl rounded-l-none flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-650 shrink-0 mt-0.5">
                  <Syringe className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 leading-snug">
                  <h6 className="text-[11px] font-extrabold text-red-700 dark:text-red-400 uppercase tracking-widest leading-none">Epinefrin / Adrenalin</h6>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Dosis: <strong className="text-red-600 dark:text-red-400 font-extrabold">0.1 - 0.3 mL/kg BB</strong> larutan pengenceran <strong className="font-extrabold">1:10.000</strong> secara Intravena / Intraosseus. Lewat ETT dapat diberikan 0.5 - 1.0 mL/kg.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-blue-50/50 dark:bg-blue-950/10 border-l-4 border-blue-500 rounded-xl rounded-l-none flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-650 shrink-0 mt-0.5">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 leading-snug">
                  <h6 className="text-[11px] font-extrabold text-blue-700 dark:text-blue-400 uppercase tracking-widest leading-none">Cairan Salin Normal (NaCl 0.9%)</h6>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Volume ekspansi: <strong className="text-blue-600 dark:text-blue-400 font-extrabold">10 mL/kg BB</strong> diberikan via UVC lambat selama 5-10 menit untuk mengatasi renjatan, syok atau anemia akibat kehilangan darah akut.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50/50 dark:bg-amber-950/10 border-l-4 border-amber-500 rounded-xl rounded-l-none flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-650 shrink-0 mt-0.5">
                  <Wind className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 leading-snug">
                  <h6 className="text-[11px] font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-widest leading-none">Dextrose 10% (GIR)</h6>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Atasi Hipoglikemia: Bolus <strong className="text-amber-600 dark:text-amber-400 font-extrabold">2 mL/kg BB D10%</strong> habis dalam 5 menit, diikuti asupan glukosa kontinu <strong className="font-extrabold">GIR 4 - 8 mg/kg/menit</strong>.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Pustaka Alat & Skor Segment */}
      <div className="mt-8 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none">
        <div className="flex justify-between items-center pb-4 mb-5 border-b border-slate-100 dark:border-slate-805">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block leading-none">REFERENSI AKADEMIK</span>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mt-0.5">Pustaka Skor Evaluasi Klinis</h3>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('scores')}
            className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-0.5 shrink-0"
          >
            Lihat Semua Skor <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md shadow-slate-200/40 dark:shadow-none space-y-2 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 hover:-translate-y-1 transition-all group">
            <span className="px-2 py-0.5 text-[8px] font-black uppercase bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 rounded">APGAR SCORE</span>
            <h5 className="text-xs font-extrabold text-slate-800 dark:text-slate-100">Evaluasi Menit ke-1, 5, 10</h5>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-snug">
              Menilai Appearance (warna kulit), Pulse (LDJ), Grimace (refleks), Activity (tonus), dan Respiration (napas).
            </p>
          </div>

          <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md shadow-slate-200/40 dark:shadow-none space-y-2 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30 hover:-translate-y-1 transition-all group">
            <span className="px-2 py-0.5 text-[8px] font-black uppercase bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 rounded">DOWNE SCORE</span>
            <h5 className="text-xs font-extrabold text-slate-800 dark:text-slate-100">Penilaian Distres Pernafasan</h5>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-snug">
              Mengukur frekuensi napas, retraksi dada, sianosis, udara masuk paru-paru, dan rintihan (grunting).
            </p>
          </div>

          <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md shadow-slate-200/40 dark:shadow-none space-y-2 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 hover:-translate-y-1 transition-all group">
            <span className="px-2 py-0.5 text-[8px] font-black uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded">BALLARD SCORE</span>
            <h5 className="text-xs font-extrabold text-slate-800 dark:text-slate-100">Estimasi Kematangan Gestasi</h5>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-snug">
              Estimasi usia kehamilan bayi baru lahir menggunakan penilaian fisik dan neurologis (neuromuscular).
            </p>
          </div>

          <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md shadow-slate-200/40 dark:shadow-none space-y-2 hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-500/30 hover:-translate-y-1 transition-all group">
            <span className="px-2 py-0.5 text-[8px] font-black uppercase bg-amber-100 dark:bg-amber-950 text-amber-970 dark:text-amber-400 rounded">SILVERMAN-ANDERSON</span>
            <h5 className="text-xs font-extrabold text-slate-800 dark:text-slate-100">Distres Napas Prematur</h5>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-snug">
              Skor khusus mengevaluasi keparahan sesak napas pada bayi lahir kurang bulan atau prematur.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
