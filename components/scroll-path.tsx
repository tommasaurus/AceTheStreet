"use client";

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollPath() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const checkVisibility = () => {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsVisible(heroBottom < 0);
      }
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Initial check
    return () => window.removeEventListener('scroll', checkVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-40"
      style={{ position: 'fixed' }}
    >
      <defs>
        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#93C5FD" />
        </linearGradient>
      </defs>
      
      {/* Path that snakes through the content */}
      <path
        d="M 100,300 
           C 100,300 150,300 200,300 
           C 250,300 300,500 350,500
           C 400,500 450,700 500,700
           C 550,700 600,900 650,900
           C 700,900 750,1100 800,1100"
        fill="none"
        stroke="#E1EFFE"
        strokeWidth="4"
      />
      
      {/* Animated progress overlay */}
      <motion.path
        d="M 100,300 
           C 100,300 150,300 200,300 
           C 250,300 300,500 350,500
           C 400,500 450,700 500,700
           C 550,700 600,900 650,900
           C 700,900 750,1100 800,1100"
        fill="none"
        stroke="url(#progress-gradient)"
        strokeWidth="4"
        style={{
          pathLength: scaleX
        }}
      />
      
      {/* Animated circle that follows the path */}
      <motion.circle
        cx="0"
        cy="0"
        r="8"
        fill="#3B82F6"
        style={{
          offsetDistance: scaleX.get() * 100 + "%",
          offsetPath: `path("M 100,300 
                            C 100,300 150,300 200,300 
                            C 250,300 300,500 350,500
                            C 400,500 450,700 500,700
                            C 550,700 600,900 650,900
                            C 700,900 750,1100 800,1100")`
        }}
      />
    </svg>
  );
}