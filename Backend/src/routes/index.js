import { Router } from "express";
import productRouter from "./productRoutes.js";
import authRouter from "./authRoutes.js";

const router = Router();

router.use("/products", productRouter);
router.use("/auth", authRouter);

export default router;
