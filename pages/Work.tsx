import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const ProjectSection = ({ project, index }: { project: any, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8 }}
    className="group min-h-[90vh] flex items-center relative py-20"
  >
    <div className="container mx-auto px-6 max-w-7xl relative z-10">
      <div className={`grid md:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
        {/* Text Content */}
        <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-bold text-nothing-red tracking-widest uppercase px-3 py-1 border border-nothing-red/20 rounded-full bg-nothing-red/5">
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-400">//{project.year}</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-none tracking-tight">
            {project.title}
          </h2>

          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-12 leading-relaxed font-light">
            {project.description}
          </p>

          <div className="space-y-6 mb-12">
            <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-2">Technical Highlights</h4>
            <ul className="grid grid-cols-1 gap-3">
              {project.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-nothing-red shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Link to="/contact" className="inline-flex items-center gap-3 text-lg font-bold hover:text-nothing-red transition-colors group/link">
            REQUEST DEMO <ArrowUpRight className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Image Content */}
        <div className={`relative ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
          <div className={`aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm relative ${index % 2 === 0 ? 'md:rotate-2' : 'md:-rotate-2'} group-hover:rotate-0 transition-transform duration-700 ease-out`}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
            />
          </div>
          {/* Decorative floating element */}
          <div className={`absolute -bottom-10 ${index % 2 === 0 ? '-left-10' : '-right-10'} w-40 h-40 bg-zinc-100 dark:bg-zinc-800 rounded-full blur-3xl -z-10`} />
        </div>
      </div>
    </div>
  </motion.div>
);

export const Work = () => {
  const projects = [
    {
      title: "LuminaIQ",
      category: "EdTech Platform",
      description: "Adaptive learning engine that interrogates documents. We built a semantic layer that converts static PDFs into interactive learning flows, increasing retention by 40%.",
      features: ["Semantic document understanding", "AI-generated quizzes", "Context-aware learning flow", "Real-time vector indexing"],
      year: "2024",
      image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2670&auto=format&fit=crop"
    },
    {
      title: "Tabble",
      category: "Hospitality Operations",
      description: "Tablet-first dining system for high-volume chaos. Built to withstand internet outages, spilled drinks, and 500 orders per hour without flinching.",
      features: ["Offline-tolerant architecture", "Order coordination mesh", "Real-time kitchen display", "0.5s Touch Latency"],
      year: "2025",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Works"
        description="Explore our portfolio of production-grade engineering projects. We build systems that perform at scale."
        keywords="Portfolio, Case Studies, Software Development, React Projects, Engineering"
      />
      <div className="pt-0 pb-20 container mx-auto px-6">

        <div className="relative z-10">
          {projects.map((project, index) => (
            <ProjectSection key={index} project={project} index={index} />
          ))}
        </div>

        <div className="h-[20vh] flex items-center justify-center relative z-10">
          <Link to="/case-studies" className="text-xl md:text-3xl font-bold hover:text-nothing-red transition-colors flex flex-col items-center gap-4 group">
            <span>VIEW DETAILED CASE STUDIES</span>
            <span className="w-full h-[2px] bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
              <span className="absolute inset-0 bg-nothing-red -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};