import { Router } from 'express';
import * as permissionController from '../controllers/permission.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 
import { validateRequest, validateParams } from '../middlewares/validator.middleware.js';
import { permissionSchema, permissionParamsSchema } from '../validators/permission.validator.js';

export const permissionRouter = Router();

permissionRouter.post('/permissions', isAuthenticated, validateRequest(permissionSchema), permissionController.createPermission);
permissionRouter.put('/permissions/:id', isAuthenticated, validateParams(permissionParamsSchema), validateRequest(permissionSchema), permissionController.updatePermission);
permissionRouter.delete('/permissions/:id', isAuthenticated, validateParams(permissionParamsSchema), permissionController.deletePermission);
permissionRouter.get('/permissions', isAuthenticated, permissionController.getAllPermissions);
permissionRouter.get('/permissions/:id', isAuthenticated, validateParams(permissionParamsSchema), permissionController.getPermissionById);

