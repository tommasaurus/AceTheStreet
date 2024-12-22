"use client";

import { useState, useEffect } from "react";
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
  BookOpen,
  Building2,
  GraduationCap,
  Lock,
  School,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsDialog } from "@/components/settings-dialog";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Profile {
  id: string;
  email: string;
  full_name: string;
  preferred_name: string;
}

export function StudySidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // Fetch subscription status
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", session.user.id)
          .eq("status", "active")
          .single();

        setHasSubscription(!!subscription);

        // Fetch profile data
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
        }
      }
    };

    fetchUserData();
  }, [supabase]);

  // Function to get initials from name
  const getInitials = () => {
    if (!profile) return "??";
    if (profile.preferred_name) {
      return profile.preferred_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (profile.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return profile.email.substring(0, 2).toUpperCase();
  };

  // Get display name
  const getDisplayName = () => {
    if (!profile) return "User";
    return (
      profile.preferred_name || profile.full_name || profile.email.split("@")[0]
    );
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    router.push("/");
  };

  const handleSettingsClick = () => {
    setShowProfileMenu(false);
    setShowSettings(true);
  };

  const handleSignOut = async () => {
    try {
      const supabase = createClientComponentClient();

      // Sign out from Supabase (this clears Supabase session)
      await supabase.auth.signOut();

      // Clear all cookies by setting them to expire
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      }

      // Redirect to home page
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navigationItems = [
    {
      name: "Practice Problems",
      href: "/study/problems",
      icon: BookOpen,
      requiresSubscription: true,
    },
    {
      name: "Banks",
      href: "/study/banks",
      icon: Building2,
      requiresSubscription: true,
    },
    {
      name: "M&I 400",
      href: "/study/m&i400",
      icon: GraduationCap,
      requiresSubscription: false,
    },
  ];

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
              {!isCollapsed && (
                <span className="font-semibold">AceTheStreet</span>
              )}
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
            {navigationItems.map((item) => {
              const isLocked = item.requiresSubscription && !hasSubscription;
              const ItemIcon = item.icon;

              return (
                <div key={item.href} className="relative">
                  {isLocked && (
                    <Link href="/pricing" className="absolute inset-0 z-10">
                      <div className="absolute inset-0 bg-background/60 backdrop-blur-[0.5px] rounded-lg flex items-center justify-center group">
                        <Lock className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  )}
                  <Link
                    href={isLocked ? "/pricing" : item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      pathname.startsWith(item.href)
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      isLocked && "opacity-75"
                    )}
                  >
                    <ItemIcon className="h-4 w-4" />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="mt-auto p-4">
            <div
              className={cn(
                "relative bg-card/50 backdrop-blur-sm border rounded-lg shadow-sm cursor-pointer overflow-hidden transition-all duration-200 hover:bg-accent/50 hover:shadow-md",
                isCollapsed ? "p-2" : "w-full"
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
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "flex-1 min-w-0 transition-all duration-300",
                    isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                  )}
                >
                  <p className="text-xs font-medium leading-none mb-0.5 truncate">
                    {hasSubscription ? "Professional plan" : "Free plan"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {profile?.email}
                  </p>
                </div>
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
                      {profile?.email}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs">
                        {getInitials()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">
                          {getDisplayName()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {hasSubscription ? "Pro plan" : "Free plan"}
                        </p>
                      </div>
                      {hasSubscription && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
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
                      onClick={handleSignOut}
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
          profile={profile}
          hasSubscription={hasSubscription}
        />
      </AnimatePresence>
    </>
  );
}
