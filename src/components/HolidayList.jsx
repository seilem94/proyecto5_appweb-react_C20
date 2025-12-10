// src/components/HolidayList.jsx
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography,
  Chip,
  Box,
  useTheme
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function HolidayList({ holidays }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      'Public': 'success',
      'Bank': 'info',
      'School': 'warning',
      'Authorities': 'secondary',
      'Optional': 'default',
      'Observance': 'primary'
    };
    return colors[type] || 'default';
  };

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        mt: 3, 
        boxShadow: isDark ? 3 : 2,
        border: isDark ? '1px solid' : 'none',
        borderColor: 'divider'
      }}
    >
      {/* Header mejorado */}
      <Box 
        sx={{ 
          p: 2.5, 
          background: isDark 
            ? 'linear-gradient(135deg, rgba(100, 181, 246, 0.15) 0%, rgba(66, 165, 245, 0.15) 100%)'
            : 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: isDark ? 'primary.light' : 'white',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          Festivos Encontrados ({holidays.length})
        </Typography>
      </Box>
      
      <Table aria-label="lista de festivos">
        <TableHead>
          <TableRow 
            sx={{ 
              bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'grey.100'
            }}
          >
            <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
              Fecha
            </TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
              Nombre del Festivo
            </TableCell>
            <TableCell 
              sx={{ 
                fontWeight: 600, 
                fontSize: '0.9rem',
                display: { xs: 'none', md: 'table-cell' } // Ocultar en móvil
              }}
            >
              Tipo
            </TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
              Ámbito
            </TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {holidays.map((holiday, index) => (
            <TableRow
              key={`${holiday.date}-${index}`}
              sx={{ 
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': { 
                  bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'grey.50',
                  transition: 'background-color 0.2s'
                },
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
            >
              <TableCell component="th" scope="row">
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500,
                    color: 'text.primary'
                  }}
                >
                  {formatDate(holiday.date)}
                </Typography>
              </TableCell>
              
              <TableCell>
                <Typography 
                  variant="body1" 
                  fontWeight={500}
                  sx={{ color: 'text.primary' }}
                >
                  {holiday.name}
                </Typography>
                {holiday.localName && holiday.localName !== holiday.name && (
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'text.secondary',
                      display: 'block',
                      mt: 0.5
                    }}
                  >
                    ({holiday.localName})
                  </Typography>
                )}
                {/* Mostrar tipo en móvil como chip pequeño */}
                <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 0.5 }}>
                  <Chip 
                    label={holiday.types?.[0] || 'N/A'} 
                    size="small"
                    color={getTypeColor(holiday.types?.[0])}
                    sx={{
                      height: 20,
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      ...(isDark && {
                        bgcolor: `${theme.palette[getTypeColor(holiday.types?.[0])]?.main}33`,
                        color: theme.palette[getTypeColor(holiday.types?.[0])]?.light,
                        borderColor: theme.palette[getTypeColor(holiday.types?.[0])]?.main,
                        border: '1px solid'
                      })
                    }}
                  />
                </Box>
              </TableCell>
              
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                <Chip 
                  label={holiday.types?.[0] || 'N/A'} 
                  size="small"
                  color={getTypeColor(holiday.types?.[0])}
                  sx={{
                    fontWeight: 500,
                    ...(isDark && {
                      bgcolor: `${theme.palette[getTypeColor(holiday.types?.[0])]?.main}33`,
                      color: theme.palette[getTypeColor(holiday.types?.[0])]?.light,
                      borderColor: theme.palette[getTypeColor(holiday.types?.[0])]?.main,
                      border: '1px solid'
                    })
                  }}
                />
              </TableCell>
              
              <TableCell>
                {holiday.global ? (
                  <Chip 
                    icon={<PublicIcon sx={{ fontSize: '1rem' }} />}
                    label="Nacional" 
                    size="small" 
                    color="success"
                    variant={isDark ? 'outlined' : 'filled'}
                    sx={{
                      fontWeight: 500,
                      ...(isDark && {
                        bgcolor: 'rgba(102, 187, 106, 0.15)',
                        borderColor: 'success.main'
                      })
                    }}
                  />
                ) : (
                  <Chip 
                    icon={<LocationOnIcon sx={{ fontSize: '1rem' }} />}
                    label="Regional" 
                    size="small"
                    variant="outlined"
                    sx={{
                      fontWeight: 500,
                      color: 'text.secondary',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.23)' : 'grey.400'
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HolidayList;