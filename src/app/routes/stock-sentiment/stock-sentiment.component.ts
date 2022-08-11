import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stock, StockSentiment } from 'src/app/models/stock.model';
import { FinnhubService } from 'src/app/services/finnhub.service';
import { StockStorageService } from 'src/app/services/stock-storage.service';

@Component({
    selector: 'stock-sentiment',
    templateUrl: './stock-sentiment.component.html',
    styleUrls: ['./stock-sentiment.component.scss'],
})
export class StockSentimentComponent implements OnInit {

    stockSentiments: StockSentiment[] = [];
    stock: Stock | undefined;
    loading: boolean = false;

    monthNames: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    constructor(private route: ActivatedRoute, private finnhubService: FinnhubService, private stockStorageService: StockStorageService, private ngZone: NgZone) { }

    ngOnInit(): void {
        this.loading = true;
        const symbol = this.route.snapshot.params['symbol'];

        this.stock = this.#getStock(symbol);
        this.#getStockSentiment(symbol);
    }

    #getStock(symbol: string): Stock | undefined {
        return this.stockStorageService.getStock(symbol);
    }

    #getStockSentiment(symbol: string): void {
        const today = new Date();
        today.setDate(1);
        const threeMonthsbefore = new Date(today.getFullYear(), today.getMonth() - 2, 2);

        // Using ngZone so we can set the local variable of the component because we are sending a callback to the service
        this.finnhubService.insiderSentiment(symbol, threeMonthsbefore, today, (error: any, data: any, response: any) => this.ngZone.run(() => {
            this.stockSentiments = data.data as StockSentiment[];
            this.loading = false;
        }));
    }
}
