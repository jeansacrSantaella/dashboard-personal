export interface CryptoPricesResponse {
  bitcoin: {
    usd: number;
  };
  ethereum: {
    usd: number;
  };
}

export async function fetchCryptoPrices(): Promise<CryptoPricesResponse> {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error al consultar CoinGecko: ${response.statusText}`);
  }

  return response.json();
}
