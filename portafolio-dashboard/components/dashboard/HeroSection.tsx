// components/dashboard/HeroSection.tsx
"use client";

import { LEADERSHIP_METRICS } from "@/config/portfolio-stats";
import {
  CheckCircle2,
  Cpu,
  ExternalLink,
  FileDown,
  Layers,
  ShieldAlert,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const { deliveredProjects, testCoverage, systemReliability, securityAudit } =
    LEADERSHIP_METRICS;

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card/60 p-6 md:p-8 backdrop-blur-sm">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Disponible para Liderazgo Técnico & Arquitectura de Software
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/cv-jesus-santaella.pdf"
              download
              className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <FileDown className="h-3.5 w-3.5 text-primary" />
              <span>Descargar CV</span>
            </a>
            <a
              href="https://github.com/JeansacrSantaella"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </a>
          </div>
        </div>

        <div className="max-w-3xl space-y-2">
          <div className="space-y-1">
            <span className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Ing. Jesús Santaella · Tech Lead & Software Architect
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Diseño de sistemas escalables, arquitectura defensiva y rigor en
              calidad de software.
            </h1>
          </div>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Especialista en coordinar el ciclo completo de entrega tecnológica
            mediante arquitecturas limpias, integraciones seguras con Docker y
            microservicios, y aseguramiento formal de pruebas (ISTQB /
            OWASP)[cite: 2, 3].
          </p>
        </div>

        {/* 3. Badges de Especialización y Frentes Académicos */}
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            {
              label: "Maestría en Ciberseguridad",
              issuer: "UNIR",
              color: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
            },
            {
              label: "Certified Tester (v4.0)",
              issuer: "ISTQB",
              color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
            },
            {
              label: "Candidate",
              issuer: "ISC²",
              color: "border-sky-500/30 bg-sky-500/10 text-sky-400",
            },
            {
              label: "Core Developer",
              issuer: "Oracle Java SE",
              color: "border-amber-500/30 bg-amber-500/10 text-amber-400",
            },
          ].map((badge) => (
            <span
              key={badge.label}
              className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[11px] font-medium ${badge.color}`}
            >
              <ShieldCheck className="h-3 w-3" />
              <span className="text-muted-foreground font-normal">
                [{badge.issuer}]
              </span>
              <span>{badge.label}</span>
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4 border-t border-border/80">
          <div className="p-3 rounded-lg bg-background/50 border border-border/60">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-medium uppercase">
                {deliveredProjects.label}
              </span>
              <Cpu className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="mt-1 text-xl font-bold tracking-tight text-foreground font-mono">
              +{deliveredProjects.count}
            </div>
            <span className="text-[10px] text-muted-foreground">
              {deliveredProjects.description}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-background/50 border border-border/60">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-medium uppercase">
                {testCoverage.label}
              </span>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            </div>
            <div className="mt-1 text-xl font-bold tracking-tight text-foreground font-mono">
              {testCoverage.percentage}%
            </div>
            <span className="text-[10px] text-muted-foreground">
              {testCoverage.frameworks}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-background/50 border border-border/60">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-medium uppercase">
                {systemReliability.label}
              </span>
              <Layers className="h-3.5 w-3.5 text-indigo-500" />
            </div>
            <div className="mt-1 text-xl font-bold tracking-tight text-foreground font-mono">
              {systemReliability.uptimePercentage}%
            </div>
            <span className="text-[10px] text-muted-foreground">
              {systemReliability.standard}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-background/50 border border-border/60">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-medium uppercase">
                {securityAudit.label}
              </span>
              <ShieldAlert className="h-3.5 w-3.5 text-emerald-500" />
            </div>
            <div className="mt-1 text-xl font-bold tracking-tight text-emerald-500 font-mono">
              {securityAudit.criticalFindings} Críticas
            </div>
            <span className="text-[10px] text-muted-foreground">
              {securityAudit.frameworks}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            href="/dashboard/leadership"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
          >
            <Layers className="h-4 w-4" />
            <span>Ver Arquitecturas & Estimaciones</span>
          </Link>
          <Link
            href="/dashboard/library"
            className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-xs font-semibold text-foreground transition-all hover:bg-muted"
          >
            <Terminal className="h-4 w-4 text-primary" />
            <span>Explorar Biblioteca de Componentes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
