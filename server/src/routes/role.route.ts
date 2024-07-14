import { Router } from 'express';
import * as roleController from '../controllers/role.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 
import { validateRequest } from '../middlewares/validator.middleware.js';
import { roleSchema } from '../validators/role.validator.js';

export const roleRouter = Router();

roleRouter.post('/roles', validateRequest(roleSchema), isAuthenticated, roleController.createRole);
roleRouter.put('/roles/:id', isAuthenticated, validateRequest(roleSchema), roleController.updateRole);
roleRouter.delete('/roles/:id', isAuthenticated, roleController.deleteRole);
roleRouter.get('/roles', roleController.getAllRoles);
roleRouter.get('/roles/:id', roleController.getRoleById);
roleRouter.get('/roles/users/by-role', roleController.getUsersByRole);
roleRouter.get('/roles/unassigned/:id', roleController.getUnassignedRolesByUserId);
roleRouter.get('/roles/assigned/:id', roleController.getAssignedRolesByUserId);


