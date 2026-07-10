import { Layers } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'prematur',
  category: 'Neonatus Prematur',
  title: 'Resusitasi Neonatus Prematur',
  shortTitle: 'Resusitasi Prematur',
  teaser: 'Termoregulasi, oksigen, & CPAP dini untuk bayi <35 minggu.',
  badge: 'European RDS 2023 · NRP 2021',
  icon: Layers,
  accent: 'amber',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Sweet DG, et al. European Consensus Guidelines on the Management of RDS: 2022 Update. Neonatology. 2023;120(1):3–23.', link: 'https://doi.org/10.1159/000528914' },
  { n: 2, text: 'McCall EM, et al. Interventions to prevent hypothermia at birth in preterm/LBW infants. Cochrane Database Syst Rev. 2018;2:CD004210.' },
  { n: 3, text: 'Weiner GM, ed. NRP 8th Ed. AAP; 2021.' },
];
