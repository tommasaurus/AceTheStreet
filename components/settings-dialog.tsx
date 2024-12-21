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
import { toast } from "sonner";

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
  profile,
  hasSubscription,
}: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [preferredName, setPreferredName] = useState(
    profile?.preferred_name || profile?.full_name || ""
  );
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const nameChanged = fullName !== profile?.full_name;
    const preferredChanged = preferredName !== profile?.preferred_name;
    setHasChanges(nameChanged || preferredChanged);
  }, [fullName, preferredName, profile]);

  const handleSave = async () => {
    if (!profile?.id) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          preferred_name: preferredName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
    >
      <div className="fixed left-[50%] top-[50%] z-[100] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg duration-200 sm:rounded-lg">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-lg font-semibold">Settings</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
          </div>

          <div className="h-[400px] overflow-y-auto px-6 py-4">
            <TabsContent value="profile" className="mt-0 h-full">
              <div className="flex h-full flex-col items-center gap-6">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-3xl">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid w-full gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nickname">What should we call you?</Label>
                    <Input
                      id="nickname"
                      placeholder="Enter your preferred name"
                      value={preferredName}
                      onChange={(e) => setPreferredName(e.target.value)}
                    />
                  </div>

                  {/* Save Button */}
                  {hasChanges && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-4"
                    >
                      <Button
                        className="w-full"
                        onClick={handleSave}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="billing" className="mt-0 h-full">
              <div className="flex h-full flex-col gap-4">
                <div className="rounded-lg border bg-card p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">
                        {hasSubscription ? "Professional Plan" : "Free Plan"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {hasSubscription
                          ? "$20/month, billed monthly"
                          : "Limited access"}
                      </p>
                    </div>
                    {hasSubscription && (
                      <span className="text-xs bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-medium">
                        Current Plan
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    {hasSubscription ? (
                      <>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            Unlimited access to all features
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Priority support</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Advanced analytics</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            Access to M&I 400 questions
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Basic features</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  {hasSubscription ? (
                    <>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleManagePayment}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Manage billing
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-destructive hover:text-destructive hover:bg-destructive/20 dark:hover:bg-destructive/20"
                        onClick={handleManagePayment}
                      >
                        Cancel subscription
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => (window.location.href = "/pricing")}
                    >
                      Upgrade to Pro
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
