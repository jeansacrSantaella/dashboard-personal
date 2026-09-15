export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  if (!username) return [];

  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=10`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    },
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Usuario "${username}" no encontrado.`);
    }
    if (response.status === 403) {
      throw new Error("Límite de peticiones de GitHub excedido temporalmente.");
    }
    throw new Error(`Error en GitHub API: ${response.statusText}`);
  }

  return response.json();
}
