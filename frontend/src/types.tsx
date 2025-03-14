export interface InputFormState {
  month: number;
  production: number;
}

export interface PredictionResult {
  feeUsd: number;
  feeLkr: number;
}

interface ChartData {
  [key: string]: number | string;
}

interface ChartInfo {
  title: string;
  description: string;
  label: string;
  data: ChartData[];
}

export interface Chart {
  charts: ChartInfo[];
}

export interface ChartProps {
  data: ChartData[];
  label: string;
}
