import mongoose from "mongoose";

const midGrownProdSchema = new mongoose.Schema({
  month: String,
  production: Number,
});

const MidGrownProd = mongoose.model("MidGrownProd", midGrownProdSchema);

export default MidGrownProd;
