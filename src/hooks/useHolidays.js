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
  const [refreshToggle, setRefreshToggle] = useState(false); // Para forzar un refetch

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
      // Lanza un error para ser capturado por ErrorBoundary si es un error de renderizado
      // Para errores de red, usamos el estado local `error`
      setError(err.response?.data || "No se pudo obtener la lista de festivos.");
    } finally {
      setLoading(false);
    }
  }, [year, countryCode, refreshToggle]); // Dependencias para reejecutar la llamada

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]); // Se re-ejecuta cuando fetchHolidays cambia (cuando year o countryCode cambian)

  // Función que permite al componente de vista forzar una nueva llamada
  const refetch = () => {
    setRefreshToggle(prev => !prev);
  };

  // El Hook solo devuelve los datos necesarios
  return { holidays, loading, error, refetch };
}