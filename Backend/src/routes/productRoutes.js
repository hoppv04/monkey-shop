import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/products.js";
import { validBodyRequest } from "./../middlewares/validBodyRequest.js";
import { productSchema } from "./../validSchema/productSchema.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

productRouter.post("/", validBodyRequest(productSchema), createProduct);
productRouter.delete(
  "/:id",
  validBodyRequest(productSchema),
  deleteProductById
);
productRouter.patch("/:id", updateProductById);

export default productRouter;
