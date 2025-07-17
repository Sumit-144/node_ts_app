// Import schema builder object from Zod
import { z as schemaBuilderObject } from "zod";

// Define a Zod schema for user details validation
export const userDetailsSchema = schemaBuilderObject.object({
    dob : schemaBuilderObject.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Date of birth must be in the format DD-MM-YYYY"),
    height : schemaBuilderObject.number().min(50, "Height must be at least 50 cm").max(300, "Height cannot exceed 300 cm"),
    weight : schemaBuilderObject.number().min(20, "Weight must be at least 20 kg").max(500, "Weight cannot exceed 500 kg"),
});

// Infer the type from the schema for TypeScript usage
export type UserDetailsInput = schemaBuilderObject.infer<typeof userDetailsSchema>;

