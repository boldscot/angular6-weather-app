import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WeatherDataService {
  weatherData$: Object; 
  constructor(private http: HttpClient) { }

  getWeatherData() {
    return this.weatherData$= 
      this.http.get('https://api.openweathermap.org/data/2.5/forecast?id=2960991&APPID=cb6f52333c98f1ed947e3bb5de394074&units=metric');
  }

  getCurrentWeatherDataByID(id: string) {
    return this.weatherData$= 
      this.http.get(`https://api.openweathermap.org/data/2.5/weather?id=${id}&APPID=cb6f52333c98f1ed947e3bb5de394074&units=metric`);
  }
}
