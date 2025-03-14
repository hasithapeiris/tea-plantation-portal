import Forex from "../models/forexModel.js";
import NationalProd from "../models/nationalProdModel.js";
import LowGrownProd from "../models/lowGrownProdModel.js";
import MidGrownProd from "../models/midGrownProdModel.js";
import HighGrownProd from "../models/highGrownProdModel.js";

// Fetch all forecasted forex data
export const fetchForexForecast = async (req, res) => {
  try {
    //const forecasts = await Forex.find().sort({ Date: 1 });
    const forecasts = await Forex.find();
    res.json(forecasts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all forecasted national production data
export const fetchNationalProdForecast = async (req, res) => {
  try {
    const forecasts = await NationalProd.find();
    res.json(forecasts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all forecasted low grown production data
export const fetchLowGrownProdForecast = async (req, res) => {
  try {
    const forecasts = await LowGrownProd.find();
    res.json(forecasts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all forecasted mid grown production data
export const fetchMidGrownProdForecast = async (req, res) => {
  try {
    const forecasts = await MidGrownProd.find();
    res.json(forecasts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all forecasted high grown production data
export const fetchHighGrownProdForecast = async (req, res) => {
  try {
    const forecasts = await HighGrownProd.find();
    res.json(forecasts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
