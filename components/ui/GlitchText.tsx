import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(prev => 
          text.split("").map((letter, index) => {
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
        
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    } else {
      setDisplayText(text);
    }

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <span 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
};