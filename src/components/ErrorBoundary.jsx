// components/ErrorBoundary.jsx
import { Component } from 'react';
import { Alert, Typography, Container } from '@mui/material';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Se llama después de que un componente hijo arroja un error
  static getDerivedStateFromError() {
    // Actualiza el estado para que el próximo render muestre la UI de fallback
    return { hasError: true };
  }

  // Se llama después de que un componente hijo arroja un error
  componentDidCatch(error, errorInfo) {
    // Puedes también registrar el error en un servicio de reporte de errores
    console.error("ErrorBoundary ha capturado un error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de usuario de fallback
      return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6">¡Ups! Algo salió mal.</Typography>
            <Typography>
              Ha ocurrido un error inesperado en la interfaz de usuario. Por favor, recarga la página.
            </Typography>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;