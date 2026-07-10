import { Snowflake } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'hipotermia',
  category: 'Pasca-Resusitasi & Stabilisasi',
  title: 'Hipotermia Terapeutik (Cooling)',
  shortTitle: 'Hipotermia Terapeutik',
  teaser: 'Neuroproteksi HIE sedang–berat: kriteria, target suhu & durasi.',
  badge: 'NICHD 2005 · TOBY 2009 · Cochrane',
  icon: Snowflake,
  accent: 'cyan',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Shankaran S, et al. Whole-body hypothermia for neonates with HIE (NICHD NRN). N Engl J Med. 2005;353(15):1574–1584.', link: 'https://doi.org/10.1056/NEJMcps050929' },
  { n: 2, text: 'Azzopardi D, et al. Moderate hypothermia to treat perinatal asphyxial encephalopathy (TOBY). N Engl J Med. 2009;361(14):1349–1358.' },
  { n: 3, text: 'Jacobs SE, et al. Cooling for newborns with HIE. Cochrane Database Syst Rev. 2013;1:CD003311.' },
  { n: 4, text: 'NICE Interventional Procedures Guidance IPG347: Therapeutic hypothermia with intracorporeal temperature monitoring for HIE.' },
];
