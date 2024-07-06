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

export const getAllProducts = async (req, res, next) => {
  try {
    const data = await Product.find();
    console.log(data);
    return res.status(200).json({
      success: true,
      message: "Get products successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Delete product successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Get product successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Update failed",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Update product successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};
