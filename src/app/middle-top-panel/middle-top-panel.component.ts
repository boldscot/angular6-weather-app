import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';
import { Hour } from '../hour';

@Component({
  selector: 'app-middle-top-panel',
  templateUrl: './middle-top-panel.component.html',
  styleUrls: ['./middle-top-panel.component.css']
})
export class MiddleTopPanelComponent implements OnInit {
  weatherData$: Object;
  currentDayName: string;
  hourlyData: Hour[];
  selectedLocation: string;

  constructor(private data: WeatherDataService) { 
    this.currentDayName = new Date().toLocaleDateString("ire", {weekday: 'long'});
    this.hourlyData = [];
    this.selectedLocation = this.data.getSelectedCity();
  }

  ngOnInit() {
    this.apiCall();
  }

  ngDoCheck() {
    if (this.data.getSelectedCity() !== this.selectedLocation) {
      // set the selectedlocation to the new value
      this.selectedLocation = this.data.getSelectedCity()
      //clear the hourly data
      this.hourlyData = [];
      //make the api call
      this.apiCall();
    }
  }

  apiCall() {
    this.data.getWeatherData(this.data.getCityID(this.selectedLocation, this.data.getCities())).subscribe(
      data => {this.weatherData$ = data}, err => console.error(err), () => {
        if(this.weatherData$ != null) {
          for(let hr of this.weatherData$.list) {
            if(this.hourlyData.length < 4) {
              if(new Date(hr.dt_txt).toLocaleDateString("ire",{weekday: 'long'}) === this.currentDayName) {
                this.hourlyData.push({
                  dayName: this.currentDayName,
                  time: hr.dt_txt.substring(11), 
                  highTemp: hr.main.temp_max, 
                  lowTemp: hr.main.temp_min,
                  description: hr.weather[0].description,
                  humidity: hr.main.humidity,
                  iconUrl: `http://openweathermap.org/img/w/${hr.weather[0].icon}.png`
                });
              } else {
                break;
              }
            } 
          }
        } 
    });
  }

}
