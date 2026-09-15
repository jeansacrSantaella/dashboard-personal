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
import { DonutMetricChart, SliceData } from "./ui/DonutMetricChart";

const INITIAL_SLICES: SliceData[] = [
  { name: "TypeScript", value: 65, color: "#3178c6" },
  { name: "Python", value: 25, color: "#3776ab" },
  { name: "Go", value: 10, color: "#00add8" },
];

export function LiveDonutPlayground() {
  const [slices, setSlices] = useState<SliceData[]>(INITIAL_SLICES);
  const [centerLabel, setCenterLabel] = useState("100%");
  const [centerSublabel, setCenterSublabel] = useState("Distribución");
  const [innerRadius, setInnerRadius] = useState(52);
  const [outerRadius, setOuterRadius] = useState(72);
  const [paddingAngle, setPaddingAngle] = useState(4);
  const [copied, setCopied] = useState(false);

  const handleValueChange = (index: number, nextVal: number) => {
    const updated = [...slices];
    updated[index] = { ...updated[index], value: Math.max(0, nextVal) };
    setSlices(updated);
  };

  const generatedCode = `<DonutMetricChart
  data={${JSON.stringify(slices, null, 2)}}
  centerLabel="${centerLabel}"
  centerSublabel="${centerSublabel}"
  innerRadius={${innerRadius}}
  outerRadius={${outerRadius}}
  paddingAngle={${paddingAngle}}
/>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSlices(INITIAL_SLICES);
    setCenterLabel("100%");
    setCenterSublabel("Distribución");
    setInnerRadius(52);
    setOuterRadius(72);
    setPaddingAngle(4);
  };

  return (
    <Card className="w-full border border-border overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 px-6 py-4">
        <div>
          <CardTitle className="text-lg font-bold">
            Playground: DonutMetricChart
          </CardTitle>
          <CardDescription className="text-xs">
            Ajusta radios, métricas centrales y valores por sector para probar
            el canvas responsivo de Recharts.
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
          {/* PANEL IZQUIERDO: RENDERIZADO DEL GRÁFICO */}
          <div className="flex flex-col items-center justify-between p-8 bg-background/50 min-h-[420px]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground self-start">
              Vista Previa en Vivo
            </span>

            <div className="my-auto py-2">
              <DonutMetricChart
                data={slices}
                centerLabel={centerLabel}
                centerSublabel={centerSublabel}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={paddingAngle}
              />
            </div>

            {/* Leyenda interactiva */}
            <div className="flex items-center gap-4 text-xs mt-auto pt-2">
              {slices.map((slice) => (
                <div key={slice.name} className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: slice.color }}
                  />
                  <span className="font-medium text-foreground">
                    {slice.name}
                  </span>
                  <span className="text-muted-foreground">({slice.value})</span>
                </div>
              ))}
            </div>
          </div>

          {/* PANEL DERECHO: CONTROLES Y GENERADOR */}
          <div className="flex flex-col bg-muted/10 p-6 space-y-5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Configuración de Geometría y Datos
            </span>

            {/* Editor de Datos por Segmento */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground">
                Valores por Segmento
              </label>
              <div className="grid grid-cols-3 gap-2">
                {slices.map((slice, idx) => (
                  <div key={slice.name} className="space-y-1">
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: slice.color }}
                      />
                      {slice.name}
                    </span>
                    <input
                      type="number"
                      value={slice.value}
                      onChange={(e) =>
                        handleValueChange(idx, Number(e.target.value))
                      }
                      className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-ring focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Controles de Texto Central */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-foreground">
                  Texto Principal
                </label>
                <input
                  type="text"
                  value={centerLabel}
                  onChange={(e) => setCenterLabel(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-ring focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-foreground">
                  Subetiqueta
                </label>
                <input
                  type="text"
                  value={centerSublabel}
                  onChange={(e) => setCenterSublabel(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-ring focus:outline-none"
                />
              </div>
            </div>

            {/* Controles de Radio (Slidres) */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Radio Interno</span>
                  <span>{innerRadius}px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="65"
                  value={innerRadius}
                  onChange={(e) => setInnerRadius(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Radio Externo</span>
                  <span>{outerRadius}px</span>
                </div>
                <input
                  type="range"
                  min="66"
                  max="95"
                  value={outerRadius}
                  onChange={(e) => setOuterRadius(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            {/* Generador JSX Reactivo */}
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
