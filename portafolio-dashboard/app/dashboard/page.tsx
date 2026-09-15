"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  BrickWallShield,
  FolderKanban,
  Home,
  Library,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { CryptoLineChart } from "../components/dashboard/cryptoCard";
import { GitHubLanguagesChart } from "../components/dashboard/github-languages-chart";
import { GitHubRepoList } from "../components/dashboard/github-repo-list";
import { WeatherWidget } from "../components/dashboard/weather-widget";
import { useGitHubRepos } from "../hooks/useGitHubRepos";

const navItems = [
  { title: "Inicio", url: "/dashboard", icon: Home },
  { title: "Biblioteca", url: "/dashboard/daily", icon: Library },
  { title: "Seguridad", url: "/dashboard/infinite", icon: BrickWallShield },
  { title: "Proyectos", url: "/dashboard/settings", icon: FolderKanban },
];

export default function Dashboard() {
  // Estado que coordina ambos componentes
  const [username, setUsername] = useState("jeansacrsantaella");

  // Única petición centralizada
  const {
    data: repos,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGitHubRepos(username);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              JS
            </div>
            <span>ING. Jesús Santaella</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-4">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="h-10 px-3 py-2 text-sm">
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">dev_user_1</span>
                </div>
                <LogOut className="h-4 w-4 text-muted-foreground" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 p-6 space-y-6">
        <SidebarTrigger />

        <div>
          <h1 className="text-2xl font-bold">Panel Principal</h1>
          <p className="text-muted-foreground">Bienvenido a la plataforma.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <CryptoLineChart />
          <WeatherWidget />
        </div>

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
            {/* Donut Chart: Reactivo a los repositorios actuales */}
            <div className="md:col-span-1">
              <GitHubLanguagesChart
                repos={repos}
                isLoading={isLoading}
                currentUsername={username}
              />
            </div>

            {/* Lista con Input: Modifica el username compartido */}
            <div className="md:col-span-2">
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
        </div>
      </main>
    </SidebarProvider>
  );
}
