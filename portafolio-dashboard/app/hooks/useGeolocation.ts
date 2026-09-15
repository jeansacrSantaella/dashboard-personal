"use client";

import { useEffect, useState } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

// Coordenadas por defecto (ejemplo: Ciudad de México)
const DEFAULT_COORDS: Coordinates = {
  latitude: 19.4326,
  longitude: -99.1332,
};

export function useGeolocation() {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [loadingGeo, setLoadingGeo] = useState<boolean>(true);
  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setGeoError("Geolocalización no soportada en el navegador");
      setCoords(DEFAULT_COORDS);
      setLoadingGeo(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoadingGeo(false);
      },
      (err) => {
        setGeoError(err.message);
        setCoords(DEFAULT_COORDS); // Usa el fallback si el usuario rechaza permisos
        setLoadingGeo(false);
      },
      { timeout: 8000 },
    );
  }, []);

  return { coords, loadingGeo, geoError };
}
