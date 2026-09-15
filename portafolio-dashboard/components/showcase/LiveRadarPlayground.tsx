"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Copy, RotateCcw } from "lucide-react";
import { useState } from "react";
import { RadarMetric, SecurityRadarChart } from "./charts/SecurityRadarChart";

const INITIAL_METRICS: RadarMetric[] = [
  { area: "Autenticación", score: 85, target: 95 },
  { area: "Cifrado Datos", score: 70, target: 90 },
  { area: "Red & Perímetro", score: 90, target: 85 },
  { area: "Integridad (SAST)", score: 65, target: 80 },
  { area: "Logs & Auditoría", score: 80, target: 85 },
];

export function LiveRadarPlayground() {
  const [metrics, setMetrics] = useState<RadarMetric[]>(INITIAL_METRICS);
  const [copied, setCopied] = useState(false);

  const handleScoreChange = (index: number, newScore: number) => {
    const updated = [...metrics];
    updated[index] = {
      ...updated[index],
      score: Math.min(100, Math.max(0, newScore)),
    };
    setMetrics(updated);
  };

  const generatedCode = `<SecurityRadarChart
  metrics={${JSON.stringify(metrics, null, 2)}}
/>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setMetrics(INITIAL_METRICS);
  };

  return (
    <Card className="w-full border border-border overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 px-6 py-4">
        <div>
          <CardTitle className="text-lg font-bold">
            Playground: Security Radar Chart (Chart.js / Canvas)
          </CardTitle>
          <CardDescription className="text-xs">
            Evaluación multidimensional de postura técnica y modelado de riesgos
            renderizado en HTML5 Canvas.
          </CardDescription>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Restablecer
        </button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* PANEL IZQUIERDO: CANVAS RADAR CHART */}
          <div className="flex flex-col items-center justify-between p-6 bg-background/50 min-h-[420px]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground self-start">
              Renderizado Canvas Activo
            </span>

            <div className="w-full my-auto flex items-center justify-center">
              <SecurityRadarChart metrics={metrics} />
            </div>

            <p className="text-[11px] text-muted-foreground text-center">
              Óptimo para gráficos polares y alta frecuencia de refresco sin
              penalizar el árbol DOM.
            </p>
          </div>

          {/* PANEL DERECHO: CONTROLES DE PUNTUACIÓN Y CÓDIGO */}
          <div className="flex flex-col bg-muted/10 p-6 space-y-5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Ajuste de Variables por Dimensión (0 - 100)
            </span>

            <div className="space-y-3">
              {metrics.map((m, idx) => (
                <div key={m.area} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-foreground">
                      {m.area}
                    </span>
                    <span className="text-muted-foreground">
                      {m.score} / 100
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={m.score}
                    onChange={(e) =>
                      handleScoreChange(idx, Number(e.target.value))
                    }
                    className="w-full accent-primary"
                  />
                </div>
              ))}
            </div>

            {/* Código generado reactivamente */}
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Código JSX Generado
                </span>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-1 text-[11px] font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  {copied ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copied ? "Copiado" : "Copiar"}
                </button>
              </div>

              <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-3 text-[11px] font-mono text-zinc-200 border border-zinc-800 max-h-36">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
