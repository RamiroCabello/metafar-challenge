export interface Stock {
  country: string;
  currency: string;
  exchange: string;
  mic_code: string;
  name: string;
  symbol: string;
  type: string;
};

export interface SelectOption {
  label: string;
  value: string;
};

export interface StockPriceData {
  close: string;
  datetime: string;
  high: string;
  low: string;
  open: string;
  volume: string;
};