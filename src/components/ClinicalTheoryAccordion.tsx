import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useRipple } from './Ripple';

export default function ClinicalTheoryAccordion({ title, content, references }: { title: string, content: React.ReactNode, references: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const { addRipple, ripplesContainer } = useRipple();
  return (
    <div className="mt-8 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white/40 dark:bg-slate-900/10 backdrop-blur-md transition-all shadow-sm">
      <button
        onPointerDown={addRipple}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex justify-between items-center text-left font-bold text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors relative overflow-hidden"
      >
        {ripplesContainer}
        <span className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
          {title}
        </span>
        <svg className={`w-5 h-5 text-slate-400 transition-transform duration-350 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-white/5 text-xs md:text-sm text-slate-600 dark:text-slate-300 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {content}
          <div className="pt-4 border-t border-slate-200/60 dark:border-white/10">
            <span className="block font-bold text-xs text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">📚 Referensi Medis Terbaru:</span>
            <ul className="list-disc pl-4 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              {references.map((ref, idx) => (
                <li key={idx} className="leading-relaxed">{ref}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
