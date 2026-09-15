"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, GitFork, Loader2, Search, Star } from "lucide-react";
import { useState } from "react";
import { GitHubRepo } from "../../lib/api/github";

interface Props {
  repos?: GitHubRepo[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  currentUsername: string;
  onSearch: (newUsername: string) => void;
}

export function GitHubRepoList({
  repos,
  isLoading,
  isFetching,
  isError,
  error,
  currentUsername,
  onSearch,
}: Props) {
  const [inputVal, setInputVal] = useState(currentUsername);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
    }
  };

  return (
    <div className="space-y-4">
      {/* Buscador reactivo */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-sm">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Usuario de GitHub..."
          className="flex-1 px-3 py-2 text-sm rounded-md border bg-background border-input focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:opacity-90 transition-opacity"
        >
          {isFetching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          Buscar
        </button>
      </form>

      {/* Estados */}
      {isLoading && (
        <div className="text-sm text-muted-foreground p-4">
          Cargando repositorios...
        </div>
      )}

      {isError && (
        <div className="text-sm text-destructive p-4">
          Error: {error?.message}
        </div>
      )}

      {/* Grilla de Repositorios */}
      <div className="grid gap-4 md:grid-cols-2">
        {repos?.map((repo) => (
          <Card key={repo.id} className="flex flex-col justify-between">
            <CardHeader className="pb-2">
              <CardTitle className="text-base truncate font-semibold">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1 text-primary"
                >
                  {repo.name}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </CardTitle>
              <CardDescription className="line-clamp-2 text-xs mt-1">
                {repo.description || "Sin descripción proporcionada."}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                {repo.language && (
                  <span className="font-medium text-foreground">
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-500" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="h-3.5 w-3.5" />
                  {repo.forks_count}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}

        {repos && repos.length === 0 && (
          <p className="text-sm text-muted-foreground col-span-2">
            El usuario no tiene repositorios públicos disponibles.
          </p>
        )}
      </div>
    </div>
  );
}
