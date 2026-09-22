// app/dashboard/security/page.tsx
import { CryptoPlayground } from "@/components/security/CryptoPlayground";
import { PasswordAnalyzer } from "@/components/security/PasswordAnalyzer";
import { SecurityRadarChart } from "@/components/security/SecurityRadarChart";
import { Shield, Terminal } from "lucide-react";

export const metadata = {
  title: "Ciberseguridad | Dashboard",
  description:
    "Auditoría de credenciales, laboratorios criptográficos y postura defensiva.",
};

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-xs font-bold text-emerald-500 flex items-center gap-1">
            <Shield className="h-3 w-3" />
            NIST SP 800-63B / OWASP Benchmark
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Ciberseguridad Defensiva & Criptografía Aplicada
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Laboratorios de ejecución técnica en tiempo real: análisis estático de
          contraseñas, cifrado simétrico autenticado y visualización de postura
          de seguridad.
        </p>
      </div>

      {/* 1. Analizador de Contraseñas */}
      <PasswordAnalyzer />

      {/* 2. Grid de Laboratorio Criptográfico y Radar */}
      <div className="grid gap-6 md:grid-cols-2">
        <CryptoPlayground />
        <SecurityRadarChart />
      </div>

      {/* 3. Ficha Técnica */}
      <div className="rounded-xl border border-border bg-muted/20 p-4 text-xs space-y-3">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <Terminal className="h-4 w-4 text-primary" />
          <span>Criterio Técnico y Privacidad</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 text-muted-foreground">
          <div className="space-y-1">
            <span className="font-medium text-foreground block">
              1. k-Anonymity & Zero-Knowledge
            </span>
            <p>
              Solo viaja un prefijo de 5 caracteres por red; el cotejo ocurre en
              local.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-medium text-foreground block">
              2. Criptografía Autenticada
            </span>
            <p>
              AES-GCM previene ataques de manipulación al verificar el tag MAC
              antes de descifrar.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-medium text-foreground block">
              3. NIST SP 800-63B
            </span>
            <p>
              Priorización de mitigación contra diccionarios y patrones sobre
              reglas rígidas de caracteres.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
