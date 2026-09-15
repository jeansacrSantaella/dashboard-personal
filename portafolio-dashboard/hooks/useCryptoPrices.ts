import { CryptoPricesResponse, fetchCryptoPrices } from "@/lib/api/crypto";
import { useQuery } from "@tanstack/react-query";

export const CRYPTO_PRICES_QUERY_KEY = ["cryptoPrices"] as const;

export function useCryptoPrices() {
  return useQuery<CryptoPricesResponse, Error>({
    queryKey: CRYPTO_PRICES_QUERY_KEY,
    queryFn: fetchCryptoPrices,
    staleTime: 60 * 1000, // Los datos se consideran frescos durante 1 minuto
    refetchInterval: 60 * 1000, // cada 60s para mantener precios al día
  });
}
