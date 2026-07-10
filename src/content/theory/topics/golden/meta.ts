import { Target } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'golden',
  category: 'Fisiologi & Prinsip Dasar',
  title: 'The Golden Minute (Menit Emas)',
  shortTitle: 'The Golden Minute',
  teaser: 'Prinsip 60 detik pertama: penilaian awal & keputusan VTP.',
  badge: 'NRP 8th Ed. 2021 · IDAI 2022',
  icon: Target,
  accent: 'orange',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation (NRP), 8th Edition. American Academy of Pediatrics; 2021.' },
  { n: 2, text: 'Aziz K, et al. Part 5: Neonatal Resuscitation — 2020 AHA Guidelines for CPR & ECC. Circulation. 2020;142(16 suppl 2):S524–S550.', link: 'https://doi.org/10.1161/CIR.0000000000000902' },
  { n: 3, text: 'Buku Panduan Resusitasi Neonatus, Edisi ke-8. Ikatan Dokter Anak Indonesia (IDAI); 2022.' },
];
