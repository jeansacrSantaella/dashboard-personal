import { useQuery } from "@tanstack/react-query";
import { fetchUserRepos, GitHubRepo } from "../lib/api/github";

export function useGitHubRepos(username: string) {
  return useQuery<GitHubRepo[], Error>({
    queryKey: ["githubRepos", username],
    queryFn: () => fetchUserRepos(username),
    enabled: Boolean(username.trim()),
    staleTime: 5 * 60 * 1000, // 5 minutos de caché
  });
}
