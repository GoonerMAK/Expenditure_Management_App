import { Router } from 'express';
import * as categoryController from '../controllers/category.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 

export const categoryRouter = Router();

categoryRouter.post('/categories', isAuthenticated, categoryController.createCategory);
categoryRouter.put('/categories/:id', isAuthenticated, categoryController.updateCategory);
categoryRouter.delete('/categories/:id', isAuthenticated, categoryController.deleteCategory);
categoryRouter.get('/categories', categoryController.getAllCategories);
categoryRouter.get('/categories/:id', categoryController.getCategoryById);

