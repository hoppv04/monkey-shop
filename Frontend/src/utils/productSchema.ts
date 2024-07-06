import { z } from "zod";

export const productSchema = z.object({
  title: z.string().trim().min(6),
  price: z.number().min(0),
  description: z.string().optional(),
});
