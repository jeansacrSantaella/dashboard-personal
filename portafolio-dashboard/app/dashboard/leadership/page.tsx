import { ArchitecturePatterns } from "@/components/dashboard/leadership/ArchitecturePatterns";
import { DeliveryPhases } from "@/components/dashboard/leadership/DeliveryPhases";
import { EstimationsPlayground } from "@/components/dashboard/leadership/EstimationsPlayground";
import { GitGovernance } from "@/components/dashboard/leadership/GitGovernance";
import { MicrofrontendsDeepDive } from "@/components/dashboard/leadership/MicrofrontendsDeepDive";
import { ProjectScaffolding } from "@/components/dashboard/leadership/ProjectSacaffolding";

export const metadata = {
  title: "Liderazgo Técnico & Arquitectura | Dashboard",
  description:
    "Gobernanza técnica, estimaciones COSMIC/PERT, microfrontends y diseño de sistemas.",
};

export default function LeadershipPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Liderazgo Técnico & Arquitectura
        </h1>
        <p className="text-sm text-muted-foreground">
          Modelos de predictibilidad en ingeniería, patrones distribuidos,
          gobernanza y scaffolding de proyectos.
        </p>
      </div>

      {/* 1. Calculadora de Estimaciones Reactiva */}
      <EstimationsPlayground />

      {/* 2. Microfrontends con React Flow & Documentación */}
      <MicrofrontendsDeepDive />

      {/* 3. Patrones de Arquitectura General */}
      <ArchitecturePatterns />

      {/* 4. Estructura de Proyectos (Frontend vs. Backend) */}
      <ProjectScaffolding />

      {/* 5. Gobernanza Git y Conventional Commits */}
      <GitGovernance />

      {/* 6. Cronograma y Fases de Entrega */}
      <DeliveryPhases />
    </div>
  );
}
