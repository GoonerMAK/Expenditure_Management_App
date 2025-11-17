import {z} from "zod";

export const categoryParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid ID format. Must be a UUID." })
});

export const categorySchema = z.object({
    category_name: z.string()
        .min(3, { message: "Category name must be at least 3 characters long" })
        .max(20, { message: "Category name must be at most 20 characters long" }),
});

export type CategoryParams = z.infer<typeof categoryParamsSchema>
export type Category = z.infer<typeof categorySchema>