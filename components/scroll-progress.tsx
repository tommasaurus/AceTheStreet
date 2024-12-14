"use client";

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 h-[60vh] w-[2px] bg-blue-100/20">
      <div 
        className="bg-blue-400 w-full transition-all duration-200 relative"
        style={{ height: `${progress}%` }}
      >
        <div className="absolute right-0 translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400" 
             style={{ top: '100%' }} />
      </div>
    </div>
  );
}