export type PickCategory = 'music' | 'podcast' | 'movie';

export interface Pick {
  category: PickCategory;
  title: string;
  creator: string;
  timeAgo: string;
  cover?: string;
  url?: string;
}

export const picks: Pick[] = [
  { category: 'music', title: 'Good Days', creator: 'SZA', timeAgo: '2 days ago', cover: 'https://upload.wikimedia.org/wikipedia/en/7/73/SZA_-_Good_Days.png' },
  { category: 'music', title: 'Blinding Lights', creator: 'The Weeknd', timeAgo: '4 days ago', cover: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36' },
  { category: 'music', title: 'HUMBLE.', creator: 'Kendrick Lamar', timeAgo: '1 week ago', cover: 'https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png' },
  { category: 'podcast', title: 'Huberman Lab #180', creator: 'Andrew Huberman', timeAgo: '3 days ago', cover: 'https://placehold.co/32x32/1a1a1a/ffffff?text=HL' },
  { category: 'podcast', title: 'How I Built This', creator: 'Guy Raz', timeAgo: '1 week ago', cover: 'https://placehold.co/32x32/1a1a1a/ffffff?text=HI' },
  { category: 'movie', title: 'Dune: Part Two', creator: 'Denis Villeneuve', timeAgo: '2 weeks ago', cover: 'https://image.tmdb.org/t/p/w92/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg' },
  { category: 'movie', title: 'Interstellar', creator: 'Christopher Nolan', timeAgo: '1 month ago', cover: 'https://image.tmdb.org/t/p/w92/gEU2QniE6E77NI6lCU6MxlNBvIe.jpg' },
];

export const categoryLabel: Record<PickCategory, string> = {
  music: 'music',
  podcast: 'podcasts',
  movie: 'movies',
};

export const categoryIcon: Record<PickCategory, string> = {
  music: '♪',
  podcast: '◉',
  movie: '▶',
};
