import { Activity } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'mrsopa',
  category: 'Jalan Napas & Ventilasi',
  title: 'Langkah Koreksi Ventilasi — MR. SOPA',
  shortTitle: 'MR. SOPA',
  teaser: '6 langkah koreksi VTP saat dada tidak mengembang.',
  badge: 'NRP 8th Ed. 2021',
  icon: Activity,
  accent: 'indigo',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation, 8th Ed. AAP; 2021 (langkah koreksi ventilasi MR. SOPA).' },
];
