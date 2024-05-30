import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const idiomaController = {
  // Crear un nuevo idioma
  createIdioma: async (req: Request, res: Response) => {
    try {
      const nuevoIdioma = await prisma.idioma.create({
        data: req.body,
      });
      res.json(nuevoIdioma);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el idioma' });
    }
  },

  // Obtener todos los idiomas
  getAllIdiomas: async (req: Request, res: Response) => {
    try {
      const idiomas = await prisma.idioma.findMany();
      res.json(idiomas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los idiomas' });
    }
  },

  // Obtener un idioma por su ID
  getIdiomaById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const idioma = await prisma.idioma.findUnique({
        where: { id: parseInt(id) },
      });
      if (!idioma) {
        return res.status(404).json({ error: 'Idioma no encontrado' });
      }
      res.json(idioma);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el idioma' });
    }
  },

  // Actualizar un idioma
  updateIdioma: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const idiomaActualizado = await prisma.idioma.update({
        where: { id: parseInt(id) },
        data: req.body,
      });
      res.json(idiomaActualizado);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el idioma' });
    }
  },

  // Eliminar un idioma
  deleteIdioma: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.idioma.delete({ where: { id: parseInt(id) } });
      res.json({ message: 'Idioma eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el idioma' });
    }
  },
};

export default idiomaController;
