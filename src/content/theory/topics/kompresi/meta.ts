import { HandHeart } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'kompresi',
  category: 'Sirkulasi, Obat & Kompresi',
  title: 'Kompresi Dada Neonatus (CPR)',
  shortTitle: 'Kompresi Dada',
  teaser: 'Teknik ibu jari melingkar, rasio 3:1, & evaluasi LDJ.',
  badge: 'NRP 8th 2021 · ILCOR CoSTR 2020',
  icon: HandHeart,
  accent: 'rose',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Weiner GM, ed. NRP 8th Ed. AAP; 2021 (rasio 3:1, 90 kompresi + 30 ventilasi/menit).' },
  { n: 2, text: 'Wyckoff MH, et al. 2020 ILCOR Neonatal CoSTR. Circulation. 2020;142(16 suppl 1):S185–S221.' },
  { n: 3, text: 'Christman C, et al. Two-thumb vs two-finger chest compression in a neonatal model. Arch Dis Child Fetal Neonatal Ed. 2011;96(2):F99–F101.' },
  { n: 4, text: 'Aziz K, et al. Part 5: Neonatal Resuscitation — 2020 AHA Guidelines for CPR & ECC. Circulation. 2020;142(16 suppl 2):S524–S550.' },
];
