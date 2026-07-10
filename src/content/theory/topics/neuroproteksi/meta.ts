import { HeartPulse } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'neuroproteksi',
  category: 'Pasca-Resusitasi & Stabilisasi',
  title: 'Neuroproteksi & Persiapan Antenatal',
  shortTitle: 'Neuroproteksi Antenatal',
  teaser: 'Kortikosteroid antenatal & MgSO₄ untuk ancaman prematur.',
  badge: 'BEAM, NEJM 2008 · Cochrane',
  icon: HeartPulse,
  accent: 'indigo',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Roberts D, et al. Antenatal corticosteroids for accelerating fetal lung maturation. Cochrane Database Syst Rev. 2017;3:CD004454.' },
  { n: 2, text: 'Rouse DJ, et al. Magnesium sulfate for prevention of cerebral palsy (BEAM trial). N Engl J Med. 2008;359(9):895–905.', link: 'https://doi.org/10.1056/NEJMoa0801187' },
  { n: 3, text: 'Doyle LW, et al. Magnesium sulphate for women at risk of preterm birth for neuroprotection. Cochrane Database Syst Rev. 2009;1:CD004661.' },
];
