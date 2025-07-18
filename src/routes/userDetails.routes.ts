// Import Router from express
import { Router } from "express";

// Import the user controller functions
import * as userDetailsController from "../controllers/userDetails.controller";

// Import validation schemas
import { validateBody, validateParams } from "../middlewares/validate";
import { userDetailsSchema } from "../validations/userDetails.validation";
// Import user URL parameter schema
import { userIdParamSchema } from "../validations/user.validation";

// Import authentication middleware
//import { authenticateJwt } from "../middlewares/auth";

// Create a new router instance
const router = Router();

// Define the routes for user details operations
router.post("/:id", validateParams(userIdParamSchema), validateBody(userDetailsSchema), userDetailsController.upsertUserDetails); // Route to create user details

export default router;