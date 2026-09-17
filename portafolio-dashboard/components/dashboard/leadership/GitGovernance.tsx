import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  GitBranch,
  GitCommit,
  GitPullRequest,
} from "lucide-react";

export function GitGovernance() {
  const commitTypes = [
    {
      type: "feat",
      desc: "Nueva característica para el usuario o sistema",
      example: "feat(game): add daily challenge mode",
    },
    {
      type: "fix",
      desc: "Corrección de un error o defecto funcional",
      example: "fix(auth): handle expired jwt refresh token",
    },
    {
      type: "refactor",
      desc: "Cambio de código sin alterar comportamiento externo",
      example: "refactor(api): decouple controller from beanie odm",
    },
    {
      type: "sec",
      desc: "Parches de ciberseguridad y sanitización de inputs",
      example: "sec(deps): bump pydantic to mitigate cve-2024-x",
    },
    {
      type: "test",
      desc: "Adición o ajuste de pruebas ISTQB/Caja Blanca",
      example: "test(engine): add boundary value analysis test suite",
    },
  ];

  const prPolicies = [
    "Mínimo 1 revisión técnica (Peer Review) de un par o Tech Lead.",
    "Pipeline CI/CD 100% en verde: Linters (ESLint/Ruff) y Formateo sin alertas.",
    "Suite de pruebas automáticas exitosa con cobertura > 85% de líneas y ramas.",
    "Análisis estático de seguridad (SAST) sin vulnerabilidades críticas ni altas.",
    "Estrategia de integración obligatoria: Squash & Merge o Rebase (No merge commits).",
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <GitCommit className="h-4 w-4 text-emerald-500" />
            <CardTitle className="text-sm font-semibold">
              Convenciones de Commits (Conventional Commits v1.0)
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            Estandarización semántica para changelogs automáticos y
            trazabilidad.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {commitTypes.map((item) => (
              <div
                key={item.type}
                className="rounded-lg border border-border/70 bg-muted/20 p-2.5 text-xs font-mono"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">{item.type}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {item.desc}
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-foreground/80 bg-background/60 px-2 py-0.5 rounded border border-border/40">
                  {item.example}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <GitPullRequest className="h-4 w-4 text-sky-500" />
            <CardTitle className="text-sm font-semibold">
              Gobernanza de Pull Requests & Trunk-Based
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            Criterios de aceptación antes de integrar código a las ramas
            principales.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-border/70 bg-muted/20 p-3 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <GitBranch className="h-3.5 w-3.5 text-indigo-400" />
              <span>Estrategia de Ramas: Trunk-Based Development</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Ramas efímeras (
              <code className="text-foreground">feature/JIRA-123-slug</code>)
              con un ciclo de vida menor a 48 horas para minimizar conflictos de
              integración en <code className="text-foreground">main</code>.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-semibold text-foreground">
              Reglas de Gatekeeper (CI/CD):
            </span>
            <ul className="space-y-2">
              {prPolicies.map((policy, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{policy}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
