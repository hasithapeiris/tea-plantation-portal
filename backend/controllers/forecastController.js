import Forex from "../models/forexModel.js";
import Production from "../models/productionModel.js";

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

// Fetch all forecasted forex data
export const fetchProductionForecast = async (req, res) => {
  try {
    //const forecasts = await Forex.find().sort({ Date: 1 });
    const forecasts = await Production.find();
    res.json(forecasts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
