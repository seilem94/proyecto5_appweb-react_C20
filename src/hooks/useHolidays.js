// src/hooks/useHolidays.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BASE_URL = 'https://date.nager.at/api/v3/PublicHolidays';

/**
 * Custom Hook para gestionar la obtención de festivos.
 * @param {number} year - El año de búsqueda.
 * @param {string} countryCode - El código del país.
 * @returns {object} { holidays, loading, error, refetch }
 */
export function useHolidays(year, countryCode) {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función de llamada a la API con useCallback para estabilidad
  const fetchHolidays = useCallback(async () => {
    // Validar entradas básicas
    if (!year || !countryCode) {
      setHolidays([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${BASE_URL}/${year}/${countryCode}`);
      setHolidays(response.data);
    } catch (err) {
      console.error("Error al obtener los festivos:", err);
      
      // Manejar diferentes tipos de errores
      if (err.response?.status === 404) {
        setError("No se encontraron festivos para este país/año");
      } else if (err.response?.status === 400) {
        setError("Parámetros inválidos");
      } else {
        setError("No se pudo obtener la lista de festivos. Intenta nuevamente.");
      }
      
      setHolidays([]);
    } finally {
      setLoading(false);
    }
  }, [year, countryCode]); // Ahora refreshToggle está en las dependencias

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);


  return { holidays, loading, error };
}