import { detectAllPatterns, PatternFinding } from "./patterns";

export interface PatternPenaltyDetail extends PatternFinding {
  penalty: number;
}

export interface SecurityScoreAnalysis {
  baseEntropy: number;
  totalPenalty: number;
  adjustedScore: number; // Escala normalizada de 0 a 100
  findings: PatternPenaltyDetail[];
  isCompromisedByPatterns: boolean;
}

/**
 * Asigna la penalización en puntos según el tipo de patrón y su longitud.
 */
function calculateFindingPenalty(finding: PatternFinding): number {
  switch (finding.type) {
    case "SEQUENCE":
      return finding.length * 5; // 5 puntos por cada carácter en secuencia
    case "DATE_YEAR":
      return finding.length === 4 ? 20 : 30; // 20 puntos por año, 30 por fecha completa
    case "REPETITION":
      return finding.length * 6; // 6 puntos por cada carácter repetido
    case "KEYBOARD_WALK":
      return finding.length * 8; // 8 puntos por cada tecla contigua
    default:
      return 0;
  }
}

/**
 * Recibe la contraseña y la entropía cruda para emitir la puntuación ajustada.
 */
export function evaluatePasswordSecurity(
  password: string,
  rawEntropyBits: number,
): SecurityScoreAnalysis {
  if (!password) {
    return {
      baseEntropy: 0,
      totalPenalty: 0,
      adjustedScore: 0,
      findings: [],
      isCompromisedByPatterns: false,
    };
  }

  // 1. Obtener patrones detectados
  const rawFindings = detectAllPatterns(password);

  // 2. Asociar penalizaciones a cada hallazgo
  const findingsWithPenalties: PatternPenaltyDetail[] = rawFindings.map(
    (finding) => ({
      ...finding,
      penalty: calculateFindingPenalty(finding),
    }),
  );

  // 3. Sumar penalización acumulada
  const totalPenalty = findingsWithPenalties.reduce(
    (acc, curr) => acc + curr.penalty,
    0,
  );

  // 4. Normalizar entropía base a una escala 0-100 (tomando 100 bits como el 100%)
  const normalizedEntropyScore = Math.min(
    100,
    Math.round((rawEntropyBits / 100) * 100),
  );

  // 5. Restar penalizaciones (acotado a 0)
  const adjustedScore = Math.max(0, normalizedEntropyScore - totalPenalty);

  // Bandera de compromiso si las penalizaciones son muy severas
  const isCompromisedByPatterns =
    totalPenalty >= 35 || (rawEntropyBits > 60 && adjustedScore < 40);

  return {
    baseEntropy: rawEntropyBits,
    totalPenalty,
    adjustedScore,
    findings: findingsWithPenalties,
    isCompromisedByPatterns,
  };
}
