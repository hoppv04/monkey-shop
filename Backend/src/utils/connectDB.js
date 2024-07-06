import { connect } from "mongoose";
import { DB_URI } from "./env.js";

const connectDB = async () => {
  try {
    await connect(DB_URI);
    console.log("Connect DB successfully");
  } catch (error) {
    console.log(`Connect DB failed: ${error}`);
  }
};

export default connectDB;
