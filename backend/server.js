import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
dotenv.config();
import forexRoutes from "./routes/forexRouter.js";
import nationalProdRoutes from "./routes/nationalProdRouter.js";
import miniChartRoutes from "./routes/miniChartRoutes.js";
import lowGrownProdRoutes from "./routes/lowGrownProdRouter.js";
import midGrownProdRoutes from "./routes/midGrownProdRouter.js";
import highGrownProdRoutes from "./routes/highGrownProdRouter.js";

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());

// Middleware for parsing incoming requests with json payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/forex-forecast", forexRoutes);
app.use("/api/national-prod", nationalProdRoutes);
app.use("/api/low-grown-prod", lowGrownProdRoutes);
app.use("/api/mid-grown-prod", midGrownProdRoutes);
app.use("/api/high-grown-prod", highGrownProdRoutes);
app.use("/api/mini-charts", miniChartRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
