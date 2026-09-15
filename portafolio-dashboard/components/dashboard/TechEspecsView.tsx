"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CONNECTED_SERVICES,
  INSTALLED_DEPENDENCIES,
} from "@/config/tech-specs";
import {
  Clock,
  Cpu,
  ExternalLink,
  GitBranch,
  Globe,
  PackageCheck,
} from "lucide-react";
import { useMemo } from "react";

export function TechSpecsView() {
  const buildDate = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_BUILD_TIME;
    if (!raw) return "Sesión en tiempo real";
    return new Date(raw).toLocaleString("es-ES", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }, []);

  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || "2.4.0";
  const environment = process.env.NEXT_PUBLIC_NODE_ENV || "development";

  return (
    <div className="space-y-6">
      {/* 1. Métricas de Compilación y Runtime */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Última Compilación
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="text-sm font-semibold">{buildDate}</div>
            <span className="text-[10px] text-muted-foreground">
              Timestamp de build
            </span>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Versión Semántica
            </CardTitle>
            <GitBranch className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="text-sm font-semibold font-mono">v{appVersion}</div>
            <span className="text-[10px] text-muted-foreground">
              Release productivo
            </span>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Entorno Activo
            </CardTitle>
            <Cpu className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="text-sm font-semibold uppercase">{environment}</div>
            <span className="text-[10px] text-muted-foreground">
              Next.js App Router
            </span>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              APIs Conectadas
            </CardTitle>
            <Globe className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="text-sm font-semibold">
              {CONNECTED_SERVICES.length} Endpoints
            </div>
            <span className="text-[10px] text-muted-foreground">
              Caché vía TanStack Query
            </span>
          </CardContent>
        </Card>
      </div>

      {/* 2. Directorio de Servicios & URLs de Consumo */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-semibold">
              Servicios e Integraciones Externas
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            Contratos de API REST utilizados activamente en los módulos del
            dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-y bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">Servicio</th>
                  <th className="px-4 py-2 font-medium">Método</th>
                  <th className="px-4 py-2 font-medium">URL del Endpoint</th>
                  <th className="px-4 py-2 font-medium">Cuota / Rate Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {CONNECTED_SERVICES.map((srv) => (
                  <tr key={srv.name} className="hover:bg-muted/20">
                    <td className="px-4 py-2.5 font-semibold text-foreground">
                      {srv.name}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary">
                        {srv.method}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
                      <a
                        href={srv.url.replace("{username}", "octocat")}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline flex items-center gap-1 text-primary"
                      >
                        {srv.url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {srv.rateLimit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 3. Paquetes y Versiones en package.json */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <PackageCheck className="h-4 w-4 text-emerald-500" />
            <CardTitle className="text-base font-semibold">
              Ecosistema de Dependencias (package.json)
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            Librerías principales compiladas en este proyecto.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-y bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">Paquete</th>
                  <th className="px-4 py-2 font-medium">Versión</th>
                  <th className="px-4 py-2 font-medium">Categoría</th>
                  <th className="px-4 py-2 font-medium">
                    Propósito Arquitectónico
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {INSTALLED_DEPENDENCIES.map((dep) => (
                  <tr key={dep.name} className="hover:bg-muted/20">
                    <td className="px-4 py-2.5 font-mono font-semibold text-foreground">
                      {dep.name}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-muted-foreground">
                      {dep.version}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {dep.category}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {dep.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
