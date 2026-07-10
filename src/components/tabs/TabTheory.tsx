import { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { BookText, Star, ChevronRight, ChevronLeft, Search, ArrowLeft } from 'lucide-react';
import { useStore } from '../../store';
import { TOPICS, CATEGORY_ORDER } from '../../content/theory/registry';
import TheoryArticle from '../../content/theory/TheoryArticle';

function TopicSkeleton() {
  return (
    <div className="bg-white/60 dark:bg-slate-900/60 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 animate-pulse space-y-4">
      <div className="h-5 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded mt-4" />
      <div className="h-3 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="h-3 w-4/6 bg-slate-200 dark:bg-slate-800 rounded" />
    </div>
  );
}

export default function TabTheory() {
  const favoriteTheory = useStore((s) => s.favoriteTheory);
  const toggleFavoriteTheory = useStore((s) => s.toggleFavoriteTheory);
  const theoryDeepLinkId = useStore((s) => s.theoryDeepLinkId);
  const setTheoryDeepLinkId = useStore((s) => s.setTheoryDeepLinkId);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const topRef = useRef<HTMLDivElement>(null);

  // Konsumsi deep-link dari pencarian global (sekali pakai, lalu dikosongkan).
  useEffect(() => {
    if (theoryDeepLinkId && TOPICS.some((t) => t.id === theoryDeepLinkId)) {
      setActiveId(theoryDeepLinkId);
      setTheoryDeepLinkId(null);
    }
  }, [theoryDeepLinkId, setTheoryDeepLinkId]);

  // Gulir ke atas setiap kali pindah topik / kembali ke daftar.
  useEffect(() => {
    topRef.current?.scrollIntoView({ block: 'start' });
  }, [activeId]);

  const activeIndex = useMemo(() => TOPICS.findIndex((t) => t.id === activeId), [activeId]);
  const activeTopic = activeIndex >= 0 ? TOPICS[activeIndex] : null;
  const prevTopic = activeIndex > 0 ? TOPICS[activeIndex - 1] : null;
  const nextTopic = activeIndex >= 0 && activeIndex < TOPICS.length - 1 ? TOPICS[activeIndex + 1] : null;

  const q = query.trim().toLowerCase();
  const filteredTopics = q
    ? TOPICS.filter((t) => `${t.title} ${t.teaser} ${t.badge}`.toLowerCase().includes(q))
    : TOPICS;

  const favs = TOPICS.filter((t) => favoriteTheory.includes(t.id));

  // ── DETAIL VIEW: hanya satu topik dirender penuh, tidak ada tumpukan accordion ──
  if (activeTopic) {
    const Body = activeTopic.Body;
    return (
      <div ref={topRef} className="w-full h-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300 pb-36">
        <button
          onClick={() => setActiveId(null)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Daftar Topik
        </button>
        <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 px-1">{activeTopic.category}</span>

        <Suspense fallback={<TopicSkeleton />}>
          <TheoryArticle
            icon={activeTopic.icon}
            accent={activeTopic.accent}
            title={activeTopic.title}
            badge={activeTopic.badge}
            favorite={favoriteTheory.includes(activeTopic.id)}
            onToggleFavorite={() => toggleFavoriteTheory(activeTopic.id)}
            refs={activeTopic.refs}
          >
            <Body />
          </TheoryArticle>
        </Suspense>

        {/* Navigasi Prev/Next antar topik */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            disabled={!prevTopic}
            onClick={() => prevTopic && setActiveId(prevTopic.id)}
            className="flex items-center gap-2 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-left disabled:opacity-30 disabled:cursor-not-allowed hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="min-w-0">
              <span className="block text-[9px] font-bold uppercase text-slate-400">Sebelumnya</span>
              <span className="block text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{prevTopic?.shortTitle ?? '—'}</span>
            </div>
          </button>
          <button
            disabled={!nextTopic}
            onClick={() => nextTopic && setActiveId(nextTopic.id)}
            className="flex items-center justify-end gap-2 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-right disabled:opacity-30 disabled:cursor-not-allowed hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors"
          >
            <div className="min-w-0">
              <span className="block text-[9px] font-bold uppercase text-slate-400">Berikutnya</span>
              <span className="block text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{nextTopic?.shortTitle ?? '—'}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
          </button>
        </div>
      </div>
    );
  }

  // ── LIST VIEW: daftar ringkas per kategori, tidak me-render isi lengkap ──
  return (
    <div ref={topRef} className="w-full h-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-36">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <BookText className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">Materi &amp; Teori Medis</h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            {TOPICS.length} topik berbasis bukti (NRP 8th 2021, ILCOR, IDAI, RDS Guidelines) — pilih satu untuk membaca lengkap.
          </p>
        </div>
      </div>

      {/* Cari topik */}
      <div className="relative mb-6">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari topik teori…"
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 transition-all"
        />
      </div>

      {/* Strip Favorit */}
      {!q && favs.length > 0 && (
        <div className="mb-6 rounded-2xl border border-amber-200/70 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/10 p-4">
          <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2.5">
            <Star className="w-3.5 h-3.5" fill="currentColor" /> Topik Favorit
          </span>
          <div className="flex flex-wrap gap-2">
            {favs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 shadow-sm transition-colors"
              >
                <Star className="w-3 h-3 text-amber-400" fill="currentColor" /> {t.shortTitle}
              </button>
            ))}
          </div>
        </div>
      )}

      {q && filteredTopics.length === 0 && (
        <div className="text-slate-400 dark:text-slate-500 text-sm text-center py-8 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
          Tidak ditemukan topik untuk &quot;{query}&quot;.
        </div>
      )}

      <div className="space-y-7">
        {(q ? ['Hasil Pencarian'] : CATEGORY_ORDER).map((cat) => {
          const items = q ? filteredTopics : filteredTopics.filter((t) => t.category === cat);
          if (items.length === 0) return null;
          return (
            <section key={cat} className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-1">{cat}</h3>
              <div className="space-y-2">
                {items.map((t) => {
                  const Icon = t.icon;
                  const isFav = favoriteTheory.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveId(t.id)}
                      className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all text-left group"
                    >
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 shrink-0 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">{t.title}</span>
                          {isFav && <Star className="w-3 h-3 text-amber-400 shrink-0" fill="currentColor" />}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{t.teaser}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 group-hover:text-indigo-500 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="bg-slate-100 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center mt-8">
        <p className="text-xs text-slate-500 dark:text-slate-400 px-2 m-0">
          Materi ini adalah alat bantu kognitif berbasis pedoman terkini dan <strong>bukan</strong> pengganti penilaian klinis tenaga medis yang menangani langsung. Selalu rujuk pedoman resmi terbaru (NRP, ILCOR, IDAI) untuk keputusan definitif.
        </p>
      </div>
    </div>
  );
}
