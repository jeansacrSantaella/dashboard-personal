"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const SECURITY_POSTURE_DATA = [
  { domain: "Autenticación & Acceso", score: 95, benchmark: 80 },
  { domain: "Criptografía en Reposo", score: 90, benchmark: 75 },
  { domain: "Seguridad de Red", score: 85, benchmark: 85 },
  { domain: "Integridad de Código (SAST)", score: 92, benchmark: 70 },
  { domain: "Gestión de Vulnerabilidades", score: 88, benchmark: 80 },
];

export function SecurityRadarChart() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
          <CardTitle className="text-base font-bold">
            Radar de Postura Defensiva (ISC² / OWASP)
          </CardTitle>
        </div>
        <CardDescription className="text-xs">
          Cumplimiento en controles técnicos frente al estándar de la industria.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={SECURITY_POSTURE_DATA}>
              <PolarGrid stroke="#3f3f46" />
              <PolarAngleAxis
                dataKey="domain"
                tick={{ fill: "#a1a1aa", fontSize: 10 }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#52525b" />
              <Radar
                name="Postura Actual"
                dataKey="score"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.4}
              />
              <Radar
                name="Benchmark Industria"
                dataKey="benchmark"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.15}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex justify-center gap-6 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Nivel Implementado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            <span>Umbral Industria</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
