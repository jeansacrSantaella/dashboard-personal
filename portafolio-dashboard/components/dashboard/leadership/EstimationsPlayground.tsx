"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightLeft, Calculator, RotateCcw, Sliders } from "lucide-react";
import { useState } from "react";

export function EstimationsPlayground() {
  // Estado COSMIC (ISO/IEC 19761)
  const [cosmicMoves, setCosmicMoves] = useState({
    entries: 4,
    exits: 3,
    reads: 5,
    writes: 2,
  });

  // Factores multiplicadores configurables (ej: Optimista = M * 0.5, Pesimista = M * 1.5)
  const [factors, setFactors] = useState({
    optFactor: 0.6, // Factor para Optimista (< 1.0)
    pessFactor: 1.5, // Factor para Pesimista (> 1.0)
  });

  // Valores base de PERT
  const [pertValues, setPertValues] = useState({
    optimistic: 6,
    nominal: 10,
    pessimistic: 15,
  });

  // Manejador bidireccional reactivo
  const handlePertChange = (source: "O" | "M" | "P", rawVal: number) => {
    const val = Math.max(0, Number(rawVal));
    const { optFactor, pessFactor } = factors;

    if (source === "M") {
      // Si cambia el Más Probable (M):
      // O = M * factorOpt | P = M * factorPess
      const newO = Number((val * optFactor).toFixed(1));
      const newP = Number((val * pessFactor).toFixed(1));
      setPertValues({ optimistic: newO, nominal: val, pessimistic: newP });
    } else if (source === "O") {
      // Si cambia el Optimista (O):
      // M = O / factorOpt | P = M * factorPess
      const newM = optFactor > 0 ? Number((val / optFactor).toFixed(1)) : val;
      const newP = Number((newM * pessFactor).toFixed(1));
      setPertValues({ optimistic: val, nominal: newM, pessimistic: newP });
    } else if (source === "P") {
      // Si cambia el Pesimista (P):
      // M = P / factorPess | O = M * factorOpt
      const newM = pessFactor > 0 ? Number((val / pessFactor).toFixed(1)) : val;
      const newO = Number((newM * optFactor).toFixed(1));
      setPertValues({ optimistic: newO, nominal: newM, pessimistic: val });
    }
  };

  // Recalcular escenarios si se alteran los factores de tolerancia
  const handleFactorChange = (type: "opt" | "pess", rawVal: number) => {
    const factorVal = Math.max(0.1, Number(rawVal));
    const newFactors = {
      ...factors,
      [type === "opt" ? "optFactor" : "pessFactor"]: factorVal,
    };
    setFactors(newFactors);

    // Ajustamos O y P manteniendo la estimación nominal actual (M)
    const newO = Number((pertValues.nominal * newFactors.optFactor).toFixed(1));
    const newP = Number(
      (pertValues.nominal * newFactors.pessFactor).toFixed(1),
    );
    setPertValues((prev) => ({ ...prev, optimistic: newO, pessimistic: newP }));
  };

  // Fórmulas estándar PERT
  const totalCFP =
    cosmicMoves.entries +
    cosmicMoves.exits +
    cosmicMoves.reads +
    cosmicMoves.writes;

  const { optimistic: O, nominal: M, pessimistic: P } = pertValues;
  const expectedTime = (O + 4 * M + P) / 6;
  const standardDeviation = (P - O) / 6;
  const variance = Math.pow(standardDeviation, 2);

  const handleReset = () => {
    setCosmicMoves({ entries: 4, exits: 3, reads: 5, writes: 2 });
    setFactors({ optFactor: 0.6, pessFactor: 1.5 });
    setPertValues({ optimistic: 6, nominal: 10, pessimistic: 15 });
  };

  return (
    <Card className="border border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <CardTitle className="text-base font-bold">
              Simulador de Métricas de Ingeniería (COSMIC & PERT)
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            Medición de tamaño funcional (ISO/IEC 19761) y cálculo
            probabilístico bidireccional.
          </CardDescription>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Restablecer
        </button>
      </CardHeader>

      <CardContent className="grid gap-6 md:grid-cols-2">
        {/* PANEL 1: MÉTODO COSMIC */}
        <div className="space-y-4 rounded-lg border border-border bg-muted/10 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">
              Tamaño Funcional COSMIC
            </span>
            <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">
              {totalCFP} CFP
            </span>
          </div>

          <p className="text-[11px] text-muted-foreground">
            Suma de movimientos de frontera: Entradas (E), Salidas (X), Lecturas
            (R) y Escrituras (W).
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
            <div>
              <label className="text-[11px] font-medium text-muted-foreground">
                Entradas (E)
              </label>
              <input
                type="number"
                min="0"
                value={cosmicMoves.entries}
                onChange={(e) =>
                  setCosmicMoves({
                    ...cosmicMoves,
                    entries: Math.max(0, Number(e.target.value)),
                  })
                }
                className="mt-1 w-full rounded border border-input bg-background px-2.5 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-muted-foreground">
                Salidas (X)
              </label>
              <input
                type="number"
                min="0"
                value={cosmicMoves.exits}
                onChange={(e) =>
                  setCosmicMoves({
                    ...cosmicMoves,
                    exits: Math.max(0, Number(e.target.value)),
                  })
                }
                className="mt-1 w-full rounded border border-input bg-background px-2.5 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-muted-foreground">
                Lecturas (R)
              </label>
              <input
                type="number"
                min="0"
                value={cosmicMoves.reads}
                onChange={(e) =>
                  setCosmicMoves({
                    ...cosmicMoves,
                    reads: Math.max(0, Number(e.target.value)),
                  })
                }
                className="mt-1 w-full rounded border border-input bg-background px-2.5 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-muted-foreground">
                Escrituras (W)
              </label>
              <input
                type="number"
                min="0"
                value={cosmicMoves.writes}
                onChange={(e) =>
                  setCosmicMoves({
                    ...cosmicMoves,
                    writes: Math.max(0, Number(e.target.value)),
                  })
                }
                className="mt-1 w-full rounded border border-input bg-background px-2.5 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>

          <div className="rounded border border-border bg-background p-2.5 text-center font-mono text-[11px] text-muted-foreground">
            Tamaño = E ({cosmicMoves.entries}) + X ({cosmicMoves.exits}) + R (
            {cosmicMoves.reads}) + W ({cosmicMoves.writes}) ={" "}
            <span className="font-bold text-foreground">{totalCFP} CFP</span>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-border bg-muted/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                Estimación PERT Reactiva
              </span>
              <ArrowRightLeft className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-xs font-bold text-emerald-500">
              {expectedTime.toFixed(1)} Unidades
            </span>
          </div>

          <div className="rounded-md border border-border/80 bg-background/50 p-2.5 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
              <Sliders className="h-3 w-3" />
              <span>Multiplicadores de Relación</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-muted-foreground">
                  Factor Optimista (x M)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  max="0.95"
                  value={factors.optFactor}
                  onChange={(e) =>
                    handleFactorChange("opt", Number(e.target.value))
                  }
                  className="w-full rounded border border-input bg-background px-2 py-0.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground">
                  Factor Pesimista (x M)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="1.05"
                  max="3.0"
                  value={factors.pessFactor}
                  onChange={(e) =>
                    handleFactorChange("pess", Number(e.target.value))
                  }
                  className="w-full rounded border border-input bg-background px-2 py-0.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
            <div>
              <label className="text-[11px] font-medium text-muted-foreground">
                Optimista (O)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={pertValues.optimistic}
                onChange={(e) => handlePertChange("O", Number(e.target.value))}
                className="mt-1 w-full rounded border border-input bg-background px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-foreground font-semibold">
                Más Probable (M)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={pertValues.nominal}
                onChange={(e) => handlePertChange("M", Number(e.target.value))}
                className="mt-1 w-full rounded border border-primary/50 bg-background px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-muted-foreground">
                Pesimista (P)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={pertValues.pessimistic}
                onChange={(e) => handlePertChange("P", Number(e.target.value))}
                className="mt-1 w-full rounded border border-input bg-background px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>

          <div className="space-y-1.5 rounded border border-border bg-background p-2.5 text-[11px]">
            <div className="flex justify-between font-mono">
              <span className="text-muted-foreground">
                Tiempo Esperado ($T_e$):
              </span>
              <span className="font-semibold text-foreground">
                {expectedTime.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-muted-foreground">
                Desviación Estándar ($\sigma$):
              </span>
              <span className="font-semibold text-foreground">
                ±{standardDeviation.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-muted-foreground">
                Varianza ($\sigma^2$):
              </span>
              <span className="font-semibold text-foreground">
                {variance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
