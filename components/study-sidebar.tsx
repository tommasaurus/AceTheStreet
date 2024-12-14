"use client";

import { Building2, GraduationCap, School } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function StudySidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 border-r bg-background">
      <div className="flex h-full flex-col">
        <div className="flex h-[64px] items-center justify-between border-b px-4">
          <span className="font-semibold">PrepIB</span>
          <ThemeToggle />
        </div>
        <nav className="flex-1 space-y-2 p-4">
          <Link
            href="/study/problems"
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname.startsWith("/study/problems")
                ? "bg-secondary text-secondary-foreground"
                : "hover:bg-secondary/50"
            )}
          >
            <School className="h-4 w-4" />
            Practice Problems
          </Link>
          <Link
            href="/study/banks"
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname.startsWith("/study/banks")
                ? "bg-secondary text-secondary-foreground"
                : "hover:bg-secondary/50"
            )}
          >
            <Building2 className="h-4 w-4" />
            Banks
          </Link>
          <Link
            href="/study/m&i400"
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname.startsWith("/study/m&i400")
                ? "bg-secondary text-secondary-foreground"
                : "hover:bg-secondary/50"
            )}
          >
            <GraduationCap className="h-4 w-4" />
            M&I 400
          </Link>
        </nav>
      </div>
    </div>
  );
}
