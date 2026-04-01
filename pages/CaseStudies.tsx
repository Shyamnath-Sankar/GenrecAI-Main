import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SEO } from '../components/SEO';

export const CaseStudies = () => {
    return (
        <div className="min-h-screen pt-24 pb-20">
            <SEO
                title="Case Studies"
                description="Proven engineering work. We document what changed, how it changed, and what we learned. Focus on measurable improvements."
            />
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Proven Work.
                    </h1>
                    <p className="text-xl text-zinc-500 max-w-2xl">
                        We document what changed, how it changed, and what we learned.<br />
                        Focus on measurable improvements, not vanity metrics.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-nothing-red/30 transition-colors"
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-zinc-100 dark:bg-zinc-900 min-h-[300px] md:min-h-full flex items-center justify-center p-8">
                            {/* Placeholder for project image */}
                            <div className="text-6xl font-glitch opacity-10">HOTEL AZURE</div>
                        </div>
                        <div className="p-8 md:p-12">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-xs font-bold tracking-widest text-nothing-red">HOSPITALITY OPERATIONS</span>
                                <span className="text-xs text-zinc-500">2025</span>
                            </div>

                            <h2 className="text-3xl font-bold mb-4">Hotel Azure</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                                Tablet-based service coordination using Tabble. Integrated offline-tolerant workflows to ensure 99.9% availability during peak service hours.
                            </p>

                            <div className="space-y-4 mb-8">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Outcomes</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                        <span>Faster request handling</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                        <span>Reduced operational friction</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                        <span>Early-stage rollout success</span>
                                    </li>
                                </ul>
                            </div>

                            <button className="flex items-center gap-2 text-sm font-bold border-b border-transparent hover:border-nothing-red hover:text-nothing-red transition-all pb-0.5">
                                READ FULL STUDY <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
