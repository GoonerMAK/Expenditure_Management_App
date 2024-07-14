import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateRequest = (schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (error) {
        res.status(400).json({ message: error.errors[0].message });
    }
};
