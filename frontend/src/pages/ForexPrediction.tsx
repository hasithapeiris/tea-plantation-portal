import React, { useState } from "react";
import axios from "axios";
import { InputFormState, PredictionResult } from "../types";
import { No_Data, Tea_Export } from "../assets";
import { Footer, SubHeader } from "../components";

const ForexPrediction: React.FC = () => {
  const [formData, setFormData] = useState<InputFormState>({
    date: "",
    productionHigh: 0,
    productionMedium: 0,
    productionLow: 0,
    exportQuantity: 0,
    exportPrice: 0,
    exchangeRate: 0,
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const image = Tea_Export;
  const title = "Predict Foreign Exchange Earnings (FEE)";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sitamet nisl non urna fringilla cursus vitae nec metus. Suspendisse malesuada sodales varius.";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) || value });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<PredictionResult>(
        "http://localhost:5000/predict",
        formData
      );
      setPrediction(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching the prediction."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SubHeader image={image} title={title} description={description} />
      <div className="wrapper py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <form
            className="bg-white rounded-lg p-6 border"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-semibold mb-4">Input Features</h2>

            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium mb-1">
                Date (Year, Month):
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="productionHigh"
                className="block text-sm font-medium mb-1"
              >
                Production (High Grown):
              </label>
              <input
                type="number"
                id="productionHigh"
                name="productionHigh"
                value={formData.productionHigh}
                onChange={handleChange}
                className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="productionMedium"
                className="block text-sm font-medium mb-1"
              >
                Production (Medium Grown):
              </label>
              <input
                type="number"
                id="productionMedium"
                name="productionMedium"
                value={formData.productionMedium}
                onChange={handleChange}
                className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="productionLow"
                className="block text-sm font-medium mb-1"
              >
                Production (Low Grown):
              </label>
              <input
                type="number"
                id="productionLow"
                name="productionLow"
                value={formData.productionLow}
                onChange={handleChange}
                className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="exportQuantity"
                className="block text-sm font-medium mb-1"
              >
                Export Quantity:
              </label>
              <input
                type="number"
                id="exportQuantity"
                name="exportQuantity"
                value={formData.exportQuantity}
                onChange={handleChange}
                className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="exportPrice"
                className="block text-sm font-medium mb-1"
              >
                Export Price:
              </label>
              <input
                type="number"
                id="exportPrice"
                name="exportPrice"
                value={formData.exportPrice}
                onChange={handleChange}
                className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="exchangeRate"
                className="block text-sm font-medium mb-1"
              >
                Exchange Rate:
              </label>
              <input
                type="number"
                id="exchangeRate"
                name="exchangeRate"
                value={formData.exchangeRate}
                onChange={handleChange}
                className="appearance-none bg-transparent border-b-2 border-gray-300 w-full text-gray-900 p-3 leading-tight focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full font-semibold bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Predict"}
            </button>
          </form>

          {/* Prediction Results */}
          <div className="bg-white rounded-lg p-6 border">
            <h2 className="text-2xl font-semibold mb-4">Prediction Results</h2>
            {loading && (
              <p className="text-green-500">Fetching prediction...</p>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {prediction ? (
              <div>
                <p>
                  <strong>High Grown Production:</strong>{" "}
                  {prediction.productionHigh} kg
                </p>
                <p>
                  <strong>Medium Grown Production:</strong>{" "}
                  {prediction.productionMedium} kg
                </p>
                <p>
                  <strong>Low Grown Production:</strong>{" "}
                  {prediction.productionLow} kg
                </p>
                <p>
                  <strong>Predicted Maximum FEE:</strong> $
                  {prediction.maxFEE.toFixed(2)}
                </p>
              </div>
            ) : (
              !loading && (
                <>
                  <p className="text-gray-500">
                    Enter inputs to see predictions.
                  </p>
                  <img
                    src={No_Data}
                    alt="No Data"
                    className="w-96 m-auto pt-12"
                  />
                </>
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForexPrediction;
