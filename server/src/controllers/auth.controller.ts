import { Request, Response } from 'express';
import * as authService from '../services/auth.service.js';

export const signUp = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await authService.signUp(email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await authService.logIn(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};