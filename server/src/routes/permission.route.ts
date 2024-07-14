import { Router } from 'express';
import * as permissionController from '../controllers/permission.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 
import { validateRequest } from '../middlewares/validator.middleware.js';
import { permissionSchema } from '../validators/permission.validator.js';

export const permissionRouter = Router();

permissionRouter.post('/permissions', isAuthenticated, validateRequest(permissionSchema), permissionController.createPermission);
permissionRouter.put('/permissions/:id', isAuthenticated, validateRequest(permissionSchema), permissionController.updatePermission);
permissionRouter.delete('/permissions/:id', isAuthenticated, permissionController.deletePermission);
permissionRouter.get('/permissions', permissionController.getAllPermissions);
permissionRouter.get('/permissions/:id', permissionController.getPermissionById);

