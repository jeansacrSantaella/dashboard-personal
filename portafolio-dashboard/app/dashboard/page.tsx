"use client";

import { CryptoLineChart } from "@/components/dashboard/cryptoCard";
import { GitHubLanguagesChart } from "@/components/dashboard/github-languages-chart";
import { GitHubRepoList } from "@/components/dashboard/github-repo-list";
import { GitHubStats } from "@/components/dashboard/github-stats";
import { WeatherWidget } from "@/components/dashboard/weather-widget";
import { useGitHubRepos } from "@/hooks/useGitHubRepos";
import { useState } from "react";

export default function DashboardPage() {
  const [username, setUsername] = useState("jeansacrsantaella");

  const {
    data: repos,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGitHubRepos(username);

  return (
    <div className="space-y-6">
      {/* Sección Portafolio */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            Portafolio Técnico
          </h2>
          <p className="text-sm text-muted-foreground">
            Métricas de proyectos públicos y actividad de código para:{" "}
            <b>{username}</b>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <GitHubLanguagesChart
              repos={repos}
              isLoading={isLoading}
              currentUsername={username}
            />
            <div className="mt-6">
              <GitHubStats repos={repos} isLoading={isLoading} />
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <GitHubRepoList
              repos={repos}
              isLoading={isLoading}
              isFetching={isFetching}
              isError={isError}
              error={error}
              currentUsername={username}
              onSearch={(newUsername) => setUsername(newUsername)}
            />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold">Panel Principal</h1>
          <p className="text-muted-foreground">Bienvenido a la plataforma.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <CryptoLineChart />
          <WeatherWidget />
        </div>
      </div>
    </div>
  );
}
