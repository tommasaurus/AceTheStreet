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
    <div className="min-h-screen bg-background flex">
      <Suspense fallback={<SidebarSkeleton />}>
        <StudySidebar />
      </Suspense>
      <main className="flex-1 flex justify-center w-full">
        <div className="container max-w-6xl px-4 pt-4">
          <Suspense fallback={<ContentSkeleton />}>{children}</Suspense>
        </div>
      </main>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="fixed left-0 top-0 h-screen bg-white dark:bg-[#151e2a] w-20 animate-pulse z-50">
      {/* Add skeleton UI here */}
    </div>
  );
}

function ContentSkeleton() {
  return (
    <div className="w-full animate-pulse">{/* Add skeleton UI here */}</div>
  );
}
