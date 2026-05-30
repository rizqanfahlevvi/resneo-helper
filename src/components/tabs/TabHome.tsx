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
  Layers,
  Search,
  X
} from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SEARCH_INDEX } from '../GlobalSearch';

interface TabHomeProps {
  onNavigate: (tab: 'emergency' | 'scores' | 'advanced' | 'theory' | 'references') => void;
  onSearch?: () => void; // kept for Ctrl+K compatibility
}

export default function TabHome({ onNavigate, onSearch }: TabHomeProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    return SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.keywords.some(k => k.includes(q))
    ).slice(0, 8);
  }, [searchQuery]);

  const goToSlide = (idx: number) => {
    setSlideDirection(idx > activeSlide ? 1 : -1);
    setActiveSlide(idx);
  };

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

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance in pixels
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      const next = (activeSlide + 1) % slides.length;
      goToSlide(next);
    } else if (isRightSwipe) {
      const prev = (activeSlide - 1 + slides.length) % slides.length;
      goToSlide(prev);
    }
  };

  // Auto-switch carousel slides every 5 seconds (resetting timer on manual navigation)
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (activeSlide + 1) % slides.length;
      setSlideDirection(1);
      setActiveSlide(next);
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

      {/* Inline Search Bar */}
      <div className="mt-5 relative">
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm focus-within:border-indigo-400 dark:focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900/40 transition-all">
          <Search className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari algoritma, skor, obat..."
            className="flex-1 bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Inline Results */}
        {searchResults.length > 0 && (
          <div className="mt-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
            {searchResults.map((item, i) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.tab as any); setSearchQuery(''); }}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors ${i !== 0 ? 'border-t border-slate-100 dark:border-slate-800' : ''}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{item.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${item.badgeColor}`}>{item.badge}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{item.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 mt-0.5 shrink-0" />
              </button>
            ))}
          </div>
        )}

        {searchQuery.trim().length >= 2 && searchResults.length === 0 && (
          <div className="mt-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-5 text-center text-sm text-slate-400 dark:text-slate-500">
            Tidak ditemukan hasil untuk "<span className="font-semibold">{searchQuery}</span>"
          </div>
        )}
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

        {/* Left Column: Animated Carousel Hero */}
        <div className="lg:col-span-1 min-h-[220px] md:min-h-[260px] flex flex-col">
          <motion.div
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => handleSlideAction(slides[activeSlide])}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`flex-1 rounded-2xl p-6 ${slides[activeSlide].bgClass} shadow-lg relative overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-xl transition-shadow duration-300`}
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
            <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-32 h-32 bg-white/10 blur-xl rounded-full pointer-events-none" />

            {/* Saweria sparkle effect */}
            {activeSlide === 1 && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.6, 1], opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-16 right-6 w-20 h-20 bg-white/20 rounded-full blur-xl pointer-events-none"
                />
                <motion.div
                  animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  className="absolute top-4 left-1/2 -translate-x-1/2 text-white/40 text-lg pointer-events-none select-none"
                >
                  ✦
                </motion.div>
                <motion.div
                  animate={{ y: [0, -6, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                  className="absolute top-8 right-10 text-white/30 text-xs pointer-events-none select-none"
                >
                  ✦
                </motion.div>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ x: slideDirection * 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: slideDirection * -60, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-0.5 rounded bg-white/20 text-[9px] font-black tracking-widest uppercase">
                    {slides[activeSlide].badge}
                  </span>
                  {(() => {
                    const IconComp = slides[activeSlide].icon;
                    return (
                      <motion.div
                        animate={activeSlide === 1 ? { rotate: [0, 10, -10, 0] } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <IconComp className="w-8 h-8 opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
                      </motion.div>
                    );
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
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
              {slides[activeSlide].tab === 'link' ? (
                <motion.a
                  href="https://saweria.co/rizqanfahlevvi"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full bg-white text-slate-900 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 text-center decoration-none"
                >
                  {slides[activeSlide].btnLabel}
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.a>
              ) : (
                <motion.button
                  onClick={() => handleSlideAction(slides[activeSlide])}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full bg-white text-slate-900 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5"
                >
                  {slides[activeSlide].btnLabel}
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              )}

              {/* Slider Dots */}
              <div className="flex justify-center gap-1.5 self-center pt-1.5">
                {slides.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    animate={{ width: idx === activeSlide ? 16 : 8, opacity: idx === activeSlide ? 1 : 0.4 }}
                    transition={{ duration: 0.3 }}
                    className="h-2 rounded-full bg-white"
                    style={{ width: idx === activeSlide ? 16 : 8 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: 2x2 Grid for Specific Phase Shortcuts */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">

          {[
            {
              label: 'S&K',
              labelClass: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
              hoverBorder: 'hover:border-emerald-500/30',
              shadowColor: 'hover:shadow-emerald-100/50 dark:hover:shadow-none',
              title: 'Skor & Kalkulator',
              chevronClass: 'text-emerald-500',
              desc: 'Hitung Downe Score, APGAR, Ballard, Silverman-Anderson, dan dosis obat darurat berbasis berat badan.',
              tab: 'scores' as const,
              delay: 0,
            },
            {
              icon: Stethoscope,
              iconClass: 'bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
              hoverBorder: 'hover:border-cyan-500/30',
              shadowColor: 'hover:shadow-cyan-100/50 dark:hover:shadow-none',
              title: 'Stabilisasi NICU',
              chevronClass: 'text-cyan-500',
              desc: 'Panduan stabilisasi pasca resusitasi: GIR, inotropik vasoaktif, termoregulasi, dan STABLE.',
              tab: 'advanced' as const,
              delay: 0.05,
            },
            {
              icon: BookOpen,
              iconClass: 'bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400',
              hoverBorder: 'hover:border-violet-500/30',
              shadowColor: 'hover:shadow-violet-100/50 dark:hover:shadow-none',
              title: 'Materi & Teori',
              chevronClass: 'text-violet-500',
              desc: 'Pelajari teori dasar resusitasi neonatus, fisiologi transisi, dan prinsip klinis terkini.',
              tab: 'theory' as const,
              delay: 0.1,
            },
            {
              icon: ClipboardList,
              iconClass: 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
              hoverBorder: 'hover:border-amber-500/30',
              shadowColor: 'hover:shadow-amber-100/50 dark:hover:shadow-none',
              title: 'Pustaka & Referensi',
              chevronClass: 'text-amber-500',
              desc: 'Referensi pedoman klinis NRP, WHO, dan IDAI untuk penanganan neonatus berbasis bukti.',
              tab: 'references' as const,
              delay: 0.15,
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay, duration: 0.4, ease: 'easeOut' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => onNavigate(card.tab)}
              className={`group cursor-pointer bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800/90 p-5 rounded-3xl border border-slate-200/60 dark:border-white/5 transition-colors shadow-lg shadow-slate-200/40 dark:shadow-none flex items-start gap-4 ${card.hoverBorder} hover:shadow-xl ${card.shadowColor}`}
            >
              <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center font-black ${card.icon ? card.iconClass : card.labelClass}`}>
                {card.icon ? <card.icon className="w-5 h-5" /> : card.label}
              </div>
              <div className="space-y-1 my-auto">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  {card.title}
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all ${card.chevronClass}`} />
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

      </div>

      {/* Two Columns Section: Guidelines Workflow vs Drug Index Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8"
      >
        
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

      </motion.div>

      {/* Pustaka Alat & Skor Segment */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' }}
        className="mt-8 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none">
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

          {[
            { badge: 'APGAR SCORE', badgeClass: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400', borderHover: 'hover:border-indigo-500/30', shadowHover: 'hover:shadow-indigo-500/10', title: 'Evaluasi Menit ke-1, 5, 10', desc: 'Menilai Appearance (warna kulit), Pulse (LDJ), Grimace (refleks), Activity (tonus), dan Respiration (napas).', delay: 0.35 },
            { badge: 'DOWNE SCORE', badgeClass: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400', borderHover: 'hover:border-blue-500/30', shadowHover: 'hover:shadow-blue-500/10', title: 'Penilaian Distres Pernafasan', desc: 'Mengukur frekuensi napas, retraksi dada, sianosis, udara masuk paru-paru, dan rintihan (grunting).', delay: 0.4 },
            { badge: 'BALLARD SCORE', badgeClass: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400', borderHover: 'hover:border-emerald-500/30', shadowHover: 'hover:shadow-emerald-500/10', title: 'Estimasi Kematangan Gestasi', desc: 'Estimasi usia kehamilan bayi baru lahir menggunakan penilaian fisik dan neurologis (neuromuscular).', delay: 0.45 },
            { badge: 'SILVERMAN-ANDERSON', badgeClass: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400', borderHover: 'hover:border-amber-500/30', shadowHover: 'hover:shadow-amber-500/10', title: 'Distres Napas Prematur', desc: 'Skor khusus mengevaluasi keparahan sesak napas pada bayi lahir kurang bulan atau prematur.', delay: 0.5 },
          ].map((sc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sc.delay, duration: 0.4, ease: 'easeOut' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`bg-white/70 dark:bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md shadow-slate-200/40 dark:shadow-none space-y-2 hover:shadow-xl ${sc.shadowHover} ${sc.borderHover} transition-colors cursor-default`}
            >
              <span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded ${sc.badgeClass}`}>{sc.badge}</span>
              <h5 className="text-xs font-extrabold text-slate-800 dark:text-slate-100">{sc.title}</h5>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-snug">{sc.desc}</p>
            </motion.div>
          ))}

        </div>
      </motion.div>

    </div>
  );
}
