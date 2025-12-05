// src/components/HolidaySearch.jsx (usando CustomButton)
import React, { useState } from 'react';
import { TextField, MenuItem, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import CustomButton from '../ui/CustomButton'; // <-- Importar el componente UI
import { SAMPLE_COUNTRIES } from '../config/data';

<Grid item xs={12} sm={4} alignSelf="flex-end">
    {/* Usar el componente UI desacoplado */}
    <CustomButton 
    type="submit" 
    fullWidth 
    size="large"
    >
    Buscar Festivos
    </CustomButton>
</Grid>

function HolidaySearch({ initialYear, initialCountryCode, onSearch }) {
    const [year, setYear] = useState(initialYear);
    const [countryCode, setCountryCode] = useState(initialCountryCode);

  // Manejo de eventos
  const handleSubmit = (event) => {
    event.preventDefault();
    // Llamar a la función prop (onSearch) para pasar los datos al componente padre
    onSearch(year, countryCode);
  };
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Buscar Festivos</Typography>
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                label="Año"
                type="number"
                fullWidth
                value={year}
                // Manejar evento (onChange) y actualizar estado local
                onChange={(e) => setYear(Number(e.target.value))}
                required
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}></Grid>            
                <TextField
                    select
                    label="País"
                    fullWidth
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    required
                >
                    {SAMPLE_COUNTRIES.map((country) => ( // <-- Usar la constante importada
                        <MenuItem key={country.code} value={country.code}>
                            {country.name} ({country.code})
                        </MenuItem>
                    ))}
                </TextField>
                <Grid size={{ xs: 12, sm: 4 }} alignSelf="flex-end">
                    <CustomButton type="submit" fullWidth size="large">
                        Buscar
                    </CustomButton>
                </Grid>
            </Grid>
        </Box>
  );
}

export default HolidaySearch;