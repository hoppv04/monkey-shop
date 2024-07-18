import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./env.js";

export const generateToken = (payload, expiresIn = "10d") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};
