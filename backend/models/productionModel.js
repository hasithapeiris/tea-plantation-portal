import mongoose from "mongoose";

const prodSchema = new mongoose.Schema({
  Date: String,
  Forecasted_Production: Number,
});

const Production = mongoose.model("Production", prodSchema);

export default Production;
