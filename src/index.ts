import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import perfumeRoutes from './routes/perfumeRoutes';

// Configuración de variables de entorno
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/perfumes', perfumeRoutes);

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.json({ message: '¡API de AromaClick funcionando!' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`⚡️[servidor]: Servidor corriendo en http://localhost:${port}`);
}); 