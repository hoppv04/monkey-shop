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
import { checkAuth } from "./../middlewares/checkAuth.js";
import { checkIsAdmin } from "./../middlewares/checkIsAdmin.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

productRouter.use("/", checkAuth, checkIsAdmin);
productRouter.post("/", validBodyRequest(productSchema), createProduct);
productRouter.patch("/:id", validBodyRequest(productSchema), updateProductById);
productRouter.delete("/:id", deleteProductById);

export default productRouter;
