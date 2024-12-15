"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

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
    quote: "Very comprehensive IB interview preparation",
    description:
      "The platform covers everything from technical questions to fit interviews. The real interview questions from current cycles and expert-verified solutions gave me a competitive edge.",
    author: "Richard Poelderl",
    role: "Investment Banking Analyst",
    location: "Bank of America",
    avatar: "/avatars/richard.png",
  },
];

export function TestimonialsSection() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Number(entry.target.getAttribute("data-index"));
        setActiveIndex(index);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.5,
    });

    const testimonials = document.querySelectorAll(".testimonial-card");
    testimonials.forEach((testimonial) => observer.observe(testimonial));

    return () => observer.disconnect();
  }, []);

  return (
    <section className='py-16 sm:py-24 bg-white dark:bg-[#151e2a] overflow-hidden -mb-20'>
      <div className='container mx-auto px-4'>
        <div className='space-y-12'>
          <div className='space-y-4'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className='text-4xl md:text-5xl font-bold text-center text-black dark:text-white'
            >
              What our users say
            </motion.h2>
          </div>

          <div className='relative w-full max-w-[1400px] mx-auto'>
            <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-40' />

            <div className='relative flex overflow-x-auto no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={testimonial.author}
                  className='testimonial-card flex-none w-full sm:w-auto snap-center px-4 sm:px-0 min-w-[85vw] sm:min-w-0'
                  data-index={index}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    whileHover={{ scale: 1.02, zIndex: 10 }}
                    onClick={() => setSelectedTestimonial(testimonial)}
                    className='cursor-pointer'
                  >
                    <Card className='relative bg-gray-100 dark:bg-[#1c2936] rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
                      <CardContent className='p-8'>
                        <p className='text-2xl font-medium text-black dark:text-white mb-4 italic'>
                          "{testimonial.quote}"
                        </p>
                        <p className='text-[15px] text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 italic'>
                          {testimonial.description}
                        </p>

                        <div className='flex items-center gap-4'>
                          <Avatar className='h-12 w-12 border-2 border-gray-200 dark:border-[#2a3744]'>
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
                            <p className='text-sm text-gray-600 dark:text-gray-400'>
                              {testimonial.role} • {testimonial.location}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Pagination Dots */}
      <div className='flex justify-center gap-2 mt-6 sm:hidden'>
        {TESTIMONIALS.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === activeIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

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
              className='bg-gray-100 dark:bg-[#1c2936] rounded-3xl shadow-xl max-w-lg w-full relative'
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
                <p className='text-[15px] text-gray-600 dark:text-gray-300 mb-6 italic'>
                  {selectedTestimonial.description}
                </p>

                <div className='flex items-center gap-4'>
                  <Avatar className='h-12 w-12 border-2 border-gray-200 dark:border-[#2a3744]'>
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
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
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
