import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { generateToken, verifyToken } from "../utils/auth";

class AuthController {
  /**
   * Login user and generate access token
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Find employee by email
      const employee = await prisma.employee.findUnique({
        where: { Email: email }
      });

      if (!employee) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, employee.PasswordHash);
      if (!isValidPassword) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      // Generate access token
      const token = generateToken({
        id: employee.EmployeeID,
        email: employee.Email,
        role: employee.Role
      });

      // Generate refresh token
      const refreshToken = jwt.sign(
        { id: employee.EmployeeID },
        process.env.JWT_REFRESH_SECRET || "refresh-secret",
        { expiresIn: "7d" }
      );
      
      // Save refresh token to database
      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          employeeId: employee.EmployeeID,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        }
      });

      res.status(200).json({
        token,
        refreshToken,
        employee: {
          id: employee.EmployeeID,
          name: employee.FullName,
          email: employee.Email,
          role: employee.Role
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.header("Refresh-Token");
      if (!refreshToken) {
        res.status(401).json({ message: "Refresh token required" });
        return;
      }

      // Verify refresh token exists in database and is not expired
      const storedToken = await prisma.refreshToken.findFirst({
        where: {
          token: refreshToken,
          expiresAt: {
            gt: new Date()
          }
        },
        include: {
          employee: true
        }
      });

      if (!storedToken) {
        res.status(401).json({ message: "Invalid refresh token" });
        return;
      }

      // Generate new access token
      const token = generateToken({
        id: storedToken.employee.EmployeeID,
        email: storedToken.employee.Email,
        role: storedToken.employee.Role
      });

      res.status(200).json({ token });
    } catch (error) {
      console.error("Refresh token error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Logout user and invalidate refresh token
   */
  async logout(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.header("Refresh-Token");
      if (refreshToken) {
        // Remove refresh token from database
        await prisma.refreshToken.deleteMany({
          where: {
            token: refreshToken
          }
        });
      }

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new AuthController();
