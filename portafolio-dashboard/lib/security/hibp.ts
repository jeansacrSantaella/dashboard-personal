// lib/security/hibp.ts

export interface PwnedCheckResult {
  isPwned: boolean;
  breachCount: number;
  sha1Hash: string;
  prefix: string;
  suffix: string;
}

/**
 * Calcula el hash SHA-1 de un texto utilizando la Web Crypto API nativa.
 * Devuelve el hash en formato hexadecimal y en mayúsculas.
 */
async function computeSha1(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await window.crypto.subtle.digest("SHA-1", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

/**
 * Consulta la API de Have I Been Pwned mediante k-Anonymity para determinar
 * si la contraseña ha aparecido en filtraciones de datos públicas.
 */
export async function checkPwned(password: string): Promise<PwnedCheckResult> {
  if (!password) {
    return {
      isPwned: false,
      breachCount: 0,
      sha1Hash: "",
      prefix: "",
      suffix: "",
    };
  }

  // 1. Calcula SHA-1 con Web Crypto API
  const sha1Hash = await computeSha1(password);

  // 2. Extrae prefijo (primeros 5 caracteres) y sufijo (resto del hash)
  const prefix = sha1Hash.substring(0, 5);
  const suffix = sha1Hash.substring(5);

  try {
    // 3. Petición GET al endpoint /range/{prefix} (sin API key, CORS habilitado)
    const response = await fetch(
      `https://api.pwnedpasswords.com/range/${prefix}`,
      {
        method: "GET",
        headers: {
          "Add-Padding": "true", // Cabecera de HIBP para mitigar análisis de tráfico por tamaño
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `HIBP API error: ${response.status} ${response.statusText}`,
      );
    }

    // 4. Parsea el texto plano línea por línea (formato SUFIJO:CANTIDAD)
    const responseText = await response.text();
    const lines = responseText.split("\n");

    let breachCount = 0;

    for (const line of lines) {
      const [hashSuffix, countStr] = line.trim().split(":");

      // Compara el sufijo local contra los devueltos por el servidor
      if (hashSuffix === suffix) {
        breachCount = parseInt(countStr, 10) || 0;
        break;
      }
    }

    // 5. Devuelve si fue vulnerada y el total de apariciones encontradas
    return {
      isPwned: breachCount > 0,
      breachCount,
      sha1Hash,
      prefix,
      suffix,
    };
  } catch (error) {
    console.error("Error al consultar Have I Been Pwned:", error);
    return {
      isPwned: false,
      breachCount: 0,
      sha1Hash,
      prefix,
      suffix,
    };
  }
}
