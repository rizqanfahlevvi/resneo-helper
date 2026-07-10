import { Wind } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'mekonium',
  category: 'Jalan Napas & Ventilasi',
  title: 'Mekonium dalam Air Ketuban (MSAF)',
  shortTitle: 'Mekonium (MSAF)',
  teaser: 'Bugar vs tidak bugar — kapan suction trakea diperlukan.',
  badge: 'NRP 2021 · Chettri, J Pediatr 2015',
  icon: Wind,
  accent: 'amber',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Aziz K, et al. Part 5: Neonatal Resuscitation — 2020 AHA/AAP. Pediatrics. 2021;147(suppl 1):e2020038505E.' },
  { n: 2, text: 'Chettri S, et al. Endotracheal suction for non-vigorous neonates born through MSAF: RCT. J Pediatr. 2015;166(5):1208–1213.' },
  { n: 3, text: 'Weiner GM, ed. NRP 8th Ed. AAP; 2021.' },
];
