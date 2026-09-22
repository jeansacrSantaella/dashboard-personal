export interface PwnedCheckResult {
  isPwned: boolean;
  breachCount: number;
  sha1Hash: string;
  prefix: string; // Primeros 5 caracteres enviados a HIBP (k-Anonymity)
  suffix: string; // Restante del hash comparado en local
}

/**
 * 1. Calcula el hash SHA-1 de una cadena usando la Web Crypto API nativa.
 * Devuelve el hash en mayúsculas para empatar con el estándar de HIBP.
 */
export async function sha1Native(text: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(text);

  // Primitiva nativa del navegador
  const hashBuffer = await window.crypto.subtle.digest("SHA-1", data);

  // Conversión del buffer a cadena hexadecimal en mayúsculas
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

  return hashHex;
}

/**
 * 2. Verifica si la contraseña ha sido filtrada mediante el modelo k-Anonymity de HIBP.
 * Solo se envían por red los primeros 5 caracteres del hash SHA-1.
 * La comparación del sufijo ocurre localmente en el cliente.
 */
export async function checkPwnedPassword(
  password: string,
): Promise<PwnedCheckResult> {
  if (!password) {
    return {
      isPwned: false,
      breachCount: 0,
      sha1Hash: "",
      prefix: "",
      suffix: "",
    };
  }

  // 1. Obtener SHA-1 completo
  const fullHash = await sha1Native(password);
  const prefix = fullHash.slice(0, 5);
  const suffix = fullHash.slice(5);

  try {
    // 2. Consulta de rango (k-Anonymity)
    // HIBP devuelve una lista de sufijos coincidentes con el prefijo enviado
    const response = await fetch(
      `https://api.pwnedpasswords.com/range/${prefix}`,
      {
        method: "GET",
        headers: {
          "Add-Padding": "true", // Mitiga ataques de análisis de longitud de respuesta
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error en la consulta HIBP: ${response.statusText}`);
    }

    const textData = await response.text();
    const lines = textData.split("\n");

    let breachCount = 0;

    // 3. Búsqueda local del sufijo
    for (const line of lines) {
      const [lineSuffix, countStr] = line.trim().split(":");
      if (lineSuffix === suffix) {
        breachCount = parseInt(countStr, 10);
        break;
      }
    }

    return {
      isPwned: breachCount > 0,
      breachCount,
      sha1Hash: fullHash,
      prefix,
      suffix,
    };
  } catch (error) {
    console.error("Fallo al verificar contra Have I Been Pwned:", error);
    // En caso de fallo de red o modo offline, devolvemos fallo controlado
    return {
      isPwned: false,
      breachCount: 0,
      sha1Hash: fullHash,
      prefix,
      suffix,
    };
  }
}
