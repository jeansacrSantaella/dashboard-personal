"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  BrickWallShield,
  FolderKanban,
  Home,
  Layers,
  Library,
  Settings,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { title: "Inicio", url: "/dashboard", icon: Home },
  { title: "Biblioteca", url: "/dashboard/library/charts", icon: Library },
  {
    title: "Liderazgo & Arquitectura",
    url: "/dashboard/leadership",
    icon: Layers,
  },
  { title: "Seguridad", url: "/dashboard/security", icon: BrickWallShield },
  { title: "Proyectos", url: "/dashboard/proyectos", icon: FolderKanban },
  { title: "Configuración", url: "/dashboard/settings", icon: Settings },
  { title: "Documentación", url: "/dashboard/docs", icon: BookOpen },
];

export function AppSidebar() {
  return (
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
    </Sidebar>
  );
}
