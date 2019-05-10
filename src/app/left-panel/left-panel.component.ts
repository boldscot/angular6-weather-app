import { Component, OnInit, Input} from '@angular/core';
import { WeatherDataService } from '../weather-data.service';
import { Day } from '../day';

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
  nextThreeDays: Day[];
  selectedLocation: string;

  constructor(private data: WeatherDataService) {
    this.nextThreeDays = [];
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
      // clear three day array
      this.nextThreeDays =[];
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
        let currentDayName = today;
        let hTemp = 0.0;
        let lTemp = 999.00;
        let iUrl = '';

        if(this.weatherData$ != null) {
          // once there is data for three days stored, end the loop
          for (let i = 0; i < this.weatherData$.list.length; i++) {
            if(new Date(this.weatherData$.list[i].dt_txt).toLocaleDateString("ire",{weekday: 'long'}) === today) continue;
            else {
                // check if there are three entries in the nextThreeDays array
                if(this.nextThreeDays.length < 3) {
                let n = new Date(this.weatherData$.list[i].dt_txt).toLocaleDateString("ire",{weekday: 'long'});
                // store the name of the day in n    
                if(n === currentDayName) {
                  // find the highest temp for the day
                  if(this.weatherData$.list[i].main.temp_max > hTemp) hTemp = this.weatherData$.list[i].main.temp_max;
                  // find the lowest temp for the day
                  if(this.weatherData$.list[i].main.temp_min < lTemp) lTemp = this.weatherData$.list[i].main.temp_min;
                  // use the weather icon where the time is 12 pm
                  if (iUrl === '') {
                    if(this.weatherData$.list[i].dt_txt.substring(11) === '12:00:00') {
                        iUrl = `http://openweathermap.org/img/w/${this.weatherData$.list[i].weather[0].icon}.png`;
                    }
                  }
                  
                } else {
                  // push day object to array
                  this.nextThreeDays.push({
                    dayName: n,
                    highTemp: hTemp,
                    lowTemp: lTemp,
                    iconUrl: iUrl,
                    description: ""
                  });
                  // change n to new day name
                  currentDayName = n;
                  //reset properties
                  hTemp = 0.0;
                  lTemp = 999.00;
                  iUrl = '';
                }
              } else 
                break;
            }
              
          }
        }
      });
  }
}
