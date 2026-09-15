"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCryptoLiveFeed } from "@/hooks/useCryptoLiveFeed";
import { Check, Copy, RefreshCw, RotateCcw } from "lucide-react";
import { useState } from "react";
import { CryptoCurrencyConverter } from "./crypto/CryptoCurrencyConverter";

export function LiveCryptoPlayground() {
  const [pollingInterval, setPollingInterval] = useState<number>(10000);
  const [copied, setCopied] = useState(false);

  const {
    data: rates,
    isFetching,
    refetch,
  } = useCryptoLiveFeed(pollingInterval);

  const generatedCode = `<CryptoCurrencyConverter
  rates={rates}
/>

// TanStack Query con intervalo dinámico:
const { data: rates, isFetching } = useQuery({
  queryKey: ["cryptoLiveRates"],
  queryFn: fetchCryptoPrices,
  refetchInterval: ${pollingInterval},
});`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setPollingInterval(10000);
  };

  return (
    <Card className="w-full border border-border overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 px-6 py-4">
        <div>
          <CardTitle className="text-lg font-bold">
            Playground: Crypto Feed & Conversor Reactivo
          </CardTitle>
          <CardDescription className="text-xs">
            Demostración de data-streaming con TanStack Query, polling
            configurable y calculadora sin llamadas redundantes.
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
          {/* PANEL IZQUIERDO: VISTA PREVIA Y ESTADO DEL FEED */}
          <div className="flex flex-col justify-between p-6 bg-background/50 min-h-[420px] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Streaming en Vivo
              </span>
              <div className="flex items-center gap-2">
                {isFetching && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-amber-500 font-medium">
                    <RefreshCw className="h-3 w-3 animate-spin" />{" "}
                    Actualizando...
                  </span>
                )}
                <button
                  onClick={() => refetch()}
                  className="rounded border border-input p-1 hover:bg-muted text-muted-foreground hover:text-foreground"
                  title="Forzar refresco manual"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Tarjetas de Precios Rápidos */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-border bg-card">
                <span className="text-xs text-muted-foreground font-medium">
                  Bitcoin (BTC)
                </span>
                <div className="text-lg font-bold mt-1">
                  $
                  {rates?.bitcoin?.usd
                    ? rates.bitcoin.usd.toLocaleString()
                    : "---"}
                </div>
                <span
                  className={`text-[10px] font-semibold ${
                    (rates?.bitcoin?.usd_24h_change || 0) >= 0
                      ? "text-emerald-500"
                      : "text-rose-500"
                  }`}
                >
                  {(rates?.bitcoin?.usd_24h_change || 0) >= 0 ? "+" : ""}
                  {rates?.bitcoin?.usd_24h_change?.toFixed(2)}% (24h)
                </span>
              </div>

              <div className="p-3 rounded-lg border border-border bg-card">
                <span className="text-xs text-muted-foreground font-medium">
                  Ethereum (ETH)
                </span>
                <div className="text-lg font-bold mt-1">
                  $
                  {rates?.ethereum?.usd
                    ? rates.ethereum.usd.toLocaleString()
                    : "---"}
                </div>
                <span
                  className={`text-[10px] font-semibold ${
                    (rates?.ethereum?.usd_24h_change || 0) >= 0
                      ? "text-emerald-500"
                      : "text-rose-500"
                  }`}
                >
                  {(rates?.ethereum?.usd_24h_change || 0) >= 0 ? "+" : ""}
                  {rates?.ethereum?.usd_24h_change?.toFixed(2)}% (24h)
                </span>
              </div>
            </div>

            {/* Módulo Calculadora */}
            <CryptoCurrencyConverter rates={rates} />
          </div>

          {/* PANEL DERECHO: CONTROLES DE POLLING Y CÓDIGO */}
          <div className="flex flex-col bg-muted/10 p-6 space-y-5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Parámetros de Red y Caché
            </span>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Frecuencia de Refresco Automático
                </label>
                <select
                  value={pollingInterval}
                  onChange={(e) => setPollingInterval(Number(e.target.value))}
                  className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-ring focus:outline-none"
                >
                  <option value={5000}>
                    Cada 5 segundos (Alta Frecuencia)
                  </option>
                  <option value={10000}>Cada 10 segundos (Recomendado)</option>
                  <option value={30000}>
                    Cada 30 segundos (Ahorro de Cuota)
                  </option>
                  <option value={0}>Desactivado (Solo Manual)</option>
                </select>
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

              <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-3 text-[11px] font-mono text-zinc-200 border border-zinc-800 max-h-44">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
