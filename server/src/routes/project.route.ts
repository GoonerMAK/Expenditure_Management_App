import { Router } from 'express';
import * as projectController from '../controllers/project.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 

export const projectRouter = Router();

projectRouter.post('/projects', isAuthenticated, projectController.createProject);
projectRouter.put('/projects/:id', isAuthenticated, projectController.updateProject);
projectRouter.delete('/projects/:id', isAuthenticated, projectController.deleteProject);
projectRouter.get('/projects', projectController.getAllProjects);
projectRouter.get('/projects/:id', projectController.getProjectById);

