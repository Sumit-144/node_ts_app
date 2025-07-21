/**
 * src/repositories/user.repo.ts
 * Data‐access layer: raw CRUD operations against Prisma 
 * Maintaining a serparate repository allows for cleaner separation of concerns
 * and easier testing for persistence logic. Unit tests can mock this layer
 * without needing a real database connection.
 * This file does not handle hashing or validation, which should be done in the service layer.
 * Incase persistence logic changes, this file can be updated without affecting the service layer that is if you change to any
 * other ORM.
 */
import prisma from "../config/prisma";
import type { UserCreateInput, UserUpdateInput } from "../validations/user.validation";
import type { User } from "../generated/prisma";

// Import the logger instance
import { logger } from "../utils/logger";

/**
 * Create a new user record (without hashing).
 */
export function createRawUser(data: UserCreateInput): Promise<User> {
  logger.info("Creating user with data from repository: ", data);
  return prisma.user.create({ data });
}

/**
 * Update fields on an existing user record.
 */
export function updateRawUser(
  id: number,
  data: UserUpdateInput
): Promise<User> {
  return prisma.user.update({
    where: { id },
    data,
  });
}

/**
 * Retrieve all users.
 */
export function findAllRawUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

/**
 * Retrieve a single user by ID.
 */
export function findRawUserById(id: number): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

/**
 * Delete a user by ID.
 */
export function deleteRawUser(id: number): Promise<User> {
  return prisma.user.delete({ where: { id } });
}

/**
 * Find a user by email.
 */
export function findRawUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}