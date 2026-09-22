export interface PatternFinding {
  type: "SEQUENCE" | "DATE_YEAR" | "REPETITION" | "KEYBOARD_WALK";
  description: string;
  matched: string;
  length: number;
}

/**
 * Detecta secuencias numéricas o alfabéticas continuas (mínimo 3 caracteres).
 * Ejemplos: "1234", "9876", "abcd", "fedc".
 */
export function detectSequences(password: string): PatternFinding[] {
  const findings: PatternFinding[] = [];
  const normalized = password.toLowerCase();

  let seqCount = 1;
  let diff = 0;

  for (let i = 1; i < normalized.length; i++) {
    const prevChar = normalized.charCodeAt(i - 1);
    const currChar = normalized.charCodeAt(i);
    const currentDiff = currChar - prevChar;

    const isAlphabetical =
      prevChar >= 97 && prevChar <= 122 && currChar >= 97 && currChar <= 122;
    const isNumerical =
      prevChar >= 48 && prevChar <= 57 && currChar >= 48 && currChar <= 57;

    if (
      (isAlphabetical || isNumerical) &&
      (currentDiff === 1 || currentDiff === -1)
    ) {
      if (seqCount === 1 || diff === currentDiff) {
        seqCount++;
        diff = currentDiff;
      } else {
        seqCount = 2;
        diff = currentDiff;
      }
    } else {
      if (seqCount >= 3) {
        const matched = password.slice(i - seqCount, i);
        findings.push({
          type: "SEQUENCE",
          description: `Secuencia detectada: "${matched}"`,
          matched,
          length: seqCount,
        });
      }
      seqCount = 1;
      diff = 0;
    }
  }

  if (seqCount >= 3) {
    const matched = password.slice(normalized.length - seqCount);
    findings.push({
      type: "SEQUENCE",
      description: `Secuencia detectada: "${matched}"`,
      matched,
      length: seqCount,
    });
  }

  return findings;
}

/**
 * Detecta años (1900-2099) y combinaciones comunes de fechas (DDMMAAAA / AAAAMMDD).
 */
export function detectDatesAndYears(password: string): PatternFinding[] {
  const findings: PatternFinding[] = [];

  // Años entre 1900 y 2099
  const yearRegex = /(19\d{2}|20\d{2})/g;
  let match: RegExpExecArray | null;

  while ((match = yearRegex.exec(password)) !== null) {
    findings.push({
      type: "DATE_YEAR",
      description: `Año predecible detectado: "${match[0]}"`,
      matched: match[0],
      length: match[0].length,
    });
  }

  // Formato de fecha compacta de 8 dígitos
  const fullDateRegex =
    /(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])(19\d{2}|20\d{2})/g;
  while ((match = fullDateRegex.exec(password)) !== null) {
    findings.push({
      type: "DATE_YEAR",
      description: `Formato de fecha detectado: "${match[0]}"`,
      matched: match[0],
      length: match[0].length,
    });
  }

  return findings;
}

/**
 * Detecta repeticiones consecutivas del mismo carácter (ej: "aaaa", "111").
 */
export function detectRepetitions(password: string): PatternFinding[] {
  const findings: PatternFinding[] = [];
  const repetitionRegex = /(.)\1{2,}/gi;
  let match: RegExpExecArray | null;

  while ((match = repetitionRegex.exec(password)) !== null) {
    const matched = match[0];
    findings.push({
      type: "REPETITION",
      description: `Repetición de carácter idéntico: "${matched}"`,
      matched,
      length: matched.length,
    });
  }

  return findings;
}

/**
 * Detecta patrones de teclas contiguas en el teclado QWERTY.
 */
export function detectKeyboardWalks(password: string): PatternFinding[] {
  const findings: PatternFinding[] = [];
  const normalized = password.toLowerCase();

  const keyboardRows = ["qwertyuiop", "asdfghjklñ", "zxcvbnm", "1234567890"];

  const reversedRows = keyboardRows.map((row) =>
    row.split("").reverse().join(""),
  );
  const allRows = [...keyboardRows, ...reversedRows];
  const minWalkLength = 3;

  for (const row of allRows) {
    for (let len = minWalkLength; len <= row.length; len++) {
      for (let start = 0; start <= row.length - len; start++) {
        const sub = row.substring(start, start + len);
        if (normalized.includes(sub)) {
          const alreadyCovered = findings.some((f) =>
            f.matched.toLowerCase().includes(sub),
          );
          if (!alreadyCovered) {
            findings.push({
              type: "KEYBOARD_WALK",
              description: `Patrón adyacente de teclado: "${sub}"`,
              matched: sub,
              length: len,
            });
          }
        }
      }
    }
  }

  return findings;
}

/**
 * Ejecuta todos los detectores y consolida los hallazgos.
 */
export function detectAllPatterns(password: string): PatternFinding[] {
  if (!password) return [];

  return [
    ...detectSequences(password),
    ...detectDatesAndYears(password),
    ...detectRepetitions(password),
    ...detectKeyboardWalks(password),
  ];
}
