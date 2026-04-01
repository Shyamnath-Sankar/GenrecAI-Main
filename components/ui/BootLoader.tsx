import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootLoaderProps {
  onComplete: () => void;
}

export const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const bootSequence = [
    "INIT_CORE_KERNEL...",
    "LOADING_MODULES [GRAPHICS, AUDIO, NETWORK]...",
    "MOUNTING_VIRTUAL_DOM...",
    "ESTABLISHING_SECURE_CONNECTION...",
    "SYSTEM_READY."
  ];

  useEffect(() => {
    // Sequence logic
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= bootSequence.length) {
          clearInterval(interval);
          setTimeout(onComplete, 800); // Slight delay after completion
          return prev;
        }
        setLogs(l => [...l, bootSequence[prev]]);
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-black text-white font-mono flex flex-col items-center justify-center p-8 cursor-wait"
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="w-full max-w-md">
        <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-2">
           <span className="text-nothing-red font-bold animate-pulse">N(0)THING_BIOS v2.4</span>
           <span className="text-xs text-zinc-500">{new Date().toISOString().split('T')[0]}</span>
        </div>
        
        <div className="space-y-2 text-xs md:text-sm h-48 overflow-hidden font-mono text-zinc-400">
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2"
            >
              <span className="text-nothing-red">{'>'}</span>
              <span>{log}</span>
            </motion.div>
          ))}
          <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
        </div>

        <div className="mt-8 h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-nothing-red"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / bootSequence.length) * 100}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};