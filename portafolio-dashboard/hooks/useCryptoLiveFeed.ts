"use client";

import { useQuery } from "@tanstack/react-query";

export interface CryptoRates {
  bitcoin: { usd: number; eur: number; usd_24h_change: number };
  ethereum: { usd: number; eur: number; usd_24h_change: number };
}

async function fetchCryptoPrices(): Promise<CryptoRates> {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,eur&include_24hr_change=true",
  );
  if (!response.ok) {
    throw new Error("Fallo al consultar precios en tiempo real");
  }
  return response.json();
}

export function useCryptoLiveFeed(pollingIntervalMs: number = 10000) {
  return useQuery<CryptoRates, Error>({
    queryKey: ["cryptoLiveRates"],
    queryFn: fetchCryptoPrices,
    refetchInterval: pollingIntervalMs > 0 ? pollingIntervalMs : false,
    staleTime: 5000,
  });
}
