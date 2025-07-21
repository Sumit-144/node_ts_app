// Import the zod schema builder object from zod
import { z } from "zod";

// Define a Zod schema for login validation
export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Infer the type from the schema for TypeScript usage
export type LoginInput = z.infer<typeof loginSchema>;