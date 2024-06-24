import { Router } from 'express';
import * as projectController from '../controllers/project.controller.js';

const router = Router();

router.post('/projects', projectController.createProject);
router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProjectById);

export default router;
