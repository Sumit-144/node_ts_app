// Import Request and Response from express
import { Request, Response } from "express";
// Import the auth service for user creation
import * as authService from "../services/auth.service";
// Import the validation schemas
import type { UserCreateInput } from "../validations/user.validation";
// Import the logger instance
import { logger } from "../utils/logger";
import type { LoginInput } from "../validations/auth.validation"; // Import the type for login input

// Controller function to sign up a new user
export const signUp = async (req: Request<{}, {}, UserCreateInput>, res: Response) => {
    logger.info("Signing up a new user with data: ", req.body);
    // Call the auth service to sign up a new user
    logger.debug("Calling authService.signUpUser with body: ", req.body);
    try {
        const { user, token } = await authService.signUpUser(req.body);
        logger.info("User signed up successfully: ", user);
        res.status(201).json({ user, token });
    } catch (error) {
        logger.error("Error signing up user: ", error);
        res.status(500).json({ error: "Failed to sign up user" });
    }
}

// Controller function to login a user
export const login = async (req: Request<{}, {}, LoginInput>, res: Response) => {
    logger.info("Logging in user with email: ", req.body.email);
    // Call the auth service to login the user
    logger.debug("Calling authService.loginUser with body: ", req.body);
    try {
        const { user, token } = await authService.loginUser(req.body);
        logger.info("User logged in successfully: ", user);
        res.json({ user, token });
    } catch (error) {
        logger.error("Error logging in user: ", error);
        res.status(401).json({ error: "Invalid email or password" });
    }
}

