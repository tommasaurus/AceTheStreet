"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDE_DURATION = 5000; // 5 seconds per slide

const slides = [
  {
    lightSrc: "/images/dashboardPicLight.png",
    darkSrc: "/images/dashboardPicDark.png",
    title: "Practice with real interview questions",
  },
  {
    lightSrc: "/images/gameLight.png",
    darkSrc: "/images/gameDark.png",
    title: "Test your knowledge with matching games",
  },
  {
    lightSrc: "/images/testLight.png",
    darkSrc: "/images/testDark.png",
    title: "Practice with timed assessments",
  },
];

export function DemoSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [currentSlide, setCurrentSlide] = useState(0);

  // Use modulo operator to ensure proper cycling through all slides
  const safeCurrentSlide = currentSlide % slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Add safety check for slides array
  if (!slides.length) return null;

  return (
    <section id='features' className='py-16 bg-white dark:bg-[#151e2a]'>
      <div className='container mx-auto px-4'>
        <div className='text-center max-w-4xl mx-auto mb-12'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='text-4xl md:text-5xl font-bold text-center text-black dark:text-white'
          >
            Interactive Learning Platform
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className='mt-4 text-xl text-gray-600 dark:text-gray-300 italic'
          >
            Master investment banking interviews through{" "}
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-semibold'>
              interactive practice
            </span>
          </motion.p>
        </div>

        {/* Slideshow Container */}
        <div className='max-w-[1000px] mx-auto'>
          {/* Image Container */}
          <div className='relative aspect-[16/9] mb-8'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={safeCurrentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className='absolute inset-0'
              >
                <Image
                  src={
                    isDark
                      ? slides[safeCurrentSlide].darkSrc
                      : slides[safeCurrentSlide].lightSrc
                  }
                  alt={slides[safeCurrentSlide].title}
                  fill
                  className='object-cover rounded-3xl border-2 border-black/10 dark:border-white/10 shadow-xl'
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation and Controls Container */}
          <div className='flex items-center justify-center gap-8'>
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className='p-2 rounded-full bg-[#ECECEC] dark:bg-[#1c2936] text-black dark:text-white disabled:opacity-50'
              aria-label='Previous slide'
            >
              <ChevronLeft size={20} />
            </button>

            {/* Slide indicators */}
            <div className='flex gap-2'>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    safeCurrentSlide === index
                      ? "bg-black dark:bg-white"
                      : "bg-[#ECECEC] dark:bg-[#1c2936]"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className='p-2 rounded-full bg-[#ECECEC] dark:bg-[#1c2936] text-black dark:text-white disabled:opacity-50'
              aria-label='Next slide'
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Caption */}
          <motion.p
            key={safeCurrentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='text-xl font-medium text-black dark:text-white italic text-center mt-6'
          >
            {slides[safeCurrentSlide].title}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
