import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code, Shield, Cpu, Activity, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';


import { SEO } from '../components/SEO';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-16">
    <motion.h3
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-sm font-bold text-nothing-red tracking-widest mb-4 flex items-center gap-2"
    >
      <span className="w-8 h-[1px] bg-nothing-red"></span>
      {title}
    </motion.h3>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-bold leading-tight"
    >
      {subtitle}
    </motion.h2>
  </div>
);

export const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="min-h-screen">
      <SEO
        title="Production Engineering Studio"
        description="Genrec AI is a production engineering studio. We build resilience into code and replace 'it works on my machine' with 'it works at scale'."
        keywords="Production Engineering, AI Studio, Software Architecture, Scalable Systems, Genrec AI"
      />

      {/* HERO SECTION - ULTRATHINK */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
        {/* Abstract Background Elements */}
        <motion.div style={{ y: y1 }} className="absolute top-20 right-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-br from-nothing-red/5 to-transparent rounded-full blur-3xl -z-10" />
        <motion.div style={{ y: y2 }} className="absolute bottom-20 left-[5%] w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-zinc-500/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6 relative z-10 pt-20 md:pt-0">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
                BUILDING<br />
                <span className="text-stroke-zinc text-transparent dark:text-stroke-white opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-default">RESILIENCE</span><br />
                INTO <span className="text-nothing-red">CODE.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col md:flex-row gap-8 md:items-end justify-between border-l-2 border-nothing-red pl-6 md:pl-8 ml-2"
            >
              <div className="max-w-xl">
                <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-mono leading-relaxed">
                  Genrec AI is a production engineering studio. We replace 'it works on my machine' with 'it works at scale'.
                </p>
              </div>

              <div className="flex gap-4">
                <Link to="/work" className="group bg-nothing-red text-white px-8 py-4 rounded-none skew-x-[-10deg] hover:bg-black transition-colors flex items-center gap-2 font-bold shadow-lg shadow-nothing-red/20">
                  <span className="skew-x-[10deg] block">VIEW WORK</span>
                  <ArrowRight className="skew-x-[10deg] w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK - MAGAZINE LAYOUT */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <SectionHeader title="SELECTED WORK" subtitle="Engineering, not just code." />

          <div className="space-y-20 md:space-y-32">
            {/* Project 1 */}
            <div className="group relative">
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 relative overflow-hidden rounded-sm">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2667&auto=format&fit=crop"
                    alt="LuminaIQ Dashboard"
                    className="w-full h-[40vh] md:h-[60vh] object-cover transition-all duration-700 scale-100 group-hover:scale-105"
                  />
                </div>
                <div className="md:col-span-4 md:-ml-20 relative z-20 bg-white dark:bg-zinc-900 p-8 md:p-12 shadow-xl md:shadow-2xl skew-y-0 md:group-hover:-translate-y-4 transition-transform duration-500 border border-zinc-100 dark:border-zinc-800 md:border-none">
                  <div className="text-xs font-bold text-nothing-red mb-2 tracking-widest">EDTECH PLATFORM</div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">LuminaIQ</h3>
                  <p className="text-zinc-500 mb-8 leading-relaxed">
                    Adaptive learning engine that converts PDFs into interactive learning flows using semantic search and AI-generated assessments.
                  </p>
                  <ul className="text-sm font-mono space-y-2 text-zinc-400 mb-8">
                    <li>// Semantic Search</li>
                    <li>// Vector Database</li>
                    <li>// Real-time Quiz Gen</li>
                  </ul>
                  <Link to="/work" className="text-sm font-bold border-b-2 border-zinc-200 dark:border-zinc-800 pb-1 hover:border-nothing-red transition-colors inline-flex items-center gap-2">
                    READ CASE STUDY <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative">
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 md:col-start-1 md:row-start-1 order-2 md:order-1 md:-mr-20 relative z-20 bg-white dark:bg-zinc-900 p-8 md:p-12 shadow-xl md:shadow-2xl md:text-right skew-y-0 md:group-hover:-translate-y-4 transition-transform duration-500 border border-zinc-100 dark:border-zinc-800 md:border-none">
                  <div className="text-xs font-bold text-nothing-red mb-2 tracking-widest">HOSPITALITY OPS</div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">Tabble</h3>
                  <p className="text-zinc-500 mb-8 leading-relaxed">
                    Tablet-first dining and service system built for high-volume restaurants. Offline-first architecture ensures 100% availability.
                  </p>
                  <ul className="text-sm font-mono space-y-2 text-zinc-400 mb-8 flex flex-col md:items-end">
                    <li>// Offline Sync</li>
                    <li>// React Native</li>
                    <li>// Real-time Socket</li>
                  </ul>
                  <Link to="/work" className="text-sm font-bold border-b-2 border-zinc-200 dark:border-zinc-800 pb-1 hover:border-nothing-red transition-colors inline-flex items-center gap-2">
                    READ CASE STUDY <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="md:col-span-8 md:col-start-5 md:row-start-1 order-1 md:order-2 relative overflow-hidden rounded-sm">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D"
                    alt="Tabble in use"
                    className="w-full h-[40vh] md:h-[60vh] object-cover transition-all duration-700 scale-100 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY - BENTO GRID */}
      <section className="py-24 md:py-32 bg-zinc-50 dark:bg-black relative">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader title="THE GENREC STANDARD" subtitle="Principles over Trends." />

          <div className="grid md:grid-cols-3 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
            {/* Tall Item */}
            <div className="md:row-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col justify-between group hover:border-nothing-red/50 transition-colors">
              <Shield className="w-12 h-12 text-zinc-300 group-hover:text-nothing-red transition-colors" />
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Verification<br />over Hype.</h3>
                <p className="text-sm md:text-base text-zinc-500 leading-relaxed">
                  Every architectural decision is tested against failure scenarios. We don't assume happy paths; we engineer for the edge cases where businesses die.
                </p>
              </div>
            </div>

            {/* Wide Item */}
            <div className="md:col-span-2 bg-zinc-900 text-white p-8 flex flex-col justify-center relative overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Performance as Default.</h3>
                <p className="text-zinc-300 max-w-lg">Optimization isn't a sprint at the end. It's embedded in every line of code we write, from the database schema to the render cycle.</p>
              </div>
            </div>

            {/* Small Item 1 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col justify-center gap-4 group hover:border-nothing-red/50 transition-colors">
              <Code className="w-8 h-8 text-nothing-red" />
              <h3 className="text-xl font-bold">Clarity over Cleverness.</h3>
            </div>

            {/* Small Item 2 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col justify-center gap-4 group hover:border-nothing-red/50 transition-colors">
              <Activity className="w-8 h-8 text-nothing-red" />
              <h3 className="text-xl font-bold">Precision over Speed.</h3>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM - DARK & BOLD */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader title="THE FOUNDERS" subtitle="Direct Engineering Collaboration." />
              <p className="text-xl text-zinc-500 mb-12 leading-relaxed">
                You work directly with the core engineers. No sales handoffs, no account managers. Ownership stays with the people who write the code and understand the constraints.
              </p>

              <div className="space-y-8">
                {[
                  { name: "Jai Samyukth B U", role: "Strategy & Product" },
                  { name: "Shyamnath Sankar", role: "Operations" },
                  { name: "Harish V", role: "Technical Lead" }
                ].map((person, i) => (
                  <div key={i} className="flex items-center gap-6 border-b border-zinc-100 dark:border-zinc-800 pb-6 group cursor-default">
                    <span className="text-sm font-mono text-zinc-300 group-hover:text-nothing-red transition-colors">0{i + 1}</span>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold">{person.name}</h4>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider">{person.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[400px] md:h-[600px] bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-glitch text-7xl md:text-[12rem] opacity-5 rotate-90 whitespace-nowrap">GENREC AI</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                alt="Team Collaboration"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-40 bg-nothing-red text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.svg')] opacity-40 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-8xl font-bold mb-8 tracking-tighter">
            READY TO <span className="text-black/50">SHIP?</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-mono">
            For projects where failure is not an option.
          </p>
          <Link to="/contact" className="inline-block bg-black text-white px-12 py-6 font-bold text-lg hover:bg-white hover:text-black transition-colors skew-x-[-10deg]">
            <span className="skew-x-[10deg] block">START PROJECT</span>
          </Link>
        </div>
      </section>

    </div>
  );
};