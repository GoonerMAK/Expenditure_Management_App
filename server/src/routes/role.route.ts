import { Router } from 'express';
import * as roleController from '../controllers/role.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js'; 

export const roleRouter = Router();

roleRouter.post('/roles', isAuthenticated, roleController.createRole);
roleRouter.put('/roles/:id', isAuthenticated, roleController.updateRole);
roleRouter.delete('/roles/:id', isAuthenticated, roleController.deleteRole);
roleRouter.get('/roles', roleController.getAllRoles);
roleRouter.get('/roles/:id', roleController.getRoleById);
roleRouter.get('/roles/users/by-role', roleController.getUsersByRole);
roleRouter.get('/roles/unassigned/:id', roleController.getUnassignedRolesByUserId);
roleRouter.get('/roles/assigned/:id', roleController.getAssignedRolesByUserId);


