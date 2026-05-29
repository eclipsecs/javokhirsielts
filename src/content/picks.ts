export type PickCategory = 'music' | 'podcast' | 'movie' | 'article';

export interface Pick {
  category: PickCategory;
  title: string;
  creator: string;
  timeAgo: string;
  cover?: string;
  url?: string;
}

export const picks: Pick[] = [
  {
    category: 'music',
    title: 'HUMBLE.',
    creator: 'Kendrick Lamar',
    timeAgo: '2 days ago',
    cover: 'https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png',
  },
  {
    category: 'music',
    title: 'Killshot',
    creator: 'Eminem',
    timeAgo: '4 days ago',
    cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Eminem_Killshot.jpg/250px-Eminem_Killshot.jpg',
  },
  {
    category: 'music',
    title: 'If I Lose Myself',
    creator: 'OneRepublic',
    timeAgo: '1 day ago',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/93/c1/37/93c137c8-90d8-687a-4f8a-f117ca99c0a1/14UMGIM12027.rgb.jpg/100x100bb.jpg',
  },
  {
    category: 'music',
    title: 'The Art of Love',
    creator: 'Lit Lords',
    timeAgo: '1 week ago',
    cover: 'https://lastfm.freetls.fastly.net/i/u/500x500/df30db8033c0614ce8a511da9dc69986.jpg',
  },
  {
    category: 'podcast',
    title: 'Tucker Carlson Network',
    creator: 'Tucker Carlson',
    timeAgo: '2 days ago',
    cover: 'https://i.podnews.network/r/t/150/510581-0352bd96.jpeg',
  },
  {
    category: 'podcast',
    title: 'If Books Could Kill',
    creator: 'Michael Hobbes & Peter Shamshiri',
    timeAgo: '3 days ago',
    cover: 'https://storage.buzzsprout.com/k9zro32pxohrzhs1mj4p8w1hemb2?.jpg',
  },
  {
    category: 'podcast',
    title: 'Lex Fridman Podcast',
    creator: 'Lex Fridman',
    timeAgo: '1 week ago',
    cover: 'https://lexfridman.com/wordpress/wp-content/uploads/powerpress/artwork_3000-230.png',
  },
  {
    category: 'podcast',
    title: 'Huberman Lab',
    creator: 'Andrew Huberman',
    timeAgo: '2 weeks ago',
    cover: 'https://cdn.prod.website-files.com/64416928859cbdd1716d79ce/6441c30ef12f50bc3f2449da_huberman-lab-podcast-cover.webp',
  },
  {
    category: 'podcast',
    title: 'Revolutions',
    creator: 'Mike Duncan',
    timeAgo: '1 week ago',
    cover: 'https://i.podnews.network/r/t/150/13607-9c54b308.jpeg',
  },
  {
    category: 'podcast',
    title: 'The Daily',
    creator: 'Eliana Dockterman',
    timeAgo: '3 days ago',
    cover: 'https://i.podnews.network/r/t/150/7141-3d5a02ad.jpeg',
  },
  {
    category: 'podcast',
    title: "You're Wrong About",
    creator: 'Sarah Marshall & Michael Hobbes',
    timeAgo: '3 weeks ago',
    cover: 'https://i.podnews.network/r/t/150/22313-18b58aaa.jpeg',
  },
  {
    category: 'movie',
    title: 'The Gentlemen',
    creator: 'Guy Ritchie',
    timeAgo: '1 week ago',
    cover: 'https://media.themoviedb.org/t/p/w92/jtrhTYB7xSrJxR1vusu99nvnZ1g.jpg',
  },
  {
    category: 'movie',
    title: 'All Quiet on the Western Front',
    creator: 'Edward Berger',
    timeAgo: '2 weeks ago',
    cover: 'https://media.themoviedb.org/t/p/w92/2IRjbi9cADuDMKmHdLK7LaqQDKA.jpg',
  },
  {
    category: 'movie',
    title: 'Tokyo Drift',
    creator: 'Justin Lin',
    timeAgo: '1 month ago',
    cover: 'https://media.themoviedb.org/t/p/w92/46xqGOwHbh2TH2avWSw3SMXph4E.jpg',
  },
];

export const categoryLabel: Record<PickCategory, string> = {
  music: 'music',
  podcast: 'podcasts',
  movie: 'movies',
  article: 'articles',
};

export const categoryIcon: Record<PickCategory, string> = {
  music: '♪',
  podcast: '◉',
  movie: '▶',
  article: '✦',
};
