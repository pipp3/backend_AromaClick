import express from 'express';
import { getAllPerfumes, getPerfumesByBrand, searchPerfumes, getPerfumesByFirstLetter, getPerfumeById } from '../controllers/perfumeController';

const router = express.Router();

/**
 * @route   GET /api/perfumes
 * @desc    Obtener todos los perfumes
 * @access  Público
 */
router.get('/', getAllPerfumes);

/**
 * @route   GET /api/perfumes/brand/:brand
 * @desc    Obtener perfumes filtrados por marca
 * @access  Público
 */
router.get('/brand/:brand', getPerfumesByBrand);

/**
 * @route   GET /api/perfumes/search
 * @desc    Buscar perfumes por múltiples criterios
 * @access  Público
 */
router.get('/search', searchPerfumes);

/**
 * @route   GET /api/perfumes/letter/:letter
 * @desc    Obtener perfumes por la primera letra de su nombre
 * @access  Público
 */
router.get('/letter/:letter', getPerfumesByFirstLetter);

/**
 * @route   GET /api/perfumes/:id
 * @desc    Obtener los detalles completos de un perfume específico
 * @access  Público
 */
router.get('/:id', getPerfumeById);

export default router; 