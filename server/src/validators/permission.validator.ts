import { z } from "zod";

export const permissionParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid ID format. Must be a UUID." })
});

export const permissionSchema = z.object({
    permission_name: z.string().min(1, { message: "Permission name cannot be empty" }),
    role_id: z.string().uuid().optional(),
});

export type PermissionParams = z.infer<typeof permissionParamsSchema>
export type Permission = z.infer<typeof permissionSchema>