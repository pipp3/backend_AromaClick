import mongoose, { Schema, Document } from 'mongoose';

// Interfaz para el documento de perfume
export interface IPerfume extends Document {
  name: string;
  brand: string;
  release_year: string;
  concentration: string;
  main_accords: string[];
  top_notes: string[];
  middle_notes: string[];
  base_notes: string[];
  perfumers: string[];
  url: string;
}

// Esquema del perfume
const PerfumeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  release_year: {
    type: String,
    required: true
  },
  concentration: {
    type: String,
    required: true
  },
  main_accords: {
    type: [String],
    default: [],
    validate: {
      validator: function(v: string[]) {
        return Array.isArray(v);
      },
      message: 'main_accords debe ser un array'
    }
  },
  top_notes: {
    type: [String],
    default: [],
    validate: {
      validator: function(v: string[]) {
        return Array.isArray(v);
      },
      message: 'top_notes debe ser un array'
    }
  },
  middle_notes: {
    type: [String],
    default: [],
    validate: {
      validator: function(v: string[]) {
        return Array.isArray(v);
      },
      message: 'middle_notes debe ser un array'
    }
  },
  base_notes: {
    type: [String],
    default: [],
    validate: {
      validator: function(v: string[]) {
        return Array.isArray(v);
      },
      message: 'base_notes debe ser un array'
    }
  },
  perfumers: {
    type: [String],
    default: [],
    validate: {
      validator: function(v: string[]) {
        return Array.isArray(v);
      },
      message: 'perfumers debe ser un array'
    }
  },
  url: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: 'perfumes'
});

// Índices para mejorar el rendimiento de las búsquedas
PerfumeSchema.index({ name: 1 });
PerfumeSchema.index({ brand: 1 });
PerfumeSchema.index({ release_year: 1 });

export default mongoose.model<IPerfume>('Perfume', PerfumeSchema); 