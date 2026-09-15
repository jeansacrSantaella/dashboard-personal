import { TechSpecsView } from "@/components/dashboard/TechEspecsView";

export const metadata = {
  title: "Especificaciones Técnicas | Dashboard",
  description:
    "Metadatos de compilación, versiones de dependencias y contratos de API.",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Configuración y Especificaciones
        </h1>
        <p className="text-sm text-muted-foreground">
          Trazabilidad de compilación, dependencias instaladas y endpoints de
          servicios activos.
        </p>
      </div>

      <TechSpecsView />
    </div>
  );
}
