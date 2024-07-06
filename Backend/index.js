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

app.listen(PORT | 8000, () => {
  console.log(`Server is running on port ${PORT | "8000"}`);
});
