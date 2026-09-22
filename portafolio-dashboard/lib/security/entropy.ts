/*
La fórmula de entropía de información de Shannon para contraseñas evalúa el tamaño del espacio de búsqueda ($R$ o poolSize) según los conjuntos de caracteres presentes y la longitud de la cadena ($L$):
*/
export interface CharacterPoolBreakdown {
  hasLower: boolean;
  hasUpper: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
}

export type EntropyLevel =
  | "VERY_WEAK"
  | "WEAK"
  | "MODERATE"
  | "STRONG"
  | "VERY_STRONG";

export interface EntropyAnalysis {
  entropyBits: number;
  poolSize: number;
  length: number;
  pool: CharacterPoolBreakdown;
  strength: EntropyLevel;
  crackTimeEstimateSeconds: number; // Suponiendo 10^10 hashes/segundo (ataque GPU local estándar)
}

/**
 * Calcula el tamaño del pool de caracteres y la entropía de Shannon:
 * H = L * log2(R)
 */
export function calculateEntropy(password: string): EntropyAnalysis {
  const length = password.length;

  if (length === 0) {
    return {
      entropyBits: 0,
      poolSize: 0,
      length: 0,
      pool: {
        hasLower: false,
        hasUpper: false,
        hasNumbers: false,
        hasSymbols: false,
      },
      strength: "VERY_WEAK",
      crackTimeEstimateSeconds: 0,
    };
  }

  // 1. Identificación de subconjuntos
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  // Caracteres especiales imprimibles ASCII y espacio
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  // 2. Cálculo del espacio de búsqueda (R)
  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNumbers) poolSize += 10;
  if (hasSymbols) poolSize += 33;

  // 3. Entropía en bits: L * log2(R)
  const entropyBits = poolSize > 0 ? length * Math.log2(poolSize) : 0;
  const roundedEntropy = Number(entropyBits.toFixed(2));

  // 4. Clasificación según estándares NIST / OWASP
  let strength: EntropyLevel = "VERY_WEAK";
  if (roundedEntropy >= 128) {
    strength = "VERY_STRONG";
  } else if (roundedEntropy >= 60) {
    strength = "STRONG";
  } else if (roundedEntropy >= 36) {
    strength = "MODERATE";
  } else if (roundedEntropy >= 28) {
    strength = "WEAK";
  }

  // 5. Espacio de combinaciones: 2^H. Tiempo estimado a 10 GH/s
  const combinations = Math.pow(2, roundedEntropy);
  const hashesPerSecond = 1e10; // 10,000,000,000 intentos/seg
  const crackTimeEstimateSeconds = combinations / (2 * hashesPerSecond); // Promedio 50% de búsqueda

  return {
    entropyBits: roundedEntropy,
    poolSize,
    length,
    pool: {
      hasLower,
      hasUpper,
      hasNumbers,
      hasSymbols,
    },
    strength,
    crackTimeEstimateSeconds,
  };
}
