"use client";

import { AnimatedText } from "./animated-text";
import Image from "next/image";
import { motion } from "framer-motion";

export function DemoSection() {
  return (
    <section className='py-24 md:py-32 -mt-20 bg-white dark:bg-[#151e2a]'>
      <div className='container mx-auto px-4'>
        {/* Center text */}
        <div className='text-center max-w-4xl mx-auto mb-12 md:mb-16'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='text-4xl md:text-5xl font-bold text-center text-black dark:text-white'
          >
            Demo Video
          </motion.h2>
        </div>

        {/* Dashboard Image */}
        <div className='relative max-w-[1000px] mx-auto aspect-[16/9]'>
          <div className='absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent rounded-3xl' />
          <Image
            src='/images/dashboardPic.png'
            alt='Dashboard Preview'
            fill
            className='object-cover rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl'
            priority
          />
        </div>
      </div>
    </section>
  );
}
