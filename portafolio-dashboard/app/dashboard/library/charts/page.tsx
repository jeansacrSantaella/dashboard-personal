"use client";

import { CryptoLineChart } from "@/components/dashboard/cryptoCard";
import { CategoryHub } from "@/components/showcase/CategoryHub";
import { CategoryId } from "@/components/showcase/library-config";
import { LiveAsyncPlayground } from "@/components/showcase/LiveAsyncPlayground";
import { LiveCryptoPlayground } from "@/components/showcase/LiveCryptoPlayground";
import { LiveDonutPlayground } from "@/components/showcase/LiveDonutPlayground";
import { LiveMetricPlayground } from "@/components/showcase/LiveMetricPlayground";
import LiveMetricSecurity from "@/components/showcase/LiveMetricSecurity";
import { LiveRadarPlayground } from "@/components/showcase/LiveRadarPlayground";
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

      <CategoryHub
        activeCategory={activeCategory}
        onSelectCategory={(id) => setActiveCategory(id)}
      />

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
            <LiveMetricSecurity />
          </div>
        )}
      </div>
    </div>
  );
}
