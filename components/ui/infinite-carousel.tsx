import { cn } from "@/lib/utils";
import Image from "next/image";

interface CarouselItem {
  name: string;
  logo: string;
}

interface InfiniteCarouselProps {
  items: CarouselItem[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export function InfiniteCarousel({
  items,
  direction = "left",
  speed = "normal",
  className,
}: InfiniteCarouselProps) {
  const speedClass = {
    slow: "animate-scroll-slow",
    normal: "animate-scroll",
    fast: "animate-scroll-fast",
  }[speed];

  const content = (
    <>
      {items.map((item, idx) => (
        <div key={idx} className="mx-12 flex flex-col items-center group">
          <div className="h-8 flex items-center">
            <Image
              src={item.logo}
              alt={item.name}
              width={120}
              height={32}
              className="opacity-60 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <span className="mt-2 text-xs text-blue-100/60 group-hover:text-blue-100/90 transition-colors">
            {item.name}
          </span>
        </div>
      ))}
    </>
  );

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex whitespace-nowrap",
          speedClass,
          direction === "right" ? "animate-scroll-right" : "animate-scroll-left"
        )}
      >
        {/* Duplicate content for seamless loop */}
        {content}
        {content}
      </div>
    </div>
  );
}
