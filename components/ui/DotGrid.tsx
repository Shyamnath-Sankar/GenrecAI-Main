import React from 'react';

export const DotGrid = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.15] dark:opacity-[0.2]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" className="fill-current text-zinc-500 dark:text-zinc-600" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-nothing-light via-transparent to-nothing-light dark:from-nothing-dark dark:via-transparent dark:to-nothing-dark h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-nothing-light via-transparent to-nothing-light dark:from-nothing-dark dark:via-transparent dark:to-nothing-dark h-full w-full" />
    </div>
  );
};