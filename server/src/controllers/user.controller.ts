import { Request, Response } from 'express';
import * as userService from '../services/user.service.js';

export const createUser = async (req: Request, res: Response) => {
    const { username, password, email, name, role_id, age, gender, nationality } = req.body;
    try {
        const newUser = await userService.createUser(username, password, email, name, role_id, age, gender, nationality);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password, email, name, role_id, age, gender, nationality } = req.body;
    try {
        const updatedUser = await userService.updateUser(id, username, password, email, name, role_id, age, gender, nationality);
        if (!updatedUser) {
            res.status(404).json({ error: `User with id ${id} not found` });
        } else {
            res.status(200).json(updatedUser);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedUser = await userService.deleteUser(id);
        if (!deletedUser) {
            res.status(404).json({ error: `User with id ${id} not found` });
        } else {
            res.status(200).json(deletedUser);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        if (!user) {
            res.status(404).json({ error: `User with id ${id} not found` });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
