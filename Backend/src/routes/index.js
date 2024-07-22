import { Router } from "express";
import productRouter from "./productRoutes.js";
import authRouter from "./authRoutes.js";
import categoryRoutes from "./categoryRoutes.js";

const router = Router();

router.use("/products", productRouter);
router.use("/auth", authRouter);
router.use("/categories", categoryRoutes);

export default router;
