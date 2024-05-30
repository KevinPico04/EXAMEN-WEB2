import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const controlDeIdiomaController = {
  // Crear un nuevo control de idioma
  createControlDeIdioma: async (req: Request, res: Response) => {
    try {
      const nuevoControlDeIdioma = await prisma.controlDeIdioma.create({
        data: req.body,
      });
      res.json(nuevoControlDeIdioma);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el control de idioma' });
    }
  },

  // Obtener todos los controles de idioma
  getAllControlDeIdiomas: async (req: Request, res: Response) => {
    try {
      const controlesDeIdioma = await prisma.controlDeIdioma.findMany();
      res.json(controlesDeIdioma);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los controles de idioma' });
    }
  },

  // Obtener un control de idioma por su ID
  getControlDeIdiomaById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const controlDeIdioma = await prisma.controlDeIdioma.findUnique({
        where: { id: parseInt(id) },
      });
      if (!controlDeIdioma) {
        return res.status(404).json({ error: 'Control de idioma no encontrado' });
      }
      res.json(controlDeIdioma);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el control de idioma' });
    }
  },

  // Actualizar un control de idioma
  updateControlDeIdioma: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const controlDeIdiomaActualizado = await prisma.controlDeIdioma.update({
        where: { id: parseInt(id) },
        data: req.body,
      });
      res.json(controlDeIdiomaActualizado);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el control de idioma' });
    }
  },

  // Eliminar un control de idioma
  deleteControlDeIdioma: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.controlDeIdioma.delete({ where: { id: parseInt(id) } });
      res.json({ message: 'Control de idioma eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el control de idioma' });
    }
  },
};

export default controlDeIdiomaController;
