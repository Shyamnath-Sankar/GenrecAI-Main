import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Network, Palette, Database, Code2, Cpu, Aperture, Layers, Fingerprint } from 'lucide-react';

import { SEO } from '../components/SEO';

const DivisionSection = ({ division, index }: { division: any, index: number }) => {
    return (
        <div className="sticky top-0 min-h-screen flex items-center justify-center p-6 md:p-12 bg-white dark:bg-black overflow-hidden border-t border-zinc-200 dark:border-zinc-800">
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute right-0 top-0 text-[20vw] font-bold leading-none text-zinc-100 dark:text-zinc-900 select-none">
                    0{index + 1}
                </div>
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Text Block */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <div className="p-3 bg-nothing-red/10 text-nothing-red rounded-lg">
                                <division.icon className="w-8 h-8" />
                            </div>
                            <span className="text-xl font-mono text-zinc-500 tracking-widest uppercase">{division.subtitle}</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter mix-blend-difference"
                        >
                            {division.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-12 leading-relaxed max-w-xl"
                        >
                            {division.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-2 gap-6"
                        >
                            {division.capabilities.map((cap: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
                                    <div className="h-1.5 w-1.5 bg-nothing-red rounded-full" />
                                    <span className="text-sm font-bold uppercase tracking-wider text-zinc-500">{cap}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Visual Block */}
                    <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900 group">
                        <img
                            src={division.image}
                            alt={division.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-all duration-700"
                        />

                        {/* Decorative Overlay */}
                        <div className="absolute inset-0 border-[1rem] border-white/5 pointer-events-none" />
                        <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-mono text-xs">
                            SYSTEM_ID: {division.title.replace(" ", "_")}.SYS
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export const Divisions = () => {
    const divisions = [
        {
            title: "AI LABS",
            subtitle: "ENGINEERING CORE",
            description: "The central nervous system. We architect high-performance foundations, train models, and build resilience into the codebase.",
            icon: Cpu,
            capabilities: ["Sys Architecture", "LLM Integration", "Performant APIs", "Internal Tools"],
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
        },
        {
            title: "STUDIOS",
            subtitle: "BRAND NARRATIVE",
            description: "If an engineer builds a forest and no one sees it, does it exist? Studios ensures the story is told with the same precision as the code.",
            icon: Aperture,
            capabilities: ["Visual Identity", "Motion Design", "3D Rendering", "Copywriting"],
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
        },
        {
            title: "DESIGN",
            subtitle: "HUMAN INTERFACE",
            description: "Function-first design. We don't just decorate pixels; we map user intent to system capabilities with zero friction.",
            icon: Layers,
            capabilities: ["UX Strategy", "Design Systems", "Prototyping", "User Research"],
            image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop"
        },
        {
            title: "DATAOPS",
            subtitle: "INTELLIGENCE",
            description: "Decision support through structured chaos. Turning raw logs into actionable vectors for business growth.",
            icon: Database,
            capabilities: ["Data Pipelines", "Analytics", "Vector DBs", "Observability"],
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <SEO
                title="Divisions"
                description="One Standard. Four Expressions. AI Labs, Studios, Design, and DataOps working as a unified organism."
            />
            {/* Intro Section - No Top Padding needed because layout handles title */}

            <div className="relative">
                {divisions.map((div, i) => (
                    <DivisionSection key={i} division={div} index={i} />
                ))}
            </div>

            {/* Philosophy Footer */}
            <div className="min-h-[50vh] flex items-center justify-center p-6 md:p-20 bg-zinc-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10"></div>
                <div className="max-w-4xl text-center relative z-10">
                    <div className="inline-block mb-8 p-4 rounded-full bg-white/5 border border-white/10">
                        <Fingerprint className="w-8 h-8 text-nothing-red" />
                    </div>
                    <h2 className="text-4xl md:text-7xl font-bold mb-8">
                        One Standard. <br /><span className="text-zinc-500">Four Expressions.</span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        We don't silo our teams. Engineers understand design, and designers understand code constraints. A unified organism building better software.
                    </p>
                </div>
            </div>
        </div>
    );
};
