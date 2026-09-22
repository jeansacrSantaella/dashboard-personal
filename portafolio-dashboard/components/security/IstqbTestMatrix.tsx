"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Filter, FlaskConical } from "lucide-react";
import { useState } from "react";

export interface TestCase {
  id: string;
  technique:
    | "Equivalence Partitioning"
    | "Boundary Value Analysis"
    | "State Transition"
    | "White Box / Branch";
  feature:
    | "Password Entropy"
    | "Pattern Detection"
    | "AES-256-GCM"
    | "HIBP k-Anonymity";
  inputCondition: string;
  expectedResult: string;
  actualStatus: "PASSED" | "FAILED" | "BLOCKED";
  coverageType: string;
}

const TEST_CASES: TestCase[] = [
  {
    id: "TC-ISTQB-01",
    technique: "Equivalence Partitioning",
    feature: "Password Entropy",
    inputCondition:
      "Cadena compuesta exclusivamente por minúsculas ('abcdefgh')",
    expectedResult:
      "Pool size evaluado en exactamente 26 caracteres; entropía ~37.6 bits",
    actualStatus: "PASSED",
    coverageType: "Caja Negra (Partición Válida)",
  },
  {
    id: "TC-ISTQB-02",
    technique: "Boundary Value Analysis",
    feature: "Password Entropy",
    inputCondition: "Límite inferior: cadena vacía (L = 0)",
    expectedResult:
      "Pool = 0, Entropía = 0 bits, sin divisiones por cero o NaN",
    actualStatus: "PASSED",
    coverageType: "Caja Negra (Valor Frontera 0)",
  },
  {
    id: "TC-ISTQB-03",
    technique: "Boundary Value Analysis",
    feature: "Pattern Detection",
    inputCondition:
      "Secuencia continua en el umbral exacto: 'abc' (L = 3) vs 'ab' (L = 2)",
    expectedResult:
      "Detecta patrón en L=3 (penaliza -15 pts); ignora secuencias en L=2",
    actualStatus: "PASSED",
    coverageType: "Caja Negra (Valor Límite L=3)",
  },
  {
    id: "TC-ISTQB-04",
    technique: "State Transition",
    feature: "HIBP k-Anonymity",
    inputCondition:
      "Transición: Entrada de texto -> Debounce 400ms -> Petición HTTP -> Parsing",
    expectedResult:
      "Cancelación de peticiones previas sin carreras de estado (race conditions)",
    actualStatus: "PASSED",
    coverageType: "Pruebas de Transición de Estados",
  },
  {
    id: "TC-ISTQB-05",
    technique: "White Box / Branch",
    feature: "AES-256-GCM",
    inputCondition:
      "Manipulación de 1 solo bit en el Ciphertext antes del descifrado",
    expectedResult:
      "Excepción en crypto.subtle.decrypt por falla de integridad en Tag MAC",
    actualStatus: "PASSED",
    coverageType: "Caja Blanca (Branch Coverage 100%)",
  },
  {
    id: "TC-ISTQB-06",
    technique: "Equivalence Partitioning",
    feature: "Pattern Detection",
    inputCondition: "Años fuera del rango heurístico ('1899' y '2100')",
    expectedResult:
      "No clasificados como año crítico; sin penalización errónea",
    actualStatus: "PASSED",
    coverageType: "Caja Negra (Partición Inválida)",
  },
];

export function IstqbTestMatrix() {
  const [selectedTechnique, setSelectedTechnique] = useState<string>("ALL");

  const techniques = [
    "ALL",
    "Equivalence Partitioning",
    "Boundary Value Analysis",
    "State Transition",
    "White Box / Branch",
  ];

  const filteredTests = TEST_CASES.filter((tc) =>
    selectedTechnique === "ALL" ? true : tc.technique === selectedTechnique,
  );

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-primary" />
            <CardTitle className="text-base font-bold">
              Matriz de Cobertura y Pruebas ISTQB v4.0
            </CardTitle>
          </div>
          <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-primary border border-primary/20">
            100% Casos Superados (6/6)
          </span>
        </div>
        <CardDescription className="text-xs">
          Diseño sistemático de pruebas de software: técnicas de caja negra,
          análisis de valores límite y validación estructural.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-1.5 border-b border-border pb-3">
          <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
          {techniques.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTechnique(tech)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                selectedTechnique === tech
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {tech === "ALL" ? "Todas las Técnicas" : tech}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground border-b border-border font-mono text-[11px]">
              <tr>
                <th className="p-2.5">ID / Módulo</th>
                <th className="p-2.5">Técnica Formal</th>
                <th className="p-2.5">Condición de Entrada</th>
                <th className="p-2.5">Resultado Esperado</th>
                <th className="p-2.5 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredTests.map((tc) => (
                <tr key={tc.id} className="hover:bg-muted/10 transition-colors">
                  <td className="p-2.5 align-top">
                    <span className="font-mono font-bold text-foreground block">
                      {tc.id}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {tc.feature}
                    </span>
                  </td>
                  <td className="p-2.5 align-top">
                    <span className="rounded bg-muted/30 px-1.5 py-0.5 text-[10px] font-mono text-foreground border border-border/50">
                      {tc.technique}
                    </span>
                    <span className="block text-[10px] text-muted-foreground mt-0.5">
                      {tc.coverageType}
                    </span>
                  </td>
                  <td className="p-2.5 font-mono text-muted-foreground align-top">
                    {tc.inputCondition}
                  </td>
                  <td className="p-2.5 text-muted-foreground align-top">
                    {tc.expectedResult}
                  </td>
                  <td className="p-2.5 text-center align-top">
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-500">
                      <CheckCircle2 className="h-3 w-3" />
                      {tc.actualStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
