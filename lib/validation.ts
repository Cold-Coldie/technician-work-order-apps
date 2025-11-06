import { z } from "zod";

export const WorkOrderSchema = z.object({
    title: z
        .string()
        .min(2, "Title must be at least 2 characters.")
        .max(80, "Title must be 80 characters or less."),
    description: z
        .string()
        .max(2000, "Description must be 2000 characters or less."),
    priority: z.enum(["Low", "Medium", "High"]),
    status: z.enum(["Open", "In Progress", "Done"]),
});

export type I_WorkOrderFormData = z.infer<typeof WorkOrderSchema>;