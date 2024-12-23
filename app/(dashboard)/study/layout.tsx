"use client";

import { usePathname } from "next/navigation";
import { StudySidebar } from "@/components/dashboard/study-sidebar";

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='h-screen bg-background flex overflow-hidden'>
      <StudySidebar />
      <main className='flex-1 overflow-y-auto flex justify-center'>
        <div className='container max-w-6xl px-6 pl-[64px] pt-4'>
          {children}
        </div>
      </main>
    </div>
  );
}
