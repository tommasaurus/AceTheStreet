import { InfiniteCarousel } from "./ui/infinite-carousel";

const BANKS = [
  {
    name: "PJT",
    logo: "/logos/banks/pjt.png",
  },
  {
    name: "Blackstone",
    logo: "/logos/banks/blackstone.png",
  },
  {
    name: "Moelis",
    logo: "/logos/banks/moelis.png",
  },
  {
    name: "Evercore",
    logo: "/logos/banks/evercore.png",
  },
  {
    name: "JP Morgan",
    logo: "/logos/jpmorgan.png",
  },
  {
    name: "Morgan Stanley",
    logo: "/logos/banks/morganstanley.png",
  },
  {
    name: "Goldman Sachs",
    logo: "/logos/banks/goldman-sachs.png",
  },
  {
    name: "Bank of America",
    logo: "/logos/banks/bofa.png",
  },
  {
    name: "UBS",
    logo: "/logos/banks/ubs.png",
  },
  {
    name: "Jefferies",
    logo: "/logos/banks/jefferies.png",
  },
];

const SCHOOLS = [
  {
    name: "Stanford",
    logo: "/logos/schools/stanford.svg",
  },
  {
    name: "UVA",
    logo: "/logos/schools/uva.svg",
  },
  {
    name: "Wharton",
    logo: "/logos/schools/wharton.svg",
  },
  {
    name: "Harvard",
    logo: "/logos/schools/harvard.svg",
  },
  {
    name: "MIT",
    logo: "/logos/schools/mit.svg",
  },
  {
    name: "UMich",
    logo: "/logos/schools/umich.svg",
  },
  {
    name: "IU Kelley",
    logo: "/logos/schools/iu-kelley.svg",
  },
  {
    name: "UChicago",
    logo: "/logos/schools/uchicago.svg",
  },
  {
    name: "UTAustin",
    logo: "/logos/schools/ut-austin.svg",
  },
  {
    name: "Western Ivey",
    logo: "/logos/schools/western-ivey.svg",
  },
];

export function PartnersSection() {
  return (
    <div className="py-24 bg-black/20 backdrop-blur-sm">
      <div className="space-y-16">
        <div className="space-y-6">
          <h3 className="text-center text-sm font-medium text-blue-100/70 uppercase tracking-wider">
            Real interview questions from top investment banks
          </h3>
          <div className="h-16">
            <InfiniteCarousel items={BANKS} direction="left" speed="slow" />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-center text-sm font-medium text-blue-100/70 uppercase tracking-wider">
            Trusted by students at leading universities
          </h3>
          <div className="h-16">
            <InfiniteCarousel items={SCHOOLS} direction="right" speed="slow" />
          </div>
        </div>
      </div>
    </div>
  );
}
