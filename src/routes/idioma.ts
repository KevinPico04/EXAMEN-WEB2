import express from 'express';
import idiomaController from '../controllers/idiomaController';

const router = express.Router();

router.post('/idiomas', idiomaController.createIdioma);
router.get('/idiomas', idiomaController.getAllIdiomas);
router.get('/idiomas/:id', idiomaController.getIdiomaById);
router.put('/idiomas/:id', idiomaController.updateIdioma);
router.delete('/idiomas/:id', idiomaController.deleteIdioma);

export default router;
