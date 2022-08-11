export interface Stock {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
    data: any;
}

export interface StockData {
    currentPrice: number;
    change: number;
    percentChange: number;
    highPriceDay: number;
    lowPriceDay: number;
    openPriceDay: number;
    previousClosePrice: number;
}

export interface StockSentiment {
    month: number;
    year: number;
    change: number;
    mspr: number
    symbol: string;
}