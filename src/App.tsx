/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowLeft, Moon, Sun, FileText, Download, ChevronDown, Check } from 'lucide-react';
import { annotate } from 'rough-notation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { articles } from './content/articles';
import { picks, categoryLabel, categoryIcon, PickCategory } from './content/picks';
import { currentStatus } from './content/now';
import { activityData } from './content/activity';
import type { ActivityEntry } from './content/activity';
import sentenceMiningImage from './content/images/sentence-mining.png';
import rtb9Image from './content/images/rtb9-img.png';
import orangeLogo from './content/images/orange-logo.png';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'arsenal-of-speaking' | 'personal-essays' | 'arsenal-of-writing';
  filePath: string;
  fileType: 'pdf' | 'docx';
  fileSize: string;
}

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Speak 1.1',
    description: 'Essential speaking materials for IELTS preparation.',
    category: 'arsenal-of-speaking',
    filePath: '/resources/arsenal of speaking/Speak 1.1.pdf',
    fileType: 'pdf',
    fileSize: '2.2 MB'
  },
  {
    id: '2',
    title: 'Task 1 Chunks',
    description: 'Useful phrases and structures for IELTS Writing Task 1.',
    category: 'arsenal-of-writing',
    filePath: '/resources/arsenal of writing/task 1 chunks.docx',
    fileType: 'docx',
    fileSize: '1.9 MB'
  },
  {
    id: '3',
    title: 'My Task 2s',
    description: 'Sample Task 2 essays for practice and learning.',
    category: 'personal-essays',
    filePath: '/resources/personal essays/my task 2s.docx',
    fileType: 'docx',
    fileSize: '193 KB'
  }
];

const WEEKS = 53;
const CELL = 11;
const GAP = 2;
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_LABELS = ['','Mon','','Wed','','Fri',''];

const LEVEL_CLASSES = [
  'bg-[#ebedf0] dark:bg-[#2d333b]',
  'bg-[#9be9a8] dark:bg-[#0e4429]',
  'bg-[#40c463] dark:bg-[#006d32]',
  'bg-[#30a14e] dark:bg-[#26a641]',
  'bg-[#216e39] dark:bg-[#39d353]',
];

function getLevel(count: number) {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count <= 4) return 3;
  return 4;
}

