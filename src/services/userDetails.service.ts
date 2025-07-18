// Import user details validation schema
import type { UserDetailsInput } from "../validations/userDetails.validation";
// Import user details model from Prisma
import type { UserDetails } from "../generated/prisma";
// Import user details repository functions
import * as userDetailsRepo from "../repositories/userDetails.repo";
// Import utility functions for computing age and BMI
import { computeAge, computeBMI } from "../utils/compute_metrics";

/**
 * Upsert user details: create if not exists, update if exists.
 * @param userId - The ID of the user to upsert details for.
 * @param details - The user details to upsert.
 * @returns The upserted UserDetails object.
 */
export async function upsertUserDetails(
  userId: number,
  details: UserDetailsInput 
): Promise<UserDetails & { age : string , bmi : number }> {
  
  // Delegate to repository function
  const record = await userDetailsRepo.upsertUserDetails(userId, details);

  return {
    ...record,
    // Compute age from date of birth
    age: computeAge(details.dob),
    // Compute BMI from height and weight
    bmi: computeBMI(details.height, details.weight),
  };
}