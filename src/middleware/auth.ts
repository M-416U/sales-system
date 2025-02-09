import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Access denied" });
    return;
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const resUser = (req as any).user;
    if (!roles.includes(resUser.role)) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  };
};
