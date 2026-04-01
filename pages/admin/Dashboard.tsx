import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image, FileText, PlusCircle } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { GlitchText } from '../../components/ui/GlitchText';

export const Dashboard = () => {
    const cards = [
        {
            title: 'Image Library',
            description: 'Upload and manage visual assets',
            icon: Image,
            link: '/adminofthegenrecai/dashboard/images',
            color: 'text-blue-500',
            bg: 'bg-blue-500/10 border-blue-500/20'
        },
        {
            title: 'Blog Manager',
            description: 'Manage editorial content',
            icon: FileText,
            link: '/adminofthegenrecai/dashboard/blogs',
            color: 'text-purple-500',
            bg: 'bg-purple-500/10 border-purple-500/20'
        },
        {
            title: 'New Post',
            description: 'Create new content',
            icon: PlusCircle,
            link: '/adminofthegenrecai/dashboard/blogs/new',
            color: 'text-nothing-red',
            bg: 'bg-nothing-red/10 border-nothing-red/20'
        }
    ];

    return (
        <div>
            <SEO title="Dashboard" />

            <div className="mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-mono mb-4 border border-zinc-200 dark:border-zinc-700"
                >
                    SYSTEM_STATUS: <span className="text-emerald-500">OPTIMAL</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
                >
                    <GlitchText text="COMMAND_CENTER" />
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-zinc-500 max-w-lg"
                >
                    Welcome back, Administrator. Select a module to begin managing the GENREC AI platform.
                </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                        <Link to={card.link}>
                            <div className={`
                                group relative overflow-hidden bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border rounded-xl p-8 
                                transition-all duration-300 hover:scale-[1.02]
                                ${card.bg} hover:border-zinc-300 dark:hover:border-zinc-600
                            `}>
                                <div className="relative z-10">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm ${card.color}`}>
                                        <card.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 font-mono uppercase tracking-tight">{card.title}</h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">{card.description}</p>

                                    <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                                        <span>Access Module</span>
                                        <div className="w-4 h-[1px] bg-current group-hover:w-8 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