function ContributionGraph({ selectedDate, onDayClick }: { selectedDate?: string; onDayClick?: (date: string) => void }) {
  const [tooltip, setTooltip] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  const grid = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setDate(start.getDate() - (WEEKS * 7 - 1));
    start.setDate(start.getDate() - start.getDay());

    const weeks: { date: string; count: number; future: boolean; monthLabel?: string }[][] = [];
    const cur = new Date(start);
    let prevMonth = -1;

    for (let w = 0; w < WEEKS; w++) {
      const week: typeof weeks[0] = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = cur.toISOString().split('T')[0];
        const month = cur.getMonth();
        const entry = activityData[dateStr];
        week.push({
          date: dateStr,
          count: entry ? entry.logs.length : 0,
          future: cur > today,
          ...(d === 0 && month !== prevMonth ? { monthLabel: MONTHS[month] } : {}),
        });
        if (d === 0 && month !== prevMonth) prevMonth = month;
        cur.setDate(cur.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  }, []);

  return (
    <div className="relative">
      <div className="flex gap-[2px] overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="flex flex-col gap-[2px] mr-1.5 shrink-0 pt-[16px]">
          {DAY_LABELS.map((label, i) => (
            <div key={i} className="text-[9px] text-[#bbb] dark:text-[#555] text-right pr-0.5" style={{ height: `${CELL}px`, lineHeight: `${CELL}px` }}>
              {label}
            </div>
          ))}
        </div>
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[2px] shrink-0">
            <div className="text-[9px] text-[#bbb] dark:text-[#555] h-[14px] leading-none whitespace-nowrap">
              {week[0].monthLabel ?? ''}
            </div>
            {week.map((day, di) => (
              <div
                key={di}
                style={{ width: `${CELL}px`, height: `${CELL}px` }}
                className={`rounded-sm transition-all ${
                  day.future
                    ? 'opacity-0 pointer-events-none'
                    : `${LEVEL_CLASSES[getLevel(day.count)]} ${onDayClick && day.count > 0 ? 'cursor-pointer' : 'cursor-default'} ${selectedDate === day.date ? 'ring-2 ring-offset-1 ring-[#1a1a1a] dark:ring-[#f5f5f5]' : ''}`
                }`}
                onClick={() => !day.future && day.count > 0 && onDayClick?.(day.date)}
                onMouseEnter={e => {
                  if (day.future) return;
                  const r = (e.target as HTMLElement).getBoundingClientRect();
                  setTooltip({ date: day.date, count: day.count, x: r.left + r.width / 2, y: r.top });
                }}
                onMouseLeave={() => setTooltip(null)}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 mt-2 justify-end">
        <span className="text-[9px] text-[#bbb] dark:text-[#555]">Less</span>
        {LEVEL_CLASSES.map((cls, i) => (
          <div key={i} className={`rounded-sm shrink-0 ${cls}`} style={{ width: `${CELL}px`, height: `${CELL}px` }} />
        ))}
        <span className="text-[9px] text-[#bbb] dark:text-[#555]">More</span>
      </div>

      {tooltip && (
        <div
          className="fixed z-50 px-2 py-1 text-[10px] bg-[#1a1a1a] dark:bg-[#f5f5f5] text-white dark:text-[#1a1a1a] rounded-md whitespace-nowrap pointer-events-none shadow-md"
          style={{ left: tooltip.x, top: tooltip.y - 32, transform: 'translateX(-50%)' }}
        >
          {tooltip.count > 0 ? `${tooltip.count} ${tooltip.count === 1 ? 'entry' : 'entries'}` : 'No entries'}
          {' · '}
          {new Date(tooltip.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [showResources, setShowResources] = useState<boolean>(false);
  const [showActivities, setShowActivities] = useState<boolean>(false);
  const [selectedActivityDate, setSelectedActivityDate] = useState<string | undefined>(
    () => Object.keys(activityData).sort().reverse()[0]
  );
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '');
      setCurrentSlug(path || null);
    };
    window.addEventListener('popstate', handlePopState);
    
    // Initial load
    const initialPath = window.location.pathname.replace('/', '');
    if (initialPath === 'resources') {
      setShowResources(true);
    } else if (initialPath === 'activities') {
      setShowActivities(true);
    } else if (initialPath && articles.find(a => a.slug === initialPath)) {
      setCurrentSlug(initialPath);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (slug: string | null) => {
    setShowResources(false);
    setShowActivities(false);
    setCurrentSlug(slug);
    const url = slug ? `/${slug}` : '/';
    window.history.pushState({}, '', url);
    window.scrollTo(0, 0);
  };

  const navigateToResources = () => {
    setCurrentSlug(null);
    setShowActivities(false);
    setShowResources(true);
    window.history.pushState({}, '', '/resources');
    window.scrollTo(0, 0);
  };

  const navigateToActivities = () => {
    setCurrentSlug(null);
    setShowResources(false);
    setShowActivities(true);
    window.history.pushState({}, '', '/activities');
    window.scrollTo(0, 0);
  };

  const currentArticle = articles.find(a => a.slug === currentSlug);
  const currentIndex = articles.findIndex(a => a.slug === currentSlug);
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const cambridgeRef = useRef<HTMLAnchorElement>(null);
  const cambridgeAnnotationRef = useRef<any>(null);
  const articleRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const articleAnnotations = useRef<Record<string, any>>({});
  const statusLinkRef = useRef<HTMLSpanElement>(null);
  const statusLinkAnnotationRef = useRef<any>(null);

  useEffect(() => { statusLinkAnnotationRef.current = null; }, [darkMode]);

  const handleStatusLinkEnter = () => {
    if (statusLinkRef.current) {
      if (!statusLinkAnnotationRef.current) {
        statusLinkAnnotationRef.current = annotate(statusLinkRef.current, {
          type: 'highlight',
          color: darkMode ? '#475569' : '#cbd5e1',
          strokeWidth: 0,
          padding: 3,
          animationDuration: 480,
          iterations: 2,
        });
      }
      statusLinkAnnotationRef.current.show();
    }
  };

  const handleStatusLinkLeave = () => {
    statusLinkAnnotationRef.current?.hide();
  };

  const handleArticleMouseEnter = (slug: string) => {
    const el = articleRefs.current[slug];
    if (el && !articleAnnotations.current[slug]) {
      articleAnnotations.current[slug] = annotate(el, {
        type: 'underline',
        color: '#343a40',
        strokeWidth: 1.5,
        padding: 1,
        animationDuration: 600,
      });
    }
    articleAnnotations.current[slug]?.show();
  };

  const handleArticleMouseLeave = (slug: string) => {
    articleAnnotations.current[slug]?.hide();
  };

  useEffect(() => {
    if (cambridgeRef.current) {
      const annotation = annotate(cambridgeRef.current, {
        type: 'underline',
        color: '#1e3a5f',
        strokeWidth: 2,
        padding: 0.1,
        multiline: true,
        animationDuration: 800
      });
      cambridgeAnnotationRef.current = annotation;
    }
  }, []);

  const handleCambridgeMouseEnter = () => {
    if (cambridgeAnnotationRef.current) {
      cambridgeAnnotationRef.current.show();
    }
  };

  const handleCambridgeMouseLeave = () => {
    if (cambridgeAnnotationRef.current) {
      cambridgeAnnotationRef.current.hide();
    }
  };

  const [articleFilter, setArticleFilter] = useState<string>('all');
  const [articleDropdownOpen, setArticleDropdownOpen] = useState(false);
  const articleDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (articleDropdownRef.current && !articleDropdownRef.current.contains(e.target as Node)) {
        setArticleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const getArticleSource = (creator: string) => creator.split(' · ').pop()!;

  const articleSources = ['all', ...Array.from(new Set(
    picks.filter(p => p.category === 'article').map(p => getArticleSource(p.creator))
  ))];

  const groupedPicks = (Object.keys(categoryLabel) as PickCategory[]).map(cat => ({
    category: cat,
    items: picks.filter(p => p.category === cat),
  })).filter(g => g.items.length > 0);

  const getStatusWord = (s: typeof currentStatus) => {
    switch (s.status) {
      case 'reading': return 'Reading';
      case 'workout': return 'Working out';
      case 'working': return 'Working';
      case 'rest': return 'Resting';
    }
  };

  const getStatusSentence = (s: typeof currentStatus) => {
    switch (s.status) {
      case 'reading': return 'Turning the pages';
      case 'workout': return 'Lifting weights';
      case 'working': return s.workingMode === 'teaching' ? "I'm teaching" : "I'm studying";
      case 'rest': return "I'm switched off from everywhere";
    }
  };

  const Sidebar = () => (
    <div className="hidden xl:block w-48 shrink-0">
    <aside className="sticky top-12">
      <p className="text-xs font-medium text-[#999] dark:text-[#666] uppercase tracking-widest mb-6">On my radar</p>
      <div className="space-y-6">
        {groupedPicks.map(({ category, items }) => {
          const filteredItems = category === 'article' && articleFilter !== 'all'
            ? items.filter(p => getArticleSource(p.creator) === articleFilter)
            : items;
          return (
          <div key={category}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#999] dark:text-[#555] mb-3 flex items-center gap-1.5">
              <span>{categoryIcon[category]}</span>
              {categoryLabel[category]}
            </p>
            {category === 'article' && (
              <div className="relative mb-3" ref={articleDropdownRef}>
                <button
                  onClick={() => setArticleDropdownOpen(o => !o)}
                  className="flex items-center gap-1.5 text-[10px] font-medium text-[#666] dark:text-[#999] hover:text-[#1a1a1a] dark:hover:text-[#f5f5f5] transition-colors cursor-pointer group"
                >
                  <span>{articleFilter === 'all' ? 'All sources' : articleFilter}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${articleDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {articleDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1.5 z-50 min-w-[140px] bg-white dark:bg-[#222] border border-[#e8e8e8] dark:border-[#333] rounded-xl shadow-lg overflow-hidden py-1">
                    {articleSources.map(source => (
                      <button
                        key={source}
                        onClick={() => { setArticleFilter(source); setArticleDropdownOpen(false); }}
                        className="w-full flex items-center justify-between gap-3 px-3 py-1.5 text-left text-[11px] font-medium hover:bg-[#f5f5f5] dark:hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                      >
                        <span className={articleFilter === source ? 'text-[#1a1a1a] dark:text-[#f5f5f5]' : 'text-[#999] dark:text-[#666]'}>
                          {source === 'all' ? 'All sources' : source}
                        </span>
                        {articleFilter === source && <Check className="w-3 h-3 text-[#1a1a1a] dark:text-[#f5f5f5] shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="space-y-3">
              {filteredItems.map((pick, i) => {
                const content = (
                  <div className="flex items-center gap-2.5 group">
                    {pick.cover ? (
                      <img src={pick.cover} alt={pick.title} className="w-8 h-8 rounded object-cover shrink-0" style={{ width: '32px', height: '32px', minWidth: '32px' }} />
                    ) : (
                      <div className="w-8 h-8 rounded bg-[#f0f0f0] dark:bg-[#333] shrink-0" style={{ width: '32px', height: '32px', minWidth: '32px' }} />
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#1a1a1a] dark:text-[#f5f5f5] leading-snug truncate group-hover:text-[#555] dark:group-hover:text-[#aaa] transition-colors">{pick.title}</p>
                      <p className="text-[11px] text-[#999] dark:text-[#666] mt-0.5 truncate">{pick.creator}</p>
                      {pick.readTime && <p className="text-[10px] text-[#bbb] dark:text-[#555] mt-0.5">{pick.readTime}</p>}
                    </div>
                  </div>
                );
                return (
                  <div key={i}>
                    {pick.url ? (
                      <a href={pick.url} target="_blank" rel="noopener noreferrer" className="block">{content}</a>
                    ) : content}
                  </div>
                );
              })}
            </div>
          </div>
          );
        })}
      </div>
    </aside>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-[#f5f5f5] selection:bg-[#f2f2f2] dark:selection:bg-[#333] selection:text-[#000] dark:selection:text-[#fff]">
      <div className="max-w-2xl xl:max-w-5xl mx-auto px-6 py-20 md:py-32">
        <AnimatePresence mode="wait">
          {showResources ? (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <button 
                onClick={() => navigate(null)}
                className="flex items-center gap-2 text-sm text-[#999] dark:text-[#666] hover:text-[#1a1a1a] dark:hover:text-[#fff] transition-colors mb-12 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to home
              </button>

              <header className="mb-12">
                <h1 className="text-3xl font-medium tracking-tight mb-4">Storage</h1>
                <p className="text-[#666] dark:text-[#999] leading-relaxed">
                  Welcome to my storage where I keep everything I create along the way. Although I would've not shared, but I'm not your mother, I can't stop your from biting.
                </p>
              </header>

              <section className="mb-12">
                <h2 className="text-sm font-medium text-[#999] dark:text-[#666] uppercase tracking-wider mb-6">Arsenal of Speaking</h2>
                <div className="grid gap-4">
                  {resources.filter(r => r.category === 'arsenal-of-speaking').map((resource) => (
                    <a 
                      key={resource.id}
                      href={resource.filePath}
                      download
                      className="block p-6 border border-[#f0f0f0] dark:border-[#333] rounded-lg hover:border-[#1a1a1a] dark:hover:border-[#666] transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#f5f5f5] dark:bg-[#333] flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-[#666] dark:text-[#999]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[#1a1a1a] dark:text-[#f5f5f5] group-hover:text-[#000] dark:group-hover:text-[#fff] transition-colors">{resource.title}</h3>
                          <p className="text-sm text-[#666] dark:text-[#999] mt-1 line-clamp-2">{resource.description}</p>
                          <div className="flex items-center gap-3 mt-3 text-xs text-[#999] dark:text-[#666]">
                            <span className="uppercase tracking-wide">{resource.fileType}</span>
                            <span>•</span>
                            <span>{resource.fileSize}</span>
                          </div>
                        </div>
                        <Download className="w-5 h-5 text-[#999] dark:text-[#666] group-hover:text-[#1a1a1a] dark:group-hover:text-[#fff] transition-colors shrink-0" />
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-sm font-medium text-[#999] dark:text-[#666] uppercase tracking-wider mb-6">Personal Essays</h2>
                <div className="grid gap-4">
                  {resources.filter(r => r.category === 'personal-essays').map((resource) => (
                    <a 
                      key={resource.id}
                      href={resource.filePath}
                      download
                      className="block p-6 border border-[#f0f0f0] dark:border-[#333] rounded-lg hover:border-[#1a1a1a] dark:hover:border-[#666] transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#f5f5f5] dark:bg-[#333] flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-[#666] dark:text-[#999]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[#1a1a1a] dark:text-[#f5f5f5] group-hover:text-[#000] dark:group-hover:text-[#fff] transition-colors">{resource.title}</h3>
                          <p className="text-sm text-[#666] dark:text-[#999] mt-1 line-clamp-2">{resource.description}</p>
                          <div className="flex items-center gap-3 mt-3 text-xs text-[#999] dark:text-[#666]">
                            <span className="uppercase tracking-wide">{resource.fileType}</span>
                            <span>•</span>
                            <span>{resource.fileSize}</span>
                          </div>
                        </div>
                        <Download className="w-5 h-5 text-[#999] dark:text-[#666] group-hover:text-[#1a1a1a] dark:group-hover:text-[#fff] transition-colors shrink-0" />
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-sm font-medium text-[#999] dark:text-[#666] uppercase tracking-wider mb-6">Arsenal of Writing</h2>
                <div className="grid gap-4">
                  {resources.filter(r => r.category === 'arsenal-of-writing').map((resource) => (
                    <a 
                      key={resource.id}
                      href={resource.filePath}
                      download
                      className="block p-6 border border-[#f0f0f0] dark:border-[#333] rounded-lg hover:border-[#1a1a1a] dark:hover:border-[#666] transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#f5f5f5] dark:bg-[#333] flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-[#666] dark:text-[#999]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[#1a1a1a] dark:text-[#f5f5f5] group-hover:text-[#000] dark:group-hover:text-[#fff] transition-colors">{resource.title}</h3>
                          <p className="text-sm text-[#666] dark:text-[#999] mt-1 line-clamp-2">{resource.description}</p>
                          <div className="flex items-center gap-3 mt-3 text-xs text-[#999] dark:text-[#666]">
                            <span className="uppercase tracking-wide">{resource.fileType}</span>
                            <span>•</span>
                            <span>{resource.fileSize}</span>
                          </div>
                        </div>
                        <Download className="w-5 h-5 text-[#999] dark:text-[#666] group-hover:text-[#1a1a1a] dark:group-hover:text-[#fff] transition-colors shrink-0" />
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : showActivities ? (
            <motion.div
              key="activities"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={() => navigate(null)}
                className="flex items-center gap-2 text-sm text-[#999] dark:text-[#666] hover:text-[#1a1a1a] dark:hover:text-[#fff] transition-colors mb-12 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to home
              </button>

              <header className="mb-12">
                <h1 className="text-3xl font-medium tracking-tight mb-4">My Activities</h1>
                <p className="text-[#666] dark:text-[#999] leading-relaxed">
                  A log of my daily activity — teaching, writing, working out, and everything in between.
                </p>
              </header>

              <section className="mb-12">
                <ContributionGraph
                  selectedDate={selectedActivityDate}
                  onDayClick={setSelectedActivityDate}
                />
              </section>

              {selectedActivityDate && activityData[selectedActivityDate] && (
                <section>
                  <p className="text-xs font-medium text-[#999] dark:text-[#666] uppercase tracking-wider mb-5">
                    {new Date(selectedActivityDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <div className="space-y-4">
                    {(activityData[selectedActivityDate] as ActivityEntry).logs.map((log, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#cbd5e1] dark:bg-[#475569] shrink-0" />
                        <div>
                          <p className="text-sm text-[#1a1a1a] dark:text-[#f5f5f5] leading-relaxed">{log.text}</p>
                          {log.link && (
                            <a href={log.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[#999] dark:text-[#666] hover:text-[#1a1a1a] dark:hover:text-[#f5f5f5] transition-colors mt-0.5">
                              {(() => { try { return new URL(log.link).hostname.replace('www.', ''); } catch { return log.link; } })()}
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </motion.div>
          ) : !currentSlug ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <header className="mb-16">
                <div className="mb-8 flex items-center justify-between">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-[#e8e8e8] dark:border-[#2a2a2a] shrink-0">
                    <img src={orangeLogo} alt="Javokhir" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-full hover:bg-[#f0f0f0] dark:hover:bg-[#333] transition-colors cursor-pointer"
                    aria-label="Toggle dark mode"
                  >
                    {darkMode ? <Sun className="w-5 h-5 text-[#f5f5f5]" /> : <Moon className="w-5 h-5 text-[#1a1a1a]" />}
                  </button>
                </div>
                <div className="xl:flex xl:gap-20 xl:items-start">
                <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-semibold tracking-tight mb-1">Umerov Javokhir</h1>
                <p className="font-mono text-xs text-[#bbb] dark:text-[#555] mb-5 tracking-wide">
                  IELTS Teacher · Gymrat · Samarkand
                </p>
                <p className="text-[#666] dark:text-[#999] leading-relaxed mb-6">
                  Hi, I'm Javokhir, I teach and workout. Currently teaching at{' '}
                  <a
                    ref={cambridgeRef}
                    href="https://cambridgeonline.uz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-semibold text-[#1a1a1a] dark:text-[#f5f5f5] group/link transition-colors cursor-pointer"
                    onMouseEnter={handleCambridgeMouseEnter}
                    onMouseLeave={handleCambridgeMouseLeave}
                  >
                    cambridgeonline.uz
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity -translate-y-0.5" />
                  </a>.
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <button
                    onClick={navigateToResources}
                    className="flex items-center gap-1 text-[#666] dark:text-[#999] hover:text-[#1a1a1a] dark:hover:text-[#fff] transition-colors cursor-pointer"
                  >
                    Resources <ArrowUpRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={navigateToActivities}
                    className="flex items-center gap-1 text-[#666] dark:text-[#999] hover:text-[#1a1a1a] dark:hover:text-[#fff] transition-colors cursor-pointer"
                  >
                    My Activities <ArrowUpRight className="w-3 h-3" />
                  </button>
                  <a 
                    href="https://t.me/javokhirsielts" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#666] dark:text-[#999] hover:text-[#1a1a1a] dark:hover:text-[#fff] transition-colors"
                  >
                    Telegram <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a 
                    href="https://www.youtube.com/@javokhirsielts" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#666] dark:text-[#999] hover:text-[#1a1a1a] dark:hover:text-[#fff] transition-colors"
                  >
                    YouTube <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a 
                    href="https://cambridgeonline.uz/en/registration" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#666] dark:text-[#999] hover:text-[#1a1a1a] dark:hover:text-[#fff] transition-colors"
                  >
                    Register for course <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                </div>
                <div className="hidden xl:block w-56 shrink-0">
                  <div className="rounded-2xl border border-[#e2e8f0] dark:border-[#2a2a2a] bg-[#f8fafc] dark:bg-[#1a1a1a] shadow-sm overflow-hidden">
                    <div className="px-5 pt-6 pb-5">
                      {currentStatus.status === 'working' && (
                        <svg viewBox="0 0 80 80" className="work-icon w-14 h-14 mb-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="var(--bolt-bright)"/>
                              <stop offset="100%" stopColor="var(--bolt-mid)"/>
                            </linearGradient>
                            <linearGradient id="boltSide" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="var(--bolt-mid)"/>
                              <stop offset="100%" stopColor="var(--bolt-deep)"/>
                            </linearGradient>
                            <filter id="boltDrop" x="-30%" y="-30%" width="160%" height="160%">
                              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="var(--bolt-glow)" floodOpacity="1"/>
                            </filter>
                          </defs>
                          <path d="M46 8 L28 38 L38 38 L34 72 L58 34 L46 34 Z" fill="url(#boltGrad)" filter="url(#boltDrop)"/>
                          <path d="M58 34 L46 34 L38 38 L42 38 L50 34 Z" fill="url(#boltSide)" opacity="0.6"/>
                          <path d="M40 12 L30 34 L36 34" stroke="var(--bolt-gloss)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                        </svg>
                      )}
                      {currentStatus.status === 'workout' && (
                        <svg viewBox="0 0 80 80" className="work-icon w-14 h-14 mb-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="dbBar" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="var(--bolt-bright)"/>
                              <stop offset="100%" stopColor="var(--bolt-mid)"/>
                            </linearGradient>
                            <linearGradient id="dbPlateL" x1="20%" y1="10%" x2="80%" y2="90%">
                              <stop offset="0%" stopColor="var(--bolt-bright)"/>
                              <stop offset="100%" stopColor="var(--bolt-mid)"/>
                            </linearGradient>
                            <linearGradient id="dbPlateR" x1="20%" y1="10%" x2="80%" y2="90%">
                              <stop offset="0%" stopColor="var(--bolt-mid)"/>
                              <stop offset="100%" stopColor="var(--bolt-deep)"/>
                            </linearGradient>
                            <linearGradient id="dbPlateSide" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="var(--bolt-deep)"/>
                              <stop offset="100%" stopColor="var(--bolt-mid)"/>
                            </linearGradient>
                            <filter id="dbGlow" x="-30%" y="-30%" width="160%" height="160%">
                              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="var(--bolt-glow)" floodOpacity="1"/>
                            </filter>
                          </defs>
                          <rect x="22" y="36" width="36" height="8" rx="4" fill="url(#dbBar)"/>
                          <rect x="8" y="24" width="14" height="32" rx="5" fill="url(#dbPlateL)" filter="url(#dbGlow)"/>
                          <rect x="20" y="24" width="4" height="32" rx="2" fill="url(#dbPlateSide)" opacity="0.7"/>
                          <rect x="10" y="26" width="5" height="10" rx="2" fill="white" opacity="0.2"/>
                          <rect x="58" y="24" width="14" height="32" rx="5" fill="url(#dbPlateR)" filter="url(#dbGlow)"/>
                          <rect x="56" y="24" width="4" height="32" rx="2" fill="url(#dbPlateSide)" opacity="0.7"/>
                          <rect x="60" y="26" width="5" height="10" rx="2" fill="white" opacity="0.2"/>
                          <rect x="24" y="37" width="32" height="3" rx="1.5" fill="white" opacity="0.15"/>
                        </svg>
                      )}
                      {currentStatus.status === 'rest' && (
                        <svg viewBox="0 0 80 80" className="moon-icon w-14 h-14 mb-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <mask id="moonMask">
                              <rect width="80" height="80" fill="black"/>
                              <circle cx="38" cy="40" r="22" fill="white"/>
                              <circle cx="51" cy="33" r="18" fill="black"/>
                            </mask>
                            <linearGradient id="moonGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                              <stop offset="0%" stopColor="var(--bolt-bright)"/>
                              <stop offset="60%" stopColor="var(--bolt-mid)"/>
                              <stop offset="100%" stopColor="var(--bolt-deep)"/>
                            </linearGradient>
                            <filter id="moonDrop" x="-30%" y="-30%" width="160%" height="160%">
                              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="var(--bolt-glow)" floodOpacity="1"/>
                            </filter>
                          </defs>
                          <circle cx="38" cy="40" r="22" fill="url(#moonGrad)" mask="url(#moonMask)" filter="url(#moonDrop)"/>
                          <path d="M32 24 Q26 36 30 48" stroke="var(--bolt-gloss)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" mask="url(#moonMask)"/>
                        </svg>
                      )}
                      {currentStatus.status === 'reading' && (
                        <svg viewBox="0 0 80 80" className="work-icon w-14 h-14 mb-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="bookLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="var(--bolt-bright)"/>
                              <stop offset="100%" stopColor="var(--bolt-mid)"/>
                            </linearGradient>
                            <linearGradient id="bookRight" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="var(--bolt-mid)"/>
                              <stop offset="100%" stopColor="var(--bolt-deep)"/>
                            </linearGradient>
                            <linearGradient id="bookSpine" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="var(--bolt-deep)"/>
                              <stop offset="100%" stopColor="var(--bolt-mid)"/>
                            </linearGradient>
                            <filter id="bookDrop" x="-30%" y="-30%" width="160%" height="160%">
                              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="var(--bolt-glow)" floodOpacity="1"/>
                            </filter>
                          </defs>
                          <path d="M10 22 L38 30 L38 62 L10 54 Z" fill="url(#bookLeft)" filter="url(#bookDrop)"/>
                          <path d="M42 30 L70 22 L70 54 L42 62 Z" fill="url(#bookRight)" filter="url(#bookDrop)"/>
                          <rect x="37" y="30" width="6" height="32" rx="1" fill="url(#bookSpine)"/>
                          <line x1="16" y1="37" x2="35" y2="40" stroke="var(--bolt-gloss)" strokeWidth="1.5" strokeLinecap="round" opacity="0.45"/>
                          <line x1="16" y1="43" x2="35" y2="46" stroke="var(--bolt-gloss)" strokeWidth="1.5" strokeLinecap="round" opacity="0.45"/>
                          <line x1="16" y1="49" x2="35" y2="52" stroke="var(--bolt-gloss)" strokeWidth="1.5" strokeLinecap="round" opacity="0.45"/>
                          <line x1="45" y1="40" x2="64" y2="37" stroke="var(--bolt-gloss)" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
                          <line x1="45" y1="46" x2="64" y2="43" stroke="var(--bolt-gloss)" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
                          <line x1="45" y1="52" x2="64" y2="49" stroke="var(--bolt-gloss)" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
                        </svg>
                      )}
                      <p className="text-[10px] font-semibold text-[#999] dark:text-[#666] uppercase tracking-widest mb-2">Right now</p>
                      <p className="text-base font-bold text-[#0f172a] dark:text-white leading-snug capitalize mb-1">{getStatusWord(currentStatus)}</p>
                      <p className="text-xs text-[#999] dark:text-[#666]">{getStatusSentence(currentStatus)}</p>
                      {currentStatus.link && (() => {
                        let href = currentStatus.link;
                        let hostname = currentStatus.link;
                        try {
                          if (!href.startsWith('http')) href = 'https://' + href;
                          hostname = new URL(href).hostname.replace('www.', '');
                        } catch {}
                        return (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-1" onMouseEnter={handleStatusLinkEnter} onMouseLeave={handleStatusLinkLeave}>
                            <span ref={statusLinkRef} className="text-[11px] font-medium text-[#1a1a1a] dark:text-[#f5f5f5] line-clamp-1">{currentStatus.linkTitle || hostname}</span>
                            <ArrowUpRight className="w-2.5 h-2.5 shrink-0 text-[#999] dark:text-[#666]" />
                          </a>
                        );
                      })()}
                    </div>
                  </div>
                </div>
                </div>
              </header>

              <div className="xl:flex xl:gap-20 xl:items-start">
              <main className="flex-1 min-w-0">
                <section>
                  <h2 className="text-sm font-medium text-[#999] dark:text-[#666] uppercase tracking-wider mb-8">Writing</h2>
                  <div className="space-y-1">
                    {articles.map((article, index) => (
                      <motion.div
                        key={article.slug}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        className="group"
                      >
                        <button
                          onClick={() => navigate(article.slug)}
                          onMouseEnter={() => handleArticleMouseEnter(article.slug)}
                          onMouseLeave={() => handleArticleMouseLeave(article.slug)}
                          className="w-full flex items-baseline justify-between py-3 border-b border-transparent hover:border-[#f0f0f0] dark:hover:border-[#333] transition-all text-left cursor-pointer"
                        >
                          <span
                            ref={el => { articleRefs.current[article.slug] = el; }}
                            className="text-[#1a1a1a] dark:text-[#f5f5f5] group-hover:text-[#000] dark:group-hover:text-[#fff] transition-colors flex items-center gap-2"
                          >
                            {article.title}
                            {article.isNew && (
                              <span className="relative inline-block text-xs font-bold text-[#1e3a5f] dark:text-amber-200 ml-1">
                                <span className="relative z-10">new</span>
                                <span className="absolute left-0 top-0 w-full h-full bg-amber-200/60 dark:bg-amber-400/30 -rotate-1 -z-0" style={{clipPath: 'polygon(0 40%, 100% 60%, 100% 100%, 0 100%)'}} />
                              </span>
                            )}
                          </span>
                          <span className="text-sm text-[#999] dark:text-[#666] font-mono tabular-nums ml-4 shrink-0">
                            {article.date}
                          </span>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section className="xl:hidden mt-16">
                  <h2 className="text-sm font-medium text-[#999] dark:text-[#666] uppercase tracking-wider mb-8">On my radar</h2>
                  <div className="space-y-8">
                    {groupedPicks.map(({ category, items }) => {
                      const filteredItems = category === 'article' && articleFilter !== 'all'
                        ? items.filter(p => getArticleSource(p.creator) === articleFilter)
                        : items;
                      return (
                      <div key={category}>
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#999] dark:text-[#555] mb-4 flex items-center gap-2">
                          <span>{categoryIcon[category]}</span>
                          {categoryLabel[category]}
                        </p>
                        {category === 'article' && (
                          <div className="relative mb-4" ref={articleDropdownRef}>
                            <button
                              onClick={() => setArticleDropdownOpen(o => !o)}
                              className="flex items-center gap-1.5 text-xs font-medium text-[#666] dark:text-[#999] hover:text-[#1a1a1a] dark:hover:text-[#f5f5f5] transition-colors cursor-pointer"
                            >
                              <span>{articleFilter === 'all' ? 'All sources' : articleFilter}</span>
                              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${articleDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {articleDropdownOpen && (
                              <div className="absolute left-0 top-full mt-1.5 z-50 min-w-[160px] bg-white dark:bg-[#222] border border-[#e8e8e8] dark:border-[#333] rounded-xl shadow-lg overflow-hidden py-1">
                                {articleSources.map(source => (
                                  <button
                                    key={source}
                                    onClick={() => { setArticleFilter(source); setArticleDropdownOpen(false); }}
                                    className="w-full flex items-center justify-between gap-3 px-3 py-2 text-left text-xs font-medium hover:bg-[#f5f5f5] dark:hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                                  >
                                    <span className={articleFilter === source ? 'text-[#1a1a1a] dark:text-[#f5f5f5]' : 'text-[#999] dark:text-[#666]'}>
                                      {source === 'all' ? 'All sources' : source}
                                    </span>
                                    {articleFilter === source && <Check className="w-3.5 h-3.5 text-[#1a1a1a] dark:text-[#f5f5f5] shrink-0" />}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                        <div className="space-y-3">
                          {filteredItems.map((pick, i) => {
                            const content = (
                              <div className="flex items-center gap-3 group">
                                {pick.cover ? (
                                  <img src={pick.cover} alt={pick.title} className="w-9 h-9 rounded object-cover shrink-0" style={{ width: '36px', height: '36px', minWidth: '36px' }} />
                                ) : (
                                  <div className="w-9 h-9 rounded bg-[#f0f0f0] dark:bg-[#333] shrink-0" />
                                )}
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-[#1a1a1a] dark:text-[#f5f5f5] leading-snug truncate group-hover:text-[#555] dark:group-hover:text-[#aaa] transition-colors">{pick.title}</p>
                                  <p className="text-xs text-[#999] dark:text-[#666] mt-0.5 truncate">{pick.creator}</p>
                                  {pick.readTime && <p className="text-[11px] text-[#bbb] dark:text-[#555] mt-0.5">{pick.readTime}</p>}
                                </div>
                              </div>
                            );
                            return (
                              <div key={i}>
                                {pick.url ? (
                                  <a href={pick.url} target="_blank" rel="noopener noreferrer" className="block">{content}</a>
                                ) : content}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </section>
              </main>
              <Sidebar />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="article"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <button 
                onClick={() => navigate(null)}
                className="flex items-center gap-2 text-sm text-[#999] dark:text-[#666] hover:text-[#1a1a1a] dark:hover:text-[#fff] transition-colors mb-12 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to home
              </button>

              <article className="prose prose-neutral dark:prose-invert max-w-none">
                <header className="mb-12">
                  <h1 className="text-3xl font-medium tracking-tight mb-4">{currentArticle?.title}</h1>
                  <time className="text-sm text-[#999] dark:text-[#666] font-mono">{currentArticle?.date}</time>
                </header>

                <div className="markdown-content">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      span: ({node, style, ...props}) => {
                        return <span style={style} {...props} />;
                      },
                      img: ({node, ...props}) => {
                        const src = props.src || '';
                        // Map of known images - support both paths
                        const imageMap: Record<string, string> = {
                          '/src/content/images/sentence-mining.png': sentenceMiningImage,
                          'sentence-mining.png': sentenceMiningImage,
                          '/images/sentence-mining.png': sentenceMiningImage,
                          '/src/content/images/rtb9-img.png': rtb9Image,
                          'rtb9-img.png': rtb9Image,
                        };
                        // Try to find matching image
                        let imageSrc = src;
                        for (const key of Object.keys(imageMap)) {
                          if (src.includes(key.replace('/src/content/images/', '').replace('/images/', ''))) {
                            imageSrc = imageMap[key];
                            break;
                          }
                        }
                        return <img {...props} src={imageSrc} />;
                      }
                    }}
                  >
                    {currentArticle?.content || "Content coming soon..."}
                  </ReactMarkdown>
                </div>
              </article>

              {nextArticle && (
                <button 
                  onClick={() => navigate(nextArticle.slug)}
                  className="flex items-center gap-2 text-sm text-[#999] dark:text-[#666] hover:text-[#1a1a1a] dark:hover:text-[#fff] transition-colors mt-12 group cursor-pointer"
                >
                  Next: {nextArticle.title}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-32 pt-12 border-t border-[#f0f0f0] dark:border-[#333] text-sm text-[#999] dark:text-[#666]">
          <p>© {new Date().getFullYear()} Javokhir</p>
        </footer>
      </div>
    </div>
  );
}

