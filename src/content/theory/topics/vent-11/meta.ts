import { ListChecks } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'vent-11',
  category: 'Ventilator Mekanik — Panduan Lengkap',
  title: 'Bab 11 — Ringkasan Referensi Cepat (Quick Reference)',
  shortTitle: 'Bab 11: Quick Reference',
  teaser: 'Kompilasi tabel kunci Bab 1–10: ETT, setting, monitoring, troubleshooting, checklist.',
  badge: 'Materi NICU/PICU · MD Kit & ResNeo Helper',
  icon: ListChecks,
  accent: 'indigo',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Kompilasi dari referensi Bab 1–10 — lihat masing-masing bab lengkap untuk daftar rujukan primer per topik.' },
];
