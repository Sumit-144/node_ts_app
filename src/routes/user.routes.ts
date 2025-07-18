// Import Router from express
import { Router } from "express";
// Import the user controller functions
import * as userController from "../controllers/user.controller";
// Import the validation middleware and schemas
import { validateBody, validateParams } from "../middlewares/validate";
import { userCreateSchema, userUpdateSchema, userIdParamSchema } from "../validations/user.validation";
// Create a new router instance
const router = Router();
// Define the routes for user operations
router.post("/", validateBody(userCreateSchema), userController.createUser); // Route to create a new user
router.get("/", userController.getAllUsers); // Route to get all users
router.get("/:id", validateParams(userIdParamSchema), userController.getUserById); // Route to get a user by ID
router.put("/:id", validateParams(userIdParamSchema), validateBody(userUpdateSchema), userController.updateUser); // Route to update a user by ID
router.delete("/:id", validateParams(userIdParamSchema), userController.deleteUser); // Route to delete a user by ID
// Export the router to be used in the main application
export default router;
// This router will handle all user-related requests under the /api/users path


/* PRABHAT */