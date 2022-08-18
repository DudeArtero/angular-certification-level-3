import { Component, EventEmitter, Host, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { first, mergeMap, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { Location } from 'src/app/models/location.model';
import { WeatherService } from 'src/app/services/weather.service';
import { LocationMapper } from 'src/app/shared/mappers/location-mapper';

@Component({
    selector: 'location-item',
    templateUrl: './location-item.component.html',
    styleUrls: ['./location-item.component.scss'],
    host: { "class": "location-item" }
})
export class LocationItemComponent implements OnInit, OnDestroy {

    @Input() location!: Location;

    @Output() onRemove: EventEmitter<Location> = new EventEmitter<Location>();

    onDestroy$: Subject<void> = new Subject<void>();

    constructor(private weatherService: WeatherService) { }

    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    ngOnInit(): void {
        timer(0, 30000).pipe(
            takeUntil(this.onDestroy$),
            switchMap(
                () => this.weatherService.searchLocation(this.location.zipcode, this.location.countryCode)
                    .pipe(first())
            )
        ).subscribe(data => {
            this.location.data = LocationMapper.mapLocationData(data);
            console.log(this.location);
        })
        
    }
}
