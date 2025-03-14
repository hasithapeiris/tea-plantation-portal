import mongoose from "mongoose";

const lowGrownProdSchema = new mongoose.Schema({
  month: String,
  production: Number,
});

const LowGrownProd = mongoose.model("LowGrownProd", lowGrownProdSchema);

export default LowGrownProd;
