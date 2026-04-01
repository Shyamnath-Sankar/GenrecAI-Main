import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DotGrid } from './ui/DotGrid';
import { CustomCursor } from './ui/CustomCursor';
import { Footer } from './Footer';
import { Battery, Wifi, Moon, Sun, Disc, Layers, User, Package, LayoutGrid, Briefcase, Mail, BookOpen } from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router-dom';

import { SEO } from './SEO';

import { useTheme } from '../contexts/ThemeContext';

export const Layout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === 'dark';
  const [time, setTime] = React.useState(new Date());
  const location = useLocation();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  React.useEffect(() => {
    // Add cursor-none class to body when this layout is mounted
    document.body.classList.add('cursor-none');

    // Timer for header clock
    const timer = setInterval(() => setTime(new Date()), 1000);

    // Cleanup: remove class and clear timer
    return () => {
      document.body.classList.remove('cursor-none');
      clearInterval(timer);
    };
  }, []);

  const navItems = [
    { path: '/', label: 'HOME', icon: Disc },
    { path: '/work', label: 'WORK', icon: Layers },
    { path: '/case-studies', label: 'CASES', icon: BookOpen },
    { path: '/blog', label: 'BLOG', icon: Briefcase },
    { path: '/products', label: 'PRODUCTS', icon: Package },
    { path: '/divisions', label: 'DIVISIONS', icon: LayoutGrid },
    { path: '/about', label: 'ABOUT', icon: User },
    { path: '/contact', label: 'CONTACT', icon: Mail },
  ];

  const getPageTitle = () => {
    if (location.pathname === '/') return null;
    const currentItem = navItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : null;
  };

  const pageTitle = getPageTitle();

  return (
    <div className="min-h-screen w-full relative p-4 md:p-8 flex flex-col font-mono selection:bg-nothing-red selection:text-white">
      <SEO
        title={pageTitle ? pageTitle.charAt(0) + pageTitle.slice(1).toLowerCase() : 'Home'}
      />
      <CustomCursor />
      <DotGrid />

      {/* Header Widget */}
      <header className="fixed top-0 left-0 right-0 p-4 md:p-8 z-40 pointer-events-none flex justify-between items-start">
        <div className="pointer-events-auto bg-white/10 dark:bg-black/20 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-full px-4 py-2 flex items-center gap-4 shadow-sm">
          <Link to="/" className="font-bold tracking-widest text-nothing-red hover:opacity-80 transition-opacity">
            GENREC
          </Link>
          <span className="w-[1px] h-4 bg-zinc-400/50" />
          <span className="text-xs text-zinc-500 hidden md:block">AI</span>
        </div>

        <div className="pointer-events-auto bg-white/10 dark:bg-black/20 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-full px-4 py-2 flex items-center gap-4 text-xs shadow-sm">
          <span className="hidden md:inline font-mono">{time.toLocaleTimeString([], { hour12: false })}</span>
          <Wifi className="w-3 h-3" />
          <Battery className="w-3 h-3" />
          <button onClick={toggleTheme} className="hover:text-nothing-red transition-colors ml-4 p-1">
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

        </div>
      </header>

      {/* Floating Dock Navigation */}
      <nav className="fixed left-0 right-0 bottom-8 flex flex-col items-center justify-end z-50 pointer-events-none gap-4">

        {/* Dynamic Navigation Label */}
        <AnimatePresence mode="wait">
          {hoveredNav && (
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 5, filter: "blur(5px)" }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto bg-black/80 dark:bg-white/90 text-white dark:text-black px-4 py-2 rounded-lg font-mono font-bold text-sm tracking-widest uppercase backdrop-blur-md border border-zinc-800 dark:border-zinc-200 shadow-xl"
            >
              {hoveredNav}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pointer-events-auto bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-full shadow-2xl p-2 flex gap-1 md:gap-2 overflow-x-auto max-w-[95vw] no-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setHoveredNav(item.label)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative group p-2 md:p-3 rounded-full flex items-center justify-center transition-all duration-300 min-w-[44px] min-h-[44px]"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon size={18} className={`relative z-10 transition-colors ${isActive ? 'text-nothing-red' : 'text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'}`} />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto z-10 relative pb-32">
        {/* Page Title for Non-Home Pages */}
        {pageTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 pb-8 md:pt-32 md:pb-12 border-b border-zinc-200 dark:border-zinc-800 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100 leading-[0.8]">
              {pageTitle}
              <span className="text-nothing-red">.</span>
            </h1>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 dark:text-zinc-600 mb-2">
              <span className="hidden md:inline-block w-12 h-[1px] bg-current"></span>
              <span>SYS.LOC // {pageTitle}</span>
              <span className="inline-block md:hidden flex-1 h-[1px] bg-current"></span>
            </div>
          </motion.div>
        )}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};