export interface DependencyItem {
  name: string;
  version: string;
  category:
    | "Framework"
    | "UI & Styling"
    | "Data & State"
    | "Visualization"
    | "Security & Crypto";
  description: string;
}

export interface ServiceEndpoint {
  name: string;
  url: string;
  method: "GET" | "POST";
  provider: string;
  rateLimit: string;
  auth?: string;
}

export const INSTALLED_DEPENDENCIES: DependencyItem[] = [
  {
    name: "next",
    version: "^15.1.0",
    category: "Framework",
    description: "React Framework con App Router y Server Components.",
  },
  {
    name: "react",
    version: "^19.0.0",
    category: "Framework",
    description: "Biblioteca core para interfaces de usuario.",
  },
  {
    name: "@tanstack/react-query",
    version: "^5.62.0",
    category: "Data & State",
    description: "Gestión de estado asíncrono, streaming y caché de red.",
  },
  {
    name: "recharts",
    version: "^2.15.0",
    category: "Visualization",
    description:
      "Composición de gráficos analíticos basados en SVG (Postura de Seguridad y Métricas).",
  },
  {
    name: "chart.js",
    version: "^4.4.7",
    category: "Visualization",
    description: "Motor gráfico de alto rendimiento sobre HTML5 Canvas.",
  },
  {
    name: "@xyflow/react",
    version: "^12.11.6",
    category: "Visualization",
    description:
      "Renderizado interactivo de grafos, flujos nodales y arquitecturas de Microfrontends.",
  },
  {
    name: "tailwindcss",
    version: "^3.4.1",
    category: "UI & Styling",
    description: "Motor CSS de clases utilitarias.",
  },
  {
    name: "lucide-react",
    version: "^0.468.0",
    category: "UI & Styling",
    description: "Set de iconografía vectorial modular.",
  },
  {
    name: "next-themes",
    version: "^0.4.4",
    category: "UI & Styling",
    description: "Gestión y persistencia de temas oscuro/claro.",
  },
  {
    name: "Web Crypto API (Nativo W3C)",
    version: "Nativo (Browser)",
    category: "Security & Crypto",
    description:
      "Primitivas nativas de navegador: SHA-1 (k-Anonymity HIBP), PBKDF2 (100k iteraciones) y cifrado AES-256-GCM.",
  },
];

export const CONNECTED_SERVICES: ServiceEndpoint[] = [
  {
    name: "Have I Been Pwned (HIBP Range API)",
    url: "https://api.pwnedpasswords.com/range/{prefix}",
    method: "GET",
    provider: "Troy Hunt / Cloudflare",
    rateLimit: "Sin límite estricto / Libre con k-Anonymity",
    auth: "Ninguna (k-Anonymity 20-bit prefix)",
  },
  {
    name: "GitHub REST API",
    url: "https://api.github.com/users/{username}/repos",
    method: "GET",
    provider: "GitHub",
    rateLimit: "60 req/h (anónimo)",
  },
  {
    name: "CoinGecko Spot Price",
    url: "https://api.coingecko.com/api/v3/simple/price",
    method: "GET",
    provider: "CoinGecko",
    rateLimit: "10-30 req/min (free tier)",
  },
  {
    name: "Open-Meteo Forecast",
    url: "https://api.open-meteo.com/v1/forecast",
    method: "GET",
    provider: "Open-Meteo",
    rateLimit: "Ilimitado no comercial",
  },
  {
    name: "Wordle Engine Backend",
    url: "http://127.0.0.1:8000/api/v1/game",
    method: "POST",
    provider: "FastAPI / Docker",
    rateLimit: "Localhost / Ilimitado",
    auth: "Bearer Token / JWT",
  },
];
