import React from 'react';

export interface TheoryReference {
  n: number;
  text: string;
  link?: string;
}

export interface TheoryTopicMeta {
  id: string;
  category: string;
  title: string;
  /** Judul singkat untuk daftar/strip favorit */
  shortTitle: string;
  /** Ringkasan satu baris untuk kartu daftar */
  teaser: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}

export interface TheoryTopicEntry extends TheoryTopicMeta {
  refs: TheoryReference[];
  Body: React.LazyExoticComponent<React.ComponentType>;
}
