import Joi from "joi";

export const authSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password must have at least 6 characters",
    "string.max": "Password must have at most 255 characters",
  }),
});
