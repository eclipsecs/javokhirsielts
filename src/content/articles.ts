// Import your markdown files as raw strings
import designProcessContent from './posts/the-design-process.md?raw';
import sentenceMiningImage from './images/sentence-mining.png?url';
import wtfIsPrototypingContent from './posts/wtf-is-prototyping.md?raw';
import notesOnDengXiaopingContent from './posts/notes-on-deng-xiaoping.md?raw';
import annualReview2025Content from './posts/annual-review-2025.md?raw';
import testingTheExtremesContent from './posts/testing-the-extremes.md?raw';
import foldersAreDeadContent from './posts/folders-are-dead-long-live-folders.md?raw';
import morePeopleLessProgressContent from './posts/more-people-less-progress.md?raw';
import toolsNotSkillsContent from './posts/tools-not-skills.md?raw';
import theFidelityTrapContent from './posts/the-fidelity-trap.md?raw';
import contextAsTheMoatContent from './posts/context-as-the-moat.md?raw';
import osakaRetreatContent from './posts/osaka-retreat.md?raw';
import improvingVocabularyContent from './posts/improving-vocabulary.md?raw';
import theExodusCurveContent from './posts/the-exodus-curve.md?raw';
import annualReview2024Content from './posts/annual-review-2024.md?raw';
import continuumOfDesignContent from './posts/continuum-of-design.md?raw';
import placeYourBetsContent from './posts/place-your-bets.md?raw';
import endUserProgrammingContent from './posts/end-user-programming.md?raw';
import quickSummaryContent from './posts/quick-summary.md?raw';
import miniProgramsVsNativeContent from './posts/mini-programs-vs-native.md?raw';
import gnarlyBitsContent from './posts/gnarly-bits.md?raw';
import mvpMindsetContent from './posts/mvp-mindset.md?raw';
import interventionNotGoodContent from './posts/intervention-not-good.md?raw';
import annualReview2023Content from './posts/annual-review-2023.md?raw';
import absurdIn100YearsContent from './posts/absurd-in-100-years.md?raw';
import designFilesTrashContent from './posts/design-files-trash.md?raw';
import aiAndFeedbackContent from './posts/ai-and-feedback.md?raw';

export interface Article {
  title: string;
  date: string;
  slug: string;
  content?: string;
  isNew?: boolean;
  image?: string;
}

// Helper to parse date string to comparable value
// Current time: 2026-03-13
const parseDate = (dateStr: string): number => {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Month mapping
  const months: Record<string, number> = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  
  const [monthStr, dayStr] = dateStr.split(' ');
  const month = months[monthStr] ?? 0;
  const day = parseInt(dayStr, 10);
  
  // Determine year based on article context
  // Annual reviews are published in January of the following year
  if (dateStr.includes('Annual Review 2025')) return new Date(2025, 0, 2).getTime();
  if (dateStr.includes('Annual Review 2024')) return new Date(2024, 0, 4).getTime();
  if (dateStr.includes('Annual Review 2023')) return new Date(2023, 0, 4).getTime();
  
  // For regular articles: if month > current month (March), it's last year
  // Otherwise it's this year
  const monthNum = months[monthStr] ?? 0;
  const year = monthNum > now.getMonth() ? currentYear - 1 : currentYear;
  
  return new Date(year, month, day).getTime();
};

// Raw articles data (unsorted)
const rawArticles: Omit<Article, 'isNew'>[] = [
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
  { title: "Notes on Deng Xiaoping", date: "Feb 22", slug: "notes-on-deng-xiaoping", content: notesOnDengXiaopingContent },
  { title: "Annual Review 2025", date: "Jan 2", slug: "annual-review-2025", content: annualReview2025Content },
  { title: "Testing the extremes", date: "Nov 10", slug: "testing-the-extremes", content: testingTheExtremesContent },
  { title: "Folders are dead, long live folders", date: "Nov 3", slug: "folders-are-dead-long-live-folders", content: foldersAreDeadContent },
  { title: "More People, Less Progress: The Startup Scaling Paradox", date: "Oct 19", slug: "more-people-less-progress", content: morePeopleLessProgressContent },
  { title: "Tools ≠ skills", date: "Aug 4", slug: "tools-not-skills", content: toolsNotSkillsContent },
  { title: "The Fidelity Trap", date: "Jul 3", slug: "the-fidelity-trap", content: theFidelityTrapContent },
  { title: "Context as the Moat", date: "Jun 15", slug: "context-as-the-moat", content: contextAsTheMoatContent },
  { title: "Osaka Team Retreat Recap", date: "Apr 26", slug: "osaka-retreat", content: osakaRetreatContent },
  { title: "Notes on improving vocabulary", date: "Mar 12", slug: "improving-vocabulary", content: improvingVocabularyContent, image: sentenceMiningImage },
  { title: "The Exodus Curve", date: "Feb 8", slug: "the-exodus-curve", content: theExodusCurveContent },
  { title: "Annual Review 2024", date: "Jan 4", slug: "annual-review-2024", content: annualReview2024Content },
  { title: "The Continuum of Design", date: "Dec 26", slug: "continuum-of-design", content: continuumOfDesignContent },
  { title: "Place Your Bets", date: "Dec 18", slug: "place-your-bets", content: placeYourBetsContent },
  { title: "End user programming – my experience building an iOS app", date: "Nov 22", slug: "end-user-programming", content: endUserProgrammingContent },
  { title: "A quick summary", date: "Oct 11", slug: "quick-summary", content: quickSummaryContent },
  { title: "Mini Programs v.s. Native Apps", date: "Jul 30", slug: "mini-programs-vs-native", content: miniProgramsVsNativeContent },
  { title: "The Gnarly Bits of Product Design", date: "May 24", slug: "gnarly-bits", content: gnarlyBitsContent },
  { title: "Retaining an MVP mindset", date: "May 3", slug: "mvp-mindset", content: mvpMindsetContent },
  { title: "Intervention ≠ good", date: "Feb 3", slug: "intervention-not-good", content: interventionNotGoodContent },
  { title: "Annual Review 2023", date: "Jan 4", slug: "annual-review-2023", content: annualReview2023Content },
  { title: "What will be absurd in 100 years?", date: "Dec 8", slug: "absurd-in-100-years", content: absurdIn100YearsContent },
  { title: "Design files end up in the trash", date: "Nov 24", slug: "design-files-trash", content: designFilesTrashContent },
  { title: "Thoughts on 2 consecutive 8.5 scores", date: "Nov 18", slug: "ai-and-feedback", content: aiAndFeedbackContent },
];

// Sort articles by date (newest first) and add 'isNew' to the latest article
export const articles: Article[] = rawArticles
  .sort((a, b) => parseDate(b.date) - parseDate(a.date))
  .map((article, index) => ({
    ...article,
    isNew: index === 0
  }));
