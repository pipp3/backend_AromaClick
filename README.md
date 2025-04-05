# Backend AromaClick

## Descripción
Backend para la aplicación AromaClick, desarrollado con Node.js, Express y TypeScript. Este servidor proporciona una API RESTful para gestionar perfumes y sus características.

## Tecnologías Utilizadas
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)

## Estructura del Proyecto
```
backend_aromaclick/
├── src/
│   ├── api/         # Endpoints de la API
│   ├── config/      # Configuraciones (DB, etc.)
│   ├── controllers/ # Controladores de la lógica de negocio
│   ├── models/      # Modelos de datos (Mongoose)
│   ├── routes/      # Definición de rutas
│   └── index.ts     # Punto de entrada de la aplicación
├── .env             # Variables de entorno
├── package.json     # Dependencias y scripts
└── tsconfig.json    # Configuración de TypeScript
```

## Requisitos Previos
- Node.js (versión recomendada: 18.x o superior)
- MongoDB instalado y ejecutándose localmente
- npm o yarn como gestor de paquetes

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd backend_aromaclick
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/aromaclick
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo con recarga automática
- `npm run build`: Compila el proyecto TypeScript a JavaScript
- `npm start`: Inicia el servidor en modo producción
- `npm run seed`: Ejecuta el script de población inicial de la base de datos

## API Endpoints

### Perfumes
- `GET /api/perfumes`: Obtener todos los perfumes
- `GET /api/perfumes/brand/:brand`: Obtener perfumes filtrados por marca
- `GET /api/perfumes/search`: Buscar perfumes por múltiples criterios
- `GET /api/perfumes/letter/:letter`: Obtener perfumes por la primera letra de su nombre
- `GET /api/perfumes/:id`: Obtener los detalles completos de un perfume específico

## Modelo de Datos

### Perfume
```typescript
{
  name: string;           // Nombre del perfume
  brand: string;          // Marca del perfume
  release_year: string;   // Año de lanzamiento
  concentration: string;  // Concentración del perfume
  main_accords: string[]; // Acordes principales
  top_notes: string[];    // Notas de salida
  middle_notes: string[]; // Notas de corazón
  base_notes: string[];   // Notas de fondo
  perfumers: string[];    // Perfumistas
  url: string;           // URL de la imagen o referencia
}
```

## Contribución
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia
ISC