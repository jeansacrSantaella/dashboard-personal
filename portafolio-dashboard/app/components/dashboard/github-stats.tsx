"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, FolderGit2, GitFork, Star } from "lucide-react";
import { useMemo } from "react";
import { GitHubRepo } from "../../lib/api/github";

interface Props {
  repos?: GitHubRepo[];
  isLoading?: boolean;
}

export function GitHubStats({ repos = [], isLoading }: Props) {
  const stats = useMemo(() => {
    if (!repos.length) {
      return {
        totalRepos: 0,
        totalStars: 0,
        topLanguage: "N/A",
        totalForks: 0,
      };
    }

    let totalStars = 0;
    let totalForks = 0;
    const languageCounts: Record<string, number> = {};

    repos.forEach((repo) => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;

      if (!repo.fork && repo.language) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] || 0) + 1;
      }
    });

    const topLanguage =
      Object.entries(languageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "N/A";

    return {
      totalRepos: repos.length,
      totalStars,
      topLanguage,
      totalForks,
    };
  }, [repos]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="p-4 pb-1">
              <div className="h-3 w-16 bg-muted rounded" />
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <div className="h-6 w-12 bg-muted rounded mt-1" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* 1. Total Repos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-3 pb-1">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            Repos Públicos
          </CardTitle>
          <FolderGit2 className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="text-xl font-bold">{stats.totalRepos}</div>
        </CardContent>
      </Card>

      {/* 2. Total Stars */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-3 pb-1">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            Total Stars
          </CardTitle>
          <Star className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="text-xl font-bold">{stats.totalStars}</div>
        </CardContent>
      </Card>

      {/* 3. Lenguaje Principal */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-3 pb-1">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            Lenguaje Top
          </CardTitle>
          <Code2 className="h-4 w-4 text-indigo-500" />
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="text-base font-bold truncate">
            {stats.topLanguage}
          </div>
        </CardContent>
      </Card>

      {/* 4. Total Forks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-3 pb-1">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            Forks Totales
          </CardTitle>
          <GitFork className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="text-xl font-bold">{stats.totalForks}</div>
        </CardContent>
      </Card>
    </div>
  );
}
