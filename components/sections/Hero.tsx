import React from 'react';
import { motion } from 'framer-motion';


export const Hero = () => {
  return (
    <div className="col-span-12 md:col-span-8 row-span-2 relative p-8 border border-zinc-300 dark:border-zinc-800 rounded-3xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm overflow-hidden group">
      <div className="absolute top-4 left-4 text-xs font-mono text-nothing-red">
        SYS.ROOT.USER
      </div>
      <div className="absolute top-4 right-4 flex space-x-1">
        <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <div className="w-2 h-2 rounded-full bg-nothing-red animate-pulse" />
      </div>

      <div className="h-full flex flex-col justify-end">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-4"
        >
          <span className="block font-glitch opacity-30 text-4xl mb-2">ENGINEER // CREATIVE</span>
          I BUILD <br />
          <span className="text-nothing-red">THINGS</span> <br />
          FOR WEB.
        </motion.h1>

        <p className="font-mono text-sm md:text-base max-w-lg mt-6 opacity-70">
          Full-stack architecture with a focus on raw performance and avant-garde interactions.
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <svg width="100" height="100" viewBox="0 0 100 100" className="animate-[spin_10s_linear_infinite]">
          <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
          <text className="text-[10px] font-mono fill-current uppercase tracking-widest">
            <textPath xlinkHref="#curve">
              Available for hire • Available for hire •
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};