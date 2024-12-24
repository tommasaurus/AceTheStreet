import React from "react";
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
  const getGradientClass = (isActive: boolean) => {
    if (!isActive) return "text-muted-foreground/70";
    if (value === "match") {
      return isActive
        ? "text-orange-500 dark:text-orange-400"
        : "text-muted-foreground/70";
    }
    return "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text";
  };

  const getIconColor = (isActive: boolean) => {
    if (!isActive) return "text-muted-foreground/70";
    if (value === "match") {
      return isActive
        ? "text-orange-500 dark:text-orange-400"
        : "text-muted-foreground/70";
    }
    return "text-blue-500";
  };

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
