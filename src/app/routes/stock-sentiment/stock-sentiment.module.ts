import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { StockSentimentComponent } from './stock-sentiment.component';

const routes: Routes = [
    {
        path: ':symbol',
        component: StockSentimentComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes), 
        CommonModule,
        SharedModule
    ],
    declarations: [StockSentimentComponent],
})
export class StockSentimentModule { }
