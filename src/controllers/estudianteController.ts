import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const estudianteController = {
  // Crear un nuevo estudiante
  createEstudiante: async (req: Request, res: Response) => {
    try {
      const nuevoEstudiante = await prisma.estudiante.create({
        data: req.body,
      });
      res.json(nuevoEstudiante);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el estudiante' });
    }
  },

  // Obtener todos los estudiantes
  getAllEstudiantes: async (req: Request, res: Response) => {
    try {
      const estudiantes = await prisma.estudiante.findMany();
      res.json(estudiantes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los estudiantes' });
    }
  },

  // Obtener un estudiante por su ID
  getEstudianteById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const estudiante = await prisma.estudiante.findUnique({
        where: { id: parseInt(id) },
      });
      if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
      }
      res.json(estudiante);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el estudiante' });
    }
  },

  // Actualizar un estudiante
  updateEstudiante: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const estudianteActualizado = await prisma.estudiante.update({
        where: { id: parseInt(id) },
        data: req.body,
      });
      res.json(estudianteActualizado);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el estudiante' });
    }
  },

  // Eliminar un estudiante
  deleteEstudiante: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.estudiante.delete({ where: { id: parseInt(id) } });
      res.json({ message: 'Estudiante eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el estudiante' });
    }
  },
};

export default estudianteController;
