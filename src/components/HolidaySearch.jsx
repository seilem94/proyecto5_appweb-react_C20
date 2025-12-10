// src/components/HolidaySearch.jsx
import { useState } from "react";
import {
  TextField,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CustomButton from "../ui/CustomButton";
import { useCountries } from "../hooks/useCountries";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

function HolidaySearch({ initialYear, initialCountryCode, onSearch }) {
  const [year, setYear] = useState(initialYear);
  const [countryCode, setCountryCode] = useState(initialCountryCode);

  const {
    countries,
    loading: loadingCountries,
    error: errorCountries,
  } = useCountries();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(year, countryCode);
  };

  const handleQuickRefresh = () => {
    onSearch(year, countryCode);
  };

  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: (theme) => (theme.palette.mode === "dark" ? 3 : 2),
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight={600}>
          Buscar Festivos
        </Typography>

        <Tooltip title="Actualizar resultados">
          <IconButton
            onClick={handleQuickRefresh}
            color="primary"
            size="small"
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(100, 181, 246, 0.1)"
                  : "rgba(33, 150, 243, 0.08)",
              "&:hover": {
                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(100, 181, 246, 0.2)"
                    : "rgba(33, 150, 243, 0.15)",
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={2}>
        {/* Campo Año */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            label="Año"
            type="number"
            fullWidth
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            inputProps={{
              min: 2000,
              max: 2030,
            }}
            helperText={year === currentYear ? "Año actual" : ""}
            required
          />
        </Grid>

        {/* Campo País */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            select
            label="País"
            fullWidth
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            disabled={loadingCountries}
            required
            helperText={errorCountries ? "Usando lista básica" : ""}
          >
            {loadingCountries ? (
              <MenuItem disabled>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Cargando países...
              </MenuItem>
            ) : (
              countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </MenuItem>
              ))
            )}
          </TextField>
        </Grid>

        {/* Botón Buscar */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomButton
            type="submit"
            fullWidth
            size="large"
            sx={{ height: "56px" }}
          >
            <SearchIcon sx={{ mr: 1 }} />
            Buscar
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HolidaySearch;
