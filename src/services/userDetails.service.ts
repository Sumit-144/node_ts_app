// Import user details validation schema
import type { UserDetailsInput } from "../validations/userDetails.validation";
// Import user details model from Prisma
import type { UserDetails } from "../generated/prisma";
// Import user details repository functions
import * as userDetailsRepo from "../repositories/userDetails.repo";

/**
 * Upsert user details: create if not exists, update if exists.
 * @param userId - The ID of the user to upsert details for.
 * @param details - The user details to upsert.
 * @returns The upserted UserDetails object.
 */
export async function upsertUserDetails(
  userId: number,
  details: UserDetailsInput 
): Promise<UserDetails> {
  // Delegate to repository function
  const record = userDetailsRepo.upsertUserDetails(userId, details);

  // 
}