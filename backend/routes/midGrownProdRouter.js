import express from "express";
import { fetchMidGrownProdForecast } from "../controllers/forecastController.js";

const router = express.Router();

router.get("/", fetchMidGrownProdForecast);

export default router;
