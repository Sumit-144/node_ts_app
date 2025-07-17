// src/services/user.service.ts
// Service layer: business logic, hashing, error handling, orchestrating repositories
import type { UserCreateInput, UserUpdateInput } from "../validations/user.validation";
import type { User } from "../generated/prisma";
import bcrypt from "bcrypt";
import * as repo from "../repositories/user.repo";

/**
 * Create a new user with hashed password.
 */
export async function userCreate(
  data: UserCreateInput
): Promise<User> {
  // 1) Hash the password
  const hashed = await bcrypt.hash(data.password, 10);
  // 2) Delegate to repository
  return repo.createRawUser({
    ...data,
    password: hashed,
  });
}

/**
 * Update an existing user; returns null if not found.
 */
export async function userUpdate(
  id: number,
  data: UserUpdateInput
): Promise<User | null> {
  try {
    return await repo.updateRawUser(id, data);
  } catch (err) {
    console.error(`Error updating user ${id}:`, err);
    return null;
  }
}

/**
 * Get all users.
 */
export function getAllUsers(): Promise<User[]> {
  return repo.findAllRawUsers();
}

/**
 * Get a user by ID, or null if not found.
 */
export function getUserById(
  id: number
): Promise<User | null> {
  return repo.findRawUserById(id);
}

/**
 * Delete a user by ID, or null if not found.
 */
export async function deleteUser(
  id: number
): Promise<User | null> {
  try {
    return await repo.deleteRawUser(id);
  } catch (err) {
    console.error(`Error deleting user ${id}:`, err);
    return null;
  }
}