import express from "express";
import { fetchHighGrownProdForecast } from "../controllers/forecastController.js";

const router = express.Router();

router.get("/", fetchHighGrownProdForecast);

export default router;
