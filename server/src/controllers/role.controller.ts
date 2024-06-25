import { Request, Response } from 'express';
import * as roleService from '../services/role.service.js';

export const createRole = async (req: Request, res: Response) => {
    const { role_name } = req.body;
    try {
        const newRole = await roleService.createRole(role_name);
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role_name } = req.body;
    try {
        const updatedRole = await roleService.updateRole(id, role_name);
        if (!updatedRole) {
            res.status(404).json({ error: `Role with id ${id} not found` });
        } else {
            res.status(200).json(updatedRole);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedRole = await roleService.deleteRole(id);
        if (!deletedRole) {
            res.status(404).json({ error: `Role with id ${id} not found` });
        } else {
            res.status(200).json(deletedRole);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllRoles = async (_req: Request, res: Response) => {
    try {
        const roles = await roleService.getAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRoleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const role = await roleService.getRoleById(id);
        if (!role) {
            res.status(404).json({ error: `Role with id ${id} not found` });
        } else {
            res.status(200).json(role);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
