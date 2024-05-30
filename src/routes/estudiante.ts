import express from 'express';
import estudianteController from '../controllers/estudianteController';

const router = express.Router();

router.post('/estudiantes', estudianteController.createEstudiante);
router.get('/estudiantes', estudianteController.getAllEstudiantes);
router.get('/estudiantes/:id', estudianteController.getEstudianteById);
router.put('/estudiantes/:id', estudianteController.updateEstudiante);
router.delete('/estudiantes/:id', estudianteController.deleteEstudiante);

export default router;
