import { Router } from 'express';
import * as categoryController from '../controllers/category.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 
import { validateRequest } from '../middlewares/validator.middleware.js';
import { categorySchema } from '../validators/category.validator.js';

export const categoryRouter = Router();

categoryRouter.post('/categories', isAuthenticated, validateRequest(categorySchema), categoryController.createCategory);
categoryRouter.put('/categories/:id', isAuthenticated, validateRequest(categorySchema), categoryController.updateCategory);
categoryRouter.delete('/categories/:id', isAuthenticated, categoryController.deleteCategory);
categoryRouter.get('/categories', categoryController.getAllCategories);
categoryRouter.get('/categories/:id', categoryController.getCategoryById);

