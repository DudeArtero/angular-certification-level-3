import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationItemComponent } from './location-item/location-item.component';
import { LocationSearchComponent } from './location-search.component';

const routes: Routes = [
    {
        path: '',
        component: LocationSearchComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes), 
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        LocationSearchComponent,
        LocationItemComponent
    ],
})
export class LocationSearchModule { }
