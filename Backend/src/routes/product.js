import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  updateProductById,
} from "../controllers/products.js";

const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProducts);
productRouter.delete("/:id", deleteProductById);
productRouter.patch("/:id", updateProductById);

export default productRouter;
