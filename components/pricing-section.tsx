"use client";

import { Check, Trash2, MonitorPlay, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function PricingSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
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

    const cards = document.querySelectorAll(".pricing-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className='pt-12 pb-24 bg-white dark:bg-[#151e2a]'>
      <div className='container mx-auto px-4'>
        {/* Title and subtitle */}
        <div className='text-center max-w-4xl mx-auto mb-8'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='text-4xl md:text-5xl font-bold text-center text-black dark:text-white'
          >
            Pricing Plans
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className='mt-4 text-xl text-gray-600 dark:text-gray-300 italic'
          >
            "PrepIB helped me land offers at Morgan Stanely and PJT NY M&A! –
            Sophomore from UChicago"
          </motion.p>
        </div>

        {/* Pricing cards - scrollable on mobile with snap points */}
        <div className='flex overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto pt-4'>
          {/* Basic Plan */}
          <div
            className='pricing-card flex-none w-full md:w-auto snap-center px-4 md:px-0 min-w-[85vw] md:min-w-0'
            data-index='0'
          >
            <Card className='bg-gray-100 dark:bg-[#1c2936] rounded-3xl border-0 p-8 flex flex-col'>
              <CardHeader className='p-0 space-y-6'>
                <div className='w-12 h-12 rounded-xl bg-gray-200 dark:bg-[#2a3744] flex items-center justify-center'>
                  <Trash2 className='w-6 h-6 text-black dark:text-white' />
                </div>
                <div className='space-y-2'>
                  <CardTitle className='text-2xl font-medium text-black dark:text-white'>
                    Basic Plan
                  </CardTitle>
                  <div className='flex flex-col'>
                    <div className='flex items-baseline gap-1'>
                      <span className='text-3xl font-semibold text-black dark:text-white'>
                        $20
                      </span>
                      <span className='text-gray-500 dark:text-gray-400'>
                        /month
                      </span>
                    </div>
                    <span className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                      1 month • $20 total
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='p-0 mt-8 flex-grow flex flex-col justify-between'>
                <ul className='space-y-5 mb-8'>
                  <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                    <X className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                    <span>Bank specific questions</span>
                  </li>
                  <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                    <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                    <span>M&I questions</span>
                  </li>
                  <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                    <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                    <span>Community access</span>
                  </li>
                  <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                    <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                    <span>Interview guides</span>
                  </li>
                </ul>
                <Button className='w-full bg-black hover:bg-black/90 text-white rounded-full h-12 dark:bg-white dark:text-black dark:hover:bg-white/90'>
                  Current plan
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Pro Plan */}
          <div
            className='pricing-card flex-none w-full md:w-auto snap-center px-4 md:px-0 min-w-[85vw] md:min-w-0'
            data-index='1'
          >
            <Card className='bg-gray-100 dark:bg-[#1c2936] rounded-3xl border-0 p-8 flex flex-col relative'>
              {/* Most Popular Tag */}
              <div className='absolute -top-3 left-0 right-0 flex justify-center'>
                <div className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-1.5 rounded-full text-sm font-medium shadow-lg z-10'>
                  Most Popular: Save 33%
                </div>
              </div>
              {/* Colorful Border */}
              <div className='absolute -inset-[1px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-[24px]' />
              {/* White/Dark Background to create border effect */}
              <div className='absolute inset-[1px] bg-gray-100 dark:bg-[#1c2936] rounded-[23px]' />
              {/* Content with relative positioning to appear above backgrounds */}
              <div className='relative'>
                <CardHeader className='p-0 space-y-6'>
                  <div className='w-12 h-12 rounded-xl bg-gray-200 dark:bg-[#2a3744] flex items-center justify-center'>
                    <MonitorPlay className='w-6 h-6 text-black dark:text-white' />
                  </div>
                  <div className='space-y-2'>
                    <CardTitle className='text-2xl font-medium text-black dark:text-white'>
                      Pro Plan
                    </CardTitle>
                    <div className='flex flex-col'>
                      <div className='flex items-baseline gap-1'>
                        <span className='text-3xl font-semibold text-black dark:text-white'>
                          $13.33
                        </span>
                        <span className='text-gray-500 dark:text-gray-400'>
                          /month
                        </span>
                      </div>
                      <span className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                        3 months • $40 total
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='p-0 mt-8 flex-grow flex flex-col justify-between'>
                  <ul className='space-y-5 mb-8'>
                    <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                      <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                      <span>Bank specific questions</span>
                    </li>
                    <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                      <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                      <span>M&I questions</span>
                    </li>
                    <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                      <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                      <span>Community access</span>
                    </li>
                    <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                      <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                      <span>Interview guides</span>
                    </li>
                  </ul>
                  <Button className='w-full bg-black hover:bg-black/90 text-white rounded-full h-12 dark:bg-white dark:text-black dark:hover:bg-white/90 relative group overflow-hidden'>
                    <span className='relative z-10'>Subscribe</span>
                    <div className='absolute inset-0 animate-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity' />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Max Plan */}
          <div
            className='pricing-card flex-none w-full md:w-auto snap-center px-4 md:px-0 min-w-[85vw] md:min-w-0'
            data-index='2'
          >
            <Card className='bg-gray-100 dark:bg-[#1c2936] rounded-3xl border-0 p-8 flex flex-col relative'>
              {/* Best Value Tag */}
              <div className='absolute -top-3 left-0 right-0 flex justify-center'>
                <div className='bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 text-white px-6 py-1.5 rounded-full text-sm font-medium shadow-lg z-10'>
                  Best Value
                </div>
              </div>
              <CardHeader className='p-0 space-y-6'>
                <div className='w-12 h-12 rounded-xl bg-gray-200 dark:bg-[#2a3744] flex items-center justify-center'>
                  <MonitorPlay className='w-6 h-6 text-black dark:text-white' />
                </div>
                <div className='space-y-2'>
                  <CardTitle className='text-2xl font-medium text-black dark:text-white'>
                    Max Plan
                  </CardTitle>
                  <div className='flex flex-col'>
                    <div className='flex items-baseline gap-1'>
                      <span className='text-3xl font-semibold text-black dark:text-white'>
                        $6.67
                      </span>
                      <span className='text-gray-500 dark:text-gray-400'>
                        /month
                      </span>
                    </div>
                    <span className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                      12 months • $80 total
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='p-0 mt-8 flex-grow flex flex-col justify-between'>
                <ul className='space-y-5 mb-8'>
                  <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                    <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                    <span>Bank specific questions</span>
                  </li>
                  <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                    <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                    <span>M&I questions</span>
                  </li>
                  <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                    <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                    <span>Community access</span>
                  </li>
                  <li className='flex items-center gap-3 text-[15px] text-gray-600 dark:text-gray-300'>
                    <Check className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                    <span>Interview guides</span>
                  </li>
                </ul>
                <Button className='w-full bg-white hover:bg-white/90 text-black rounded-full h-12 dark:bg-black dark:text-white dark:hover:bg-black/90'>
                  Get Max
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Pagination Dots */}
        <div className='flex justify-center gap-2 mt-6 md:hidden'>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
