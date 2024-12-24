"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import { StudySidebar } from "@/components/dashboard/study-sidebar";

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <Suspense fallback={<SidebarSkeleton />}>
        <StudySidebar />
      </Suspense>
      <main className="flex-1 overflow-y-auto flex justify-center">
        <div className="container max-w-6xl px-6 pl-[64px] pt-4">
          <Suspense fallback={<ContentSkeleton />}>{children}</Suspense>
        </div>
      </main>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="fixed left-0 top-0 h-screen bg-white dark:bg-[#151e2a] w-20 animate-pulse">
      {/* Add skeleton UI here */}
    </div>
  );
}

function ContentSkeleton() {
  return (
    <div className="w-full animate-pulse">{/* Add skeleton UI here */}</div>
  );
}
