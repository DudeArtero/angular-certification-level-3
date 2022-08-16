import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { StockStorageService } from 'src/app/services/stock-storage.service';
import { WeatherService } from 'src/app/services/weather.service';
import { Stock } from 'src/app/models/stock.model';
import { map, Observable } from 'rxjs';
import { StateButtonState } from 'src/app/shared/components/state-button/state-button.model';
import { HttpClient } from '@angular/common/http';
import { DropdownItem } from 'src/app/shared/components/input-autocomplete/input-autocomplete.model';

@Component({
    selector: 'location-search',
    templateUrl: './location-search.component.html',
    styleUrls: ['./location-search.component.scss'],
})
export class LocationSearchComponent implements OnInit, OnDestroy {

    formGroupLocation = new FormGroup({
        zipcodeInput: new FormControl<number | null>(null, [
            Validators.required
        ]),
        countryInput: new FormControl<DropdownItem | null>(null)
    });

    get zipcodeInput(): AbstractControl | null {
        return this.formGroupLocation.get('zipcodeInput');
    }

    stocks$: Observable<Stock[]>;
    getCountries$!: Observable<DropdownItem[]>;
    searchLocation$!: Observable<any>;

    stateButtonState = StateButtonState;

    constructor(private stockStorageService: StockStorageService, private weatherService: WeatherService, private http: HttpClient) {
        this.stocks$ = this.stockStorageService.stocks$;
    }

    ngOnDestroy(): void {

    }

    ngOnInit(): void {
        this.getCountries$ = this.http.get<DropdownItem[]>("assets/data/country_data.json").pipe(
            map((items: any) => items.map((item: any) => ({id: item.Code, label: item.Name} as DropdownItem)))
        );
    }

    /**
     * Checks if the form is valid and search for all the filteres stocks in the Finnhub API.
     */
    onSubmitStock(): void {
        // Marks all the controls as touched so we can see the validation errors
        this.formGroupLocation.markAllAsTouched();

        if (this.formGroupLocation.valid) {
            const zipcode: number | null = this.formGroupLocation.value.zipcodeInput || null;
            const countryCode: DropdownItem | null = this.formGroupLocation.value.countryInput || null;
            this.searchLocation$ = this.weatherService.searchLocation(zipcode, countryCode?.id);
        }
    }

    addLocationCard(data: any) {
        console.log(data);
    }

    /**
     * Calls the StockStorageService to remove the retrieved stock.
     * @param stock Stock from StockItemComponent
     */
    removeStock(stock: Stock) {
        this.stockStorageService.removeStock(stock.symbol);
    }
}
