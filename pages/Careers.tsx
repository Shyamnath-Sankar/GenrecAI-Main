import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Clock, Code, Terminal, Brain, Cpu, ChevronRight } from 'lucide-react';

import { SEO } from '../components/SEO';

export const Careers = () => {

    const benefits = [
        { title: "Zero Bureaucracy", desc: "No middle management. You report to the founders.", icon: Zap },
        { title: "Deep Work", desc: "Async-first culture. 4-hour uninterrupted blocks are sacred.", icon: Brain },
        { title: "Tech Autonomy", desc: "You choose the stack for the problem, not legacy constraints.", icon: Terminal },
        { title: "Global Scale", desc: "Build systems used by thousands of users instantly.", icon: Cpu }
    ];

    const positions = [
        { role: "Senior Frontend Engineer", bg: "React / WebGL / Framer", loc: "Remote", type: "Full-time" },
        { role: "Agentic Systems Architect", bg: "Python / LangChain / Vector DB", loc: "Bangalore", type: "Full-time" },
        { role: "Product Designer", bg: "Figma / Spline / System Design", loc: "Hybrid", type: "Full-time" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
            <SEO
                title="Careers"
                description="Hire conviction. Genrec AI is a special forces team for software engineering. Value output over hours."
                keywords="Careers, Software Engineering Jobs, Remote Work, React, Python, Production Engineering"
            />
            {/* Hero */}
            <div className="container mx-auto px-6 max-w-7xl pb-20 pt-10">
                <div className="grid md:grid-cols-2 gap-12 items-end mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                            HIRE<br />
                            <span className="text-nothing-red">CONVICTION.</span>
                        </h1>
                        <p className="text-xl text-zinc-500 max-w-xl leading-relaxed">
                            Genrec AI is not a job. It's a tour of duty. We are a special forces team for software engineering.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="hidden md:block"
                    >
                        <div className="p-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-nothing-red" />
                                <span>Manifesto.txt</span>
                            </h3>
                            <p className="font-mono text-sm text-zinc-500 leading-relaxed">
                                {`> We value output over hours.`}<br />
                                {`> We value clarity over cleverness.`}<br />
                                {`> We value ownership over permission.`}<br />
                                {`> We ship. We fix. We learn.`}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Why Join */}
                <div className="grid md:grid-cols-2 gap-16 mb-32 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-8">Not for everyone.</h2>
                        <p className="text-lg text-zinc-500 mb-8 leading-relaxed">
                            We operate at a cadence that is uncomfortable for most. If you want a 9-5 where you can hide in meetings, this is not it. If you want to build things that matter, let's talk.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {benefits.map((b, i) => (
                                <div key={i} className="p-4 border border-zinc-100 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                                    <b.icon className="w-6 h-6 mb-3 text-nothing-red" />
                                    <h4 className="font-bold text-sm mb-1">{b.title}</h4>
                                    <p className="text-xs text-zinc-500">{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden bg-zinc-900">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover"
                            alt="Office Culture"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-9xl font-bold tracking-tighter text-white opacity-10 uppercase">BUILD</span>
                        </div>
                    </div>
                </div>

                {/* Jobs */}
                <div>
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-4xl font-bold">Open Roles</h2>
                        <button className="text-sm font-bold text-nothing-red hover:underline">VIEW ALL</button>
                    </div>
                    <div className="space-y-4">
                        {positions.map((pos, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-nothing-red transition-colors cursor-pointer bg-white dark:bg-black flex flex-col md:flex-row md:items-center justify-between gap-4"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-nothing-red transition-colors">{pos.role}</h3>
                                    <div className="flex gap-3 text-sm font-mono text-zinc-500">
                                        <span className="bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">{pos.bg}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden md:block">
                                        <div className="font-bold">{pos.loc}</div>
                                        <div className="text-xs text-zinc-500 uppercase tracking-widest">{pos.type}</div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center group-hover:bg-nothing-red group-hover:text-white transition-colors">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
