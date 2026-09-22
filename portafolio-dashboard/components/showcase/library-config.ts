import {
  BarChart3,
  Coins,
  Layers,
  LucideIcon,
  ShieldAlert,
} from "lucide-react";

export type CategoryId = "charts" | "crypto" | "tailwind" | "qa-security";

export interface CategoryItem {
  id: CategoryId;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  technologies: string[];
  componentCount: number;
}

export const LIBRARY_CATEGORIES: CategoryItem[] = [
  {
    id: "charts",
    title: "Data Visualization",
    tagline: "Recharts & Canvas",
    description:
      "Gráficos reactivos, cálculo de porcentajes relativos y métricas donut.",
    icon: BarChart3,
    technologies: ["Recharts", "SVG", "Tailwind"],
    componentCount: 2,
  },
  {
    id: "crypto",
    title: "Servicios Financieros",
    tagline: "Live Polling & Feeds",
    description:
      "Visualización de volatilidad, escala relativa (%) y feeds de CoinGecko.",
    icon: Coins,
    technologies: ["TanStack Query", "CoinGecko", "Recharts"],
    componentCount: 2,
  },
  {
    id: "tailwind",
    title: "UI & State Patterns",
    tagline: "Headless & Feedback",
    description:
      "Componentes desacoplados, control de promesas asíncronas y KPIs.",
    icon: Layers,
    technologies: ["TailwindCSS", "Radix UI", "Lucide"],
    componentCount: 2,
  },
  {
    id: "qa-security",
    title: "DevSecOps & Métricas",
    tagline: "ISTQB & Threat Modeling",
    description:
      "Indicadores de resiliencia, matriz de pruebas de software y auditoría técnica.",
    icon: ShieldAlert,
    technologies: ["ISTQB", "OWASP", "FastAPI"],
    componentCount: 2,
  },
];
