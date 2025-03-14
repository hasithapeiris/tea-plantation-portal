import mongoose from "mongoose";

const highGrownProdSchema = new mongoose.Schema({
  month: String,
  production: Number,
});

const HighGrownProd = mongoose.model("HighGrownProd", highGrownProdSchema);

export default HighGrownProd;
