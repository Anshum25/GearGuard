import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: "up" | "down" | null;
  trendValue?: number;
  description?: string;
  bgColor?: string;
  iconColor?: string;
}

export function KPICard({
  label,
  value,
  icon: Icon,
  trend,
  trendValue,
  description,
  bgColor = "bg-blue-50",
  iconColor = "text-blue-600",
}: KPICardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <div className={cn("p-6", bgColor)}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
            {(description || trend) && (
              <div className="mt-2 flex items-center gap-2">
                {trend && trendValue !== undefined && (
                  <div
                    className={cn(
                      "flex items-center gap-1 text-xs font-semibold",
                      trend === "up" ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {trendValue}%
                  </div>
                )}
                {description && (
                  <p className="text-xs text-muted-foreground">{description}</p>
                )}
              </div>
            )}
          </div>
          <div className={cn("rounded-lg p-3", bgColor)}>
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
        </div>
      </div>
    </Card>
  );
}
