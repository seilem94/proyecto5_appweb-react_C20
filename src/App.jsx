// App.jsx
import { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import Home from "./components/Home";
import ErrorBoundary from "./components/ErrorBoundary";
import MainLayout from "./ui/MainLayout";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Tema mejorado para modo oscuro
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#64B5F6" : "#2196F3",
            light: darkMode ? "#90CAF9" : "#64B5F6",
            dark: darkMode ? "#42A5F5" : "#1976D2",
          },
          secondary: {
            main: darkMode ? "#81C784" : "#4CAF50",
          },
          background: {
            default: darkMode ? "#0a0e27" : "#f5f5f5",
            paper: darkMode ? "#1a1f3a" : "#ffffff",
          },
          text: {
            primary: darkMode ? "#E8EAED" : "#000000",
            secondary: darkMode ? "#B0B3BA" : "#666666",
          },
          divider: darkMode
            ? "rgba(255, 255, 255, 0.12)"
            : "rgba(0, 0, 0, 0.12)",
          success: {
            main: darkMode ? "#66BB6A" : "#4CAF50",
            light: darkMode ? "rgba(102, 187, 106, 0.2)" : "#C8E6C9",
          },
          info: {
            main: darkMode ? "#29B6F6" : "#2196F3",
            light: darkMode ? "rgba(41, 182, 246, 0.2)" : "#BBDEFB",
          },
          warning: {
            main: darkMode ? "#FFA726" : "#FF9800",
            light: darkMode ? "rgba(255, 167, 38, 0.2)" : "#FFE0B2",
          },
          error: {
            main: darkMode ? "#EF5350" : "#F44336",
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 600,
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
                borderRadius: 12,
                ...(darkMode && {
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }),
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: 8,
                fontWeight: 500,
              },
              contained: {
                boxShadow: darkMode ? "none" : undefined,
                "&:hover": {
                  boxShadow: darkMode ? "none" : undefined,
                },
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                borderBottom: darkMode
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid rgba(0, 0, 0, 0.12)",
              },
              head: {
                fontWeight: 600,
                backgroundColor: darkMode
                  ? "rgba(100, 181, 246, 0.15)"
                  : undefined,
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                fontWeight: 500,
              },
              outlined: {
                borderWidth: 1.5,
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode
                      ? "rgba(255, 255, 255, 0.23)"
                      : undefined,
                  },
                  "&:hover fieldset": {
                    borderColor: darkMode
                      ? "rgba(255, 255, 255, 0.4)"
                      : undefined,
                  },
                },
              },
            },
          },
          MuiAlert: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
        },
      }),
    [darkMode]
  );

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="*"
                element={
                  <Container sx={{ mt: 5, textAlign: "center" }}>
                    <Typography variant="h4" gutterBottom>
                      404 - Página no encontrada
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mt: 2 }}
                    >
                      La página que buscas no existe.
                    </Typography>
                  </Container>
                }
              />
            </Routes>
          </ErrorBoundary>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
