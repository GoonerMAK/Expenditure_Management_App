import { z } from "zod";

export const roleParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid ID format. Must be a UUID." })
});

export const roleSchema = z.object({
    role_name: z.string().min(2, { message: "Role name must be at least 2 characters long" }),
});

export type RoleParams = z.infer<typeof roleParamsSchema>
export type Role = z.infer<typeof roleSchema>