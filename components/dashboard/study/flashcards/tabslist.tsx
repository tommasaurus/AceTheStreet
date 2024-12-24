import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TabsList as RadixTabsList, TabsTrigger } from "@/components/ui/tabs";
import { LightbulbIcon, GraduationCap, Zap } from "lucide-react";
import { useTheme } from "next-themes";

const TabIcon = ({
  icon: Icon,
  isActive,
  color,
}: {
  icon: any;
  isActive: boolean;
  color: string;
}) => (
  <motion.div
    className={cn(
      "relative w-10 h-10 rounded-xl flex items-center justify-center",
      "transition-all duration-500"
    )}
    animate={{
      backgroundColor: isActive ? `rgb(${color} / 0.15)` : "transparent",
    }}
  >
    <motion.div
      className="absolute inset-0 rounded-xl"
      animate={{
        boxShadow: isActive ? `0 0 25px 5px rgb(${color} / 0.15)` : "none",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
    <Icon
      className={cn(
        "w-5 h-5 transition-all duration-300",
        isActive ? `text-[rgb(${color})]` : "text-muted-foreground/70"
      )}
    />
    {isActive && (
      <motion.div
        layoutId="activeTab"
        className="absolute inset-0 rounded-xl"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      >
        <div className="absolute inset-0 rounded-xl border-2 border-[rgb(${color})] opacity-40" />
      </motion.div>
    )}
  </motion.div>
);

const CustomTabsTrigger = ({
  value,
  activeTab,
  icon,
  title,
  subtitle,
  color,
}: {
  value: string;
  activeTab: string;
  icon: any;
  title: string;
  subtitle: string;
  color: string;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <TabsTrigger
      value={value}
      className={cn(
        "relative flex-1 flex items-center gap-3 py-3 px-4",
        "rounded-xl transition-all duration-500",
        "group overflow-hidden",
        "data-[state=active]:bg-transparent"
      )}
    >
      <TabIcon icon={icon} isActive={activeTab === value} color={color} />
      <div className="flex flex-col items-start relative">
        <motion.span
          className="text-lg font-medium tracking-tight transition-all duration-300 font-cal"
          animate={{
            color: activeTab === value ? `rgb(${color})` : "",
            scale: activeTab === value ? 1.05 : 1,
          }}
        >
          {title}
        </motion.span>
        <motion.span
          className="text-[11px] font-medium transition-all duration-300 font-cal"
          animate={{
            opacity: activeTab === value ? 1 : 0.5,
            color:
              activeTab === value
                ? isDark
                  ? "rgb(255, 255, 255)"
                  : `rgb(${color})`
                : "rgb(156, 163, 175)",
          }}
        >
          {subtitle}
        </motion.span>

        {/* Active tab indicator */}
        {activeTab === value && (
          <motion.div
            layoutId={`${value}-indicator`}
            className="absolute -bottom-2 left-0 right-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className={`h-[2px] w-full bg-gradient-to-r from-[rgb(${color})]/0 via-[rgb(${color})] to-[rgb(${color})]/0`}
            />
            <div
              className={`h-[2px] w-full bg-gradient-to-r from-[rgb(${color})]/0 via-[rgb(${color})] to-[rgb(${color})]/0 blur-sm`}
            />
          </motion.div>
        )}
      </div>

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, rgba(${color}, 0.03) 0%, transparent 70%)`,
        }}
      />
    </TabsTrigger>
  );
};

export default function TabsList({ activeTab }: { activeTab: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative px-6 mb-10">
      <div className="absolute inset-0 -top-20 -bottom-20 opacity-60">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-orange-500/5 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-orange-500/5 blur-2xl animate-pulse" />
      </div>
      <RadixTabsList className="relative flex w-full max-w-2xl mx-auto p-1.5 gap-2 bg-transparent backdrop-blur-2xl rounded-2xl">
        <CustomTabsTrigger
          value="flashcards"
          activeTab={activeTab}
          icon={LightbulbIcon}
          title="Flashcards"
          subtitle="Practice Mode"
          color="59, 130, 246"
        />
        <CustomTabsTrigger
          value="test"
          activeTab={activeTab}
          icon={GraduationCap}
          title="Test"
          subtitle="Exam Mode"
          color="34, 197, 94"
        />
        <CustomTabsTrigger
          value="match"
          activeTab={activeTab}
          icon={Zap}
          title="Match"
          subtitle="Speed Mode"
          color="249, 115, 22"
        />
      </RadixTabsList>
    </div>
  );
}
