import { z } from "zod";

export const projectSchema = z.object({
    project_name: z.string().min(3, { message: "Project name must be at least 3 characters long" }),
    description: z.string().optional(),
    category_id: z.string().uuid().optional(),
    category_name: z.string().optional(),
    start_date: z.date().optional(),
    end_date: z.date().optional(),
    created_by_id: z.string().uuid().optional(),
});

export type Project = z.infer<typeof projectSchema>