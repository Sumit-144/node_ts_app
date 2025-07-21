// src/routes/user.routes.ts
import { Router } from "express";
import * as userController from "../controllers/user.controller";
import * as authController from "../controllers/auth.controller";
import * as userDetailsController from "../controllers/userDetails.controller";
import { validateBody, validateParams } from "../middlewares/validate";
import { authenticateJwt, authorize } from "../middlewares/auth";
import ownershipGuard from "../middlewares/ownership";
import { 
  userCreateSchema,
  userUpdateSchema,
  userIdParamSchema
} from "../validations/user.validation";
import { loginSchema } from "../validations/auth.validation";
import { userDetailsSchema } from "../validations/userDetails.validation";

const router = Router();

// Public routes
router.post(
  "/",
  validateBody(userCreateSchema),
  authController.signUp
);

router.post(
  "/login",
  validateBody(loginSchema),
  authController.login
);

// All routes below require a valid access token
router.use(authenticateJwt);

// User CRUD
router.get(
  "/",
  authorize(["admin"]),
  userController.getAllUsers
);

router.get(
  "/:id",
  validateParams(userIdParamSchema),
  authorize(["user", "admin"]),
  userController.getUserById
);

router.put(
  "/:id",
  validateParams(userIdParamSchema),
  authorize(["user", "admin"]),
  ownershipGuard,
  validateBody(userUpdateSchema),
  userController.updateUser
);

router.delete(
  "/:id",
  validateParams(userIdParamSchema),
  authorize(["admin"]),
  userController.deleteUser
);

// User Details (upsert)
router.post(
  "/:id/details",
  validateParams(userIdParamSchema),
  authorize(["user", "admin"]),
  ownershipGuard,
  validateBody(userDetailsSchema),
  userDetailsController.upsertUserDetails
);

export default router;
