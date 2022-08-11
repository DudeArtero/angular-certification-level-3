import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stock } from 'src/app/models/stock.model';

@Component({
    selector: 'stock-list-result',
    templateUrl: './stock-list-result.component.html',
    styleUrls: ['./stock-list-result.component.scss'],
})
export class StockListResultComponent {

    constructor(public dialogRef: MatDialogRef<StockListResultComponent>, @Inject(MAT_DIALOG_DATA) public data: { stocks: Stock[] }) { }
}
