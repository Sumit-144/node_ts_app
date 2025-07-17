// Import the Request and Response types from express
import { Request, Response, NextFunction } from "express";
// Import zod schema for validation
import { ZodSchema } from "zod";

// Middleware function to validate request body against a Zod schema
export const validate = (schema: ZodSchema) => {
    // Return a middleware function. This function takes the schema as an argument
    // and returns a middleware that can be used in the express app. schema is a closure
    // that allows us to access the schema within the middleware function and remains accessible
    // even after the outer function has executed.
  return (req: Request, res: Response, next: NextFunction) => {
    // Validate the request body against the provided schema
    const result = schema.safeParse(req.body);
    
    // If validation fails, send a 400 Bad Request response with the error details
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        issues: result.error.flatten().fieldErrors,
      });
    }
    
    // If validation succeeds, attach the parsed data to the request object
    req.body = result.data;
    
    // Call the next middleware in the stack
    next();
  };
};