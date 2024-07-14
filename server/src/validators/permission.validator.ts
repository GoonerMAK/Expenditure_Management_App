import { z } from "zod";

export const permissionSchema = z.object({
    permission_name: z.string().min(1, { message: "Permission name cannot be empty" }),
    role_id: z.string().uuid().optional(),
});

export type Permission = z.infer<typeof permissionSchema>