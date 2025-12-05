// src/ui/CustomButton.jsx
import { Button } from '@mui/material';

function CustomButton({ children, onClick, ...props }) {
  return (
    <Button 
      variant="contained" 
      color="primary" 
      onClick={onClick} 
      {...props}
    >
      {children}
    </Button>
  );
}

export default CustomButton;