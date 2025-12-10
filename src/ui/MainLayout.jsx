// src/ui/MainLayout.jsx
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function MainLayout({ children, darkMode, onToggleDarkMode }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        bgcolor: "background.default",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Header con gradiente adaptativo */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: isDark
            ? "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%)"
            : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          boxShadow: isDark
            ? "0 4px 20px 0 rgba(0, 0, 0, 0.5)"
            : "0 3px 5px 2px rgba(33, 203, 243, .3)",
          borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <CalendarMonthIcon sx={{ mr: 1.5, fontSize: 32 }} />

          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: "0.5px",
              textShadow: isDark
                ? "2px 2px 4px rgba(0, 0, 0, 0.5)"
                : "1px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            Calendario Global
          </Typography>

          {/* Botón de navegación */}
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              px: 2,
              borderRadius: 2,
              fontWeight: 500,
              "&:hover": {
                bgcolor: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.2)",
                transform: "translateY(-2px)",
                transition: "all 0.2s",
              },
            }}
          >
            Inicio
          </Button>

          {/* Toggle tema oscuro/claro */}
          <Tooltip
            title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            arrow
          >
            <IconButton
              onClick={onToggleDarkMode}
              color="inherit"
              sx={{
                bgcolor: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  bgcolor: isDark
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(255, 255, 255, 0.3)",
                  transform: "rotate(180deg)",
                  transition: "all 0.3s",
                },
              }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Contenido Principal */}
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
          px: { xs: 2, sm: 3 },
        }}
      >
        {children}
      </Container>

      {/* Footer mejorado */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          textAlign: "center",
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: isDark ? "rgba(26, 31, 58, 0.8)" : "background.paper",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Calendario Global
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5, display: "block" }}
        >
          Proyecto React • Powered by Nager.Date API
        </Typography>
      </Box>
    </Box>
  );
}

export default MainLayout;
