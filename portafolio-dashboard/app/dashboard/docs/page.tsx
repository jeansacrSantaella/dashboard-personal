// app/dashboard/docs/page.tsx
import { DocumentationViewer } from "@/components/dashboard/docs/DocumentationViewer";
import { BookMarked, Terminal } from "lucide-react";

export const metadata = {
  title: "Documentación & Conceptos | Portafolio",
  description:
    "Índice de estándares técnicos, especificaciones oficiales y justificación de patrones implementados.",
};

export default function DocsPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary flex items-center gap-1">
            <BookMarked className="h-3.5 w-3.5" />
            Engineering Knowledge Base
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Documentación & Conceptos Técnicos
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Glosario centralizado de estándares de ingeniería, especificaciones
          formales y fundamentación teórica de cada módulo desarrollado en el
          portafolio.
        </p>
      </div>

      {/* Visualizador con Búsqueda y Enlaces */}
      <DocumentationViewer />

      {/* Resumen Metodológico */}
      <div className="rounded-xl border border-border bg-muted/20 p-4 text-xs space-y-2">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <Terminal className="h-4 w-4 text-primary" />
          <span>Gobernanza y Trazabilidad</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Cada funcionalidad en este dashboard está respaldada por una
          especificación formal de la industria (NIST, ISO/IEC, OWASP, W3C).
          Esta sección permite inspeccionar los fundamentos antes de validar su
          comportamiento en los laboratorios interactivos.
        </p>
      </div>
    </div>
  );
}
