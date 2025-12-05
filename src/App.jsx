// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import Home from './components/Home';
import ErrorBoundary from './components/ErrorBoundary';
import MainLayout from './ui/MainLayout';

function App() {

  return (
    <Router>
      {/* El MainLayout envuelve todo el contenido de la aplicación */}
      <MainLayout> 
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Si agregas más rutas, van aquí */}
            <Route path="*" element={
              <Container sx={{ mt: 5 }}>
                <Typography variant="h4" align="center">404 - Página no encontrada</Typography>
              </Container>
            } />
          </Routes>
        </ErrorBoundary>
      </MainLayout>
    </Router>
  );
}

export default App;