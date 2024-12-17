"use client";

import { InfiniteCarousel } from "@/components/ui/infinite-carousel";
import { LogoImage } from "@/components/ui/logo-image";

type LogoSize = "small" | "medium" | "large";

const BANKS: Array<{ name: string; logo: string; size: LogoSize }> = [
  {
    name: "PJT",
    logo: "/logos/banks/pjt.png",
    size: "small",
  },
  {
    name: "Blackstone",
    logo: "/logos/banks/blackstone.png",
    size: "medium",
  },
  {
    name: "Moelis",
    logo: "/logos/banks/moelis.png",
    size: "large",
  },
  {
    name: "Evercore",
    logo: "/logos/banks/evercore.png",
    size: "medium",
  },
  {
    name: "JP Morgan",
    logo: "/logos/banks/jpmorgan.png",
    size: "large",
  },
  {
    name: "Morgan Stanley",
    logo: "/logos/banks/morganstanley.png",
    size: "large",
  },
  {
    name: "Goldman Sachs",
    logo: "/logos/banks/goldman-sachs.png",
    size: "small",
  },
  {
    name: "Bank of America",
    logo: "/logos/banks/bofa.png",
    size: "large",
  },
  {
    name: "UBS",
    logo: "/logos/banks/ubs.png",
    size: "medium",
  },
  {
    name: "Jefferies",
    logo: "/logos/banks/jefferies.png",
    size: "medium",
  },
];

const SCHOOLS: Array<{ name: string; logo: string; size: LogoSize }> = [
  {
    name: "Stanford",
    logo: "/logos/schools/stanford.png",
    size: "small",
  },
  {
    name: "UVA",
    logo: "/logos/schools/uva.png",
    size: "medium",
  },
  {
    name: "Wharton",
    logo: "/logos/schools/wharton.png",
    size: "large",
  },
  {
    name: "Harvard",
    logo: "/logos/schools/yale.png",
    size: "medium",
  },
  {
    name: "MIT",
    logo: "/logos/schools/mit.svg",
    size: "medium",
  },
  {
    name: "UMich",
    logo: "/logos/schools/umich.png",
    size: "large",
  },
  {
    name: "IU Kelley",
    logo: "/logos/schools/iu-kelley.png",
    size: "medium",
  },
  {
    name: "UChicago",
    logo: "/logos/schools/uchicago.webp",
    size: "medium",
  },
  {
    name: "UTAustin",
    logo: "/logos/schools/ut-austin.png",
    size: "medium",
  },
  {
    name: "Western Ivey",
    logo: "/logos/schools/western-ivey.png",
    size: "medium",
  },
];

export function PartnersSection() {
  return (
    <div className='py-16 sm:py-24 bg-white dark:bg-[#151e2a] -mt-14'>
      <div className='space-y-16'>
        <div className='space-y-6'>
          <h3 className='text-center text-2xl font-semibold text-gray-600 dark:text-blue-100/70 uppercase tracking-wider'>
            Real interview questions from top investment banks
          </h3>
          <div className='h-20'>
            <InfiniteCarousel
              items={BANKS.map((bank) => ({
                ...bank,
                component: (
                  <LogoImage src={bank.logo} alt={bank.name} size={bank.size} />
                ),
              }))}
              direction='left'
              speed='normal'
            />
          </div>
        </div>

        <div className='space-y-6'>
          <h3 className='text-center text-2xl font-semibold text-gray-600 dark:text-blue-100/70 uppercase tracking-wider'>
            Trusted by students at leading universities
          </h3>
          <div className='h-20'>
            <InfiniteCarousel
              items={SCHOOLS.map((school) => ({
                ...school,
                component: (
                  <LogoImage
                    src={school.logo}
                    alt={school.name}
                    size={school.size}
                  />
                ),
              }))}
              direction='right'
              speed='normal'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
