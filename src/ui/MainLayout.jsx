// src/ui/MainLayout.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function MainLayout({ children }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* 1. Navbar / Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Calendario Global 📅
          </Typography>
          {/* Botones de navegación (si añades más rutas) */}
          <Button color="inherit" component={Link} to="/">
            Inicio
          </Button>
          {/* Opcional: Podrías añadir un botón de "Acerca de" si creas otra ruta */}
        </Toolbar>
      </AppBar>

      {/* 2. Contenido Principal */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children} {/* Aquí se renderizarán las rutas (Home.jsx, etc.) */}
      </Container>
    </Box>
  );
}

export default MainLayout;