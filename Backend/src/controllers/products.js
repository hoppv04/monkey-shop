import Product from "../models/Product.js";

export const createProduct = async (req, res, next) => {
  try {
    const data = await Product.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Create product successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};
