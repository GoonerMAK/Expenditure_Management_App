import { Router } from 'express';
import * as permissionController from '../controllers/permission.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 

export const permissionRouter = Router();

permissionRouter.post('/permissions', isAuthenticated, permissionController.createPermission);
permissionRouter.put('/permissions/:id', isAuthenticated, permissionController.updatePermission);
permissionRouter.delete('/permissions/:id', isAuthenticated, permissionController.deletePermission);
permissionRouter.get('/permissions', permissionController.getAllPermissions);
permissionRouter.get('/permissions/:id', permissionController.getPermissionById);

