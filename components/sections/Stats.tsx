import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'EXP', value: '05Y' },
  { label: 'PROJECTS', value: '42+' },
  { label: 'STACK', value: 'TS/RX' },
  { label: 'REGION', value: 'GLOBAL' },
];

export const Stats = () => {
  return (
    <div className="col-span-6 md:col-span-4 row-span-1 p-6 border border-zinc-300 dark:border-zinc-800 rounded-3xl bg-zinc-100 dark:bg-zinc-900 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <span className="text-xs font-mono text-zinc-500">METRICS</span>
        <div className="h-[1px] w-12 bg-nothing-red" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + (i * 0.1) }}
            className="flex flex-col"
          >
            <span className="text-[10px] font-mono text-zinc-400">{stat.label}</span>
            <span className="text-xl font-bold tracking-tight">{stat.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};