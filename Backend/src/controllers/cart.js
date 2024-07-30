import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res, next) => {
  try {
    console.log("getCart");
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, products: [], totalPrice: 0 });
    const productIndex = cart.products.findIndex(
      (item) => item.product == productId
    );
    if (productIndex == -1) {
      cart.products.push({ product: productId, quantity });
    } else {
      cart.products[productIndex].quantity += quantity;
    }
    cart.totalPrice += product.price * quantity;
    await cart.save();
    return res.status(200).json({
      message: "Add to cart successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};
