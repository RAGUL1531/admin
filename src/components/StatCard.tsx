import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  variant?: "default" | "primary" | "accent" | "warning";
  className?: string;
}

const variantStyles = {
  default: "bg-card",
  primary: "gradient-primary text-primary-foreground",
  accent: "gradient-accent text-accent-foreground",
  warning: "bg-warning/10 border-warning/20",
};

const iconStyles = {
  default: "bg-primary/10 text-primary",
  primary: "bg-primary-foreground/20 text-primary-foreground",
  accent: "bg-accent-foreground/20 text-accent-foreground",
  warning: "bg-warning/20 text-warning",
};

export function StatCard({ title, value, icon: Icon, trend, variant = "default", className }: StatCardProps) {
  return (
    <div className={cn(
      "rounded-xl border p-5 shadow-card transition-all duration-200 hover:shadow-card-hover animate-fade-in",
      variantStyles[variant],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={cn("text-sm font-medium", variant === "default" ? "text-muted-foreground" : "opacity-80")}>
            {title}
          </p>
          <p className="text-3xl font-bold font-heading">{value}</p>
          {trend && (
            <p className={cn("text-xs font-medium flex items-center gap-1", variant === "default" ? "text-success" : "opacity-90")}>
              <span>↑ {trend.value}%</span>
              <span className="opacity-70">{trend.label}</span>
            </p>
          )}
        </div>
        <div className={cn("rounded-lg p-2.5", iconStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
