import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = verifyToken(token);
    (req as any).employee = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const employee = (req as any).employee;
    if (!roles.includes(employee.role)) {
      return res.status(403).json({ message: "Permission denied" });
    }
    next();
  };
