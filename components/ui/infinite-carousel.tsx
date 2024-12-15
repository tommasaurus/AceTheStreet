import { cn } from "@/lib/utils";
import Image from "next/image";

interface CarouselItem {
  name: string;
  logo: string;
  size?: "small" | "medium" | "large";
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
        <div key={idx} className='flex items-center group px-16'>
          <Image
            src={item.logo}
            alt={item.name}
            width={200}
            height={100}
            style={{
              minWidth:
                item.size === "small"
                  ? "75px"
                  : item.size === "large"
                  ? "250px"
                  : "150px",
              height: "auto",
            }}
            className='group-hover:opacity-100 transition-opacity'
          />
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
        {content}
        {content}
        {content}
      </div>
    </div>
  );
}
