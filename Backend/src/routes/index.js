import { Router } from "express";
import productRouter from "./productRoutes.js";
import authRouter from "./authRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import cartRouter from "./cartRoutes.js";

const router = Router();

router.use("/products", productRouter);
router.use("/auth", authRouter);
router.use("/categories", categoryRoutes);
router.use("/cart", checkAuth, cartRouter);

export default router;
