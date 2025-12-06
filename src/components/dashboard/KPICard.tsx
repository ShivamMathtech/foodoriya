import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

export function KPICard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "bg-primary/10 text-primary",
  className,
}: KPICardProps) {
  return (
    <div className={cn(
      "rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in",
      className
    )}>
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">{value}</p>
          {change && (
            <p
              className={cn(
                "flex items-center gap-1 text-xs sm:text-sm font-medium truncate",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {changeType === "positive" && "↑"}
              {changeType === "negative" && "↓"}
              <span className="truncate">{change}</span>
            </p>
          )}
        </div>
        <div className={cn("rounded-lg p-2 sm:p-3 shrink-0", iconColor)}>
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
        </div>
      </div>
    </div>
  );
}
