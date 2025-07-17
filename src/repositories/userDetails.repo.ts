// Import prisma client
import prisma from "../config/prisma";

// Import user details input type from validation schema
import type { UserDetailsInput } from "../validations/userDetails.validation";
// Import UserDetails type from Prisma
import type { UserDetails } from "../generated/prisma";


/**
 * Upsert user details: create if not exists, update if exists.
 * @param userId - The ID of the user to upsert details for.
 * @param details - The user details to upsert.
 * @returns The upserted UserDetails object.
 */
export async function upsertUserDetails(userId: number, details: UserDetailsInput): Promise<UserDetails> {
    return prisma.userDetails.upsert({
        where: { userId },
        update: details,
        create: { userId, ...details },
    });
}