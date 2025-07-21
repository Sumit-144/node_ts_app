// src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger";

// Define exactly what you expect in your token
interface AuthToken {
  sub: number;
  role: string;
  iat: number;
  exp: number;
}

export function authenticateJwt(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.slice(7);
  try {
    // First verify gives string | JwtPayload, so cast to unknown then our interface
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown;
    const payload = decoded as AuthToken;

    // Convert `sub` to number if it came back as string
    const userId = typeof payload.sub === "string" ? parseInt(payload.sub, 10) : payload.sub;

    req.user = { id: userId, role: payload.role };
    next();
  } catch (err) {
    logger.warn("JWT authentication failed", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Middleware to authorize based on allowed roles
export function authorize(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
}
