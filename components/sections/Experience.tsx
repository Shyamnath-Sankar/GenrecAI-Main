import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const experiences = [
    {
        company: "Google DeepMind",
        role: "Senior AI Researcher",
        year: "2023 - PRESENT",
        description: "Leading research on large language models and agentic behaviors. Optimizing inference pipelines for billion-param models.",
        tech: ["Python", "JAX", "TensorFlow", "C++"]
    },
    {
        company: "Neuralink",
        role: "Embedded Systems Engineer",
        year: "2021 - 2023",
        description: "Developed low-latency firmware for BMI interfaces. Architected real-time data streaming protocols.",
        tech: ["Rust", "C", "Verilog", "Python"]
    },
    {
        company: "SpaceX",
        role: "Flight Software Engineer",
        year: "2019 - 2021",
        description: "Contributed to the Starship flight control systems. Implemented fail-safe redundancy protocols.",
        tech: ["C++", "Linux", "Real-time OS"]
    }
];

export const Experience = () => {
    return (
        <section className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 md:gap-24">
                {/* Sticky Header */}
                <div className="md:w-1/3">
                    <div className="sticky top-24">
                        <h2 className="text-sm font-mono tracking-widest text-nothing-red mb-4">01 / EXPERIENCE</h2>
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">
                            ENGINEERING<br />HISTORY
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
                            A timeline of solving complex problems in high-stakes environments.
                        </p>
                    </div>
                </div>

                {/* Experience List */}
                <div className="md:w-2/3 space-y-12">
                    {experiences.map((job, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1 }}
                            key={index}
                            className="group border-t border-zinc-200 dark:border-zinc-800 pt-12 relative"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                                <div>
                                    <h4 className="text-2xl font-bold group-hover:text-nothing-red transition-colors">{job.company}</h4>
                                    <p className="text-zinc-500 font-mono text-sm mt-1">{job.role}</p>
                                </div>
                                <span className="font-mono text-xs border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900">
                                    {job.year}
                                </span>
                            </div>

                            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 max-w-xl">
                                {job.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {job.tech.map((t, i) => (
                                    <span key={i} className="text-xs font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-900/50 px-2 py-1 rounded">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <ArrowUpRight className="absolute top-12 right-0 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-nothing-red" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
