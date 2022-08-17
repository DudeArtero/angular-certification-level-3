export interface Location {
    name: string;
    zipcode: number;
    countryCode: string;
    data?: LocationData;
}

export interface LocationData {
    main: string;
    currentTemp: number;
    minTemp: number;
    maxTemp: number;
    icon: string;
}

export interface LocationForecastData {
    date: Date;
    data: LocationData;
}