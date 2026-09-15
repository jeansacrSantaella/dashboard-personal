"use client";

import { MetricStatCard } from "@/components/showcase/ui/MetricStatCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  Check,
  Copy,
  DollarSign,
  LucideIcon,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";

const ICON_MAP: Record<string, LucideIcon> = {
  ShieldCheck,
  Zap,
  TrendingUp,
  DollarSign,
  Activity,
};

const DEFAULT_STATE = {
  label: "Cobertura de Pruebas",
  value: "94.2%",
  change: 4.8,
  period: "vs. mes anterior",
  iconKey: "ShieldCheck",
};

export function LiveMetricPlayground() {
  const [label, setLabel] = useState(DEFAULT_STATE.label);
  const [value, setValue] = useState(DEFAULT_STATE.value);
  const [change, setChange] = useState<number>(DEFAULT_STATE.change);
  const [period, setPeriod] = useState(DEFAULT_STATE.period);
  const [iconKey, setIconKey] = useState<string>(DEFAULT_STATE.iconKey);
  const [copied, setCopied] = useState(false);

  const SelectedIcon = ICON_MAP[iconKey] || ShieldCheck;

  // Genera el código JSX resultante en tiempo real
  const generatedCode = `<MetricStatCard
  label="${label}"
  value="${value}"
  change={${change}}
  period="${period}"
  icon={${iconKey}}
/>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setLabel(DEFAULT_STATE.label);
    setValue(DEFAULT_STATE.value);
    setChange(DEFAULT_STATE.change);
    setPeriod(DEFAULT_STATE.period);
    setIconKey(DEFAULT_STATE.iconKey);
  };

  return (
    <Card className="w-full border border-border overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 px-6 py-4">
        <div>
          <CardTitle className="text-lg font-bold">
            Playground: MetricStatCard
          </CardTitle>
          <CardDescription className="text-xs">
            Modifica las variables en el editor derecho para observar la
            reactividad visual inmediata.
          </CardDescription>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          title="Restablecer valores"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Restablecer
        </button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* ========================================================
              PANEL 1 (IZQUIERDA): RENDERIZADO DEL COMPONENTE EN VIVO
             ======================================================== */}
          <div className="flex flex-col items-center justify-center p-8 bg-background/50 min-h-[360px]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              Vista Previa en Vivo
            </span>

            {/* Componente real renderizándose con el estado reactivo */}
            <MetricStatCard
              label={label}
              value={value}
              change={Number(change)}
              period={period}
              icon={SelectedIcon}
            />

            <div className="mt-8 text-center text-xs text-muted-foreground max-w-xs">
              El componente detecta si el cambio es positivo, negativo o neutro
              y estiliza dinámicamente el delta.
            </div>
          </div>

          {/* ========================================================
              PANEL 2 (DERECHA): EDITOR DE PROPS Y GENERADOR DE CÓDIGO
             ======================================================== */}
          <div className="flex flex-col bg-muted/10 p-6 space-y-6">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Propiedades del Componente
            </span>

            {/* Controles de Entrada */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-medium text-foreground">
                  Etiqueta (label)
                </label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-foreground">
                  Valor (value)
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-foreground">
                  Variación % (change)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={change}
                  onChange={(e) => setChange(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-foreground">
                  Icono (icon)
                </label>
                <select
                  value={iconKey}
                  onChange={(e) => setIconKey(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  {Object.keys(ICON_MAP).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 space-y-1.5">
                <label className="font-medium text-foreground">
                  Periodo comparativo (period)
                </label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>

            {/* Generador de código JSX reactivo */}
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

              <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-3 text-[11px] font-mono text-zinc-200 border border-zinc-800">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
