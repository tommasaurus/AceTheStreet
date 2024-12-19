"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Camera, CreditCard, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormattedInput } from "@/components/ui/formatted-input";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPayment, setShowPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  if (!isOpen) return null;

  const handleUpdateBilling = () => {
    setShowPayment(true);
    setActiveTab("payment");
  };

  const handleBackToBilling = () => {
    setShowPayment(false);
    setActiveTab("billing");
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="payment" disabled={!showPayment}>
                Payment
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="h-[400px] overflow-y-auto px-6 py-4">
            <TabsContent value="profile" className="mt-0 h-full">
              <div className="flex h-full flex-col items-center gap-6">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-3xl">TQ</AvatarFallback>
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
                      defaultValue="Tommy Q"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nickname">What should we call you?</Label>
                    <Input
                      id="nickname"
                      placeholder="Enter your preferred name"
                      defaultValue="Tommy"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="billing" className="mt-0 h-full">
              <div className="flex h-full flex-col gap-4">
                <div className="rounded-lg border bg-card p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Professional Plan</h3>
                      <p className="text-sm text-muted-foreground">
                        $20/month, billed monthly
                      </p>
                    </div>
                    <span className="text-xs bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-medium">
                      Current Plan
                    </span>
                  </div>
                  <div className="space-y-2">
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
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleUpdateBilling}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Update billing info
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/20 dark:hover:bg-destructive/20"
                  >
                    Cancel subscription
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="mt-0 h-full">
              <div className="flex h-full flex-col gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={handleBackToBilling}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to billing
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Card information</Label>
                    <div className="rounded-md border">
                      <FormattedInput
                        format="card"
                        className="border-0 border-b rounded-none"
                        placeholder="Card number"
                        value={cardNumber}
                        onChange={setCardNumber}
                      />
                      <div className="flex">
                        <FormattedInput
                          format="expiry"
                          className="border-0 border-r rounded-none"
                          placeholder="MM / YY"
                          value={expiry}
                          onChange={setExpiry}
                        />
                        <Input
                          className="border-0 rounded-none w-[100px]"
                          placeholder="CVC"
                          maxLength={4}
                          value={cvc}
                          onChange={(e) =>
                            setCvc(
                              e.target.value.replace(/\D/g, "").slice(0, 4)
                            )
                          }
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Name on card</Label>
                    <Input placeholder="Name as shown on card" />
                  </div>

                  <div className="space-y-2">
                    <Label>Billing address</Label>
                    <Input placeholder="Street address" />
                    <div className="grid grid-cols-3 gap-2">
                      <Input placeholder="City" className="col-span-2" />
                      <Input placeholder="State" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="ZIP code" />
                      <Input placeholder="Country" />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Update payment method
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
}
