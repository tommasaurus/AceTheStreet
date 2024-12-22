"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, Camera, CreditCard, ArrowLeft, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Profile {
  id: string;
  email: string;
  full_name: string;
  preferred_name: string;
}

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
  hasSubscription: boolean;
}

export function SettingsDialog({
  isOpen,
  onClose,
  profile: initialProfile,
  hasSubscription,
}: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [fullName, setFullName] = useState(initialProfile?.full_name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("free");
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user?.id) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profileData) {
            setFullName(profileData.full_name || "");
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (!initialProfile?.full_name) {
      fetchProfile();
    }
  }, [supabase, initialProfile]);

  // Get the actual theme
  const currentTheme = !mounted
    ? "dark"
    : theme === "system"
    ? systemTheme
    : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkSubscription = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", session.user.id)
          .eq("status", "active")
          .single();

        // Set subscription status based on active subscription and expiration
        if (
          subscription &&
          subscription.current_period_end > new Date().toISOString()
        ) {
          setSubscriptionStatus(subscription.plan_type);
        } else {
          setSubscriptionStatus("free");
        }
      }
    };

    checkSubscription();
  }, [supabase]);

  useEffect(() => {
    const nameChanged = fullName !== initialProfile?.full_name;
    setHasChanges(nameChanged);
  }, [fullName, initialProfile]);

  const handleSave = async () => {
    if (!initialProfile?.id) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", initialProfile.id);

      if (error) throw error;
      toast.success("Profile updated successfully");
      setHasChanges(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleManagePayment = async () => {
    try {
      const response = await fetch("/api/create-portal-session", {
        method: "POST",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create portal session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error: any) {
      console.error("Error creating portal session:", error);
      toast.error(error.message || "Failed to open billing portal");
    }
  };

  if (!isOpen) return null;

  const getInitials = () => {
    if (!initialProfile) return "??";
    if (initialProfile.full_name) {
      return initialProfile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return initialProfile.email.substring(0, 2).toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className='fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm'
    >
      <div
        className={cn(
          "fixed left-[50%] top-[50%] z-[100] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border shadow-lg duration-200 sm:rounded-lg",
          currentTheme === "dark" ? "bg-[#151e2a]" : "bg-white"
        )}
      >
        <div className='flex items-center justify-between border-b p-6'>
          <h2
            className={cn(
              "text-lg font-semibold",
              currentTheme === "dark" ? "text-white" : "text-black"
            )}
          >
            Settings
          </h2>
          <Button
            variant='ghost'
            size='icon'
            onClick={onClose}
            className={cn(
              "h-8 w-8",
              currentTheme === "dark"
                ? "hover:bg-[#1c2936] text-white"
                : "hover:bg-[#ECECEC] text-black"
            )}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <div className='px-6 pt-4'>
            <TabsList
              className={cn(
                "grid w-full grid-cols-2 p-0.5 rounded-lg",
                currentTheme === "dark" ? "bg-[#1c2936]" : "bg-[#ECECEC]"
              )}
            >
              <TabsTrigger
                value='profile'
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                  currentTheme === "dark"
                    ? "text-white/70 hover:text-white data-[state=active]:bg-[#151e2a] data-[state=active]:text-white"
                    : "text-black/70 hover:text-black data-[state=active]:bg-white data-[state=active]:text-black"
                )}
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value='billing'
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                  currentTheme === "dark"
                    ? "text-white/70 hover:text-white data-[state=active]:bg-[#151e2a] data-[state=active]:text-white"
                    : "text-black/70 hover:text-black data-[state=active]:bg-white data-[state=active]:text-black"
                )}
              >
                Billing
              </TabsTrigger>
            </TabsList>
          </div>

          <div className='h-[350px] overflow-y-auto px-6 py-4'>
            <TabsContent value='profile' className='mt-0 h-full'>
              <div className='flex h-full flex-col gap-6'>
                <div className='grid w-full gap-4'>
                  <div className='space-y-2'>
                    <Label
                      htmlFor='fullName'
                      className={
                        currentTheme === "dark" ? "text-white" : "text-black"
                      }
                    >
                      Name
                    </Label>
                    <Input
                      id='fullName'
                      placeholder='Enter your name'
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={cn(
                        currentTheme === "dark"
                          ? "bg-[#1c2936] text-white border-white/10 focus:border-white/20"
                          : "bg-white text-black"
                      )}
                    />
                  </div>

                  <Button
                    className={cn(
                      "w-full",
                      currentTheme === "dark"
                        ? "bg-white text-black hover:bg-white"
                        : "bg-black text-white hover:bg-black"
                    )}
                    onClick={handleSave}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value='billing' className='mt-0 h-full'>
              <div className='flex h-full flex-col gap-4'>
                <div
                  className={cn(
                    "rounded-lg p-4 space-y-4",
                    currentTheme === "dark"
                      ? "border-white/10"
                      : "border-gray-200"
                  )}
                >
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3
                        className={cn(
                          "font-medium",
                          currentTheme === "dark" ? "text-white" : "text-black"
                        )}
                      >
                        {hasSubscription
                          ? `${
                              subscriptionStatus.charAt(0).toUpperCase() +
                              subscriptionStatus.slice(1)
                            } Plan`
                          : "Free Plan"}
                      </h3>
                      <p
                        className={cn(
                          "text-sm",
                          currentTheme === "dark"
                            ? "text-white/70"
                            : "text-gray-600"
                        )}
                      >
                        {hasSubscription
                          ? subscriptionStatus === "pro"
                            ? "$13.33/month, billed quarterly"
                            : subscriptionStatus === "max"
                            ? "$6.67/month, billed annually"
                            : "$20/month, billed monthly"
                          : "Limited access"}
                      </p>
                    </div>
                    {hasSubscription && (
                      <span
                        className={cn(
                          "text-xs px-2.5 py-0.5 rounded-full font-medium",
                          currentTheme === "dark"
                            ? "bg-white/10 text-white"
                            : "bg-black/10 text-black"
                        )}
                      >
                        Current Plan
                      </span>
                    )}
                  </div>

                  <div className='space-y-2'>
                    {hasSubscription ? (
                      <>
                        <div className='flex items-center gap-2'>
                          <Check className='h-4 w-4 text-green-500' />
                          <span
                            className={
                              currentTheme === "dark"
                                ? "text-white/70"
                                : "text-gray-600"
                            }
                          >
                            M&I questions
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Check className='h-4 w-4 text-green-500' />
                          <span
                            className={
                              currentTheme === "dark"
                                ? "text-white/70"
                                : "text-gray-600"
                            }
                          >
                            Bank specific questions
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Check className='h-4 w-4 text-green-500' />
                          <span
                            className={
                              currentTheme === "dark"
                                ? "text-white/70"
                                : "text-gray-600"
                            }
                          >
                            Test modes
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Check className='h-4 w-4 text-green-500' />
                          <span
                            className={
                              currentTheme === "dark"
                                ? "text-white/70"
                                : "text-gray-600"
                            }
                          >
                            Email support
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className='flex items-center gap-2'>
                          <Check className='h-4 w-4 text-green-500' />
                          <span
                            className={
                              currentTheme === "dark"
                                ? "text-white/70"
                                : "text-gray-600"
                            }
                          >
                            M&I questions
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <X className='h-4 w-4 text-red-500' />
                          <span
                            className={
                              currentTheme === "dark"
                                ? "text-white/70"
                                : "text-gray-600"
                            }
                          >
                            Bank specific questions
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <X className='h-4 w-4 text-red-500' />
                          <span
                            className={
                              currentTheme === "dark"
                                ? "text-white/70"
                                : "text-gray-600"
                            }
                          >
                            Test modes
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {hasSubscription ? (
                    <Button
                      className={cn(
                        "w-full transition-none border border-transparent",
                        currentTheme === "dark"
                          ? "bg-white text-black hover:bg-white hover:text-black hover:border-transparent"
                          : "bg-black text-white hover:bg-black hover:text-white hover:border-transparent"
                      )}
                      onClick={handleManagePayment}
                    >
                      <CreditCard className='h-4 w-4 mr-2' />
                      Manage billing
                    </Button>
                  ) : (
                    <Button
                      className={cn(
                        "w-full",
                        currentTheme === "dark"
                          ? "bg-white text-black hover:bg-white"
                          : "bg-black text-white hover:bg-black"
                      )}
                      onClick={() => (window.location.href = "/pricing")}
                    >
                      Upgrade plan
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
}
