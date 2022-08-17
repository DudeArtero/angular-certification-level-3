import { Location, LocationData, LocationForecastData } from "src/app/models/location.model";

export class LocationMapper {

    constructor() { }

    static mapLocation(data: any, zipcode: number = 0, countryCode: string = "US"): Location {
        return {
            name: data.name,
            zipcode: zipcode,
            countryCode: countryCode
        }
    }

    static mapLocationData(data: any): LocationData {
        return {
            main: data.weather[0]?.main || "",
            icon: data.weather[0]?.icon || "",
            currentTemp: data.main.temp,
            minTemp: data.main.temp_min,
            maxTemp: data.main.temp_max
        };
    }
}