
// Importing the PrismaClient from the generated Prisma client
import { PrismaClient } from "../generated/prisma";

// Creating an instance of PrismaClient
// This instance will be used to interact with the database
const prisma = new PrismaClient();
export default prisma;