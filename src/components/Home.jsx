// src/components/Home.jsx 
import { useState } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useHolidays } from '../hooks/useHolidays';
import { useCountries } from '../hooks/useCountries';
import HolidaySearch from './HolidaySearch';
import HolidayList from './HolidayList';
import HolidayExporter from './HolidayExporter';

function Home() {
  const [searchParams, setSearchParams] = useState({
    year: new Date().getFullYear(),
    countryCode: 'CL',
  });

  const { holidays, loading, error } = useHolidays(
    searchParams.year,
    searchParams.countryCode
  );

  const { countries } = useCountries();

  const handleSearch = (newYear, newCountryCode) => {
    setSearchParams({ year: newYear, countryCode: newCountryCode });
  };

  // Obtener nombre del país actual
  const getCountryName = () => {
    const country = countries.find(c => c.code === searchParams.countryCode);
    return country ? country.name : searchParams.countryCode;
  };

  return (
    <Box>
      {/* Formulario de búsqueda */}
      <HolidaySearch
        initialYear={searchParams.year}
        initialCountryCode={searchParams.countryCode}
        onSearch={handleSearch}
      />
      
      {/* Estado de carga */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      )}
      
      {/* Mensajes de error */}
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          Error: {error}
        </Alert>
      )}
      
      {/* Resultados */}
      {!loading && !error && (
        <>
          {holidays.length > 0 ? (
            <>
              <HolidayList holidays={holidays} />
              
              {/* Exportador - Solo se muestra si hay resultados */}
              <HolidayExporter 
                holidays={holidays}
                countryName={getCountryName()}
                year={searchParams.year}
              />
            </>
          ) : (
            <Alert severity="info" sx={{ mt: 3 }}>
              No se encontraron festivos para los parámetros seleccionados o el país no está soportado.
            </Alert>
          )}
        </>
      )}
    </Box>
  );
}

export default Home;