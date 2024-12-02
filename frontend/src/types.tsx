export interface InputFormState {
  date: string; // Format: YYYY-MM
  productionHigh: number;
  productionMedium: number;
  productionLow: number;
  exportQuantity: number;
  exportPrice: number;
  exchangeRate: number;
}

export interface PredictionResult {
  productionHigh: number;
  productionMedium: number;
  productionLow: number;
  maxFEE: number;
}
