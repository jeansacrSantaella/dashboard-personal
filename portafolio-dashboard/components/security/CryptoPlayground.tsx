"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Key, Lock, Unlock } from "lucide-react";
import { useState } from "react";

export function CryptoPlayground() {
  const [plaintext, setPlaintext] = useState(
    "Mensaje confidencial de auditoría.",
  );
  const [secretKey, setSecretKey] = useState("ClaveSecretaEmpresarial2026!");

  const [encryptedData, setEncryptedData] = useState<{
    ciphertextHex: string;
    ivHex: string;
    saltHex: string;
  } | null>(null);

  const [decryptedText, setDecryptedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Derivación PBKDF2 (NIST SP 800-132)
  async function deriveKey(
    password: string,
    salt: Uint8Array,
  ): Promise<CryptoKey> {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"],
    );

    return window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt as any,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"],
    );
  }

  const handleEncrypt = async () => {
    try {
      setIsProcessing(true);
      setErrorMessage("");
      setDecryptedText("");

      const enc = new TextEncoder();
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const iv = window.crypto.getRandomValues(new Uint8Array(12)); // IV de 96 bits recomendado

      const key = await deriveKey(secretKey, salt);

      const ciphertextBuffer = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        enc.encode(plaintext),
      );

      const toHex = (buf: ArrayBuffer) =>
        Array.from(new Uint8Array(buf))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

      setEncryptedData({
        ciphertextHex: toHex(ciphertextBuffer),
        ivHex: toHex(iv),
        saltHex: toHex(salt),
      });
    } catch (err: any) {
      setErrorMessage(err.message || "Error durante el cifrado.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecrypt = async () => {
    if (!encryptedData) return;

    try {
      setIsProcessing(true);
      setErrorMessage("");

      const fromHex = (hex: string) =>
        new Uint8Array(hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));

      const salt = fromHex(encryptedData.saltHex);
      const iv = fromHex(encryptedData.ivHex);
      const ciphertext = fromHex(encryptedData.ciphertextHex);

      const key = await deriveKey(secretKey, salt);

      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        key,
        ciphertext,
      );

      const dec = new TextDecoder();
      setDecryptedText(dec.decode(decryptedBuffer));
    } catch {
      setErrorMessage(
        "Fallo de integridad: Clave incorrecta o tag MAC alterado.",
      );
      setDecryptedText("");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-emerald-500" />
            <CardTitle className="text-base font-bold">
              Laboratorio AES-256-GCM & PBKDF2
            </CardTitle>
          </div>
          <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-400">
            Web Crypto API
          </span>
        </div>
        <CardDescription className="text-xs">
          Cifrado simétrico autenticado ejecutado localmente en la memoria del
          navegador.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3 text-xs">
          <div>
            <label className="font-medium text-foreground">
              Texto en Claro
            </label>
            <textarea
              rows={2}
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              className="mt-1 w-full rounded border border-input bg-background p-2 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div>
            <label className="font-medium text-foreground">Clave Secreta</label>
            <div className="relative mt-1">
              <input
                type="text"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full rounded border border-input bg-background p-2 pr-8 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <Key className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              PBKDF2: 100,000 iteraciones SHA-256
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleEncrypt}
            disabled={isProcessing || !plaintext}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50"
          >
            <Lock className="h-3.5 w-3.5" />
            <span>Cifrar</span>
          </button>

          <button
            onClick={handleDecrypt}
            disabled={isProcessing || !encryptedData}
            className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-50"
          >
            <Unlock className="h-3.5 w-3.5 text-emerald-500" />
            <span>Descifrar & Validar MAC</span>
          </button>
        </div>

        {encryptedData && (
          <div className="rounded-lg border border-border bg-zinc-950 p-3 space-y-1.5 font-mono text-[11px] text-zinc-200">
            <div>
              <span className="text-emerald-400">Ciphertext + MAC (Hex):</span>
              <p className="break-all text-zinc-400 mt-0.5">
                {encryptedData.ciphertextHex}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-500 pt-1 border-t border-zinc-800">
              <div>IV (96-bit): {encryptedData.ivHex}</div>
              <div>Salt (128-bit): {encryptedData.saltHex}</div>
            </div>
          </div>
        )}

        {decryptedText && (
          <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 p-2.5 text-xs">
            <span className="font-semibold text-emerald-500">
              Texto Descifrado Exitosamente:
            </span>
            <p className="mt-0.5 font-mono text-foreground">{decryptedText}</p>
          </div>
        )}

        {errorMessage && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-2.5 text-xs text-destructive flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
