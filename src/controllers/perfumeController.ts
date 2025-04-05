import { Request, Response } from 'express';
import Perfume from '../models/perfumes/Perfume';

/**
 * Obtiene todos los perfumes de la base de datos con paginación
 * @param req - Objeto de solicitud Express
 * @param res - Objeto de respuesta Express
 */
export const getAllPerfumes = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('🔍 Iniciando búsqueda de perfumes...');
    const page = parseInt(req.query.page as string) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    console.log(`📄 Página solicitada: ${page}, Límite: ${limit}, Skip: ${skip}`);

    const [perfumes, total] = await Promise.all([
      Perfume.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('name brand concentration url'),
      Perfume.countDocuments()
    ]);
    
    
    res.status(200).json({
      success: true,
      count: perfumes.length,
      totalPerfumes: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: perfumes
    });
  } catch (error) {
    console.error('❌ Error al obtener perfumes:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los perfumes',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
}; 

/**
 * Obtiene perfumes filtrados por marca
 * @param req - Objeto de solicitud Express
 * @param res - Objeto de respuesta Express
 */
export const getPerfumesByBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('🔍 Iniciando búsqueda de perfumes por marca...');
    const { brand } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    console.log(`🏷️ Marca solicitada: ${brand}, Página: ${page}, Límite: ${limit}, Skip: ${skip}`);

    const [perfumes, total] = await Promise.all([
      Perfume.find({ brand: { $regex: new RegExp(brand, 'i') } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('name brand concentration url'),
      Perfume.countDocuments({ brand: { $regex: new RegExp(brand, 'i') } })
    ]);

    res.status(200).json({
      success: true,
      count: perfumes.length,
      totalPerfumes: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      brand: brand,
      data: perfumes
    });
  } catch (error) {
    console.error('❌ Error al obtener perfumes por marca:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los perfumes por marca',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

/**
 * Busca perfumes por nombre o marca
 * @param req - Objeto de solicitud Express
 * @param res - Objeto de respuesta Express
 */
export const searchPerfumes = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('🔍 Iniciando búsqueda de perfumes...');
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    // Obtener el término de búsqueda
    const searchTerm = req.query.q as string;
    
    if (!searchTerm || searchTerm.trim() === '') {
      res.status(200).json({
        success: true,
        count: 0,
        totalPerfumes: 0,
        currentPage: page,
        totalPages: 0,
        data: []
      });
      return;
    }
    
    // Construir el filtro de búsqueda solo para nombre y marca
    const filter = {
      $or: [
        { name: { $regex: new RegExp(searchTerm, 'i') } },
        { brand: { $regex: new RegExp(searchTerm, 'i') } }
      ]
    };
    
    const [perfumes, total] = await Promise.all([
      Perfume.find(filter)
        .sort({ name: 1 }) // Ordenar por nombre por defecto
        .skip(skip)
        .limit(limit)
        .select('name brand concentration url'), // Seleccionar solo campos relevantes
      Perfume.countDocuments(filter)
    ]);
    
    res.status(200).json({
      success: true,
      count: perfumes.length,
      totalPerfumes: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      searchTerm: searchTerm,
      data: perfumes
    });
  } catch (error) {
    console.error('❌ Error al buscar perfumes:', error);
    res.status(500).json({
      success: false,
      message: 'Error al buscar perfumes',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

/**
 * Obtiene perfumes por la primera letra de su nombre
 * @param req - Objeto de solicitud Express
 * @param res - Objeto de respuesta Express
 */
export const getPerfumesByFirstLetter = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('🔍 Iniciando búsqueda de perfumes por primera letra...');
    const { letter } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // Validar que el parámetro sea una sola letra
    if (!letter || letter.length !== 1 || !/^[a-zA-Z]$/.test(letter)) {
      res.status(400).json({
        success: false,
        message: 'Se requiere una sola letra como parámetro'
      });
      return;
    }

    console.log(`🔤 Letra solicitada: ${letter}, Página: ${page}, Límite: ${limit}, Skip: ${skip}`);

    // Crear expresión regular que coincida con la primera letra (insensible a mayúsculas/minúsculas)
    const regex = new RegExp(`^${letter}`, 'i');
    
    const [perfumes, total] = await Promise.all([
      Perfume.find({ name: regex })
        .sort({ name: 1 }) // Ordenar alfabéticamente por nombre
        .skip(skip)
        .limit(limit)
        .select('name brand concentration url'),
      Perfume.countDocuments({ name: regex })
    ]);

    res.status(200).json({
      success: true,
      count: perfumes.length,
      totalPerfumes: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      letter: letter,
      data: perfumes
    });
  } catch (error) {
    console.error('❌ Error al obtener perfumes por primera letra:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los perfumes por primera letra',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

/**
 * Obtiene los detalles completos de un perfume específico
 * @param req - Objeto de solicitud Express
 * @param res - Objeto de respuesta Express
 */
export const getPerfumeById = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('🔍 Iniciando búsqueda de detalles de perfume...');
    const { id } = req.params;

    // Validar que el ID sea válido
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      res.status(400).json({
        success: false,
        message: 'ID de perfume inválido'
      });
      return;
    }

    console.log(`🆔 ID solicitado: ${id}`);

    const perfume = await Perfume.findById(id);

    if (!perfume) {
      res.status(404).json({
        success: false,
        message: 'Perfume no encontrado'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: perfume
    });
  } catch (error) {
    console.error('❌ Error al obtener detalles del perfume:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los detalles del perfume',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
}; 