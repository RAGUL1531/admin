import { cn } from "@/lib/utils";

type BadgeVariant = "scheduled" | "in-progress" | "completed" | "cancelled" | "active" | "inactive" | "available" | "busy" | "offline" | "pending" | "high" | "medium" | "low";

const variantStyles: Record<BadgeVariant, string> = {
  "scheduled": "bg-info/10 text-info border-info/20",
  "in-progress": "bg-warning/10 text-warning border-warning/20",
  "completed": "bg-success/10 text-success border-success/20",
  "cancelled": "bg-destructive/10 text-destructive border-destructive/20",
  "active": "bg-success/10 text-success border-success/20",
  "inactive": "bg-muted text-muted-foreground border-border",
  "available": "bg-success/10 text-success border-success/20",
  "busy": "bg-warning/10 text-warning border-warning/20",
  "offline": "bg-muted text-muted-foreground border-border",
  "pending": "bg-info/10 text-info border-info/20",
  "high": "bg-destructive/10 text-destructive border-destructive/20",
  "medium": "bg-warning/10 text-warning border-warning/20",
  "low": "bg-success/10 text-success border-success/20",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const key = status.toLowerCase().replace(" ", "-") as BadgeVariant;
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
      variantStyles[key] || variantStyles["inactive"],
      className
    )}>
      <span className={cn(
        "h-1.5 w-1.5 rounded-full",
        key === "available" || key === "active" || key === "completed" ? "bg-success animate-pulse-soft" :
        key === "in-progress" || key === "busy" || key === "pending" ? "bg-warning animate-pulse-soft" :
        key === "high" ? "bg-destructive animate-pulse-soft" :
        "bg-muted-foreground"
      )} />
      {status}
    </span>
  );
}
