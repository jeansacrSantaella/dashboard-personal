import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Network, ShieldCheck } from "lucide-react";

export function ArchitecturePatterns() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-indigo-500" />
            <CardTitle className="text-sm font-semibold">
              Orquestación Microfrontends (Module Federation / Shell)
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            Desacoplamiento vertical por dominios independientes de negocio.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            Estrategia basada en un contenedor anfitrión (Host Shell) que carga
            dinámicamente micro-aplicaciones en tiempo de ejecución sin
            dependencias cruzadas de bundle:
          </p>
          <ul className="space-y-1.5 pl-4 list-disc text-foreground">
            <li>
              <strong>Host Shell:</strong> Autenticación centralizada, temas
              visuales y ruteo global.
            </li>
            <li>
              <strong>Remote Apps:</strong> Módulos funcionales autónomos con
              pipelines CI/CD aislados.
            </li>
            <li>
              <strong>Comunicación Desacoplada:</strong> Event Bus y Custom
              Events nativos sin estado global invasivo.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <CardTitle className="text-sm font-semibold">
              Clean Architecture & Capas Desacopladas
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            Independencia estricta de frameworks, bases de datos y transporte.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-xs text-muted-foreground leading-relaxed">
          <p>
            Aislamiento de la lógica de dominio respecto al transporte HTTP
            (FastAPI) y la capa de persistencia (MongoDB/Beanie)[cite: 3]:
          </p>
          <ul className="space-y-1.5 pl-4 list-disc text-foreground">
            <li>
              <strong>Capa de Dominio:</strong> Reglas puras del juego
              (validación de frecuencias y estados)[cite: 1].
            </li>
            <li>
              <strong>Capa de Aplicación:</strong> Servicios orquestadores e
              inmutabilidad con DTOs (Pydantic).
            </li>
            <li>
              <strong>Adaptadores / Infraestructura:</strong> Clientes
              asíncronos y contratos REST con CORS estricto.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
