import { Request, Response, NextFunction } from "express";

// Assumes req.user.id was set by authenticateJwt
export default function ownershipGuard(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  const paramId = parseInt(req.params.id, 10);

  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (user.id !== paramId && user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: no ownership" });
  }

  next();
}
