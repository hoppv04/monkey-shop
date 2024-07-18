import dotenv from "dotenv";

dotenv.config();

export const { PORT, DB_URI, JWT_SECRET, EMAIL_USERNAME, EMAIL_PASSWORD } =
  process.env;
