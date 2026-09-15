"use client";

import { AlertCircle, Check, Loader2 } from "lucide-react";
import { useState } from "react";

export interface AsyncActionButtonProps {
  label: string;
  onClick: () => Promise<void>;
  successMessage?: string;
  errorMessage?: string;
  variant?: "primary" | "destructive" | "secondary";
  size?: "sm" | "md" | "lg";
}

export function AsyncActionButton({
  label,
  onClick,
  successMessage = "Completado",
  errorMessage = "Error en la acción",
  variant = "primary",
  size = "md",
}: AsyncActionButtonProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleClick = async () => {
    if (status === "loading") return;
    setStatus("loading");
    try {
      await onClick();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  }[variant];

  const sizeStyles = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  }[size];

  return (
    <button
      onClick={handleClick}
      disabled={status === "loading"}
      className={`relative inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all shadow-sm ${variantStyles} ${sizeStyles} disabled:pointer-events-none disabled:opacity-60`}
    >
      {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
      {status === "success" && <Check className="h-4 w-4 text-emerald-400" />}
      {status === "error" && <AlertCircle className="h-4 w-4 text-rose-400" />}

      <span>
        {status === "loading" && "Procesando..."}
        {status === "success" && successMessage}
        {status === "error" && errorMessage}
        {status === "idle" && label}
      </span>
    </button>
  );
}
