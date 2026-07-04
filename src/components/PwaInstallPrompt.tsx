import React from 'react';
import { useState, useEffect } from 'react';
import { Download, Share2, PlusSquare, X, Smartphone, ArrowBigDown } from 'lucide-react';
import { useRipple } from './Ripple';

export default function PwaInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const { addRipple, ripplesContainer } = useRipple();

  useEffect(() => {
    // Check display mode
    const checkStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    
    setIsStandalone(checkStandalone);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Handle beforeinstallprompt for Android/Chrome/Desktop
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Only show popup if not standalone and not dismissed recently
      const isDismissed = localStorage.getItem('pwa_prompt_dismissed');
      if (!checkStandalone && !isDismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // iOS prompt logic (iOS doesn't trigger beforeinstallprompt)
    if (isIosDevice && !checkStandalone) {
      const isDismissed = localStorage.getItem('pwa_prompt_dismissed');
      if (!isDismissed) {
        // Show iOS installer banner
        setShowPrompt(true);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      // Show iOS step-by-step instructions modal
      setShowIosGuide(true);
      setShowPrompt(false);
      return;
    }

    if (!deferredPrompt) return;

    // Trigger Android/Desktop native installer
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
      localStorage.setItem('pwa_prompt_dismissed', 'true');
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const dismissPrompt = () => {
    localStorage.setItem('pwa_prompt_dismissed', 'true');
    setShowPrompt(false);
  };

  if (isStandalone) return null;

  return (
    <>
      {/* 1. BOTTOM FLOATING INSTALL BANNER */}
      {showPrompt && (
        <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-6 md:w-[380px] bg-slate-900/95 dark:bg-slate-950/98 backdrop-blur-xl border border-slate-700/80 dark:border-white/10 p-4 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.45)] z-[80] flex flex-col gap-3 animate-in slide-in-from-bottom-5 duration-350 ease-out">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
                👶
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">Instal ResNeo Helper</h4>
                <p className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">Akses offline lebih cepat, stabil &amp; hemat kuota!</p>
              </div>
            </div>
            <button 
              onClick={dismissPrompt}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-2 mt-1">
            <button
              onClick={dismissPrompt}
              className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-400 border border-slate-700 hover:bg-white/5 hover:text-white transition-all active:scale-95"
            >
              Nanti Saja
            </button>
            <button
              onPointerDown={addRipple}
              onClick={handleInstallClick}
              className="relative overflow-hidden flex-[1.5] py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all active:scale-95"
            >
              {ripplesContainer}
              <Download className="w-3.5 h-3.5" />
              Instal Sekarang
            </button>
          </div>
        </div>
      )}

      {/* 2. iOS SHARE-TO-HOME-SCREEN GUIDANCE MODAL */}
      {showIosGuide && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-3xl border border-slate-200 dark:border-white/5 overflow-hidden animate-in zoom-in-95 duration-250 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 pb-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-950/20">
              <h3 className="font-extrabold text-sm text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                <Smartphone className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" />
                Panduan Instalasi iOS (Apple Safari)
              </h3>
              <button 
                onClick={() => setShowIosGuide(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Instruction Steps */}
            <div className="p-5 space-y-4 text-xs md:text-sm text-slate-600 dark:text-slate-400">
              <p className="leading-relaxed font-semibold">
                iOS tidak mendukung instalasi otomatis satu-klik. Ikuti langkah mudah berikut di peramban <strong>Safari</strong> Anda:
              </p>

              <div className="space-y-3.5">
                <div className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                  <p className="leading-relaxed">
                    Ketuk tombol <strong>Bagikan (Share)</strong> <Share2 className="inline-block w-4 h-4 text-indigo-500 mx-1 align-text-bottom" /> pada menu navigasi bagian bawah Safari Anda.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                  <p className="leading-relaxed">
                    Gulir ke bawah dan ketuk opsi <strong>"Tambahkan ke Layar Utama" (Add to Home Screen)</strong> <PlusSquare className="inline-block w-4 h-4 text-indigo-500 mx-1 align-text-bottom" />.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                  <p className="leading-relaxed">
                    Ketuk tombol <strong>"Tambah" (Add)</strong> di pojok kanan atas layar untuk menyelesaikan pemasangan.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-500/10 p-3 rounded-2xl border border-amber-200 dark:border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed flex gap-2">
                <span className="shrink-0 mt-0.5">💡</span>
                <span>Setelah terpasang, ikon <strong>ResNeo Helper</strong> akan muncul di layar beranda iOS Anda dan siap digunakan kapan saja tanpa internet!</span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-white/5 flex justify-end">
              <button
                onPointerDown={addRipple}
                onClick={() => {
                  setShowIosGuide(false);
                  localStorage.setItem('pwa_prompt_dismissed', 'true');
                }}
                className="relative overflow-hidden px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black shadow-md shadow-indigo-600/20 transition-all active:scale-95"
              >
                {ripplesContainer}
                Mengerti &amp; Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
