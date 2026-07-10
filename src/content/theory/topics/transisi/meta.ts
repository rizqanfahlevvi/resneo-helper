import { HeartPulse } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'transisi',
  category: 'Fisiologi & Prinsip Dasar',
  title: 'Fisiologi Transisi Kardiopulmonal',
  shortTitle: 'Transisi Kardiopulmonal',
  teaser: 'Penutupan foramen ovale & duktus arteriosus saat lahir.',
  badge: 'Hooper SB, Front Pediatr 2015',
  icon: HeartPulse,
  accent: 'rose',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Hooper SB, et al. Cardiovascular transition at birth: a physiological sequence. Front Pediatr. 2015;3:38.', link: 'https://doi.org/10.3389/fped.2015.00038' },
  { n: 2, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation, 8th Ed. AAP; 2021.' },
];
