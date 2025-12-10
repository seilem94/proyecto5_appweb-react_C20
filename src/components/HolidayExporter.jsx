// src/components/HolidayExporter.jsx
import { Box, Button, ButtonGroup, Typography, Paper } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TableChartIcon from "@mui/icons-material/TableChart";
import CodeIcon from "@mui/icons-material/Code";
import EventIcon from "@mui/icons-material/Event";

function HolidayExporter({ holidays, countryName, year }) {
  // Exportar como CSV
  const exportToCSV = () => {
    const headers = ["Fecha", "Nombre", "Nombre Local", "Tipo", "Ámbito"];
    const rows = holidays.map((h) => [
      h.date,
      h.name,
      h.localName || h.name,
      h.types?.[0] || "N/A",
      h.global ? "Nacional" : "Regional",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    downloadFile(csvContent, `festivos_${countryName}_${year}.csv`, "text/csv");
  };

  // Exportar como JSON
  const exportToJSON = () => {
    const data = {
      pais: countryName,
      año: year,
      totalFestivos: holidays.length,
      fechaExportacion: new Date().toISOString(),
      festivos: holidays.map((h) => ({
        fecha: h.date,
        nombre: h.name,
        nombreLocal: h.localName,
        tipo: h.types?.[0] || "N/A",
        ambito: h.global ? "Nacional" : "Regional",
        diaSemana: new Date(h.date).toLocaleDateString("es-ES", {
          weekday: "long",
        }),
      })),
    };

    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(
      jsonContent,
      `festivos_${countryName}_${year}.json`,
      "application/json"
    );
  };

  // Exportar como texto simple
  const exportToText = () => {
    const content = [
      `FESTIVOS DE ${countryName.toUpperCase()} - AÑO ${year}`,
      `Total: ${holidays.length} festivos`,
      `Exportado: ${new Date().toLocaleString("es-ES")}`,
      "",
      "=".repeat(60),
      "",
      ...holidays.map((h) => {
        const date = new Date(h.date).toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return `${date}\n   ${h.name}${h.localName && h.localName !== h.name ? ` (${h.localName})` : ""}\n   Tipo: ${h.types?.[0] || "N/A"} | Ámbito: ${h.global ? "Nacional" : "Regional"}\n`;
      }),
    ].join("\n");

    downloadFile(content, `festivos_${countryName}_${year}.txt`, "text/plain");
  };

  // Generar iCal para calendarios (Google Calendar, Outlook, Apple Calendar)
  const exportToICal = () => {
    const icalContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Calendario Global//ES",
      `X-WR-CALNAME:Festivos ${countryName} ${year}`,
      "X-WR-TIMEZONE:UTC",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      ...holidays.map((h) => {
        const date = h.date.replace(/-/g, "");
        const uid = `${h.date}-${h.countryCode}@calendarioglobal.app`;
        return [
          "BEGIN:VEVENT",
          `DTSTART;VALUE=DATE:${date}`,
          `DTEND;VALUE=DATE:${date}`,
          `SUMMARY:${h.name}`,
          `DESCRIPTION:Festivo ${h.global ? "Nacional" : "Regional"} - Tipo: ${h.types?.[0] || "N/A"}${h.localName && h.localName !== h.name ? `\\nNombre local: ${h.localName}` : ""}`,
          `LOCATION:${countryName}`,
          `UID:${uid}`,
          `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
          "STATUS:CONFIRMED",
          "TRANSP:TRANSPARENT",
          "END:VEVENT",
        ].join("\r\n");
      }),
      "END:VCALENDAR",
    ].join("\r\n");

    downloadFile(
      icalContent,
      `festivos_${countryName}_${year}.ics`,
      "text/calendar"
    );
  };

  // Copiar al portapapeles
  const copyToClipboard = () => {
    const text = holidays
      .map((h) => {
        const date = new Date(h.date).toLocaleDateString("es-ES");
        return `${date} - ${h.name}`;
      })
      .join("\n");

    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("✓ Lista copiada al portapapeles");
      })
      .catch(() => {
        alert("✗ Error al copiar al portapapeles");
      });
  };

  // Función helper para descargar archivos
  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!holidays || holidays.length === 0) {
    return null;
  }

  return (
    <Paper
      sx={{
        mt: 3,
        p: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        display="flex"
        alignItems="center"
        gap={1}
      >
        <DownloadIcon /> Exportar Datos
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Descarga los festivos en diferentes formatos o cópialos al portapapeles
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {/* Formatos de datos */}
        <ButtonGroup variant="outlined" size="medium">
          <Button startIcon={<TableChartIcon />} onClick={exportToCSV}>
            CSV
          </Button>
          <Button startIcon={<CodeIcon />} onClick={exportToJSON}>
            JSON
          </Button>
          <Button onClick={exportToText}>TXT</Button>
        </ButtonGroup>

        {/* Calendario */}
        <Button
          variant="contained"
          startIcon={<EventIcon />}
          onClick={exportToICal}
        >
          Calendario (iCal)
        </Button>

        {/* Portapapeles */}
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ContentCopyIcon />}
          onClick={copyToClipboard}
        >
          Copiar
        </Button>
      </Box>

      {/* Información sobre iCal */}
      <Box
        sx={{
          mt: 2,
          p: 1.5,
          bgcolor: "info.lighter",
          borderRadius: 1,
          border: "1px solid",
          borderColor: "info.light",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          💡 El archivo iCal (.ics) puede importarse directamente en Google
          Calendar, Outlook, Apple Calendar y otras aplicaciones de calendario.
        </Typography>
      </Box>
    </Paper>
  );
}

export default HolidayExporter;
