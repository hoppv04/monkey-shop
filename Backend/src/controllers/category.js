import slugify from "slugify";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const createCategory = async (req, res, next) => {
  try {
    const slug = slugify(req.body.title, {
      replacement: "-",
      lower: true,
      strict: true,
      locale: "vi",
      trim: true,
    });

    const data = await Category.create({ ...req.body, slug });
    if (data) {
      return res.status(201).json({
        success: true,
        message: "Create category successfully",
        data,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Update category successfully",
        data,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryById = async (req, res, next) => {
  try {
    if (req.params.id === "669e4b8525596512d2d0ceec") {
      return res.status(400).json({
        success: false,
        message: "Default category cannot be deleted",
      });
    }

    const data = await Category.findByIdAndDelete(req.params.id);

    const productToUpdate = await Product.find({ category: req.params.id });
    await Promise.all(
      productToUpdate.map(async (product) => {
        product.category = "669e4b8525596512d2d0ceec";
        await product.save();
      })
    );

    if (data) {
      return res.status(200).json({
        success: true,
        message: "Delete category successfully",
        data,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findById(req.params.id).populate("products");
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Get category successfully",
        data,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const data = await Category.find();
    if (data) {
      return res.status(200).json({
        success: true,
        message: "Get all categories successfully",
        data,
      });
    }
  } catch (error) {
    next(error);
  }
};
