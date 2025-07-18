// Import the Request and Response types from express
import { Request, Response } from "express";
// Import the user service for database operations
import * as userService from "../services/user.service";
// Import the validation schemas
import type { UserCreateInput, UserUpdateInput, UserIdParam } from "../validations/user.validation";

// Import the logger instance
import { logger } from "../utils/logger";

// Controller function to create a new user
export const createUser = async (req: Request<{}, {}, UserCreateInput>, res: Response) => {
    logger.info("Creating a new user with data: ", req.body);
    // Call the user service to create a new user
    logger.debug("Calling userService.userCreate with body: ", req.body);
    try {
        const user = await userService.userCreate(req.body);
        logger.info("User created successfully: ", user);
        res.status(201).json(user);
    } catch (error) {
        logger.error("Error creating user: ", error);
        res.status(500).json({ error: "Failed to create user" });
    }
}

// Function to update an existing user
export const updateUser = async (req: Request<UserIdParam, {}, UserUpdateInput>, res: Response) => {
    const { id } = req.params;
    try {
        const user = await userService.userUpdate(Number(id), req.body); // Essentially, the id/any URL parameter is a string, so we convert it to a number
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        // Currently control will not reach here as the error is handled in the service layer
        res.status(500).json({ error: "Failed to update user" });
    }
}

// Function to get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
}

// Function to get a user by ID
export const getUserById = async (req: Request<UserIdParam>, res: Response) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(Number(id));
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
}

// Function to delete a user by ID
export const deleteUser = async (req: Request<UserIdParam>, res: Response) => {
    const { id } = req.params;
    try {
        // First, check if the user exists before attempting to delete
        const user = await userService.getUserById(Number(id));
        if (!user) {
            // If the user does not exist, return a 404 Not Found response
            return res.status(404).json({ error: "User not found" });
        }
        // If the user exists, proceed to delete
        await userService.deleteUser(Number(id)); 
        res.status(204).json({ message: `User with ID ${id} has been deleted.` });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
}