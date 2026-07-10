import { List } from 'lucide-react';

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Daftar isi mini di dalam satu topik/bab yang panjang. Memakai scrollIntoView
 * (BUKAN <a href="#...">) karena app ini memakai hash (#/tab) untuk routing
 * antar-tab — anchor href="#id" akan bentrok dengan router hash tersebut.
 */
export default function TocNav({ items }: { items: TocItem[] }) {
  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="not-prose bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-2">
      <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2.5">
        <List className="w-3.5 h-3.5" /> Daftar Isi Bab
      </span>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => jump(item.id)}
            className="text-left text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline py-0.5"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
