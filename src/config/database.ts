import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.MONGODB_URI_TEST 
  : process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('La URI de MongoDB no está definida en las variables de entorno');
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('📦 Conexión a MongoDB establecida con éxito');
    console.log('📂 Base de datos conectadaaa:', mongoose.connection.name);

  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error);
    process.exit(1);
  }
};

// Manejo de eventos de conexión
mongoose.connection.on('disconnected', () => {
  console.log('❌ MongoDB desconectado');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error en la conexión de MongoDB:', err);
}); 