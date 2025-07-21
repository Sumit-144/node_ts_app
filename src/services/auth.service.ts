// Import type UserCreateInput from validations
import type { UserCreateInput } from "../validations/user.validation";
// Import the logger instance
import { logger } from "../utils/logger";
// Import type User from generated Prisma types
import type { User } from "../generated/prisma";
// Import bcrypt for password hashing
import bcrypt from "bcrypt";
// Import user repository functions
import * as repo from "../repositories/user.repo";
// Import the JWT token generation function
import { generateToken } from "../utils/jwt";
import type { LoginInput } from "../validations/auth.validation"; // Import the type for login input

/**
 * Function to sign up a new user with hashed password and JWT token.
 * @param data - The user data to be created of type UserCreateInput.
 * @returns An object containing the created user and a JWT token.
 */
export async function signUpUser(
  data: UserCreateInput
): Promise<{ user: User; token: string }> {
  logger.info("Signing up user with data: ", data);

  // 1) Hash the password
  logger.debug("Hashing password for user sign up");
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // 2) Create user in the database
  logger.debug("Creating user in repository with hashed password");
  const user = await repo.createRawUser({
    ...data,
    password: hashedPassword,
  });

  // 3) Generate JWT token
  logger.debug("Generating JWT token for user");
  const token = generateToken({ sub: user.id, role: user.role });

  return { user, token };
}

/**
 * Function to login a user.
 * @param email - The email of the user trying to log in.
 * @param password - The password of the user trying to log in.
 * @returns An object containing the user and a JWT token if login is successful.
 */
export async function loginUser(
  data: LoginInput
): Promise<{ user: User; token: string }> {
  const { email, password } = data;
  logger.info("Logging in user with email: ", email);

  // 1) Find user by email
  logger.debug("Finding user by email in repository");
  const user = await repo.findRawUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  // 2) Compare password
  logger.debug("Comparing provided password with stored hashed password");
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // 3) Generate JWT token
  logger.debug("Generating a fresh JWT token for logged-in user");
  const token = generateToken({ sub: user.id, role: user.role });

  return { user, token };
}
