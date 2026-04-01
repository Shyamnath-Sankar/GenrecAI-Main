import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Github,
    Twitter,
    Linkedin,
    ArrowUpRight,
    Play,
    Command,
    CheckCircle2
} from 'lucide-react';

export const Footer = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    return (
        <footer ref={containerRef} className="relative pt-32 pb-12 overflow-hidden">

            {/* --- FLOATING CTA CARD --- */}
            <div className="container mx-auto px-4 md:px-6 relative z-20 mb-24">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-[2rem] bg-zinc-900 text-white shadow-2xl shadow-zinc-900/20 dark:shadow-black/50"
                >
                    {/* Abstract Background Texture */}
                    <div className="absolute inset-0 opacity-20 bg-[url('/noise.svg')] pointer-events-none mix-blend-overlay" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nothing-red/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

                    <div className="grid md:grid-cols-2 gap-12 p-8 md:p-16 relative z-10 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
                                Engineering <br />
                                <span className="text-zinc-400">Resilience</span> at Scale.
                            </h2>
                            <p className="text-zinc-400 text-lg max-w-md leading-relaxed mb-8">
                                Connect with existing algorithmic strategies that reduce risk and automatically execute buy and sell orders.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/contact"
                                    className="group bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-nothing-red hover:text-white transition-all duration-300"
                                >
                                    Get Started
                                    <Command className="w-4 h-4" />
                                </Link>
                                <Link
                                    to="/about"
                                    className="group px-6 py-3 rounded-full font-bold flex items-center gap-2 border border-zinc-700 hover:border-white transition-colors text-zinc-300 hover:text-white"
                                >
                                    <Play className="w-4 h-4 fill-current" />
                                    How it works
                                </Link>
                            </div>
                        </div>

                        {/* Decorative UI Element for Card */}
                        <div className="relative hidden md:block h-[300px] border border-zinc-800 rounded-xl bg-zinc-950/50 backdrop-blur-sm p-6 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nothing-red via-transparent to-transparent" />
                            <div className="space-y-4 font-mono text-sm text-zinc-500">
                                <div className="flex justify-between text-zinc-300 border-b border-zinc-800 pb-2">
                                    <span>STATUS</span>
                                    <span className="text-emerald-500">OPTIMAL</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>LATENCY</span>
                                    <span>24ms</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>UPTIME</span>
                                    <span>99.99%</span>
                                </div>
                                <div className="h-32 mt-8 flex items-end gap-1">
                                    {[40, 60, 45, 70, 50, 80, 65, 55, 75, 90, 60, 50, 70, 85, 95].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            transition={{ delay: i * 0.05, duration: 0.5 }}
                                            className="flex-1 bg-zinc-800 hover:bg-nothing-red/50 transition-colors rounded-t-sm"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            
            {/* --- BIG BACKGROUND TEXT --- */}
            <motion.div
                style={{ y, opacity }}
                className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none select-none flex justify-center items-end overflow-hidden h-full pb-20"
            >
                <h1 className="text-[15vw] md:text-[23vw] font-bold leading-none text-zinc-900/5 dark:text-zinc-100/5 tracking-tighter whitespace-nowrap">
                    GENREC<span className="text-stroke-zinc dark:text-stroke-white opacity-20 text-transparent">.AI</span>
                </h1>
            </motion.div>


            {/* --- MAIN FOOTER LINKS --- */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 md:gap-8 mb-20">
                    {/* Brand Column */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
                            <span>GENREC</span>
                        </div>
                        <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
                            There is no risk-free trading. But there is intelligent risk management.
                        </p>

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            All systems operational
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-bold mb-6 text-sm">Main</h4>
                            <ul className="space-y-4 text-sm text-zinc-500">
                                <li><Link to="/about" className="hover:text-nothing-red transition-colors">About</Link></li>
                                <li><Link to="/work" className="hover:text-nothing-red transition-colors">Work</Link></li>
                                <li><Link to="/careers" className="hover:text-nothing-red transition-colors">Careers</Link></li>
                                <li><Link to="/contact" className="hover:text-nothing-red transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-sm">Services</h4>
                            <ul className="space-y-4 text-sm text-zinc-500">
                                <li><Link to="/products" className="hover:text-nothing-red transition-colors">Products</Link></li>
                                <li><Link to="/divisions" className="hover:text-nothing-red transition-colors">Divisions</Link></li>
                                <li><Link to="/blog" className="hover:text-nothing-red transition-colors">Insights</Link></li>
                                <li><Link to="/privacy" className="hover:text-nothing-red transition-colors">Legal</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-sm">Socials</h4>
                            <ul className="space-y-4 text-sm text-zinc-500">
                                <li>
                                    <a href="#" className="flex items-center gap-2 hover:text-nothing-red transition-colors">
                                        <Twitter className="w-4 h-4" /> X (Twitter)
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-2 hover:text-nothing-red transition-colors">
                                        <Linkedin className="w-4 h-4" /> LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-2 hover:text-nothing-red transition-colors">
                                        <Github className="w-4 h-4" /> GitHub
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400 font-mono">
                    <p>© 2024 GENREC AI. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link to="/privacy" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
