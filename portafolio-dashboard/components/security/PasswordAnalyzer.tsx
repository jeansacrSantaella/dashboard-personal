"use client";

import { calculateEntropy, EntropyAnalysis } from "@/lib/security/entropy";
import { checkPwned, PwnedCheckResult } from "@/lib/security/hibp";
import {
  evaluatePasswordSecurity,
  SecurityScoreAnalysis,
} from "@/lib/security/score-evaluator";
import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState, useTransition } from "react";

export function PasswordAnalyzer() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Estados sincrónicos locales (0 ms de latencia)
  const [entropyData, setEntropyData] = useState<EntropyAnalysis | null>(null);
  const [scoreData, setScoreData] = useState<SecurityScoreAnalysis | null>(
    null,
  );

  // Estados asíncronos de red (HIBP k-Anonymity)
  const [hibpResult, setHibpResult] = useState<PwnedCheckResult | null>(null);
  const [isCheckingHibp, setIsCheckingHibp] = useState(false);
  const [, startTransition] = useTransition();

  // Análisis local instantáneo
  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (!value) {
      setEntropyData(null);
      setScoreData(null);
      setHibpResult(null);
      setIsCheckingHibp(false);
      return;
    }

    startTransition(() => {
      const entropy = calculateEntropy(value);
      const score = evaluatePasswordSecurity(value, entropy.entropyBits);
      setEntropyData(entropy);
      setScoreData(score);
    });
  };

  // Chequeo k-Anonymity con debounce de 400ms
  useEffect(() => {
    if (!password) {
      setHibpResult(null);
      setIsCheckingHibp(false);
      return;
    }

    setIsCheckingHibp(true);
    const timer = setTimeout(async () => {
      try {
        const result = await checkPwned(password);
        setHibpResult(result);
      } catch {
        setHibpResult(null);
      } finally {
        setIsCheckingHibp(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [password]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-sky-500";
    if (score >= 40) return "bg-amber-500";
    return "bg-rose-500";
  };

  const score = scoreData
    ? hibpResult?.isPwned
      ? 0
      : scoreData.adjustedScore
    : 0;

  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-6 space-y-5 text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-base">
            Analizador Criptográfico & Auditor de Fugas
          </h3>
        </div>
        <span className="text-[11px] font-mono text-muted-foreground bg-muted/30 px-2 py-0.5 rounded border border-border/50">
          NIST SP 800-63B / HIBP
        </span>
      </div>

      {/* Input de contraseña con toggle de visibilidad */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Ingresar Contraseña a Evaluar
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="Escribe una contraseña (ej. Tr0ub4dor&3 o qwerty2024)..."
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 pr-10 font-mono text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Banner de Garantía Criptográfica / Zero-Knowledge */}
        <div className="flex items-start gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-foreground">
              Procesamiento 100% Client-Side:
            </span>{" "}
            El cómputo de entropía y patrones matemáticos ocurre en la memoria
            local de tu navegador. Para auditar filtraciones se aplica el modelo{" "}
            <strong className="text-foreground">k-Anonymity</strong> (Web Crypto
            API): solo viajan por red los primeros 5 caracteres del hash SHA-1;
            la contraseña real jamás abandona este dispositivo.
          </div>
        </div>
      </div>

      {/* Barra de fortaleza y Score Numérico */}
      {password && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-muted-foreground">
              Puntaje Ajustado por Riesgo:
            </span>
            <span className="font-mono font-bold text-sm">
              {score} / 100
              {hibpResult?.isPwned && (
                <span className="ml-2 text-rose-500 font-bold text-xs">
                  (Anulado por Filtración)
                </span>
              )}
            </span>
          </div>

          <div className="h-2 w-full rounded-full bg-muted/40 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${getScoreColor(score)}`}
              style={{ width: `${score}%` }}
            />
          </div>

          {/* Métricas base instantáneas */}
          {entropyData && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
              <div className="rounded border border-border bg-muted/20 p-2">
                <span className="text-muted-foreground block text-[10px]">
                  Entropía Cruda
                </span>
                <span className="font-bold text-foreground">
                  {entropyData.entropyBits} bits
                </span>
              </div>
              <div className="rounded border border-border bg-muted/20 p-2">
                <span className="text-muted-foreground block text-[10px]">
                  Pool de Caracteres
                </span>
                <span className="font-bold text-foreground">
                  {entropyData.poolSize} elementos
                </span>
              </div>
              <div className="rounded border border-border bg-muted/20 p-2">
                <span className="text-muted-foreground block text-[10px]">
                  Longitud
                </span>
                <span className="font-bold text-foreground">
                  {entropyData.length} caracteres
                </span>
              </div>
              <div className="rounded border border-border bg-muted/20 p-2">
                <span className="text-muted-foreground block text-[10px]">
                  Penalizaciones
                </span>
                <span className="font-bold text-rose-400">
                  -{scoreData?.totalPenalty || 0} pts
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Resultado de HIBP (Chequeo Remoto k-Anonymity) */}
      {password && (
        <div className="rounded-lg border border-border/80 bg-background/50 p-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isCheckingHibp ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-muted-foreground">
                    Consultando Have I Been Pwned vía k-Anonymity...
                  </span>
                </>
              ) : hibpResult?.isPwned ? (
                <>
                  <ShieldAlert className="h-4 w-4 text-rose-500 flex-shrink-0" />
                  <span className="font-bold text-rose-500">
                    Comprometida: Vista{" "}
                    {hibpResult.breachCount.toLocaleString()} veces en
                    filtraciones públicas
                  </span>
                </>
              ) : hibpResult ? (
                <>
                  <ShieldCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span className="font-semibold text-emerald-500">
                    No encontrada en bases de datos de brechas conocidas (HIBP)
                  </span>
                </>
              ) : null}
            </div>

            {hibpResult && !isCheckingHibp && (
              <span className="font-mono text-[10px] text-muted-foreground hidden sm:inline">
                Prefijo SHA-1: {hibpResult.prefix}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Lista de Patrones y Vulnerabilidades Detectadas */}
      {scoreData && scoreData.findings.length > 0 && (
        <div className="space-y-2 border-t border-border pt-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
            <AlertTriangle className="h-4 w-4" />
            <span>
              Patrones Predecibles Detectados ({scoreData.findings.length})
            </span>
          </div>

          <div className="grid gap-2">
            {scoreData.findings.map((finding, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-md border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs"
              >
                <div>
                  <span className="font-medium text-foreground">
                    {finding.description}
                  </span>
                  <span className="block font-mono text-[10px] text-muted-foreground">
                    Patrón: "{finding.matched}"
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-rose-500">
                  -{finding.penalty} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sin hallazgos de patrones */}
      {scoreData && scoreData.findings.length === 0 && password.length >= 8 && (
        <div className="flex items-center gap-2 border-t border-border pt-3 text-xs text-emerald-500">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          <span>
            Sin secuencias obvias, años o patrones de teclado detectados.
          </span>
        </div>
      )}
    </div>
  );
}
