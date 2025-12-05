// src/components/Home.jsx 
import React, { useState } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useHolidays } from '../hooks/useHolidays'; // Importar el Custom Hook
import HolidaySearch from './HolidaySearch'; // Componente de formulario
import HolidayList from './HolidayList'; // Componente de lista

function Home() {
    const [searchParams, setSearchParams] = useState({
    year: new Date().getFullYear(),
    countryCode: 'CL',
  });

    const { holidays, loading, error } = useHolidays(
    searchParams.year,
    searchParams.countryCode
  );

  const handleSearch = (newYear, newCountryCode) => {
    setSearchParams({ year: newYear, countryCode: newCountryCode });
  };

  return (
    <Box>
      {/* Pasar el manejador de eventos como prop */}
      <HolidaySearch
        initialYear={searchParams.year}
        initialCountryCode={searchParams.countryCode}
        onSearch={handleSearch}
      />
      
      {/* Lógica de renderizado simple */}
      {loading && <Box display="flex" justifyContent="center" mt={3}><CircularProgress /></Box>}
      
      {error && <Alert severity="error" sx={{ mt: 3 }}>Error: {error}</Alert>}
      
      {!loading && !error && (
        holidays.length > 0 ? (
          <HolidayList holidays={holidays} />
        ) : (
          <Alert severity="info" sx={{ mt: 3 }}>
            No se encontraron festivos para los parámetros seleccionados o el país no está soportado.
          </Alert>
        )
      )}
    </Box>
  );
}

export default Home;