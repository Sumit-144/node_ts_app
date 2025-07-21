// Import jwt from jsonwebtoken
import jwt from "jsonwebtoken";

/**
 * Function to generate a JWT token.
 * @param payload - The data to be encoded in the token.
 * @returns A signed JWT token.
 */
export function generateToken(payload: object): string {
    // Use the secret key from environment variables
    const secretKey = process.env.JWT_SECRET!;
    // Sign the token with the payload and secret key
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}