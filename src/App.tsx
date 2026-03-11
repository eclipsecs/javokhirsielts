/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Twitter, Linkedin, ArrowUpRight, ArrowLeft, Moon, Sun } from 'lucide-react';
import { annotate } from 'rough-notation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { articles, Article } from './content/articles';

export default function App() {
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
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
    if (initialPath && articles.find(a => a.slug === initialPath)) {
      setCurrentSlug(initialPath);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (slug: string | null) => {
    setCurrentSlug(slug);
    const url = slug ? `/${slug}` : '/';
    window.history.pushState({}, '', url);
    window.scrollTo(0, 0);
  };

  const currentArticle = articles.find(a => a.slug === currentSlug);
  const cambridgeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (cambridgeRef.current) {
      const annotation = annotate(cambridgeRef.current, {
        type: 'box',
        color: '#93c5fd',
        strokeWidth: 2,
        padding: 0.1,
        multiline: true,
        animationDuration: 800
      });
      annotation.show();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-[#f5f5f5] selection:bg-[#f2f2f2] dark:selection:bg-[#333] selection:text-[#000] dark:selection:text-[#fff]">
      <div className="max-w-2xl mx-auto px-6 py-20 md:py-32">
        <AnimatePresence mode="wait">
          {!currentSlug ? (
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
                <h1 className="text-xl font-medium mb-4">Umerov Javokhir</h1>
                <p className="text-[#666] dark:text-[#999] leading-relaxed mb-6">
                  I’m Javokhir, English teacher and founder of @javokhirsielts. Currently IELTS teacher  at{' '}
                  <a 
                    ref={cambridgeRef}
                    href="https://cambridgeonline.uz/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#1a1a1a] dark:text-[#f5f5f5] underline decoration-[#ccc] dark:decoration-[#555] hover:decoration-[#1a1a1a] dark:hover:decoration-[#fff] transition-colors underline-offset-4"
                  >
                    cambridgeonline.uz
                  </a>.
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
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
              </header>

              <main>
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
                          className="w-full flex items-baseline justify-between py-3 border-b border-transparent hover:border-[#f0f0f0] dark:hover:border-[#333] transition-all text-left cursor-pointer"
                        >
                          <span className="text-[#1a1a1a] dark:text-[#f5f5f5] group-hover:text-[#000] dark:group-hover:text-[#fff] transition-colors">
                            {article.title}
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
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {currentArticle?.content || "Content coming soon..."}
                  </ReactMarkdown>
                </div>
              </article>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-32 pt-12 border-t border-[#f0f0f0] dark:border-[#333] text-sm text-[#999] dark:text-[#666]">
          <p>© {new Date().getFullYear()} Marc Astbury</p>
        </footer>
      </div>
    </div>
  );
}

