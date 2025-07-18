// Import request handler types from express
import { RequestHandler } from "express";
// Import zod schema for validation
import { ZodSchema, ZodTypeAny, z } from "zod";

/*
* Below function is used to validate the request body against a Zod schema.
* If validation fails, it sends a 400 response with error details.
*/
export function validateBody<
  Schema extends ZodTypeAny
>(
  schema: Schema
): RequestHandler<any, any, z.infer<Schema>, any> {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Body validation failed',
        issues: result.error.flatten().fieldErrors,
      });
    }
    req.body = result.data;
    next();
  };
}


/**
 * Validate `req.params` against a Zod schema, and
 * replace `req.params` with the parsed/typed result.
 */
export function validateParams<
  Schema extends ZodSchema<Record<string, string>>
>(
  schema: Schema
): RequestHandler<z.infer<Schema>, any, any, any> {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return res.status(400).json({
        error: 'Param validation failed',
        issues: result.error.flatten().fieldErrors,
      });
    }
    // Now TS knows req.params matches the schema’s type
    req.params = result.data;
    next();
  };
}