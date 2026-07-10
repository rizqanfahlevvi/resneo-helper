import { Gauge } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'oksigen',
  category: 'Jalan Napas & Ventilasi',
  title: 'Manajemen Oksigen Periresusitasi',
  shortTitle: 'Manajemen Oksigen',
  teaser: 'Target SpO₂ pre-duktal per menit & titrasi FiO₂.',
  badge: 'NRP 8th 2021 · SUPPORT Trial 2010',
  icon: Gauge,
  accent: 'sky',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation, 8th Ed. AAP; 2021 (target SpO₂ pre-duktal).' },
  { n: 2, text: 'SUPPORT Study Group of the NICHD NRN. Target ranges of oxygen saturation in extremely preterm infants. N Engl J Med. 2010;362:1959–1969.', link: 'https://doi.org/10.1056/NEJMoa0911781' },
  { n: 3, text: 'Saugstad OD, et al. Systematic review of optimal FiO₂ for preterm resuscitation. Neonatology. 2019.' },
];
