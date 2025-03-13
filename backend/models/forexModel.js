import mongoose from "mongoose";

const forexSchema = new mongoose.Schema({
  date: String,
  forecastedProduction: Number,
  forecastedForexEarnings: Number,
});

const Forex = mongoose.model("Forex", forexSchema);

export default Forex;
