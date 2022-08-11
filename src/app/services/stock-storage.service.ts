import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Stock } from '../models/stock.model';

@Injectable({
    providedIn: 'root',
})
export class StockStorageService {

    readonly #STOCK_KEY: string = 'stocks';
    #stocks$ = new BehaviorSubject<Stock[]>(this.#getStocks());

    get stocks$(): Observable<Stock[]> {
        return this.#stocks$.asObservable();
    }

    /**
     * Adds a new stock to the current stock list stored in localStorage, only if the stock isn't in the list.
     * @param stock Stock symbol
     */
    addStock(newStock: Stock): void {
        let stocks: Stock[] = this.#getStocks();

        if (!stocks.some(stock => stock.symbol === newStock.symbol)) {
            stocks.push(newStock);
            localStorage.setItem(this.#STOCK_KEY, JSON.stringify(stocks));
    
            this.#stocks$.next(stocks);
        }
    }

    /**
     * Returns the stock which has the provided symbol.
     * @param symbol Symbol of the stock
     * @returns Stock | undefined
     */
    getStock(symbol: string): Stock | undefined {
        return this.#getStocks().find(stock => stock.symbol === symbol);
    }

    /**
     * Removes the provided stock from the list stored in localStorage.
     * @param stock Stock symbol
     */
    removeStock(symbol: string): void { 
        const stocks: Stock[] = this.#getStocks();

        let filteredStocks: Stock[] = stocks.filter(storedStock => storedStock.symbol !== symbol);
        localStorage.setItem(this.#STOCK_KEY, JSON.stringify(filteredStocks));

        this.#stocks$.next(filteredStocks);
    }

    /**
     * Returns an array of string from localStorage with the stocks. Empty array if there isn't any.
     * @returns String[] with the stocks.
     */
    #getStocks(): Stock[] { 
        return (<Stock[]>JSON.parse(localStorage.getItem(this.#STOCK_KEY) ?? '[]')) ?? [];
    }
}
