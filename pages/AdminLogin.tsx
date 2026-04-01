import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle, Sun, Moon, ArrowRight, Fingerprint } from 'lucide-react';
import { SEO } from '../components/SEO';
import { DotGrid } from '../components/ui/DotGrid';
import { GlitchText } from '../components/ui/GlitchText';

export const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const { theme, toggleTheme } = useTheme();

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/adminofthegenrecai/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate biometric scan delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const success = login(username, password);
        if (success) {
            navigate('/adminofthegenrecai/dashboard');
        } else {
            setError('ACCESS DENIED');
            setPassword('');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black relative flex items-center justify-center p-6 overflow-hidden font-mono">
            <SEO title="Admin Login" />

            {/* Background elements */}
            <div className={`fixed inset-0 z-0 ${theme === 'dark' ? 'opacity-30' : 'opacity-10'}`}>
                <DotGrid />
            </div>

            <div className="absolute top-8 right-8 z-20">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                {/* ID Card Style Container */}
                <div className="bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden relative group">

                    {/* Header */}
                    <div className="p-8 pb-0 border-b border-zinc-200/50 dark:border-zinc-800/50">
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold tracking-widest text-nothing-red mb-1">SYSTEM LEVEL 0</span>
                                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                    <GlitchText text="ADMIN_ACCESS" />
                                </h1>
                            </div>
                            <div className="w-10 h-10 border border-zinc-200 dark:border-zinc-700 rounded-full flex items-center justify-center animate-pulse">
                                <Lock size={16} className="text-nothing-red" />
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Identity</label>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-4 w-4 text-zinc-400 group-focus-within/input:text-nothing-red transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-nothing-red focus:border-nothing-red transition-all sm:text-sm tracking-wider font-mono"
                                        placeholder="USR.ID"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Passkey</label>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Fingerprint className="h-4 w-4 text-zinc-400 group-focus-within/input:text-nothing-red transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-nothing-red focus:border-nothing-red transition-all sm:text-sm tracking-wider font-mono"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="flex items-center gap-2 p-3 bg-red-500/10 border-l-2 border-nothing-red text-red-600 dark:text-red-400 text-xs font-bold"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-between px-6 py-4 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 hover:bg-nothing-red hover:border-nothing-red dark:hover:bg-nothing-red dark:hover:border-nothing-red text-zinc-900 dark:text-white hover:text-white transition-all duration-300 rounded-lg group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="font-bold tracking-widest uppercase">
                                    {isLoading ? 'Authenticating...' : 'Initialize Session'}
                                </span>
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                    {/* Footer decoration */}
                    <div className="px-8 py-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-[10px] text-zinc-400 font-mono">
                        <span>SECURE.CONNECTION</span>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span>V.2.0.4</span>
                    </div>

                    {/* Scan line effect */}
                    <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(transparent_0%,#000_50%,transparent_100%)] bg-[length:100%_4px] animate-scan" />
                </div>
            </motion.div>
        </div>
    );
};
