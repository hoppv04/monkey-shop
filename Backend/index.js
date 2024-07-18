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

const errorNotFound = (req, res, next) => {
  const error = new Error(`Not found`);
  error.status = 404;
  next(error);
};

const errorCommon = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
};

app.use(errorNotFound, errorCommon);
app.listen(PORT | 8000, () => {
  console.log(`Server is running on port ${PORT | "8000"}`);
});
