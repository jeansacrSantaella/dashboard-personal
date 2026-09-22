"use client";

import { Calendar, Clock, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export function DashboardFooter({
  email = "jsantaella.jasc@gmail.com",
}: {
  email?: string;
}) {
  const [dateTime, setDateTime] = useState<{
    date: string;
    time: string;
  } | null>(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime({
        date: now.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        time: now.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="mt-auto pt-8 pb-4 border-t border-border/50 text-xs text-muted-foreground">
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-center">
        {/* Fecha */}
        <div className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span>{dateTime ? dateTime.date : "--/--/----"}</span>
        </div>

        <span className="hidden sm:inline text-border">•</span>

        {/* Hora */}
        <div className="inline-flex items-center gap-1.5 font-mono">
          <Clock className="h-3.5 w-3.5 text-primary" />
          <span>{dateTime ? dateTime.time : "--:--:--"}</span>
        </div>

        <span className="hidden sm:inline text-border">•</span>

        {/* Correo */}
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Mail className="h-3.5 w-3.5 text-primary" />
          <span>{email}</span>
        </a>
      </div>
    </footer>
  );
}
