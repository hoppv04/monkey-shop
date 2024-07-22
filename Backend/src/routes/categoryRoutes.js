import { Router } from "express";
import { checkAuth } from "./../middlewares/checkAuth.js";
import { checkIsAdmin } from "./../middlewares/checkIsAdmin.js";
import { validBodyRequest } from "./../middlewares/validBodyRequest.js";
import { categorySchema } from "../validSchema/categorySchema.js";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from "../controllers/category.js";

const categoryRoutes = Router();

categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:id", getCategoryById);

categoryRoutes.use("/", checkAuth, checkIsAdmin);
categoryRoutes.post("/", validBodyRequest(categorySchema), createCategory);
categoryRoutes.patch(
  "/:id",
  validBodyRequest(categorySchema),
  updateCategoryById
);
categoryRoutes.delete("/:id", deleteCategoryById);

export default categoryRoutes;
