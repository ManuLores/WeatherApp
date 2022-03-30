import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherAppService { 
  APIurl: string = '';

  constructor(private http: HttpClient) { 
    this.APIurl = 'https://api.openweathermap.org/data/2.5/weather?appid=e5466fc78d40d08ab6149322f22d8ff3&q='
  }

  getWeather(city: string, code: string) {
    return this.http.get(this.APIurl + city + ',' + code);
  }
}
