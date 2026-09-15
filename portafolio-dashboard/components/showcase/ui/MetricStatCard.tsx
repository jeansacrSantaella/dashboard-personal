// components/showcase/ui/MetricStatCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, Minus, TrendingDown, TrendingUp } from "lucide-react";

export interface MetricStatCardProps {
  label: string;
  value: string | number;
  change?: number;
  period?: string;
  icon: LucideIcon;
}

export function MetricStatCard({
  label,
  value,
  change,
  period = "vs. mes anterior",
  icon: Icon,
}: MetricStatCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <Card className="w-full max-w-xs border border-border shadow-sm bg-card text-card-foreground">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            {label}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 text-2xl font-bold tracking-tight">{value}</div>

        {change !== undefined && (
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            {isPositive && (
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            )}
            {isNegative && (
              <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
            )}
            {!isPositive && !isNegative && (
              <Minus className="h-3.5 w-3.5 text-muted-foreground" />
            )}

            <span
              className={
                isPositive
                  ? "font-semibold text-emerald-500"
                  : isNegative
                    ? "font-semibold text-rose-500"
                    : "text-muted-foreground"
              }
            >
              {isPositive ? `+${change}%` : `${change}%`}
            </span>
            <span className="text-muted-foreground">{period}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
