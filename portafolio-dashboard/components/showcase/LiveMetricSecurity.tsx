// app/dashboard/security/page.tsx
import { IstqbTestMatrix } from "@/components/security/IstqbTestMatrix";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DoraMetricsPanel } from "../security/DoraMetricsPanel";
export const metadata = {
  title: "DevSecOps & Ciberseguridad | Dashboard",
  description:
    "Auditoría de credenciales, laboratorios criptográficos, métricas DORA y matriz ISTQB v4.0.",
};

export default function SecurityPage() {
  return (
    <Card className="w-full border border-border overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 px-6 py-4">
        <div>
          <CardTitle className="text-lg font-bold">
            NIST SP 800-63B / ISTQB v4.0 / DORA
          </CardTitle>
          <CardDescription className="text-xs">
            Gobernanza de software, auditoría de credenciales en tiempo real,
            laboratorios de integridad criptográfica y métricas continuas de
            ingeniería.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-0 m-2">
        <div className="space-y-6 py-2">
          <DoraMetricsPanel />

          <IstqbTestMatrix />
        </div>
      </CardContent>
    </Card>
  );
}
