import { Component, EventEmitter, Host, Input, OnInit, Output } from '@angular/core';
import { Location } from 'src/app/models/location.model';
import { WeatherService } from 'src/app/services/weather.service';
import { LocationMapper } from 'src/app/shared/mappers/location-mapper';

@Component({
    selector: 'location-item',
    templateUrl: './location-item.component.html',
    styleUrls: ['./location-item.component.scss'],
    host: { "class": "location-item" }
})
export class LocationItemComponent implements OnInit {

    @Input() location!: Location;

    @Output() onRemove: EventEmitter<Location> = new EventEmitter<Location>();

    constructor(private weatherService: WeatherService) { }

    ngOnInit(): void {
        this.weatherService.searchLocation(this.location.zipcode, this.location.countryCode).subscribe(data => {
            this.location.data = LocationMapper.mapLocationData(data);
            console.log(this.location);
        });
    }
}
