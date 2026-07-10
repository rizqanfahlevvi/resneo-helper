import { Droplets } from 'lucide-react';
import { TheoryTopicMeta, TheoryReference } from '../../types';

export const meta: TheoryTopicMeta = {
  id: 'hipoglikemia',
  category: 'Pasca-Resusitasi & Stabilisasi',
  title: 'Hipoglikemia Neonatus',
  shortTitle: 'Hipoglikemia Neonatus',
  teaser: 'Kelompok risiko, ambang AAP/PES, & algoritma 3 langkah.',
  badge: 'PES 2015 · AAP 2011 · Sugar Babies 2013',
  icon: Droplets,
  accent: 'emerald',
};

export const refs: TheoryReference[] = [
  { n: 1, text: 'Thornton PS, et al. Pediatric Endocrine Society (PES) recommendations for evaluation & management of persistent hypoglycemia in neonates, infants, and children. J Pediatr. 2015;167(2):238–245.' },
  { n: 2, text: 'Adamkin DH; AAP Committee on Fetus and Newborn. Postnatal glucose homeostasis in late-preterm and term infants. Pediatrics. 2011;127(3):575–579.' },
  { n: 3, text: 'Harris DL, et al. Dextrose gel for neonatal hypoglycaemia (Sugar Babies): randomised, double-blind, placebo-controlled trial. Lancet. 2013;382(9910):2077–2083.', link: 'https://doi.org/10.1016/S0140-6736(13)61645-1' },
  { n: 4, text: 'McKinlay CJD, et al. Neonatal glycemia and neurodevelopmental outcomes at 2 years (CHYLD study). N Engl J Med. 2015;373(16):1507–1518.' },
  { n: 5, text: 'WHO. Hypoglycaemia of the newborn: review of the literature. WHO/CHD/97.1. Geneva; 1997.' },
  { n: 6, text: 'Ikatan Dokter Anak Indonesia (IDAI). Panduan Praktik Klinis: Hipoglikemia Neonatus. 2022.' },
];
