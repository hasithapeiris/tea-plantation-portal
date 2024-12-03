export interface InputFormState {
  year: number;
  month: number;
  exportQuantity: number;
  exportPrice: number;
  exchangeRate: number;
}

export interface PredictionResult {
  HighGrownProduction: number;
  MediumGrownProduction: number;
  LowGrownProduction: number;
  maxFEE: number;
}
