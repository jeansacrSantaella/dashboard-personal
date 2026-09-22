import { AppSidebar } from "@/components/app-sidebar";
import { DashboardFooter } from "@/components/dashboard-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-6 flex flex-col min-h-screen">
        <div className="flex items-center justify-between">
          <SidebarTrigger />
          <ThemeToggle />
        </div>

        {/* Contenido dinámico */}
        <div className="flex-1 space-y-6">{children}</div>

        {/* Pie centrado con fecha, hora y correo */}
        <DashboardFooter email="jsantaella.jasc@gmail.com" />
      </main>
    </SidebarProvider>
  );
}
