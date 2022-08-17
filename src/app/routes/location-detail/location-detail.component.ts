import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, LocationData, LocationForecastData } from 'src/app/models/location.model';
import { LocationStorageService } from 'src/app/services/location-storage.service';
import { WeatherService } from 'src/app/services/weather.service';
import { LocationMapper } from 'src/app/shared/mappers/location-mapper';
import { ArrayManagement } from 'src/app/shared/utils/array-management';

@Component({
    selector: 'location-detail',
    templateUrl: './location-detail.component.html',
    styleUrls: ['./location-detail.component.scss'],
})
export class LocationDetailComponent implements OnInit {

    location!: Location;

    constructor(private route: ActivatedRoute, private weatherService: WeatherService, private locationStorageService: LocationStorageService) { }

    ngOnInit(): void {
        const name = this.route.snapshot.params['name'];
        this.location = this.locationStorageService.getLocation(name)!;

        this.weatherService.searchFiveDayForecast(this.location.zipcode, this.location.countryCode).subscribe(data => {
            // Transform the dates of the list in the format mm-dd-yyyy so we can group it later
            data.list.map((item: any) => {
                let dateItem = new Date(item.dt_txt);
                item.dt_txt_group_key = this.#getShortDateString(dateItem);
            })

            let forecastData: any = ArrayManagement.groupBy(data.list, "dt_txt_group_key");
            let locationDataList: LocationForecastData[] = [];

            for (const key in forecastData) {
                locationDataList.push({
                    date: new Date(key),
                    data: LocationMapper.mapLocationData(forecastData[key][0])
                });
            }
        });
    }

    #getShortDateString(date: Date): string {
        return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    }
}
