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
    Latitude: 0,
    Longitude: 0
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
        this.weatherParameters.Temperature = Math.round(res.main.temp - 273.15);
        this.weatherParameters.maxTemperature = Math.round(res.main.temp_max - 273.15);
        this.weatherParameters.minTemperature = Math.round(res.main.temp_min - 273.15);
        this.weatherParameters.thermalSense = Math.round(res.main.feels_like - 273.15);
        this.weatherParameters.Pressure = res.main.pressure;
        this.weatherParameters.Humidity = res.main.humidity;
        this.weatherParameters.Latitude = res.coord.lat;
        this.weatherParameters.Longitude = res.coord.lon;
      },
      err => console.log(err)
    )
  }
}
