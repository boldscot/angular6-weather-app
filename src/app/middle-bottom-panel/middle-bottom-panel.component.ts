import { Component, OnInit } from '@angular/core';
import { LocationWeather } from '../locationWeatherData';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-middle-bottom-panel',
  templateUrl: './middle-bottom-panel.component.html',
  styleUrls: ['./middle-bottom-panel.component.css']
})

export class MiddleBottomPanelComponent implements OnInit {
  weatherData$: Object;
  weatherLocationData: LocationWeather[];
  cities: Map<string, string>;
  selectedLocation: string;

  constructor(private data: WeatherDataService) { 
    this.weatherLocationData = [];
    // get city list from service and use the selected city from service as selectedLocation
    this.cities = this.data.getCities();
    this.selectedLocation = this.data.getSelectedCity();
  }

  // event handler for click event, change the selected location
  onSelect(loc: string) {
    this.selectedLocation = loc;
    this.data.setSelectedCity(loc);
  }

  ngOnInit() {
    this.apiCall();
    // look over the map and create locationWeatherData objects from an api call and map values
    setInterval(() => {
      this.weatherLocationData = [];
      this.apiCall();
    }, 1000000);
  }

  apiCall() {
    this.cities.forEach((value: string, key: string) => {
      this.data.getCurrentWeatherDataByID(value).subscribe(
        data => {this.weatherData$ = data}, 
        err => console.error(err), 
        () => {
          if(this.weatherData$ != null) {
            this.weatherLocationData.push({
              name: key,
              temp: this.weatherData$.main.temp,
              iconUrl: `http://openweathermap.org/img/w/${this.weatherData$.weather[0].icon}.png`
          })
        }
      })
    })
  }
}
