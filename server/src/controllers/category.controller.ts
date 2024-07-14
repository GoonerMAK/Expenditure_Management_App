import { Request, Response } from 'express';
import * as categoryService from '../services/category.service.js';
import { Category, CategoryParams } from '../validators/category.validator.js';

export const createCategory = async (req: Request<unknown, unknown, Category, unknown>, res: Response) => {
    const { category_name } = req.body;
    try {
        const category = await categoryService.createCategory(category_name);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCategory = async (req: Request<CategoryParams, unknown, Category, unknown>, res: Response) => {
    const { id } = req.params;
    const { category_name } = req.body;
    try {
        const updatedCategory = await categoryService.updateCategory(id, category_name);
        if (!updatedCategory) {
            res.status(404).json({ error: `Category with id ${id} not found` });
        } else {
            res.status(200).json(updatedCategory);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCategory = async (req: Request<CategoryParams, unknown, unknown, unknown>, res: Response) => {
    const { id } = req.params;
    try {
        const deletedCategory = await categoryService.deleteCategory(id);
        if (!deletedCategory) {
            res.status(404).json({ error: `Category with id ${id} not found` });
        } else {
            res.status(200).json(deletedCategory);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllCategories = async (_req: Request<unknown, unknown, unknown, unknown>, res: Response) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCategoryById = async (req: Request<CategoryParams, unknown, unknown, unknown>, res: Response) => {
    const { id } = req.params;
    try {
        const category = await categoryService.getCategoryById(id);
        if (!category) {
            res.status(404).json({ error: `Category with id ${id} not found` });
        } else {
            res.status(200).json(category);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
