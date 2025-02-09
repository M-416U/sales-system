import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = "your-secret-key";

export const generateToken = (employeeID: number, role: string): string => {
  return jwt.sign({ employeeID, role }, JWT_SECRET, { expiresIn: "1h" });
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
