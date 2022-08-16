import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Stock, StockData } from '../models/stock.model';

@Injectable({
    providedIn: 'root',
})
export class WeatherService {

    readonly #API_KEY = '0416cc4e2e58897d8eb75c89028fe526';

    searchSymbol$: Subject<Stock[]> = new Subject<Stock[]>();
    quote$: Subject<StockData> = new Subject<StockData>();

    constructor(private http: HttpClient) {
        
    }

    searchLocation(zipcode: number | null | undefined, country: string = ''): Observable<any> {
        return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},${country}&appid=${this.#API_KEY}`);
    }
}
