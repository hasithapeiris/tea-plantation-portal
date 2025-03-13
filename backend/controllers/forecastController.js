import Forex from "../models/forexModel.js";

// Fetch all forecasted forex data
export const fetchForexForecast = async (req, res) => {
  try {
    const forecasts = await Forex.find().sort({ Date: 1 });
    res.json(forecasts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
