import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Image, FileText, PlusCircle, LogOut, Sun, Moon, Menu, X, ChevronRight } from 'lucide-react';
import { DotGrid } from '../../components/ui/DotGrid';
import { GlitchText } from '../../components/ui/GlitchText';

export const AdminLayout = () => {
    const { logout, user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { path: '/adminofthegenrecai/dashboard', label: 'Dashboard', icon: LayoutGrid, end: true },
        { path: '/adminofthegenrecai/dashboard/images', label: 'Image Library', icon: Image },
        { path: '/adminofthegenrecai/dashboard/blogs', label: 'All Posts', icon: FileText, end: true },
        { path: '/adminofthegenrecai/dashboard/blogs/new', label: 'New Post', icon: PlusCircle },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 flex overflow-hidden font-mono selection:bg-nothing-red selection:text-white">
            {/* Background Texture */}
            <div className={`fixed inset-0 z-0 pointer-events-none ${theme === 'dark' ? 'opacity-20' : 'opacity-5'}`}>
                <DotGrid />
            </div>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className="relative z-20 h-screen bg-white/80 dark:bg-black/80 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-800 flex flex-col transition-all duration-300"
            >
                {/* Logo Area */}
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 bg-nothing-red rounded-sm flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">
                            G
                        </div>
                        {isSidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-bold tracking-widest whitespace-nowrap"
                            >
                                GENREC
                            </motion.span>
                        )}
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded transition-colors"
                    >
                        {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative overflow-hidden
                                ${isActive
                                    ? 'bg-zinc-100 dark:bg-zinc-900 text-nothing-red font-bold'
                                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50'}
                            `}
                        >
                            <item.icon size={20} className="flex-shrink-0" />
                            {isSidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="whitespace-nowrap"
                                >
                                    {item.label}
                                </motion.span>
                            )}

                            {/* Active Indicator */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-nothing-red transition-all group-[.active]:h-8" />
                        </NavLink>
                    ))}
                </nav>

                {/* Footer Actions */}
                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                    <div className={`flex items-center gap-3 px-3 py-2 ${!isSidebarOpen && 'justify-center'}`}>
                        <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                            <span className="text-xs font-bold">A</span>
                        </div>
                        {isSidebarOpen && (
                            <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-bold truncate">Admin</p>
                                <p className="text-[10px] text-zinc-500 truncate">System Access</p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={toggleTheme}
                            className={`flex-1 flex items-center justify-center p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors ${!isSidebarOpen && 'aspect-square'}`}
                            title="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button
                            onClick={handleLogout}
                            className={`flex-1 flex items-center justify-center p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-red-500/10 hover:border-nothing-red hover:text-nothing-red transition-colors ${!isSidebarOpen && 'aspect-square'}`}
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative h-screen">
                {/* Top Bar for Mobile/Context */}
                <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 p-4 md:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <span>sys</span>
                        <ChevronRight size={12} />
                        <span>admin</span>
                        <ChevronRight size={12} />
                        <span className="text-zinc-900 dark:text-zinc-100 font-bold uppercase">
                            {navItems.find(i => location.pathname === i.path)?.label || 'Console'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs font-mono text-emerald-500">ONLINE</span>
                    </div>
                </div>

                <div className="p-6 md:p-8 max-w-7xl mx-auto pb-32">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
