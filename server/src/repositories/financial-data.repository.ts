import prisma from '../db.js';
import { FinancialData } from '@prisma/client';

export const createFinancialData = async (
    year: number,
    month: number,
    expenditure?: number,
    initial_budget?: number,
    revised_budget?: number,
    project_id?: string
) => {
    return await prisma.financialData.create({
        data: {
            year,
            month,
            expenditure,
            initial_budget,
            revised_budget,
            project: {
                connect:{
                    id: project_id
                }
            }
        },
    });
};

export const updateFinancialData = async (
    id: string,
    year?: number,
    month?: number,
    expenditure?: number,
    initial_budget?: number,
    revised_budget?: number,
    project_id?: string
) => {
    const data: any = {};
    if (year !== undefined) data.year = year;
    if (month !== undefined) data.month = month;
    if (expenditure !== undefined) data.expenditure = expenditure;
    if (initial_budget !== undefined) data.initial_budget = initial_budget;
    if (revised_budget !== undefined) data.revised_budget = revised_budget;
    if (project_id !== undefined) data.project_id = project_id;

    return await prisma.financialData.update({
        where: { id },
        data,
    });
};

export const deleteFinancialData = async (id: string) => {
    return await prisma.financialData.delete({
        where: { id },
    });
};

export const getAllFinancialData = async () => {
    return await prisma.financialData.findMany();
};

export const getFinancialDataById = async (id: string) => {
    return await prisma.financialData.findUnique({
        where: { id },
    });
};
