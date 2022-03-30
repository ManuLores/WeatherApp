import { Component, OnInit } from '@angular/core';

import { WeatherAppService } from './services/weather-app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  code: string = "";
  city: string = "";

  weatherParameters = {
    Weather: "",
    Temperature: 0,
    maxTemperature: 0,
    minTemperature: 0,
    thermalSense: 0,
    Pressure: 0,
    Humidity: 0,
    Altitude: 0,
    Latitude: 0
  }

  constructor(private waService: WeatherAppService) {
  }

  ngOnInit() {
    
  }

  searchCity() {
    console.log(this.city, this.code)
    this.waService.getWeather(this.city, this.code).subscribe(
      result => {
        let res: any = result;
        this.weatherParameters.Weather = res.weather[0].main;
        this.weatherParameters.Temperature = res.main.temp;
        this.weatherParameters.maxTemperature = res.main.temp_max;
        this.weatherParameters.minTemperature = res.main.temp_min;
        this.weatherParameters.thermalSense = res.main.feels_like;
        this.weatherParameters.Pressure = res.main.pressure;
        this.weatherParameters.Humidity = res.main.humidity;
        this.weatherParameters.Altitude = res.coord.lat;
        this.weatherParameters.Latitude = res.coord.lon;
      },
      err => console.log(err)
    )
  }
}
