// This file defines the validation schemas for user-related operations using Zod.
// Import zod for schema validation
import { z } from "zod";

// Define a Zod schema for user creation
export const userCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Define a Zod schema for user update
export const userUpdateSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
});

// Define a Zod schema for user ID in route parameters
export const userIdParamSchema = z.object({
    id: z.string().regex(/^[1-9]\d*$/, "ID must be a positive integer string"),
});

// Infer the type from the schema for TypeScript usage
export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type UserIdParam = z.infer<typeof userIdParamSchema>;
