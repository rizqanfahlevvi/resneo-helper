import { Coffee } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'kafein',
  category: 'Neonatus Prematur',
  title: 'Kafein Sitrat — Apnea Prematuritas',
  shortTitle: 'Kafein Sitrat',
  teaser: 'Mekanisme, dosis loading/rumatan, & bukti CAP trial.',
  badge: 'CAP Trial, NEJM 2006/2007/2012',
  icon: Coffee,
  accent: 'violet',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Schmidt B, et al. Caffeine therapy for apnea of prematurity (CAP trial). N Engl J Med. 2006;354(20):2112–2121.', link: 'https://doi.org/10.1056/NEJMoa054065' },
  { n: 2, text: 'Schmidt B, et al. Long-term effects of caffeine on death or disability at 18 mo (CAP). N Engl J Med. 2007;357(19):1893–1902.' },
  { n: 3, text: 'Schmidt B, et al. Survival without disability to age 5 years after neonatal caffeine (CAP). JAMA. 2012;307(3):275–282.' },
  { n: 4, text: 'Dobson NR, Patel RM. The role of caffeine in the development of BPD. Clin Perinatol. 2016;43(4):773–782.' },
  { n: 5, text: 'Henderson-Smart DJ, De Paoli AG. Methylxanthine treatment for apnoea in preterm infants. Cochrane Database Syst Rev. 2010;12:CD000140.' },
  { n: 6, text: 'Neonatal Formulary 8th Ed. Caffeine citrate: loading 20 mg/kg, maintenance 5–10 mg/kg/day. Wiley-Blackwell; 2020.' },
];
