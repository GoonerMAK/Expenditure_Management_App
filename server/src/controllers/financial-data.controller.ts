import { Request, Response } from 'express';
import * as financialDataService from '../services/financial-data.service.js';

export const createFinancialData = async (req: Request, res: Response) => {
    const { year, month, expenditure, initial_budget, revised_budget, project_id } = req.body;
    try {
        const financialData = await financialDataService.createFinancialData(year, month, expenditure, initial_budget, revised_budget, project_id);
        res.status(201).json(financialData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateFinancialData = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { year, month, expenditure, initial_budget, revised_budget, project_id } = req.body;
    try {
        const updatedFinancialData = await financialDataService.updateFinancialData(id, year, month, expenditure, initial_budget, revised_budget, project_id);
        if (!updatedFinancialData) {
            res.status(404).json({ error: `Financial data with id ${id} not found` });
        } else {
            res.status(200).json(updatedFinancialData);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteFinancialData = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedFinancialData = await financialDataService.deleteFinancialData(id);
        if (!deletedFinancialData) {
            res.status(404).json({ error: `Financial data with id ${id} not found` });
        } else {
            res.status(200).json(deletedFinancialData);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllFinancialData = async (_req: Request, res: Response) => {
    try {
        const financialData = await financialDataService.getAllFinancialData();
        res.status(200).json(financialData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFinancialDataById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const financialData = await financialDataService.getFinancialDataById(id);
        if (!financialData) {
            res.status(404).json({ error: `Financial data with id ${id} not found` });
        } else {
            res.status(200).json(financialData);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
