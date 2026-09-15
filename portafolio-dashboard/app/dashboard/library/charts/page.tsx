"use client";

import { CryptoLineChart } from "@/components/dashboard/cryptoCard";
import { CategoryHub } from "@/components/showcase/CategoryHub";
import { CategoryId } from "@/components/showcase/library-config";
import { LiveAsyncPlayground } from "@/components/showcase/LiveAsyncPlayground";
import { LiveCryptoPlayground } from "@/components/showcase/LiveCryptoPlayground";
import { LiveDonutPlayground } from "@/components/showcase/LiveDonutPlayground";
import { LiveMetricPlayground } from "@/components/showcase/LiveMetricPlayground";
import { LiveRadarPlayground } from "@/components/showcase/LiveRadarPlayground";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function ComponentLibraryPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("charts");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Biblioteca de Componentes
        </h1>
        <p className="text-sm text-muted-foreground">
          Catálogo modular con playgrounds interactivos y código fuente generado
          en tiempo de ejecución.
        </p>
      </div>

      {/* Punto Intermedio Dinámico: Selector de Categorías */}
      <CategoryHub
        activeCategory={activeCategory}
        onSelectCategory={(id) => setActiveCategory(id)}
      />

      {/* Contenido Condicional según la Categoría Seleccionada */}
      <div className="pt-2">
        {activeCategory === "charts" && (
          <div className="space-y-6">
            <LiveDonutPlayground />
            <LiveRadarPlayground />
          </div>
        )}

        {activeCategory === "crypto" && (
          <div className="space-y-8">
            <LiveCryptoPlayground />
            <CryptoLineChart />
          </div>
        )}
        {activeCategory === "tailwind" && (
          <div className="space-y-6">
            <LiveMetricPlayground />
            <LiveAsyncPlayground />
          </div>
        )}

        {activeCategory === "qa-security" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Módulo de Seguridad y Calidad (En Construcción)
                </CardTitle>
                <CardDescription>
                  Matriz de pruebas ISTQB y visualización de postura defensiva.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-32 flex items-center justify-center text-xs text-muted-foreground border-t">
                Próximo componente: Test Execution Matrix & API Health Grid.
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
