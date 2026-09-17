import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, CheckCircle } from "lucide-react";

export function DeliveryPhases() {
  const phases = [
    {
      phase: "Fase 0",
      title: "Spike Técnico & Diseño de Contratos",
      timeline: "Semana 1-2",
      badge: "Arquitectura",
      tasks: [
        "Definición de esquemas OpenAPI (Pydantic DTOs).",
        "PoC de comunicación Webpack Module Federation / Custom Elements.",
        "Modelado de amenazas según OWASP y configuración de docker-compose.",
      ],
    },
    {
      phase: "Fase 1",
      title: "Desarrollo del Core & Microservicios",
      timeline: "Semana 3-5",
      badge: "Implementación",
      tasks: [
        "Construcción del motor de dominio con algoritmo de 2 pases e inmutabilidad.",
        "Persistencia asíncrona con MongoDB y Beanie.",
        "Montaje del Shell Container en React y componentes de UI atómicos.",
      ],
    },
    {
      phase: "Fase 2",
      title: "DevSecOps & QA Riguroso",
      timeline: "Semana 6-7",
      badge: "Calidad & Auditoría",
      tasks: [
        "Ejecución de matriz de pruebas ISTQB: Partición de equivalencia y valores límite.",
        "Pruebas de caja blanca de sentencias y decisiones con Pytest.",
        "Auditoría SAST y análisis de dependencias vulnerables.",
      ],
    },
    {
      phase: "Fase 3",
      title: "Despliegue & Resiliencia Operativa",
      timeline: "Semana 8",
      badge: "Operación",
      tasks: [
        "Automatización de pipeline CI/CD en GitHub Actions.",
        "Estrategia de Fallback ante fallos de servicios externos (Circuit Breaker).",
        "Monitorización sintética de salud y latencia de endpoints.",
      ],
    },
  ];

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-semibold">
            Cronograma de Entrega & Gestión de Hitos (Delivery Lifecycle)
          </CardTitle>
        </div>
        <CardDescription className="text-xs">
          Estructuración de fases con mitigación temprana de riesgos y puntos de
          control de calidad.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((p) => (
            <div
              key={p.phase}
              className="rounded-lg border border-border/70 bg-muted/20 p-3 space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-primary uppercase">
                    {p.phase} · {p.timeline}
                  </span>
                  <span className="rounded bg-background px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground border border-border/50">
                    {p.badge}
                  </span>
                </div>
                <h4 className="font-semibold text-xs text-foreground leading-snug">
                  {p.title}
                </h4>
              </div>
              <ul className="space-y-1.5 text-[11px] text-muted-foreground pt-2 border-t border-border/40">
                {p.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle className="h-3 w-3 text-emerald-500/80 flex-shrink-0 mt-0.5" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
