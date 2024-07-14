import { Router } from 'express';
import * as roleController from '../controllers/role.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 
import { validateRequest, validateParams } from '../middlewares/validator.middleware.js';
import { roleSchema, roleParamsSchema } from '../validators/role.validator.js';

export const roleRouter = Router();

roleRouter.post('/roles', validateRequest(roleSchema), isAuthenticated, roleController.createRole);
roleRouter.put('/roles/:id', isAuthenticated, validateParams(roleParamsSchema), validateRequest(roleSchema), roleController.updateRole);
roleRouter.delete('/roles/:id', isAuthenticated, validateParams(roleParamsSchema), roleController.deleteRole);
roleRouter.get('/roles', isAuthenticated, roleController.getAllRoles);
roleRouter.get('/roles/:id', isAuthenticated, validateParams(roleParamsSchema), roleController.getRoleById);
roleRouter.get('/roles/users/by-role', isAuthenticated, roleController.getUsersByRole);
roleRouter.get('/roles/unassigned/:id', isAuthenticated, validateParams(roleParamsSchema), roleController.getUnassignedRolesByUserId);
roleRouter.get('/roles/assigned/:id', isAuthenticated, validateParams(roleParamsSchema), roleController.getAssignedRolesByUserId);


