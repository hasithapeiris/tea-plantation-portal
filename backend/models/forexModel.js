import mongoose from "mongoose";

const forexSchema = new mongoose.Schema({
  Date: String,
  Forecasted_Production: Number,
  Forecasted_Forex_Earnings: Number,
});

const Forex = mongoose.model("Forex", forexSchema);

export default Forex;
