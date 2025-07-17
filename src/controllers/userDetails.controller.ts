// Import the Request and Response types from express
import { Request, Response } from "express";
// Import the user details input type from validations
import type { UserDetailsInput } from "../validations/userDetails.validation";
// Import the user details service for database operations
import * as userDetailsService from "../services/userDetails.service";
// Import the user ID parameter type from validations
import type { UserIdParam } from "../validations/user.validation";

// Controller function to create or update user details
export const upsertUserDetails = async (req: Request<UserIdParam, {}, UserDetailsInput>, res: Response) => {
    try {
        const { id } = req.params;
        const userDetails = await userDetailsService.upsertUserDetails(Number(id), req.body);
        res.status(200).json(userDetails);
    }catch (error) {
        res.status(500).json({ error: "Failed to upsert user details" });
    }
}