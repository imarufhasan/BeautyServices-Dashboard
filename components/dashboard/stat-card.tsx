import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sparkline, TrendPoint } from "@/components/dashboard/sparkline";

export type { TrendPoint };

// Server Component — receives the icon component reference directly (fine,
// since this never crosses a server/client boundary itself) and renders it,
// then hands off only plain serializable data (sparkline array + color
// string) to the Sparkline Client Component.
export function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  value,
  label,
  change,
  trend,
  sparklineColor,
  sparkline,
}: {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
  change: string;
  trend: "up" | "down";
  sparklineColor: string;
  sparkline: TrendPoint[];
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center  justify-between">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={16} style={{ color: iconColor }} />
        </div>
        <span
          className={cn(
            "flex items-center gap-0.5 text-[11px] font-bold",
            trend === "up" ? "text-success" : "text-destructive",
          )}
        >
          {trend === "up" ? (
            <TrendingUp size={12} />
          ) : (
            <TrendingDown size={12} />
          )}
          {change}
        </span>
      </div>

      <div className="flex items-end justify-between mt-3 gap-2">
        <div className="min-w-0 flex-1 ">
          <p className="text-xl font-extrabold text-ink">{value}</p>
          <p className="text-xs text-subtle mt-0.5 truncate">{label}</p>
        </div>

        <div className="flex-1 justify-center items-center">
          <Sparkline data={sparkline} color={sparklineColor} />
        </div>
      </div>
    </Card>
  );
}
