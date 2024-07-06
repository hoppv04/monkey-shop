import { Router } from "express";
import { createProduct } from "../controllers/products.js";

const productRouter = Router();

productRouter.post("/", createProduct);

export default productRouter;
