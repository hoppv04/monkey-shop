import cors from "cors";
import express from "express";
import connectDB from "./src/utils/connectDB.js";
import { PORT } from "./src/utils/env.js";
import router from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: "Internal sever error",
  });
});

app.listen(PORT | 8000, () => {
  console.log(`Server is running on port ${PORT | "8000"}`);
});
