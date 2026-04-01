import React from 'react';
import { motion } from 'framer-motion';

const skills = {
    "CORE": ["TypeScript", "Rust", "Python", "Go", "C++", "Solidity"],
    "FRAMEWORKS": ["React", "Next.js", "TailwindCSS", "Three.js", "PyTorch", "Tauri"],
    "DEVOPS": ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Nginx"],
    "DESIGN": ["Figma", "Blender", "After Effects", "Rive", "Spline", "GLSL"]
};

export const Skills = () => {
    return (
        <section className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                {/* Sticky Header */}
                <div className="md:w-1/3">
                    <div className="sticky top-24">
                        <h2 className="text-sm font-mono tracking-widest text-nothing-red mb-4">02 / ARSENAL</h2>
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">
                            TECHNICAL<br />STACK
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
                            A curated collection of tools for building high-performance digital infrastructure.
                        </p>
                    </div>
                </div>

                {/* Skills Grid */}
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(skills).map(([category, items], index) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            key={category}
                            className="p-8 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] bg-zinc-50 dark:bg-black hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[url('/assets/skills-bg.png')] opacity-[0.05] pointer-events-none bg-repeat" />
                            <h4 className="font-mono text-sm text-zinc-500 mb-6 tracking-widest relative z-10">{category}</h4>
                            <div className="flex flex-wrap gap-3 relative z-10">
                                {items.map((skill) => (
                                    <span key={skill} className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-bold bg-white dark:bg-zinc-950 hover:border-nothing-red transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
