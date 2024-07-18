import { Router } from "express";
import { validBodyRequest } from "./../middlewares/validBodyRequest.js";
import { authSchema } from "./../validSchema/authSchema.js";
import { login, register } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", validBodyRequest(authSchema), register);
authRouter.post("/login", validBodyRequest(authSchema), login);

export default authRouter;
