import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationDetailComponent } from './location-detail.component';

const routes: Routes = [
    {
        path: ':name',
        component: LocationDetailComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes), 
        CommonModule,
        SharedModule
    ],
    declarations: [LocationDetailComponent],
})
export class LocationDetailModule { }
