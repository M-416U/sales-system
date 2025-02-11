import { Request, Response, NextFunction } from "express";
import { verifyToken, extractTokenFromHeader } from "../utils/auth";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: string;
      };
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = extractTokenFromHeader(req.header("Authorization"));
    
    if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return;
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Access denied. No user found." });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ 
        message: `Access denied. Required role: ${roles.join(" or ")}`
      });
      return;
    }

    next();
  };
};
