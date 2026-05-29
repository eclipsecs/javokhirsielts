/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowLeft, Moon, Sun } from 'lucide-react';
import { annotate } from 'rough-notation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { articles } from './content/articles';
import { picks, categoryLabel, categoryIcon, PickCategory } from './content/picks';
import { FileText, Download } from 'lucide-react';
import sentenceMiningImage from './content/images/sentence-mining.png';
import rtb9Image from './content/images/rtb9-img.png';

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

export default function App() {
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [showResources, setShowResources] = useState<boolean>(false);
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
    } else if (initialPath && articles.find(a => a.slug === initialPath)) {
      setCurrentSlug(initialPath);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (slug: string | null) => {
    setShowResources(false);
    setCurrentSlug(slug);
    const url = slug ? `/${slug}` : '/';
    window.history.pushState({}, '', url);
    window.scrollTo(0, 0);
  };

  const navigateToResources = () => {
    setCurrentSlug(null);
    setShowResources(true);
    window.history.pushState({}, '', '/resources');
    window.scrollTo(0, 0);
  };

  const currentArticle = articles.find(a => a.slug === currentSlug);
  const currentIndex = articles.findIndex(a => a.slug === currentSlug);
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const cambridgeRef = useRef<HTMLAnchorElement>(null);
  const cambridgeAnnotationRef = useRef<any>(null);
  const articleRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const articleAnnotations = useRef<Record<string, any>>({});

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

  const groupedPicks = (Object.keys(categoryLabel) as PickCategory[]).map(cat => ({
    category: cat,
    items: picks.filter(p => p.category === cat),
  })).filter(g => g.items.length > 0);

  const Sidebar = () => (
    <div className="hidden xl:block w-48 shrink-0">
    <aside className="sticky top-12">
      <p className="text-xs font-medium text-[#999] dark:text-[#666] uppercase tracking-widest mb-6">On my radar</p>
      <div className="space-y-6">
        {groupedPicks.map(({ category, items }) => (
          <div key={category}>
            <p className="text-[10px] uppercase tracking-widest text-[#bbb] dark:text-[#555] mb-3 flex items-center gap-1.5">
              <span>{categoryIcon[category]}</span>
              {categoryLabel[category]}
            </p>
            <div className="space-y-3">
              {items.map((pick, i) => {
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
        ))}
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
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#f0f0f0] dark:border-[#333] bg-[#1a1a1a] dark:bg-[#f5f5f5] flex items-center justify-center">
                    <span className="text-lg font-semibold text-[#f5f5f5] dark:text-[#1a1a1a]">Y</span>
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
                <h1 className="text-xl font-medium mb-4">Umerov Javokhir</h1>
                <p className="text-[#666] dark:text-[#999] leading-relaxed mb-6">
                  Hi, i'm mitro, i teach and workout. Currently teaching at{' '}
                  <a 
                    ref={cambridgeRef}
                    href="https://cambridgeonline.uz/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#1a1a1a] dark:text-[#f5f5f5] transition-colors cursor-pointer"
                    onMouseEnter={handleCambridgeMouseEnter}
                    onMouseLeave={handleCambridgeMouseLeave}
                  >
                    cambridgeonline.uz
                  </a>.
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <button 
                    onClick={navigateToResources}
                    className="flex items-center gap-1 text-[#666] dark:text-[#999] hover:text-[#1a1a1a] dark:hover:text-[#fff] transition-colors cursor-pointer"
                  >
                    Resources <ArrowUpRight className="w-3 h-3" />
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
                        {/* Bar */}
                        <rect x="22" y="36" width="36" height="8" rx="4" fill="url(#dbBar)"/>
                        {/* Left plate outer */}
                        <rect x="8" y="24" width="14" height="32" rx="5" fill="url(#dbPlateL)" filter="url(#dbGlow)"/>
                        {/* Left plate side depth */}
                        <rect x="20" y="24" width="4" height="32" rx="2" fill="url(#dbPlateSide)" opacity="0.7"/>
                        {/* Left plate gloss */}
                        <rect x="10" y="26" width="5" height="10" rx="2" fill="white" opacity="0.2"/>
                        {/* Right plate outer */}
                        <rect x="58" y="24" width="14" height="32" rx="5" fill="url(#dbPlateR)" filter="url(#dbGlow)"/>
                        {/* Right plate side depth */}
                        <rect x="56" y="24" width="4" height="32" rx="2" fill="url(#dbPlateSide)" opacity="0.7"/>
                        {/* Right plate gloss */}
                        <rect x="60" y="26" width="5" height="10" rx="2" fill="white" opacity="0.2"/>
                        {/* Bar top gloss */}
                        <rect x="24" y="37" width="32" height="3" rx="1.5" fill="white" opacity="0.15"/>
                      </svg>
                      <p className="text-[10px] font-semibold text-orange-400 dark:text-orange-500 uppercase tracking-widest mb-1">Right now</p>
                      <p className="text-sm font-bold text-[#0f172a] dark:text-white leading-snug">Working out</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Gym · pushing limits</p>
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

