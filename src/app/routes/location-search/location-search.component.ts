import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';
import { map, Observable } from 'rxjs';
import { StateButtonState } from 'src/app/shared/components/state-button/state-button.model';
import { HttpClient } from '@angular/common/http';
import { DropdownItem } from 'src/app/shared/components/input-autocomplete/input-autocomplete.model';
import { LocationStorageService } from 'src/app/services/location-storage.service';
import { Location } from 'src/app/models/location.model';
import { LocationMapper } from 'src/app/shared/mappers/location-mapper';

@Component({
    selector: 'location-search',
    templateUrl: './location-search.component.html',
    styleUrls: ['./location-search.component.scss'],
})
export class LocationSearchComponent implements OnInit {

    formGroupLocation = new FormGroup({
        zipcodeInput: new FormControl<number | null>(null, [
            Validators.required
        ]),
        countryInput: new FormControl<DropdownItem | null>(null)
    });

    get zipcodeInput(): AbstractControl | null {
        return this.formGroupLocation.get('zipcodeInput');
    }

    locations$: Observable<Location[]>;
    getCountries$!: Observable<DropdownItem[]>;
    searchLocation$!: Observable<any>;

    stateButtonState = StateButtonState;

    constructor(private locationStorageService: LocationStorageService, private weatherService: WeatherService, private http: HttpClient) {
        this.locations$ = this.locationStorageService.locations$;
    }

    ngOnInit(): void {
        this.getCountries$ = this.http.get<DropdownItem[]>("assets/data/country_data.json").pipe(
            map((items: any) => items.map((item: any) => ({id: item.Code, label: item.Name} as DropdownItem)))
        );
    }

    /**
     * Checks if the form is valid and changes the observable to be executed in the button.
     */
    onSubmit(): void {
        // Marks all the controls as touched so we can see the validation errors
        this.formGroupLocation.markAllAsTouched();

        if (this.formGroupLocation.valid) {
            const zipcode: number | null = this.formGroupLocation.value.zipcodeInput || null;
            const countryCode: DropdownItem | null = this.formGroupLocation.value.countryInput || null;
            this.searchLocation$ = this.weatherService.searchLocation(zipcode, countryCode?.id);
        }
    }

    /**
     * Adds a new location to the local storage so we can load it later when reloading the browser
     * @param data Data of the new location
     */
    addLocationCard(data: any) {
        let newLocation: Location = LocationMapper.mapLocation(data, this.formGroupLocation.value.zipcodeInput!, this.formGroupLocation.value.countryInput?.id);
        this.locationStorageService.addLocation(newLocation);
    }

    /**
     * Calls the LocationStorageService to remove the retrieved location.
     * @param location Location from LocationItemComponent
     */
    removeLocation(location: Location) {
        this.locationStorageService.removeLocation(location.name);
    }
}
