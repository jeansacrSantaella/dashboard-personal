"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertOctagon,
  Clock,
  GitPullRequest,
  TrendingUp,
  Zap,
} from "lucide-react";

interface DoraMetric {
  id: string;
  name: string;
  description: string;
  value: string;
  unit: string;
  status: "Elite" | "High" | "Medium" | "Low";
  target: string;
  icon: any;
}

const DORA_METRICS: DoraMetric[] = [
  {
    id: "df",
    name: "Deployment Frequency",
    description: "Frecuencia de despliegue a entornos productivos",
    value: "3.2",
    unit: "despliegues / día",
    status: "Elite",
    target: "Múltiples despliegues por día (Trunk-Based)",
    icon: Zap,
  },
  {
    id: "ltfc",
    name: "Lead Time for Changes",
    description: "Tiempo transcurrido desde el commit hasta producción",
    value: "4.5",
    unit: "horas",
    status: "Elite",
    target: "< 24 horas",
    icon: GitPullRequest,
  },
  {
    id: "cfr",
    name: "Change Failure Rate",
    description: "Porcentaje de cambios que degradan el servicio",
    value: "2.1",
    unit: "%",
    status: "Elite",
    target: "< 5%",
    icon: AlertOctagon,
  },
  {
    id: "mttr",
    name: "Mean Time to Restore (MTTR)",
    description: "Tiempo medio para recuperar el servicio ante caídas",
    value: "28",
    unit: "minutos",
    status: "Elite",
    target: "< 1 hora",
    icon: Clock,
  },
];

export function DoraMetricsPanel() {
  const getBadgeStyle = (status: DoraMetric["status"]) => {
    switch (status) {
      case "Elite":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "High":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    }
  };

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            <CardTitle className="text-base font-bold">
              Métricas DORA & Rendimiento de Entrega
            </CardTitle>
          </div>
          <span className="rounded bg-muted/40 px-2 py-0.5 font-mono text-[11px] font-semibold text-muted-foreground border border-border/50">
            DevOps Research and Assessment
          </span>
        </div>
        <CardDescription className="text-xs">
          Indicadores cuantitativos de velocidad, estabilidad y resiliencia de
          la arquitectura.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DORA_METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.id}
                className="flex flex-col justify-between rounded-lg border border-border bg-card p-3.5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {metric.name}
                  </span>
                  <Icon className="h-4 w-4 text-muted-foreground/70" />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold font-mono tracking-tight text-foreground">
                      {metric.value}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {metric.unit}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">
                    {metric.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[10px]">
                  <span className="text-muted-foreground">
                    Benchmark: {metric.target}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono font-semibold border ${getBadgeStyle(
                      metric.status,
                    )}`}
                  >
                    {metric.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
