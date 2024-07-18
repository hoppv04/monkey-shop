import { Router } from "express";
import { validBodyRequest } from "./../middlewares/validBodyRequest.js";
import {
  authSchema,
  forgotPasswordSchema,
} from "./../validSchema/authSchema.js";
import { forgotPassword, login, register } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", validBodyRequest(authSchema), register);
authRouter.post("/login", validBodyRequest(authSchema), login);
authRouter.post(
  "/forgot-password",
  validBodyRequest(forgotPasswordSchema),
  forgotPassword
);

export default authRouter;
