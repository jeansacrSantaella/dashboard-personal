"use client";

import { CryptoRates } from "@/hooks/useCryptoLiveFeed";
import { ArrowRightLeft } from "lucide-react";
import { useState } from "react";

interface Props {
  rates?: CryptoRates;
}

export function CryptoCurrencyConverter({ rates }: Props) {
  const [fiatAmount, setFiatAmount] = useState<number>(1000);
  const [currency, setCurrency] = useState<"usd" | "eur">("usd");
  const [cryptoAsset, setCryptoAsset] = useState<"bitcoin" | "ethereum">(
    "bitcoin",
  );

  const activeRate = rates?.[cryptoAsset]?.[currency] || 1;
  const cryptoEquivalent =
    activeRate > 0 ? (fiatAmount / activeRate).toFixed(6) : "0";

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Calculadora de Cobertura / Conversión
        </h4>
        <ArrowRightLeft className="h-4 w-4 text-primary" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Entrada Fiat */}
        <div className="space-y-1">
          <label className="font-medium text-foreground">Monto Fiat</label>
          <div className="flex gap-1.5">
            <input
              type="number"
              min="1"
              value={fiatAmount}
              onChange={(e) =>
                setFiatAmount(Math.max(0, Number(e.target.value)))
              }
              className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-ring focus:outline-none"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as "usd" | "eur")}
              className="rounded-md border border-input bg-background px-2 text-xs uppercase"
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
            </select>
          </div>
        </div>

        {/* Salida Cripto */}
        <div className="space-y-1">
          <label className="font-medium text-foreground">Activo Destino</label>
          <div className="flex gap-1.5">
            <select
              value={cryptoAsset}
              onChange={(e) =>
                setCryptoAsset(e.target.value as "bitcoin" | "ethereum")
              }
              className="rounded-md border border-input bg-background px-2 text-xs"
            >
              <option value="bitcoin">BTC</option>
              <option value="ethereum">ETH</option>
            </select>
            <div className="flex-1 flex items-center justify-end rounded-md border border-input bg-muted/40 px-3 text-xs font-mono font-semibold">
              {cryptoEquivalent}
            </div>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground">
        Tasa spot aplicada: 1 {cryptoAsset === "bitcoin" ? "BTC" : "ETH"} = $
        {activeRate.toLocaleString()} {currency.toUpperCase()}
      </p>
    </div>
  );
}
