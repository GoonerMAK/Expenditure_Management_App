import { Request, Response } from 'express';
import * as projectService from '../services/project.service.js';

export const createProject = async (req: Request, res: Response) => {
    const { project_name, description, category_id, start_date, end_date, created_by_id } = req.body;
    try {
        const newProject = await projectService.createProject(
            project_name,
            description,
            category_id,
            start_date,
            end_date,
            created_by_id
        );
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { project_name, description, category_id, start_date, end_date, created_by_id } = req.body;
    try {
        const updatedProject = await projectService.updateProject(
            id,
            project_name,
            description,
            category_id,
            start_date,
            end_date,
            created_by_id
        );
        if (!updatedProject) {
            res.status(404).json({ error: `Project with id ${id} not found` });
        } else {
            res.status(200).json(updatedProject);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedProject = await projectService.deleteProject(id);
        if (!deletedProject) {
            res.status(404).json({ error: `Project with id ${id} not found` });
        } else {
            res.status(200).json(deletedProject);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllProjects = async (_req: Request, res: Response) => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const project = await projectService.getProjectById(id);
        if (!project) {
            res.status(404).json({ error: `Project with id ${id} not found` });
        } else {
            res.status(200).json(project);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
