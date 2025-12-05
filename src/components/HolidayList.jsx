// components/HolidayList.jsx
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// Recibe 'holidays' como prop
function HolidayList({ holidays }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Festivos Encontrados ({holidays.length})
      </Typography>
      <Table aria-label="lista de festivos">
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.light' }}>
            <TableCell sx={{ color: 'white' }}>Fecha</TableCell>
            <TableCell sx={{ color: 'white' }}>Nombre del Festivo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holidays.map((holiday, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {new Date(holiday.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{holiday.name}</TableCell>
              <TableCell>{holiday.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HolidayList;