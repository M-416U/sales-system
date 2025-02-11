import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface TokenPayload {
  id: number;
  email: string;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 3600;

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 });
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

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};

export const extractTokenFromHeader = (header: string | undefined): string | null => {
  if (!header) return null;
  
  const [type, token] = header.split(" ");
  return type === "Bearer" && token ? token : null;
};
