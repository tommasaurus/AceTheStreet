"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

interface LogoImageProps {
  src: string;
  alt: string;
  size: "small" | "medium" | "large";
}

export function LogoImage({ src, alt, size }: LogoImageProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const sizeClasses = {
    small: "h-8",
    medium: "h-10",
    large: "h-12",
  };

  return (
    <div
      className={`${sizeClasses[size]} relative flex items-center justify-center`}
    >
      <Image
        src={src}
        alt={alt}
        className={`h-full w-auto object-contain ${
          isDark ? "invert brightness-200 contrast-100" : ""
        }`}
        width={200}
        height={80}
        style={{ maxWidth: "unset" }}
      />
    </div>
  );
}
