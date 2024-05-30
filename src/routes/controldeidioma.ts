import express from 'express';
import controlDeIdiomaController from '../controllers/controlDeIdiomaController';

const router = express.Router();

router.post('/controles-de-idioma', controlDeIdiomaController.createControlDeIdioma);
router.get('/controles-de-idioma', controlDeIdiomaController.getAllControlDeIdiomas);
router.get('/controles-de-idioma/:id', controlDeIdiomaController.getControlDeIdiomaById);
router.put('/controles-de-idioma/:id', controlDeIdiomaController.updateControlDeIdioma);
router.delete('/controles-de-idioma/:id', controlDeIdiomaController.deleteControlDeIdioma);

export default router;
