# Calendario Global - Proyecto React

> Aplicación web moderna para consultar festivos y días feriados de países alrededor del mundo.

## Descripción

**Calendario Global** es una aplicación web desarrollada en React que permite consultar los días festivos de más de 100 países utilizando la API pública de [Nager.Date](https://date.nager.at/).

La aplicación ofrece una interfaz intuitiva y moderna con soporte para modo oscuro, diseño responsive y múltiples funcionalidades para explorar y analizar festivos internacionales.

## Características Actuales

### Core Features

- **Búsqueda de Festivos**: Consulta festivos por año y país
- **100+ Países Soportados**: Lista completa desde la API
- **Vista de Tabla**: Visualización clara y ordenada de resultados
- **Exportación de Datos**: Descarga festivos en múltiples formatos (CSV, JSON, TXT, iCal)
- **Modo Oscuro/Claro**: Toggle entre temas con persistencia
- **Diseño Responsive**: Optimizado para móvil, tablet y desktop
- **Caché Inteligente**: Almacenamiento local para reducir llamadas API
- **Carga Rápida**: Optimización de rendimiento con React Hooks

### Detalles de Información

- **Fecha completa** con día de la semana
- **Nombre del festivo** (inglés + nombre local si disponible)
- **Tipo de festivo** (Public, Bank, School, etc.)
- **Ámbito** (Nacional o Regional)
- **Diseño adaptativo** según tamaño de pantalla

### Exportación de Datos

- **CSV**: Compatible con Excel y Google Sheets
- **JSON**: Formato estructurado para desarrolladores
- **TXT**: Texto plano legible
- **iCal (.ics)**: Importación directa a Google Calendar, Outlook, Apple Calendar
- **Portapapeles**: Copia rápida de la lista de festivos

## Tecnologías Utilizadas

### Frontend

- **React 19.2.1** - Biblioteca principal
- **React Router DOM 7.10.1** - Navegación y routing
- **Material-UI 7.3.6** - Componentes y diseño
- **Material Icons 7.3.6** - Iconografía

### Herramientas de Desarrollo

- **Vite 7.2.4** - Build tool y dev server
- **ESLint 9.39.1** - Linting y calidad de código
- **Prettier 3.7.4** - Formateo de código

### API

- **Axios 1.13.2** - Cliente HTTP
- **Nager.Date API v3** - Fuente de datos de festivos

## Instalación

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/seilem94/proyecto5_appweb-react_C20
cd proyecto5
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar servidor de desarrollo**

```bash
npm run dev
```

4. **Abrir en el navegador**

```
http://localhost:5173
```

## Arquitectura del Proyecto

```
proyecto5/
├── src/
│   ├── components/             # Componentes React
│   │   ├── Home.jsx            # Vista principal
│   │   ├── HolidaySearch.jsx   # Formulario de búsqueda
│   │   ├── HolidayList.jsx     # Tabla de resultados
│   │   ├── HolidayExporter.jsx # Exportación de datos
│   │   └── ErrorBoundary.jsx   # Manejo de errores
│   ├── hooks/                  # Custom Hooks
│   │   ├── useHolidays.js      # Hook para festivos
│   │   └── useCountries.js     # Hook para países
│   ├── ui/                     # Componentes UI reutilizables
│   │   ├── MainLayout.jsx      # Layout principal
│   │   └── CustomButton.jsx    # Botón personalizado
│   ├── config/                 # Configuración
│   │   └── data.js             # Datos estáticos
│   ├── App.jsx                 # Componente raíz
│   └── main.jsx                # Punto de entrada
├── public/                     # Archivos estáticos
├── package.json
└── vite.config.js
```

## API Endpoints Utilizados

### 1. Obtener Lista de Países

```http
GET https://date.nager.at/api/v3/AvailableCountries
```

Retorna todos los países soportados con código ISO 3166-1.

### 2. Obtener Festivos de un País

```http
GET https://date.nager.at/api/v3/PublicHolidays/{year}/{countryCode}
```

Retorna todos los festivos públicos de un país en un año específico.

**Ejemplo de respuesta:**

```json
[
  {
    "date": "2025-01-01",
    "localName": "Año Nuevo",
    "name": "New Year's Day",
    "countryCode": "CL",
    "global": true,
    "types": ["Public"]
  }
]
```

## Funcionalidades Técnicas

### Custom Hooks

#### `useHolidays(year, countryCode)`

Gestiona la obtención de festivos con:

- Validación de parámetros
- Estados de carga y error
- Función de refetch
- Manejo de errores HTTP específicos

#### `useCountries()`

Gestiona la lista de países con:

- Caché en localStorage (24 horas)
- Fallback a lista básica en caso de error
- Transformación de datos al formato requerido

### Manejo de Estado

- **useState**: Estado local de componentes
- **useEffect**: Efectos secundarios y llamadas API
- **useCallback**: Optimización de funciones
- **useMemo**: Optimización del tema MUI

### Caché y Persistencia

- **localStorage**: Persistencia de tema y datos de países
- **Duración**: 24 horas para lista de países
- **Estrategia**: Cache-first con fallback

### Exportación de Datos

- **Blob API**: Creación de archivos en el navegador
- **URL.createObjectURL**: Generación de URLs para descarga
- **Clipboard API**: Copia al portapapeles
- **iCalendar RFC 5545**: Formato estándar de calendario

## Temas y Estilos

### Modo Oscuro

- Fondo: `#0a0e27` (profundo)
- Papel: `#1a1f3a` (contraste)
- Primario: `#64B5F6` (azul claro)
- Bordes sutiles con transparencia

### Modo Claro

- Fondo: `#f5f5f5`
- Papel: `#ffffff`
- Primario: `#2196F3`
- Material Design estándar

### Responsive Breakpoints

- **xs**: < 600px (móvil)
- **sm**: 600px - 900px (tablet)
- **md**: 900px - 1200px (desktop)
- **lg**: > 1200px (desktop grande)

## Próximas Funcionalidades Planificadas

### En Desarrollo

- [ ] Próximos Festivos - Cuenta regresiva y notificaciones
- [ ] Estadísticas y Análisis - Gráficos y insights

### Futuro

- [ ] Comparador de Países - Comparación lado a lado
- [ ] Vista de Calendario - Visualización mensual tipo calendario
- [ ] Filtros Avanzados - Por mes, tipo, ámbito
- [ ] Mapa Interactivo - Selección visual de países
- [ ] Favoritos - Guardar búsquedas frecuentes
- [ ] Notificaciones - Recordatorios de festivos próximos

### Endpoints API Adicionales a Explorar

```http
# Información detallada del país
GET /api/v3/CountryInfo/{countryCode}

# Fines de semana largos
GET /api/v3/LongWeekend/{year}/{countryCode}

# ¿Es día festivo hoy?
GET /api/v3/IsTodayPublicHoliday/{countryCode}

# Próximo festivo
GET /api/v3/NextPublicHolidays/{countryCode}
```

## Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo

# Producción
npm run build        # Construir para producción
npm run preview      # Previsualizar build de producción

# Calidad de Código
npm run lint         # Ejecutar ESLint
```

## Manejo de Errores

La aplicación incluye múltiples capas de manejo de errores:

1. **ErrorBoundary**: Captura errores de renderizado React
2. **Try-Catch en Hooks**: Manejo de errores de API
3. **Estados de Error**: UI específica para cada tipo de error
4. **Fallbacks**: Datos por defecto cuando falla la API

## Aprendizajes del Proyecto

### Conceptos de React

- Componentes funcionales con Hooks
- Custom Hooks para lógica reutilizable
- Context API (a través de Theme Provider)
- Error Boundaries con componentes de clase
- Composición de componentes
- Props drilling y levantamiento de estado

### Optimización

- Memorización con useMemo y useCallback
- Code splitting con React.lazy (preparado)
- Caché de datos
- Debouncing (preparado para filtros)

### Buenas Prácticas

- Separación de responsabilidades
- Componentes reutilizables
- Manejo consistente de errores
- Código limpio y legible
- Nomenclatura clara

## Licencia

Este proyecto fue desarrollado como parte del módulo de React en un curso de desarrollo web fullstack impartido por la UDD, Chile.

## Autor

Salem Hidd P.  
Desarrollado como proyecto educativo - Diciembre 2025

---

**Versión actual:** 1.0.0  
**Estado:** Funcional con exportación de datos  
**Última actualización:** Diciembre 2025
