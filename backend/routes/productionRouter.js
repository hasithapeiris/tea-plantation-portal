import express from "express";
import { fetchProductionForecast } from "../controllers/forecastController.js";

const router = express.Router();

router.get("/", fetchProductionForecast);

export default router;
