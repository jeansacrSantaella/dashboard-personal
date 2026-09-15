"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { GitHubRepo } from "../../lib/api/github";

interface Props {
  repos?: GitHubRepo[];
  isLoading?: boolean;
  currentUsername?: string;
}

// Colores base para representar lenguajes comunes o dinámicos
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  Java: "#b07219",
  HTML: "#e34f26",
  CSS: "#563d7c",
  Rust: "#dea584",
  Go: "#00add8",
  Otros: "#6e7681",
};

const DEFAULT_COLOR_PALETTE = [
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#ea580c",
  "#16a34a",
  "#0891b2",
];

export function GitHubLanguagesChart({
  repos = [],
  isLoading,
  currentUsername = "jeansacrSantaella",
}: Props) {
  // Procesa los repositorios y calcula la distribución porcentual
  const chartData = useMemo(() => {
    if (!repos.length) return [];

    const counts: Record<string, number> = {};
    let totalWithLanguage = 0;

    repos.forEach((repo) => {
      // Ignoramos forks para que solo compute código propio/original
      if (!repo.fork) {
        const lang = repo.language || "Otros";
        counts[lang] = (counts[lang] || 0) + 1;
        totalWithLanguage++;
      }
    });

    if (totalWithLanguage === 0) return [];

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        value: count,
        percentage: Number(((count / totalWithLanguage) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.value - a.value);
  }, [repos]);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Stack Tecnológico
          </CardTitle>
          <CardDescription>
            Calculando distribución de código...
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[280px] flex items-center justify-center text-sm text-muted-foreground">
          Cargando métricas...
        </CardContent>
      </Card>
    );
  }

  if (!chartData.length) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Stack Tecnológico
          </CardTitle>
          <CardDescription>Distribución de lenguajes públicos</CardDescription>
        </CardHeader>
        <CardContent className="h-[280px] flex items-center justify-center text-sm text-muted-foreground">
          No hay suficiente información de lenguajes para mostrar.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-semibold">
          Stack Tecnológico Real
        </CardTitle>
        <CardDescription>
          Porcentaje de repositorios públicos según lenguaje principal de{" "}
          <b>{currentUsername}</b>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm text-xs">
                        <span className="font-semibold">{data.name}: </span>
                        <span className="text-muted-foreground">
                          {data.percentage}% ({data.value} repos)
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={60} // Transforma el PieChart en Donut Chart
                outerRadius={85}
                paddingAngle={4} // Separación sutil entre sectores
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={
                      LANGUAGE_COLORS[entry.name] ||
                      DEFAULT_COLOR_PALETTE[
                        index % DEFAULT_COLOR_PALETTE.length
                      ]
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
