"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CategoryId, LIBRARY_CATEGORIES } from "./library-config";

interface Props {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export function CategoryHub({ activeCategory, onSelectCategory }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
        {LIBRARY_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.title}</span>
              <span
                className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] ${
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-background text-muted-foreground border border-border"
                }`}
              >
                {cat.componentCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tarjetas de Resumen Técnico */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {LIBRARY_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id;

          return (
            <Card
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`cursor-pointer transition-all hover:border-primary/50 ${
                isSelected
                  ? "border-primary ring-1 ring-primary bg-primary/5"
                  : "border-border bg-card/60"
              }`}
            >
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-md ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono font-medium text-muted-foreground">
                    {cat.tagline}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">
                    {cat.title}
                  </h3>
                  <p className="line-clamp-2 text-xs text-muted-foreground mt-0.5">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {cat.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
