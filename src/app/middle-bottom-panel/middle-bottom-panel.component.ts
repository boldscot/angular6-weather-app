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
    this.cities = new Map([
      ['dublin', '5344157'],
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
    
  }

  onSelect(loc: string) {
    this.selectedLocation = loc;
  }

  ngOnInit() {
    this.cities.forEach((value: string, key: string) => {
      this.data.getCurrentWeatherDataByID(value).subscribe(data => {this.weatherData$ = data}, err => console.error(err), () =>{
        if(this.weatherData$ != null) {
          this.weatherLocationData.push({
            name: key,
            temp: this.weatherData$.main.temp,
            iconUrl: `http://openweathermap.org/img/w/${this.weatherData$.weather[0].icon}.png`
          })
        }
      })
    });


  }
}
