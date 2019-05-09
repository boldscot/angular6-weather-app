import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';
import { Hour } from '../hour';
import { Day } from '../day';

@Component({
  selector: 'app-five-days-weather',
  templateUrl: './five-days-weather.component.html',
  styleUrls: ['./five-days-weather.component.css']
})

export class FiveDaysWeatherComponent implements OnInit {
  weatherData$: Object;
  currentDayName: string;   //reference to the day that the hourly updates belong to
  currentDayHighTemp: number; //reference to the days highest temp
  currentDayLowTemp: number; //reference to the days lowest temp
  currentDayIconUrl: string; //referecne to the days icon
  currentDayHumidity: string; //reference to the days humdity
  currentDayDescription: string; //reference to the days weather description


  // the hour array will be added to the Day objects as hourly data
  hours: Hour[];
  days: Day[];

  constructor(private data: WeatherDataService) {
    // init some property values
    this.currentDayName = new Date().toLocaleDateString("ire", {weekday: 'long'});
    this.currentDayHighTemp = 0.00;
    this.currentDayLowTemp  = 9999.99;
    this.hours = [];
    this.days = [];
  }

  ngOnInit() {
    this.data.getWeatherData().subscribe(
      data => {this.weatherData$ = data}, err => console.error(err), () => { 
        //loop over the data from the api call and create weather objects
        for (let hr of this.weatherData$.list) {
          if(new Date(hr.dt_txt).toLocaleDateString("ire",{weekday: 'long'}) === this.currentDayName) {  
            this.hours.push({ 
              dayName: this.currentDayName,
              time: hr.dt_txt.substring(11), 
              highTemp: hr.main.temp_max, 
              lowTemp: hr.main.temp_min,
              description: hr.weather[0].description,
              humidity: hr.main.humidity,
              iconUrl: `http://openweathermap.org/img/w/${hr.weather[0].icon}.png`
            });
            // Find the highest temp
            if(hr.main.temp_max > this.currentDayHighTemp) this.currentDayHighTemp = hr.main.temp_max;
            // find the lowest temp
            if(hr.main.temp_min < this.currentDayLowTemp) this.currentDayLowTemp = hr.main.temp_min;
            // set value for the icon
            if (this.currentDayIconUrl == null) this.currentDayIconUrl = `http://openweathermap.org/img/w/${hr.weather[0].icon}.png`;
            // set the value for th humdity
            if (this.currentDayHumidity == null) this.currentDayHumidity = hr.main.humidity;
            // set the value for th description
            if (this.currentDayDescription == null) this.currentDayDescription = hr.weather[0].description;
          } else {
            // add the day and its hours to the days array
            this.days.push({ 
              dayName: this.currentDayName, 
              highTemp: this.currentDayHighTemp, 
              lowTemp: this.currentDayLowTemp,
              iconUrl: this.currentDayIconUrl,
              humidity: this.currentDayHumidity,
              description: this.currentDayDescription,
              hourlyData: this.hours
            });
            // update the day
            this.currentDayName = new Date(hr.dt_txt).toLocaleDateString("ire",{weekday: 'long'});
            // clear the hour array
            this.hours = [];
            // update the currentDay property values
            this.currentDayHighTemp = hr.main.temp_max;
            this.currentDayLowTemp = hr.main.temp_min;
            this.currentDayHumidity = hr.main.humidity;
            this.currentDayDescription = hr.weather[0].description;
            this.currentDayIconUrl =`http://openweathermap.org/img/w/${hr.weather[0].icon}.png`;
            // push hour to now empty hour array
            this.hours.push({ 
              dayName: this.currentDayName,
              time: hr.dt_txt.substring(11), 
              highTemp: hr.main.temp_max, 
              lowTemp: hr.main.temp_min,
              description: hr.weather[0].description,
              humidity: hr.main.humidity,
              iconUrl: `http://openweathermap.org/img/w/${hr.weather[0].icon}.png`
            });
          }
        }
      }
    );
  }
}