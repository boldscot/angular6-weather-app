import { Component, OnInit, Input} from '@angular/core';
import { WeatherDataService } from '../weather-data.service';
import { Day } from '../day';
import { Hour } from '../hour';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})

export class LeftPanelComponent implements OnInit {
  weatherData$: Object;
  temp: number;
  iconUrl: string;
  description: string;
  humidity: string;
  nextThreeDays: Map<string, Hour[]>;
  threeDayForecast: Day[];
  selectedLocation: string;

  constructor(private data: WeatherDataService) {
    this.nextThreeDays = new Map();
    this.threeDayForecast = [];
    //get the current city name to display data for from the service 
    this.selectedLocation  = this.data.getSelectedCity();
  }

  ngOnInit() {
    // initial api call
    this.apiCall(this.data.getCityID(this.selectedLocation, this.data.getCities()));
    // set the api call to update every hour
    setInterval(() => {
      this.apiCall(this.data.getCityID(this.selectedLocation, this.data.getCities()));
    }, 3600000)
  }

  ngDoCheck() {
    // check if the selectedCity from the service has changed
    if (this.data.getSelectedCity() !== this.selectedLocation) {
      // set the selectedlocation to the new value
      this.selectedLocation = this.data.getSelectedCity();
      // clear three day map
      this.nextThreeDays.clear();
      this.threeDayForecast = [];
      //mkae the api call
      this.apiCall(this.data.getCityID(this.selectedLocation, this.data.getCities()));
    }
  }

  // get the current weather using the selectedLocation
  getCurrentWeatherCall(id:string) {
    this.data.getCurrentWeatherDataByID(id).subscribe(
      data => {this.weatherData$ = data}, 
      err => console.error(err), 
      () => {
        if (this.weatherData$ != null) {
          this.temp = this.weatherData$.main.temp;
          this.humidity =  this.weatherData$.main.humidity;
          this.description = this.weatherData$.weather[0].description;
          this.iconUrl = `http://openweathermap.org/img/w/${this.weatherData$.weather[0].icon}.png`;
        }  
    });
  }

  apiCall(id:string) {
    // update the current weather  
    this.getCurrentWeatherCall(id);

    this.data.getWeatherData(id).subscribe(
      data => {this.weatherData$ = data}, err => console.error(err), () => {
        let today  = new Date().toLocaleDateString("ire", {weekday: 'long'});
        let day = today;

        // Loop over the ap response and pull out the data for the next three days, store it in the map
        // Using the day name to group hours together for that day
        for(let i = 0; i < this.weatherData$.list.length; i++) {
          let obj = this.weatherData$.list[i];
          day = new Date(obj.dt_txt).toLocaleDateString("ire",{weekday: 'long'});

          // We want data to represent the next three days excluding today,
          // So continue to the next loop iteration if the day === today
          if (day === today) continue;
          // Check the size of the map, if we have enough data break the loop
          else if (this.nextThreeDays.size < 4) {
            // Entry found for the day, add to the array for that day
            if(this.nextThreeDays.has(day)) {
                this.nextThreeDays.get(day).push({
                  dayName: day,
                  time: obj.dt_txt.substring(11),
                  highTemp: obj.main.temp_max,
                  lowTemp: obj.main.temp_min,
                  iconUrl: `http://openweathermap.org/img/w/${obj.weather[0].icon}.png`,
                  description: ''
                });
              } else {
                // No entry in the map so create one
                this.nextThreeDays.set(day, new Array);
              }
            } else {
              // The map size goes to 4, but the array 4th entry will be empty, so drop the entry
              this.nextThreeDays.delete(day);
              break;
            }
        }

        
        this.nextThreeDays.forEach((value: Array<Hour>, key: string) => {
          let high = 0.00;
          let low = 999.00;
          let icon = '';

          value.forEach(hr => {
            if (hr.highTemp > high) high = hr.highTemp;
            if (hr.lowTemp < low) low = hr.lowTemp;
            if (icon === '') {
              if ( hr.time === '12:00:00' || hr.time === '15:00:00' 
                || hr.time === '18:00:00' || hr.time === '21:00:00') {
                  icon = hr.iconUrl;
                }
            }
          });

          this.threeDayForecast.push({
            dayName: key,
            highTemp: high,
            lowTemp: low,
            iconUrl: icon,
            description: ''
          });
        });
      });
  }
}
