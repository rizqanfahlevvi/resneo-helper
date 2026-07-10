import { Stethoscope } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'intubasi',
  category: 'Jalan Napas & Ventilasi',
  title: 'Intubasi Endotrakeal & LMA',
  shortTitle: 'Intubasi ET & LMA',
  teaser: 'Indikasi, ukuran ETT per BB, kedalaman, & alternatif LMA.',
  badge: 'NRP 8th 2021 · Kempley, Resuscitation 2008',
  icon: Stethoscope,
  accent: 'violet',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation, 8th Ed. AAP; 2021.' },
  { n: 2, text: 'Kempley ST, et al. Endotracheal tube length for neonatal intubation: weight-based nomogram. Resuscitation. 2008;77(3):369–373.' },
];
