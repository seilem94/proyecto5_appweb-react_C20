// src/hooks/useCountries.js
import { useState, useEffect } from "react";
import axios from "axios";
import { SAMPLE_COUNTRIES } from "../config/data";

const COUNTRIES_URL = "https://date.nager.at/api/v3/AvailableCountries";
const CACHE_KEY = "nager_countries_cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

/**
 * Custom Hook para obtener la lista de países disponibles
 * Implementa caché en localStorage para evitar llamadas innecesarias
 * @returns {object} { countries, loading, error }
 */
export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // 1. Intentar obtener del caché primero
        const cachedData = localStorage.getItem(CACHE_KEY);

        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const now = Date.now();

          // Si el caché es válido (menos de 24 horas), usarlo
          if (now - timestamp < CACHE_DURATION) {
            setCountries(data);
            setLoading(false);
            return;
          }
        }

        // 2. Si no hay caché válido, hacer la petición
        setLoading(true);
        const response = await axios.get(COUNTRIES_URL);

        // Transformar los datos al formato que necesitamos
        const formattedCountries = response.data.map((country) => ({
          code: country.countryCode,
          name: country.name,
        }));

        // 3. Guardar en caché
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: formattedCountries,
            timestamp: Date.now(),
          })
        );

        setCountries(formattedCountries);
        setError(null);
      } catch (err) {
        console.error("Error al cargar países:", err);
        setError("No se pudo cargar la lista de países");

        // Fallback: Usar la lista básica de datos desacoplada si falla
        setCountries(SAMPLE_COUNTRIES);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);
  return { countries, loading, error };
}
