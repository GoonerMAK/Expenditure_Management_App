import { Request, Response } from 'express';
import * as permissionService from '../services/permission.service.js';

export const createPermission = async (req: Request, res: Response) => {
    const { permission_name } = req.body;
    try {
        const newPermission = await permissionService.createPermission(permission_name);
        res.status(201).json(newPermission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePermission = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { permission_name } = req.body;
    try {
        const updatedPermission = await permissionService.updatePermission(id, permission_name);
        if (!updatedPermission) {
            res.status(404).json({ error: `Permission with id ${id} not found` });
        } else {
            res.status(200).json(updatedPermission);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePermission = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedPermission = await permissionService.deletePermission(id);
        if (!deletedPermission) {
            res.status(404).json({ error: `Permission with id ${id} not found` });
        } else {
            res.status(200).json(deletedPermission);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllPermissions = async (_req: Request, res: Response) => {
    try {
        const permissions = await permissionService.getAllPermissions();
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPermissionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const permission = await permissionService.getPermissionById(id);
        if (!permission) {
            res.status(404).json({ error: `Permission with id ${id} not found` });
        } else {
            res.status(200).json(permission);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
