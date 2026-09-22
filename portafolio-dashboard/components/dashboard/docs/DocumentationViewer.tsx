"use client";

import { ARCHITECTURE_DOCS, DocTopic } from "@/config/docs-data";
import {
  ArrowUpRight,
  BookOpen,
  Calculator,
  ExternalLink,
  FlaskConical,
  Layers,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function DocumentationViewer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = [
    "ALL",
    "Seguridad",
    "DevSecOps",
    "QA & Pruebas",
    "Arquitectura",
    "Estimación",
  ];

  const filteredDocs = ARCHITECTURE_DOCS.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.keyConcepts.some((c) =>
        c.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "ALL" || doc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: DocTopic["category"]) => {
    switch (category) {
      case "Seguridad":
        return <ShieldCheck className="h-4 w-4 text-emerald-500" />;
      case "DevSecOps":
        return <Zap className="h-4 w-4 text-amber-500" />;
      case "QA & Pruebas":
        return <FlaskConical className="h-4 w-4 text-sky-500" />;
      case "Arquitectura":
        return <Layers className="h-4 w-4 text-indigo-500" />;
      case "Estimación":
        return <Calculator className="h-4 w-4 text-purple-500" />;
      default:
        return <BookOpen className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por concepto (ej. k-Anonymity, COSMIC, AES)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat === "ALL" ? "Todos" : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredDocs.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 space-y-4 hover:border-primary/40 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/40 px-2.5 py-0.5 text-[11px] font-medium text-foreground border border-border/50">
                  {getCategoryIcon(item.category)}
                  {item.category}
                </span>

                <Link
                  href={item.implementedIn}
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-primary hover:underline"
                >
                  <span>Probar en vivo</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>

              <h3 className="text-base font-bold text-foreground leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-border/60">
              <div className="flex flex-wrap gap-1.5">
                {item.keyConcepts.map((concept, cIdx) => (
                  <span
                    key={cIdx}
                    className="rounded bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground border border-border/40"
                  >
                    {concept}
                  </span>
                ))}
              </div>
              {item.externalUrl && (
                <div className="flex justify-end pt-1">
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>Especificación Oficial</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
          No se encontraron temas o conceptos que coincidan con la búsqueda.
        </div>
      )}
    </div>
  );
}
