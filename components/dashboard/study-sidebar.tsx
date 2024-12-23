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
import Image from "next/image";
import { useTheme } from "next-themes";
import { createPortal } from "react-dom";

interface Profile {
  id: string;
  email: string;
  full_name: string;
  preferred_name: string;
}

export function StudySidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState("free");
  const [profile, setProfile] = useState<Profile | null>(null);
  const supabase = createClientComponentClient();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle initial theme mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the actual theme
  const currentTheme = !mounted
    ? "dark"
    : theme === "system"
    ? systemTheme
    : theme;

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // Fetch subscription status - check for active status and not expired
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", session.user.id)
          .eq("status", "active")
          .single();

        // Only set hasSubscription to true if subscription is active and not expired
        const isActive =
          !!subscription &&
          subscription.current_period_end > new Date().toISOString();

        setHasSubscription(isActive);

        // Set subscription status
        if (isActive && subscription.plan_type) {
          setSubscriptionStatus(subscription.plan_type);
        } else {
          setSubscriptionStatus("free");
        }

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

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      {isMobile && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-6 left-6 z-50 p-2 rounded-lg bg-white dark:bg-[#151e2a] shadow-lg border border-[#ECECEC] dark:border-[#1c2936]"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed left-0 top-0 h-screen bg-white dark:bg-[#151e2a] transition-all duration-150 border-r border-[#ECECEC] dark:border-[#1c2936] z-50",
          !isMobile && (isCollapsed ? "w-20" : "w-64"),
          isMobile && "w-64",
          // Mobile styles
          isMobile && !isMobileMenuOpen && "-translate-x-full",
          isMobile && "shadow-xl"
        )}
      >
        <div className="flex h-full flex-col">
          <div
            className={cn(
              "flex h-[80px] items-center justify-between",
              !isMobile && (isCollapsed ? "px-5" : "px-6"),
              isMobile && "px-6"
            )}
          >
            <div className="flex-1 min-w-0">
              {(!isCollapsed || isMobile) && (
                <div className="h-8 relative">
                  <Image
                    src={
                      currentTheme === "dark"
                        ? "/images/logoLight.png"
                        : "/images/logoDark.png"
                    }
                    alt="Logo"
                    width={150}
                    height={32}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            {/* Only show collapse button on desktop */}
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-10 w-10 shrink-0 hover:bg-[#ECECEC] dark:hover:bg-[#1c2936]"
              >
                {isCollapsed ? (
                  <Menu className="h-6 w-6" />
                ) : (
                  <ChevronLeft className="h-6 w-6" />
                )}
              </Button>
            )}
            {/* Show close button on mobile */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="h-10 w-10 shrink-0 hover:bg-[#ECECEC] dark:hover:bg-[#1c2936]"
              >
                <X className="h-6 w-6" />
              </Button>
            )}
          </div>

          <nav className="flex-1 space-y-3 px-4 mt-4">
            {navigationItems.map((item) => {
              const isLocked = item.requiresSubscription && !hasSubscription;
              const ItemIcon = item.icon;

              return (
                <div key={item.href} className="relative">
                  {isLocked && (
                    <Link href="/pricing" className="absolute inset-0 z-10">
                      <div className="absolute inset-0 bg-[#ECECEC]/5 dark:bg-[#1c2936]/5 backdrop-blur-[0.5px] rounded-lg flex items-center justify-center group">
                        <Lock className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  )}
                  <Link
                    href={isLocked ? "/pricing" : item.href}
                    className={cn(
                      "flex items-center gap-4 rounded-lg px-4 py-3 text-base transition-colors whitespace-nowrap relative",
                      pathname.startsWith(item.href)
                        ? "bg-[#ECECEC] dark:bg-[#1c2936] text-black dark:text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-[#ECECEC] dark:hover:bg-[#1c2936]",
                      isLocked && "opacity-75",
                      !isMobile && isCollapsed && "justify-center px-3 group"
                    )}
                  >
                    <ItemIcon
                      className={cn(
                        "shrink-0",
                        !isMobile && isCollapsed ? "h-6 w-6" : "h-5 w-5"
                      )}
                    />
                    {(!isCollapsed || isMobile) && (
                      <span className="truncate">{item.name}</span>
                    )}
                    {!isMobile && isCollapsed && (
                      <div className="absolute left-full ml-2 hidden group-hover:block">
                        <div
                          className={cn(
                            "rounded-md px-2 py-1 text-sm whitespace-nowrap",
                            currentTheme === "dark"
                              ? "bg-[#1c2936] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
                              : "bg-[#ECECEC] text-black shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"
                          )}
                        >
                          {item.name}
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="px-2 pb-2 mt-auto relative">
            {mounted && (
              <div
                className={cn(
                  "relative cursor-pointer overflow-hidden transition-all duration-200 rounded-xl p-3",
                  !isCollapsed && "hover:bg-[#ECECEC] dark:hover:bg-[#1c2936]",
                  isCollapsed && "group"
                )}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div
                  className={cn(
                    "flex items-center",
                    isCollapsed ? "justify-center" : "gap-3"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-full flex items-center justify-center",
                      "h-[38px] w-[38px] min-w-[38px]",
                      "bg-gradient-to-br from-[#4776E6] to-[#8E54E9]"
                    )}
                  >
                    <span className="text-sm font-medium text-white">
                      {getInitials()}
                    </span>
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none mb-1 truncate text-black dark:text-white">
                        {hasSubscription
                          ? `${
                              subscriptionStatus.charAt(0).toUpperCase() +
                              subscriptionStatus.slice(1)
                            } plan`
                          : "Free plan"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {profile?.email}
                      </p>
                    </div>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 hidden group-hover:block">
                      <div
                        className={cn(
                          "rounded-md px-2 py-1 text-sm whitespace-nowrap",
                          currentTheme === "dark"
                            ? "bg-[#1c2936] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
                            : "bg-[#ECECEC] text-black shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"
                        )}
                      >
                        {hasSubscription
                          ? `${
                              subscriptionStatus.charAt(0).toUpperCase() +
                              subscriptionStatus.slice(1)
                            } plan`
                          : "Free plan"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Profile Menu Popup Portal */}
            {typeof window !== "undefined" &&
              mounted &&
              showProfileMenu &&
              createPortal(
                <div className="fixed inset-0 z-[999999] pointer-events-none">
                  <div
                    className="absolute inset-0 pointer-events-auto"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={cn(
                        "absolute rounded-2xl shadow-xl overflow-hidden w-[280px] pointer-events-auto",
                        "left-[16px]",
                        "bottom-[80px]",
                        currentTheme === "dark" ? "bg-[#1c2936]" : "bg-white"
                      )}
                      style={{
                        boxShadow:
                          "0 0 0 1px rgba(255, 255, 255, 0.1), 0 8px 16px rgba(0, 0, 0, 0.4)",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex flex-col">
                        <div className="px-4 py-2.5 text-base text-gray-600 dark:text-white/70">
                          {profile?.email}
                        </div>
                        <div className="px-4 pb-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "h-[30px] w-[30px] rounded-full flex items-center justify-center font-medium",
                                "bg-gradient-to-br from-[#4776E6] to-[#8E54E9]"
                              )}
                            >
                              <span className="text-sm font-medium text-white">
                                {getInitials()}
                              </span>
                            </div>
                            <div>
                              <div
                                className={cn(
                                  "text-base font-medium",
                                  currentTheme === "dark"
                                    ? "text-white"
                                    : "text-black"
                                )}
                              >
                                {getDisplayName()}
                              </div>
                              <div
                                className={cn(
                                  "text-sm",
                                  currentTheme === "dark"
                                    ? "text-white/70"
                                    : "text-gray-600"
                                )}
                              >
                                {hasSubscription
                                  ? `${
                                      subscriptionStatus
                                        .charAt(0)
                                        .toUpperCase() +
                                      subscriptionStatus.slice(1)
                                    } plan`
                                  : "Free plan"}
                              </div>
                            </div>
                          </div>
                          <Check className="h-5 w-5 text-green-400" />
                        </div>

                        <div
                          className={cn(
                            "h-[1px] my-1",
                            currentTheme === "dark"
                              ? "bg-white/[0.08]"
                              : "bg-gray-200"
                          )}
                        />

                        <div className="px-4 py-2.5">
                          <div className="text-sm text-gray-600 dark:text-white/70 mb-2">
                            Theme
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setTheme("system");
                              }}
                              className={cn(
                                "flex-1 px-3 py-1.5 text-sm rounded-md transition-colors",
                                theme === "system"
                                  ? currentTheme === "dark"
                                    ? "bg-[#151e2a] text-white"
                                    : "bg-white text-black"
                                  : currentTheme === "dark"
                                  ? "text-white/70"
                                  : "text-black/70"
                              )}
                            >
                              System
                            </button>
                            <button
                              onClick={() => {
                                setTheme("light");
                              }}
                              className={cn(
                                "flex-1 px-3 py-1.5 text-sm rounded-md transition-colors",
                                theme === "light"
                                  ? currentTheme === "dark"
                                    ? "bg-[#151e2a] text-white"
                                    : "bg-[#ECECEC] text-black"
                                  : currentTheme === "dark"
                                  ? "text-white/70"
                                  : "text-black/70"
                              )}
                            >
                              Light
                            </button>
                            <button
                              onClick={() => {
                                setTheme("dark");
                              }}
                              className={cn(
                                "flex-1 px-3 py-1.5 text-sm rounded-md transition-colors",
                                theme === "dark"
                                  ? currentTheme === "dark"
                                    ? "bg-[#151e2a] text-white"
                                    : "bg-white text-black"
                                  : currentTheme === "dark"
                                  ? "text-white/70"
                                  : "text-black/70"
                              )}
                            >
                              Dark
                            </button>
                          </div>
                        </div>

                        <div
                          className={cn(
                            "h-[1px] my-1",
                            currentTheme === "dark"
                              ? "bg-white/[0.08]"
                              : "bg-gray-200"
                          )}
                        />

                        <button
                          className={cn(
                            "w-full px-4 py-2.5 text-base flex items-center gap-3",
                            currentTheme === "dark"
                              ? "text-white hover:bg-white/[0.06]"
                              : "text-black hover:bg-black/[0.06]"
                          )}
                          onClick={handleSettingsClick}
                        >
                          <Settings className="h-[18px] w-[18px]" />
                          Settings
                        </button>

                        <div
                          className={cn(
                            "h-[1px] my-1",
                            currentTheme === "dark"
                              ? "bg-white/[0.08]"
                              : "bg-gray-200"
                          )}
                        />

                        <button
                          onClick={handleSignOut}
                          className={cn(
                            "w-full px-4 py-2.5 text-base flex items-center gap-3 text-red-400",
                            currentTheme === "dark"
                              ? "hover:bg-white/[0.06]"
                              : "hover:bg-black/[0.06]"
                          )}
                        >
                          <LogOut className="h-[18px] w-[18px] text-red-400" />
                          Log out
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>,
                document.body
              )}
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
