import express from "express";
import { fetchLowGrownProdForecast } from "../controllers/forecastController.js";

const router = express.Router();

router.get("/", fetchLowGrownProdForecast);

export default router;
