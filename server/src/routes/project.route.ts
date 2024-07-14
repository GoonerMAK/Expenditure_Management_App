import { Router } from 'express';
import * as projectController from '../controllers/project.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 
import { validateRequest } from '../middlewares/validator.middleware.js';
import { projectSchema } from '../validators/project.validator.js';

export const projectRouter = Router();

projectRouter.post('/projects', isAuthenticated, validateRequest(projectSchema), projectController.createProject);
projectRouter.put('/projects/:id', isAuthenticated, validateRequest(projectSchema), projectController.updateProject);
projectRouter.delete('/projects/:id', isAuthenticated, projectController.deleteProject);
projectRouter.get('/projects', projectController.getAllProjects);
projectRouter.get('/projects/:id', projectController.getProjectById);

