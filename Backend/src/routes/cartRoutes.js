import { Router } from "express";
import { addToCart, getCart } from "../controllers/cart.js";

const cartRouter = Router();

cartRouter.post("/", addToCart);
cartRouter.get("/", getCart);

export default cartRouter;
