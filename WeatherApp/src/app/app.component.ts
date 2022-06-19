import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { City } from './city';

import { WeatherAppService } from './services/weather-app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  code: string = "";
  city: string = "";
  cityMap: string = "";
  favoriteCities: City[] = [];

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

  constructor(private waService: WeatherAppService, public sanitizer: DomSanitizer) {
    this.recoverCityData();
  }

  ngOnInit() {
    
  }

  searchCity(city?: string, code?: string) {
    if(city && code) {
      this.city = city;
      this.code = code;
    }

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
        this.cityMap = this.city;
      },
      err => console.log(err)
    )
  }

  addCity(){
    let cityFav = {
      city: this.city,
      code: this.code
    }

    this.favoriteCities.push(cityFav);

    localStorage.setItem("cityFav", JSON.stringify(this.favoriteCities));
  }

  recoverCityData(){
    let cityF = localStorage.getItem("cityFav")

    let cityFav = JSON.parse(cityF ? cityF : "[]");

    this.favoriteCities = cityFav
  }

  removeCity(){
    this.favoriteCities = this.favoriteCities.filter(cityF => cityF.city != this.city)

    localStorage.setItem("cityFav", JSON.stringify(this.favoriteCities));
  }

  get isFavorite(){
    return this.favoriteCities.find(cityF => cityF.city == this.city)
  }
}
