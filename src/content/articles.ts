// Import your markdown files as raw strings
import designProcessContent from './posts/the-design-process.md?raw';
import wtfIsPrototypingContent from './posts/wtf-is-prototyping.md?raw';

export interface Article {
  title: string;
  date: string;
  slug: string;
  content?: string;
}

export const articles: Article[] = [
  { 
    title: "The Design Process", 
    date: "Mar 4", 
    slug: "the-design-process",
    content: designProcessContent 
  },
  { 
    title: "WTF is Prototyping?", 
    date: "Jan 24", 
    slug: "wtf-is-prototyping",
    content: wtfIsPrototypingContent
  },
  { title: "Notes on Deng Xiaoping", date: "Feb 22", slug: "notes-on-deng-xiaoping" },
  { title: "Annual Review 2025", date: "Jan 2", slug: "annual-review-2025" },
  { title: "Testing the extremes", date: "Nov 10", slug: "testing-the-extremes" },
  { title: "Folders are dead, long live folders", date: "Nov 3", slug: "folders-are-dead-long-live-folders" },
  { title: "More People, Less Progress: The Startup Scaling Paradox", date: "Oct 19", slug: "more-people-less-progress" },
  { title: "Tools ≠ skills", date: "Aug 4", slug: "tools-not-skills" },
  { title: "The Fidelity Trap", date: "Jul 3", slug: "the-fidelity-trap" },
  { title: "Context as the Moat", date: "Jun 15", slug: "context-as-the-moat" },
  { title: "Osaka Team Retreat Recap", date: "Apr 26", slug: "osaka-retreat" },
  { title: "Notes on Improving Churn", date: "Mar 12", slug: "improving-churn" },
  { title: "The Exodus Curve", date: "Feb 8", slug: "the-exodus-curve" },
  { title: "Annual Review 2024", date: "Jan 4", slug: "annual-review-2024" },
  { title: "The Continuum of Design", date: "Dec 26", slug: "continuum-of-design" },
  { title: "Place Your Bets", date: "Dec 18", slug: "place-your-bets" },
  { title: "End user programming – my experience building an iOS app", date: "Nov 22", slug: "end-user-programming" },
  { title: "A quick summary", date: "Oct 11", slug: "quick-summary" },
  { title: "Mini Programs v.s. Native Apps", date: "Jul 30", slug: "mini-programs-vs-native" },
  { title: "The Gnarly Bits of Product Design", date: "May 24", slug: "gnarly-bits" },
  { title: "Retaining an MVP mindset", date: "May 3", slug: "mvp-mindset" },
  { title: "Intervention ≠ good", date: "Feb 3", slug: "intervention-not-good" },
  { title: "Annual Review 2023", date: "Jan 4", slug: "annual-review-2023" },
  { title: "What will be absurd in 100 years?", date: "Dec 8", slug: "absurd-in-100-years" },
  { title: "Design files end up in the trash", date: "Nov 24", slug: "design-files-trash" },
  { title: "Thoughts on 2 consecutive 8.5 scores", date: "Nov 18", slug: "ai-and-feedback" },
];
