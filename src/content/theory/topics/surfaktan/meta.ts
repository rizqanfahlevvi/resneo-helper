import { Droplets } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'surfaktan',
  category: 'Neonatus Prematur',
  title: 'Terapi Surfaktan & LISA / MIST',
  shortTitle: 'Surfaktan & LISA/MIST',
  teaser: 'Indikasi, dosis preparat, & teknik LISA/INSURE/via ETT.',
  badge: 'OPTIMIST-A, JAMA 2021 · RDS 2023',
  icon: Droplets,
  accent: 'teal',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Sweet DG, et al. European Consensus Guidelines on the Management of RDS: 2022 Update. Neonatology. 2023;120(1):3–23.', link: 'https://doi.org/10.1159/000528914' },
  { n: 2, text: 'Dargaville PA, et al. Effect of Minimally-Invasive Surfactant Therapy (OPTIMIST-A) on death/BPD in preterm infants 25–28 wk: RCT. JAMA. 2021;326(24):2478–2487.', link: 'https://doi.org/10.1001/jama.2021.21892' },
  { n: 3, text: 'Aldana-Aguirre JC, et al. LISA vs INSURE: systematic review & meta-analysis. Arch Dis Child Fetal Neonatal Ed. 2017;102(1):F17–F23.' },
  { n: 4, text: 'Singh N, et al. Comparison of animal-derived surfactants (poractant alfa 200 vs 100 mg/kg; poractant vs beractant): systematic review. Cochrane Database Syst Rev. 2015;12:CD010249.' },
  { n: 5, text: 'Stevens TP, et al. Early surfactant + brief ventilation vs selective surfactant & continued ventilation (INSURE). Cochrane Database Syst Rev. 2007;4:CD003063.' },
  { n: 6, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation, 8th Ed. AAP; 2021 (surfaktan intratrakeal peri-resusitasi).' },
];
