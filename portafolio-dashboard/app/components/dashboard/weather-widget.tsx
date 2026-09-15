"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDown, ArrowUp, CloudSun } from "lucide-react";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useWeather } from "../../hooks/useWeather";

export function WeatherWidget() {
  const { coords, loadingGeo } = useGeolocation();
  const { data, isLoading, isError, error } = useWeather(
    coords?.latitude,
    coords?.longitude,
  );

  if (loadingGeo || isLoading) {
    return (
      <div className="text-sm text-muted-foreground p-4">
        Detectando ubicación y clima...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-sm text-destructive p-4">Error: {error.message}</div>
    );
  }

  const todayMax = data?.daily.temperature_2m_max[0];
  const todayMin = data?.daily.temperature_2m_min[0];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-medium">Clima Local</CardTitle>
          <CardDescription className="text-xs">
            Zona horaria: {data?.timezone}
          </CardDescription>
        </div>
        <CloudSun className="h-6 w-6 text-amber-500" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center gap-1 text-sm font-semibold">
            <ArrowUp className="h-4 w-4 text-red-500" />
            Máx: {todayMax}°C
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold">
            <ArrowDown className="h-4 w-4 text-blue-500" />
            Mín: {todayMin}°C
          </div>
        </div>

        {/* Pronóstico extendido para los siguientes días */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-3">
          {data?.daily.time.slice(1, 4).map((date, idx) => (
            <div key={date} className="text-center text-xs">
              <p className="font-medium text-muted-foreground">{date}</p>
              <p className="mt-1">
                {data.daily.temperature_2m_min[idx + 1]}° /{" "}
                {data.daily.temperature_2m_max[idx + 1]}°
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
