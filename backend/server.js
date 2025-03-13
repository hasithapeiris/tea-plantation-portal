import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
dotenv.config();
import forexRoutes from "./routes/forexRouter.js";
import productionRoutes from "./routes/productionRouter.js";

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());

// Middleware for parsing incoming requests with json payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/forex-forecast", forexRoutes);
app.use("/api/prod-forecast", productionRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
