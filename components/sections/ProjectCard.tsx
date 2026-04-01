import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectProps {
  title: string;
  category: string;
  year: string;
  className?: string;
  image?: string; // Placeholder for image logic
}

export const ProjectCard: React.FC<ProjectProps> = ({ title, category, year, className }) => {
  return (
    <motion.div 
      whileHover={{ scale: 0.98 }}
      className={`relative p-6 border border-zinc-300 dark:border-zinc-800 rounded-3xl bg-white dark:bg-black overflow-hidden group cursor-pointer ${className}`}
    >
      <div className="absolute inset-0 bg-nothing-red translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
      
      <div className="relative z-10 flex flex-col h-full justify-between group-hover:text-white transition-colors duration-300">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-xs font-mono opacity-60 group-hover:opacity-80">{year}</span>
            <span className="text-xs font-mono opacity-60 group-hover:opacity-80 uppercase">{category}</span>
          </div>
          <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div>
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          <div className="h-[1px] w-0 group-hover:w-full bg-white mt-4 transition-all duration-500" />
        </div>
      </div>
    </motion.div>
  );
};