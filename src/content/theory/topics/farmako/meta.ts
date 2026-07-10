import { Syringe } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'farmako',
  category: 'Sirkulasi, Obat & Kompresi',
  title: 'Dosis & Farmakologi Darurat',
  shortTitle: 'Farmakologi Darurat',
  teaser: 'Epinefrin & volume expander — indikasi dan dosis.',
  badge: 'NRP 8th Ed. 2021',
  icon: Syringe,
  accent: 'emerald',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Weiner GM, ed. NRP 8th Ed. AAP; 2021 (epinefrin 0,01–0,03 mg/kg IV/IO; 1:10.000).' },
  { n: 2, text: 'Aziz K, et al. 2020 AHA Neonatal Resuscitation Guidelines. Circulation. 2020;142:S524–S550.' },
];
