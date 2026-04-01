import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail } from 'lucide-react';

export const Resume = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 pb-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-[3rem] bg-zinc-950 text-white p-12 md:p-24 border border-zinc-800 text-center md:text-left"
            >
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[url('/assets/resume-bg.png')] bg-cover bg-center opacity-80 pointer-events-none" />
                <div className="absolute right-0 top-0 w-96 h-96 bg-nothing-red/20 blur-[150px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                            READY TO<br /> <span className="text-zinc-500">COLLABORATE?</span>
                        </h2>
                        <p className="text-zinc-400 max-w-md text-lg">
                            Currently available for freelance projects and full-time roles. Let's build something extraordinary.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-auto">
                        <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold tracking-tight text-lg overflow-hidden hover:scale-105 transition-transform">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <Download size={20} />
                                DOWNLOAD RESUME
                            </span>
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-zinc-700 text-white rounded-full font-bold tracking-tight text-lg hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2">
                            <Mail size={20} />
                            CONTACT ME
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
