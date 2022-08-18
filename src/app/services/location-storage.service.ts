import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../models/location.model';

@Injectable({
    providedIn: 'root',
})
export class LocationStorageService {

    readonly #LOCATION_KEY: string = 'locations';
    #locations$ = new BehaviorSubject<Location[]>(this.#getLocations());

    get locations$(): Observable<Location[]> {
        return this.#locations$.asObservable();
    }

    /**
     * Adds a new location to the current list stored in localStorage, only if the location isn't in the list.
     * @param newLocation new Location to add
     */
    addLocation(newLocation: Location): void {
        let locations: Location[] = this.#getLocations();

        if (!locations.some(location => location.zipcode === newLocation.zipcode && location.name === newLocation.name)) {
            locations.push(newLocation);
            localStorage.setItem(this.#LOCATION_KEY, JSON.stringify(locations));

            this.#locations$.next(locations);
        }
    }

    /**
     * Returns the location which has the provided name.
     * @param name Name of the location
     * @returns Location | undefined
     */
    getLocation(zipcode: number, name: string): Location | undefined {
        return this.#getLocations().find(location => location.zipcode === zipcode && location.name === name);
    }

    /**
     * /**
     * Removes the provided location from the list stored in localStorage.
     * @param zipcode zipcode of the location
     * @param name Name of the location
     */
    removeLocation(zipcode: number, name: string): void {
        const locations: Location[] = this.#getLocations();
        let filteredLocations: Location[] = locations.filter(storedLocation => !(storedLocation.name === name && storedLocation.zipcode === zipcode));
        localStorage.setItem(this.#LOCATION_KEY, JSON.stringify(filteredLocations));

        this.#locations$.next(filteredLocations);
    }

    /**
     * Returns an array of string from localStorage with the locations. Empty array if there isn't any.
     * @returns String[] with the locations.
     */
    #getLocations(): Location[] {
        return (<Location[]>JSON.parse(localStorage.getItem(this.#LOCATION_KEY) ?? '[]')) ?? [];
    }
}
