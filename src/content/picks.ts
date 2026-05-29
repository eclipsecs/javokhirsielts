export type PickCategory = 'music' | 'podcast' | 'movie' | 'article';

export interface Pick {
  category: PickCategory;
  title: string;
  creator: string;
  timeAgo?: string;
  readTime?: string;
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
    category: 'article',
    title: 'Does Gravity Create Reality?',
    creator: 'New Scientist',
    readTime: '7 min read',
    cover: 'https://images.newscientist.com/wp-content/uploads/2026/05/13133140/SEI_296754903.jpg',
    url: 'https://www.newscientist.com/article/2526507-does-gravity-create-reality-a-shocking-path-to-a-theory-of-everything/',
  },
  {
    category: 'article',
    title: 'Horror Game Gets Its Creepiness from a Quantum Computer',
    creator: 'New Scientist',
    readTime: '5 min read',
    cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/New_Scientist.jpg/250px-New_Scientist.jpg',
    url: 'https://www.newscientist.com/article/2528415-horror-video-game-gets-its-creepiness-from-a-quantum-computer/',
  },
  {
    category: 'article',
    title: "We're Becoming More Individualistic and It's Affecting Our Love Lives",
    creator: 'New Scientist',
    readTime: '6 min read',
    cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/New_Scientist.jpg/250px-New_Scientist.jpg',
    url: 'https://www.newscientist.com/article/2528336-were-becoming-more-individualistic-and-its-affecting-our-love-lives/',
  },
  {
    category: 'article',
    title: 'Has Tom Hardy Been Fired from Mobland?',
    creator: 'The Guardian',
    readTime: '4 min read',
    cover: 'https://variety.com/wp-content/uploads/2026/05/Mobland-Tom-Hardy.jpg?w=200&h=200&crop=1',
    url: 'https://www.theguardian.com/tv-and-radio/2026/may/29/has-tom-hardy-been-fired-from-mobland-paramount',
  },
  {
    category: 'article',
    title: 'SNP Chief Peter Murrell Embezzled Funds – Guilty',
    creator: 'The Guardian',
    readTime: '4 min read',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Peter_Murrell_2014.jpg/250px-Peter_Murrell_2014.jpg',
    url: 'https://www.theguardian.com/commentisfree/2026/may/29/snp-chief-peter-murrell-embezzled-funds-guilty',
  },
  {
    category: 'article',
    title: 'The Maid Who Restored Charles II',
    creator: 'Anna Keay · History Today',
    readTime: '18 min read',
    cover: 'https://upload.wikimedia.org/wikipedia/en/f/f0/History_Today_March_2024.jpeg',
    url: 'https://www.historytoday.com/archive/feature/maid-who-restored-charles-ii',
  },
  {
    category: 'article',
    title: 'Saving the Forests of Revolutionary France',
    creator: 'Elisabeth Salje · History Today',
    readTime: '15 min read',
    cover: 'https://upload.wikimedia.org/wikipedia/en/f/f0/History_Today_March_2024.jpeg',
    url: 'https://www.historytoday.com/archive/feature/saving-forests-revolutionary-france',
  },
  {
    category: 'article',
    title: 'An Iranian in the Land of Israel',
    creator: 'History Today',
    readTime: '8 min read',
    cover: 'https://upload.wikimedia.org/wikipedia/en/f/f0/History_Today_March_2024.jpeg',
    url: 'https://www.historytoday.com/archive/history-matters/iranian-land-israel',
  },
  {
    category: 'article',
    title: 'What Factor Has Most Shaped Australian History?',
    creator: 'Angela Woollacott · History Today',
    readTime: '5 min read',
    cover: 'https://upload.wikimedia.org/wikipedia/en/f/f0/History_Today_March_2024.jpeg',
    url: 'https://www.historytoday.com/archive/head-head/what-factor-has-most-shaped-australian-history',
  },
  {
    category: 'article',
    title: 'The Multicultural Outback',
    creator: 'History Today',
    readTime: '6 min read',
    cover: 'https://upload.wikimedia.org/wikipedia/en/f/f0/History_Today_March_2024.jpeg',
    url: 'https://www.historytoday.com/reviews/multicultural-outback',
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
