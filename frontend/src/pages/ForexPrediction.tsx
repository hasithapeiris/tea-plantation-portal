import React, { useState } from "react";
import axios from "axios";
import { InputFormState, PredictionResult } from "../types";

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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Predict Foreign Exchange Earnings (FEE)
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <form
          className="bg-white shadow-lg rounded-lg p-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold mb-4">Input Features</h2>

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
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:outline-none"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:outline-none"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:outline-none"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:outline-none"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:outline-none"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:outline-none"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {/* Prediction Results */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Prediction Results</h2>
          {loading && <p className="text-blue-500">Fetching prediction...</p>}
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
              <p className="text-gray-500">Enter inputs to see predictions.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ForexPrediction;
