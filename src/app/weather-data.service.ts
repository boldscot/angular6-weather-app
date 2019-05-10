import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WeatherDataService {
  weatherData$: Object;
  cities: Map<string, string>;
  selectedCity: string;
  selectedCityID: string;

  constructor(private http: HttpClient) { 
    // map of locations and their ids
    this.cities = new Map([
      ['dublin', '2964574'],
      ['waterford', '2960991'],
      ['london', '2643743'],
      ['paris', '2988507'],
      ['madrid', '6359304'],
      ['cairo', '360630'],
      ['washington', '4880731'],
      ['new york', '5128638'],
      ['canberra', '2172517'],
      ['tokyo', '1850147'],
    ]);

    //init selected city and id
    this.selectedCity = "waterford";
    this.selectedCityID = this.getCityID(this.selectedCity, this.cities);
  }

  // return a five day forecast for a location
  getWeatherData(id: string) {
    return this.weatherData$= 
      this.http.get(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&APPID=cb6f52333c98f1ed947e3bb5de394074&units=metric`);
  }

  // Return the current weather for a location
  getCurrentWeatherDataByID(id: string) {
    return this.weatherData$= 
      this.http.get(`https://api.openweathermap.org/data/2.5/weather?id=${id}&APPID=cb6f52333c98f1ed947e3bb5de394074&units=metric`);
  }

  // return the map of cities 
  getCities() {
    return this.cities;
  }

  // return a location id using its name
  getCityID(key: string, map: Map<string, string>) {
    return map.get(key);
  }

  // return the currently selected city
  getSelectedCity() {
    return this.selectedCity;
  }

  // set the selected city value
  setSelectedCity(city: string) {
    this.selectedCity = city;
  }
}
