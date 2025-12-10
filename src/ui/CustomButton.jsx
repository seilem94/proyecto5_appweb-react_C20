// src/ui/CustomButton.jsx
import { Button, useTheme } from '@mui/material';

function CustomButton({ children, onClick, icon, ...props }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Button 
      variant="contained" 
      color="primary" 
      onClick={onClick}
      startIcon={icon}
      sx={{
        fontWeight: 600,
        boxShadow: isDark ? 'none' : 2,
        '&:hover': {
          boxShadow: isDark ? 'none' : 4,
          transform: 'translateY(-2px)',
          transition: 'all 0.2s'
        },
        '&:active': {
          transform: 'translateY(0)'
        },
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default CustomButton;