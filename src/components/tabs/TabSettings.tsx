import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Type,
  Check,
  Moon,
  Sun,
  RotateCw,
  Baby,
  MessageSquare,
  Coffee,
  TrendingUp,
  ChevronDown,
  ShieldAlert,
  ExternalLink,
  Settings,
  Info,
  Linkedin,
  BookOpen,
  Bug,
  Trash2,
  Copy,
  ChevronRight,
} from 'lucide-react';
import { useSettingsStore, FontFamily } from '../../settings/useSettingsStore';
import { getFontFamilyStyle } from '../../settings/fontMap';
import { getStorageEstimate, refreshCacheAndReload, performHardReset, StorageEstimateInfo } from '../../utils/cacheUtils';
import { getErrorLog, clearErrorLog, ErrorLogEntry } from '../../utils/errorLog';

const WA_NUMBER = '6287749076019';

export default function TabSettings() {
  const [activeTab, setActiveTab] = useState<'settings' | 'about'>('settings');
  const [estimate, setEstimate] = useState<StorageEstimateInfo>({ used: '0 Bytes', quota: '0 Bytes', percentage: 0 });
  const [isOpenChangelog, setIsOpenChangelog] = useState<{ [key: string]: boolean }>({ v1: true });
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);

  const {
    fontFamily,
    fontScale,
    fontWeight,
    themeMode,
    bwMode,
    readingMode,
    vibrationEnabled,
    setFontFamily,
    setFontScale,
    setFontWeight,
    setThemeMode,
    setBwMode,
    setReadingMode,
    setVibrationEnabled,
    resetSettings,
  } = useSettingsStore();

  useEffect(() => {
    getStorageEstimate().then(setEstimate);
  }, []);

  const fontOptions: { id: FontFamily; label: string; sub: string }[] = [
    { id: 'lexend', label: 'Lexend (Default)', sub: 'Spasi dioptimalkan untuk klinis' },
    { id: 'inter', label: 'Inter', sub: 'Sans general-purpose bersih' },
    { id: 'roboto', label: 'Roboto', sub: 'Tipografi UI yang familiar' },
    { id: 'jetbrains', label: 'JetBrains Mono', sub: 'Angka kontras tinggi' },
    { id: 'poppins', label: 'Poppins', sub: 'Geometris & modern' },
    { id: 'montserrat', label: 'Montserrat', sub: 'Elegan & terstruktur' },
    { id: 'plus-jakarta', label: 'Plus Jakarta Sans', sub: 'Serbaguna & mudah dibaca' },
    { id: 'outfit', label: 'Outfit', sub: 'Modern & bersih' },
    { id: 'space-grotesk', label: 'Space Grotesk', sub: 'Tegas & futuristik' },
    { id: 'fira-code', label: 'Fira Code', sub: 'Gaya developer & terminal' },
    { id: 'quicksand', label: 'Quicksand', sub: 'Bulat & ramah' },
    { id: 'system', label: 'System UI', sub: 'Ikuti tampilan default perangkat' },
  ];

  const handleRefreshCache = () => {
    if (vibrationEnabled && navigator.vibrate) navigator.vibrate(100);
    refreshCacheAndReload();
  };

  const handleResetAllData = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua pengaturan dan mengembalikan aplikasi ke kondisi awal?')) {
      resetSettings();
      performHardReset();
    }
  };

  return (
    <div className="animate-in fade-in duration-300 pb-12">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Pengaturan & Info
          </h1>
        </div>

        {/* Tab Switcher - Segmented Control */}
        <div className="bg-slate-100 dark:bg-slate-900 p-1 rounded-xl flex border border-slate-200 dark:border-slate-800 mb-6">
          <button
            onClick={() => {
              setActiveTab('settings');
              if (vibrationEnabled && navigator.vibrate) navigator.vibrate(30);
            }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-700/50'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            Setting App
          </button>
          <button
            onClick={() => {
              setActiveTab('about');
              if (vibrationEnabled && navigator.vibrate) navigator.vibrate(30);
            }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
              activeTab === 'about'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-700/50'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <Info className="w-4 h-4" />
            About App
          </button>
        </div>

        {/* TAB 1: SETTING APP */}
        <AnimatePresence mode="wait">
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="space-y-6"
            >
              {/* Jenis Font */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 pl-3">
                  PENGATURAN TAMPILAN
                </h3>
                <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-1 z-10 relative">
                  <div className="p-4 bg-slate-50/60 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 rounded-t-xl">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <Type className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      Jenis Font (Keterbacaan)
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3">
                      Pilih tipografi yang paling nyaman untuk dibaca dalam kondisi klinis berat atau pencahayaan malam NICU/ruang bersalin.
                    </p>

                    <div className="relative">
                      <button
                        onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
                        className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div>
                          <p
                            className="text-sm font-bold text-slate-900 dark:text-white"
                            style={{ fontFamily: getFontFamilyStyle(fontFamily) }}
                          >
                            {fontOptions.find(o => o.id === fontFamily)?.label || 'System UI'}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {fontOptions.find(o => o.id === fontFamily)?.sub}
                          </p>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isFontDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isFontDropdownOpen && (
                          <>
                            <div
                              className="fixed inset-0 z-40"
                              onClick={() => setIsFontDropdownOpen(false)}
                            />
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-50 max-h-[60vh] overflow-y-auto"
                            >
                              <div className="p-1 flex flex-col gap-1 relative z-50">
                                {fontOptions.map((opt) => (
                                  <button
                                    key={opt.id}
                                    onClick={() => {
                                      setFontFamily(opt.id);
                                      setIsFontDropdownOpen(false);
                                    }}
                                    className={`w-full px-4 py-3 flex items-center justify-between text-left rounded-lg transition-all duration-150 ${
                                      fontFamily === opt.id ? 'bg-indigo-50 dark:bg-indigo-950/30' : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                                    }`}
                                  >
                                    <div>
                                      <p
                                        className={`text-sm ${fontFamily === opt.id ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'font-medium text-slate-900 dark:text-white'}`}
                                        style={{ fontFamily: getFontFamilyStyle(opt.id) }}
                                      >
                                        {opt.label}
                                      </p>
                                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{opt.sub}</p>
                                    </div>
                                    {fontFamily === opt.id && (
                                      <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
                                    )}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ukuran Font */}
              <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Ukuran Font</span>
                    <span className="text-xs bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 px-2.5 py-0.5 rounded-full font-semibold">
                      {Math.round(fontScale * 100)}%
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Sesuaikan skala huruf untuk memperjelas angka dosis dan parameter klinis di layar Anda.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-semibold">A</span>
                  <input
                    type="range"
                    min="0.50"
                    max="2.00"
                    step="0.05"
                    value={fontScale}
                    onChange={(e) => setFontScale(parseFloat(e.target.value))}
                    className="flex-1 accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-lg text-slate-900 dark:text-white font-bold">A</span>
                </div>

                {/* PREVIEW CONTAINER */}
                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-3 border border-slate-200/80 dark:border-slate-700/80 relative overflow-hidden">
                  <div className="absolute top-0 right-0 py-0.5 px-1.5 bg-slate-200/60 dark:bg-slate-700/60 text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 border-b border-l border-slate-200 dark:border-slate-700 rounded-bl-lg">
                    PREVIEW TAMPILAN SEBELUM DISIMPAN
                  </div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 mt-1.5">
                    UKURAN & KETEBALAN TEKS
                  </p>
                  <p className="text-sm text-slate-900 dark:text-white font-medium leading-relaxed" style={{ fontSize: `calc(13.5px * ${fontScale})` }}>
                    Dosis: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">0.3 mL</strong> Adrenalin 1:10.000 diberikan secara bolus IV cepat.
                  </p>
                </div>
              </div>

              {/* Ketebalan Font */}
              <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Ketebalan Font</span>
                    <span className="text-xs bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 px-2.5 py-0.5 rounded-full font-semibold">
                      {fontWeight === 0
                        ? 'Normal (Default)'
                        : fontWeight < 0
                          ? `${fontWeight <= -150 ? 'Sangat Tipis' : 'Tipis'} (${fontWeight})`
                          : `${fontWeight >= 200 ? 'Sangat Tebal' : fontWeight >= 100 ? 'Tebal' : 'Medium'} (+${fontWeight})`
                      }
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Sesuaikan ketebalan huruf (font weight offset) untuk mengoptimalkan kejelasan teks dan dosis darurat bedside.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-light">Sangat Tipis (-300)</span>
                  <input
                    type="range"
                    min="-300"
                    max="400"
                    step="50"
                    value={fontWeight}
                    onChange={(e) => setFontWeight(parseInt(e.target.value))}
                    className="flex-1 accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-slate-900 dark:text-white font-black">Sangat Tebal (+400)</span>
                </div>
              </div>

              {/* Mode Membaca (Reading Mode) */}
              <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    Reading Mode
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[260px]">
                    Mode kontras tinggi dengan tipografi khusus serif dan spasi longgar untuk membaca materi teori di lingkungan yang gelap.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-3 shrink-0">
                  <input
                    type="checkbox"
                    checked={readingMode}
                    onChange={(e) => setReadingMode(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 border border-slate-200 dark:border-slate-700"></div>
                </label>
              </div>

              {/* Theme Mode & Color Scheme */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Mode Tampilan</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Gunakan mode gelap di ruang bersalin/NICU yang minim cahaya untuk kenyamanan mata.
                    </p>
                  </div>

                  {/* System Theme Link Toggle */}
                  <div className="flex items-center justify-between p-3 bg-slate-50/60 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <div>
                      <h5 className="text-sm font-semibold text-slate-900 dark:text-white">Ikuti Sistem (System Theme)</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Sesuaikan otomatis dengan pengaturan perangkat</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={themeMode === 'system'}
                        onChange={(e) => setThemeMode(e.target.checked ? 'system' : 'dark')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  {/* Manual Dark / Light Toggle */}
                  {themeMode !== 'system' && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button
                        onClick={() => setThemeMode('light')}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition-all duration-150 ${
                          themeMode === 'light'
                            ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                      >
                        <Sun className="w-4 h-4" />
                        Light
                      </button>
                      <button
                        onClick={() => setThemeMode('dark')}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition-all duration-150 ${
                          themeMode === 'dark'
                            ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                      >
                        <Moon className="w-4 h-4" />
                        Dark
                      </button>
                    </div>
                  )}
                </div>

                {/* Black & White Mode */}
                <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Skema Warna</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Pilih antara mode berwarna dengan kategori klinis atau mode hitam-putih (B/W).
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setBwMode(false)}
                      className={`py-3 rounded-xl border font-bold text-sm transition-all duration-150 ${
                        !bwMode
                          ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      Warna
                    </button>
                    <button
                      onClick={() => setBwMode(true)}
                      className={`py-3 rounded-xl border font-bold text-sm transition-all duration-150 ${
                        bwMode
                          ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      Hitam-Putih
                    </button>
                  </div>
                </div>

                {/* Haptic Settings */}
                <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Getaran (Haptics)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Mengatur feedback getaran ringan ketika tombol ditekan.
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      Feedback Getaran (Haptics)
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={vibrationEnabled}
                        onChange={(e) => setVibrationEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Cache Management */}
              <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Update App & Cache</span>
                    <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full font-mono font-semibold">
                      {estimate.used}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Aplikasi ini berjalan dengan integrasi offline. Jika Anda mengalami kendala fungsional, fitur bermasalah, atau ingin memeriksa update versi terbaru dari aplikasi, ketuk tombol di bawah.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleRefreshCache}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-sm hover:bg-indigo-700 active:scale-[0.99] transition-all"
                  >
                    <RotateCw className="w-4 h-4" />
                    Refresh Cache & Reload App
                  </button>
                  <p className="text-[10.5px] text-center text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                    Log klinis & riwayat sesi tidak akan hilang
                  </p>
                </div>
              </div>

              {/* Error Log */}
              <ErrorLogCard />

              {/* Reset Section */}
              <div className="bg-red-50/40 dark:bg-red-950/10 rounded-2xl border border-red-200/60 dark:border-red-900/40 shadow-sm p-4 space-y-3">
                <div>
                  <h4 className="font-bold text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    Manajemen Penyimpanan & Reset
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Menghapus seluruh preferensi tampilan, log klinis, riwayat sesi, dan mengembalikan aplikasi ke setelan pabrik murni.
                  </p>
                </div>
                <button
                  onClick={handleResetAllData}
                  className="w-full border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 font-bold text-xs py-2.5 rounded-xl hover:bg-red-100/60 dark:hover:bg-red-950/30 transition-colors"
                >
                  Reset Semua Data & Pengaturan
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TAB 2: ABOUT APP */}
        <AnimatePresence mode="wait">
          {activeTab === 'about' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="space-y-6"
            >
              {/* App Identity Banner */}
              <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-black text-2xl shadow-md border border-white/10 mb-4">
                  <Baby className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  ResNeo Helper
                  <span className="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    v1.0
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-1">
                  Ur Daily Neonatal Emergency Companion
                </p>
              </div>

              {/* TENTANG */}
              <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-2">
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1.5">
                  TENTANG
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong className="text-slate-900 dark:text-white">ResNeo Helper</strong> merupakan bagian dari <strong className="text-indigo-600 dark:text-indigo-400 font-bold">MD Kit</strong>, cheatsheet interaktif resusitasi neonatus (NRP), stabilisasi pasca-resusitasi, serta kalkulasi dosis obat dan kebutuhan cairan neonatal.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Dirancang secara presisi mengikuti standar akurasi klinis terbaik untuk membantu Tenaga Medis mengambil keputusan bedside secara cepat, berbasis bukti, dan aman di kamar bersalin maupun NICU.
                </p>
              </div>

              {/* DIBUAT OLEH */}
              <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-3">
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400">
                  DIBUAT OLEH
                </h3>
                <a
                  href="https://id.linkedin.com/in/rizqanfahlevvi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50/60 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5] dark:text-[#00a0dc] border border-[#0077b5]/15">
                      <Linkedin className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Rizqan Fahlevvi</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Lihat profil LinkedIn →</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-all" />
                </a>
              </div>

              {/* MD Kit Ecosystem */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 pl-3">
                  MD KIT — KUNJUNGI HELPER LAINNYA
                </h3>
                <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden p-1">
                  {/* ResNeo Helper — Aplikasi Ini */}
                  <div className="px-4 py-3.5 flex items-center justify-between bg-indigo-50/40 dark:bg-indigo-950/10 rounded-t-xl">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">ResNeo Helper</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Resusitasi & Stabilisasi Neonatus</p>
                    </div>
                    <span className="text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 px-2.5 py-0.5 rounded-full uppercase">
                      Aplikasi Ini
                    </span>
                  </div>

                  {/* ICU Helper */}
                  <div className="px-4 py-3.5 flex items-center justify-between text-left opacity-70">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">ICU Helper</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Panduan tata laksana ICU Dewasa</p>
                    </div>
                    <span className="text-[9px] font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">Coming Soon</span>
                  </div>

                  {/* PICNIC Helper */}
                  <div className="px-4 py-3.5 flex items-center justify-between text-left opacity-70">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">PICNIC Helper</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Pediatric Bedside Decision Support</p>
                    </div>
                    <span className="text-[9px] font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">Coming Soon</span>
                  </div>

                  {/* ACLS Helper */}
                  <div className="px-4 py-3.5 flex items-center justify-between text-left opacity-70 rounded-b-xl">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">ACLS Helper</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Kardiovaskular & Resusitasi Dewasa</p>
                    </div>
                    <span className="text-[9px] font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">Coming Soon</span>
                  </div>
                </div>
              </div>

              {/* Feedback and Support */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 pl-3">
                  MASUKAN & DUKUNGAN
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo Rizqan, berikut feedback untuk ResNeo Helper:')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl text-center gap-1.5 transition-colors shadow-sm group"
                  >
                    <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Feedback App</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Bug, Saran & Komentar</span>
                  </a>
                  <a
                    href="https://saweria.co/rizqanfahlevvi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl text-center gap-1.5 transition-colors shadow-sm group"
                  >
                    <Coffee className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform animate-bounce" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Dukung Saweria</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Apresiasi Pengembang ☕</span>
                  </a>
                </div>
              </div>

              {/* CHANGELOG */}
              <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 flex items-center justify-between">
                  <span>CHANGELOG</span>
                  <TrendingUp className="w-4 h-4 text-slate-400" />
                </h3>

                <div className="space-y-3">
                  {/* Version 1.0 */}
                  <div>
                    <button
                      onClick={() => setIsOpenChangelog(prev => ({ ...prev, v1: !prev.v1 }))}
                      className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white focus:outline-none"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 text-xs">
                          v1.0
                        </span>
                        <span>Rilis Perdana</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpenChangelog.v1 ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpenChangelog.v1 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 text-xs text-slate-500 dark:text-slate-400 space-y-1.5 pl-2 border-l-2 border-indigo-100 dark:border-indigo-900/40"
                      >
                        <p>• 🚨 Alur resusitasi neonatus lengkap sesuai NRP 2021 (langkah awal, VTP, CPAP, kompresi dada, adrenalin).</p>
                        <p>• 🧠 Kalkulator skor klinis: APGAR, Downe, Thomson (HIE), New Ballard, Silverman-Anderson, FLACC, dan NIPS.</p>
                        <p>• 💉 Kalkulator dosis: adrenalin, surfaktan, inotropik, antibiotik, kejang, GIR, TPN, dan kebutuhan cairan.</p>
                        <p>• 📊 Dashboard pasien terintegrasi dengan identitas ibu, antropometri, dan log tindakan.</p>
                        <p>• 🗂️ Riwayat sesi resusitasi tersimpan otomatis, siap diekspor sebagai ringkasan rekam medis.</p>
                        <p>• 🌙 Dukungan Mode Gelap, PWA offline-first, dan pencarian cepat seluruh fitur aplikasi.</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ErrorLogCard() {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<ErrorLogEntry[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) setEntries(getErrorLog());
  }, [open]);

  const handleCopy = () => {
    const text = entries.map((e) => `[${e.timestamp}] (${e.source}) ${e.message}\n${e.stack || ''}`).join('\n\n');
    navigator.clipboard.writeText(text || 'Tidak ada error tercatat');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    clearErrorLog();
    setEntries([]);
  };

  return (
    <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Bug className="w-4 h-4 text-slate-400" />
          Log Error Aplikasi
        </span>
        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && (
        <div className="border-t border-slate-100 dark:border-slate-800 p-4 space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Jejak teknis jika aplikasi mengalami crash — kirimkan ke pengembang saat melapor bug.
          </p>
          {entries.length === 0 ? (
            <p className="text-xs text-slate-400 italic text-center py-3">Tidak ada error tercatat.</p>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {entries.map((e, i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2.5 text-[10.5px] font-mono text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between gap-2 mb-0.5">
                    <span className="font-bold text-red-500">{e.source}</span>
                    <span className="text-slate-400 shrink-0">{new Date(e.timestamp).toLocaleString('id-ID')}</span>
                  </div>
                  <p className="break-words">{e.message}</p>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" /> {copied ? 'Tersalin!' : 'Salin Log'}
            </button>
            <button
              onClick={handleClear}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-bold text-xs rounded-xl hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Hapus Log
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
