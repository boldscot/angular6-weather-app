import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';
import { Day } from '../day';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  weatherData$: Object;
  selectedLocation: string;
  forecast: Day[];
  currentDay: string;

  constructor(private data: WeatherDataService) {
    this.selectedLocation = this.data.getSelectedCity();
    this.forecast = [];
    this.currentDay = new Date().toLocaleDateString('ire', {weekday: 'long'});
  }

  apiCall(id: string) {
    this.data.getWeatherData(id).subscribe(data => {this.weatherData$ = data}, err => console.error(err), () => {
      if(this.weatherData$ != null) {

        let hTemp = 0.00;
        let lTemp = 999.00;
        let iUrl = '';
        let description = '';

        this.weatherData$.list.forEach(obj => {
          if(this.currentDay === new Date(obj.dt_txt).toLocaleDateString("ire",{weekday: 'long'})) {
            if(obj.main.temp_max > hTemp) hTemp = obj.main.temp_max; 
            if(obj.main.temp_min < lTemp) lTemp = obj.main.temp_min;
            if(obj.dt_txt.substring(11) === '12:00:00' || obj.dt_txt.substring(11) === "21:00:00") {
              iUrl = `http://openweathermap.org/img/w/${obj.weather[0].icon}.png`;
              description = obj.weather[0].description;
            }
          } else {
            if (this.forecast.length === 0) this.currentDay = 'Today';
            this.forecast.push({
              dayName: this.currentDay,
              highTemp: hTemp,
              lowTemp: lTemp,
              iconUrl: iUrl,
              description: description
            });

            hTemp = 0.00;
            lTemp = 999.00;
            iUrl = '';
            description = '';
            this.currentDay = new Date(obj.dt_txt).toLocaleDateString("ire",{weekday: 'long'});
          }
        });
      }
    });
  }

  ngOnInit() {
    this.apiCall(this.data.getCityID(this.selectedLocation, this.data.getCities()));
  }

  ngDoCheck() {
    // check if the selectedCity from the service has changed
    if (this.data.getSelectedCity() !== this.selectedLocation) {
      // set the selectedlocation to the new value
      this.selectedLocation = this.data.getSelectedCity();
      // clear three day array
      this.forecast =[];
      //mkae the api call
      this.apiCall(this.data.getCityID(this.selectedLocation, this.data.getCities()));
    }
  }

}
