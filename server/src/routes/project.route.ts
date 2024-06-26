import { Router } from 'express';
import * as projectController from '../controllers/project.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 

const router = Router();

router.post('/projects', isAuthenticated, projectController.createProject);
router.put('/projects/:id', isAuthenticated, projectController.updateProject);
router.delete('/projects/:id', isAuthenticated, projectController.deleteProject);
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProjectById);

export default router;
