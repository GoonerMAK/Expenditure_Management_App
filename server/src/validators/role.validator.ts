import { z } from "zod";

export const roleSchema = z.object({
    role_name: z.string().min(2, { message: "Role name must be at least 2 characters long" }),
});

export type Role = z.infer<typeof roleSchema>