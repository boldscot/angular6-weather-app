import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';
import { BasicDay } from '../basic-day';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  weatherData$: Object;
  temp: number;
  iconUrl: string;
  currentDayName: string;
  description: string;
  nextThreeDays: BasicDay[];

  constructor(private data: WeatherDataService) {
    this.currentDayName = new Date().toLocaleDateString("ire", {weekday: 'long'});
    this.nextThreeDays = [];
  }

  ngOnInit() {
    this.data.getWeatherData().subscribe(
      data => {this.weatherData$ = data}, err => console.error(err), () => { 
        if(this.weatherData$ != null) {
          for (let i = 0; i < this.weatherData$.list.length; i++) {
            if(i === 0) {
              this.temp = this.weatherData$.list[i].main.temp;
              let tempIcon = this.weatherData$.list[i].weather[0].icon;
              this.iconUrl = `http://openweathermap.org/img/w/${tempIcon}.png`;
              this.description = this.weatherData$.list[i].weather[0].description;
            } else {
              if(this.nextThreeDays.length < 3) {
                let n = new Date(this.weatherData$.list[i].dt_txt).toLocaleDateString("ire",{weekday: 'long'});
                if(n === this.currentDayName) continue; 
                else {
                  this.nextThreeDays.push({
                    dayName: n,
                    highTemp: this.weatherData$.list[i].main.temp_max,
                    lowTemp: this.weatherData$.list[i].main.temp_min,
                    iconUrl:`http://openweathermap.org/img/w/${this.weatherData$.list[i].weather[0].icon}.png`
                  });
                  this.currentDayName = n;
                }
              } else 
                break;
            }
          }
        }
      });
  }

}
