import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Stock, StockData } from 'src/app/models/stock.model';
import { FinnhubService } from 'src/app/services/finnhub.service';

@Component({
    selector: 'stock-item',
    templateUrl: './stock-item.component.html',
    styleUrls: ['./stock-item.component.scss'],
    host: { "class": "stock-item" }
})
export class StockItemComponent implements OnInit, OnDestroy {

    @Input() stock!: Stock;
    stockData!: StockData;

    #unsubscribeTrigger$ = new Subject();

    @Output() onRemove: EventEmitter<Stock> = new EventEmitter<Stock>();

    constructor(private finnhubService: FinnhubService, private ngZone: NgZone) { }

    ngOnDestroy(): void {
        this.#unsubscribeTrigger$.next(null);
        this.#unsubscribeTrigger$.complete();
    }

    ngOnInit(): void {
        // Using ngZone so we can set the local variable of the component because we are sending a callback to the service
        this.finnhubService.quote(this.stock.symbol, (error: any, data: any, response: any) => this.ngZone.run(() => {
            const stockData: StockData = {
                currentPrice: data.c,
                change: data.d,
                percentChange: data.dp,
                highPriceDay: data.h,
                lowPriceDay: data.l,
                openPriceDay: data.o,
                previousClosePrice: data.pc
            }

            this.stockData = stockData;
        }));
    }
}
