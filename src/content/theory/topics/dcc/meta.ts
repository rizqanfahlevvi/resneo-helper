import { Scissors } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'dcc',
  category: 'Fisiologi & Prinsip Dasar',
  title: 'Delayed Cord Clamping (DCC)',
  shortTitle: 'Delayed Cord Clamping',
  teaser: 'Penundaan pemotongan tali pusat ≥30–60 detik pada bayi bugar.',
  badge: 'ILCOR 2020 · WHO 2014 · Cochrane',
  icon: Scissors,
  accent: 'teal',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Fogarty M, et al. Delayed vs early umbilical cord clamping for preterm infants: systematic review & meta-analysis. Am J Obstet Gynecol. 2018;218(1):1–18.', link: 'https://doi.org/10.1016/j.ajog.2017.10.231' },
  { n: 2, text: 'Rabe H, et al. Effect of timing of umbilical cord clamping and other strategies on preterm infants. Cochrane Database Syst Rev. 2019;9:CD003248.' },
  { n: 3, text: 'WHO Guideline: Delayed umbilical cord clamping for improved maternal and infant health. WHO; 2014.' },
  { n: 4, text: 'Wyckoff MH, et al. Neonatal Life Support: 2020 ILCOR Consensus (CoSTR). Circulation. 2020;142(16 suppl 1):S185–S221.' },
];
