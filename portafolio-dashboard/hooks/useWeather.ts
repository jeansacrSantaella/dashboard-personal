import { fetchWeather, WeatherResponse } from "@/lib/api/weather";
import { useQuery } from "@tanstack/react-query";

export function useWeather(lat?: number, lon?: number) {
  return useQuery<WeatherResponse, Error>({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeather(lat!, lon!),
    enabled: lat !== undefined && lon !== undefined, // Solo ejecuta si hay coordenadas válidas
    staleTime: 10 * 60 * 1000, // Datos válidos por 10 minutos
  });
}
