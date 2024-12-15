"use client";

import { usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LightbulbIcon,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Zap,
} from "lucide-react";
import { StudySidebar } from "@/components/study-sidebar";
import MatchContent from "@/components/study/match/MatchContent";

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide navigation for root bank and M&I pages
  const shouldHideNav =
    pathname === "/study/banks" || pathname === "/study/m&i400";

  return (
    <div className="min-h-screen bg-background">
      <StudySidebar />

      {/* Main Content */}
      <div className="pl-64">
        <div className="container mx-auto px-4 py-6">
          {shouldHideNav ? (
            children
          ) : (
            <Tabs defaultValue="flashcards" className="w-full">
              <TabsList className="grid w-full grid-cols-5 h-auto gap-4">
                <TabsTrigger
                  value="flashcards"
                  className="flex flex-col py-4 gap-2"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <LightbulbIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Flashcards</span>
                </TabsTrigger>
                <TabsTrigger value="learn" className="flex flex-col py-4 gap-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span>Learn</span>
                </TabsTrigger>
                <TabsTrigger value="test" className="flex flex-col py-4 gap-2">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <span>Test</span>
                </TabsTrigger>
                <TabsTrigger value="match" className="flex flex-col py-4 gap-2">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span>Match</span>
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex flex-col py-4 gap-2">
                  <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <span>Q-Chat</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="flashcards">{children}</TabsContent>
              <TabsContent value="learn">
                <div className="p-4 text-center text-muted-foreground">
                  Learn content coming soon...
                </div>
              </TabsContent>
              <TabsContent value="test">
                <div className="p-4 text-center text-muted-foreground">
                  Test content coming soon...
                </div>
              </TabsContent>
              <TabsContent value="match">
                <MatchContent />
              </TabsContent>
              <TabsContent value="chat">
                <div className="p-4 text-center text-muted-foreground">
                  Q-Chat content coming soon...
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}
