import { z } from "zod";

export const productSchema = z.object({
  title: z.string().trim().min(6),
  price: z.number().min(0),
  description: z.string().optional(),
  category: z.string().optional(),
});

export const categorySchema = z.object({
  title: z.string().min(6),
  description: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
    confirmPass: z.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Password and confirm password must be the same",
    path: ["confirmPass"],
  });
