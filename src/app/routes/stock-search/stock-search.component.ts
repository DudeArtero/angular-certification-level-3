import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { StockStorageService } from 'src/app/services/stock-storage.service';
import { StockListResultComponent } from './stock-list-result/stock-list-result.component';
import { MatDialog } from '@angular/material/dialog';
import { FinnhubService } from 'src/app/services/finnhub.service';
import { Stock, StockData } from 'src/app/models/stock.model';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'stock-search',
    templateUrl: './stock-search.component.html',
    styleUrls: ['./stock-search.component.scss'],
})
export class StockSearchComponent implements OnInit, OnDestroy {
    formGroupStock: FormGroup = new FormGroup({
        stockInput: new FormControl('', [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(5),
        ]),
    });

    get stockInput(): AbstractControl | null {
        return this.formGroupStock.get('stockInput');
    }

    stocks$: Observable<Stock[]>;
    #unsubscribeTrigger$ = new Subject();
    loadingModal: boolean = false;

    constructor(private stockStorageService: StockStorageService, private finnhubService: FinnhubService, public dialog: MatDialog) {
        this.stocks$ = this.stockStorageService.stocks$;
    }

    ngOnDestroy(): void {
        this.#unsubscribeTrigger$.next(null);
        this.#unsubscribeTrigger$.complete();
    }

    ngOnInit(): void {
        this.finnhubService.searchSymbol$.pipe(
            takeUntil(this.#unsubscribeTrigger$)
        ).subscribe((stocks: Stock[]) => {
            this.#openDialog(stocks);
            this.loadingModal = false;
        });
    }

    /**
     * Checks if the form is valid and search for all the filteres stocks in the Finnhub API.
     */
    onSubmitStock(): void {
        // Marks all the controls as touched so we can see the validation errors
        this.formGroupStock.markAllAsTouched();

        if (this.formGroupStock.valid) {
            this.loadingModal = true;
            const filterValue: string = this.formGroupStock.value?.['stockInput'];
            this.finnhubService.searchSymbol(filterValue);
        }
    }

    /**
     * Calls the StockStorageService to remove the retrieved stock.
     * @param stock Stock from StockItemComponent
     */
    removeStock(stock: Stock) {
        this.stockStorageService.removeStock(stock.symbol);
    }

    /**
     * Opens a dialog with all the stocks obtained with the filter.
     * @param stocks Collection of Stock
     */
    #openDialog(stocks: Stock[]) {
        const dialogRef = this.dialog.open(StockListResultComponent, { data: { stocks: stocks } });

        dialogRef.afterClosed().subscribe((stock: Stock) => {
            if (stock)
                this.stockStorageService.addStock(stock);
        });
    }
}
