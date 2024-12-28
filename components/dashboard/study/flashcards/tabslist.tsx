import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LightbulbIcon, GraduationCap, Zap } from "lucide-react";

const CustomTab = ({
  value,
  activeTab,
  icon: Icon,
  title,
  subtitle,
  onClick,
}: {
  value: string;
  activeTab: string;
  icon: any;
  title: string;
  subtitle: string;
  onClick: (value: string) => void;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getGradientClass = (isActive: boolean) => {
    if (!isActive) return "text-muted-foreground/70";
    if (value === "match")
      return isActive
        ? "text-orange-500 dark:text-orange-400"
        : "text-muted-foreground/70";
    if (value === "test")
      return isActive
        ? "text-green-500 dark:text-green-400"
        : "text-muted-foreground/70";
    return isActive
      ? "text-blue-500 dark:text-blue-400"
      : "text-muted-foreground/70";
  };

  const getIconColor = (isActive: boolean) => {
    if (!isActive) return "text-muted-foreground/70";
    if (value === "match")
      return isActive
        ? "text-orange-500 dark:text-orange-400"
        : "text-muted-foreground/70";
    if (value === "test")
      return isActive
        ? "text-green-500 dark:text-green-400"
        : "text-muted-foreground/70";
    return isActive
      ? "text-blue-500 dark:text-blue-400"
      : "text-muted-foreground/70";
  };

  if (isMobile) {
    return (
      <Button
        variant="ghost"
        onClick={() => onClick(value)}
        className={cn(
          "flex flex-col items-center justify-center py-2 px-3 h-auto min-w-[90px]",
          "bg-gray-200/80 dark:bg-[#1c2936] rounded-xl transition-all",
          "hover:bg-gray-200/80 dark:hover:bg-[#243442]",
          activeTab === value && value === "match" && "dark:bg-orange-500/10",
          activeTab === value && "dark:bg-[#243442]",
          activeTab === value && "scale-105"
        )}
      >
        <Icon
          className={cn(
            "w-5 h-5 mb-1 transition-colors",
            getIconColor(activeTab === value)
          )}
        />
        <span
          className={cn(
            "text-xs font-medium transition-colors",
            getGradientClass(activeTab === value)
          )}
        >
          {title}
        </span>
      </Button>
    );
  }

  // Desktop version remains unchanged
  return (
    <Button
      variant="ghost"
      onClick={() => onClick(value)}
      className={cn(
        "flex items-center gap-3 py-4 px-6 h-auto w-[180px]",
        "bg-gray-200/80 dark:bg-[#1c2936] rounded-xl transition-colors",
        "hover:bg-gray-200/80 dark:hover:bg-[#243442]",
        activeTab === value && value === "match" && "dark:bg-orange-500/10",
        activeTab === value && "dark:bg-[#243442]"
      )}
    >
      <Icon
        className={cn(
          "w-5 h-5 transition-colors",
          getIconColor(activeTab === value)
        )}
      />
      <div className="flex flex-col items-start">
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            getGradientClass(activeTab === value)
          )}
        >
          {title}
        </span>
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </div>
    </Button>
  );
};

export default function TabsList({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-center w-full gap-3">
      <CustomTab
        value="flashcards"
        activeTab={activeTab}
        icon={LightbulbIcon}
        title="Flashcards"
        subtitle="Practice Mode"
        onClick={onTabChange}
      />
      <CustomTab
        value="test"
        activeTab={activeTab}
        icon={GraduationCap}
        title="Test"
        subtitle="Exam Mode"
        onClick={onTabChange}
      />
      <CustomTab
        value="match"
        activeTab={activeTab}
        icon={Zap}
        title="Match"
        subtitle="Speed Mode"
        onClick={onTabChange}
      />
    </div>
  );
}
