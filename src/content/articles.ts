// Import your markdown files as raw strings
import abidingByStereotypesContent from './posts/abiding-by-stereotypes.md?raw';
import aiAndFeedbackContent from './posts/ai-and-feedback.md?raw';
import annualReview2025Content from './posts/annual-review-2025.md?raw';
import annualReview2026Content from './posts/annual-review-2026.md?raw';
import beingPiousContent from './posts/being-pious.md?raw';
import coursesVsSelfstudyContent from './posts/courses-vs-selfstudy.md?raw';
import daysOfJapanContent from './posts/days-of-japan.md?raw';
import educationPathToHumanityContent from './posts/education-pathto-humanity.md?raw';
import howToWriteAnEssayContent from './posts/how-to-write-an-essay.md?raw';
import humanConfrontationContent from './posts/human-confrontation.md?raw';
import improvingVocabularyContent from './posts/improving-vocabulary.md?raw';
import journalingDailyContent from './posts/journaling-daily.md?raw';
import learningEnglishNeverstopsContent from './posts/learning-english-neverstops.md?raw';
import learningFromInternetContent from './posts/learning-from-internet.md?raw';
import foundingJavokhirsieltsContent from './posts/founding-javokhirsielts.md?raw';
import professionAsTeacherContent from './posts/profession-as-teacher.md?raw';
import religiousObligationsContent from './posts/religious-obligations.md?raw';
import silenceDuringProgressContent from './posts/silence-during-progress.md?raw';
import skillsNotDegreesContent from './posts/skills-not-degrees.md?raw';
import theExodusOfNationContent from './posts/the-exodus-of-nation.md?raw';
import theFidelityTrapContent from './posts/the-fidelity-trap.md?raw';
import thoughtsOnDuolingoContent from './posts/thoughts-on-duolingo.md?raw';
import universityScamContent from './posts/university-scam.md?raw';
import uzbekCultureContent from './posts/uzbek-culture.md?raw';
import wtfIsIeltsContent from './posts/wtf-is-ielts.md?raw';
import sentenceMiningImage from './images/sentence-mining.png?url';

export interface Article {
  title: string;
  date: string;
  slug: string;
  content?: string;
  isNew?: boolean;
  image?: string;
}

// Helper to parse date string to comparable value
// Current time: 2026-03-20
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
  if (dateStr.includes('Annual Review 2026')) return new Date(2026, 0, 2).getTime();
  if (dateStr.includes('Annual Review 2025')) return new Date(2025, 0, 2).getTime();
  
  // For regular articles: if month > current month (March), it's last year
  // Otherwise it's this year
  const monthNum = months[monthStr] ?? 0;
  const year = monthNum > now.getMonth() ? currentYear - 1 : currentYear;
  
  return new Date(year, month, day).getTime();
};

// Raw articles data (unsorted)
const rawArticles: Omit<Article, 'isNew'>[] = [
  { 
    title: "Abiding by stereotypes?", 
    date: "Mar 15", 
    slug: "abiding-by-stereotypes",
    content: abidingByStereotypesContent 
  },
  { 
    title: "Thoughts on 2 consecutive 8.5 scores", 
    date: "Nov 18", 
    slug: "ai-and-feedback",
    content: aiAndFeedbackContent
  },
  { 
    title: "Annual Review 2026", 
    date: "Jan 2", 
    slug: "annual-review-2026",
    content: annualReview2026Content
  },
  { 
    title: "Being pious", 
    date: "Mar 10", 
    slug: "being-pious",
    content: beingPiousContent
  },
  { 
    title: "Attend courses VS Self-study", 
    date: "Feb 28", 
    slug: "courses-vs-selfstudy",
    content: coursesVsSelfstudyContent
  },
  { 
    title: "4 years of Japan", 
    date: "Mar 1", 
    slug: "days-of-japan",
    content: daysOfJapanContent
  },
  { 
    title: "Education never ends", 
    date: "Jan 20", 
    slug: "education-pathto-humanity",
    content: educationPathToHumanityContent
  },
  { 
    title: "How to write an essay", 
    date: "Feb 15", 
    slug: "how-to-write-an-essay",
    content: howToWriteAnEssayContent
  },
  { 
    title: "My current IELTS score", 
    date: "Nov 10", 
    slug: "human-confrontation",
    content: humanConfrontationContent
  },
  { 
    title: "Sentence mining", 
    date: "Mar 12", 
    slug: "improving-vocabulary",
    content: improvingVocabularyContent,
    image: sentenceMiningImage
  },
  { 
    title: "Daily journaling for self-reflection", 
    date: "Jan 25", 
    slug: "journaling-daily",
    content: journalingDailyContent
  },
  { 
    title: "Learning a language never stops", 
    date: "Feb 5", 
    slug: "learning-english-neverstops",
    content: learningEnglishNeverstopsContent
  },
  { 
    title: "Learning from Internet in the age of Internet", 
    date: "Dec 20", 
    slug: "learning-from-internet",
    content: learningFromInternetContent
  },
  { 
    title: "Retaining an MVP mindset", 
    date: "May 3", 
    slug: "founding-javokhirsielts",
    content: foundingJavokhirsieltsContent
  },
  { 
    title: "Profession as an English teacher", 
    date: "Mar 8", 
    slug: "profession-as-teacher",
    content: professionAsTeacherContent
  },
  { 
    title: "Religious obligations", 
    date: "Mar 5", 
    slug: "religious-obligations",
    content: religiousObligationsContent
  },
  { 
    title: "Maintain silence during progress", 
    date: "Apr 12", 
    slug: "silence-during-progress",
    content: silenceDuringProgressContent
  },
  { 
    title: "Skills over degrees", 
    date: "Aug 20", 
    slug: "skills-not-degrees",
    content: skillsNotDegreesContent
  },
  { 
    title: "The Exodus of people", 
    date: "Feb 8", 
    slug: "the-exodus-of-nation",
    content: theExodusOfNationContent
  },
  { 
    title: "The Fidelity Trap", 
    date: "Jul 3", 
    slug: "the-fidelity-trap",
    content: theFidelityTrapContent
  },
  { 
    title: "Thoughts on Duolingo", 
    date: "Nov 5", 
    slug: "thoughts-on-duolingo",
    content: thoughtsOnDuolingoContent
  },
  { 
    title: "The scam Universities inject in your brain", 
    date: "Oct 15", 
    slug: "university-scam",
    content: universityScamContent
  },
  { 
    title: "Uzbek Culture and Betrayal of each other", 
    date: "Sep 28", 
    slug: "uzbek-culture",
    content: uzbekCultureContent
  },
  { 
    title: "wtf is IELTS", 
    date: "Jan 15", 
    slug: "wtf-is-ielts",
    content: wtfIsIeltsContent
  },
  { 
    title: "Annual Review 2025", 
    date: "Jan 2", 
    slug: "annual-review-2025",
    content: annualReview2025Content
  },
];

// Sort articles by date (newest first) and add 'isNew' to the latest article
export const articles: Article[] = rawArticles
  .sort((a, b) => parseDate(b.date) - parseDate(a.date))
  .map((article, index) => ({
    ...article,
    isNew: index === 0
  }));
