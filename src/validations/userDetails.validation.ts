// Import schema builder object from Zod
import { z as schemaBuilderObject } from "zod";
import { parse } from "date-fns";

// Define a Zod schema for user details validation
export const userDetailsSchema = schemaBuilderObject.object({
  dob: schemaBuilderObject.preprocess(
    (value) => {
      if (typeof value === "string") {
        // Convert string date to Date object
        return parse(value, "dd-MM-yyyy", new Date());
      }
      return value; // Return as is if already a Date object or invalid
    },
    schemaBuilderObject
      .date() // check if the value is a Date object (String "abc" -> new Date("abc") is Date object but invalid!)
      .refine((date) => !isNaN(date.getTime()), "Invalid date format") // refine to check validity of date object
  ),
  height: schemaBuilderObject
    .number()
    .min(50, "Height must be at least 50 cm")
    .max(300, "Height cannot exceed 300 cm"),
  weight: schemaBuilderObject
    .number()
    .min(20, "Weight must be at least 20 kg")
    .max(500, "Weight cannot exceed 500 kg"),
});

// Infer the type from the schema for TypeScript usage
export type UserDetailsInput = schemaBuilderObject.infer<
  typeof userDetailsSchema
>;
