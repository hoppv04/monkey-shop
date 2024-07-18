import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "./../utils/password.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashPass = hashPassword(password);
    if (!hashPass) {
      return res.status(400).json({
        message: "Password encryption failed",
      });
    }

    const user = await User.create({
      email,
      password: hashPass,
    });

    user.password = undefined;

    return res.status(201).json({
      success: true,
      message: "Register successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({
        message: "Email is not registered",
      });
    }

    const isMatch = comparePassword(password, userExists.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const token = generateToken({ _id: userExists._id }, "100d");
    userExists.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user: userExists,
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};
