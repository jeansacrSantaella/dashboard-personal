"use client";

import { AsyncActionButton } from "@/components/showcase/ui/AsyncActionButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Copy, RotateCcw, Terminal } from "lucide-react";
import { useState } from "react";

export function LiveAsyncPlayground() {
  const [label, setLabel] = useState("Ejecutar Pipeline");
  const [successMsg, setSuccessMsg] = useState("Despliegue Exitoso");
  const [errorMsg, setErrorMsg] = useState("Fallo en Build");
  const [variant, setVariant] = useState<
    "primary" | "destructive" | "secondary"
  >("primary");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [delay, setDelay] = useState(1500);
  const [forceError, setForceError] = useState(false);

  const [log, setLog] = useState<string>("Listo para interactuar.");
  const [copied, setCopied] = useState(false);

  // Simulación de llamada asíncrona a una API
  const handleSimulatedApi = async () => {
    setLog(
      `[${new Date().toLocaleTimeString()}] Iniciando petición (${delay}ms)...`,
    );
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (forceError) {
          setLog(
            `[${new Date().toLocaleTimeString()}] Rechazado: Error 500 (Simulado)`,
          );
          reject(new Error("API Timeout / Fallo 500"));
        } else {
          setLog(`[${new Date().toLocaleTimeString()}] Resuelto: HTTP 200 OK`);
          resolve();
        }
      }, delay);
    });
  };

  const generatedCode = `<AsyncActionButton
  label="${label}"
  successMessage="${successMsg}"
  errorMessage="${errorMsg}"
  variant="${variant}"
  size="${size}"
  onClick={async () => {
    // Latencia simulada: ${delay}ms
    await triggerAction();
  }}
/>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setLabel("Ejecutar Pipeline");
    setSuccessMsg("Despliegue Exitoso");
    setErrorMsg("Fallo en Build");
    setVariant("primary");
    setSize("md");
    setDelay(1500);
    setForceError(false);
    setLog("Valores restablecidos.");
  };

  return (
    <Card className="w-full border border-border overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 px-6 py-4">
        <div>
          <CardTitle className="text-lg font-bold">
            Playground: AsyncActionButton
          </CardTitle>
          <CardDescription className="text-xs">
            Prueba estados de promesas, prevención de doble envío y feedback
            visual en tiempo real.
          </CardDescription>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Restablecer
        </button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* ========================================================
              PANEL 1 (IZQUIERDA): VISTA PREVIA Y CONSOLA DE EVENTOS
             ======================================================== */}
          <div className="flex flex-col items-center justify-between p-8 bg-background/50 min-h-[380px]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground self-start">
              Vista Previa Interactiva
            </span>

            <div className="my-auto py-8">
              <AsyncActionButton
                key={`${variant}-${size}-${forceError}-${delay}`}
                label={label}
                successMessage={successMsg}
                errorMessage={errorMsg}
                variant={variant}
                size={size}
                onClick={handleSimulatedApi}
              />
            </div>

            {/* Simulación de consola de eventos */}
            <div className="w-full rounded-md border border-border/80 bg-zinc-950/80 p-3 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-1.5 text-zinc-400 mb-1 border-b border-zinc-800 pb-1">
                <Terminal className="h-3.5 w-3.5" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">
                  Registro de Eventos
                </span>
              </div>
              <p className="text-emerald-400">{log}</p>
            </div>
          </div>

          {/* ========================================================
              PANEL 2 (DERECHA): EDITOR DE PROPS Y GENERADOR JSX
             ======================================================== */}
          <div className="flex flex-col bg-muted/10 p-6 space-y-5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Propiedades del Componente
            </span>

            <div className="grid grid-cols-2 gap-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-foreground">
                  Etiqueta Base (label)
                </label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-ring"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-foreground">
                  Mensaje Éxito (success)
                </label>
                <input
                  type="text"
                  value={successMsg}
                  onChange={(e) => setSuccessMsg(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-ring"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-foreground">
                  Mensaje Error (error)
                </label>
                <input
                  type="text"
                  value={errorMsg}
                  onChange={(e) => setErrorMsg(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-ring"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-foreground">
                  Variante Visual
                </label>
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as any)}
                  className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-ring"
                >
                  <option value="primary">Primary</option>
                  <option value="destructive">Destructive</option>
                  <option value="secondary">Secondary</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-foreground">
                  Tamaño (size)
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as any)}
                  className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-ring"
                >
                  <option value="sm">Small (sm)</option>
                  <option value="md">Medium (md)</option>
                  <option value="lg">Large (lg)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-foreground">
                  Latencia Promesa ({delay}ms)
                </label>
                <input
                  type="range"
                  min="300"
                  max="4000"
                  step="100"
                  value={delay}
                  onChange={(e) => setDelay(Number(e.target.value))}
                  className="w-full accent-primary mt-2"
                />
              </div>

              {/* Conmutador de simulación de fallo */}
              <div className="col-span-2 flex items-center justify-between rounded-md border border-border/80 bg-background/60 p-2.5">
                <div>
                  <p className="text-xs font-medium">
                    Forzar Rechazo de Promesa
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Simula una caída de servidor o respuesta 500.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={forceError}
                  onChange={(e) => setForceError(e.target.checked)}
                  className="h-4 w-4 rounded border-input accent-destructive cursor-pointer"
                />
              </div>
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
