"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Check,
  Settings,
  Palette,
  Eye,
  Info,
  HelpCircle,
  Download,
  LogOut,
  ExternalLink,
  ChevronLeft,
  Menu,
  X,
  CreditCard,
  User,
  Camera,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, GraduationCap, School } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsDialog } from "@/components/settings-dialog";

export function StudySidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    setShowProfileMenu(false);
    router.push("/");
  };

  const handleSettingsClick = () => {
    setShowProfileMenu(false);
    setShowSettings(true);
  };

  return (
    <>
      <div
        className={cn(
          "fixed left-0 top-0 h-screen border-r bg-background transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-[64px] items-center justify-between border-b px-4">
            <div className="flex-1 min-w-0">
              {!isCollapsed && <span className="font-semibold">PrepIB</span>}
            </div>
            <div className="flex items-center gap-2">
              {!isCollapsed && <ThemeToggle />}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-9 w-9 shrink-0"
              >
                {isCollapsed ? (
                  <Menu className="h-5 w-5" />
                ) : (
                  <ChevronLeft className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            <Link
              href="/study/problems"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                pathname.startsWith("/study/problems")
                  ? "bg-secondary text-secondary-foreground"
                  : "hover:bg-secondary/50",
                isCollapsed && "justify-center px-2"
              )}
            >
              <School className="h-5 w-5 shrink-0" />
              {!isCollapsed && (
                <span className="truncate">Practice Problems</span>
              )}
            </Link>
            <Link
              href="/study/banks"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                pathname.startsWith("/study/banks")
                  ? "bg-secondary text-secondary-foreground"
                  : "hover:bg-secondary/50",
                isCollapsed && "justify-center px-2"
              )}
            >
              <Building2 className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="truncate">Banks</span>}
            </Link>
            <Link
              href="/study/m&i400"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                pathname.startsWith("/study/m&i400")
                  ? "bg-secondary text-secondary-foreground"
                  : "hover:bg-secondary/50",
                isCollapsed && "justify-center px-2"
              )}
            >
              <GraduationCap className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="truncate">M&I 400</span>}
            </Link>
          </nav>

          <div className="mt-auto p-4">
            <div
              className={cn(
                "relative bg-card/50 backdrop-blur-sm border rounded-lg shadow-sm cursor-pointer overflow-hidden transition-all duration-200 hover:bg-accent/50 hover:shadow-md",
                isCollapsed ? "w-[40px] p-0" : "w-full"
              )}
              onClick={() =>
                !isCollapsed && setShowProfileMenu(!showProfileMenu)
              }
            >
              <div
                className={cn(
                  "flex items-center transition-all duration-300",
                  isCollapsed ? "p-2 justify-center" : "p-3 gap-3"
                )}
              >
                <Avatar className="h-[24px] w-[24px] shrink-0">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>TQ</AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "flex-1 min-w-0 transition-all duration-300",
                    isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                  )}
                >
                  <p className="text-xs font-medium leading-none mb-0.5 truncate">
                    Professional plan
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    tommyqu03@gmail.com
                  </p>
                </div>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 text-muted-foreground shrink-0 transition-all duration-300",
                    isCollapsed ? "w-0 opacity-0" : "w-4 opacity-100"
                  )}
                />
              </div>
            </div>

            {/* Profile Menu Popup */}
            <AnimatePresence>
              {showProfileMenu && !isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-[68px] left-0 right-0 mx-4 bg-card border rounded-lg shadow-lg overflow-hidden z-50"
                >
                  {/* Header */}
                  <div className="p-4 border-b">
                    <p className="text-sm text-muted-foreground">
                      tommyqu03@gmail.com
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs">
                        TQ
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Personal</p>
                        <p className="text-xs text-muted-foreground">
                          Pro plan
                        </p>
                      </div>
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-1">
                    <button
                      className="w-full px-2 py-1.5 text-sm flex items-center gap-2 rounded hover:bg-accent/100 dark:hover:bg-slate-700/50"
                      onClick={handleSettingsClick}
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <button className="w-full px-2 py-1.5 text-sm flex items-center gap-2 rounded hover:bg-accent/100 dark:hover:bg-slate-700/50">
                      <Palette className="h-4 w-4" />
                      Appearance
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </button>
                    <button className="w-full px-2 py-1.5 text-sm flex items-center gap-2 rounded hover:bg-accent/100 dark:hover:bg-slate-700/50">
                      <Eye className="h-4 w-4" />
                      Feature Preview
                    </button>
                  </div>

                  <div className="border-t p-1">
                    <button className="w-full px-2 py-1.5 text-sm flex items-center gap-2 rounded hover:bg-accent/100 dark:hover:bg-slate-700/50">
                      <Info className="h-4 w-4" />
                      Learn more
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </button>
                    <button className="w-full px-2 py-1.5 text-sm flex items-center gap-2 rounded hover:bg-accent/100 dark:hover:bg-slate-700/50">
                      <HelpCircle className="h-4 w-4" />
                      Get help
                    </button>
                    <button className="w-full px-2 py-1.5 text-sm flex items-center gap-2 rounded hover:bg-accent/100 dark:hover:bg-slate-700/50">
                      <HelpCircle className="h-4 w-4" />
                      Help Center
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </button>
                    <button className="w-full px-2 py-1.5 text-sm flex items-center gap-2 rounded hover:bg-accent/100 dark:hover:bg-slate-700/50">
                      <Download className="h-4 w-4" />
                      Download Apps
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </button>
                  </div>

                  <div className="border-t p-1">
                    <button
                      onClick={handleLogout}
                      className="w-full px-2 py-1.5 text-sm flex items-center gap-2 rounded hover:bg-destructive/10 text-red-500"
                    >
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <AnimatePresence>
        <SettingsDialog
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
      </AnimatePresence>
    </>
  );
}
