// components/showcase/ComponentViewer.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Code2, Copy, Eye } from "lucide-react";
import { useState } from "react";

interface Props {
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
}

export function ComponentViewer({ title, description, code, children }: Props) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="overflow-hidden border border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-3 bg-muted/30">
        <div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </div>
        <div className="flex items-center gap-1.5">
          {showCode && (
            <button
              onClick={handleCopy}
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copiado" : "Copiar"}
            </button>
          )}
          <button
            onClick={() => setShowCode(!showCode)}
            className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {showCode ? (
              <Eye className="h-3.5 w-3.5" />
            ) : (
              <Code2 className="h-3.5 w-3.5" />
            )}
            {showCode ? "Vista Previa" : "Ver Código"}
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {showCode ? (
          <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs font-mono text-zinc-100">
            <code>{code}</code>
          </pre>
        ) : (
          <div className="flex min-h-[160px] items-center justify-center rounded-lg border border-dashed border-border/80 bg-background/50 p-4">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
