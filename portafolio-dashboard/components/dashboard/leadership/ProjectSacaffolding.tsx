"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Atom,
  Boxes,
  FolderTree,
  Layers,
  Server,
  Shield,
  Smartphone,
} from "lucide-react";
import { useState } from "react";

type StackType =
  | "next"
  | "fastapi"
  | "angular"
  | "native"
  | "react-pure"
  | "react-webpack";

export function ProjectScaffolding() {
  const [activeStack, setActiveStack] = useState<StackType>("next");

  const scaffolds: Record<StackType, string> = {
    next: `src/
├── app/                  # Next.js App Router (Rutas, Layouts globales, Server Actions)
├── features/             # Módulos encapsulados por dominio de negocio (Feature-First)
│   ├── game/
│   │   ├── api/          # TanStack Queries, Mutaciones y endpoints
│   │   ├── components/   # UI específica del feature (GameBoard, LetterCell)
│   │   ├── hooks/        # Máquinas de estado y lógica reactiva local
│   │   └── types/        # Modelos y contratos TypeScript del dominio
│   └── leadership/
├── components/           # UI compartida y atómica (Button, Card, Input, Modales)
├── lib/                  # Clientes singleton (Web Crypto, QueryClient, Utils)
└── styles/               # Tokens Tailwind, temas y variables CSS`,

    fastapi: `wordle-backend/
├── app/
│   ├── api/              # Controladores y Endpoints REST (FastAPI Routers v1)
│   ├── core/             # Configuración global, variables (.env), Middleware y Logging
│   ├── domain/           # Entidades puras y reglas de negocio (Algoritmo 2 pases)
│   ├── schemas/          # DTOs y validaciones con sanitización estricta (Pydantic)
│   └── services/         # Adaptadores externos y persistencia asíncrona (Beanie/Mongo)
├── tests/                # Matriz ISTQB: Partición de Equivalencia y Valores Límite
├── docker-compose.yml    # Orquestación de servicios (FastAPI, MongoDB, Mongo Express)
└── requirements.txt      # Dependencias versionadas fijas`,

    angular: `src/
├── app/
│   ├── core/             # Servicios singleton (Auth, Interceptors HTTP, Guards)
│   ├── shared/           # Directivas, pipes y UI agnóstica reutilizable
│   ├── features/         # Módulos autónomos basados en Standalone Components
│   │   └── leaderboard/
│   │       ├── components/   # UI dumb/smart (ChangeDetectionStrategy.OnPush)
│   │       ├── services/     # Estado reactivo local (Signals / RxJS)
│   │       └── models/       # Interfaces y tipados del dominio
│   ├── elements/         # Custom Elements (@angular/elements) para Microfrontends
│   └── app.routes.ts     # Enrutamiento lazy loading vía loadComponent
├── assets/               # Fuentes, i18n y recursos estáticos
└── angular.json          # Configuración del CLI y arquitecturas de build`,

    native: `src/
├── navigation/           # Enrutamiento React Navigation (Stack, Tabs, Drawer)
├── screens/              # Vistas de pantalla completas (DashboardScreen, AuthScreen)
├── components/           # Componentes nativos optimizados
│   ├── ui/               # Botones, Inputs (soporte SafeArea y KeyboardAvoiding)
│   └── modules/          # Componentes compuestos por flujo
├── hooks/                # Hooks nativos (useBiometrics, useSecureStore, useNetwork)
├── services/             # Integración con hardware/cifrado (Expo SecureStore / Keychain)
├── theme/                # Paleta, escalado responsive de fuentes y espaciados
└── types/                # Declaraciones de tipos para navegación y props`,

    "react-pure": `src/
├── assets/               # Gráficos SVG, imágenes y tokens visuales
├── components/           # Arquitectura Atomic Design / Presentational UI
│   ├── atoms/            # Botones, inputs, badges puros
│   ├── molecules/        # FormField, SearchBar
│   └── organisms/        # Header, TableView, SideMenu
├── context/              # Proveedores de estado transversal (AuthContext, ThemeContext)
├── hooks/                # Custom hooks de consumo de APIs nativas y listeners
├── pages/                # Vistas enrutadas con React Router DOM v6
├── services/             # Capa de transporte con Axios/Fetch y normalizadores
├── vite.config.ts        # Bundler Vite (ESBuild, plugins de compresión y aliases)
└── index.html            # Punto de montaje único (#root)`,

    "react-webpack": `project-root/
├── config/
│   ├── webpack.common.js # Reglas base (Babel loader, TypeScript, assets)
│   ├── webpack.dev.js    # HMR (Hot Module Replacement) y Webpack Dev Server (:3001)
│   └── webpack.prod.js   # Minificación (Terser), CSS extraction y Code Splitting
├── public/
│   └── index.html        # HTML template procesado por HtmlWebpackPlugin
├── src/
│   ├── bootstrap.tsx     # Inicialización asíncrona requerida por Module Federation
│   ├── index.ts          # Importación dinámica import('./bootstrap')
│   ├── App.tsx           # Contenedor raíz y enrutamiento
│   ├── components/       # Componentes locales del Remote
│   └── exposes/          # Componentes expuestos a través de ModuleFederationPlugin
│       └── Widget.tsx    # './Widget' declarado en el manifiesto remoteEntry.js
├── babel.config.json     # Presets (@babel/preset-react, @babel/preset-typescript)
├── tsconfig.json         # Paths aliases y configuración estricta de compilador
└── package.json          # Dependencias y scripts de orquestación`,
  };

  const tabs: { id: StackType; label: string; icon: any }[] = [
    { id: "next", label: "Next.js (Feature-First)", icon: Layers },
    { id: "fastapi", label: "FastAPI (Clean Arch)", icon: Server },
    { id: "angular", label: "Angular (Standalones)", icon: Shield },
    { id: "native", label: "React Native (Modular)", icon: Smartphone },
    { id: "react-pure", label: "React Puro (Vite SPA)", icon: Atom },
    {
      id: "react-webpack",
      label: "React + Webpack 5 (Federation)",
      icon: Boxes,
    },
  ];

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FolderTree className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-semibold">
              Arquitectura de Directorios Estándar
            </CardTitle>
          </div>
          <div className="flex flex-wrap items-center gap-1 rounded-md border border-border bg-muted/30 p-0.5 text-xs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveStack(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                    activeStack === tab.id
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <CardDescription className="text-xs">
          Aislamiento de responsabilidades y modularidad preparada para
          escalabilidad de equipos en múltiples ecosistemas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="rounded-lg bg-zinc-950 p-4 font-mono text-[11px] text-zinc-200 overflow-x-auto border border-zinc-800 leading-relaxed">
          <code>{scaffolds[activeStack]}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
