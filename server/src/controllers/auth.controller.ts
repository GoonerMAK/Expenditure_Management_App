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
        const { user, token } = await authService.logIn(email, password);

        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000, });

        res.status(200).json({user});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
