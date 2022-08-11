import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { StockItemComponent } from './stock-item/stock-item.component';
import { StockListResultComponent } from './stock-list-result/stock-list-result.component';
import { StockSearchComponent } from './stock-search.component';

const routes: Routes = [
    {
        path: '',
        component: StockSearchComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes), 
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        SharedModule
    ],
    declarations: [
        StockSearchComponent,
        StockListResultComponent,
        StockItemComponent
    ],
})
export class StockSearchModule { }
