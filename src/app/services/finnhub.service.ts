import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Stock, StockData } from '../models/stock.model';

@Injectable({
    providedIn: 'root',
})
export class FinnhubService {

    readonly #FINNHUB_CLIENT;

    searchSymbol$: Subject<Stock[]> = new Subject<Stock[]>();
    quote$: Subject<StockData> = new Subject<StockData>();

    constructor() {
        const finnhub = require('finnhub');
        const api_key = finnhub.ApiClient.instance.authentications['api_key'];
        api_key.apiKey = 'bu4f8kn48v6uehqi3cqg'; //'cb98ed2ad3i0v9a26s1g';
        this.#FINNHUB_CLIENT = new finnhub.DefaultApi();
    }

    /**
     * Gets all the stocks which match with the filter and emits the searchSymbol$ subject to notify the update on the list.
     * @param filter String to filter and get the stocks
     */
    searchSymbol(filter: string): void {
        this.#FINNHUB_CLIENT.symbolSearch(filter, (error: any, data: any, response: any) => {
            const stocks: Stock[] = data.result as Stock[];
            this.searchSymbol$.next(stocks);
        });
    }

    /**
     * Gets all the information about a symbol stock and calls a custom callback.
     * @param symbol Symbol stock
     * @param callback Custom callback
     */
    quote(symbol: string, callback: (error: any, data: any, response: any) => void): void {
        this.#FINNHUB_CLIENT.quote(symbol, callback);
    }

    /**
     * Gets all the sentiment information about a symbol stock and calls a custom callback.
     * @param symbol Symbol stock
     * @param from Date limit to start searching
     * @param to Date limit to end searching
     * @param callback Custom callback
     */
    insiderSentiment(symbol: string, from: Date, to: Date, callback: (error: any, data: any, response: any) => void): void {
        const fromValue: string = from.toISOString().split('T')[0];
        const toValue: string = to.toISOString().split('T')[0];

        this.#FINNHUB_CLIENT.insiderSentiment(symbol, fromValue, toValue, callback);
    }
}
