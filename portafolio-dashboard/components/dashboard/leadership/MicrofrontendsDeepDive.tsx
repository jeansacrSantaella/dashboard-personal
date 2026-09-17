// components/dashboard/leadership/MicrofrontendsDeepDive.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, ExternalLink, Network } from "lucide-react";
import { useState } from "react";
import { MicrofrontendsFlowChart } from "./MicrofrontendsFlowChart";

export function MicrofrontendsDeepDive() {
  const [activeTab, setActiveTab] = useState<
    "flow" | "react" | "angular" | "comms" | "docs"
  >("flow");

  return (
    <Card className="border border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-indigo-500" />
            <CardTitle className="text-base font-bold">
              Deep Dive: Microfrontends Heterogéneos (React + Angular vía
              Webpack)
            </CardTitle>
          </div>
          <span className="rounded bg-indigo-500/10 px-2 py-0.5 font-mono text-xs font-semibold text-indigo-400">
            Module Federation v5
          </span>
        </div>
        <CardDescription className="text-xs">
          Patrones de orquestación en tiempo de ejecución, compatibilidad de
          frameworks y gobernanza de dependencias.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 border-b border-border pb-2">
          {[
            { id: "flow", label: "Diagrama & Flujo" },
            { id: "react", label: "Remote React (Puro)" },
            { id: "angular", label: "Remote Angular (Web Component)" },
            { id: "comms", label: "Estrategia de Comunicación" },
            { id: "docs", label: "Documentación & Enlaces" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "flow" && (
          <div className="space-y-4 text-xs">
            <MicrofrontendsFlowChart />

            <div className="grid md:grid-cols-3 gap-3 pt-1">
              <div className="border border-border rounded-lg p-3 bg-muted/20 space-y-1">
                <span className="font-bold text-foreground">
                  1. Manifiesto Remoto
                </span>
                <p className="text-muted-foreground">
                  El Host solicita en tiempo de ejecución el archivo{" "}
                  <code>remoteEntry.js</code> expuesto por cada aplicación
                  remota.
                </p>
              </div>
              <div className="border border-border rounded-lg p-3 bg-muted/20 space-y-1">
                <span className="font-bold text-foreground">
                  2. Resolución Singleton
                </span>
                <p className="text-muted-foreground">
                  Webpack negocia dependencias compartidas (<code>shared</code>
                  ). Evita descargar duplicados del runtime de React.
                </p>
              </div>
              <div className="border border-border rounded-lg p-3 bg-muted/20 space-y-1">
                <span className="font-bold text-foreground">
                  3. Aislamiento de Runtimes
                </span>
                <p className="text-muted-foreground">
                  Angular encapsula su Change Detection (Zone.js) dentro de un{" "}
                  <code>Custom Element</code> para no colisionar con el Virtual
                  DOM.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "react" && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Integración nativa vía <strong>React.lazy</strong> y{" "}
              <strong>Suspense</strong>. Webpack garantiza que la instancia del
              runtime sea compartida mediante <code>singleton: true</code>.
            </p>
            <pre className="rounded-lg bg-zinc-950 p-3 text-[11px] font-mono text-zinc-200 overflow-x-auto border border-zinc-800">
              <code>{`// Webpack Remote React (Puerto 3001)
new ModuleFederationPlugin({
  name: "remoteReactApp",
  filename: "remoteEntry.js",
  exposes: { "./WordleWidget": "./src/components/WordleWidget" },
  shared: { 
    react: { singleton: true, requiredVersion: deps.react }, 
    "react-dom": { singleton: true, requiredVersion: deps["react-dom"] } 
  }
});`}</code>
            </pre>
          </div>
        )}

        {activeTab === "angular" && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Angular utiliza <strong>@angular/elements</strong> para exportarse
              como Custom Element estándar (W3C), conteniendo Zone.js y evitando
              conflictos con el árbol DOM.
            </p>
            <pre className="rounded-lg bg-zinc-950 p-3 text-[11px] font-mono text-zinc-200 overflow-x-auto border border-zinc-800">
              <code>{`// remote-angular/src/app/app.module.ts
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}
  ngDoBootstrap() {
    if (!customElements.get('angular-leaderboard-element')) {
      const el = createCustomElement(LeaderboardComponent, { injector: this.injector });
      customElements.define('angular-leaderboard-element', el);
    }
  }
}`}</code>
            </pre>
          </div>
        )}

        {activeTab === "comms" && (
          <div className="space-y-3 text-xs">
            <p className="text-muted-foreground">
              Para desacoplar frameworks diferentes, la comunicación transversal
              se apoya en mecanismos nativos del navegador:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="border border-border rounded-lg p-3 bg-muted/20">
                <span className="font-semibold text-foreground">
                  Custom Events (Event Bus DOM)
                </span>
                <p className="text-muted-foreground mt-1">
                  <code>
                    window.dispatchEvent(new CustomEvent('GAME_COMPLETED',
                    &#123; detail &#125;))
                  </code>
                  . React y Angular escuchan mediante{" "}
                  <code>addEventListener</code>.
                </p>
              </div>
              <div className="border border-border rounded-lg p-3 bg-muted/20">
                <span className="font-semibold text-foreground">
                  BroadcastChannel & Storage
                </span>
                <p className="text-muted-foreground mt-1">
                  Sincronización multi-pestaña para eventos de sesión y tokens
                  de autenticación federados.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "docs" && (
          <div className="space-y-3 text-xs">
            <div className="grid md:grid-cols-2 gap-3">
              <a
                href="https://webpack.js.org/concepts/module-federation/"
                target="_blank"
                rel="noreferrer"
                className="flex items-start justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors group"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-foreground group-hover:text-primary">
                    <BookOpen className="h-3.5 w-3.5 text-primary" />
                    <span>Webpack Module Federation</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Especificación core de Webpack 5 para compartir módulos en
                    tiempo de ejecución.
                  </p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary flex-shrink-0 ml-2" />
              </a>

              <a
                href="https://angular.dev/guide/elements"
                target="_blank"
                rel="noreferrer"
                className="flex items-start justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors group"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-foreground group-hover:text-primary">
                    <BookOpen className="h-3.5 w-3.5 text-rose-500" />
                    <span>Angular Elements (Web Components)</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Empaquetado agnóstico de componentes de Angular como Custom
                    Elements estándar W3C.
                  </p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary flex-shrink-0 ml-2" />
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
