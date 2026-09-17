"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FolderTree, Layers, Server } from "lucide-react";
import { useState } from "react";

export function ProjectScaffolding() {
  const [activeStack, setActiveStack] = useState<"front" | "back">("front");

  const frontTree = `src/
├── app/                  # Next.js App Router (Rutas, Layouts globales, Providers)
├── features/             # Módulos encapsulados por dominio de negocio (Feature-First)
│   ├── game/
│   │   ├── api/          # TanStack Queries, Mutaciones y llamadas HTTP
│   │   ├── components/   # UI específica del feature (GameBoard, LetterCell)
│   │   ├── hooks/        # Máquinas de estado y lógica reactiva local
│   │   └── types/        # Modelos y contratos TypeScript del dominio
│   └── leadership/
├── components/           # UI compartida y atómica (Button, Card, Input, Modales)
├── lib/                  # Clientes singleton (Axios/Fetch, QueryClient, Utils)
└── styles/               # Tokens Tailwind, temas y variables CSS`;

  const backTree = `wordle-backend/
├── app/
│   ├── api/              # Controladores y Endpoints REST (FastAPI Routers)
│   ├── core/             # Configuración global, variables (.env), Middleware y Logging
│   ├── domain/           # Entidades puras y reglas de negocio (Algoritmo 2 pases)
│   ├── schemas/          # DTOs y validaciones con sanitización estricta (Pydantic)
│   └── services/         # Adaptadores externos y persistencia asíncrona (Beanie/Mongo)
├── tests/                # Matriz ISTQB: Partición de Equivalencia y Valores Límite
├── docker-compose.yml    # Orquestación de servicios (FastAPI, MongoDB, Mongo Express)
└── requirements.txt      # Dependencias versionadas fijas`;

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderTree className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-semibold">
              Arquitectura de Directorios Estándar
            </CardTitle>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-border bg-muted/30 p-0.5 text-xs">
            <button
              onClick={() => setActiveStack("front")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                activeStack === "front"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="h-3 w-3" />
              <span>Next.js (Feature-First)</span>
            </button>
            <button
              onClick={() => setActiveStack("back")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                activeStack === "back"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Server className="h-3 w-3" />
              <span>FastAPI (Clean Arch)</span>
            </button>
          </div>
        </div>
        <CardDescription className="text-xs">
          Aislamiento de responsabilidades y modularidad preparada para
          escalabilidad de equipos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="rounded-lg bg-zinc-950 p-4 font-mono text-[11px] text-zinc-200 overflow-x-auto border border-zinc-800 leading-relaxed">
          <code>{activeStack === "front" ? frontTree : backTree}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
