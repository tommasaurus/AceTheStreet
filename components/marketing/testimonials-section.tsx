"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Secured my dream role at Goldman Sachs",
    description:
      "The technical interview preparation was invaluable. The platform's comprehensive coverage of valuation, M&A, and LBO concepts helped me answer complex questions with confidence.",
    author: "Paweł Michalski",
    role: "Investment Banking Analyst",
    location: "Goldman Sachs",
    avatar: "/avatars/pawel.png",
  },
  {
    quote: "Best IB interview prep platform out there",
    description:
      "The practice questions perfectly matched what I was asked in my interviews at Morgan Stanley. The detailed explanations and step-by-step solutions were exactly what I needed.",
    author: "Guy Solan",
    role: "Investment Banking Associate",
    location: "Morgan Stanley",
    avatar: "/avatars/guy.png",
  },
  {
    quote: "From zero finance background to BB offer",
    description:
      "Coming from a non-target school with no finance background, this platform was crucial in helping me break into investment banking. The technical questions and mock interviews were game-changers.",
    author: "Facu Montanaro",
    role: "Investment Banking Analyst",
    location: "J.P. Morgan",
    avatar: "/avatars/facu.png",
  },
  {
    quote: "Very comprehensive IB interview prep",
    description:
      "The platform covers everything from technical questions to fit interviews. The real interview questions from current cycles and expert-verified solutions gave me a competitive edge.",
    author: "Richard Poelderl",
    role: "Investment Banking Analyst",
    location: "Bank of America",
    avatar: "/avatars/richard.png",
  },
];

export function TestimonialsSection() {
  interface Testimonial {
    quote: string;
    description: string;
    author: string;
    role: string;
    location: string;
    avatar: string;
  }

  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < TESTIMONIALS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  return (
    <section className='bg-white dark:bg-[#151e2a] pt-28 sm:pt-20 pb-12 sm:pb-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center max-w-4xl mx-auto mb-12'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='text-4xl md:text-5xl font-bold text-center text-black dark:text-white'
          >
            What our users say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className='mt-4 text-xl text-gray-600 dark:text-gray-300 italic'
          >
            Join{" "}
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-semibold'>
              2,000+ aspiring bankers
            </span>{" "}
            preparing for their dream roles
          </motion.p>
        </div>

        {/* Desktop Grid */}
        <div className='hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedTestimonial(testimonial)}
              className='cursor-pointer h-full'
            >
              <Card className='bg-[#ECECEC] dark:bg-[#1c2936] rounded-3xl border-0 p-8 h-full flex flex-col'>
                <CardContent className='p-0 flex flex-col h-full'>
                  <div className='flex-grow'>
                    <p className='text-2xl font-medium text-black dark:text-white mb-4 italic'>
                      "{testimonial.quote}"
                    </p>
                    <p className='text-[15px] text-gray-600 dark:text-gray-300 mb-6 line-clamp-3'>
                      {testimonial.description}
                    </p>
                  </div>

                  <div className='flex items-center gap-4 mt-auto'>
                    <Avatar className='h-12 w-12 border-2 border-[#E0E0E0] dark:border-[#2a3744]'>
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.author}
                      />
                      <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-lg font-medium text-black dark:text-white'>
                        {testimonial.author}
                      </p>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        {testimonial.role} • {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className='sm:hidden relative'>
          <div
            className='overflow-hidden touch-pan-y'
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className='flex transition-transform duration-300 ease-out'
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={testimonial.author}
                  className='w-full flex-shrink-0 px-4'
                >
                  <Card className='bg-[#ECECEC] dark:bg-[#1c2936] rounded-3xl border-0 p-8'>
                    <CardContent className='p-0'>
                      <p className='text-2xl font-medium text-black dark:text-white mb-4 italic'>
                        "{testimonial.quote}"
                      </p>
                      <p className='text-[15px] text-gray-600 dark:text-gray-300 mb-6'>
                        {testimonial.description}
                      </p>

                      <div className='flex items-center gap-4'>
                        <Avatar className='h-12 w-12 border-2 border-[#E0E0E0] dark:border-[#2a3744]'>
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.author}
                          />
                          <AvatarFallback>
                            {testimonial.author[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className='text-lg font-medium text-black dark:text-white'>
                            {testimonial.author}
                          </p>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>
                            {testimonial.role} • {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Updated Carousel Controls */}
          <div className='flex justify-center items-center gap-4 mt-6'>
            <button
              onClick={prevSlide}
              className={`p-2 rounded-full transition-all ${
                currentIndex === 0
                  ? "bg-[#DADADA] dark:bg-[#1c2936] opacity-50"
                  : "bg-[#ECECEC] dark:bg-[#1c2936] opacity-100"
              }`}
              disabled={currentIndex === 0}
            >
              <ChevronLeft
                size={20}
                className={`text-black dark:text-white ${
                  currentIndex === 0 ? "opacity-50" : "opacity-100"
                }`}
              />
            </button>
            <div className='flex gap-2'>
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentIndex === index
                      ? "bg-black dark:bg-white"
                      : "bg-[#ECECEC] dark:bg-[#1c2936]"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className={`p-2 rounded-full transition-all ${
                currentIndex === TESTIMONIALS.length - 1
                  ? "bg-[#DADADA] dark:bg-[#1c2936] opacity-50"
                  : "bg-[#ECECEC] dark:bg-[#1c2936] opacity-100"
              }`}
              disabled={currentIndex === TESTIMONIALS.length - 1}
            >
              <ChevronRight
                size={20}
                className={`text-black dark:text-white ${
                  currentIndex === TESTIMONIALS.length - 1
                    ? "opacity-50"
                    : "opacity-100"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTestimonial(null)}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className='bg-[#ECECEC] dark:bg-[#1c2936] rounded-3xl shadow-xl max-w-lg w-full relative'
            >
              <button
                onClick={() => setSelectedTestimonial(null)}
                className='absolute top-6 right-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              >
                <X size={24} />
              </button>

              <div className='p-8'>
                <p className='text-2xl font-medium text-black dark:text-white mb-4 italic'>
                  "{selectedTestimonial.quote}"
                </p>
                <p className='text-[15px] text-gray-600 dark:text-gray-300 mb-6'>
                  {selectedTestimonial.description}
                </p>

                <div className='flex items-center gap-4'>
                  <Avatar className='h-12 w-12 border-2 border-[#E0E0E0] dark:border-[#2a3744]'>
                    <AvatarImage
                      src={selectedTestimonial.avatar}
                      alt={selectedTestimonial.author}
                    />
                    <AvatarFallback>
                      {selectedTestimonial.author[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='text-lg font-medium text-black dark:text-white'>
                      {selectedTestimonial.author}
                    </p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      {selectedTestimonial.role} •{" "}
                      {selectedTestimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
